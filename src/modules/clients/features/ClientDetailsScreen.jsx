import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton, ConfirmationModal } from "../../../shared/ui";
import { clientsData } from "../data/clientsData.ts";
import { ROUTES } from "../../../core/routes.ts";
import { getStatusTone } from "../../../core/constants/statusStyles.ts";

export function ClientDetailsScreen() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [isInactive, setIsInactive] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const client = useMemo(() => clientsData.find((item) => item.id === clientId), [clientId]);
  const statusTone = getStatusTone(client?.status ?? "Suspendu");

  if (!client) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Client introuvable</h2>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.clientManagement)}>
          Retour a la liste
        </AppButton>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Fiche client</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">{client.name}</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">{client.contact}</p>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.clientManagement)}>
          Retour
        </AppButton>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Statut</p>
            <span
              className={`inline-flex items-center gap-2 font-myriad font-semibold ${statusTone.text}`}
            >
              <span className={`h-2 w-2 rounded-full ${statusTone.dot}`} />
              {client.status}
            </span>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Contact</p>
            <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{client.contact}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Telephone</p>
            <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{client.phone}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Ville</p>
            <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{client.city}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Adresse</p>
            <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{client.address}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Secteur</p>
            <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{client.sector}</p>
          </div>
          <div>
            <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Missions actives</p>
            <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{client.activeMissions}</p>
          </div>
        </div>
      </article>

      <div className="flex flex-wrap gap-3">
        <AppButton variant="secondary" onClick={() => navigate(ROUTES.clientEdit(client.id))}>
          Modifier le dossier
        </AppButton>
        <AppButton
          variant="ghost"
          className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950/30"
          onClick={() => setIsInactive((prev) => !prev)}
        >
          {isInactive ? "Reactiver le client" : "Suspendre le client"}
        </AppButton>
        <AppButton
          variant="ghost"
          className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Supprimer le client
        </AppButton>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Supprimer ce client ?"
        message="Cette action est irreversible. Voulez-vous supprimer ce dossier client ?"
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          navigate(ROUTES.clientManagement);
        }}
      />
    </section>
  );
}
