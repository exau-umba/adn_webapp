import { ClientsManagementPage } from "./pages/ClientsManagementPage";
import { ClientDetailsPage } from "./pages/ClientDetailsPage";
import { ClientEditPage } from "./pages/ClientEditPage";

export const clientsRoutes = [
  { path: "client-management", element: <ClientsManagementPage /> },
  { path: "client-management/detail/:clientId", element: <ClientDetailsPage /> },
  { path: "client-management/detail/:clientId/edit", element: <ClientEditPage /> },
];
