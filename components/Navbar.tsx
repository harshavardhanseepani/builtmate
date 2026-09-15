"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname?.startsWith(path);
  };

  const navLinkClass = (path: string) =>
    `transition-colors text-sm font-semibold pb-1 border-b-2 ${
      isActive(path)
        ? "text-white border-blue-500"
        : "text-slate-300 border-transparent hover:text-white hover:border-white/20"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#060c21]/80 backdrop-blur-xl border-b border-white/5 py-4 px-8">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <i className="bx bx-cube-alt text-blue-500 text-4xl"></i>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight text-white leading-none">
              Build<span className="text-blue-500">Mate</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest mt-1">
              Design. Build. Manage.
            </span>
          </div>
        </Link>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className={navLinkClass("/")}>Home</Link>
          <Link href="/design" prefetch={false} className={navLinkClass("/design")}>AI Design</Link>
          <Link href="/builders" prefetch={false} className={navLinkClass("/builders")}>Builders</Link>
          <Link href="/materials" prefetch={false} className={navLinkClass("/materials")}>Materials</Link>
          <Link href="/projects" prefetch={false} className={navLinkClass("/projects")}>Projects</Link>
          <Link href="/about" prefetch={false} className={navLinkClass("/about")}>About</Link>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="w-24 h-9 bg-slate-800 rounded-full animate-pulse" />
          ) : user ? (
            /* ─── LOGGED IN STATE ─── */
            <div className="flex items-center gap-4">
              <Link href="/dashboard" prefetch={false} className="px-5 py-2 rounded-full border border-slate-700 text-white text-sm font-semibold hover:bg-white/5 transition-colors flex items-center gap-2">
                <i className="bx bx-grid-alt text-base"></i> Dashboard
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 transition-colors text-sm font-semibold"
                >
                  <i className="bx bx-user-circle text-xl"></i>
                  <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                  <i className={`bx bx-chevron-down transition-transform ${dropdownOpen ? "rotate-180" : ""}`}></i>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-white/10">
                      <p className="text-white font-bold text-sm truncate">{user.name}</p>
                      <p className="text-slate-400 text-xs truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard" prefetch={false} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-sm transition-colors">
                        <i className="bx bx-grid-alt text-lg"></i> Dashboard
                      </Link>
                      <Link href="/projects" prefetch={false} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-sm transition-colors">
                        <i className="bx bx-buildings text-lg"></i> My Projects
                      </Link>
                      <button
                        onClick={() => { setDropdownOpen(false); logout(); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 text-sm transition-colors"
                      >
                        <i className="bx bx-log-out text-lg"></i> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ─── LOGGED OUT STATE ─── */
            <>
              <Link href="/login" prefetch={false} className="px-6 py-2.5 rounded-full border border-slate-700 text-white text-sm font-semibold hover:bg-white/5 transition-colors">
                Sign In
              </Link>
              <Link href="/design" prefetch={false} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all">
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
