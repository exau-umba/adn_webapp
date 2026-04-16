import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton, AppInput, AppSelect } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { getAccount, listRoles, patchAccount, assignAccountRoles } from "../lib/userApi.ts";
import { UserModuleNav } from "./UserModuleNav.jsx";

export function UserEditScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roleCode, setRoleCode] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function run() {
      setError("");
      setLoading(true);
      try {
        const [u, r] = await Promise.all([getAccount(userId), listRoles({ page: 1, pageSize: 200 })]);
        setUser(u);
        setRoles(r.results);
        setFullName(u.full_name ?? "");
        setEmail(u.email ?? "");
        setRoleCode(u.roles?.[0]?.code ?? "");
        setIsActive(Boolean(u.is_active));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Impossible de charger l'utilisateur.");
      } finally {
        setLoading(false);
      }
    }
    if (userId) void run();
  }, [userId]);

  if (loading) {
    return (
      <section className="space-y-4">
        <UserModuleNav />
        <p className="font-myriad text-slate-600 dark:text-slate-300">Chargement…</p>
      </section>
    );
  }

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
    setError("");
    (async () => {
      try {
        const parts = name.split(" ").filter(Boolean);
        const first_name = parts.slice(0, 1).join(" ");
        const last_name = parts.slice(1).join(" ");
        const updated = await patchAccount(user.id, {
          email: mail,
          first_name,
          last_name,
          is_active: isActive,
        });
        const updatedWithRoles = await assignAccountRoles(updated.id, roleCode ? [roleCode] : []);
        setUser(updatedWithRoles);
        navigate(ROUTES.userManagement);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Impossible d'enregistrer.");
      }
    })();
  }

  return (
    <section className="space-y-6">
      <UserModuleNav />

      <div>
        <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Administration</p>
        <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Modifier l&apos;utilisateur</h2>
        <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">{user.full_name}</p>
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
          <AppSelect className="mt-2" value={roleCode} onChange={(e) => setRoleCode(e.target.value)}>
            <option value="">Aucun</option>
            {roles.map((r) => (
              <option key={r.id} value={r.code}>
                {r.label} ({r.code})
              </option>
            ))}
          </AppSelect>
        </div>
        <div>
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Statut</label>
          <AppSelect className="mt-2" value={isActive ? "Actif" : "Suspendu"} onChange={(e) => setIsActive(e.target.value === "Actif")}>
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
