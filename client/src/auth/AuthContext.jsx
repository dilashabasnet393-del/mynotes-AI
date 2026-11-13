import { useCallback, useEffect, useState } from "react";
import api from "../api";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
      return data.user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    api.get("/auth/me").then(({ data }) => {
      if (active) setUser(data.user);
    }).catch(() => {
      if (active) setUser(null);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const value = {
    user,
    loading,
    refreshUser,
    async login(credentials) {
      const { data } = await api.post("/auth/login", credentials);
      setUser(data.user);
      return data.user;
    },
    async signup(details) {
      const { data } = await api.post("/auth/signup", details);
      setUser(data.user);
      return data.user;
    },
    async logout() {
      try { await api.post("/auth/logout"); } finally { setUser(null); }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
