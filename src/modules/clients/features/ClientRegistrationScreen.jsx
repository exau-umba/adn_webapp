import { useNavigate } from "react-router-dom";
import { AppButton, AppInput, AppSelect } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";

export function ClientRegistrationScreen() {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Nouveau client</p>
          <h2 className="mt-2 font-brand text-4xl text-[#01003b] dark:text-slate-100">Ajout d'un client</h2>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.clientManagement)}>
          Retour
        </AppButton>
      </div>

      <form className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-2xl text-[#01003b] dark:text-slate-100">Informations client</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Nom client
              <AppInput className="mt-2" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Contact principal
              <AppInput className="mt-2" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Telephone
              <AppInput className="mt-2" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Ville
              <AppInput className="mt-2" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
              Adresse complete
              <AppInput className="mt-2" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Secteur
              <AppSelect className="mt-2">
                <option>Residence privee</option>
                <option>Hotellerie</option>
                <option>Entreprise</option>
                <option>Commerce</option>
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Statut initial
              <AppSelect className="mt-2">
                <option>Actif</option>
                <option>Suspendu</option>
              </AppSelect>
            </label>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <AppButton variant="ghost" onClick={() => navigate(ROUTES.clientManagement)}>
            Annuler
          </AppButton>
          <AppButton variant="primary">Enregistrer le client</AppButton>
        </div>
      </form>
    </section>
  );
}
