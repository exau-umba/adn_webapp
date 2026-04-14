import { missionsData } from "../../missions/data/missionsData.ts";
import type { ContratBundleRecord } from "../lib/contratBundleTypes.ts";
import { agentSnapshot, clientSnapshot } from "../lib/mapPartiesToContratSnapshots.ts";

export function buildContratBundlesFromMissions(): ContratBundleRecord[] {
  return missionsData.map((m) => ({
    id: `ctr-${m.id}`,
    missionId: m.id,
    missionReference: m.reference,
    missionTitre: m.titre,
    referenceDossier: `CTR-${m.reference.replace("MIS-", "")}`,
    dateGeneration: m.dateDebut,
    clientId: m.clientId,
    agentId: m.agentId,
    client: clientSnapshot(m.clientId),
    agent: agentSnapshot(m.agentId),
  }));
}
