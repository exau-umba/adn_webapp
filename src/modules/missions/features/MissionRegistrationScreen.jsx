import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppButton, AppInput, AppSelect, AppTextarea } from "../../../shared/ui";
import { clientsData } from "../../clients/data/clientsData.ts";
import { agentsData } from "../../agents/data/agentsData.ts";
import { ROUTES } from "../../../core/routes.ts";
import { createSessionContratBundleAndSave } from "../../contrats/lib/createSessionContratBundle.ts";

export function MissionRegistrationScreen() {
  const navigate = useNavigate();
  const [titre, setTitre] = useState("");
  const [clientId, setClientId] = useState("");
  const [agentId, setAgentId] = useState("");
  const [lieu, setLieu] = useState("");
  const [typeService, setTypeService] = useState("Menage");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [statut, setStatut] = useState("Planifiee");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");

  const handleCreate = () => {
    if (!clientId || !agentId) {
      setFormError("Veuillez sélectionner un client et un agent pour générer les contrats.");
      return;
    }
    setFormError("");
    const bundle = createSessionContratBundleAndSave({
      titre,
      clientId,
      agentId,
      lieu,
      typeService,
      dateDebut,
    });
    navigate(ROUTES.contratBundleDetail(bundle.id));
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Planification</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Nouvelle mission</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            À l&apos;enregistrement, un dossier contractuel (client + agent + ADN) est généré puis affiché.
          </p>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.missionManagement)}>
          Retour
        </AppButton>
      </div>

      {formError ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 font-myriad text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          {formError}
        </p>
      ) : null}

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-xl text-[#01003b] dark:text-slate-100">Affectation</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
              Intitulé de la mission
              <AppInput className="mt-2" placeholder="Ex. Ménage résidence hebdomadaire" value={titre} onChange={(e) => setTitre(e.target.value)} />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Client
              <AppSelect className="mt-2" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                <option value="">Choisir un client</option>
                {clientsData.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Agent
              <AppSelect className="mt-2" value={agentId} onChange={(e) => setAgentId(e.target.value)}>
                <option value="">Choisir un agent</option>
                {agentsData.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.service}
                  </option>
                ))}
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Lieu d&apos;exécution
              <AppInput className="mt-2" placeholder="Ville, adresse ou consignes d&apos;accès" value={lieu} onChange={(e) => setLieu(e.target.value)} />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Type de prestation
              <AppSelect className="mt-2" value={typeService} onChange={(e) => setTypeService(e.target.value)}>
                <option>Menage</option>
                <option>Cuisine</option>
                <option>Garde d&apos;enfants</option>
                <option>Repassage</option>
                <option>Conciergerie</option>
                <option>Autre</option>
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Date de début
              <AppInput type="date" className="mt-2" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Date de fin (optionnel)
              <AppInput type="date" className="mt-2" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Statut initial
              <AppSelect className="mt-2" value={statut} onChange={(e) => setStatut(e.target.value)}>
                <option>Planifiee</option>
                <option>En cours</option>
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
              Notes internes
              <AppTextarea rows={4} className="mt-2 resize-y" placeholder="Consignes, horaires, contacts sur place..." value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <AppButton variant="ghost" type="button" onClick={() => navigate(ROUTES.missionManagement)}>
            Annuler
          </AppButton>
          <AppButton variant="primary" type="submit">
            Créer la mission et les contrats
          </AppButton>
        </div>
      </form>
    </section>
  );
}
