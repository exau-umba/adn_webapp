import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiLogin, apiMe, apiRefresh } from "./authApi.ts";
import {
  clearAuthTokens,
  getStoredAccessToken,
  getStoredRefreshToken,
  persistTokens,
} from "./authStorage.ts";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const applySession = useCallback(async (access, refresh) => {
    persistTokens(access, refresh);
    const me = await apiMe(access);
    setUser(me);
    return me;
  }, []);

  const bootstrap = useCallback(async () => {
    const access = getStoredAccessToken();
    const refresh = getStoredRefreshToken();
    if (!access || !refresh) {
      setUser(null);
      setIsReady(true);
      return;
    }
    try {
      const me = await apiMe(access);
      setUser(me);
    } catch {
      try {
        const { access: nextAccess } = await apiRefresh(refresh);
        persistTokens(nextAccess, refresh);
        const me = await apiMe(nextAccess);
        setUser(me);
      } catch {
        clearAuthTokens();
        setUser(null);
      }
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  const login = useCallback(
    async (username, password) => {
      const { access, refresh } = await apiLogin(username, password);
      await applySession(access, refresh);
    },
    [applySession],
  );

  const logout = useCallback(() => {
    clearAuthTokens();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user),
      login,
      logout,
      refreshSession: bootstrap,
    }),
    [user, isReady, login, logout, bootstrap],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return ctx;
}
