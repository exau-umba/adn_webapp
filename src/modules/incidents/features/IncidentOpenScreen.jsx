import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppButton, AppInput, AppSelect, AppTextarea } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { createIncident } from "../lib/incidentsStorage.ts";
import { missionsData } from "../../missions/data/missionsData.ts";

export function IncidentOpenScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const missionPrefill = searchParams.get("mission") ?? "";
  const [form, setForm] = useState({
    mission: missionPrefill,
    type: "Retard",
    niveau: "Moyen",
    source: "Client",
    clientSignaleur: "",
    agentConcerne: "",
    description: "",
  });

  const syncPartiesFromMission = (missionValue) => {
    const mission = missionsData.find((m) => m.reference === missionValue || m.id === missionValue);
    if (!mission) return;
    setForm((p) => ({
      ...p,
      mission: mission.reference,
      clientSignaleur: p.clientSignaleur || mission.clientName,
      agentConcerne: p.agentConcerne || mission.agentName,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const created = createIncident({
      mission: form.mission || "—",
      type: form.type,
      niveau: form.niveau,
      source: form.source,
      clientSignaleur: form.clientSignaleur,
      agentConcerne: form.agentConcerne,
      description: form.description || "Aucune précision fournie.",
    });
    navigate(ROUTES.incidentDetail(created.id));
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Supervision</p>
        <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Ouvrir un incident</h2>
      </div>

      <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Mission
            <AppInput
              className="mt-2"
              value={form.mission}
              onChange={(e) => {
                const next = e.target.value;
                setForm((p) => ({ ...p, mission: next }));
                syncPartiesFromMission(next);
              }}
              placeholder="MIS-2026-0142"
            />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Type
            <AppSelect className="mt-2" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
              <option>Retard</option>
              <option>Absence</option>
              <option>Conflit</option>
              <option>Qualité</option>
              <option>Autre</option>
            </AppSelect>
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Niveau
            <AppSelect className="mt-2" value={form.niveau} onChange={(e) => setForm((p) => ({ ...p, niveau: e.target.value }))}>
              <option>Faible</option>
              <option>Moyen</option>
              <option>Critique</option>
            </AppSelect>
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Source
            <AppSelect className="mt-2" value={form.source} onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))}>
              <option>Client</option>
              <option>Agent</option>
              <option>Superviseur</option>
            </AppSelect>
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Client signaleur
            <AppInput
              className="mt-2"
              value={form.clientSignaleur}
              onChange={(e) => setForm((p) => ({ ...p, clientSignaleur: e.target.value }))}
              placeholder="Nom du client"
            />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Agent concerné
            <AppInput
              className="mt-2"
              value={form.agentConcerne}
              onChange={(e) => setForm((p) => ({ ...p, agentConcerne: e.target.value }))}
              placeholder="Nom de l'agent"
            />
          </label>
          <label className="md:col-span-2 font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Description
            <AppTextarea
              className="mt-2"
              rows={5}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Décrivez brièvement la situation..."
            />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <AppButton variant="ghost" onClick={() => navigate(ROUTES.incidents)}>
            Annuler
          </AppButton>
          <AppButton variant="primary" type="submit">
            Enregistrer l'incident
          </AppButton>
        </div>
      </form>
    </section>
  );
}
