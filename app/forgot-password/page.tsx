"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to process request.");
      } else {
        setSubmitted(true);
        if (data.resetUrl) {
          setDevResetUrl(data.resetUrl);
        }
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] bg-texture-luxury flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-amber-100 selection:text-amber-900">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <i className="bx bx-cube-alt text-amber-600 text-4xl drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform"></i>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Build<span className="text-gradient-gold">Mate</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-1">Reset Password</h1>
          <p className="text-slate-600 text-sm">Enter your registered email address to receive password reset instructions.</p>
        </div>

        <div className="bg-white/95 backdrop-blur-2xl border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(212,175,55,0.08)]">
          {error && (
            <div className="mb-5 flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-sm">
              <i className="bx bx-error-circle text-lg mt-0.5 shrink-0"></i>
              <span>{error}</span>
            </div>
          )}

          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                <i className="bx bx-check-circle text-4xl text-amber-600"></i>
              </div>
              <h3 className="text-slate-900 font-bold text-lg">Check your inbox</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                If an account exists for <strong className="text-slate-900">{email}</strong>, password reset instructions have been issued.
              </p>

              {devResetUrl && (
                <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-left space-y-2 mt-4">
                  <p className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                    <i className="bx bx-link-external text-amber-700"></i> Direct Reset Link:
                  </p>
                  <a
                    href={devResetUrl}
                    className="block text-xs font-bold text-amber-900 underline break-all hover:text-amber-950"
                  >
                    {devResetUrl}
                  </a>
                </div>
              )}

              <Link
                href="/login"
                className="mt-4 inline-block text-amber-700 hover:text-amber-800 font-bold text-sm transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-700 uppercase tracking-wide">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3 px-4 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <i className="bx bx-send text-lg"></i>
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <Link href="/login" className="text-amber-700 hover:text-amber-800 text-xs font-bold transition-colors">
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
