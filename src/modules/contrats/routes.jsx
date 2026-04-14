import { ContratsManagementPage } from "./pages/ContratsManagementPage";
import { ContratBundleDetailPage } from "./pages/ContratBundleDetailPage";

export const contratsRoutes = [
  { path: "contrat-management", element: <ContratsManagementPage /> },
  { path: "contrat-management/detail/:bundleId", element: <ContratBundleDetailPage /> },
];
