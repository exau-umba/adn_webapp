import { UsersManagementPage } from "./pages/UsersManagementPage";
import { RolesManagementPage } from "./pages/RolesManagementPage";
import { UserRegistrationPage } from "./pages/UserRegistrationPage";
import { UserEditPage } from "./pages/UserEditPage";
import { RequireUserAdmin } from "./components/RequireUserAdmin.jsx";

export const userRoutes = [
  {
    path: "user-management",
    element: (
      <RequireUserAdmin>
        <UsersManagementPage />
      </RequireUserAdmin>
    ),
  },
  {
    path: "user-management/roles",
    element: (
      <RequireUserAdmin>
        <RolesManagementPage />
      </RequireUserAdmin>
    ),
  },
  {
    path: "user-management/registration",
    element: (
      <RequireUserAdmin>
        <UserRegistrationPage />
      </RequireUserAdmin>
    ),
  },
  {
    path: "user-management/edit/:userId",
    element: (
      <RequireUserAdmin>
        <UserEditPage />
      </RequireUserAdmin>
    ),
  },
];
