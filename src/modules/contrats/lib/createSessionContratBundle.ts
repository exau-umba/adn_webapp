import type { ContratBundleRecord } from "./contratBundleTypes.ts";
import { saveContratBundleToSession } from "./contratBundleStorage.ts";
import { agentSnapshot, clientSnapshot } from "./mapPartiesToContratSnapshots.ts";

export interface MissionFormContratInput {
  titre: string;
  clientId: string;
  agentId: string;
  lieu: string;
  typeService: string;
  dateDebut: string;
}

export function createSessionContratBundleAndSave(input: MissionFormContratInput): ContratBundleRecord {
  const suffix = String(Date.now()).slice(-6);
  const missionRef = `MIS-NOUV-${suffix}`;
  const bundleId = `ctr-${Date.now()}`;

  const bundle: ContratBundleRecord = {
    id: bundleId,
    missionId: `temp-${Date.now()}`,
    missionReference: missionRef,
    missionTitre: input.titre.trim() || "Nouvelle mission",
    referenceDossier: `CTR-${suffix}`,
    dateGeneration: input.dateDebut || new Date().toISOString().slice(0, 10),
    clientId: input.clientId,
    agentId: input.agentId,
    client: clientSnapshot(input.clientId),
    agent: agentSnapshot(input.agentId),
  };

  saveContratBundleToSession(bundle);
  return bundle;
}
