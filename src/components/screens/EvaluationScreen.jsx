import { AppButton, AppTextarea } from "../ui";

export function EvaluationScreen() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end dark:border-slate-700">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">
            Processus de Qualification
          </p>
          <h2 className="mt-2 font-brand text-4xl text-[#01003b] dark:text-slate-100">Evaluation de Profil</h2>
        </div>
        <div className="flex min-w-[320px] items-center gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80">
          <img
            src="/logos/and_pro_service_multiservice_cercle.png"
            alt="Candidate"
            className="h-14 w-14 rounded-lg object-cover"
          />
          <div>
            <p className="font-myriad font-bold dark:text-slate-100">Martine Dubois</p>
            <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">Candidature #2024-8812</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-700 dark:bg-slate-900/80">
            <h3 className="mb-6 font-brand text-3xl text-[#01003b] dark:text-slate-100">Soft Skills &amp; Savoir-etre</h3>
            {[
              ["Politesse et Courtoisie", 8],
              ["Respect des Consignes", 9],
              ["Communication Verbale", 7],
            ].map(([label, score]) => (
              <div key={label} className="mb-6 last:mb-0">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-myriad text-lg text-[#01003b] dark:text-slate-100">{label}</p>
                  <span className="rounded-lg bg-[#e1e0ff] px-3 py-1 font-myriad text-sm font-bold text-[#01003b]">
                    {score} / 10
                  </span>
                </div>
                <input type="range" min="0" max="10" defaultValue={score} className="w-full accent-[#08047a]" />
              </div>
            ))}
          </article>

          <article className="rounded-2xl border border-slate-200 bg-[#f3f4f5] p-7 dark:border-slate-700 dark:bg-slate-900/70">
            <h3 className="mb-6 font-brand text-3xl text-[#01003b] dark:text-slate-100">Aptitudes &amp; Tests Pratiques</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {["Menage", "Cuisine", "Enfants"].map((item, i) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 text-center dark:border-slate-700 dark:bg-slate-800/80">
                  <p className="font-myriad font-bold dark:text-slate-100">{item}</p>
                  <p className="mt-2 font-myriad text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {i === 1 ? "Non teste" : "Verifie / Conforme"}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <div>
            <label className="mb-2 block font-brand text-2xl text-[#01003b] dark:text-slate-100">
              Observations Detaillees
            </label>
            <AppTextarea
              rows="4"
              className="border-slate-300"
              placeholder="Saisir les points forts, points de vigilance et remarques..."
            />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <article className="rounded-3xl bg-[#01003b] p-7 text-white">
            <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#f5bf0c]">
              Classification Automatique
            </p>
            <p className="mt-4 font-brand text-5xl md:text-6xl">VIP</p>
            <p className="font-myriad text-lg text-white/80">Profil Elite</p>
            <div className="mt-6 space-y-2 border-t border-white/20 pt-4 font-myriad text-sm">
              <p className="flex justify-between"><span>Score Moyen</span><strong>24 / 30</strong></p>
              <p className="flex justify-between"><span>Recommandation</span><strong>Haute Priorite</strong></p>
            </div>
          </article>

          <article className="space-y-3 rounded-2xl bg-[#edeeef] p-5 dark:bg-slate-900/70">
            <h4 className="font-myriad text-xs font-bold uppercase tracking-widest">Decision Finale</h4>
            <AppButton variant="primary" className="w-full rounded-xl">
              Accepte
            </AppButton>
            <AppButton variant="secondary" className="w-full rounded-xl">
              A former
            </AppButton>
            <AppButton
              variant="ghost"
              className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              Refuse
            </AppButton>
          </article>
        </div>
      </div>
    </section>
  );
}
