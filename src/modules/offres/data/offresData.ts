export type OffreStatut = "Brouillon" | "Publiée" | "Archivée";

export type OffreContrat = "CDI" | "CDD" | "Stage" | "Interim";

export interface OffreEmploi {
  id: string;
  titre: string;
  lieu: string;
  contrat: OffreContrat;
  statut: OffreStatut;
  resume: string;
  description: string;
  salaire: string;
  datePublication: string | null;
  dateMiseAJour: string;
}

export const offresData: OffreEmploi[] = [
  {
    id: "off-001",
    titre: "Agent de menage — residence haut standing",
    lieu: "Kinshasa — Gombe",
    contrat: "CDI",
    statut: "Publiée",
    resume: "Experience 2 ans minimum, references verifiees.",
    description:
      "Nous recherchons un(e) professionnel(le) du menage pour une residence privee a Gombe. Horaires flexibles, tenue exigee.",
    salaire: "A negocier selon profil",
    datePublication: "2026-04-01",
    dateMiseAJour: "2026-04-10",
  },
  {
    id: "off-002",
    titre: "Garde d'enfants bilingue (FR/EN)",
    lieu: "Lubumbashi",
    contrat: "CDD",
    statut: "Brouillon",
    resume: "Garde ponctuelle et accompagnement scolaire le soir.",
    description:
      "Famille expatriee, enfants 6 et 9 ans. Permis de conduire souhaite. Disponibilite en semaine 16h-20h.",
    salaire: "Selon grille ADN",
    datePublication: null,
    dateMiseAJour: "2026-04-12",
  },
  {
    id: "off-003",
    titre: "Chef cuisinier — evenementiel",
    lieu: "Kinshasa",
    contrat: "Interim",
    statut: "Archivée",
    resume: "Missions week-end pour receptions privees.",
    description:
      "Profil autonome, maitrise du service a l'assiette et hygiene HACCP. Contrat par mission.",
    salaire: "Journalier + panier",
    datePublication: "2025-11-15",
    dateMiseAJour: "2026-01-20",
  },
];
