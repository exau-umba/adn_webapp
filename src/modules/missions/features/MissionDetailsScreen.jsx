import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton } from "../../../shared/ui";
import { missionsData } from "../data/missionsData.ts";
import { ROUTES } from "../../../core/routes.ts";

function getMissionStatutTone(statut) {
  if (statut === "En cours") return { text: "text-sky-600 dark:text-sky-400", dot: "bg-sky-500" };
  if (statut === "Planifiee") return { text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
  if (statut === "Terminee") return { text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" };
  return { text: "text-slate-500 dark:text-slate-400", dot: "bg-slate-400" };
}

export function MissionDetailsScreen() {
  const navigate = useNavigate();
  const { missionId } = useParams();
  const mission = useMemo(() => missionsData.find((m) => m.id === missionId), [missionId]);

  if (!mission) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Mission introuvable</h2>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.missionManagement)}>
          Retour à la liste
        </AppButton>
      </section>
    );
  }

  const tone = getMissionStatutTone(mission.statut);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Détail mission</p>
          <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">{mission.reference}</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">{mission.titre}</h2>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.missionManagement)}>
          Retour
        </AppButton>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Statut</p>
            <span className={`mt-1 inline-flex items-center gap-2 font-myriad font-semibold ${tone.text}`}>
              <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
              {mission.statut}
            </span>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Prestation</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{mission.typeService}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Lieu</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{mission.lieu}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Client</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{mission.clientName}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Agent</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{mission.agentName}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Période</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">
              {mission.dateDebut}
              {mission.dateFin ? ` → ${mission.dateFin}` : " (en cours)"}
            </p>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Notes</p>
            <p className="mt-2 whitespace-pre-wrap font-myriad text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {mission.notes}
            </p>
          </div>
        </div>
      </article>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Contrats liés</h3>
          <p className="mt-2 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Fiche client avec ADN, annexe tripartite mission, et renvoi vers le contrat employeur de l&apos;agent (déjà
            signé au recrutement — module Agents).
          </p>
          <AppButton variant="secondary" className="mt-4" onClick={() => navigate(ROUTES.contratBundleDetail(`ctr-${mission.id}`))}>
            Ouvrir le dossier contractuel
          </AppButton>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Flux financiers</h3>
          <p className="mt-2 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Encaissement client → ADN PRO SERVICE, puis versement à l&apos;agent pour cette mission.
          </p>
          <AppButton variant="secondary" className="mt-4" onClick={() => navigate(ROUTES.financeForMission(mission.id))}>
            Voir la ligne en finance
          </AppButton>
        </article>
      </div>

      <div className="flex flex-wrap gap-3">
        <AppButton variant="primary" onClick={() => navigate(ROUTES.missionEdit(mission.id))}>
          Modifier
        </AppButton>
      </div>
    </section>
  );
}
