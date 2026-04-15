import { missionsData } from "../../missions/data/missionsData.ts";

const STORAGE_KEY = "adn_incidents_v1";

const seedIncidents = [
  {
    id: "INC-1042",
    mission: "MIS-2026-0142",
    type: "Retard",
    niveau: "Moyen",
    statut: "Ouvert",
    date: "2026-04-15",
    description: "Arrivée de l'agent avec 50 minutes de retard.",
    source: "Client",
    clientSignaleur: "Residence Mbuyi",
    agentConcerne: "Marc-Antoine Dupont",
  },
  {
    id: "INC-1041",
    mission: "MIS-2026-0098",
    type: "Absence",
    niveau: "Critique",
    statut: "Escalade",
    date: "2026-04-14",
    description: "Aucune présence constatée sur la mission planifiée.",
    source: "Superviseur",
    clientSignaleur: "Hotel Lumiere",
    agentConcerne: "Sophie Lavalliere",
  },
  {
    id: "INC-1039",
    mission: "MIS-2025-2210",
    type: "Conflit",
    niveau: "Faible",
    statut: "Résolu",
    date: "2026-04-13",
    description: "Différend mineur entre client et agent, traité sur place.",
    source: "Agent",
    clientSignaleur: "Villa Kivu",
    agentConcerne: "Marc-Antoine Dupont",
  },
];

function resolveMissionParties(missionValue) {
  const mission = missionsData.find((m) => m.reference === missionValue || m.id === missionValue);
  if (!mission) return null;
  return { clientName: mission.clientName, agentName: mission.agentName, missionRef: mission.reference };
}

function normalizeIncident(incident) {
  const parties = resolveMissionParties(incident.mission);
  return {
    ...incident,
    mission: parties?.missionRef ?? incident.mission,
    clientSignaleur: incident.clientSignaleur ?? parties?.clientName ?? "Client non renseigné",
    agentConcerne: incident.agentConcerne ?? parties?.agentName ?? "Agent non renseigné",
  };
}

function hasWindow() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadIncidents() {
  if (!hasWindow()) return seedIncidents;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedIncidents;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeIncident) : seedIncidents.map(normalizeIncident);
  } catch {
    return seedIncidents.map(normalizeIncident);
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
  const parties = resolveMissionParties(payload.mission);
  const incident = {
    id: nextIncidentId(items),
    date: new Date().toISOString().slice(0, 10),
    statut: "Ouvert",
    ...payload,
    mission: parties?.missionRef ?? payload.mission,
    clientSignaleur: payload.clientSignaleur ?? parties?.clientName ?? "Client non renseigné",
    agentConcerne: payload.agentConcerne ?? parties?.agentName ?? "Agent non renseigné",
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
