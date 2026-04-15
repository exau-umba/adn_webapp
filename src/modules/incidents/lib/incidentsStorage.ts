const STORAGE_KEY = "adn_incidents_v1";

const seedIncidents = [
  {
    id: "INC-1042",
    mission: "MIS-24006",
    type: "Retard",
    niveau: "Moyen",
    statut: "Ouvert",
    date: "2026-04-15",
    description: "Arrivée de l'agent avec 50 minutes de retard.",
    source: "Client",
  },
  {
    id: "INC-1041",
    mission: "MIS-24004",
    type: "Absence",
    niveau: "Critique",
    statut: "Escalade",
    date: "2026-04-14",
    description: "Aucune présence constatée sur la mission planifiée.",
    source: "Superviseur",
  },
  {
    id: "INC-1039",
    mission: "MIS-23998",
    type: "Conflit",
    niveau: "Faible",
    statut: "Résolu",
    date: "2026-04-13",
    description: "Différend mineur entre client et agent, traité sur place.",
    source: "Agent",
  },
];

function hasWindow() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadIncidents() {
  if (!hasWindow()) return seedIncidents;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedIncidents;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedIncidents;
  } catch {
    return seedIncidents;
  }
}

export function saveIncidents(items) {
  if (!hasWindow()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function nextIncidentId(items) {
  const maxNum = items.reduce((acc, it) => {
    const num = Number.parseInt(String(it.id || "").replace("INC-", ""), 10);
    return Number.isNaN(num) ? acc : Math.max(acc, num);
  }, 1000);
  return `INC-${String(maxNum + 1).padStart(4, "0")}`;
}

export function createIncident(payload) {
  const items = loadIncidents();
  const incident = {
    id: nextIncidentId(items),
    date: new Date().toISOString().slice(0, 10),
    statut: "Ouvert",
    ...payload,
  };
  const next = [incident, ...items];
  saveIncidents(next);
  return incident;
}

export function findIncidentById(incidentId) {
  return loadIncidents().find((it) => it.id === incidentId) ?? null;
}

export function updateIncident(incidentId, patch) {
  const next = loadIncidents().map((it) => (it.id === incidentId ? { ...it, ...patch } : it));
  saveIncidents(next);
  return next.find((it) => it.id === incidentId) ?? null;
}
