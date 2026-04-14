import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppButton, AppInput, AppSelect, ConfirmationModal } from "../../../shared/ui";
import { missionsData as missions } from "../data/missionsData.ts";
import { ROUTES } from "../../../core/routes.ts";

function getMissionStatutTone(statut) {
  if (statut === "En cours") return { text: "text-sky-600 dark:text-sky-400", dot: "bg-sky-500" };
  if (statut === "Planifiee") return { text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
  if (statut === "Terminee") return { text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" };
  return { text: "text-slate-500 dark:text-slate-400", dot: "bg-slate-400" };
}

export function MissionsManagementScreen() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Operations</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Missions</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Suivi des affectations agents, clients et statuts terrain.
          </p>
        </div>
        <AppButton variant="secondary" size="lg" onClick={() => navigate(ROUTES.missionRegistration)}>
          Nouvelle mission
        </AppButton>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80 md:col-span-2">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Recherche
          </p>
          <AppInput className="mt-3" placeholder="Référence, client, agent, lieu..." />
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Statut</p>
          <AppSelect className="mt-3">
            <option>Tous</option>
            <option>Planifiee</option>
            <option>En cours</option>
            <option>Terminee</option>
            <option>Annulee</option>
          </AppSelect>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <table className="min-w-[900px] w-full border-collapse font-myriad text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
            <tr>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Réf.</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Mission</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Client</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Agent</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Statut</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Début</th>
              <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {missions.map((mission) => {
              const tone = getMissionStatutTone(mission.statut);
              return (
                <tr key={mission.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="p-3 font-mono text-xs text-slate-600 dark:text-slate-300">{mission.reference}</td>
                  <td className="p-3">
                    <p className="font-semibold text-[#01003b] dark:text-slate-100">{mission.titre}</p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{mission.typeService}</p>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{mission.clientName}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{mission.agentName}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-2 ${tone.text}`}>
                      <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                      {mission.statut}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{mission.dateDebut}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <AppButton
                        variant="ghost"
                        size="sm"
                        className="rounded-lg"
                        onClick={() => navigate(ROUTES.missionDetail(mission.id))}
                      >
                        Voir
                      </AppButton>
                      <AppButton
                        variant="secondary"
                        size="sm"
                        className="rounded-lg"
                        onClick={() => navigate(ROUTES.missionEdit(mission.id))}
                      >
                        Modifier
                      </AppButton>
                      <AppButton
                        variant="ghost"
                        size="sm"
                        className="rounded-lg border-red-200 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
                        onClick={() => setDeleteTarget(mission)}
                      >
                        Supprimer
                      </AppButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Supprimer cette mission ?"
        message={
          deleteTarget
            ? `La mission ${deleteTarget.reference} sera retirée (démo).`
            : "Voulez-vous vraiment supprimer cette mission ?"
        }
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => setDeleteTarget(null)}
      />
    </section>
  );
}
