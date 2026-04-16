import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiPause, FiPlay, FiRefreshCcw } from "react-icons/fi";
import { AppButton, AppInput, AppSelect, ConfirmationModal, IconButton, PaginationControls } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { getStatusTone } from "../../../core/constants/statusStyles.ts";
import { assignAccountRoles, listAccounts, listRoles, patchAccount } from "../lib/userApi.ts";
import { UserModuleNav } from "./UserModuleNav.jsx";

export function UsersManagementScreen() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  async function refreshAll() {
    setError("");
    setLoading(true);
    try {
      const [u, r] = await Promise.all([listAccounts(), listRoles()]);
      setUsers(u);
      setRoles(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshAll();
  }, []);

  const roleLabelByCode = useMemo(() => Object.fromEntries(roles.map((r) => [r.code, r.label])), [roles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.full_name.toLowerCase().includes(q) ||
        (u.roles?.map((rr) => roleLabelByCode[rr.code] ?? rr.label ?? rr.code).join(" ") ?? "").toLowerCase().includes(q),
    );
  }, [users, query, roleLabelByCode]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const usersPage = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  async function handleRoleChange(userId, roleCode) {
    setError("");
    try {
      const updated = await assignAccountRoles(userId, roleCode ? [roleCode] : []);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible d'assigner le rôle.");
    }
  }

  async function toggleStatus(userId) {
    setError("");
    const current = users.find((u) => u.id === userId);
    if (!current) return;
    try {
      const updated = await patchAccount(userId, { is_active: !current.is_active });
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de modifier le statut.");
    }
  }

  function confirmDelete() {
    // API delete non exposée : on garde une confirmation “inactive” pour l’instant.
    setDeleteTarget(null);
  }

  const formatLastLogin = () => "—";

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
        <div className="flex flex-wrap gap-2">
          <AppButton variant="ghost" size="lg" onClick={refreshAll} disabled={loading}>
            <span className="inline-flex items-center gap-2">
              <FiRefreshCcw size={18} />
              Actualiser
            </span>
          </AppButton>
          <AppButton variant="secondary" size="lg" onClick={() => navigate(ROUTES.userRegistration)}>
            Nouvel utilisateur
          </AppButton>
        </div>
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
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Dernière connexion</th>
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
            ) : usersPage.length === 0 ? (
              <tr>
                <td className="p-3 text-slate-600 dark:text-slate-300" colSpan={6}>
                  Aucun utilisateur.
                </td>
              </tr>
            ) : (
              usersPage.map((user) => {
              const statusTone = getStatusTone(user.is_active ? "Actif" : "Suspendu");
              const selectedRoleCode = user.roles?.[0]?.code ?? "";
              return (
                <tr key={user.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="p-3 font-semibold text-[#01003b] dark:text-slate-100">{user.full_name}</td>
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
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{formatLastLogin()}</td>
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
                        title="Modifier le profil"
                        aria-label="Modifier le profil"
                        onClick={() => navigate(ROUTES.userEdit(user.id))}
                      >
                        <FiEdit2 size={18} />
                      </IconButton>
                      <IconButton
                        className="text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                        title={user.is_active ? "Suspendre" : "Réactiver"}
                        aria-label={user.is_active ? "Suspendre" : "Réactiver"}
                        type="button"
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.is_active ? <FiPause size={18} /> : <FiPlay size={18} />}
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })
            )}
          </tbody>
        </table>
        <PaginationControls page={safePage} totalPages={totalPages} onPageChange={setPage} className="border-t border-slate-200 p-3 dark:border-slate-700" />
      </div>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Supprimer l'utilisateur ?"
        message={"Suppression non disponible (API non exposée)."}
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </section>
  );
}
