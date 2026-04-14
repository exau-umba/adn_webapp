import { useNavigate } from "react-router-dom";
import { AppButton, AppInput, AppSelect, AppTextarea } from "../../../shared/ui";
import { clientsData } from "../../clients/data/clientsData.ts";
import { agentsData } from "../../agents/data/agentsData.ts";
import { ROUTES } from "../../../core/routes.ts";

export function MissionRegistrationScreen() {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Planification</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Nouvelle mission</h2>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.missionManagement)}>
          Retour
        </AppButton>
      </div>

      <form className="space-y-5">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h3 className="font-brand text-xl text-[#01003b] dark:text-slate-100">Affectation</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
              Intitulé de la mission
              <AppInput className="mt-2" placeholder="Ex. Ménage résidence hebdomadaire" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Client
              <AppSelect className="mt-2">
                <option value="">Choisir un client</option>
                {clientsData.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Agent
              <AppSelect className="mt-2">
                <option value="">Choisir un agent</option>
                {agentsData.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.service}
                  </option>
                ))}
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Lieu d&apos;exécution
              <AppInput className="mt-2" placeholder="Ville, adresse ou consignes d&apos;accès" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Type de prestation
              <AppSelect className="mt-2">
                <option>Menage</option>
                <option>Cuisine</option>
                <option>Garde d&apos;enfants</option>
                <option>Repassage</option>
                <option>Conciergerie</option>
                <option>Autre</option>
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Date de début
              <AppInput type="date" className="mt-2" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Date de fin (optionnel)
              <AppInput type="date" className="mt-2" />
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Statut initial
              <AppSelect className="mt-2">
                <option>Planifiee</option>
                <option>En cours</option>
              </AppSelect>
            </label>
            <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
              Notes internes
              <AppTextarea rows={4} className="mt-2 resize-y" placeholder="Consignes, horaires, contacts sur place..." />
            </label>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <AppButton variant="ghost" onClick={() => navigate(ROUTES.missionManagement)}>
            Annuler
          </AppButton>
          <AppButton variant="primary" type="button">
            Créer la mission
          </AppButton>
        </div>
      </form>
    </section>
  );
}
