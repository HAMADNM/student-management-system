import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const ACCESS_KEY = "student_mgmt_access_token";
const REFRESH_KEY = "student_mgmt_refresh_token";
const USER_KEY = "student_mgmt_user";

function getStoredToken() {
  return localStorage.getItem(ACCESS_KEY);
}

function getStoredRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(getStoredToken());
  const [refreshToken, setRefreshToken] = useState(getStoredRefreshToken());
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    if (authToken) localStorage.setItem(ACCESS_KEY, authToken);
    else localStorage.removeItem(ACCESS_KEY);
  }, [authToken]);

  useEffect(() => {
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
    else localStorage.removeItem(REFRESH_KEY);
  }, [refreshToken]);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const login = useCallback((payload) => {
    setAuthToken(payload.access);
    setRefreshToken(payload.refresh);
    setUser({
      id: payload.id,
      username: payload.username,
      email: payload.email,
    });
  }, []);

  const clearSession = useCallback(() => {
    setAuthToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return null;

    const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      clearSession();
      return null;
    }

    const payload = await response.json();
    setAuthToken(payload.access);
    return payload.access;
  }, [clearSession, refreshToken]);

  const authenticatedFetch = useCallback(
    async (url, options = {}) => {
      const headers = {
        ...(options.headers || {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      };

      let response = await fetch(url, { ...options, headers });
      if (response.status !== 401) return response;

      const nextToken = await refreshAccessToken();
      if (!nextToken) return response;

      return fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${nextToken}`,
        },
      });
    },
    [authToken, refreshAccessToken],
  );

  const logout = useCallback(async () => {
    if (refreshToken && authToken) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
      } catch {
        // Local logout should still succeed when the backend is unavailable.
      }
    }

    clearSession();
  }, [authToken, clearSession, refreshToken]);

  const authHeaders = useMemo(
    () => (authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    [authToken],
  );

  const value = useMemo(
    () => ({
      authToken,
      refreshToken,
      user,
      login,
      logout,
      clearSession,
      authenticatedFetch,
      authHeaders,
      API_BASE_URL,
    }),
    [authHeaders, authToken, authenticatedFetch, clearSession, login, logout, refreshToken, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
