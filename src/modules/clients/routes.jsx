import { ClientsManagementPage } from "./pages/ClientsManagementPage";
import { ClientDetailsPage } from "./pages/ClientDetailsPage";
import { ClientEditPage } from "./pages/ClientEditPage";
import { ClientRegistrationPage } from "./pages/ClientRegistrationPage";

export const clientsRoutes = [
  { path: "client-management", element: <ClientsManagementPage /> },
  { path: "client-management/registration", element: <ClientRegistrationPage /> },
  { path: "client-management/detail/:clientId", element: <ClientDetailsPage /> },
  { path: "client-management/detail/:clientId/edit", element: <ClientEditPage /> },
];
