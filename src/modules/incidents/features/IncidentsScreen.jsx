import { FiAlertTriangle, FiEye, FiFilter, FiFlag } from "react-icons/fi";
import { IconButton } from "../../../shared/ui";

const incidents = [
  { id: "INC-1042", mission: "MIS-24006", type: "Retard", niveau: "Moyen", statut: "Ouvert", date: "2026-04-15" },
  { id: "INC-1041", mission: "MIS-24004", type: "Absence", niveau: "Critique", statut: "Escalade", date: "2026-04-14" },
  { id: "INC-1039", mission: "MIS-23998", type: "Conflit", niveau: "Faible", statut: "Résolu", date: "2026-04-13" },
];

function toneNiveau(niveau) {
  if (niveau === "Critique") return "text-red-600 dark:text-red-400";
  if (niveau === "Moyen") return "text-amber-600 dark:text-amber-400";
  return "text-slate-500 dark:text-slate-400";
}

function toneStatut(statut) {
  if (statut === "Résolu") return "text-emerald-600 dark:text-emerald-400";
  if (statut === "Escalade") return "text-red-600 dark:text-red-400";
  return "text-sky-600 dark:text-sky-400";
}

export function IncidentsScreen() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Supervision</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Incidents</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Suivi des alertes terrain avec une vue claire et actionnable.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900/80">
          <div className="rounded-lg bg-red-50 px-3 py-2 text-center dark:bg-red-950/40">
            <p className="font-myriad text-[10px] uppercase text-red-600 dark:text-red-400">Critiques</p>
            <p className="font-brand text-lg text-red-700 dark:text-red-300">03</p>
          </div>
          <div className="rounded-lg bg-amber-50 px-3 py-2 text-center dark:bg-amber-950/40">
            <p className="font-myriad text-[10px] uppercase text-amber-700 dark:text-amber-300">Ouverts</p>
            <p className="font-brand text-lg text-amber-700 dark:text-amber-300">09</p>
          </div>
          <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center dark:bg-emerald-950/40">
            <p className="font-myriad text-[10px] uppercase text-emerald-700 dark:text-emerald-300">Résolus</p>
            <p className="font-brand text-lg text-emerald-700 dark:text-emerald-300">27</p>
          </div>
        </div>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Journal des incidents</h3>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300">
            <FiFilter className="text-sm" />
            <span className="font-myriad text-xs">Filtre rapide: 7 derniers jours</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[740px] w-full border-collapse font-myriad text-sm">
            <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
              <tr>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Réf.</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Mission</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Type</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Niveau</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Statut</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Date</th>
                <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {incidents.map((it) => (
                <tr key={it.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="p-3 font-mono text-xs text-[#08047a] dark:text-indigo-300">{it.id}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{it.mission}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{it.type}</td>
                  <td className={`p-3 font-semibold ${toneNiveau(it.niveau)}`}>{it.niveau}</td>
                  <td className={`p-3 font-semibold ${toneStatut(it.statut)}`}>{it.statut}</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">{it.date}</td>
                  <td className="p-3 text-right">
                    <IconButton title="Voir l'incident" aria-label="Voir l'incident">
                      <FiEye size={18} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <p className="flex items-center gap-2 font-myriad text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <FiAlertTriangle /> Temps moyen de résolution
          </p>
          <p className="mt-2 font-brand text-3xl text-[#01003b] dark:text-slate-100">18h</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <p className="flex items-center gap-2 font-myriad text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <FiFlag /> SLA respecté
          </p>
          <p className="mt-2 font-brand text-3xl text-[#01003b] dark:text-slate-100">92%</p>
        </article>
      </div>
    </section>
  );
}
