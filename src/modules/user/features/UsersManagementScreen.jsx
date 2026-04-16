import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiPause, FiPlay, FiTrash2 } from "react-icons/fi";
import { AppButton, AppInput, AppSelect, ConfirmationModal, IconButton, PaginationControls } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { getStatusTone } from "../../../core/constants/statusStyles.ts";
import { loadRoles, loadUsers, saveUsers } from "../lib/rbacStorage.ts";
import { UserModuleNav } from "./UserModuleNav.jsx";

export function UsersManagementScreen() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(() => loadUsers());
  const roles = loadRoles();
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const persistUsers = useCallback((next) => {
    setUsers(next);
    saveUsers(next);
  }, []);

  const roleNameById = useMemo(() => Object.fromEntries(roles.map((r) => [r.id, r.name])), [roles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.fullName.toLowerCase().includes(q) ||
        (roleNameById[u.roleId] ?? "").toLowerCase().includes(q),
    );
  }, [users, query, roleNameById]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const usersPage = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  function handleRoleChange(userId, roleId) {
    persistUsers(users.map((u) => (u.id === userId ? { ...u, roleId } : u)));
  }

  function toggleStatus(userId) {
    persistUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: u.status === "Actif" ? "Suspendu" : "Actif" } : u,
      ),
    );
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    persistUsers(users.filter((u) => u.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  function formatLastLogin(iso) {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleString("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch {
      return iso;
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
            {usersPage.map((user) => {
              const statusTone = getStatusTone(user.status);
              return (
                <tr key={user.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="p-3 font-semibold text-[#01003b] dark:text-slate-100">{user.fullName}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{user.email}</td>
                  <td className="p-3">
                    <AppSelect
                      className="min-w-[180px]"
                      value={user.roleId}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      aria-label={`Rôle pour ${user.fullName}`}
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </AppSelect>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{formatLastLogin(user.lastLoginAt)}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-2 ${statusTone.text}`}>
                      <span className={`h-2 w-2 rounded-full ${statusTone.dot}`} />
                      {user.status}
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
                        title={user.status === "Suspendu" ? "Réactiver" : "Suspendre"}
                        aria-label={user.status === "Suspendu" ? "Réactiver" : "Suspendre"}
                        type="button"
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status === "Suspendu" ? <FiPlay size={18} /> : <FiPause size={18} />}
                      </IconButton>
                      <IconButton
                        className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                        title="Supprimer"
                        aria-label="Supprimer"
                        onClick={() => setDeleteTarget(user)}
                      >
                        <FiTrash2 size={18} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationControls page={safePage} totalPages={totalPages} onPageChange={setPage} className="border-t border-slate-200 p-3 dark:border-slate-700" />
      </div>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Supprimer l'utilisateur ?"
        message={
          deleteTarget
            ? `Le compte ${deleteTarget.email} sera retiré de la liste locale. Cette action est destinée à la démo UI.`
            : ""
        }
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </section>
  );
}
