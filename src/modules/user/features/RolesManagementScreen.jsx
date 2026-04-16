import { useCallback, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { AppButton, AppInput, AppTextarea, ConfirmationModal, IconButton } from "../../../shared/ui";
import { PERMISSION_CATALOG } from "../types/rbac.ts";
import { createRoleId, loadRoles, loadUsers, normalizePermissionIds, saveRoles } from "../lib/rbacStorage.ts";
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
  const [roles, setRoles] = useState(() => loadRoles());
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPerms, setFormPerms] = useState(() => new Set());
  const [deleteTarget, setDeleteTarget] = useState(null);

  const persistRoles = useCallback((next) => {
    setRoles(next);
    saveRoles(next);
  }, []);

  const userCountByRole = (() => {
    const map = Object.fromEntries(roles.map((r) => [r.id, 0]));
    for (const u of loadUsers()) {
      if (map[u.roleId] !== undefined) map[u.roleId] += 1;
    }
    return map;
  })();

  function openCreate() {
    setEditingId(null);
    setFormName("");
    setFormDescription("");
    setFormPerms(new Set());
    setEditorOpen(true);
  }

  function openEdit(role) {
    setEditingId(role.id);
    setFormName(role.name);
    setFormDescription(role.description);
    setFormPerms(new Set(role.permissionIds));
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

  function submitEditor() {
    const name = formName.trim();
    if (!name) return;
    const permissionIds = normalizePermissionIds([...formPerms]);
    if (editingId) {
      persistRoles(
        roles.map((r) =>
          r.id === editingId ? { ...r, name, description: formDescription.trim(), permissionIds } : r,
        ),
      );
    } else {
      persistRoles([
        ...roles,
        {
          id: createRoleId(),
          name,
          description: formDescription.trim(),
          permissionIds,
        },
      ]);
    }
    setEditorOpen(false);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    persistRoles(roles.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <section className="space-y-6">
      <UserModuleNav />

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">RBAC</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">
            Rôles et permissions
          </h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Définissez des profils d&apos;accès réutilisables et rattachez-les aux utilisateurs.
          </p>
        </div>
        <AppButton variant="secondary" size="lg" onClick={openCreate}>
          <span className="inline-flex items-center gap-2">
            <FiPlus size={18} />
            Nouveau rôle
          </span>
        </AppButton>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <table className="min-w-[720px] w-full border-collapse font-myriad text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
            <tr>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Rôle</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Description</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Permissions</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Utilisateurs</th>
              <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                <td className="p-3 font-semibold text-[#01003b] dark:text-slate-100">{role.name}</td>
                <td className="max-w-[280px] p-3 text-slate-600 dark:text-slate-300">{role.description || "—"}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300">{role.permissionIds.length}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300">{userCountByRole[role.id] ?? 0}</td>
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
                      disabled={(userCountByRole[role.id] ?? 0) > 0}
                      onClick={() => {
                        if ((userCountByRole[role.id] ?? 0) > 0) return;
                        setDeleteTarget(role);
                      }}
                    >
                      <FiTrash2 size={18} />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editorOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <h3 className="font-brand text-2xl text-[#01003b] dark:text-slate-100">
              {editingId ? "Modifier le rôle" : "Nouveau rôle"}
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Nom</label>
                <AppInput className="mt-2" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Ex. Superviseur terrain" />
              </div>
              <div>
                <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Description</label>
                <AppTextarea className="mt-2" value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3} />
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
                            <label htmlFor={`perm-${p.id}`} className="font-myriad text-sm text-slate-700 dark:text-slate-300">
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
              <AppButton variant="primary" onClick={submitEditor}>
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
            ? `Le rôle « ${deleteTarget.name} » sera supprimé. Les utilisateurs ne pourront plus y être assignés.`
            : ""
        }
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </section>
  );
}
