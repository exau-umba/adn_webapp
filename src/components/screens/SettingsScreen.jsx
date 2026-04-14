import { AppButton, AppInput, AppSelect } from "../../shared/ui";

export function SettingsScreen() {
  return (
    <section className="space-y-6">
      <div>
        <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Configuration</p>
        <h2 className="mt-2 font-brand text-4xl text-[#01003b] dark:text-slate-100">Settings</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-2xl text-[#01003b] dark:text-slate-100">Profil administrateur</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Nom
              <AppInput className="mt-2" defaultValue="Admin Principal" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Email
              <AppInput className="mt-2" defaultValue="admin@adnproservice.cd" />
            </label>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-2xl text-[#01003b] dark:text-slate-100">Preferences</h3>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Langue
              <AppSelect className="mt-2">
                <option>Francais</option>
                <option>Anglais</option>
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Fuseau horaire
              <AppSelect className="mt-2">
                <option>Africa/Kinshasa</option>
                <option>Africa/Lubumbashi</option>
              </AppSelect>
            </label>
          </div>
        </article>
      </div>

      <div className="flex justify-end gap-3">
        <AppButton variant="ghost">Annuler</AppButton>
        <AppButton variant="primary">Enregistrer les changements</AppButton>
      </div>
    </section>
  );
}
