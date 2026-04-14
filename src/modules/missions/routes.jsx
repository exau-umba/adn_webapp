import { MissionsManagementPage } from "./pages/MissionsManagementPage";
import { MissionRegistrationPage } from "./pages/MissionRegistrationPage";
import { MissionDetailsPage } from "./pages/MissionDetailsPage";
import { MissionEditPage } from "./pages/MissionEditPage";

export const missionsRoutes = [
  { path: "mission-management", element: <MissionsManagementPage /> },
  { path: "mission-management/registration", element: <MissionRegistrationPage /> },
  { path: "mission-management/detail/:missionId", element: <MissionDetailsPage /> },
  { path: "mission-management/detail/:missionId/edit", element: <MissionEditPage /> },
];
