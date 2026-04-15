export type MouvementFinanceType = "entree" | "sortie";

/** Mouvement de trésorerie enregistré par l'utilisateur (client → ADN ou ADN → agent). */
export interface MouvementFinance {
  id: string;
  type: MouvementFinanceType;
  montantUsd: number;
  date: string;
  libelle: string;
  missionId?: string;
  /** Pour une sortie : nom de l'agent ou libellé bénéficiaire */
  beneficiaire?: string;
}
