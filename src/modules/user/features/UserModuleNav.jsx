import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../core/routes.ts";

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-myriad transition ${
    isActive
      ? "bg-gradient-to-r from-[#01003b] to-[#08047a] text-white shadow-[0_6px_14px_rgba(8,4,122,0.22)]"
      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
  }`;

export function UserModuleNav() {
  return (
    <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 p-1.5 dark:border-slate-700 dark:bg-slate-800/50">
      <NavLink to={ROUTES.userManagement} end className={linkClass}>
        Utilisateurs
      </NavLink>
      <NavLink to={ROUTES.userRoles} className={linkClass}>
        Rôles et permissions
      </NavLink>
    </div>
  );
}
