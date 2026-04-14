import type { ContratEmployeurAgentRecord } from "../lib/contratEmployeurTypes.ts";
import { getEmployeurContratFromSession, listEmployeurContratsFromSession } from "../lib/employeurContratStorage.ts";
import { buildEmployeurContratsFromAgents } from "./buildEmployeurContratsFromAgents.ts";

export function getEmployeurContratForAgent(agentId: string): ContratEmployeurAgentRecord | null {
  const fromSession = getEmployeurContratFromSession(agentId);
  if (fromSession) return fromSession;
  return buildEmployeurContratsFromAgents().find((c) => c.agentId === agentId) ?? null;
}

export function getAllEmployeurContrats(): ContratEmployeurAgentRecord[] {
  const fromAgents = buildEmployeurContratsFromAgents();
  const fromSession = listEmployeurContratsFromSession();
  const byAgent = new Map<string, ContratEmployeurAgentRecord>();
  for (const c of fromAgents) {
    byAgent.set(c.agentId, c);
  }
  for (const c of fromSession) {
    byAgent.set(c.agentId, c);
  }
  return [...byAgent.values()].sort((a, b) => (a.referenceDossier < b.referenceDossier ? -1 : 1));
}
