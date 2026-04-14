import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton } from "../../../shared/ui";
import { offresData } from "../data/offresData.ts";
import { ROUTES } from "../../../core/routes.ts";

function getOffreStatutTone(statut) {
  if (statut === "Publiée") return { text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" };
  if (statut === "Brouillon") return { text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
  return { text: "text-slate-500 dark:text-slate-400", dot: "bg-slate-400" };
}

export function OffreDetailsScreen() {
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

  const tone = getOffreStatutTone(offre.statut);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Fiche offre</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">{offre.titre}</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">{offre.lieu} · {offre.contrat}</p>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.offresEmploi)}>
          Retour
        </AppButton>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Statut</p>
            <span className={`mt-1 inline-flex items-center gap-2 font-myriad font-semibold ${tone.text}`}>
              <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
              {offre.statut}
            </span>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Publication</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">
              {offre.datePublication ?? "Non publiée"}
            </p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Dernière mise à jour</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{offre.dateMiseAJour}</p>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Rémunération</p>
            <p className="mt-1 font-myriad text-slate-700 dark:text-slate-200">{offre.salaire}</p>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Résumé</p>
            <p className="mt-1 font-myriad text-slate-700 dark:text-slate-200">{offre.resume}</p>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Description</p>
            <p className="mt-2 whitespace-pre-wrap font-myriad text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {offre.description}
            </p>
          </div>
        </div>
      </article>

      <div className="flex flex-wrap gap-3">
        <AppButton variant="primary" onClick={() => navigate(ROUTES.offreEmploiEdit(offre.id))}>
          Modifier l&apos;offre
        </AppButton>
        <AppButton variant="secondary" type="button">
          Prévisualiser sur le site
        </AppButton>
      </div>
    </section>
  );
}
