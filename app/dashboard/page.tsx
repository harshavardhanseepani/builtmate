"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth, UserRole } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading, logout, resendVerificationEmail, requestRoleUpgrade } = useAuth();
  const router = useRouter();

  // Admin state
  const [adminData, setAdminData] = useState<{ pending: any[]; totalUsers: number; users: any[] } | null>(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState<string | null>(null);

  // Upgrade modal state
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeTargetRole, setUpgradeTargetRole] = useState<"builder" | "supplier">("builder");
  const [upgradeCompany, setUpgradeCompany] = useState("");
  const [upgradePhone, setUpgradePhone] = useState("");
  const [upgradeLicense, setUpgradeLicense] = useState("");
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState<string | null>(null);

  // Email verification resend state
  const [resendLoading, setResendLoading] = useState(false);
  const [resendUrl, setResendUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch admin queue if role is admin
  const fetchAdminData = useCallback(async () => {
    if (user?.role !== "admin") return;
    setAdminLoading(true);
    try {
      const res = await fetch("/api/auth/admin/approvals", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setAdminData(data);
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setAdminLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAdminData();
    }
  }, [user, fetchAdminData]);

  const handleAdminDecision = async (targetUid: string, approve: boolean) => {
    try {
      const res = await fetch("/api/auth/admin/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ targetUid, approve }),
      });
      const data = await res.json();
      if (res.ok) {
        setAdminMessage(data.message || (approve ? "Application approved!" : "Application rejected."));
        fetchAdminData();
        setTimeout(() => setAdminMessage(null), 4000);
      } else {
        alert(data.error || "Decision failed.");
      }
    } catch {
      alert("Network error.");
    }
  };

  const handleUpgradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpgradeLoading(true);
    setUpgradeMessage(null);
    const result = await requestRoleUpgrade(upgradeTargetRole, {
      companyName: upgradeCompany,
      phone: upgradePhone,
      licenseNumber: upgradeLicense,
    });
    setUpgradeLoading(false);
    if (result.success) {
      setUpgradeMessage("Your role upgrade application was submitted for verification!");
      setTimeout(() => {
        setUpgradeModalOpen(false);
        setUpgradeMessage(null);
      }, 2500);
    } else {
      setUpgradeMessage(result.error || "Failed to submit upgrade application.");
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    const res = await resendVerificationEmail();
    setResendLoading(false);
    if (res.verificationUrl) {
      setResendUrl(res.verificationUrl);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <Navbar />
        <div className="flex flex-col items-center gap-3">
          <i className="bx bx-loader-alt animate-spin text-5xl text-amber-600"></i>
          <p className="text-slate-600 font-bold text-sm">Loading your verified workspace...</p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  const roleBadgeMap: Record<UserRole, { label: string; badgeClass: string; icon: string }> = {
    client: { label: "Client", badgeClass: "bg-blue-100 text-blue-900 border-blue-300", icon: "bx-home-heart" },
    builder: {
      label: user.status === "active" ? "Verified Builder" : "Builder (Pending Verification)",
      badgeClass: user.status === "active" ? "bg-emerald-100 text-emerald-950 border-emerald-300" : "bg-amber-100 text-amber-950 border-amber-300",
      icon: "bx-hard-hat"
    },
    supplier: {
      label: user.status === "active" ? "Verified Supplier" : "Supplier (Pending Verification)",
      badgeClass: user.status === "active" ? "bg-emerald-100 text-emerald-950 border-emerald-300" : "bg-amber-100 text-amber-950 border-amber-300",
      icon: "bx-box"
    },
    admin: { label: "Platform Administrator", badgeClass: "bg-purple-100 text-purple-950 border-purple-300", icon: "bx-crown" }
  };

  const currentBadge = roleBadgeMap[user.role] || roleBadgeMap.client;

  return (
    <main className="min-h-screen bg-[#faf9f6] bg-texture-luxury text-slate-900 pt-28 pb-20 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. TOP HEADER & PROFILE BANNER */}
        <div className="bg-white/95 backdrop-blur-2xl border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-md mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-slate-950 flex items-center justify-center text-3xl font-black shadow-md shrink-0">
                <i className={`bx ${currentBadge.icon}`}></i>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {user.name}
                  </h1>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${currentBadge.badgeClass}`}>
                    <i className={`bx ${currentBadge.icon}`}></i>
                    {currentBadge.label}
                  </span>
                  {user.isEmailVerified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <i className="bx bxs-check-circle text-emerald-600"></i> Email Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                      <i className="bx bx-time-five text-amber-600"></i> Unverified Email
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 flex items-center gap-3">
                  <span><i className="bx bx-envelope mr-1 text-amber-600"></i> {user.email}</span>
                  {user.companyName && <span><i className="bx bx-buildings mr-1 text-amber-600"></i> {user.companyName}</span>}
                  {user.phone && <span><i className="bx bx-phone mr-1 text-amber-600"></i> {user.phone}</span>}
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              {user.role === "client" && (
                <button
                  type="button"
                  onClick={() => setUpgradeModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl border border-amber-300 hover:border-amber-400 bg-amber-50/70 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <i className="bx bx-up-arrow-circle text-base text-amber-700"></i>
                  <span>Request Role Upgrade</span>
                </button>
              )}
              <Link
                href="/design"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
              >
                <i className="bx bx-plus text-base"></i> New AI Design
              </Link>
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <i className="bx bx-log-out text-base"></i> Log Out
              </button>
            </div>
          </div>

          {/* Email Verification Banner */}
          {!user.isEmailVerified && (
            <div className="mt-5 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
              <div className="flex items-center gap-2">
                <i className="bx bx-info-circle text-lg text-amber-700 shrink-0"></i>
                <span>Your email address <strong>{user.email}</strong> is unconfirmed. Verify your email to secure full account privileges.</span>
              </div>
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-all text-xs shrink-0 cursor-pointer"
              >
                {resendLoading ? "Generating..." : "Verify Email"}
              </button>
            </div>
          )}

          {resendUrl && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <i className="bx bx-link-external text-emerald-600"></i> Direct Email Verification Link:
              </span>
              <a href={resendUrl} className="block text-emerald-800 underline font-mono text-[11px] break-all">
                {resendUrl}
              </a>
            </div>
          )}
        </div>

        {/* 2. ROLE-SPECIFIC DASHBOARD SECTIONS */}

        {/* ============================================================== */}
        {/* A. CLIENT DASHBOARD */}
        {/* ============================================================== */}
        {user.role === "client" && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "AI Blueprints", value: "3", sub: "Saved Models", icon: "bx-cube-alt", color: "amber" },
                { label: "Renovations", value: "2", sub: "Comparisons", icon: "bx-paint-roll", color: "yellow" },
                { label: "Connected Builders", value: "4", sub: "In Discussions", icon: "bx-hard-hat", color: "blue" },
                { label: "Material Cart", value: "₹48.5K", sub: "Pending Orders", icon: "bx-box", color: "emerald" },
              ].map((s, idx) => (
                <div key={idx} className="bg-white/90 border border-amber-200/80 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center text-xl mb-3">
                    <i className={`bx ${s.icon}`}></i>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{s.value}</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{s.label}</p>
                  <p className="text-[10px] text-slate-500">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Quick Navigation Cards */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <i className="bx bx-compass text-amber-600"></i> Workspace Portals
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { href: "/design", title: "AI Design Studio", desc: "Generate custom 3D house plans, multi-floor layouts & export GLB/PDF.", icon: "bx-cube-alt", btn: "Open Studio" },
                  { href: "/renovate", title: "AI Renovate Studio", desc: "Upload house photo, preview modern styles with split-view comparison slider.", icon: "bx-paint-roll", btn: "Open Renovate" },
                  { href: "/builders", title: "Hire Verified Builders", desc: "Browse 10+ licensed contractors with live availability and phone contacts.", icon: "bx-hard-hat", btn: "Find Builders" },
                  { href: "/materials", title: "Material Marketplace", desc: "Order cement, steel, bricks, sand & structural supplies at factory rates.", icon: "bx-box", btn: "Browse Supplies" },
                ].map((card, i) => (
                  <Link key={i} href={card.href} className="group bg-white/90 border border-amber-200/80 rounded-2xl p-5 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center text-xl mb-3 group-hover:scale-105 transition-transform">
                        <i className={`bx ${card.icon}`}></i>
                      </div>
                      <h4 className="font-black text-slate-900 text-sm mb-1">{card.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-800">
                      <span>{card.btn}</span>
                      <i className="bx bx-right-arrow-alt text-base group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* B. BUILDER DASHBOARD */}
        {/* ============================================================== */}
        {user.role === "builder" && (
          <div className="space-y-8 animate-fade-in">
            {/* Status Alert for Unapproved Builders */}
            {user.status === "pending_verification" && (
              <div className="bg-amber-50 border border-amber-300 rounded-3xl p-6 text-xs text-amber-950 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 font-black text-sm text-amber-900">
                  <i className="bx bx-time text-xl text-amber-600"></i>
                  <span>Builder Credential Verification Pending</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Your contractor credentials for <strong>{user.companyName || user.name}</strong> have been submitted to the BuildMate verification team. Once approved by our administrator, your verified badge and client quotation tools will become active on the public builders directory.
                </p>
                <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-500">
                  <span>Registration: {user.licenseNumber || "Submitted for audit"}</span>
                  <span>•</span>
                  <span>Contact: {user.phone || user.email}</span>
                </div>
              </div>
            )}

            {/* Builder Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Client Inquiries", value: "14", sub: "New Leads", icon: "bx-envelope", color: "blue" },
                { label: "Submitted Quotations", value: "8", sub: "₹2.4 Cr Value", icon: "bx-file", color: "amber" },
                { label: "Active Sites", value: "3", sub: "Ongoing Builds", icon: "bx-buildings", color: "emerald" },
                { label: "Contractor Rating", value: "4.9★", sub: "18 Reviews", icon: "bx-star", color: "yellow" },
              ].map((s, idx) => (
                <div key={idx} className="bg-white/90 border border-amber-200/80 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center text-xl mb-3">
                    <i className={`bx ${s.icon}`}></i>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{s.value}</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{s.label}</p>
                  <p className="text-[10px] text-slate-500">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Recent Project Inquiries Queue */}
            <div className="bg-white/90 border border-amber-200/80 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
                  <i className="bx bx-bell text-amber-600 text-lg"></i>
                  Live Client Construction Inquiries
                </h3>
                <span className="text-[11px] font-bold text-slate-500">3 New Inquiries Today</span>
              </div>

              <div className="space-y-3">
                {[
                  { client: "Dr. Arvind Rao", location: "Whitefield, Bangalore", plot: "30x40 (1200 sqft)", budget: "₹65L – ₹75L", scope: "3BHK Modern Villa Ground+1", date: "2 hours ago" },
                  { client: "Ananya Deshmukh", location: "Jubilee Hills, Hyderabad", plot: "40x60 (2400 sqft)", budget: "₹1.2 Cr+", scope: "Royal Classical Luxury Residence", date: "5 hours ago" },
                  { client: "Mathew Varghese", location: "Kakkanad, Kochi", plot: "30x50 (1500 sqft)", budget: "₹45L – ₹55L", scope: "Kerala Heritage Facade Revamp", date: "Yesterday" },
                ].map((inq, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-200 hover:border-amber-300 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{inq.client}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">{inq.scope}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {inq.location} • Plot: {inq.plot} • Budget: <strong className="text-slate-800">{inq.budget}</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-slate-400 mr-2">{inq.date}</span>
                      <button className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all cursor-pointer">
                        Submit Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* C. MATERIAL SUPPLIER DASHBOARD */}
        {/* ============================================================== */}
        {user.role === "supplier" && (
          <div className="space-y-8 animate-fade-in">
            {user.status === "pending_verification" && (
              <div className="bg-amber-50 border border-amber-300 rounded-3xl p-6 text-xs text-amber-950 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 font-black text-sm text-amber-900">
                  <i className="bx bx-time text-xl text-amber-600"></i>
                  <span>Supplier Store Verification Pending</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Your store credentials for <strong>{user.companyName || user.name}</strong> are currently being reviewed. Once approved, your products will appear with direct wholesale checkout in the BuildMate Materials Marketplace.
                </p>
              </div>
            )}

            {/* Supplier Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Listed Catalog Items", value: "28", sub: "Active SKUs", icon: "bx-box", color: "amber" },
                { label: "Current Stock", value: "1,450", sub: "Bags / Tons", icon: "bx-layer", color: "blue" },
                { label: "Customer Orders", value: "22", sub: "Dispatched", icon: "bx-truck", color: "emerald" },
                { label: "Monthly Gross", value: "₹8.9L", sub: "+18% vs last month", icon: "bx-rupee", color: "yellow" },
              ].map((s, idx) => (
                <div key={idx} className="bg-white/90 border border-amber-200/80 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center text-xl mb-3">
                    <i className={`bx ${s.icon}`}></i>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{s.value}</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{s.label}</p>
                  <p className="text-[10px] text-slate-500">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Inventory Management Table */}
            <div className="bg-white/90 border border-amber-200/80 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
                  <i className="bx bx-list-check text-amber-600 text-lg"></i>
                  Active Inventory Catalog
                </h3>
                <Link href="/materials" className="text-xs font-bold text-amber-700 hover:underline">
                  View Public Storefront →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3 rounded-l-xl">Material Product</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Unit Price</th>
                      <th className="py-2.5 px-3">Stock Level</th>
                      <th className="py-2.5 px-3 rounded-r-xl">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {[
                      { name: "UltraTech Super Cement OPC 53", category: "Cement", price: "₹385 / 50kg bag", stock: "650 Bags", status: "In Stock" },
                      { name: "Tata Tiscon Fe 550D TMT Rebars", category: "Steel", price: "₹68,500 / Ton", stock: "18 Tons", status: "In Stock" },
                      { name: "Wirecut Red Terracotta Bricks", category: "Bricks", price: "₹11 / Piece", stock: "12,000 Pcs", status: "In Stock" },
                      { name: "M-Sand River Alternative (Double Washed)", category: "Aggregates", price: "₹1,850 / Ton", stock: "45 Tons", status: "Low Stock" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-amber-50/40">
                        <td className="py-3 px-3 font-bold text-slate-900">{row.name}</td>
                        <td className="py-3 px-3 text-slate-500">{row.category}</td>
                        <td className="py-3 px-3 font-bold text-amber-900">{row.price}</td>
                        <td className="py-3 px-3">{row.stock}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            row.status === "In Stock" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* D. ADMINISTRATOR DASHBOARD */}
        {/* ============================================================== */}
        {user.role === "admin" && (
          <div className="space-y-8 animate-fade-in">
            {adminMessage && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <i className="bx bx-check-circle text-lg text-emerald-600"></i>
                <span>{adminMessage}</span>
              </div>
            )}

            {/* Admin Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Registered Users", value: adminData?.totalUsers?.toString() || "...", sub: "In Database", icon: "bx-user", color: "blue" },
                { label: "Pending Approvals", value: adminData?.pending?.length.toString() || "0", sub: "Awaiting Action", icon: "bx-time-five", color: "amber" },
                { label: "Verified Contractors", value: adminData?.users?.filter(u => u.role === "builder" && u.status === "active").length.toString() || "0", sub: "Marketplace Active", icon: "bx-hard-hat", color: "emerald" },
                { label: "Verified Suppliers", value: adminData?.users?.filter(u => u.role === "supplier" && u.status === "active").length.toString() || "0", sub: "Catalog Active", icon: "bx-box", color: "purple" },
              ].map((s, idx) => (
                <div key={idx} className="bg-white/90 border border-amber-200/80 rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center text-xl mb-3">
                    <i className={`bx ${s.icon}`}></i>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{s.value}</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{s.label}</p>
                  <p className="text-[10px] text-slate-500">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Pending Builder & Supplier Approvals Queue */}
            <div className="bg-white/90 border border-amber-200/80 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
                  <i className="bx bx-shield-quarter text-amber-600 text-lg"></i>
                  Verification Queue: Builder & Supplier Applications
                </h3>
                <button
                  type="button"
                  onClick={fetchAdminData}
                  disabled={adminLoading}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                >
                  <i className={`bx bx-refresh text-base ${adminLoading ? "animate-spin" : ""}`}></i>
                  <span>Refresh Queue</span>
                </button>
              </div>

              {!adminData || adminData.pending.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-200">
                  <i className="bx bx-check-double text-3xl text-emerald-600 mb-1"></i>
                  <p className="font-bold">No pending verification requests</p>
                  <p className="text-[11px] text-slate-400">All registered contractor and supplier accounts are up to date.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {adminData.pending.map((p) => (
                    <div key={p.uid} className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-200 text-amber-900">
                            Requested: {p.requestedRole || p.role}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Email: <strong className="text-slate-800">{p.email}</strong> • Company: <strong>{p.companyName || "N/A"}</strong>
                        </p>
                        {p.licenseNumber && (
                          <p className="text-[11px] text-slate-500 mt-0.5">License/GST: {p.licenseNumber} • Phone: {p.phone || "N/A"}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleAdminDecision(p.uid, true)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <i className="bx bx-check text-base"></i> Approve & Verify
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdminDecision(p.uid, false)}
                          className="px-3.5 py-2 rounded-xl border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <i className="bx bx-x text-base"></i> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Registered Users Directory */}
            <div className="bg-white/90 border border-amber-200/80 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-wide text-slate-900 mb-4 flex items-center gap-2">
                <i className="bx bx-group text-amber-600 text-lg"></i>
                Registered Accounts Directory ({adminData?.users?.length || 0})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3 rounded-l-xl">User Name</th>
                      <th className="py-2.5 px-3">Email Address</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 rounded-r-xl">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {adminData?.users?.map((u) => (
                      <tr key={u.uid} className="hover:bg-amber-50/40">
                        <td className="py-3 px-3 font-bold text-slate-900">{u.name}</td>
                        <td className="py-3 px-3 text-slate-600">{u.email}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-800 border border-slate-200">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px]">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. ROLE UPGRADE MODAL */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-amber-300 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-scale-up">
            <button
              type="button"
              onClick={() => setUpgradeModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-lg hover:bg-slate-200"
            >
              &times;
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center text-2xl font-black">
                <i className="bx bx-award"></i>
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Request Role Upgrade</h3>
                <p className="text-xs text-slate-500">Apply to become a Verified Contractor or Material Vendor</p>
              </div>
            </div>

            {upgradeMessage && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 font-bold">
                {upgradeMessage}
              </div>
            )}

            <form onSubmit={handleUpgradeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-700">Target Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "builder" as const, title: "Builder / Contractor", icon: "bx-hard-hat" },
                    { id: "supplier" as const, title: "Material Supplier", icon: "bx-box" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setUpgradeTargetRole(r.id)}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                        upgradeTargetRole === r.id
                          ? "bg-amber-500/15 border-amber-500 text-amber-950 ring-2 ring-amber-500/20"
                          : "border-slate-200 text-slate-600 hover:border-amber-300"
                      }`}
                    >
                      <i className={`bx ${r.icon} text-lg text-amber-600`}></i>
                      <span>{r.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Company / Trade Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vardhan Infra Projects"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-amber-500 outline-none"
                  value={upgradeCompany}
                  onChange={(e) => setUpgradeCompany(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98450 12345"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-amber-500 outline-none"
                    value={upgradePhone}
                    onChange={(e) => setUpgradePhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700">License / GST No.</label>
                  <input
                    type="text"
                    placeholder="e.g. GSTIN / PWD Reg"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-amber-500 outline-none"
                    value={upgradeLicense}
                    onChange={(e) => setUpgradeLicense(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={upgradeLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer mt-2"
              >
                {upgradeLoading ? "Submitting Application..." : "Submit Application for Admin Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
