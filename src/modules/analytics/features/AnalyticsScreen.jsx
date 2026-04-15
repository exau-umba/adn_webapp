import { FiActivity, FiBarChart2, FiTrendingUp } from "react-icons/fi";

function MiniLineChart() {
  const values = [52, 61, 58, 72, 69, 78, 84];
  const w = 220;
  const h = 64;
  const pad = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const coords = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * innerW;
    const y = pad + innerH - ((v - min) / range) * innerH;
    return [x, y];
  });
  const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-16 w-full" role="img" aria-label="Tendance hebdomadaire">
      <path d={path} fill="none" stroke="#08047a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-indigo-400" />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#08047a" className="dark:fill-indigo-400" />
      ))}
    </svg>
  );
}

function MiniBarsChart() {
  const values = [34, 44, 29, 52, 40, 47];
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-20 items-end gap-2">
      {values.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div className="relative h-14 w-full rounded bg-slate-100 dark:bg-slate-700/60">
            <div
              style={{ height: `${(v / max) * 100}%` }}
              className="absolute bottom-0 w-full rounded bg-[#0084df] dark:bg-sky-500"
            />
          </div>
          <span className="font-myriad text-[10px] text-slate-400 dark:text-slate-500">{["L", "M", "M", "J", "V", "S"][i]}</span>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsScreen() {
  return (
    <section className="space-y-6">
      <div>
        <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Pilotage</p>
        <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Analytique</h2>
        <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
          Lecture rapide des tendances opérationnelles et de la performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <p className="flex items-center gap-2 font-myriad text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <FiTrendingUp /> Taux de complétion
          </p>
          <p className="mt-2 font-brand text-3xl text-[#01003b] dark:text-slate-100">87%</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <p className="flex items-center gap-2 font-myriad text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <FiActivity /> Temps moyen mission
          </p>
          <p className="mt-2 font-brand text-3xl text-[#01003b] dark:text-slate-100">3h42</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <p className="flex items-center gap-2 font-myriad text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <FiBarChart2 /> Productivité équipe
          </p>
          <p className="mt-2 font-brand text-3xl text-[#01003b] dark:text-slate-100">+11%</p>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Tendance hebdomadaire</h3>
          <p className="mt-1 font-myriad text-xs text-slate-500 dark:text-slate-400">
            Évolution globale des performances des missions.
          </p>
          <div className="mt-4">
            <MiniLineChart />
          </div>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Volume journalier</h3>
          <p className="mt-1 font-myriad text-xs text-slate-500 dark:text-slate-400">
            Nombre d'interventions traitées par jour (semaine en cours).
          </p>
          <div className="mt-4">
            <MiniBarsChart />
          </div>
        </article>
      </div>
    </section>
  );
}
