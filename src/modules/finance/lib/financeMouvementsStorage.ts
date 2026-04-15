import type { MouvementFinance } from "../types/mouvements.ts";

const STORAGE_KEY = "adn_finance_mouvements_v1";

export function loadMouvements(): MouvementFinance[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MouvementFinance[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMouvements(mouvements: MouvementFinance[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mouvements));
  } catch {
    /* quota / mode privé */
  }
}

export function newMouvementId() {
  return `mv-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
