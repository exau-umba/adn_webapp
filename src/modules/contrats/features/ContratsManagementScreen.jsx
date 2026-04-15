import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiFolder } from "react-icons/fi";
import { AppButton, AppInput, IconButton } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { getAllContratBundles } from "../data/contratBundleResolve.ts";
import { getAllEmployeurContrats } from "../data/employeurContratResolve.ts";

export function ContratsManagementScreen() {
  const navigate = useNavigate();
  const { key } = useLocation();
  const bundlesMission = useMemo(() => getAllContratBundles(), [key]);
  const contratsEmployeur = useMemo(() => getAllEmployeurContrats(), [key]);

  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Juridique</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Contrats</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">
            <strong>Contrats employeur</strong> (agent ↔ ADN, dès le recrutement) et <strong>dossiers mission</strong>{" "}
            (fiche client + annexe tripartite une fois l&apos;agent affecté).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AppButton variant="secondary" size="lg" onClick={() => navigate(ROUTES.agentRegistration)}>
            Recruter un agent → contrat employeur
          </AppButton>
          <AppButton variant="ghost" size="lg" onClick={() => navigate(ROUTES.missionRegistration)}>
            Nouvelle mission
          </AppButton>
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900/80">
        <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Recherche
        </p>
        <AppInput className="mt-3" placeholder="Référence EMP-, CTR-, mission..." />
      </div>

      <div>
        <h3 className="mb-3 font-brand text-lg text-[#01003b] dark:text-slate-100">Contrats employeur — Agents</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <table className="min-w-[640px] w-full border-collapse font-myriad text-sm">
            <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
              <tr>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Réf. dossier</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Agent</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Date</th>
                <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {contratsEmployeur.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="p-3 font-mono text-xs text-[#08047a] dark:text-indigo-300">{c.referenceDossier}</td>
                  <td className="p-3 font-medium text-[#01003b] dark:text-slate-100">{c.agent.nomComplet}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{c.dateGeneration}</td>
                  <td className="p-3 text-right">
                    <IconButton
                      className="text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                      title="Ouvrir le contrat"
                      aria-label="Ouvrir le contrat employeur"
                      onClick={() => navigate(ROUTES.agentEmployeurContrat(c.agentId))}
                    >
                      <FiFolder size={18} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-brand text-lg text-[#01003b] dark:text-slate-100">Dossiers mission — Tripartite</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <table className="min-w-[720px] w-full border-collapse font-myriad text-sm">
            <thead className="bg-slate-50 text-left dark:bg-slate-800/80">
              <tr>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Dossier</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Mission</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Client</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Agent</th>
                <th className="p-3 text-[11px] uppercase tracking-widest text-slate-500">Date</th>
                <th className="p-3 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {bundlesMission.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="p-3 font-mono text-xs text-[#08047a] dark:text-indigo-300">{b.referenceDossier}</td>
                  <td className="p-3">
                    <p className="font-semibold text-[#01003b] dark:text-slate-100">{b.missionTitre}</p>
                    <p className="text-xs text-slate-500">{b.missionReference}</p>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{b.client.nomComplet}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{b.agent.nomComplet}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{b.dateGeneration}</td>
                  <td className="p-3 text-right">
                    <IconButton
                      className="text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                      title="Ouvrir le dossier"
                      aria-label="Ouvrir le dossier mission"
                      onClick={() => navigate(ROUTES.contratBundleDetail(b.id))}
                    >
                      <FiFolder size={18} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
