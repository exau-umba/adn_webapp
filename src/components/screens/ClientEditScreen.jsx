import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton, AppInput } from "../../shared/ui";
import { clientsData } from "../../modules/clients/data/clientsData.ts";

export function ClientEditScreen() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const client = useMemo(() => clientsData.find((item) => item.id === clientId), [clientId]);

  if (!client) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-3xl text-[#01003b] dark:text-slate-100">Client introuvable</h2>
        <AppButton variant="ghost" onClick={() => navigate("/client-management")}>
          Retour a la liste
        </AppButton>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Edition client</p>
          <h2 className="mt-2 font-brand text-4xl text-[#01003b] dark:text-slate-100">Modifier le client</h2>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(`/client-management/detail/${client.id}`)}>
          Retour au detail
        </AppButton>
      </div>

      <form className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Nom client
            <AppInput className="mt-2" defaultValue={client.name} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Contact
            <AppInput className="mt-2" defaultValue={client.contact} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Telephone
            <AppInput className="mt-2" defaultValue={client.phone} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Ville
            <AppInput className="mt-2" defaultValue={client.city} />
          </label>
          <label className="font-myriad text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 md:col-span-2">
            Adresse
            <AppInput className="mt-2" defaultValue={client.address} />
          </label>
        </div>
        <div className="flex justify-end gap-3">
          <AppButton variant="ghost" onClick={() => navigate(`/client-management/detail/${client.id}`)}>
            Annuler
          </AppButton>
          <AppButton variant="primary">Enregistrer</AppButton>
        </div>
      </form>
    </section>
  );
}
