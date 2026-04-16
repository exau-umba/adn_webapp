import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit2, FiPause, FiPlay } from "react-icons/fi";
import { AppButton } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { assignAccountRoles, getAccount, listRoles, patchAccount } from "../lib/userApi.ts";
import { UserModuleNav } from "./UserModuleNav.jsx";
import { UserAvatar } from "../components/UserAvatar.jsx";

function formatDateTime(value) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return String(value);
  }
}

export function UserDetailsScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function run() {
      if (!userId) return;
      setError("");
      setLoading(true);
      try {
        const [u, r] = await Promise.all([getAccount(userId), listRoles({ page: 1, pageSize: 200 })]);
        setUser(u);
        setRoles(r.results);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Impossible de charger l'utilisateur.");
      } finally {
        setLoading(false);
      }
    }
    void run();
  }, [userId]);

  const selectedRoleCode = user?.roles?.[0]?.code ?? "";
  const roleLabelByCode = useMemo(() => Object.fromEntries(roles.map((r) => [r.code, r.label])), [roles]);

  async function toggleActive() {
    if (!user) return;
    setError("");
    try {
      const updated = await patchAccount(user.id, { is_active: !user.is_active });
      setUser(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de modifier le statut.");
    }
  }

  async function changeRole(code) {
    if (!user) return;
    setError("");
    try {
      const updated = await assignAccountRoles(user.id, code ? [code] : []);
      setUser(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible d'assigner le rôle.");
    }
  }

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

  return (
    <section className="space-y-6">
      <UserModuleNav />

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 font-myriad text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <UserAvatar fullName={user.full_name} photoUrl={user.profile_photo_url} size={56} />
          <div>
            <p className="font-brand text-2xl text-[#01003b] dark:text-slate-100">{user.full_name}</p>
            <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">
              @{user.username} • {user.email}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <AppButton variant="ghost" onClick={() => navigate(ROUTES.userEdit(user.id))}>
            <span className="inline-flex items-center gap-2">
              <FiEdit2 size={18} />
              Modifier
            </span>
          </AppButton>
          <AppButton
            variant="secondary"
            onClick={toggleActive}
            className={user.is_active ? "" : "bg-[#ffdf95]"}
          >
            <span className="inline-flex items-center gap-2">
              {user.is_active ? <FiPause size={18} /> : <FiPlay size={18} />}
              {user.is_active ? "Suspendre" : "Réactiver"}
            </span>
          </AppButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 md:col-span-2">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Informations
          </p>
          <dl className="mt-4 grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-400 dark:text-slate-500">Téléphone</dt>
              <dd className="font-myriad text-slate-700 dark:text-slate-200">{user.phone || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400 dark:text-slate-500">Photo</dt>
              <dd className="font-myriad break-all text-slate-700 dark:text-slate-200">{user.profile_photo_url || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400 dark:text-slate-500">Création</dt>
              <dd className="font-myriad text-slate-700 dark:text-slate-200">{formatDateTime(user.date_joined)}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400 dark:text-slate-500">Dernière connexion</dt>
              <dd className="font-myriad text-slate-700 dark:text-slate-200">{formatDateTime(user.last_login)}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400 dark:text-slate-500">Mise à jour</dt>
              <dd className="font-myriad text-slate-700 dark:text-slate-200">{formatDateTime(user.updated_at)}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400 dark:text-slate-500">Statut</dt>
              <dd className="font-myriad text-slate-700 dark:text-slate-200">{user.is_active ? "Actif" : "Suspendu"}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Accès
          </p>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">Rôle assigné</p>
              <select
                className="mt-2 w-full rounded-xl bg-slate-100 px-3 py-2.5 font-myriad text-sm text-slate-700 outline-none ring-brand-primary transition focus:ring-2 dark:bg-slate-800 dark:text-slate-100"
                value={selectedRoleCode}
                onChange={(e) => changeRole(e.target.value)}
              >
                <option value="">Aucun</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.code}>
                    {r.label} ({r.code})
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                {selectedRoleCode ? roleLabelByCode[selectedRoleCode] : "Aucun rôle"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">Permissions (du rôle)</p>
              <div className="mt-2 max-h-56 overflow-auto rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
                {user.roles?.[0]?.permissions?.length ? (
                  <ul className="space-y-1">
                    {user.roles[0].permissions.map((p) => (
                      <li key={p} className="font-myriad text-slate-700 dark:text-slate-200">
                        {p}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-myriad text-slate-500 dark:text-slate-400">Aucune permission.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

