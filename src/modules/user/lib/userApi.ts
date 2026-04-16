import { authFetch } from "../../../core/auth/authFetch.ts";
import { getApiBaseUrl } from "../../../core/auth/authStorage.ts";

export type ApiRole = {
  id: string;
  code: string;
  label: string;
  description: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
};

export type ApiAccount = {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login: string | null;
  updated_at: string;
  roles: ApiRole[];
};

type Page<T> = { count: number; next: string | null; previous: string | null; results: T[] };

function joinUrl(path: string) {
  const base = getApiBaseUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function withParams(path: string, params: Record<string, string | number | undefined>) {
  const url = new URL(joinUrl(path), "http://placeholder.local");
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "") continue;
    url.searchParams.set(k, String(v));
  }
  // remove placeholder origin
  return `${url.pathname}${url.search}`.replace(/^\//, "/");
}

async function parseJsonError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as Record<string, unknown>;
    const detail = body.detail;
    if (typeof detail === "string") return detail;
    if (typeof body.message === "string") return body.message;
    return JSON.stringify(body);
  } catch {
    return `Erreur ${res.status}`;
  }
}

export async function listRoles(opts: { page?: number; pageSize?: number; search?: string } = {}): Promise<Page<ApiRole>> {
  const res = await authFetch(joinUrl(withParams("/api/users/roles/", { page: opts.page, page_size: opts.pageSize, search: opts.search })));
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<Page<ApiRole>>;
}

export async function createRole(payload: { code: string; label: string; description?: string; permissions?: string[] }): Promise<ApiRole> {
  const res = await authFetch(joinUrl("/api/users/roles/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<ApiRole>;
}

export async function updateRole(
  roleId: string,
  payload: { code: string; label: string; description?: string; permissions?: string[] },
): Promise<ApiRole> {
  const res = await authFetch(joinUrl(`/api/users/roles/${roleId}/`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<ApiRole>;
}

export async function deleteRole(roleId: string): Promise<void> {
  const res = await authFetch(joinUrl(`/api/users/roles/${roleId}/`), { method: "DELETE" });
  if (!res.ok) throw new Error(await parseJsonError(res));
}

export async function listAccounts(
  opts: { page?: number; pageSize?: number; search?: string } = {},
): Promise<Page<ApiAccount>> {
  const res = await authFetch(
    joinUrl(withParams("/api/users/accounts/", { page: opts.page, page_size: opts.pageSize, search: opts.search })),
  );
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<Page<ApiAccount>>;
}

export async function getAccount(accountId: string): Promise<ApiAccount> {
  const res = await authFetch(joinUrl(`/api/users/accounts/${accountId}/`));
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<ApiAccount>;
}

export async function assignAccountRoles(accountId: string, roleCodes: string[]): Promise<ApiAccount> {
  const res = await authFetch(joinUrl(`/api/users/accounts/${accountId}/assign-roles/`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role_codes: roleCodes }),
  });
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<ApiAccount>;
}

export async function patchAccount(
  accountId: string,
  payload: Partial<{
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    is_active: boolean;
  }>,
): Promise<ApiAccount> {
  const res = await authFetch(joinUrl(`/api/users/accounts/${accountId}/`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<ApiAccount>;
}

export async function adminRegisterUser(payload: {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  password: string;
}): Promise<{ user: ApiAccount; access: string; refresh: string }> {
  // Endpoint AllowAny côté backend, mais UI protégée admin.
  const res = await authFetch(joinUrl("/api/users/auth/register/"), {
    method: "POST",
    skipAuth: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await parseJsonError(res));
  return res.json() as Promise<{ user: ApiAccount; access: string; refresh: string }>;
}

