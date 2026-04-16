import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppButton, AppInput, AppSelect } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { createUserId, loadRoles, loadUsers, saveUsers } from "../lib/rbacStorage.ts";
import { UserModuleNav } from "./UserModuleNav.jsx";

export function UserRegistrationScreen() {
  const navigate = useNavigate();
  const roles = loadRoles();
  const defaultRoleId = roles[0]?.id ?? "";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState(defaultRoleId);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const name = fullName.trim();
    const mail = email.trim().toLowerCase();
    if (!name || !mail) {
      setError("Nom et e-mail sont obligatoires.");
      return;
    }
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === mail)) {
      setError("Un utilisateur avec cet e-mail existe déjà.");
      return;
    }
    const next = [
      ...users,
      {
        id: createUserId(),
        email: mail,
        fullName: name,
        roleId: roleId || defaultRoleId,
        status: "Actif",
        lastLoginAt: new Date().toISOString(),
      },
    ];
    saveUsers(next);
    navigate(ROUTES.userManagement);
  }

  return (
    <section className="space-y-6">
      <UserModuleNav />

      <div>
        <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Administration</p>
        <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Nouvel utilisateur</h2>
        <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
          Créez un compte applicatif et associez un rôle RBAC.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="mx-auto max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
      >
        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-myriad text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </p>
        ) : null}
        <div>
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Nom complet</label>
          <AppInput className="mt-2" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
        </div>
        <div>
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">E-mail</label>
          <AppInput
            className="mt-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Rôle</label>
          <AppSelect className="mt-2" value={roleId} onChange={(e) => setRoleId(e.target.value)}>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </AppSelect>
        </div>
        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <AppButton type="button" variant="ghost" onClick={() => navigate(ROUTES.userManagement)}>
            Annuler
          </AppButton>
          <AppButton type="submit" variant="primary">
            Enregistrer
          </AppButton>
        </div>
      </form>
    </section>
  );
}
