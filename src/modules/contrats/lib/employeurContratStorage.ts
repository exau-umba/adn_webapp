import type { ContratEmployeurAgentRecord } from "./contratEmployeurTypes.ts";
import { EMPLOYEUR_CONTRAT_STORAGE_PREFIX } from "./contratEmployeurTypes.ts";

export function saveEmployeurContratToSession(record: ContratEmployeurAgentRecord) {
  try {
    sessionStorage.setItem(`${EMPLOYEUR_CONTRAT_STORAGE_PREFIX}${record.agentId}`, JSON.stringify(record));
  } catch {
    /* ignore */
  }
}

export function getEmployeurContratFromSession(agentId: string): ContratEmployeurAgentRecord | null {
  try {
    const raw = sessionStorage.getItem(`${EMPLOYEUR_CONTRAT_STORAGE_PREFIX}${agentId}`);
    if (!raw) return null;
    return JSON.parse(raw) as ContratEmployeurAgentRecord;
  } catch {
    return null;
  }
}

export function listEmployeurContratsFromSession(): ContratEmployeurAgentRecord[] {
  const out: ContratEmployeurAgentRecord[] = [];
  try {
    for (let i = 0; i < sessionStorage.length; i += 1) {
      const key = sessionStorage.key(i);
      if (!key?.startsWith(EMPLOYEUR_CONTRAT_STORAGE_PREFIX)) continue;
      const raw = sessionStorage.getItem(key);
      if (!raw) continue;
      out.push(JSON.parse(raw) as ContratEmployeurAgentRecord);
    }
  } catch {
    return out;
  }
  return out;
}
