import type { ContratBundleRecord } from "../lib/contratBundleTypes.ts";
import { getContratBundleFromSession, listContratBundlesFromSession } from "../lib/contratBundleStorage.ts";
import { buildContratBundlesFromMissions } from "./buildContratBundles.ts";

export function getContratBundleById(bundleId: string): ContratBundleRecord | null {
  const fromSession = getContratBundleFromSession(bundleId);
  if (fromSession) return fromSession;
  return buildContratBundlesFromMissions().find((b) => b.id === bundleId) ?? null;
}

export function getAllContratBundles(): ContratBundleRecord[] {
  const fromMissions = buildContratBundlesFromMissions();
  const fromSession = listContratBundlesFromSession();
  const ids = new Set(fromMissions.map((b) => b.id));
  const merged = [...fromMissions, ...fromSession.filter((b) => !ids.has(b.id))];
  merged.sort((a, b) => (a.dateGeneration < b.dateGeneration ? 1 : -1));
  return merged;
}
