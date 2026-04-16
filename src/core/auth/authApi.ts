import { getApiBaseUrl } from "./authStorage.ts";

export type ApiUser = {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  roles: { id: string; code: string; label: string; description: string }[];
};

type TokenPairResponse = {
  access: string;
  refresh: string;
};

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
    if (typeof body.message === "string") return body.message;
  } catch {
    /* ignore */
  }
  return `Erreur ${res.status}`;
}

export async function apiLogin(username: string, password: string): Promise<TokenPairResponse> {
  const res = await fetch(joinUrl("/api/users/auth/login/"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<TokenPairResponse>;
}

export async function apiRefresh(refreshToken: string): Promise<{ access: string }> {
  const res = await fetch(joinUrl("/api/users/auth/refresh/"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<{ access: string }>;
}

export async function apiMe(accessToken: string): Promise<ApiUser> {
  const res = await fetch(joinUrl("/api/users/auth/me/"), {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<ApiUser>;
}
