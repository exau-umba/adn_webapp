import {
  FaCheck,
  FaChevronRight,
  FaClipboardCheck,
  FaClipboardList,
  FaClockRotateLeft,
  FaTriangleExclamation,
  FaUserCheck,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa6";
import { AppButton } from "../ui";

const stats = [
  {
    title: "Agents actifs",
    value: "124",
    trend: "+12%",
    trendClass: "text-emerald-600 dark:text-emerald-400",
    accent: "border-l-[#08047a]",
    iconBg: "bg-[#e8e8ff] dark:bg-indigo-950/50",
    icon: FaUsers,
  },
  {
    title: "Missions en cours",
    value: "42",
    trend: "+5%",
    trendClass: "text-emerald-600 dark:text-emerald-400",
    accent: "border-l-[#0084df]",
    iconBg: "bg-[#e7f2ff] dark:bg-sky-950/40",
    icon: FaClipboardList,
  },
  {
    title: "Clients actifs",
    value: "892",
    trend: "Stable",
    trendClass: "text-slate-500 dark:text-slate-400",
    accent: "border-l-[#01003b]",
    iconBg: "bg-slate-100 dark:bg-slate-700/60",
    icon: FaUserCheck,
  },
  {
    title: "Alertes critiques",
    value: "07",
    trend: "URGENT",
    trendClass: "text-red-600 dark:text-red-400",
    accent: "border-l-red-500",
    iconBg: "bg-red-100 dark:bg-red-950/50",
    icon: FaTriangleExclamation,
  },
];

export function DashboardScreen() {
  const activityItems = [
    {
      title: "Mission terminee",
      description: "Agent: Jean D. - Client: Residence Vert",
      time: "Il y a 10 min",
      icon: FaCheck,
      tone:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    {
      title: "Incident signale",
      description: "Retard important - Mission #8421",
      time: "Il y a 45 min",
      icon: FaTriangleExclamation,
      tone: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
    },
    {
      title: "Nouvel agent valide",
      description: "Sarah M. a rejoint l'equipe terrain",
      time: "Il y a 2 h",
      icon: FaUserPlus,
      tone: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    },
    {
      title: "Nouveau contrat signe",
      description: "Client: Hotel des Thermes",
      time: "Il y a 4 h",
      icon: FaClipboardCheck,
      tone: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    },
    {
      title: "Sauvegarde systeme",
      description: "Base de donnees synchronisee",
      time: "Hier, 23:15",
      icon: FaClockRotateLeft,
      tone: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
    },
  ];

  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-brand text-4xl text-[#01003b] dark:text-slate-100">Tableau de bord</h2>
        <p className="mt-1 font-myriad text-slate-500 dark:text-slate-400">
          Bienvenue, voici l'aperçu de vos services domestiques aujourd'hui.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800/80 ${stat.accent} border-l-4`}
          >
            {/** icone statistique */}
            {(() => {
              const Icon = stat.icon;
              return (
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm ${stat.iconBg}`}
                    aria-hidden="true"
                  >
                    <Icon className="text-[14px] text-[#08047a] dark:text-indigo-300" />
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 font-myriad text-[10px] font-bold uppercase tracking-wide ${stat.trendClass}`}
                  >
                    {stat.trend}
                  </span>
                </div>
              );
            })()}
            <p className="font-myriad text-[15px] text-slate-500 dark:text-slate-400">{stat.title}</p>
            <p
              className={`mt-1 font-myriad text-[42px] leading-none font-bold ${
                stat.title === "Alertes critiques"
                  ? "text-red-600 dark:text-red-400"
                  : "text-[#01003b] dark:text-slate-100"
              }`}
            >
              {stat.value}
            </p>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-700 dark:bg-slate-800/80 lg:col-span-2">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h3 className="font-myriad text-[28px] font-bold leading-none text-[#01003b] dark:text-slate-100">
                Performance des Agents
              </h3>
              <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">
                Analyse du taux de completion des missions par mois
              </p>
            </div>
            <AppButton
              variant="ghost"
              size="sm"
              className="rounded-lg border-none bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200"
            >
              Derniers 6 mois
            </AppButton>
          </div>
          <div className="rounded-xl bg-slate-100/70 px-4 pt-10 pb-5 dark:bg-slate-900/60">
            <div className="flex h-56 items-end gap-3">
            {[65, 80, 45, 90, 75, 85].map((h, i) => (
              <div key={h} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative h-40 w-full rounded-t-lg bg-slate-100 dark:bg-slate-800">
                  <div
                    style={{ height: `${h}%` }}
                    className={`absolute bottom-0 w-full rounded-t-lg ${
                      i === 2 ? "bg-[#ffc81d]" : i === 5 ? "bg-[#0084df]" : "bg-[#08047a]"
                    }`}
                  />
                </div>
                <span className="font-myriad text-xs text-slate-500 dark:text-slate-400">
                  {["Jan", "Fev", "Mar", "Avr", "Mai", "Juin"][i]}
                </span>
              </div>
            ))}
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/80">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-myriad text-[26px] font-bold leading-none text-[#01003b] dark:text-slate-100">
              Activites Recentes
            </h3>
            <AppButton
              variant="ghost"
              size="sm"
              className="border-none bg-transparent !px-2 text-[#0061a6] shadow-none dark:text-sky-400"
            >
              Tout voir
            </AppButton>
          </div>
          <ul className="space-y-4">
            {activityItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full ${item.tone}`}>
                    <Icon className="text-sm" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-myriad text-[15px] font-semibold text-slate-800 dark:text-slate-100">
                      {item.title}
                    </p>
                    <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                    <p className="font-myriad text-xs text-slate-400 dark:text-slate-500">{item.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-700">
            <AppButton
              variant="ghost"
              className="flex w-full items-center gap-3 rounded-xl border-none bg-slate-100 !px-4 !py-3 text-left shadow-none dark:bg-slate-900/80 dark:hover:bg-slate-900"
            >
              <div className="flex -space-x-2">
                <img
                  src="/logos/and_pro_service_multiservice_cercle.png"
                  alt="Agent 1"
                  className="h-7 w-7 rounded-full border-2 border-white dark:border-slate-800"
                />
                <img
                  src="/logos/and_pro_service_multiservice_cercle.png"
                  alt="Agent 2"
                  className="h-7 w-7 rounded-full border-2 border-white dark:border-slate-800"
                />
              </div>
              <div className="flex-1">
                <p className="font-myriad text-xs font-bold text-[#01003b] dark:text-slate-100">
                  8 agents disponibles
                </p>
                <p className="font-myriad text-[11px] text-slate-500 dark:text-slate-400">
                  Pret pour l'affectation
                </p>
              </div>
              <FaChevronRight className="text-slate-500 dark:text-slate-400" />
            </AppButton>
          </div>
        </article>
      </div>

      {/* <div className="rounded-2xl bg-gradient-to-r from-[#01003b] to-[#08047a] p-6 text-white">
        <h3 className="font-brand text-3xl italic">Besoin d'optimiser vos ressources ?</h3>
        <p className="mt-2 max-w-4xl font-myriad text-sm text-white/80">
          Utilisez notre outil d'IA predictive pour anticiper les pics de demandes domestiques.
        </p>
      </div> */}
    </section>
  );
}
