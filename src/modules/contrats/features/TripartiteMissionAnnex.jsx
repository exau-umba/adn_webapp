import { useNavigate } from "react-router-dom";
import { AppButton } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";

/**
 * Annexe mission : lie le cadre client↔ADN et le contrat employeur agent↔ADN pour l'opération concrète.
 */
export function TripartiteMissionAnnex({
  missionReference,
  missionTitre,
  referenceDossier,
  dateDocument,
  clientName,
  agentName,
  agentId,
}) {
  const navigate = useNavigate();
  return (
    <article className="space-y-6 font-myriad text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      <header className="border-b border-slate-200 pb-4 dark:border-slate-600">
        <p className="text-xs font-bold uppercase tracking-widest text-[#08047a] dark:text-indigo-300">
          Annexe — Mission tripartite
        </p>
        <h3 className="mt-2 font-brand text-lg text-[#01003b] dark:text-slate-100">ADN PRO SERVICE SARL</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Mission <strong>{missionReference}</strong> — {missionTitre} — Dossier mission :{" "}
          <strong>{referenceDossier}</strong> — Date : <strong>{dateDocument}</strong>
        </p>
      </header>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">1. Parties</h4>
        <ul className="mt-2 list-none space-y-1.5">
          <li>
            <span className="text-slate-500 dark:text-slate-400">Client (donneur d&apos;ordre) :</span> {clientName}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Intermédiaire employeur :</span> ADN PRO SERVICE SARL
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Agent exécutant :</span> {agentName}
          </li>
        </ul>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">2. Fondement contractuel</h4>
        <p className="mt-2">
          Le <strong>client</strong> est lié à ADN PRO SERVICE SARL par la fiche d&apos;engagement client (et le cadre
          contractuel applicable). L&apos;<strong>agent</strong> est lié à ADN PRO SERVICE SARL par son{" "}
          <strong>contrat employeur</strong> établi à son recrutement ou à son inscription au dossier agents,{" "}
          <strong>avant toute mission</strong>. La présente mission ne remplace ni l&apos;un ni l&apos;autre de ces
          liens : elle les <strong>articule</strong> pour la prestation décrite dans la mission.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">3. Exécution de la mission</h4>
        <p className="mt-2">
          Pour cette mission, l&apos;agent agit sous la responsabilité d&apos;ADN PRO SERVICE SARL auprès du client
          désigné. Toute modification, résiliation ou litige relève des procédures internes ADN et des clauses des
          contrats de base (client et employeur agent).
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">4. Document de référence — contrat employeur de l&apos;agent</h4>
        <p className="mt-2">
          Les obligations de l&apos;agent (dont non-contournement, confidentialité, fautes graves) sont celles du
          contrat employeur déjà signé avec la société. Vous pouvez consulter ce document depuis le module Agents.
        </p>
        {agentId ? (
          <AppButton
            variant="secondary"
            className="mt-3"
            type="button"
            onClick={() => navigate(ROUTES.agentEmployeurContrat(agentId))}
          >
            Voir le contrat employeur de l&apos;agent
          </AppButton>
        ) : (
          <p className="mt-3 font-myriad text-xs text-amber-700 dark:text-amber-300">
            Identifiant agent absent sur ce dossier — ouvrez le contrat depuis la fiche agent.
          </p>
        )}
      </section>
    </article>
  );
}
