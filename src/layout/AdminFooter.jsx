export function AdminFooter({ sidebarCollapsed }) {
  return (
    <footer
      className={`fixed right-4 bottom-4 left-4 z-40 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_4px_6px_-1px_rgba(8,4,122,0.04),0_20px_40px_-10px_rgba(8,4,122,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 lg:px-5 ${
        sidebarCollapsed ? "md:left-[7.25rem]" : "md:left-[15.75rem]"
      }`}
    >
      <div className="flex flex-col items-start justify-between gap-1 font-myriad text-xs text-slate-500 sm:flex-row sm:items-center sm:gap-3 dark:text-slate-400">
        <p>ADN PRO SERVICE Admin</p>
        <p>Version 1.0.0</p>
      </div>
    </footer>
  );
}
