import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppButton, PasswordField } from "../../../shared/ui";
import { activateAccount, setupPassword } from "../../user/lib/userApi.ts";
import { persistTokens } from "../../../core/auth/authStorage.ts";
import { ROUTES } from "../../../core/routes.ts";
import { getPasswordStrength } from "../../../core/utils/passwordStrength.ts";

function useTokenFromQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search).get("token") || "", [search]);
}

export function AccountTokenPasswordScreen({ mode }) {
  const navigate = useNavigate();
  const token = useTokenFromQuery();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const title = mode === "activate" ? "Activation du compte" : "Créer votre mot de passe";
  const successButton = mode === "activate" ? "Activer le compte" : "Créer le mot de passe";

  async function submit(e) {
    e.preventDefault();
    if (!token) {
      setError("Token manquant.");
      return;
    }
    if (!strength.isStrong) {
      setError("Mot de passe trop faible. Vérifiez les critères affichés.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const result = mode === "activate" ? await activateAccount(token, password) : await setupPassword(token, password);
      persistTokens(result.access, result.refresh);
      navigate(ROUTES.dashboard, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lien invalide ou expiré.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-4 dark:bg-slate-950">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <h1 className="font-brand text-2xl text-[#01003b] dark:text-slate-100">{title}</h1>
        <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">
          Définissez votre mot de passe pour finaliser l&apos;accès à votre compte.
        </p>
        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-myriad text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </p>
        ) : null}
        <div>
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Mot de passe</label>
          <PasswordField
            className="mt-2"
            placeholder="Au moins 8 caractères, avec majuscule, minuscule, chiffre et spécial"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ul className="space-y-1 text-xs font-myriad">
          {strength.rules.map((rule) => (
            <li key={rule.id} className={rule.ok ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}>
              {rule.ok ? "✓" : "•"} {rule.label}
            </li>
          ))}
        </ul>
        <div>
          <label className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-500">Confirmer</label>
          <PasswordField
            className="mt-2"
            placeholder="Retapez le mot de passe"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <AppButton type="submit" variant="primary" disabled={loading}>
            {loading ? "Traitement..." : successButton}
          </AppButton>
        </div>
      </form>
    </div>
  );
}

