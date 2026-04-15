import type { MouvementFinance } from "../types/mouvements.ts";

export interface PointSolde {
  date: string;
  soldeCumule: number;
}

export interface MoisFlux {
  mois: string;
  label: string;
  entrees: number;
  sorties: number;
}

/** Points pour courbe solde cumulé (tri chronologique, même jour cumulé). */
export function buildSoldeCumuleParDate(mouvements: MouvementFinance[]): PointSolde[] {
  const sorted = [...mouvements].sort((a, b) => a.date.localeCompare(b.date));
  const byDay = new Map<string, number>();
  for (const m of sorted) {
    const delta = m.type === "entree" ? m.montantUsd : -m.montantUsd;
    byDay.set(m.date, (byDay.get(m.date) ?? 0) + delta);
  }
  const dates = [...byDay.keys()].sort((a, b) => a.localeCompare(b));
  let cumul = 0;
  return dates.map((date) => {
    cumul += byDay.get(date) ?? 0;
    return { date, soldeCumule: cumul };
  });
}

/** Agrégation par mois (AAAA-MM) pour barres entrées / sorties. */
export function buildFluxParMois(mouvements: MouvementFinance[], derniersMois = 8): MoisFlux[] {
  const now = new Date();
  const buckets: MoisFlux[] = [];
  for (let i = derniersMois - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mois = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
    buckets.push({ mois, label, entrees: 0, sorties: 0 });
  }
  const indexParMois = new Map(buckets.map((b, idx) => [b.mois, idx]));
  for (const m of mouvements) {
    const mois = m.date.slice(0, 7);
    const idx = indexParMois.get(mois);
    if (idx === undefined) continue;
    if (m.type === "entree") buckets[idx].entrees += m.montantUsd;
    else buckets[idx].sorties += m.montantUsd;
  }
  return buckets;
}

export function totauxMouvements(mouvements: MouvementFinance[]) {
  let entrees = 0;
  let sorties = 0;
  for (const m of mouvements) {
    if (m.type === "entree") entrees += m.montantUsd;
    else sorties += m.montantUsd;
  }
  return { entrees, sorties, solde: entrees - sorties };
}
