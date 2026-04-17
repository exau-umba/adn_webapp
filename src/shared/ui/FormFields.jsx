export const fieldBaseClass =
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
