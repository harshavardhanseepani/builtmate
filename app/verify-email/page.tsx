"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email address...");
  const { refresh } = useAuth();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing. Please check the link in your email.");
      return;
    }

    const runVerification = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Email address confirmed successfully!");
          await refresh();
        } else {
          setStatus("error");
          setMessage(data.error || "Verification link is invalid or has expired.");
        }
      } catch {
        setStatus("error");
        setMessage("Network error verifying email.");
      }
    };

    runVerification();
  }, [token, refresh]);

  return (
    <div className="bg-white/95 backdrop-blur-2xl border border-amber-200/80 rounded-3xl p-8 shadow-[0_20px_50px_rgba(212,175,55,0.08)] text-center space-y-4">
      {status === "loading" && (
        <div className="py-6 space-y-3">
          <i className="bx bx-loader-alt animate-spin text-5xl text-amber-600"></i>
          <h2 className="text-lg font-bold text-slate-800">Verifying Email...</h2>
          <p className="text-xs text-slate-500">{message}</p>
        </div>
      )}

      {status === "success" && (
        <div className="py-4 space-y-4">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
            <i className="bx bx-check-shield text-4xl text-emerald-600"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Email Verified!</h2>
          <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md"
            >
              Go to Workspace Dashboard
            </Link>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="py-4 space-y-4">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto border border-rose-300">
            <i className="bx bx-x-circle text-4xl text-rose-600"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Verification Issue</h2>
          <p className="text-xs text-rose-700 leading-relaxed">{message}</p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl"
            >
              Return to Dashboard
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
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
        </div>

        <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading verification...</div>}>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </main>
  );
}
