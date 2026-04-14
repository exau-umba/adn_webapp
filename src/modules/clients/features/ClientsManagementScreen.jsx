import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppButton, AppInput, AppSelect, ConfirmationModal } from "../../../shared/ui";
import { clientsData as clients } from "../data/clientsData.ts";
import { ROUTES } from "../../../core/routes.ts";
import { getStatusTone } from "../../../core/constants/statusStyles.ts";

export function ClientsManagementScreen() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);

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
            {clients.map((client) => {
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
                    <div className="flex justify-end gap-2">
                      <AppButton
                        variant="ghost"
                        size="sm"
                        className="rounded-lg"
                        onClick={() => navigate(ROUTES.clientDetail(client.id))}
                      >
                        Voir
                      </AppButton>
                      <AppButton
                        variant="secondary"
                        size="sm"
                        className="rounded-lg"
                        onClick={() => navigate(ROUTES.clientEdit(client.id))}
                      >
                        Modifier
                      </AppButton>
                      <AppButton
                        variant="ghost"
                        size="sm"
                        className="rounded-lg border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950/30"
                      >
                        {client.status === "Suspendu" ? "Reactiver" : "Suspendre"}
                      </AppButton>
                      <AppButton
                        variant="ghost"
                        size="sm"
                        className="rounded-lg border-red-200 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
                        onClick={() => setDeleteTarget(client)}
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
