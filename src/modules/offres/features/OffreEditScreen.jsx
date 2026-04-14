import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton, AppInput, AppSelect, AppTextarea } from "../../../shared/ui";
import { offresData } from "../data/offresData.ts";
import { ROUTES } from "../../../core/routes.ts";

export function OffreEditScreen() {
  const navigate = useNavigate();
  const { offreId } = useParams();
  const offre = useMemo(() => offresData.find((item) => item.id === offreId), [offreId]);

  if (!offre) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Offre introuvable</h2>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.offresEmploi)}>
          Retour à la liste
        </AppButton>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Edition</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Modifier l&apos;offre</h2>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.offreEmploiDetail(offre.id))}>
          Retour au détail
        </AppButton>
      </div>

      <form className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
            Intitulé du poste
            <AppInput className="mt-2" defaultValue={offre.titre} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Lieu
            <AppInput className="mt-2" defaultValue={offre.lieu} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Type de contrat
            <AppSelect className="mt-2" defaultValue={offre.contrat}>
              <option>CDI</option>
              <option>CDD</option>
              <option>Stage</option>
              <option>Interim</option>
            </AppSelect>
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
            Résumé
            <AppInput className="mt-2" defaultValue={offre.resume} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
            Description
            <AppTextarea rows={6} className="mt-2 resize-y" defaultValue={offre.description} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Rémunération
            <AppInput className="mt-2" defaultValue={offre.salaire} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Statut
            <AppSelect className="mt-2" defaultValue={offre.statut}>
              <option>Brouillon</option>
              <option>Publiée</option>
              <option>Archivée</option>
            </AppSelect>
          </label>
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
          <AppButton variant="ghost" type="button" onClick={() => navigate(ROUTES.offreEmploiDetail(offre.id))}>
            Annuler
          </AppButton>
          <AppButton variant="primary" type="button">
            Enregistrer
          </AppButton>
        </div>
      </form>
    </section>
  );
}
