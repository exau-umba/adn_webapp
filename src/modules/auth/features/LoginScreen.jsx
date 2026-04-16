import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { AppButton, AppInput } from "../../../shared/ui";
import { useAuth } from "../../../core/auth/AuthContext.jsx";
import { ROUTES } from "../../../core/routes.ts";

export function LoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? ROUTES.dashboard;
  const { login, isReady, isAuthenticated } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isReady, isAuthenticated, from, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const u = username.trim();
    if (!u || !password) {
      setError("Renseignez le nom d'utilisateur et le mot de passe.");
      return;
    }
    setSubmitting(true);
    try {
      await login(u, password);
      navigate(from, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Impossible de se connecter.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa] font-myriad text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        Préparation de l’espace de connexion…
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f8f9fa] px-4 py-10 dark:bg-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(8,4,122,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,223,149,0.35),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(251,191,36,0.08),transparent_40%)]"
      />
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-[0_20px_50px_-20px_rgba(8,4,122,0.25)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
        <div className="flex flex-col items-center text-center">
          <img
            src="/logos/and_pro_service_multiservice_cercle.png"
            alt="ADN PRO SERVICE"
            className="h-16 w-16 rounded-2xl object-cover shadow-md"
          />
          <h1 className="mt-4 font-brand text-2xl text-[#01003b] dark:text-slate-100">ADN PRO SERVICE</h1>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">Connexion à l’espace d’administration</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error ? (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 font-myriad text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
            >
              {error}
            </p>
          ) : null}

          <div>
            <label htmlFor="login-username" className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">
              Nom d&apos;utilisateur
            </label>
            <AppInput
              id="login-username"
              className="mt-2"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="login-password" className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">
              Mot de passe
            </label>
            <AppInput
              id="login-password"
              className="mt-2"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
            />
          </div>

          <AppButton type="submit" variant="primary" className="mt-2 flex w-full items-center justify-center gap-2 !rounded-xl !py-3" disabled={submitting}>
            <FaArrowRightToBracket className="text-sm" />
            {submitting ? "Connexion…" : "Se connecter"}
          </AppButton>
        </form>

        <p className="mt-6 text-center font-myriad text-xs text-slate-400 dark:text-slate-500">
          Identifiants du service utilisateurs (JWT). En local, utilisez la passerelle ou configurez VITE_API_BASE_URL.
        </p>
      </div>
    </div>
  );
}
