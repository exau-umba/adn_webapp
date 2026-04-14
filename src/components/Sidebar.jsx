import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaChartSimple,
  FaFileContract,
  FaHouse,
  FaIdBadge,
  FaPeopleGroup,
  FaTriangleExclamation,
  FaUserGroup,
  FaWallet,
} from "react-icons/fa6";
import { AppButton } from "../shared/ui";
import { ROUTES } from "../core/routes.ts";

const sidebarItems = [
  {
    label: "Tableau de bord",
    to: ROUTES.dashboard,
    icon: FaHouse,
    route: true,
    matchPrefixes: [ROUTES.dashboard],
  },
  {
    label: "Agent",
    to: ROUTES.agentManagement,
    icon: FaIdBadge,
    route: true,
    matchPrefixes: [ROUTES.agentManagement],
  },
  {
    label: "Clients",
    to: ROUTES.clientManagement,
    icon: FaPeopleGroup,
    route: true,
    matchPrefixes: [ROUTES.clientManagement],
  },
  {
    label: "Offres",
    to: ROUTES.offresEmploi,
    icon: FaBriefcase,
    route: true,
    matchPrefixes: [ROUTES.offresEmploi],
  },
  {
    label: "Mission",
    to: ROUTES.missionManagement,
    icon: FaUserGroup,
    route: true,
    matchPrefixes: [ROUTES.missionManagement],
  },
  {
    label: "Contrat",
    to: ROUTES.contratManagement,
    icon: FaFileContract,
    route: true,
    matchPrefixes: [ROUTES.contratManagement],
  },
  {
    label: "Finance",
    to: ROUTES.financeManagement,
    icon: FaWallet,
    route: true,
    matchPrefixes: [ROUTES.financeManagement],
  },
  { label: "Incident", icon: FaTriangleExclamation, route: false, matchPrefixes: ["/incidents"] },
  { label: "Analytique", icon: FaChartSimple, route: false, matchPrefixes: ["/analytics"] },
];

export function Sidebar({ collapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getIsActive = (item) => item.matchPrefixes?.some((prefix) => pathname.startsWith(prefix)) ?? false;

  return (
    <aside
      className={`fixed top-0 left-0 z-30 hidden h-screen shrink-0 border-r border-slate-200/70 bg-[#f1f3f6] px-4 py-6 dark:border-slate-800 dark:bg-slate-900 md:flex md:flex-col ${
        collapsed ? "w-24" : "w-[235px]"
      }`}
    >
      <div className="mb-8 px-2">
        <div className={collapsed ? "flex justify-center" : "flex items-center gap-3"}>
          <img
            src="/logos/and_pro_service_multiservice_cercle.png"
            alt="Logo ADN PRO SERVICE"
            className={collapsed ? "h-9 w-9 rounded-xl object-cover" : "h-12 w-12 rounded-xl object-cover"}
          />
          {!collapsed ? (
            <p className="font-brand text-[22px] leading-none text-[#08047a] dark:text-slate-100">
              ADN PRO SERVICE
            </p>
          ) : null}
        </div>
      </div>

      <nav className="space-y-1.5">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = getIsActive(item);
          if (item.route) {
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={() =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-myriad transition ${
                    isActive
                      ? "translate-x-[2px] bg-gradient-to-r from-[#01003b] to-[#08047a] text-white shadow-[0_8px_18px_rgba(8,4,122,0.28)]"
                      : "text-slate-700 hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon className="text-[14px]" />
                <span className={collapsed ? "hidden" : "block text-[15px] tracking-tight"}>{item.label}</span>
              </NavLink>
            );
          }
          return (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 font-myriad transition ${
                isActive
                  ? "translate-x-[2px] bg-gradient-to-r from-[#01003b] to-[#08047a] text-white shadow-[0_8px_18px_rgba(8,4,122,0.28)]"
                  : "text-slate-700 hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="text-[14px]" />
              <span className={collapsed ? "hidden" : "block text-[15px] tracking-tight"}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-200/60 pt-6 dark:border-slate-800">
        <AppButton
          variant="secondary"
          className="flex w-full items-center justify-center gap-2 rounded-xl !py-3 text-[15px]"
          onClick={() => navigate(ROUTES.missionRegistration)}
        >
          <FaUserGroup className="text-[14px]" />
          <span className={collapsed ? "hidden" : "block"}>Nouvelle Mission</span>
        </AppButton>
      </div>
    </aside>
  );
}
