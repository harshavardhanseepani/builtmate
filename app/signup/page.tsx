"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await signup(email, password, name);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] bg-texture-luxury flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-amber-100 selection:text-amber-900">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <i className="bx bx-cube-alt text-amber-600 text-4xl drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform"></i>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Build<span className="text-gradient-gold">Mate</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Create Your Account</h1>
          <p className="text-slate-600">Start your construction journey today.</p>
        </div>

        <div className="bg-white/90 backdrop-blur-2xl border border-amber-200/80 rounded-3xl p-8 shadow-[0_20px_50px_rgba(212,175,55,0.08)]">
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-sm">
              <i className="bx bx-error-circle text-lg mt-0.5"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Full Name</label>
              <input type="text" required autoComplete="name"
                className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3.5 px-4 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                placeholder="Harsha Vardhan" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Email Address</label>
              <input type="email" required autoComplete="email"
                className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3.5 px-4 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Password</label>
              <input type="password" required autoComplete="new-password" minLength={6}
                className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3.5 px-4 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Confirm Password</label>
              <input type="password" required autoComplete="new-password"
                className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3.5 px-4 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:transform-none flex items-center justify-center gap-2 cursor-pointer">
              {loading ? (
                <><i className="bx bx-loader-alt animate-spin text-xl"></i> Creating Account...</>
              ) : (
                <><i className="bx bx-user-plus text-xl"></i> Create Account</>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-amber-700 hover:text-amber-800 font-bold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
