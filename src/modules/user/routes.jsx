import { UsersManagementPage } from "./pages/UsersManagementPage";
import { RolesManagementPage } from "./pages/RolesManagementPage";
import { UserRegistrationPage } from "./pages/UserRegistrationPage";
import { UserEditPage } from "./pages/UserEditPage";

export const userRoutes = [
  { path: "user-management", element: <UsersManagementPage /> },
  { path: "user-management/roles", element: <RolesManagementPage /> },
  { path: "user-management/registration", element: <UserRegistrationPage /> },
  { path: "user-management/edit/:userId", element: <UserEditPage /> },
];
