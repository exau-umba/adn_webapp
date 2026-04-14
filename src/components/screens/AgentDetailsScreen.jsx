import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton } from "../ui";
import { agentsData } from "../../modules/agents/data/agentsData.ts";

function renderStars(scoreLabel) {
  const numericScore = Number.parseFloat(scoreLabel);
  const stars = Math.max(0, Math.min(5, Math.round(numericScore / 2)));

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 text-[14px] leading-none">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={index < stars ? "text-amber-400" : "text-slate-300"}>
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400">{scoreLabel}</span>
    </div>
  );
}

export function AgentDetailsScreen() {
  const navigate = useNavigate();
  const { agentId } = useParams();

  const agent = useMemo(() => agentsData.find((item) => item.id === agentId), [agentId]);

  if (!agent) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-3xl text-[#01003b] dark:text-slate-100">Agent introuvable</h2>
        <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">
          L'agent demande n'existe pas ou n'est plus disponible.
        </p>
        <AppButton variant="ghost" onClick={() => navigate("/agent-management")}>
          Retour a la liste
        </AppButton>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Profil Agent</p>
          <h2 className="mt-2 font-brand text-4xl text-[#01003b] dark:text-slate-100">{agent.name}</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">{agent.role}</p>
        </div>
        <AppButton variant="ghost" onClick={() => navigate("/agent-management")}>
          Retour
        </AppButton>
      </div>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="flex flex-col items-start gap-5 md:flex-row">
          <img src={agent.photo} alt={agent.name} className="h-24 w-24 rounded-2xl object-cover shadow-sm" />
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Statut</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{agent.status}</p>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Score</p>
              <div className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{renderStars(agent.score)}</div>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Service</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{agent.service}</p>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Telephone</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{agent.phone}</p>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Ville</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{agent.city}</p>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Pays</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">RDC (Congo-Kinshasa)</p>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Experience</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{agent.experience}</p>
            </div>
          </div>
        </div>
      </article>

      <div className="flex flex-wrap gap-3">
        <AppButton variant="primary" onClick={() => navigate("/agent-management/evaluation")}>
          Lancer l'evaluation
        </AppButton>
        <AppButton variant="secondary">Modifier le dossier</AppButton>
      </div>
    </section>
  );
}
