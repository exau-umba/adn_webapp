import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton, AppInput, AppSelect, AppTextarea } from "../../../shared/ui";
import { missionsData } from "../data/missionsData.ts";
import { ROUTES } from "../../../core/routes.ts";

export function MissionEditScreen() {
  const navigate = useNavigate();
  const { missionId } = useParams();
  const mission = useMemo(() => missionsData.find((m) => m.id === missionId), [missionId]);

  if (!mission) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Mission introuvable</h2>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.missionManagement)}>
          Retour à la liste
        </AppButton>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Édition</p>
          <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">{mission.reference}</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Modifier la mission</h2>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.missionDetail(mission.id))}>
          Retour au détail
        </AppButton>
      </div>

      <form className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
            Intitulé
            <AppInput className="mt-2" defaultValue={mission.titre} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Client (libellé)
            <AppInput className="mt-2" defaultValue={mission.clientName} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Agent (libellé)
            <AppInput className="mt-2" defaultValue={mission.agentName} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Lieu
            <AppInput className="mt-2" defaultValue={mission.lieu} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Type de prestation
            <AppInput className="mt-2" defaultValue={mission.typeService} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Date de début
            <AppInput type="date" className="mt-2" defaultValue={mission.dateDebut} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Date de fin
            <AppInput type="date" className="mt-2" defaultValue={mission.dateFin ?? ""} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Statut
            <AppSelect className="mt-2" defaultValue={mission.statut}>
              <option>Planifiee</option>
              <option>En cours</option>
              <option>Terminee</option>
              <option>Annulee</option>
            </AppSelect>
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
            Notes
            <AppTextarea rows={4} className="mt-2 resize-y" defaultValue={mission.notes} />
          </label>
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
          <AppButton variant="ghost" type="button" onClick={() => navigate(ROUTES.missionDetail(mission.id))}>
            Annuler
          </AppButton>
          <AppButton variant="primary" type="button">
            Enregistrer
          </AppButton>
        </div>
      </form>
    </section>
  );
}
