import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { AppButton, AppInput, AppSelect, ConfirmationModal, IconButton, PaginationControls } from "../../../shared/ui";
import { offresData as offres } from "../data/offresData.ts";
import { ROUTES } from "../../../core/routes.ts";

function getOffreStatutTone(statut) {
  if (statut === "Publiée") return { text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" };
  if (statut === "Brouillon") return { text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
  return { text: "text-slate-500 dark:text-slate-400", dot: "bg-slate-400" };
}

export function OffresManagementScreen() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(offres.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const offresPage = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return offres.slice(start, start + pageSize);
  }, [safePage]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Site public</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Offres d&apos;emploi</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            Gérez les annonces affichées sur la page recrutement du site vitrine.
          </p>
        </div>
        <AppButton variant="secondary" size="lg" onClick={() => navigate(ROUTES.offreEmploiRegistration)}>
          Nouvelle offre
        </AppButton>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Recherche
          </p>
          <AppInput className="mt-3" placeholder="Intitulé, lieu, mot-clé..." />
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Statut</p>
          <AppSelect className="mt-3">
            <option>Tous</option>
            <option>Publiée</option>
            <option>Brouillon</option>
            <option>Archivée</option>
          </AppSelect>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <table className="min-w-[720px] w-full border-collapse font-myriad text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
            <tr>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Poste</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Lieu</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Contrat</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Statut</th>
              <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Publication</th>
              <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {offresPage.map((offre) => {
              const tone = getOffreStatutTone(offre.statut);
              return (
                <tr key={offre.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="p-3">
                    <p className="font-semibold text-[#01003b] dark:text-slate-100">{offre.titre}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">{offre.resume}</p>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{offre.lieu}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{offre.contrat}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-2 ${tone.text}`}>
                      <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                      {offre.statut}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">
                    {offre.datePublication ?? "—"}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1">
                      <IconButton
                        className="text-slate-600 dark:text-slate-300"
                        title="Voir le détail"
                        aria-label="Voir le détail"
                        onClick={() => navigate(ROUTES.offreEmploiDetail(offre.id))}
                      >
                        <FiEye size={18} />
                      </IconButton>
                      <IconButton
                        className="text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                        title="Modifier"
                        aria-label="Modifier"
                        onClick={() => navigate(ROUTES.offreEmploiEdit(offre.id))}
                      >
                        <FiEdit2 size={18} />
                      </IconButton>
                      <IconButton
                        className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                        title="Supprimer"
                        aria-label="Supprimer"
                        onClick={() => setDeleteTarget(offre)}
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
          totalItems={offres.length}
          pageSize={pageSize}
          onPageChange={setPage}
          label="offres"
        />
      </div>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Supprimer cette offre ?"
        message={
          deleteTarget
            ? `L'offre « ${deleteTarget.titre} » sera retirée du back-office (démo).`
            : "Voulez-vous vraiment supprimer cette offre ?"
        }
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => setDeleteTarget(null)}
      />
    </section>
  );
}
