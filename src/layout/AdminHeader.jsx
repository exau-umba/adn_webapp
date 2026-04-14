import { useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaGear, FaMagnifyingGlass, FaMoon, FaSun } from "react-icons/fa6";
import { AppButton, AppInput, IconButton } from "../components/ui";
import { ROUTES } from "../core/routes.ts";

export function AdminHeader({ onToggleSidebar, sidebarCollapsed, isDarkMode, onToggleDarkMode }) {
  const navigate = useNavigate();

  return (
    <header
      className={`fixed top-4 right-4 left-4 z-40 rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_6px_-1px_rgba(8,4,122,0.04),0_20px_40px_-10px_rgba(8,4,122,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 ${
        sidebarCollapsed ? "md:left-[7.25rem]" : "md:left-[15.75rem]"
      }`}
    >
      <div className="flex h-16 items-center gap-2 px-3 sm:gap-4 sm:px-5">
        <IconButton
          onClick={onToggleSidebar}
          className="border border-slate-200 text-slate-600 dark:border-slate-700"
          aria-label="Reduire ou agrandir le sidebar"
        >
          <FaBars />
        </IconButton>

        <div className="relative hidden w-full max-w-[460px] md:block">
          <FaMagnifyingGlass className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <AppInput className="border-none py-2 pr-3 pl-10" placeholder="Rechercher un agent, mission, contrat..." />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <AppButton
            onClick={onToggleDarkMode}
            className="flex items-center gap-2 rounded-lg border border-slate-200 !px-3 !py-2 text-slate-600 dark:border-slate-700 dark:text-slate-200"
            variant="ghost"
            size="sm"
            aria-label="Basculer entre mode clair et sombre"
            title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
            <span>{isDarkMode ? "Mode clair" : "Mode sombre"}</span>
          </AppButton>
          <IconButton onClick={() => navigate(ROUTES.notifications)}>
            <FaBell />
          </IconButton>
          <IconButton onClick={() => navigate(ROUTES.settings)}>
            <FaGear />
          </IconButton>
          <div className="mx-1 h-7 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="hidden text-right sm:block">
            <p className="font-myriad text-xs font-bold text-[#08047a] dark:text-slate-100">Admin Principal</p>
            <p className="font-myriad text-[10px] text-slate-500 dark:text-slate-400">ADN PRO SERVICE</p>
          </div>
          <img
            src="/logos/and_pro_service_multiservice_cercle.png"
            alt="Profil administrateur"
            className="ml-2 h-10 w-10 rounded-full border-2 border-white shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
