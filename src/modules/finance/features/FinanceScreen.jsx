import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppButton } from "../../../shared/ui";
import { financeLignes } from "../data/financeLignes.ts";
import { ROUTES } from "../../../core/routes.ts";

function toneEnc(s) {
  if (s === "Paye") return "text-emerald-600 dark:text-emerald-400";
  if (s === "Partiel") return "text-amber-600 dark:text-amber-400";
  return "text-slate-500 dark:text-slate-400";
}

function toneVer(s) {
  if (s === "Paye") return "text-emerald-600 dark:text-emerald-400";
  if (s === "Planifie") return "text-sky-600 dark:text-sky-400";
  return "text-slate-500 dark:text-slate-400";
}

export function FinanceScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const missionFilter = searchParams.get("mission") ?? "";

  const lignes = useMemo(() => {
    if (!missionFilter) return financeLignes;
    return financeLignes.filter((l) => l.missionId === missionFilter);
  }, [missionFilter]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Trésorerie</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Finance</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Le <strong>client</strong> règle la prestation auprès d&apos;<strong>ADN PRO SERVICE</strong> ; la société
            assure ensuite le <strong>versement à l&apos;agent</strong> (salaire / honoraires), conformément au contrat
            tripartite.
          </p>
        </div>
        {missionFilter ? (
          <AppButton variant="ghost" size="sm" onClick={() => navigate(ROUTES.financeManagement)}>
            Afficher toutes les missions
          </AppButton>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Encaissements clients</h3>
          <p className="mt-2 font-myriad text-xs text-slate-500 dark:text-slate-400">
            Suivi des montants dus par les clients à l&apos;entreprise (démo USD).
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Versements agents</h3>
          <p className="mt-2 font-myriad text-xs text-slate-500 dark:text-slate-400">
            Ce qu&apos;ADN PRO SERVICE doit reverser aux agents par mission (démo USD).
          </p>
        </article>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <table className="min-w-[960px] w-full border-collapse font-myriad text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
            <tr>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Mission</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Client</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Facture client (USD)</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Encaissement</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Agent</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Versement agent (USD)</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Paiement agent</th>
              <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Lien</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {lignes.map((l) => (
              <tr key={l.missionId} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                <td className="p-3">
                  <p className="font-semibold text-[#01003b] dark:text-slate-100">{l.missionRef}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{l.missionTitre}</p>
                </td>
                <td className="p-3 text-slate-600 dark:text-slate-300">{l.clientName}</td>
                <td className="p-3 font-mono text-slate-800 dark:text-slate-200">{l.montantFactureClientUsd}</td>
                <td className={`p-3 font-medium ${toneEnc(l.statutEncaissementClient)}`}>{l.statutEncaissementClient}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300">{l.agentName}</td>
                <td className="p-3 font-mono text-slate-800 dark:text-slate-200">{l.montantVersementAgentUsd}</td>
                <td className={`p-3 font-medium ${toneVer(l.statutVersementAgent)}`}>{l.statutVersementAgent}</td>
                <td className="p-3 text-right">
                  <AppButton
                    variant="ghost"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => navigate(ROUTES.missionDetail(l.missionId))}
                  >
                    Mission
                  </AppButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lignes.length === 0 ? (
        <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">Aucune ligne pour ce filtre.</p>
      ) : null}
    </section>
  );
}
