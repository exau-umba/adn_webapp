import { useNavigate } from "react-router-dom";
import { AppButton } from "../../../shared/ui";
import { useAuth } from "../../../core/auth/AuthContext.jsx";
import { ROUTES } from "../../../core/routes.ts";

function isUserAdmin(user) {
  if (!user) return false;
  if (user.is_superuser || user.is_staff) return true;
  return Array.isArray(user.roles) && user.roles.some((r) => r.code === "ADMIN");
}

export function RequireUserAdmin({ children }) {
  const navigate = useNavigate();
  const { user, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa] font-myriad text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        Vérification des droits…
      </div>
    );
  }

  if (!isUserAdmin(user)) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Accès refusé</h2>
        <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">
          Ce module est réservé aux administrateurs (RBAC). Contactez un administrateur plateforme si nécessaire.
        </p>
        <div className="flex flex-wrap gap-2">
          <AppButton variant="secondary" onClick={() => navigate(ROUTES.dashboard)}>
            Retour au tableau de bord
          </AppButton>
          <AppButton variant="ghost" onClick={() => navigate(ROUTES.settings)}>
            Préférences
          </AppButton>
        </div>
      </section>
    );
  }

  return children;
}

