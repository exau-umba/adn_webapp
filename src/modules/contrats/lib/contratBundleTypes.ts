/** Données figées pour générer les fiches engagement client / agent liées à une mission. */
export interface ContratClientSnapshot {
  nomComplet: string;
  adresseComplete: string;
  telephone: string;
  profession: string;
  numeroIdentite: string;
}

export interface ContratAgentSnapshot {
  nomComplet: string;
  dateLieuNaissance: string;
  adresseActuelle: string;
  telephone: string;
  numeroPieceIdentite: string;
  personneReferenceFamille: string;
  telephoneReference: string;
}

export interface ContratBundleRecord {
  id: string;
  missionId: string;
  missionReference: string;
  missionTitre: string;
  referenceDossier: string;
  dateGeneration: string;
  client: ContratClientSnapshot;
  agent: ContratAgentSnapshot;
}

export const CONTRAT_BUNDLE_STORAGE_PREFIX = "adn_contrat_bundle_";
