import { AppButton } from "./ui";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <img
            src="/logos/and_pro_service_multiservice_cercle.png"
            alt="Logo ADN PRO SERVICE"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="font-brand text-base leading-none text-brand-primary">ADN PRO SERVICE</p>
            <p className="font-myriad text-xs uppercase tracking-[0.2em] text-slate-500">
              Administration
            </p>
          </div>
        </div>
        <AppButton variant="ghost" size="md" className="rounded-xl">
          Deconnexion
        </AppButton>
      </div>
    </header>
  );
}
