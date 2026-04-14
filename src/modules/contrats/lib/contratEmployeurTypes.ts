import type { ContratAgentSnapshot } from "./contratBundleTypes.ts";

/** Contrat bilatéral agent ↔ ADN (généré au recrutement, indépendant d'une mission). */
export interface ContratEmployeurAgentRecord {
  id: string;
  agentId: string;
  referenceDossier: string;
  dateGeneration: string;
  agent: ContratAgentSnapshot;
}

export const EMPLOYEUR_CONTRAT_STORAGE_PREFIX = "adn_employeur_contrat_";
