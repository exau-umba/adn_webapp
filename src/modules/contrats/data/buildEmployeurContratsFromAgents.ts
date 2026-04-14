import { agentsData } from "../../agents/data/agentsData.ts";
import type { ContratEmployeurAgentRecord } from "../lib/contratEmployeurTypes.ts";
import { agentSnapshot } from "../lib/mapPartiesToContratSnapshots.ts";

/** Un contrat employeur par agent inscrit (démo : date de génération fictive au recrutement). */
export function buildEmployeurContratsFromAgents(): ContratEmployeurAgentRecord[] {
  return agentsData.map((a, index) => ({
    id: `cagr-${a.id}`,
    agentId: a.id,
    referenceDossier: `EMP-ADN-${String(index + 1).padStart(4, "0")}`,
    dateGeneration: "2025-03-10",
    agent: agentSnapshot(a.id),
  }));
}
