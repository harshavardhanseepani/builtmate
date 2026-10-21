"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type SelectedRole = "client" | "builder" | "supplier";

export default function SignupPage() {
  const [role, setRole] = useState<SelectedRole>("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationNotice, setVerificationNotice] = useState<string | null>(null);

  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if ((role === "builder" || role === "supplier") && !companyName.trim()) {
      setError(`Please enter your company / trade name for ${role === "builder" ? "contractor" : "supplier"} verification.`);
      return;
    }

    setLoading(true);

    const result = await signup({
      name,
      email,
      password,
      role,
      companyName: companyName.trim() || undefined,
      phone: phone.trim() || undefined,
      licenseNumber: licenseNumber.trim() || undefined,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      if (result.verificationUrl) {
        setVerificationNotice(result.verificationUrl);
      }
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] bg-texture-luxury flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-amber-100 selection:text-amber-900 pt-20 pb-20">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <i className="bx bx-cube-alt text-amber-600 text-4xl drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform"></i>
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Build<span className="text-gradient-gold">Mate</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-1">Create Your Account</h1>
          <p className="text-slate-600 text-sm">Select your account role and join the verified construction ecosystem.</p>
        </div>

        <div className="bg-white/95 backdrop-blur-2xl border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(212,175,55,0.08)]">
          {error && (
            <div className="mb-5 flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-sm animate-fade-in">
              <i className="bx bx-error-circle text-lg mt-0.5 shrink-0"></i>
              <span>{error}</span>
            </div>
          )}

          {verificationNotice && (
            <div className="mb-5 bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold">
                <i className="bx bx-check-circle text-emerald-600 text-base"></i>
                <span>Account Created! Verification Link Generated</span>
              </div>
              <p className="text-slate-600">
                You can verify your email anytime using the link below:
              </p>
              <a href={verificationNotice} className="block text-emerald-700 font-bold underline break-all hover:text-emerald-800">
                {verificationNotice}
              </a>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            {/* 1. ROLE SELECTION CARDS */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                Select Your Role <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    id: "client" as SelectedRole,
                    title: "Client",
                    desc: "Homeowner & Investor",
                    icon: "bx-home-alt",
                  },
                  {
                    id: "builder" as SelectedRole,
                    title: "Builder",
                    desc: "Licensed Contractor",
                    icon: "bx-hard-hat",
                  },
                  {
                    id: "supplier" as SelectedRole,
                    title: "Supplier",
                    desc: "Material Vendor",
                    icon: "bx-box",
                  },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      role === r.id
                        ? "bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/25 shadow-sm text-slate-950 font-bold"
                        : "bg-white/60 border-slate-200 text-slate-600 hover:border-amber-300 hover:bg-amber-50/30"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                      role === r.id ? "bg-amber-500 text-slate-950 shadow-xs" : "bg-slate-100 text-slate-600"
                    }`}>
                      <i className={`bx ${r.icon}`}></i>
                    </div>
                    <span className="text-xs font-black uppercase tracking-tight">{r.title}</span>
                    <span className="text-[10px] text-slate-500 leading-tight line-clamp-1">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3 px-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium text-sm"
                  placeholder="e.g. Harsha Vardhan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3 px-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Role-Specific Fields for Builders and Suppliers */}
            {(role === "builder" || role === "supplier") && (
              <div className="bg-amber-50/60 border border-amber-200/80 p-4 rounded-2xl space-y-3.5 animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <i className="bx bx-shield-quarter text-base text-amber-600"></i>
                  <span>Professional Verification Details ({role === "builder" ? "Contractor" : "Vendor"})</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold mb-1 text-slate-700">
                      Company / Firm Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white border border-amber-200 rounded-xl py-2.5 px-3 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 text-xs font-medium"
                      placeholder={role === "builder" ? "e.g. Apex Infra Constructions" : "e.g. Vardhan Cement & Steels"}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold mb-1 text-slate-700">Contact Phone Number</label>
                    <input
                      type="tel"
                      className="w-full bg-white border border-amber-200 rounded-xl py-2.5 px-3 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 text-xs font-medium"
                      placeholder="+91 98450 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold mb-1 text-slate-700">
                    License / Registration / GSTIN Number (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-amber-200 rounded-xl py-2.5 px-3 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 text-xs font-medium"
                    placeholder="e.g. GSTIN29ABCDE1234F1Z5 or Class-A PWD"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Verified builders and suppliers receive a verified trust badge on public marketplaces.
                  </p>
                </div>
              </div>
            )}

            {/* Passwords */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-700">Password</label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  minLength={6}
                  className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3 px-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium text-sm"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-700">Confirm Password</label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl py-3 px-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium text-sm"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:transform-none flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <i className="bx bx-loader-alt animate-spin text-lg"></i>
                  <span>Registering {role}...</span>
                </>
              ) : (
                <>
                  <i className="bx bx-user-plus text-lg"></i>
                  <span>Register as {role === "client" ? "Client" : role === "builder" ? "Verified Builder" : "Material Supplier"}</span>
                </>
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
