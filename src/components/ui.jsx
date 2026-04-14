export function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="font-brand text-3xl text-brand-primary">{title}</h2>
      {subtitle ? <p className="mt-1 font-myriad text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

const buttonVariants = {
  primary:
    "bg-gradient-to-r from-[#01003b] to-[#08047a] text-white hover:brightness-105 dark:from-[#12105a] dark:to-[#1b1780]",
  secondary:
    "bg-[#ffdf95] text-[#251a00] hover:brightness-95 dark:bg-[#ffd36b] dark:text-[#251a00]",
  ghost:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
};

const buttonSizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-sm",
  icon: "p-2 text-sm",
};

export function AppButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`rounded-full font-myriad font-semibold shadow-sm transition ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function IconButton({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 ${buttonSizes.icon} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

const fieldBaseClass =
  "w-full rounded-xl border border-transparent bg-slate-100 px-3 py-2.5 text-sm font-myriad text-slate-700 outline-none ring-brand-primary transition focus:ring-2 dark:bg-slate-800 dark:text-slate-100";

export function AppInput({ className = "", type = "text", ...props }) {
  return <input type={type} className={`${fieldBaseClass} ${className}`} {...props} />;
}

export function AppSelect({ className = "", children, ...props }) {
  return (
    <select className={`${fieldBaseClass} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function AppTextarea({ className = "", ...props }) {
  return <textarea className={`${fieldBaseClass} resize-none ${className}`} {...props} />;
}

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

export function Card({ title, value, helper }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="font-myriad text-sm text-slate-500">{title}</p>
      <p className="mt-2 font-brand text-3xl text-slate-900">{value}</p>
      <p className="mt-1 font-myriad text-xs text-slate-500">{helper}</p>
    </div>
  );
}

export function Pill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 px-3 py-1 font-myriad text-xs font-bold uppercase tracking-wide text-slate-600">
      {children}
    </span>
  );
}
