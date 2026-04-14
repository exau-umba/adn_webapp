import { Navigate } from "react-router-dom";
import { AgentsRegistrationPage } from "./pages/AgentsRegistrationPage";
import { AgentsManagementPage } from "./pages/AgentsManagementPage";
import { AgentsEvaluationPage } from "./pages/AgentsEvaluationPage";
import { AgentDetailsPage } from "./pages/AgentDetailsPage";
import { AgentEditPage } from "./pages/AgentEditPage";
import { AgentEmployeurContratPage } from "./pages/AgentEmployeurContratPage";

export const agentsRoutes = [
  {
    path: "agent-management",
    children: [
      { index: true, element: <AgentsManagementPage /> },
      { path: "registration", element: <AgentsRegistrationPage /> },
      { path: "evaluation", element: <AgentsEvaluationPage /> },
      { path: "detail/:agentId/contrat-employeur", element: <AgentEmployeurContratPage /> },
      { path: "detail/:agentId", element: <AgentDetailsPage /> },
      { path: "detail/:agentId/edit", element: <AgentEditPage /> },
    ],
  },
  { path: "management", element: <Navigate to="/agent-management" replace /> },
  { path: "registration", element: <Navigate to="/agent-management/registration" replace /> },
  { path: "evaluation", element: <Navigate to="/agent-management/evaluation" replace /> },
];
