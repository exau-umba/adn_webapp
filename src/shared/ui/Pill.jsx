export function Pill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 px-3 py-1 font-myriad text-xs font-bold uppercase tracking-wide text-slate-600">
      {children}
    </span>
  );
}
