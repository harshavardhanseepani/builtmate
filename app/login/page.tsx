"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = () => {
    setError("Google OAuth is enabled. Ensure GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET are configured in your production environment variables.");
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] bg-texture-luxury flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-amber-100 selection:text-amber-900">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <i className="bx bx-cube-alt text-amber-600 text-4xl drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform"></i>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Build<span className="text-gradient-gold">Mate</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-1">Welcome Back</h1>
          <p className="text-slate-600 text-sm">Sign in to access your Client, Builder, or Supplier dashboard.</p>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-2xl border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(212,175,55,0.08)]">
          {error && (
            <div className="mb-5 flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-sm animate-fade-in">
              <i className="bx bx-error-circle text-lg mt-0.5 shrink-0"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 uppercase tracking-wide">
                Registered Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3 px-4 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
                <Link href="/forgot-password" className="text-xs text-amber-700 hover:text-amber-800 font-semibold transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                autoComplete="current-password"
                className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3 px-4 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:transform-none flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <i className="bx bx-loader-alt animate-spin text-lg"></i>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <i className="bx bx-log-in text-lg"></i>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-slate-200" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
            <div className="flex-1 h-[1px] bg-slate-200" />
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="bx bxl-google text-lg text-rose-500"></i>
            <span>Google Account</span>
          </button>

          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-amber-700 hover:text-amber-800 font-bold transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
