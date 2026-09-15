"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Navbar />
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-semibold">Loading your workspace...</p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  const stats = [
    { label: "My Projects", value: "2", sub: "Active", icon: "bx-buildings", color: "blue" },
    { label: "AI Designs", value: "5", sub: "Saved", icon: "bx-cube-alt", color: "indigo" },
    { label: "Construction", value: "68%", sub: "Progress", icon: "bx-hard-hat", color: "purple" },
    { label: "Materials", value: "12", sub: "Saved", icon: "bx-box", color: "emerald" },
    { label: "Builders", value: "3", sub: "Connected", icon: "bx-user-check", color: "teal" },
    { label: "Saved Designs", value: "8", sub: "Blueprints", icon: "bx-bookmark", color: "pink" },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    teal: "bg-teal-500/10 border-teal-500/20 text-teal-400",
    pink: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 pt-28 pb-20">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{user.name.split(" ")[0]}</span> 👋
            </h1>
            <p className="text-slate-400 mt-2 text-lg">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/design" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
              <i className="bx bx-plus text-xl"></i> New Design
            </Link>
            <button onClick={logout} className="px-6 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 font-semibold rounded-2xl transition-colors flex items-center gap-2">
              <i className="bx bx-log-out text-xl"></i> Log Out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-5 hover:-translate-y-1 transition-transform duration-300 cursor-pointer group">
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${colorMap[stat.color]}`}>
                <i className={`bx ${stat.icon} text-2xl`}></i>
              </div>
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="text-white font-semibold text-sm mt-0.5">{stat.label}</p>
              <p className="text-slate-500 text-xs mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { href: "/design", icon: "bx-cube-alt", label: "AI House Design", desc: "Generate 2D & 3D house plans", color: "from-blue-600 to-indigo-600" },
            { href: "/builders", icon: "bx-hard-hat", label: "Find Builders", desc: "Connect with verified contractors", color: "from-indigo-600 to-purple-600" },
            { href: "/materials", icon: "bx-box", label: "Browse Materials", desc: "Cement, steel, bricks & more", color: "from-purple-600 to-pink-600" },
            { href: "/projects", icon: "bx-buildings", label: "My Projects", desc: "Track construction progress", color: "from-emerald-600 to-teal-600" },
          ].map((action, i) => (
            <Link key={i} href={action.href} className="group bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <i className={`bx ${action.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-white font-bold text-lg">{action.label}</h3>
              <p className="text-slate-400 text-sm mt-1">{action.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-blue-400 text-sm font-semibold group-hover:gap-2 transition-all">
                Open <i className="bx bx-right-arrow-alt text-lg"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
