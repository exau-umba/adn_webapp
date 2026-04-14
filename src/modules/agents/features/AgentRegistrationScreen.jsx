import { useState } from "react";
import { AppButton, AppInput } from "../../../shared/ui";

export function AgentRegistrationScreen() {
  const [selectedSex, setSelectedSex] = useState("");
  const [hasPhoto, setHasPhoto] = useState("non");
  const [hasExperience, setHasExperience] = useState("non");

  return (
    <section className="space-y-3">
      <div>
        <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">
          Processus de Recrutement
        </p>
        <h2 className="mt-1 font-brand text-2xl leading-tight text-[#01003b] dark:text-slate-100 md:text-3xl">
          Fiche d'identification de l'agent
        </h2>
      </div>

      <form className="space-y-5">
        <section className="rounded-xl bg-white p-5 shadow-[0_4px_6px_-1px_rgba(8,4,122,0.04),0_20px_40px_-10px_rgba(8,4,122,0.08)] md:p-6 dark:bg-slate-900/80">
          <h3 className="mb-4 font-brand text-xl text-[#01003b] dark:text-slate-100">1. Informations Personnelles</h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Nom complet
              <AppInput className="mt-2" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Date de naissance
              <AppInput type="date" className="mt-2" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Lieu de naissance
              <AppInput className="mt-2" />
            </label>
            <div className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Sexe
              <div className="mt-2 flex gap-4 rounded-xl bg-slate-100 px-3 py-2.5 text-[13px] font-semibold normal-case dark:bg-slate-800">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sex"
                    value="homme"
                    checked={selectedSex === "homme"}
                    onChange={(event) => setSelectedSex(event.target.value)}
                  />
                  Homme
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sex"
                    value="femme"
                    checked={selectedSex === "femme"}
                    onChange={(event) => setSelectedSex(event.target.value)}
                  />
                  Femme
                </label>
              </div>
            </div>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Numero de telephone
              <AppInput className="mt-2" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Adresse complete
              <AppInput className="mt-2" />
            </label>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className="rounded-xl bg-white p-5 shadow-sm md:p-6 dark:bg-slate-900/80">
            <h3 className="mb-4 font-brand text-xl text-[#01003b] dark:text-slate-100">2. Identification</h3>
            <div className="space-y-5">
              <AppInput placeholder="Type de piece" />
              <AppInput placeholder="Numero" />
              <div className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Photo
                <div className="mt-2 flex gap-4 rounded-xl bg-slate-100 px-3 py-2.5 text-[13px] font-semibold normal-case dark:bg-slate-800">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="photo"
                      value="oui"
                      checked={hasPhoto === "oui"}
                      onChange={(event) => setHasPhoto(event.target.value)}
                    />
                    Oui
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="photo"
                      value="non"
                      checked={hasPhoto === "non"}
                      onChange={(event) => setHasPhoto(event.target.value)}
                    />
                    Non
                  </label>
                </div>
              </div>
              {hasPhoto === "oui" ? (
                <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center font-myriad text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                  <label className="cursor-pointer">
                    <span className="font-semibold">Uploader la photo</span>
                    <input type="file" accept="image/*" className="mt-3 block w-full text-xs" />
                  </label>
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-xl bg-[#01003b] p-5 text-white shadow-sm md:p-6">
            <h3 className="mb-4 font-brand text-xl">4. Competences</h3>
            <div className="grid grid-cols-2 gap-3 font-myriad text-sm">
              {["Menage", "Cuisine", "Garde d'enfants", "Repassage", "Jardinage", "Chauffeur"].map((skill) => (
                <label key={skill} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <input type="checkbox" />
                  {skill}
                </label>
              ))}
            </div>
            <label className="mt-4 block font-myriad text-xs font-bold uppercase tracking-wider text-white/80">
              Autres
              <AppInput className="mt-2 border-none bg-white/10 text-white placeholder:text-white/60 dark:bg-white/10" />
            </label>
          </section>
        </div>

        <section className="rounded-xl bg-white p-5 shadow-sm md:p-6 dark:bg-slate-900/80">
          <h3 className="mb-4 font-brand text-xl text-[#01003b] dark:text-slate-100">3. Experiences Professionnelles</h3>
          <div className="mb-5 font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Avez-vous deja travaille ?
            <div className="mt-2 flex gap-4 rounded-xl bg-slate-100 px-3 py-2.5 text-[13px] font-semibold normal-case dark:bg-slate-800">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="experience"
                  value="oui"
                  checked={hasExperience === "oui"}
                  onChange={(event) => setHasExperience(event.target.value)}
                />
                Oui
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="experience"
                  value="non"
                  checked={hasExperience === "non"}
                  onChange={(event) => setHasExperience(event.target.value)}
                />
                Non
              </label>
            </div>
          </div>
          {hasExperience === "oui" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {["Poste occupe", "Duree", "Ancien employeur", "Contact reference"].map((f) => (
                <AppInput key={f} placeholder={f} />
              ))}
            </div>
          ) : null}
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm md:p-6 dark:bg-slate-900/80">
          <h3 className="mb-4 font-brand text-xl text-[#01003b] dark:text-slate-100">5. Disponibilite</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Temps plein", "Temps partiel", "Logé", "Non logé"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-myriad text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <input type="checkbox" />
                {item}
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm md:p-6 dark:bg-slate-900/80">
          <h3 className="mb-3 font-brand text-xl text-[#01003b] dark:text-slate-100">6. Engagement</h3>
          <label className="flex items-start gap-3 font-myriad text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" className="mt-1" />
            Je certifie l'exactitude des informations fournies et m'engage a respecter les normes de ADN PRO SERVICE.
          </label>
        </section>

        <div className="sticky bottom-8 flex flex-col items-center justify-between gap-3 rounded-xl bg-white/90 p-4 shadow-xl backdrop-blur sm:flex-row dark:bg-slate-900/90">
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
