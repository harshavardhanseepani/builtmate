"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "client" | "builder" | "supplier" | "admin";
export type AccountStatus = "active" | "pending_verification" | "suspended";

export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  requestedRole?: UserRole;
  status: AccountStatus;
  isEmailVerified: boolean;
  phone?: string;
  companyName?: string;
  location?: string;
  licenseNumber?: string;
  createdAt?: string;
}

interface SignupParams {
  email: string;
  password: string;
  name: string;
  role: "client" | "builder" | "supplier";
  companyName?: string;
  phone?: string;
  licenseNumber?: string;
  location?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string; user?: AuthUser }>;
  signup: (params: SignupParams) => Promise<{ error?: string; user?: AuthUser; verificationUrl?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  requestRoleUpgrade: (targetRole: "builder" | "supplier", details?: { companyName?: string; licenseNumber?: string; phone?: string }) => Promise<{ success?: boolean; error?: string }>;
  resendVerificationEmail: () => Promise<{ success?: boolean; error?: string; verificationUrl?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user ?? null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || "Login failed." };
      setUser(data.user);
      return { user: data.user };
    } catch (err: any) {
      return { error: err.message || "An unexpected network error occurred." };
    }
  };

  const signup = async (params: SignupParams) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || "Signup failed." };
      setUser(data.user);
      return { user: data.user, verificationUrl: data.verificationUrl };
    } catch (err: any) {
      return { error: err.message || "An unexpected network error occurred." };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    setUser(null);
    router.push("/");
  };

  const requestRoleUpgrade = async (targetRole: "builder" | "supplier", details?: { companyName?: string; licenseNumber?: string; phone?: string }) => {
    try {
      const res = await fetch("/api/auth/role-upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ targetRole, ...details }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || "Failed to submit upgrade request." };
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { error: err.message || "Network error submitting upgrade request." };
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || "Failed to generate verification." };
      return { success: true, verificationUrl: data.verificationUrl };
    } catch (err: any) {
      return { error: err.message || "Network error." };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refresh, requestRoleUpgrade, resendVerificationEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
