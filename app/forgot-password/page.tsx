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
    <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <i className="bx bx-cube-alt text-blue-500 text-4xl"></i>
            <span className="text-3xl font-extrabold text-white">Build<span className="text-blue-500">Mate</span></span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Reset Password</h1>
          <p className="text-slate-400">We will send a reset link to your email.</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bx bx-check-circle text-4xl text-green-400"></i>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Check your inbox</h3>
              <p className="text-slate-400 text-sm">If an account exists for <strong className="text-white">{email}</strong>, you will receive a password reset link shortly.</p>
              <Link href="/login" className="mt-6 inline-block text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-300">Email Address</label>
                <input type="email" required
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder-slate-500 outline-none focus:border-blue-500/50 transition-all"
                  placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <i className="bx bx-send text-xl"></i> Send Reset Link
              </button>
              <div className="text-center">
                <Link href="/login" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
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
