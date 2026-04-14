import type { ContratBundleRecord } from "./contratBundleTypes.ts";
import { CONTRAT_BUNDLE_STORAGE_PREFIX } from "./contratBundleTypes.ts";

export function saveContratBundleToSession(bundle: ContratBundleRecord) {
  try {
    sessionStorage.setItem(`${CONTRAT_BUNDLE_STORAGE_PREFIX}${bundle.id}`, JSON.stringify(bundle));
  } catch {
    /* ignore quota / private mode */
  }
}

export function getContratBundleFromSession(bundleId: string): ContratBundleRecord | null {
  try {
    const raw = sessionStorage.getItem(`${CONTRAT_BUNDLE_STORAGE_PREFIX}${bundleId}`);
    if (!raw) return null;
    return JSON.parse(raw) as ContratBundleRecord;
  } catch {
    return null;
  }
}

export function listContratBundlesFromSession(): ContratBundleRecord[] {
  const out: ContratBundleRecord[] = [];
  try {
    for (let i = 0; i < sessionStorage.length; i += 1) {
      const key = sessionStorage.key(i);
      if (!key?.startsWith(CONTRAT_BUNDLE_STORAGE_PREFIX)) continue;
      const raw = sessionStorage.getItem(key);
      if (!raw) continue;
      out.push(JSON.parse(raw) as ContratBundleRecord);
    }
  } catch {
    return out;
  }
  return out.sort((a, b) => (a.dateGeneration < b.dateGeneration ? 1 : -1));
}
