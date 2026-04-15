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
      className={`inline-flex items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 ${buttonSizes.icon} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
