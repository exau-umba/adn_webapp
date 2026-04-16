import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppButton, AppInput, AppSelect } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { assignAccountRoles, adminRegisterUser, listRoles } from "../lib/userApi.ts";
import { UserModuleNav } from "./UserModuleNav.jsx";

export function UserRegistrationScreen() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleCode, setRoleCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await listRoles({ page: 1, pageSize: 200 });
        setRoles(r.results);
        setRoleCode(r.results[0]?.code ?? "");
      } catch {
        // ignore, handled on submit
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function submit(e) {
    e.preventDefault();
    const name = fullName.trim();
    const mail = email.trim().toLowerCase();
    const u = username.trim();
    if (!name || !mail || !u || !password) {
      setError("Nom, nom d'utilisateur, e-mail et mot de passe sont obligatoires.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const parts = name.split(" ").filter(Boolean);
      const first_name = parts.slice(0, 1).join(" ");
      const last_name = parts.slice(1).join(" ");
      const created = await adminRegisterUser({
        username: u,
        email: mail,
        first_name,
        last_name,
        password,
      });
      if (roleCode) {
        await assignAccountRoles(created.user.id, [roleCode]);
      }
      navigate(ROUTES.userManagement);
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Impossible de créer l'utilisateur.");
    } finally {
      setLoading(false);
    }
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
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Nom d&apos;utilisateur</label>
          <AppInput className="mt-2" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
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
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Mot de passe</label>
          <AppInput className="mt-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </div>
        <div>
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Rôle</label>
          <AppSelect className="mt-2" value={roleCode} onChange={(e) => setRoleCode(e.target.value)} disabled={loading}>
            <option value="">Aucun</option>
            {roles.map((r) => (
              <option key={r.id} value={r.code}>
                {r.label} ({r.code})
              </option>
            ))}
          </AppSelect>
        </div>
        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <AppButton type="button" variant="ghost" onClick={() => navigate(ROUTES.userManagement)}>
            Annuler
          </AppButton>
          <AppButton type="submit" variant="primary" disabled={loading}>
            Enregistrer
          </AppButton>
        </div>
      </form>
    </section>
  );
}
