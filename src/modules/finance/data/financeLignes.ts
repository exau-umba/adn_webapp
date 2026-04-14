import { missionsData } from "../../missions/data/missionsData.ts";

export type StatutEncaissementClient = "En attente" | "Partiel" | "Paye";
export type StatutVersementAgent = "En attente" | "Planifie" | "Paye";

/** Une ligne = une mission : ce que le client paie à ADN, ce qu'ADN verse à l'agent (démo). */
export interface LigneFinanciereMission {
  missionId: string;
  missionRef: string;
  missionTitre: string;
  clientName: string;
  agentName: string;
  /** Montant facturé au client (USD) — il paie l'entreprise */
  montantFactureClientUsd: number;
  statutEncaissementClient: StatutEncaissementClient;
  /** Montant net / honoraires versés à l'agent (USD) — l'entreprise paie l'agent */
  montantVersementAgentUsd: number;
  statutVersementAgent: StatutVersementAgent;
}

function demoAmounts(index: number) {
  const base = 450 + index * 120;
  return { client: base + 80, agent: base };
}

export const financeLignes: LigneFinanciereMission[] = missionsData.map((m, i) => {
  const { client, agent: agentUsd } = demoAmounts(i);
  const enc: StatutEncaissementClient =
    m.statut === "Terminee" ? "Paye" : m.statut === "En cours" ? "Partiel" : "En attente";
  const ver: StatutVersementAgent =
    m.statut === "Terminee" ? "Paye" : m.statut === "En cours" ? "Planifie" : "En attente";
  return {
    missionId: m.id,
    missionRef: m.reference,
    missionTitre: m.titre,
    clientName: m.clientName,
    agentName: m.agentName,
    montantFactureClientUsd: client,
    statutEncaissementClient: enc,
    montantVersementAgentUsd: agentUsd,
    statutVersementAgent: ver,
  };
});
