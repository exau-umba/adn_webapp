import { AppButton } from "../../shared/ui";

const notifications = [
  {
    id: 1,
    title: "Nouvelle mission assignee",
    message: "L'agent Marc-Antoine Dupont est affecte a une nouvelle mission.",
    time: "Il y a 5 min",
    unread: true,
  },
  {
    id: 2,
    title: "Dossier incomplet",
    message: "Le dossier de Sophie Lavalliere attend un document de reference.",
    time: "Il y a 1 h",
    unread: true,
  },
  {
    id: 3,
    title: "Evaluation terminee",
    message: "L'evaluation de Lucas Bernard est maintenant disponible.",
    time: "Hier, 18:20",
    unread: false,
  },
];

export function NotificationsScreen() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Centre de notifications</p>
          <h2 className="mt-2 font-brand text-4xl text-[#01003b] dark:text-slate-100">Notifications</h2>
        </div>
        <AppButton variant="ghost">Tout marquer comme lu</AppButton>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{item.title}</p>
                <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">{item.message}</p>
              </div>
              {item.unread ? <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#08047a]" /> : null}
            </div>
            <p className="mt-3 font-myriad text-xs text-slate-400 dark:text-slate-500">{item.time}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
