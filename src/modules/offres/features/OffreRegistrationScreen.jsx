import { useNavigate } from "react-router-dom";
import { AppButton, AppInput, AppSelect, AppTextarea } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";

export function OffreRegistrationScreen() {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Nouvelle annonce</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Publier une offre</h2>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.offresEmploi)}>
          Retour
        </AppButton>
      </div>

      <form className="space-y-5">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-xl text-[#01003b] dark:text-slate-100">Contenu de l&apos;annonce</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
              Intitulé du poste
              <AppInput className="mt-2" placeholder="Ex. Agent de ménage résidence" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Lieu
              <AppInput className="mt-2" placeholder="Ville, quartier..." />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Type de contrat
              <AppSelect className="mt-2">
                <option>CDI</option>
                <option>CDD</option>
                <option>Stage</option>
                <option>Interim</option>
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
              Résumé (ligne accroche site)
              <AppInput className="mt-2" placeholder="Une phrase pour la liste des offres" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
              Description complète
              <AppTextarea rows={6} className="mt-2 resize-y" placeholder="Missions, profil recherché, avantages..." />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Rémunération / mentions
              <AppInput className="mt-2" placeholder="Ex. Selon expérience" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Statut sur le site
              <AppSelect className="mt-2">
                <option>Brouillon</option>
                <option>Publiée</option>
                <option>Archivée</option>
              </AppSelect>
            </label>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <AppButton variant="ghost" onClick={() => navigate(ROUTES.offresEmploi)}>
            Annuler
          </AppButton>
          <AppButton variant="primary" type="button">
            Enregistrer l&apos;offre
          </AppButton>
        </div>
      </form>
    </section>
  );
}
