import { useNavigate } from "react-router-dom";
import { AppButton, AppSelect, IconButton } from "../ui";
import { agentsData as agents } from "../../modules/agents/data/agentsData";

function renderStars(scoreLabel) {
  const numericScore = Number.parseFloat(scoreLabel);
  const stars = Math.max(0, Math.min(5, Math.round(numericScore / 2)));

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 text-[13px] leading-none">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={index < stars ? "text-amber-400" : "text-slate-300"}>
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-slate-500">{scoreLabel}</span>
    </div>
  );
}

export function AgentsManagementScreen() {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="rounded-full bg-[#e1e0ff] px-3 py-1 font-myriad text-[10px] font-bold uppercase tracking-widest text-[#08047a]">
            Equipes de Terrain
          </span>
          <h2 className="mt-2 font-brand text-4xl text-[#01003b] dark:text-slate-100">Gestion des Agents</h2>
          <p className="mt-1 max-w-2xl font-myriad text-sm text-slate-500 dark:text-slate-400">
            Supervisez vos prestataires et suivez les performances en temps reel.
          </p>
        </div>
        <AppButton
          onClick={() => navigate("/agent-management/registration")}
          variant="secondary"
          size="lg"
          className="shadow-xl"
        >
          Nouvel Agent
        </AppButton>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm md:col-span-2 dark:bg-slate-900/80">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Filtrer par Categorie
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Tous les agents", "Categorie A", "Categorie B", "VIP Premium"].map((tag, i) => (
              <AppButton
                key={tag}
                variant={i === 0 ? "primary" : "ghost"}
                size="sm"
                className={`rounded-lg ${
                  i === 0 ? "shadow-none" : "border-none bg-slate-100 text-slate-700 shadow-none"
                }`}
              >
                {tag}
              </AppButton>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900/80">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Statut
          </p>
          <AppSelect className="mt-3 rounded-lg border-none">
            <option>Tous les statuts</option>
          </AppSelect>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900/80">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Tri par Performance
          </p>
          <p className="mt-4 font-myriad text-sm font-medium dark:text-slate-200">Top score first</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <table className="w-full border-collapse font-myriad text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
            <tr>
              <th className="p-4 text-[11px] uppercase tracking-widest text-slate-500">Agent</th>
              <th className="p-4 text-[11px] uppercase tracking-widest text-slate-500">Categorie</th>
              <th className="p-4 text-[11px] uppercase tracking-widest text-slate-500">Score</th>
              <th className="p-4 text-[11px] uppercase tracking-widest text-slate-500">Statut</th>
              <th className="p-4 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={agent.photo}
                      alt={`Photo de ${agent.name}`}
                      className={`h-11 w-11 rounded-xl object-cover shadow-sm ${
                        agent.status === "Suspendu" ? "grayscale" : ""
                      }`}
                    />
                    <div>
                      <p className="font-semibold text-[#01003b] dark:text-slate-100">{agent.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{agent.role}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 dark:text-slate-300">{agent.service}</td>
                <td className="p-4 font-bold text-[#01003b] dark:text-slate-100">{renderStars(agent.score)}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-2 ${
                      agent.status === "Suspendu" ? "text-red-600" : "text-emerald-600"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        agent.status === "Suspendu" ? "bg-red-500" : "bg-emerald-500"
                      }`}
                    />
                    {agent.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <AppButton
                      variant="ghost"
                      size="sm"
                      className="rounded-lg"
                      onClick={() => navigate(`/agent-management/detail/${agent.id}`)}
                    >
                      Voir
                    </AppButton>
                    <IconButton onClick={() => navigate("/agent-management/evaluation")} className="text-slate-400">
                      <span className="text-xs">Eval</span>
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3 dark:border-slate-700 dark:bg-slate-800/70">
          <p className="font-myriad text-xs text-slate-500 dark:text-slate-400">Affichage de 4 sur 124 agents</p>
          <div className="flex gap-2">
            <AppButton variant="ghost" size="sm" className="rounded-lg">
              Precedent
            </AppButton>
            <AppButton variant="primary" size="sm" className="rounded-lg">
              1
            </AppButton>
            <AppButton variant="ghost" size="sm" className="rounded-lg">
              2
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
