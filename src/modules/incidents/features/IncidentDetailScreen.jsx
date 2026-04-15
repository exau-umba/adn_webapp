import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { findIncidentById, updateIncident } from "../lib/incidentsStorage.ts";

export function IncidentDetailScreen() {
  const { incidentId } = useParams();
  const navigate = useNavigate();
  const [refreshTick, setRefreshTick] = useState(0);
  const incident = useMemo(() => findIncidentById(incidentId), [incidentId, refreshTick]);

  if (!incident) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Incident introuvable</h2>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.incidents)}>
          Retour à la liste
        </AppButton>
      </section>
    );
  }

  const changeStatus = (statut) => {
    updateIncident(incident.id, { statut });
    setRefreshTick((v) => v + 1);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Supervision</p>
          <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">{incident.id}</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Détail incident</h2>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.incidents)}>
          Retour
        </AppButton>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Mission</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{incident.mission}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Client signaleur</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{incident.clientSignaleur}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Agent concerné</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{incident.agentConcerne}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Date</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{incident.date}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Type</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{incident.type}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Niveau</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{incident.niveau}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Source</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{incident.source}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Statut</p>
            <p className="mt-1 font-myriad font-semibold text-[#01003b] dark:text-slate-100">{incident.statut}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Description</p>
            <p className="mt-2 whitespace-pre-wrap font-myriad text-sm text-slate-600 dark:text-slate-300">{incident.description}</p>
          </div>
        </div>
      </article>

      <div className="flex flex-wrap gap-2">
        <AppButton variant="ghost" onClick={() => changeStatus("Ouvert")}>
          Marquer Ouvert
        </AppButton>
        <AppButton variant="secondary" onClick={() => changeStatus("Escalade")}>
          Escalader
        </AppButton>
        <AppButton variant="primary" onClick={() => changeStatus("Résolu")}>
          Marquer Résolu
        </AppButton>
      </div>
    </section>
  );
}
