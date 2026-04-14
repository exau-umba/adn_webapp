import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { agentsData } from "../data/agentsData.ts";
import { getEmployeurContratForAgent } from "../../contrats/data/employeurContratResolve.ts";
import { EngagementAgentDocument } from "../../contrats/features/EngagementAgentDocument";

export function AgentEmployeurContratScreen() {
  const navigate = useNavigate();
  const { agentId } = useParams();
  const agent = useMemo(() => agentsData.find((a) => a.id === agentId), [agentId]);
  const contrat = useMemo(() => (agentId ? getEmployeurContratForAgent(agentId) : null), [agentId]);

  if (!contrat) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Contrat employeur introuvable</h2>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.agentManagement)}>
          Retour aux agents
        </AppButton>
      </section>
    );
  }

  const isRecrueSession = Boolean(agentId?.startsWith("recrue-"));

  return (
    <section className="space-y-6 print:space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3 print:hidden">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Module Agents</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Contrat employeur</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Lien direct <strong>agent ↔ ADN PRO SERVICE SARL</strong>, établi au recrutement ou à l&apos;ajout au dossier.
            Les missions ultérieures s&apos;appuient sur ce contrat via une annexe tripartite.
          </p>
          {agent ? (
            <p className="mt-2 font-myriad text-sm font-semibold text-[#01003b] dark:text-slate-100">{agent.name}</p>
          ) : isRecrueSession ? (
            <p className="mt-2 font-myriad text-sm font-semibold text-amber-700 dark:text-amber-300">
              Recrue (démo) — complétez le dossier agent pour rattacher au profil.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <AppButton variant="ghost" onClick={() => navigate(agent ? ROUTES.agentDetail(agent.id) : ROUTES.agentManagement)}>
            {agent ? "Retour fiche agent" : "Retour agents"}
          </AppButton>
          <AppButton variant="secondary" type="button" onClick={() => window.print()}>
            Imprimer
          </AppButton>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 print:shadow-none">
        <EngagementAgentDocument
          agent={contrat.agent}
          referenceDossier={contrat.referenceDossier}
          dateDocument={contrat.dateGeneration}
          variant="employeur"
        />
      </div>
    </section>
  );
}
