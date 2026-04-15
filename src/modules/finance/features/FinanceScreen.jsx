import { useCallback, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { AppButton, IconButton } from "../../../shared/ui";
import { financeLignes } from "../data/financeLignes.ts";
import { missionsData } from "../../missions/data/missionsData.ts";
import { ROUTES } from "../../../core/routes.ts";
import { loadMouvements, saveMouvements } from "../lib/financeMouvementsStorage.ts";
import { totauxMouvements } from "../lib/financeChartData.ts";
import { FinanceChartsSection } from "./FinanceCharts.jsx";

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

function formatUsd(n) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function FinanceScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const missionFilter = searchParams.get("mission") ?? "";

  const [mouvements, setMouvements] = useState(() => loadMouvements());

  const persist = useCallback((nextOrFn) => {
    setMouvements((prev) => {
      const next = typeof nextOrFn === "function" ? nextOrFn(prev) : nextOrFn;
      saveMouvements(next);
      return next;
    });
  }, []);

  const mouvementsFiltres = useMemo(() => {
    if (!missionFilter) return mouvements;
    return mouvements.filter((m) => m.missionId === missionFilter);
  }, [mouvements, missionFilter]);

  const totaux = useMemo(() => totauxMouvements(mouvementsFiltres), [mouvementsFiltres]);

  const lignes = useMemo(() => {
    if (!missionFilter) return financeLignes;
    return financeLignes.filter((l) => l.missionId === missionFilter);
  }, [missionFilter]);

  const supprimerMouvement = (id) => {
    persist((prev) => prev.filter((m) => m.id !== id));
  };

  const journalTrie = useMemo(
    () => [...mouvementsFiltres].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)),
    [mouvementsFiltres],
  );

  const missionLabel = (id) => {
    if (!id) return "—";
    const m = missionsData.find((x) => x.id === id);
    return m ? m.reference : id;
  };

  const allerNouveauMouvement = () => {
    if (missionFilter) {
      navigate(ROUTES.financeMouvementNouveauForMission(missionFilter));
    } else {
      navigate(ROUTES.financeMouvementNouveau);
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Trésorerie</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Finance</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Vue d&apos;ensemble, graphiques et journal. Les <strong>entrées</strong> et <strong>sorties</strong> se
            saisissent sur une page dédiée (stockage local du navigateur).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AppButton variant="primary" size="lg" onClick={allerNouveauMouvement}>
            Nouveau mouvement
          </AppButton>
          {missionFilter ? (
            <AppButton variant="ghost" size="lg" onClick={() => navigate(ROUTES.financeManagement)}>
              Toute la trésorerie
            </AppButton>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="font-myriad text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Entrées (période affichée)
          </p>
          <p className="mt-1 font-brand text-2xl text-emerald-900 dark:text-emerald-100">{formatUsd(totaux.entrees)}</p>
        </article>
        <article className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="font-myriad text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            Sorties
          </p>
          <p className="mt-1 font-brand text-2xl text-amber-900 dark:text-amber-100">{formatUsd(totaux.sorties)}</p>
        </article>
        <article className="rounded-xl border border-[#08047a]/30 bg-[#f8f9ff] p-4 dark:border-indigo-800 dark:bg-indigo-950/40">
          <p className="font-myriad text-xs font-bold uppercase tracking-wider text-[#08047a] dark:text-indigo-300">
            Solde (entrées − sorties)
          </p>
          <p className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100">{formatUsd(totaux.solde)}</p>
        </article>
      </div>

      <FinanceChartsSection mouvements={mouvementsFiltres} />

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Journal des mouvements</h3>
          <div className="flex flex-wrap gap-2">
            <AppButton variant="secondary" size="sm" onClick={allerNouveauMouvement}>
              Ajouter un mouvement
            </AppButton>
            <AppButton
              variant="ghost"
              size="sm"
              className="text-slate-500"
              type="button"
              onClick={() => {
                if (window.confirm("Effacer tous les mouvements enregistrés sur cet appareil ?")) {
                  persist([]);
                }
              }}
            >
              Réinitialiser le journal
            </AppButton>
          </div>
        </div>
        <p className="mt-1 font-myriad text-xs text-slate-500 dark:text-slate-400">
          {missionFilter ? "Mouvements liés à la mission filtrée uniquement." : "Tous les mouvements enregistrés."}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[640px] w-full border-collapse font-myriad text-sm">
            <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
              <tr>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Date</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Type</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Montant</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Libellé</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Mission</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Bénéficiaire</th>
                <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {journalTrie.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center font-myriad text-slate-500 dark:text-slate-400">
                    Aucun mouvement. Cliquez sur « Nouveau mouvement » pour enregistrer une entrée ou une sortie.
                  </td>
                </tr>
              ) : (
                journalTrie.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                    <td className="p-3 text-slate-600 dark:text-slate-300">{m.date}</td>
                    <td className="p-3">
                      <span
                        className={
                          m.type === "entree"
                            ? "font-semibold text-emerald-700 dark:text-emerald-400"
                            : "font-semibold text-amber-700 dark:text-amber-400"
                        }
                      >
                        {m.type === "entree" ? "Entrée" : "Sortie"}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-medium text-[#01003b] dark:text-slate-100">
                      {m.type === "entree" ? "+" : "−"}
                      {formatUsd(m.montantUsd)}
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-200">{m.libelle}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{missionLabel(m.missionId)}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{m.beneficiaire ?? "—"}</td>
                    <td className="p-3 text-right">
                      <IconButton
                        className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                        title="Supprimer ce mouvement"
                        aria-label="Supprimer ce mouvement"
                        onClick={() => supprimerMouvement(m.id)}
                      >
                        <FiTrash2 size={18} />
                      </IconButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </article>

      <div>
        <h3 className="mb-3 font-brand text-lg text-[#01003b] dark:text-slate-100">Synthèse par mission (référence)</h3>
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
                    <AppButton variant="ghost" size="sm" className="rounded-lg" onClick={() => navigate(ROUTES.missionDetail(l.missionId))}>
                      Mission
                    </AppButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {lignes.length === 0 ? (
        <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">Aucune ligne mission pour ce filtre.</p>
      ) : null}
    </section>
  );
}
