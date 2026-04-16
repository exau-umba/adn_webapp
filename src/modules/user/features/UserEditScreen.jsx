import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton, AppInput, AppSelect } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { loadRoles, loadUsers, saveUsers } from "../lib/rbacStorage.ts";
import { UserModuleNav } from "./UserModuleNav.jsx";

export function UserEditScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = loadUsers().find((u) => u.id === userId);
  const roles = loadRoles();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState(roles[0]?.id ?? "");
  const [status, setStatus] = useState("Actif");
  const [error, setError] = useState("");

  useEffect(() => {
    const u = loadUsers().find((x) => x.id === userId);
    if (!u) return;
    setFullName(u.fullName);
    setEmail(u.email);
    setRoleId(u.roleId);
    setStatus(u.status);
    setError("");
  }, [userId]);

  if (!user) {
    return (
      <section className="space-y-4">
        <UserModuleNav />
        <p className="font-myriad text-slate-600 dark:text-slate-300">Utilisateur introuvable.</p>
        <AppButton variant="secondary" onClick={() => navigate(ROUTES.userManagement)}>
          Retour à la liste
        </AppButton>
      </section>
    );
  }

  function submit(e) {
    e.preventDefault();
    const name = fullName.trim();
    const mail = email.trim().toLowerCase();
    if (!name || !mail) {
      setError("Nom et e-mail sont obligatoires.");
      return;
    }
    const all = loadUsers();
    if (all.some((u) => u.id !== user.id && u.email.toLowerCase() === mail)) {
      setError("Un autre utilisateur utilise déjà cet e-mail.");
      return;
    }
    saveUsers(
      all.map((u) =>
        u.id === user.id
          ? {
              ...u,
              fullName: name,
              email: mail,
              roleId,
              status,
            }
          : u,
      ),
    );
    navigate(ROUTES.userManagement);
  }

  return (
    <section className="space-y-6">
      <UserModuleNav />

      <div>
        <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Administration</p>
        <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Modifier l&apos;utilisateur</h2>
        <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">{user.fullName}</p>
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
          <AppInput className="mt-2" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">E-mail</label>
          <AppInput className="mt-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
        <div>
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Statut</label>
          <AppSelect className="mt-2" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Actif">Actif</option>
            <option value="Suspendu">Suspendu</option>
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
