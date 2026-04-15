import { buildFluxParMois, buildSoldeCumuleParDate } from "../lib/financeChartData.ts";

const W = 520;
const H = 200;
const PAD = { l: 48, r: 16, t: 16, b: 36 };

/** Courbe du solde cumulé (entrées − sorties dans le temps). */
export function FinanceSoldeEvolutionChart({ mouvements }) {
  const points = buildSoldeCumuleParDate(mouvements);
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  if (points.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/80 font-myriad text-sm text-slate-500 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
        Enregistrez des entrées et sorties pour afficher l&apos;évolution du solde.
      </div>
    );
  }

  const minS = Math.min(0, ...points.map((p) => p.soldeCumule));
  const maxS = Math.max(0, ...points.map((p) => p.soldeCumule), 1);
  const range = maxS - minS || 1;
  const n = points.length;
  const xAt = (i) => PAD.l + innerW * (n <= 1 ? 0.5 : i / (n - 1));
  const yAt = (v) => PAD.t + innerH - ((v - minS) / range) * innerH;

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(p.soldeCumule).toFixed(1)}`)
    .join(" ");

  const last = points[points.length - 1];

  return (
    <div>
      <p className="mb-2 font-myriad text-xs text-slate-500 dark:text-slate-400">
        Solde cumulé (USD) — dernier point : <strong className="text-[#01003b] dark:text-slate-100">{last.soldeCumule.toFixed(0)}</strong>
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-full text-slate-600 dark:text-slate-300" role="img" aria-label="Évolution du solde">
        <line x1={PAD.l} y1={yAt(0)} x2={W - PAD.r} y2={yAt(0)} stroke="currentColor" strokeOpacity="0.2" strokeDasharray="4 4" />
        <path d={pathD} fill="none" stroke="#08047a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-indigo-400" />
        {points.map((p, i) => (
          <circle key={p.date} cx={xAt(i)} cy={yAt(p.soldeCumule)} r="4" fill="#08047a" className="dark:fill-indigo-400" />
        ))}
        <text x={PAD.l} y={H - 8} className="fill-slate-500 text-[10px] font-myriad">
          {points[0].date} → {last.date}
        </text>
      </svg>
    </div>
  );
}

/** Barres : entrées vs sorties par mois. */
export function FinanceFluxMensuelChart({ mouvements }) {
  const mois = buildFluxParMois(mouvements, 8);
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const barGap = 6;
  const groupW = innerW / mois.length;
  const barW = (groupW - barGap) / 2;
  const maxVal = Math.max(1, ...mois.flatMap((m) => [m.entrees, m.sorties]));

  const hasData = mois.some((m) => m.entrees > 0 || m.sorties > 0);

  if (!hasData) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/80 font-myriad text-sm text-slate-500 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
        Les barres apparaîtront dès qu&apos;il y a des flux sur un mois donné.
      </div>
    );
  }

  return (
    <div>
      <p className="mb-2 font-myriad text-xs text-slate-500 dark:text-slate-400">
        Entrées (vert) et sorties (ambre) par mois — USD
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-full" role="img" aria-label="Flux par mois">
        <text x={PAD.l} y={14} className="fill-emerald-600 text-[10px] font-myriad font-semibold dark:fill-emerald-400">
          Entrées
        </text>
        <text x={PAD.l + 52} y={14} className="fill-amber-600 text-[10px] font-myriad font-semibold dark:fill-amber-400">
          Sorties
        </text>
        {mois.map((m, i) => {
          const x0 = PAD.l + i * groupW + barGap / 2;
          const hE = (m.entrees / maxVal) * innerH;
          const hS = (m.sorties / maxVal) * innerH;
          const yBase = PAD.t + innerH;
          return (
            <g key={m.mois}>
              <rect x={x0} y={yBase - hE} width={barW} height={hE} rx="3" fill="#059669" className="dark:fill-emerald-500" />
              <rect x={x0 + barW + 2} y={yBase - hS} width={barW} height={hS} rx="3" fill="#d97706" className="dark:fill-amber-500" />
              <text x={x0 + barW} y={H - 6} textAnchor="middle" className="fill-slate-500 text-[9px] font-myriad dark:fill-slate-400">
                {m.label.replace(".", "")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function FinanceChartsSection({ mouvements }) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Évolution du solde</h3>
        <p className="mt-1 font-myriad text-xs text-slate-500 dark:text-slate-400">
          Cumul des entrées moins les sorties, dans l&apos;ordre des dates enregistrées.
        </p>
        <div className="mt-4">
          <FinanceSoldeEvolutionChart mouvements={mouvements} />
        </div>
      </article>
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Flux par mois</h3>
        <p className="mt-1 font-myriad text-xs text-slate-500 dark:text-slate-400">
          Comparaison encaissements clients et décaissements agents (fenêtre glissante).
        </p>
        <div className="mt-4">
          <FinanceFluxMensuelChart mouvements={mouvements} />
        </div>
      </article>
    </div>
  );
}
