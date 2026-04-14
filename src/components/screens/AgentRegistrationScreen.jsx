import { AppButton, AppInput, AppSelect } from "../ui";

export function AgentRegistrationScreen() {
  return (
    <section className="space-y-3">
      <div>
        <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">
          Processus de Recrutement
        </p>
        <h2 className="mt-2 font-brand text-3xl leading-tight text-[#01003b] dark:text-slate-100">
          Fiche d'identification de l'agent
        </h2>
      </div>

      <form className="space-y-6">
        <section className="rounded-[2rem] bg-white p-8 shadow-[0_4px_6px_-1px_rgba(8,4,122,0.04),0_20px_40px_-10px_rgba(8,4,122,0.08)] dark:bg-slate-900/80">
          <h3 className="mb-6 font-brand text-2xl text-[#01003b] dark:text-slate-100">1. Informations Personnelles</h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {["Nom complet", "Date de naissance", "Lieu de naissance", "Sexe", "Telephone", "Adresse"].map(
              (label) => (
                <label
                  key={label}
                  className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  {label}
                  {label === "Date de naissance" ? (
                    <AppInput type="date" className="mt-2" />
                  ) : label === "Sexe" ? (
                    <AppSelect defaultValue="" className="mt-2">
                      <option value="" disabled>
                        Selectionner
                      </option>
                      <option value="femme">Femme</option>
                      <option value="homme">Homme</option>
                    </AppSelect>
                  ) : (
                    <AppInput className="mt-2" />
                  )}
                </label>
              ),
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] bg-white p-8 shadow-sm dark:bg-slate-900/80">
            <h3 className="mb-6 font-brand text-2xl text-[#01003b] dark:text-slate-100">2. Identification</h3>
            <div className="space-y-5">
              <AppInput placeholder="Type de piece" />
              <AppInput placeholder="Numero de la piece" />
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center font-myriad text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                Cliquez pour uploader le portrait
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-[#01003b] p-8 text-white shadow-sm">
            <h3 className="mb-6 font-brand text-2xl">4. Competences</h3>
            <div className="grid grid-cols-2 gap-3 font-myriad text-sm">
              {["Menage", "Cuisine", "Garde d'enfants", "Chauffeur", "Jardinage", "Securite"].map((skill) => (
                <label key={skill} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <input type="checkbox" />
                  {skill}
                </label>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-[2rem] bg-white p-8 shadow-sm dark:bg-slate-900/80">
          <h3 className="mb-6 font-brand text-2xl text-[#01003b] dark:text-slate-100">3. Experiences Professionnelles</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {["Poste", "Duree", "Dernier employeur", "Reference"].map((f) => (
              <AppInput key={f} placeholder={f} />
            ))}
          </div>
        </section>

        <div className="sticky bottom-8 flex flex-col items-center justify-between gap-4 rounded-[2rem] bg-white/90 p-6 shadow-xl backdrop-blur sm:flex-row dark:bg-slate-900/90">
          <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">Sauvegarde automatique a 14:32</p>
          <div className="flex w-full gap-3 sm:w-auto">
            <AppButton variant="ghost" size="md">
              Annuler
            </AppButton>
            <AppButton variant="primary" size="md" className="!px-6">
              Enregistrer l'Agent
            </AppButton>
          </div>
        </div>
      </form>
      {/* <div className="text-center font-brand text-xl italic text-[#01003b]/50">
        ADN PRO SERVICE - L'excellence au cœur du servive
      </div> */}
    </section>
  );
}
