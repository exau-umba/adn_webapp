export type MissionStatut = "Planifiee" | "En cours" | "Terminee" | "Annulee";

export interface Mission {
  id: string;
  reference: string;
  titre: string;
  clientId: string;
  clientName: string;
  agentId: string;
  agentName: string;
  lieu: string;
  typeService: string;
  statut: MissionStatut;
  dateDebut: string;
  dateFin: string | null;
  notes: string;
}

export const missionsData: Mission[] = [
  {
    id: "mis-001",
    reference: "MIS-2026-0142",
    titre: "Menage hebdomadaire — Residence Mbuyi",
    clientId: "cl-001",
    clientName: "Residence Mbuyi",
    agentId: "marc-antoine-dupont",
    agentName: "Marc-Antoine Dupont",
    lieu: "Kinshasa, Gombe",
    typeService: "Menage",
    statut: "En cours",
    dateDebut: "2026-04-01",
    dateFin: null,
    notes: "Mercredis 8h-14h. Cle badge securite.",
  },
  {
    id: "mis-002",
    reference: "MIS-2026-0098",
    titre: "Reception hotel — renfort cuisine",
    clientId: "cl-002",
    clientName: "Hotel Lumiere",
    agentId: "sophie-lavalliere",
    agentName: "Sophie Lavalliere",
    lieu: "Lubumbashi",
    typeService: "Cuisine / Evenementiel",
    statut: "Planifiee",
    dateDebut: "2026-04-18",
    dateFin: "2026-04-18",
    notes: "Soiree gala 120 couverts.",
  },
  {
    id: "mis-003",
    reference: "MIS-2025-2210",
    titre: "Garde enfants week-end",
    clientId: "cl-003",
    clientName: "Villa Kivu",
    agentId: "marc-antoine-dupont",
    agentName: "Marc-Antoine Dupont",
    lieu: "Goma",
    typeService: "Garde d'enfants",
    statut: "Terminee",
    dateDebut: "2025-12-06",
    dateFin: "2025-12-08",
    notes: "Client satisfait — rapport cloture.",
  },
];
