/**
 * Graphiques compacts pour le tableau de bord (données illustratives, SVG léger).
 */
function SparklineMissions() {
  const values = [12, 14, 11, 16, 15, 18, 17];
  const w = 132;
  const h = 32;
  const padX = 2;
  const padY = 3;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;
  const coords = values.map((v, i) => {
    const x = padX + (values.length <= 1 ? innerW / 2 : (i / (values.length - 1)) * innerW);
    const y = padY + innerH - ((v - min) / range) * innerH;
    return [x, y];
  });
  const lineD = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const areaD = `${lineD} L${(padX + innerW).toFixed(1)} ${(h - padY).toFixed(1)} L${padX} ${(h - padY).toFixed(1)} Z`;

  return (
    <div>
      <p className="font-myriad text-[10px] text-slate-500 dark:text-slate-400">Missions (7 j.)</p>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mt-1 w-full text-[#08047a] dark:text-indigo-400"
        role="img"
        aria-label="Tendance du nombre de missions sur sept jours"
      >
        <path d={areaD} fill="currentColor" fillOpacity="0.08" />
        <path d={lineD} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.8" fill="currentColor" />
        ))}
      </svg>
    </div>
  );
}

function StatutStrip() {
  const segments = [
    { pct: 38, label: "En cours", className: "bg-sky-500 dark:bg-sky-400" },
    { pct: 22, label: "Plan.", className: "bg-amber-400 dark:bg-amber-500" },
    { pct: 40, label: "Term.", className: "bg-emerald-500 dark:bg-emerald-400" },
  ];

  return (
    <div>
      <p className="font-myriad text-[10px] text-slate-500 dark:text-slate-400">Statuts missions</p>
      <div
        className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"
        role="img"
        aria-label="Répartition illustrative : en cours, planifiées, terminées"
      >
        {segments.map((s) => (
          <div key={s.label} style={{ width: `${s.pct}%` }} className={s.className} title={s.label} />
        ))}
      </div>
      <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 font-myriad text-[9px] text-slate-400 dark:text-slate-500">
        {segments.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1">
            <span className={`h-1.5 w-1.5 rounded-sm ${s.className}`} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function MicroBarsPrestations() {
  const rows = [
    { label: "Ménage", v: 72 },
    { label: "Repassage", v: 48 },
    { label: "Garde", v: 56 },
    { label: "Chef", v: 34 },
  ];
  const max = Math.max(...rows.map((r) => r.v), 1);
  const barH = 5;
  const gap = 5;
  const labelW = 52;
  const chartW = 132 - labelW;
  const h = rows.length * (barH + gap) - gap;

  return (
    <div>
      <p className="font-myriad text-[10px] text-slate-500 dark:text-slate-400">Charge par type</p>
      <svg
        viewBox={`0 0 132 ${h}`}
        className="mt-1 w-full"
        role="img"
        aria-label="Volumes relatifs par type de prestation"
      >
        {rows.map((r, i) => {
          const y = i * (barH + gap);
          const bw = (r.v / max) * chartW;
          return (
            <g key={r.label}>
              <text x={0} y={y + barH - 1} className="fill-slate-500 font-myriad text-[8px] dark:fill-slate-400">
                {r.label}
              </text>
              <rect x={labelW} y={y} width={chartW} height={barH} rx="2" className="fill-slate-100 dark:fill-slate-700/80" />
              <rect
                x={labelW}
                y={y}
                width={bw}
                height={barH}
                rx="2"
                className="fill-[#08047a]/85 dark:fill-indigo-400/90"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Micro courbe alignée sur les barres « Performance » (même série illustrative). */
export function CompletionRateSparkline() {
  const values = [65, 80, 45, 90, 75, 85];
  const w = 80;
  const h = 22;
  const pad = 2;
  const min = 0;
  const max = 100;
  const range = max - min;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const coords = values.map((v, i) => {
    const x = pad + (values.length <= 1 ? innerW / 2 : (i / (values.length - 1)) * innerW);
    const y = pad + innerH - ((v - min) / range) * innerH;
    return [x, y];
  });
  const lineD = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  return (
    <div className="hidden sm:block" title="Tendance du taux de complétion (illustratif)">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-[22px] w-20 text-[#0084df] dark:text-sky-400"
        role="img"
        aria-label="Mini courbe de complétion sur six mois"
      >
        <path d={lineD} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Bandeau discret en bas de page : tendance, répartition, volumes relatifs. */
export function DashboardMiniCharts() {
  return (
    <aside className="w-full rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-sm dark:border-slate-600 dark:bg-slate-800/95">
      <p className="mb-3 border-b border-slate-100 pb-2 font-myriad text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:border-slate-700 dark:text-slate-500">
        Aperçu
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <SparklineMissions />
        <StatutStrip />
        <MicroBarsPrestations />
      </div>
    </aside>
  );
}
