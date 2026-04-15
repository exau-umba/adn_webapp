import { AppButton } from "./AppButton";

export function PaginationControls({ page, totalPages, totalItems, pageSize, onPageChange, label = "éléments" }) {
  if (totalItems <= 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(totalItems, page * pageSize);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800/70">
      <p className="font-myriad text-xs text-slate-500 dark:text-slate-400">
        Affichage de {start} à {end} sur {totalItems} {label}
      </p>
      <div className="flex items-center gap-2">
        <AppButton variant="ghost" size="sm" className="rounded-lg" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Précédent
        </AppButton>
        <span className="font-myriad text-xs text-slate-500 dark:text-slate-300">
          Page {page}/{totalPages}
        </span>
        <AppButton
          variant="ghost"
          size="sm"
          className="rounded-lg"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Suivant
        </AppButton>
      </div>
    </div>
  );
}
