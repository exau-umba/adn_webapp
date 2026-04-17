import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AppButton, AppInput, PasswordField } from "../../../shared/ui";
import { useAuth } from "../../../core/auth/AuthContext.jsx";
import { apiChangePassword, apiPatchMeProfile } from "../../../core/auth/accountApi.ts";
import { getPasswordStrength } from "../../../core/utils/passwordStrength.ts";

export function SettingsScreen() {
  const { user, refreshSession } = useAuth();
  const [profile, setProfile] = useState({
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });
  const [passwordData, setPasswordData] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const strength = useMemo(() => getPasswordStrength(passwordData.next), [passwordData.next]);

  async function onSaveProfile(e) {
    e.preventDefault();
    setProfileSaving(true);
    try {
      await apiPatchMeProfile(profile);
      await refreshSession();
      toast.success("Profil mis à jour.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Échec de mise à jour du profil.");
    } finally {
      setProfileSaving(false);
    }
  }

  async function onChangePassword(e) {
    e.preventDefault();
    if (!strength.isStrong) {
      toast.error("Le nouveau mot de passe n'est pas assez fort.");
      return;
    }
    if (passwordData.next !== passwordData.confirm) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    setPasswordSaving(true);
    try {
      await apiChangePassword(passwordData.current, passwordData.next);
      setPasswordData({ current: "", next: "", confirm: "" });
      toast.success("Mot de passe modifié.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Échec du changement de mot de passe.");
    } finally {
      setPasswordSaving(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Configuration</p>
        <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Paramètres du compte</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-xl text-[#01003b] dark:text-slate-100">Mettre à jour le compte</h3>
          <form className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={onSaveProfile}>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Prénom
              <AppInput
                className="mt-2"
                placeholder="Ex: Grâce"
                value={profile.first_name}
                onChange={(e) => setProfile((p) => ({ ...p, first_name: e.target.value }))}
              />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Nom
              <AppInput
                className="mt-2"
                placeholder="Ex: Mukendi"
                value={profile.last_name}
                onChange={(e) => setProfile((p) => ({ ...p, last_name: e.target.value }))}
              />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
              Adresse e-mail
              <AppInput
                className="mt-2"
                type="email"
                placeholder="Ex: contact@adnproservice.com"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
              Téléphone
              <AppInput
                className="mt-2"
                placeholder="Ex: +243..."
                value={profile.phone}
                onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              />
            </label>
            <div className="md:col-span-2 flex justify-end">
              <AppButton type="submit" variant="primary" disabled={profileSaving}>
                {profileSaving ? "Mise à jour..." : "Enregistrer le profil"}
              </AppButton>
            </div>
          </form>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-xl text-[#01003b] dark:text-slate-100">Sécurité du compte</h3>
          <form className="mt-4 grid grid-cols-1 gap-4" onSubmit={onChangePassword}>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mot de passe actuel
              <PasswordField
                className="mt-2"
                placeholder="Entrez votre mot de passe actuel"
                value={passwordData.current}
                onChange={(e) => setPasswordData((p) => ({ ...p, current: e.target.value }))}
              />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Nouveau mot de passe
              <PasswordField
                className="mt-2"
                placeholder="Au moins 8 caractères, majuscule, minuscule, chiffre, spécial"
                value={passwordData.next}
                onChange={(e) => setPasswordData((p) => ({ ...p, next: e.target.value }))}
              />
            </label>
            <ul className="space-y-1 text-xs font-myriad">
              {strength.rules.map((rule) => (
                <li key={rule.id} className={rule.ok ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}>
                  {rule.ok ? "✓" : "•"} {rule.label}
                </li>
              ))}
            </ul>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Confirmer le nouveau mot de passe
              <PasswordField
                className="mt-2"
                placeholder="Retapez le nouveau mot de passe"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData((p) => ({ ...p, confirm: e.target.value }))}
              />
            </label>
            <div className="flex justify-end">
              <AppButton type="submit" variant="primary" disabled={passwordSaving}>
                {passwordSaving ? "Modification..." : "Mettre à jour le mot de passe"}
              </AppButton>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
}
