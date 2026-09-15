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
    <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <i className="bx bx-cube-alt text-blue-500 text-4xl"></i>
            <span className="text-3xl font-extrabold text-white">Build<span className="text-blue-500">Mate</span></span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Create Your Account</h1>
          <p className="text-slate-400">Start your construction journey today.</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm">
              <i className="bx bx-error-circle text-lg mt-0.5"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-300">Full Name</label>
              <input type="text" required autoComplete="name"
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                placeholder="Harsha Vardhan" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-300">Email Address</label>
              <input type="email" required autoComplete="email"
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-300">Password</label>
              <input type="password" required autoComplete="new-password" minLength={6}
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-300">Confirm Password</label>
              <input type="password" required autoComplete="new-password"
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:transform-none flex items-center justify-center gap-2">
              {loading ? (
                <><i className="bx bx-loader-alt animate-spin text-xl"></i> Creating Account...</>
              ) : (
                <><i className="bx bx-user-plus text-xl"></i> Create Account</>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
