import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AppButton, AppInput, AppSelect } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { adminRegisterUser, listRoles } from "../lib/userApi.ts";
import { UserModuleNav } from "./UserModuleNav.jsx";

export function UserRegistrationScreen() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [roleCode, setRoleCode] = useState("");
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
    if (!name || !mail || !u) {
      toast.error("Nom, nom d'utilisateur et e-mail sont obligatoires.");
      return;
    }
    setLoading(true);
    try {
      const parts = name.split(" ").filter(Boolean);
      const first_name = parts.slice(0, 1).join(" ");
      const last_name = parts.slice(1).join(" ");
      await adminRegisterUser({
        username: u,
        email: mail,
        first_name,
        last_name,
        profile_photo: profilePhotoFile,
        role_codes: roleCode ? [roleCode] : ["CLIENT"],
      });
      toast.success("Utilisateur créé. Vérifiez l'état d'envoi du mail dans les notifications.");
      setFullName("");
      setUsername("");
      setEmail("");
      setProfilePhotoFile(null);
      setRoleCode(roleCode || "CLIENT");
    } catch (e2) {
      toast.error(e2 instanceof Error ? e2.message : "Impossible de créer l'utilisateur.");
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
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Photo de profil</label>
          <input
            className="mt-2 w-full rounded-xl bg-slate-100 px-3 py-2.5 font-myriad text-sm text-slate-700 outline-none ring-brand-primary transition focus:ring-2 dark:bg-slate-800 dark:text-slate-100"
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePhotoFile(e.target.files?.[0] ?? null)}
            disabled={loading}
          />
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Optionnel. JPG/PNG/WebP.</p>
        </div>
        <div>
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Rôle</label>
          <AppSelect className="mt-2" value={roleCode} onChange={(e) => setRoleCode(e.target.value)} disabled={loading}>
            <option value="CLIENT">Client</option>
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
