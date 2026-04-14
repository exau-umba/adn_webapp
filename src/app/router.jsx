import { Navigate, useRoutes } from "react-router-dom";
import { AdminLayout } from "../layout/AdminLayout";
import { agentsRoutes } from "../modules/agents/routes";

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
      ],
    },
    { path: "*", element: <Navigate to="/dashboard" replace /> },
  ]);
}
