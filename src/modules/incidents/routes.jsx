import { IncidentsPage } from "./pages/IncidentsPage";
import { IncidentOpenPage } from "./pages/IncidentOpenPage";
import { IncidentDetailPage } from "./pages/IncidentDetailPage";

export const incidentsRoutes = [
  { path: "incidents", element: <IncidentsPage /> },
  { path: "incidents/ouvrir", element: <IncidentOpenPage /> },
  { path: "incidents/detail/:incidentId", element: <IncidentDetailPage /> },
];
