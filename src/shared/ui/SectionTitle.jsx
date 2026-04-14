export function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="font-brand text-3xl text-brand-primary">{title}</h2>
      {subtitle ? <p className="mt-1 font-myriad text-slate-500">{subtitle}</p> : null}
    </div>
  );
}
