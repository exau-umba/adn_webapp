import { NotificationDetailPage } from "./pages/NotificationDetailPage";
import { NotificationsPage } from "./pages/NotificationsPage";

export const notificationsRoutes = [
  { path: "notifications/detail/:notificationId", element: <NotificationDetailPage /> },
  { path: "notifications", element: <NotificationsPage /> },
];
