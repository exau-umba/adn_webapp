import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppButton, AppInput, AppSelect } from "../../../shared/ui";
import { missionsData } from "../../missions/data/missionsData.ts";
import { ROUTES } from "../../../core/routes.ts";
import { loadMouvements, newMouvementId, saveMouvements } from "../lib/financeMouvementsStorage.ts";

export function FinanceNouveauMouvementScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const missionFromUrl = searchParams.get("mission") ?? "";

  const [entreeMontant, setEntreeMontant] = useState("");
  const [entreeDate, setEntreeDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [entreeLibelle, setEntreeLibelle] = useState("");
  const [entreeMissionId, setEntreeMissionId] = useState(missionFromUrl);

  const [sortieMontant, setSortieMontant] = useState("");
  const [sortieDate, setSortieDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [sortieLibelle, setSortieLibelle] = useState("");
  const [sortieBeneficiaire, setSortieBeneficiaire] = useState("");
  const [sortieMissionId, setSortieMissionId] = useState(missionFromUrl);

  useEffect(() => {
    setEntreeMissionId(missionFromUrl);
    setSortieMissionId(missionFromUrl);
  }, [missionFromUrl]);

  const retourFinance = () => {
    const q = missionFromUrl ? `?mission=${encodeURIComponent(missionFromUrl)}` : "";
    navigate(`${ROUTES.financeManagement}${q}`);
  };

  const appendMouvement = (mv) => {
    const prev = loadMouvements();
    saveMouvements([...prev, mv]);
  };

  const ajouterEntree = (event) => {
    event.preventDefault();
    const montant = Number.parseFloat(entreeMontant.replace(",", "."));
    if (!Number.isFinite(montant) || montant <= 0 || !entreeLibelle.trim()) return;
    appendMouvement({
      id: newMouvementId(),
      type: "entree",
      montantUsd: montant,
      date: entreeDate,
      libelle: entreeLibelle.trim(),
      missionId: entreeMissionId || undefined,
    });
    setEntreeMontant("");
    setEntreeLibelle("");
    retourFinance();
  };

  const ajouterSortie = (event) => {
    event.preventDefault();
    const montant = Number.parseFloat(sortieMontant.replace(",", "."));
    if (!Number.isFinite(montant) || montant <= 0 || !sortieLibelle.trim()) return;
    appendMouvement({
      id: newMouvementId(),
      type: "sortie",
      montantUsd: montant,
      date: sortieDate,
      libelle: sortieLibelle.trim(),
      missionId: sortieMissionId || undefined,
      beneficiaire: sortieBeneficiaire.trim() || undefined,
    });
    setSortieMontant("");
    setSortieLibelle("");
    setSortieBeneficiaire("");
    retourFinance();
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Trésorerie</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Nouveau mouvement</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Enregistrez une entrée (paiement client) ou une sortie (versement agent). Vous serez renvoyé vers le tableau
            de bord finance après validation.
          </p>
        </div>
        <AppButton variant="ghost" onClick={retourFinance}>
          Annuler
        </AppButton>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Entrée d&apos;argent</h3>
          <p className="mt-1 font-myriad text-xs text-slate-500 dark:text-slate-400">
            Ex. paiement client, acompte, régularisation reçue par ADN PRO SERVICE.
          </p>
          <form className="mt-4 space-y-3" onSubmit={ajouterEntree}>
            <label className="block font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Montant (USD)
              <AppInput
                className="mt-1"
                inputMode="decimal"
                value={entreeMontant}
                onChange={(e) => setEntreeMontant(e.target.value)}
                placeholder="500"
              />
            </label>
            <label className="block font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Date
              <AppInput type="date" className="mt-1" value={entreeDate} onChange={(e) => setEntreeDate(e.target.value)} />
            </label>
            <label className="block font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Libellé
              <AppInput
                className="mt-1"
                value={entreeLibelle}
                onChange={(e) => setEntreeLibelle(e.target.value)}
                placeholder="Paiement client — virement"
              />
            </label>
            <label className="block font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mission (optionnel)
              <AppSelect className="mt-1" value={entreeMissionId} onChange={(e) => setEntreeMissionId(e.target.value)}>
                <option value="">Non rattaché</option>
                {missionsData.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.reference} — {m.clientName}
                  </option>
                ))}
              </AppSelect>
            </label>
            <AppButton variant="primary" type="submit" className="mt-2 w-full sm:w-auto">
              Enregistrer l&apos;entrée
            </AppButton>
          </form>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Sortie d&apos;argent</h3>
          <p className="mt-1 font-myriad text-xs text-slate-500 dark:text-slate-400">
            Ex. virement salaire / honoraires vers l&apos;agent.
          </p>
          <form className="mt-4 space-y-3" onSubmit={ajouterSortie}>
            <label className="block font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Montant (USD)
              <AppInput
                className="mt-1"
                inputMode="decimal"
                value={sortieMontant}
                onChange={(e) => setSortieMontant(e.target.value)}
                placeholder="450"
              />
            </label>
            <label className="block font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Date
              <AppInput type="date" className="mt-1" value={sortieDate} onChange={(e) => setSortieDate(e.target.value)} />
            </label>
            <label className="block font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Libellé
              <AppInput
                className="mt-1"
                value={sortieLibelle}
                onChange={(e) => setSortieLibelle(e.target.value)}
                placeholder="Versement agent"
              />
            </label>
            <label className="block font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Bénéficiaire (agent ou libellé)
              <AppInput
                className="mt-1"
                value={sortieBeneficiaire}
                onChange={(e) => setSortieBeneficiaire(e.target.value)}
                placeholder="Nom de l'agent"
              />
            </label>
            <label className="block font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mission (optionnel)
              <AppSelect className="mt-1" value={sortieMissionId} onChange={(e) => setSortieMissionId(e.target.value)}>
                <option value="">Non rattaché</option>
                {missionsData.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.reference} — {m.agentName}
                  </option>
                ))}
              </AppSelect>
            </label>
            <AppButton variant="secondary" type="submit" className="mt-2 w-full sm:w-auto">
              Enregistrer la sortie
            </AppButton>
          </form>
        </article>
      </div>
    </section>
  );
}
