export function Card({ title, value, helper }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="font-myriad text-sm text-slate-500">{title}</p>
      <p className="mt-2 font-brand text-3xl text-slate-900">{value}</p>
      <p className="mt-1 font-myriad text-xs text-slate-500">{helper}</p>
    </div>
  );
}
