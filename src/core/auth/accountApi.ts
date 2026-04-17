import { authFetch } from "./authFetch.ts";
import type { ApiUser } from "./authApi.ts";
import { getApiBaseUrl } from "./authStorage.ts";

function joinUrl(path: string) {
  const base = getApiBaseUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

async function parseJsonError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as Record<string, unknown>;
    const detail = body.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail.length && typeof detail[0] === "string") return detail[0];
    const nonField = body.non_field_errors;
    if (Array.isArray(nonField) && nonField.length && typeof nonField[0] === "string") return nonField[0];
    for (const [key, val] of Object.entries(body)) {
      if (key === "detail") continue;
      if (Array.isArray(val) && val.length && typeof val[0] === "string") return `${key}: ${val[0]}`;
      if (typeof val === "string") return `${key}: ${val}`;
    }
    if (typeof body.message === "string") return body.message;
  } catch {
    /* ignore */
  }
  return `Erreur ${res.status}`;
}

export async function apiPatchMeProfile(data: Record<string, unknown> | FormData): Promise<ApiUser> {
  const init: RequestInit = { method: "PATCH" };
  if (data instanceof FormData) {
    init.body = data;
  } else {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(data);
  }
  const res = await authFetch(joinUrl("/api/users/auth/me/"), init);
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<ApiUser>;
}

export async function apiChangePassword(currentPassword: string, newPassword: string): Promise<void> {
  const res = await authFetch(joinUrl("/api/users/auth/change-password/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
  if (!res.ok) throw new Error(await parseJsonError(res));
}
