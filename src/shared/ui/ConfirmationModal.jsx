import { AppButton } from "./AppButton";

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <h3 className="font-brand text-2xl text-[#01003b] dark:text-slate-100">{title}</h3>
        <p className="mt-2 font-myriad text-sm text-slate-500 dark:text-slate-400">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <AppButton variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </AppButton>
          <AppButton
            variant="primary"
            className="bg-gradient-to-r from-red-600 to-red-700 text-white dark:from-red-600 dark:to-red-700"
            onClick={onConfirm}
          >
            {confirmLabel}
          </AppButton>
        </div>
      </div>
    </div>
  );
}
