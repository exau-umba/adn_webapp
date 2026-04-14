import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton, AppInput } from "../../../shared/ui";
import { agentsData } from "../data/agentsData.ts";

export function AgentEditScreen() {
  const navigate = useNavigate();
  const { agentId } = useParams();

  const agent = useMemo(() => agentsData.find((item) => item.id === agentId), [agentId]);

  if (!agent) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Agent introuvable</h2>
        <AppButton variant="ghost" onClick={() => navigate("/agent-management")}>
          Retour a la liste
        </AppButton>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Edition Agent</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Modifier le dossier</h2>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(`/agent-management/detail/${agent.id}`)}>
          Retour au detail
        </AppButton>
      </div>

      <form className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Nom complet
            <AppInput className="mt-2" defaultValue={agent.name} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Poste
            <AppInput className="mt-2" defaultValue={agent.role} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Telephone
            <AppInput className="mt-2" defaultValue={agent.phone} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Ville
            <AppInput className="mt-2" defaultValue={agent.city} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Service
            <AppInput className="mt-2" defaultValue={agent.service} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Experience
            <AppInput className="mt-2" defaultValue={agent.experience} />
          </label>
        </div>
        <div className="flex justify-end gap-3">
          <AppButton variant="ghost" onClick={() => navigate(`/agent-management/detail/${agent.id}`)}>
            Annuler
          </AppButton>
          <AppButton variant="primary">Enregistrer</AppButton>
        </div>
      </form>
    </section>
  );
}
