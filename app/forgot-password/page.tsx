"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] bg-texture-luxury flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-amber-100 selection:text-amber-900">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <i className="bx bx-cube-alt text-amber-600 text-4xl drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform"></i>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Build<span className="text-gradient-gold">Mate</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Reset Password</h1>
          <p className="text-slate-600">We will send a reset link to your email.</p>
        </div>

        <div className="bg-white/90 backdrop-blur-2xl border border-amber-200/80 rounded-3xl p-8 shadow-[0_20px_50px_rgba(212,175,55,0.08)]">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <i className="bx bx-check-circle text-4xl text-amber-600"></i>
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Check your inbox</h3>
              <p className="text-slate-600 text-sm">If an account exists for <strong className="text-slate-900">{email}</strong>, you will receive a password reset link shortly.</p>
              <Link href="/login" className="mt-6 inline-block text-amber-700 hover:text-amber-800 font-bold text-sm transition-colors">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700">Email Address</label>
                <input type="email" required
                  className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3.5 px-4 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                  placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer">
                <i className="bx bx-send text-xl"></i> Send Reset Link
              </button>
              <div className="text-center">
                <Link href="/login" className="text-amber-700 hover:text-amber-800 text-sm font-semibold transition-colors">
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
