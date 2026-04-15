import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiEye, FiPause, FiPlay, FiTrash2 } from "react-icons/fi";
import { AppButton, AppInput, AppSelect, ConfirmationModal, IconButton, PaginationControls } from "../../../shared/ui";
import { clientsData as clients } from "../data/clientsData.ts";
import { ROUTES } from "../../../core/routes.ts";
import { getStatusTone } from "../../../core/constants/statusStyles.ts";

export function ClientsManagementScreen() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(clients.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const clientsPage = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return clients.slice(start, start + pageSize);
  }, [safePage]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Portefeuille Client</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Gestion des Clients</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Suivez les informations clients et les missions associees.
          </p>
        </div>
        <AppButton variant="secondary" size="lg" onClick={() => navigate(ROUTES.clientRegistration)}>
          Nouveau Client
        </AppButton>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80 md:col-span-2">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Recherche client
          </p>
          <AppInput className="mt-3" placeholder="Nom client, contact, ville..." />
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Statut</p>
          <AppSelect className="mt-3">
            <option>Tous</option>
            <option>Actif</option>
            <option>Suspendu</option>
          </AppSelect>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <table className="min-w-[760px] w-full border-collapse font-myriad text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
            <tr>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Client</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Contact</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Ville</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Missions</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Statut</th>
              <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {clientsPage.map((client) => {
              const statusTone = getStatusTone(client.status);
              return (
                <tr key={client.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="p-3 font-semibold text-[#01003b] dark:text-slate-100">{client.name}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{client.contact}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{client.city}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{client.activeMissions}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-2 ${statusTone.text}`}>
                      <span className={`h-2 w-2 rounded-full ${statusTone.dot}`} />
                      {client.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1">
                      <IconButton
                        className="text-slate-600 dark:text-slate-300"
                        title="Voir le détail"
                        aria-label="Voir le détail"
                        onClick={() => navigate(ROUTES.clientDetail(client.id))}
                      >
                        <FiEye size={18} />
                      </IconButton>
                      <IconButton
                        className="text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                        title="Modifier"
                        aria-label="Modifier"
                        onClick={() => navigate(ROUTES.clientEdit(client.id))}
                      >
                        <FiEdit2 size={18} />
                      </IconButton>
                      <IconButton
                        className="text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-950/30"
                        title={client.status === "Suspendu" ? "Réactiver" : "Suspendre"}
                        aria-label={client.status === "Suspendu" ? "Réactiver" : "Suspendre"}
                        type="button"
                      >
                        {client.status === "Suspendu" ? <FiPlay size={18} /> : <FiPause size={18} />}
                      </IconButton>
                      <IconButton
                        className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                        title="Supprimer"
                        aria-label="Supprimer"
                        onClick={() => setDeleteTarget(client)}
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
          totalItems={clients.length}
          pageSize={pageSize}
          onPageChange={setPage}
          label="clients"
        />
      </div>
      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Supprimer ce client ?"
        message={
          deleteTarget
            ? `Voulez-vous vraiment supprimer le dossier de ${deleteTarget.name} ?`
            : "Voulez-vous vraiment supprimer ce dossier client ?"
        }
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => setDeleteTarget(null)}
      />
    </section>
  );
}
