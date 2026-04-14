import { agentsData } from "../../agents/data/agentsData.ts";
import { clientsData } from "../../clients/data/clientsData.ts";
import type { ContratAgentSnapshot, ContratClientSnapshot } from "./contratBundleTypes.ts";

export function clientSnapshot(clientId: string): ContratClientSnapshot {
  const c = clientsData.find((x) => x.id === clientId);
  if (!c) {
    return {
      nomComplet: "—",
      adresseComplete: "—",
      telephone: "—",
      profession: "À renseigner",
      numeroIdentite: "À renseigner",
    };
  }
  return {
    nomComplet: `${c.contact} (représentant ${c.name})`,
    adresseComplete: c.address,
    telephone: c.phone,
    profession: "À renseigner sur la fiche signée",
    numeroIdentite: "À renseigner sur la fiche signée",
  };
}

export function agentSnapshot(agentId: string): ContratAgentSnapshot {
  const a = agentsData.find((x) => x.id === agentId);
  if (!a) {
    return {
      nomComplet: "—",
      dateLieuNaissance: "À compléter",
      adresseActuelle: "—",
      telephone: "—",
      numeroPieceIdentite: "À compléter",
      personneReferenceFamille: "À compléter",
      telephoneReference: "À compléter",
    };
  }
  return {
    nomComplet: a.name,
    dateLieuNaissance: "À compléter (dossier agent)",
    adresseActuelle: `${a.city} — détail en dossier RH`,
    telephone: a.phone,
    numeroPieceIdentite: "Conforme pièce déposée au dossier",
    personneReferenceFamille: "À compléter par l'agent",
    telephoneReference: "À compléter par l'agent",
  };
}
