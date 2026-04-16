import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiRefreshCcw, FiTrash2 } from "react-icons/fi";
import { AppButton, AppInput, AppTextarea, ConfirmationModal, IconButton, PaginationControls } from "../../../shared/ui";
import { createRole, deleteRole, listAccounts, listRoles, updateRole } from "../lib/userApi.ts";
import { PERMISSION_CATALOG } from "../types/rbac.ts";
import { UserModuleNav } from "./UserModuleNav.jsx";

const groupedPermissions = PERMISSION_CATALOG.reduce(
  (acc, p) => {
    if (!acc[p.group]) acc[p.group] = [];
    acc[p.group].push(p);
    return acc;
  },
  /** @type {Record<string, typeof PERMISSION_CATALOG>} */ ({}),
);

export function RolesManagementScreen() {
  const [roles, setRoles] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [rolesCount, setRolesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formCode, setFormCode] = useState("");
  const [formLabel, setFormLabel] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPerms, setFormPerms] = useState(() => new Set());
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  async function refreshAll(nextPage = page) {
    setError("");
    setLoading(true);
    try {
      const [r, a] = await Promise.all([
        listRoles({ page: nextPage, pageSize }),
        listAccounts({ page: 1, pageSize: 200 }),
      ]);
      setRoles(r.results);
      setRolesCount(r.count);
      setAccounts(a.results);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de charger les rôles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshAll();
  }, []);

  useEffect(() => {
    void refreshAll(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const userCountByRoleCode = useMemo(() => {
    const map = Object.fromEntries(roles.map((r) => [r.code, 0]));
    for (const u of accounts) {
      for (const role of u.roles ?? []) {
        if (map[role.code] !== undefined) map[role.code] += 1;
      }
    }
    return map;
  }, [roles, accounts]);

  const totalPages = Math.max(1, Math.ceil(rolesCount / pageSize));
  const safePage = Math.min(page, totalPages);

  function openCreate() {
    setEditingId(null);
    setFormCode("");
    setFormLabel("");
    setFormDescription("");
    setFormPerms(new Set());
    setEditorOpen(true);
  }

  function openEdit(role) {
    setEditingId(role.id);
    setFormCode(role.code ?? "");
    setFormLabel(role.label ?? "");
    setFormDescription(role.description ?? "");
    setFormPerms(new Set(role.permissions ?? []));
    setEditorOpen(true);
  }

  function togglePerm(id) {
    setFormPerms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAllInGroup(group) {
    const ids = groupedPermissions[group].map((p) => p.id);
    setFormPerms((prev) => {
      const next = new Set(prev);
      const allOn = ids.every((id) => next.has(id));
      if (allOn) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  }

  async function submitEditor() {
    const code = formCode.trim().toUpperCase();
    const label = formLabel.trim();
    if (!code || !label) return;
    setError("");
    try {
      if (editingId) {
        await updateRole(editingId, { code, label, description: formDescription.trim(), permissions: [...formPerms] });
      } else {
        await createRole({ code, label, description: formDescription.trim(), permissions: [...formPerms] });
      }
      setEditorOpen(false);
      await refreshAll();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible d'enregistrer le rôle.");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setError("");
    try {
      await deleteRole(deleteTarget.id);
      setDeleteTarget(null);
      await refreshAll();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de supprimer le rôle.");
    }
  }

  return (
    <section className="space-y-6">
      <UserModuleNav />

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">RBAC</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">
            Rôles
          </h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Gérez les rôles (code, libellé) et rattachez-les aux utilisateurs.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AppButton variant="ghost" size="lg" onClick={refreshAll} disabled={loading}>
            <span className="inline-flex items-center gap-2">
              <FiRefreshCcw size={18} />
              Actualiser
            </span>
          </AppButton>
          <AppButton variant="secondary" size="lg" onClick={openCreate}>
            <span className="inline-flex items-center gap-2">
              <FiPlus size={18} />
              Nouveau rôle
            </span>
          </AppButton>
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 font-myriad text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <table className="min-w-[720px] w-full border-collapse font-myriad text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
            <tr>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Code</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Libellé</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Description</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Permissions</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Utilisateurs</th>
              <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {loading ? (
              <tr>
                <td className="p-3 text-slate-600 dark:text-slate-300" colSpan={5}>
                  Chargement…
                </td>
              </tr>
            ) : roles.length === 0 ? (
              <tr>
                <td className="p-3 text-slate-600 dark:text-slate-300" colSpan={5}>
                  Aucun rôle.
                </td>
              </tr>
            ) : (
              roles.map((role) => (
              <tr key={role.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                <td className="p-3 font-semibold text-[#01003b] dark:text-slate-100">{role.code}</td>
                <td className="p-3 text-slate-700 dark:text-slate-200">{role.label}</td>
                <td className="max-w-[280px] p-3 text-slate-600 dark:text-slate-300">{role.description || "—"}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300">{(role.permissions ?? []).length}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300">{userCountByRoleCode[role.code] ?? 0}</td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-1">
                    <IconButton
                      className="text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                      title="Modifier"
                      aria-label="Modifier"
                      onClick={() => openEdit(role)}
                    >
                      <FiEdit2 size={18} />
                    </IconButton>
                    <IconButton
                      className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                      title="Supprimer"
                      aria-label="Supprimer"
                      disabled={(userCountByRoleCode[role.code] ?? 0) > 0}
                      onClick={() => {
                        if ((userCountByRoleCode[role.code] ?? 0) > 0) return;
                        setDeleteTarget(role);
                      }}
                    >
                      <FiTrash2 size={18} />
                    </IconButton>
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="border-t border-slate-200 p-3 dark:border-slate-700">
          <PaginationControls page={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>

      {editorOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <h3 className="font-brand text-2xl text-[#01003b] dark:text-slate-100">
              {editingId ? "Modifier le rôle" : "Nouveau rôle"}
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Code</label>
                <AppInput
                  className="mt-2"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  placeholder="Ex. ADMIN"
                />
              </div>
              <div>
                <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Libellé</label>
                <AppInput
                  className="mt-2"
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value)}
                  placeholder="Ex. Administrateur"
                />
              </div>
              <div>
                <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Description</label>
                <AppTextarea
                  className="mt-2"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Permissions</p>
                <div className="mt-3 space-y-4">
                  {Object.keys(groupedPermissions).map((group) => (
                    <div key={group} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-myriad text-sm font-semibold text-[#01003b] dark:text-slate-100">{group}</p>
                        <button
                          type="button"
                          className="font-myriad text-xs text-[#08047a] underline-offset-2 hover:underline dark:text-indigo-300"
                          onClick={() => selectAllInGroup(group)}
                        >
                          Tout cocher / décocher
                        </button>
                      </div>
                      <ul className="mt-2 space-y-2">
                        {groupedPermissions[group].map((p) => (
                          <li key={p.id} className="flex items-start gap-2">
                            <input
                              id={`perm-${p.id}`}
                              type="checkbox"
                              className="mt-1 h-4 w-4 rounded border-slate-300"
                              checked={formPerms.has(p.id)}
                              onChange={() => togglePerm(p.id)}
                            />
                            <label
                              htmlFor={`perm-${p.id}`}
                              className="font-myriad text-sm text-slate-700 dark:text-slate-300"
                            >
                              {p.label}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <AppButton variant="ghost" onClick={() => setEditorOpen(false)}>
                Annuler
              </AppButton>
              <AppButton variant="primary" onClick={submitEditor} disabled={loading}>
                Enregistrer
              </AppButton>
            </div>
          </div>
        </div>
      ) : null}

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Supprimer ce rôle ?"
        message={
          deleteTarget
            ? `Le rôle « ${deleteTarget.label} » sera supprimé. Les utilisateurs ne pourront plus y être assignés.`
            : ""
        }
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </section>
  );
}
