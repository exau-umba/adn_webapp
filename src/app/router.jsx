import { Navigate, useRoutes } from "react-router-dom";
import { AdminLayout } from "../layout/AdminLayout";
import { agentsRoutes } from "../modules/agents/routes";
import { clientsRoutes } from "../modules/clients/routes";
import { notificationsRoutes } from "../modules/notifications/routes";
import { settingsRoutes } from "../modules/settings/routes";

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
        { index: true, element: <Navigate to="/dashboard" replace /> },
        ...agentsRoutes,
        ...clientsRoutes,
        ...notificationsRoutes,
        ...settingsRoutes,
      ],
    },
    { path: "*", element: <Navigate to="/dashboard" replace /> },
  ]);
}
