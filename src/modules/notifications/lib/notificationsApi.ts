import { authFetch } from "../../../core/auth/authFetch.ts";
import { getApiBaseUrl } from "../../../core/auth/authStorage.ts";

function joinUrl(path: string) {
  const base = getApiBaseUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

async function parseJsonError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as Record<string, unknown>;
    if (typeof body.detail === "string") return body.detail;
  } catch {
    /* ignore */
  }
  return `Erreur ${res.status}`;
}

export type InAppNotification = {
  id: string;
  title: string;
  body: string;
  category: string;
  read: boolean;
  read_at: string | null;
  created_at: string;
};

export type NotificationsPageResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: InAppNotification[];
};

export async function fetchNotificationsPage(page: number, pageSize: number): Promise<NotificationsPageResponse> {
  const url = new URL(joinUrl("/api/users/notifications/"));
  url.searchParams.set("page", String(page));
  url.searchParams.set("page_size", String(pageSize));
  const res = await authFetch(url.toString());
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<NotificationsPageResponse>;
}

export async function fetchNotification(id: string): Promise<InAppNotification> {
  const res = await authFetch(joinUrl(`/api/users/notifications/${id}/`));
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<InAppNotification>;
}

export async function fetchUnreadNotificationsCount(): Promise<number> {
  const res = await authFetch(joinUrl("/api/users/notifications/unread-count/"));
  if (!res.ok) throw new Error(await parseJsonError(res));
  const data = (await res.json()) as { count?: number };
  return typeof data.count === "number" ? data.count : 0;
}

export async function markNotificationRead(id: string): Promise<InAppNotification> {
  const res = await authFetch(joinUrl(`/api/users/notifications/${id}/mark-read/`), { method: "POST" });
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<InAppNotification>;
}

export async function markAllNotificationsRead(): Promise<void> {
  const res = await authFetch(joinUrl("/api/users/notifications/mark-all-read/"), { method: "POST" });
  if (!res.ok) throw new Error(await parseJsonError(res));
}

export function notifyNotificationsUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("adn-notifications-updated"));
  }
}
