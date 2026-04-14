import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { getContratBundleById } from "../data/contratBundleResolve.ts";
import { EngagementClientDocument } from "./EngagementClientDocument";
import { TripartiteMissionAnnex } from "./TripartiteMissionAnnex";

export function ContratBundleDetailScreen() {
  const navigate = useNavigate();
  const { bundleId } = useParams();
  const bundle = useMemo(() => (bundleId ? getContratBundleById(bundleId) : null), [bundleId]);

  if (!bundle) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Dossier introuvable</h2>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.contratManagement)}>
          Retour aux contrats
        </AppButton>
      </section>
    );
  }

  const dateDoc = bundle.dateGeneration;

  return (
    <section className="space-y-6 print:space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3 print:hidden">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">
            Dossier contractuel mission
          </p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">
            {bundle.missionTitre}
          </h2>
          <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
            {bundle.missionReference} — {bundle.referenceDossier}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AppButton variant="ghost" onClick={() => navigate(ROUTES.contratManagement)}>
            Liste
          </AppButton>
          <AppButton variant="secondary" type="button" onClick={() => window.print()}>
            Imprimer
          </AppButton>
          {!bundle.missionId.startsWith("temp-") ? (
            <AppButton variant="primary" type="button" onClick={() => navigate(ROUTES.missionDetail(bundle.missionId))}>
              Voir la mission
            </AppButton>
          ) : null}
          <AppButton variant="ghost" type="button" onClick={() => navigate(ROUTES.financeManagement)}>
            Finance
          </AppButton>
          {bundle.agentId ? (
            <AppButton variant="ghost" type="button" onClick={() => navigate(ROUTES.agentEmployeurContrat(bundle.agentId))}>
              Contrat employeur agent
            </AppButton>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border border-[#08047a]/20 bg-[#f8f9ff] p-4 font-myriad text-sm text-[#01003b] dark:border-indigo-800 dark:bg-indigo-950/30 dark:text-slate-200 print:border print:bg-white">
          <p className="font-semibold">Mission tripartite</p>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Le <strong>client</strong> est couvert par sa fiche d&apos;engagement avec ADN. L&apos;<strong>agent</strong>{" "}
          est couvert par son <strong>contrat employeur</strong> (signé au recrutement, visible dans le module Agents).
          La mission <strong>{bundle.missionReference}</strong> articule les trois parties pour cette prestation. La
          facturation client et les versements agent sont suivis dans le module Finance.
        </p>
      </div>

      <div className="space-y-10 print:space-y-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 print:shadow-none">
          <EngagementClientDocument
            client={bundle.client}
            referenceDossier={bundle.referenceDossier}
            dateDocument={dateDoc}
          />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 print:shadow-none">
          <TripartiteMissionAnnex
            missionReference={bundle.missionReference}
            missionTitre={bundle.missionTitre}
            referenceDossier={bundle.referenceDossier}
            dateDocument={dateDoc}
            clientName={bundle.client.nomComplet}
            agentName={bundle.agent.nomComplet}
            agentId={bundle.agentId}
          />
        </div>
      </div>
    </section>
  );
}
