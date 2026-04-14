import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { AdminFooter } from "./AdminFooter";

export function AdminLayout({ sidebarCollapsed, onToggleSidebar, isDarkMode, onToggleDarkMode }) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AdminHeader
        onToggleSidebar={onToggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
      <Sidebar collapsed={sidebarCollapsed} />
      <main
        className={`pt-24 pr-4 pb-28 transition-all md:pr-6 md:pb-32 ${
          sidebarCollapsed ? "lg:pl-[7.25rem]" : "lg:pl-[15.75rem]"
        }`}
      >
        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <AdminBreadcrumb />
          <Outlet />
        </div>
      </main>
      <AdminFooter sidebarCollapsed={sidebarCollapsed} />
    </div>
  );
}
