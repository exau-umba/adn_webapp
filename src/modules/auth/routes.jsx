import { LoginPage } from "./pages/LoginPage.jsx";
import { ActivateAccountPage } from "./pages/ActivateAccountPage.jsx";
import { SetupPasswordPage } from "./pages/SetupPasswordPage.jsx";

export const authRoutes = [
  { path: "login", element: <LoginPage /> },
  { path: "activate-account", element: <ActivateAccountPage /> },
  { path: "setup-password", element: <SetupPasswordPage /> },
];
