import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiEye, FiPause, FiPlay, FiTrash2 } from "react-icons/fi";
import { AppButton, AppSelect, ConfirmationModal, IconButton, PaginationControls } from "../../../shared/ui";
import { agentsData as agents } from "../data/agentsData.ts";
import { getStatusTone } from "../../../core/constants/statusStyles.ts";

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
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(agents.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const agentsPage = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return agents.slice(start, start + pageSize);
  }, [safePage]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="rounded-full bg-[#e1e0ff] px-3 py-1 font-myriad text-[10px] font-bold uppercase tracking-widest text-[#08047a]">
            Equipes de Terrain
          </span>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Gestion des Agents</h2>
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
        <div className="rounded-xl bg-white p-4 shadow-sm md:col-span-2 dark:bg-slate-900/80">
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
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Statut
          </p>
          <AppSelect className="mt-3 rounded-lg border-none">
            <option>Tous les statuts</option>
          </AppSelect>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Tri par Performance
          </p>
          <p className="mt-4 font-myriad text-sm font-medium dark:text-slate-200">Top score first</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <table className="min-w-[760px] w-full border-collapse font-myriad text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
            <tr>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Agent</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Categorie</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Score</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Statut</th>
              <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {agentsPage.map((agent) => {
              const statusTone = getStatusTone(agent.status);
              return (
                <tr key={agent.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="p-3">
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
                  <td className="p-3 dark:text-slate-300">{agent.service}</td>
                  <td className="p-3 font-bold text-[#01003b] dark:text-slate-100">{renderStars(agent.score)}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-2 ${statusTone.text}`}>
                      <span className={`h-2 w-2 rounded-full ${statusTone.dot}`} />
                      {agent.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1">
                      <IconButton
                        className="text-slate-600 dark:text-slate-300"
                        title="Voir le détail"
                        aria-label="Voir le détail"
                        onClick={() => navigate(`/agent-management/detail/${agent.id}`)}
                      >
                        <FiEye size={18} />
                      </IconButton>
                      <IconButton
                        className="text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                        title="Modifier"
                        aria-label="Modifier"
                        onClick={() => navigate(`/agent-management/detail/${agent.id}/edit`)}
                      >
                        <FiEdit2 size={18} />
                      </IconButton>
                      <IconButton
                        className="text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-950/30"
                        title={agent.status === "Suspendu" ? "Réactiver" : "Suspendre"}
                        aria-label={agent.status === "Suspendu" ? "Réactiver" : "Suspendre"}
                        type="button"
                      >
                        {agent.status === "Suspendu" ? <FiPlay size={18} /> : <FiPause size={18} />}
                      </IconButton>
                      <IconButton
                        className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                        title="Supprimer"
                        aria-label="Supprimer"
                        onClick={() => setDeleteTarget(agent)}
                      >
                        <FiTrash2 size={18} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationControls
          page={safePage}
          totalPages={totalPages}
          totalItems={agents.length}
          pageSize={pageSize}
          onPageChange={setPage}
          label="agents"
        />
      </div>
      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Supprimer cet agent ?"
        message={
          deleteTarget
            ? `Voulez-vous vraiment supprimer le dossier de ${deleteTarget.name} ?`
            : "Voulez-vous vraiment supprimer ce dossier ?"
        }
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => setDeleteTarget(null)}
      />
    </section>
  );
}
