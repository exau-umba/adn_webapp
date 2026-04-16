import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiEye, FiPause, FiPlay, FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { AppButton, AppInput, AppSelect, ConfirmationModal, IconButton, PaginationControls } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { getStatusTone } from "../../../core/constants/statusStyles.ts";
import { assignAccountRoles, deleteAccount, listAccounts, listRoles, patchAccount } from "../lib/userApi.ts";
import { UserModuleNav } from "./UserModuleNav.jsx";
import { UserAvatar } from "../components/UserAvatar.jsx";
import { useAuth } from "../../../core/auth/AuthContext.jsx";

export function UsersManagementScreen() {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  async function refreshAll(nextPage = page, nextQuery = query) {
    setError("");
    setLoading(true);
    try {
      const [u, r] = await Promise.all([
        listAccounts({ page: nextPage, pageSize, search: nextQuery.trim() }),
        listRoles({ page: 1, pageSize: 200 }),
      ]);
      setUsers(u.results);
      setUsersCount(u.count);
      setRoles(r.results);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshAll();
  }, []); // bootstrap

  useEffect(() => {
    void refreshAll(page, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setPage(1);
    void refreshAll(1, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(usersCount / pageSize));
    if (page > totalPages) setPage(totalPages);
  }, [usersCount, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(usersCount / pageSize));
  const safePage = Math.min(page, totalPages);

  const roleLabelByCode = useMemo(() => Object.fromEntries(roles.map((r) => [r.code, r.label])), [roles]);
  const roleSummaryForUser = (user) =>
    (user.roles ?? []).map((r) => roleLabelByCode[r.code] ?? r.label ?? r.code).join(", ") || "Aucun";

  async function handleRoleChange(userId, roleCode) {
    setError("");
    try {
      const updated = await assignAccountRoles(userId, roleCode ? [roleCode] : []);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
      toast.success("Rôle mis à jour.");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Impossible d'assigner le rôle.";
      setError(message);
      toast.error(message);
    }
  }

  async function toggleStatus(userId) {
    setError("");
    const current = users.find((u) => u.id === userId);
    if (!current) return;
    if (String(currentUser?.id) === String(userId)) {
      toast.error("Vous ne pouvez pas modifier votre propre statut.");
      return;
    }
    try {
      const updated = await patchAccount(userId, { is_active: !current.is_active });
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
      toast.success(updated.is_active ? "Utilisateur réactivé." : "Utilisateur suspendu.");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Impossible de modifier le statut.";
      setError(message);
      toast.error(message);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    if (String(currentUser?.id) === String(deleteTarget.id)) {
      toast.error("Vous ne pouvez pas supprimer votre propre compte.");
      setDeleteTarget(null);
      return;
    }
    setError("");
    try {
      const message = await deleteAccount(deleteTarget.id);
      toast.success(message);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setUsersCount((prev) => Math.max(0, prev - 1));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Impossible de supprimer l'utilisateur.";
      setError(message);
      toast.error(message);
    } finally {
      setDeleteTarget(null);
    }
  }

  function formatDateTime(value) {
    if (!value) return "—";
    try {
      return new Date(value).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
    } catch {
      return String(value);
    }
  }

  return (
    <section className="space-y-6">
      <UserModuleNav />

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Administration</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">
            Utilisateurs et accès
          </h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Attribuez des rôles RBAC, suspendez des comptes et gardez une vue claire sur les accès.
          </p>
        </div>
        <AppButton variant="secondary" size="lg" onClick={() => navigate(ROUTES.userRegistration)}>
          Nouvel utilisateur
        </AppButton>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 font-myriad text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80">
        <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Recherche
        </p>
        <AppInput
          className="mt-3"
          placeholder="E-mail, nom ou rôle..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <table className="min-w-[880px] w-full border-collapse font-myriad text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
            <tr>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Utilisateur</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">E-mail</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Rôle</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Traces</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Statut</th>
              <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {loading ? (
              <tr>
                <td className="p-3 text-slate-600 dark:text-slate-300" colSpan={6}>
                  Chargement…
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td className="p-3 text-slate-600 dark:text-slate-300" colSpan={6}>
                  Aucun utilisateur.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const isSelf = String(currentUser?.id) === String(user.id);
                const statusTone = getStatusTone(user.is_active ? "Actif" : "Suspendu");
                const selectedRoleCode = user.roles?.[0]?.code ?? "";
                return (
                  <tr key={user.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar fullName={user.full_name} photoUrl={user.profile_photo_url} size={36} />
                      <div>
                        <p className="font-semibold text-[#01003b] dark:text-slate-100">{user.full_name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{user.email}</td>
                  <td className="p-3">
                    <AppSelect
                      className="min-w-[180px]"
                      value={selectedRoleCode}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      aria-label={`Rôle pour ${user.full_name}`}
                    >
                      <option value="">Aucun</option>
                      {roles.map((r) => (
                        <option key={r.id} value={r.code}>
                          {r.label} ({r.code})
                        </option>
                      ))}
                    </AppSelect>
                    <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{roleSummaryForUser(user)}</p>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">
                    <div className="space-y-0.5 text-[12px] leading-snug">
                      <div>
                        <span className="text-slate-400 dark:text-slate-500">Créé:</span> {formatDateTime(user.date_joined)}
                      </div>
                      <div>
                        <span className="text-slate-400 dark:text-slate-500">Dernière:</span> {formatDateTime(user.last_login)}
                      </div>
                      <div>
                        <span className="text-slate-400 dark:text-slate-500">MAJ:</span> {formatDateTime(user.updated_at)}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-2 ${statusTone.text}`}>
                      <span className={`h-2 w-2 rounded-full ${statusTone.dot}`} />
                      {user.is_active ? "Actif" : "Suspendu"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1">
                      <IconButton
                        className="text-slate-600 dark:text-slate-300"
                        title="Voir le détail"
                        aria-label="Voir le détail"
                        onClick={() => navigate(ROUTES.userDetail(user.id))}
                      >
                        <FiEye size={18} />
                      </IconButton>
                      <IconButton
                        className="text-slate-600 dark:text-slate-300"
                        title="Modifier le profil"
                        aria-label="Modifier le profil"
                        onClick={() => navigate(ROUTES.userEdit(user.id))}
                      >
                        <FiEdit2 size={18} />
                      </IconButton>
                      <IconButton
                        className="text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                        title={isSelf ? "Action indisponible sur votre compte" : user.is_active ? "Suspendre" : "Réactiver"}
                        aria-label={user.is_active ? "Suspendre" : "Réactiver"}
                        type="button"
                        disabled={isSelf}
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.is_active ? <FiPause size={18} /> : <FiPlay size={18} />}
                      </IconButton>
                      <IconButton
                        className="text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                        title={isSelf ? "Vous ne pouvez pas supprimer votre propre compte" : "Supprimer"}
                        aria-label="Supprimer"
                        type="button"
                        disabled={isSelf}
                        onClick={() => setDeleteTarget(user)}
                      >
                        <FiTrash2 size={18} />
                      </IconButton>
                    </div>
                  </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <PaginationControls
          page={safePage}
          totalPages={totalPages}
          totalItems={usersCount}
          pageSize={pageSize}
          onPageChange={setPage}
          label="utilisateurs"
        />
      </div>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Supprimer l'utilisateur ?"
        message={`Cette action est irreversible pour ${deleteTarget?.full_name ?? "cet utilisateur"}.`}
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </section>
  );
}
