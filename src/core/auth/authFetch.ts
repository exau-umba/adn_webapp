import { apiRefresh } from "./authApi.ts";
import { getStoredAccessToken, getStoredRefreshToken, persistTokens } from "./authStorage.ts";

type AuthFetchOptions = RequestInit & { skipAuth?: boolean };

export async function authFetch(input: string, init: AuthFetchOptions = {}): Promise<Response> {
  const { skipAuth, headers, ...rest } = init;
  const access = getStoredAccessToken();
  const refresh = getStoredRefreshToken();

  const doFetch = (token: string | null) => {
    const nextHeaders = new Headers(headers ?? {});
    if (!skipAuth && token) nextHeaders.set("Authorization", `Bearer ${token}`);
    if (!nextHeaders.has("Accept")) nextHeaders.set("Accept", "application/json");
    return fetch(input, { ...rest, headers: nextHeaders });
  };

  let res = await doFetch(access);
  if (skipAuth) return res;
  if (res.status !== 401 || !refresh) return res;

  try {
    const { access: nextAccess } = await apiRefresh(refresh);
    persistTokens(nextAccess, refresh);
    res = await doFetch(nextAccess);
    return res;
  } catch {
    return res;
  }
}

