import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../core/routes.ts";
import { useAuth } from "../core/auth/AuthContext.jsx";

export function ProtectedRoute({ children }) {
  const { isReady, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa] font-myriad text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        Chargement de la session…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  return children;
}
