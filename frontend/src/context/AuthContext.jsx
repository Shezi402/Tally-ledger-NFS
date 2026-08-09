import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";

/*
 * AuthContext — global auth state.
 *
 * Week 2 built login/signup/logout as a flow that passed `user` and
 * `setUser` down through props (Navbar, ProtectedRoute, Dashboard all
 * needed them). That's the prop-drilling this refactor removes: any
 * component can now call useAuth() directly instead of receiving auth
 * data as props from its parent.
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // checking existing session
  const [actionLoading, setActionLoading] = useState(false); // login/register in flight

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("tally_token");
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
      } catch {
        localStorage.removeItem("tally_token");
      } finally {
        setAuthLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (email, password) => {
    setActionLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("tally_token", data.token);
      setUser(data);
      toast.success(`Welcome back, ${data.name.split(" ")[0]}`);
      return { ok: true };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Try again.";
      toast.error(message);
      return { ok: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setActionLoading(true);
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("tally_token", data.token);
      setUser(data);
      toast.success(`Account created — welcome, ${data.name.split(" ")[0]}`);
      return { ok: true };
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed. Try again.";
      toast.error(message);
      return { ok: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("tally_token");
    setUser(null);
    toast.success("Signed out");
  };

  return (
    <AuthContext.Provider
      value={{ user, authLoading, actionLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
