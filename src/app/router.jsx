import { Navigate, useRoutes } from "react-router-dom";
import { AdminLayout } from "../layout/AdminLayout";
import { dashboardRoutes } from "../modules/dashboard/routes";
import { agentsRoutes } from "../modules/agents/routes";
import { clientsRoutes } from "../modules/clients/routes";
import { notificationsRoutes } from "../modules/notifications/routes";
import { settingsRoutes } from "../modules/settings/routes";
import { offresRoutes } from "../modules/offres/routes";
import { missionsRoutes } from "../modules/missions/routes";
import { contratsRoutes } from "../modules/contrats/routes";
import { financeRoutes } from "../modules/finance/routes";
import { incidentsRoutes } from "../modules/incidents/routes";
import { analyticsRoutes } from "../modules/analytics/routes";
import { ROUTES } from "../core/routes.ts";

export function AppRouter({ sidebarCollapsed, onToggleSidebar, isDarkMode, onToggleDarkMode }) {
  return useRoutes([
    {
      path: "/",
      element: (
        <AdminLayout
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={onToggleSidebar}
          isDarkMode={isDarkMode}
          onToggleDarkMode={onToggleDarkMode}
        />
      ),
      children: [
        { index: true, element: <Navigate to={ROUTES.dashboard} replace /> },
        ...dashboardRoutes,
        ...agentsRoutes,
        ...clientsRoutes,
        ...offresRoutes,
        ...missionsRoutes,
        ...contratsRoutes,
        ...financeRoutes,
        ...incidentsRoutes,
        ...analyticsRoutes,
        ...notificationsRoutes,
        ...settingsRoutes,
      ],
    },
    { path: "*", element: <Navigate to={ROUTES.dashboard} replace /> },
  ]);
}
