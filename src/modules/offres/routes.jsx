import { OffresManagementPage } from "./pages/OffresManagementPage";
import { OffreRegistrationPage } from "./pages/OffreRegistrationPage";
import { OffreDetailsPage } from "./pages/OffreDetailsPage";
import { OffreEditPage } from "./pages/OffreEditPage";

export const offresRoutes = [
  { path: "offres-emploi", element: <OffresManagementPage /> },
  { path: "offres-emploi/registration", element: <OffreRegistrationPage /> },
  { path: "offres-emploi/detail/:offreId", element: <OffreDetailsPage /> },
  { path: "offres-emploi/detail/:offreId/edit", element: <OffreEditPage /> },
];
