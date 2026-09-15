"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className="fixed top-0 w-full z-50 bg-[#060c21]/90 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-8">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <i className="bx bx-cube-alt text-blue-500 text-3xl md:text-4xl"></i>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white leading-none">
              Build<span className="text-blue-500">Mate</span>
            </span>
            <span className="text-[9px] md:text-[10px] text-slate-400 font-medium tracking-widest mt-1">
              Design. Build. Manage.
            </span>
          </div>
        </Link>

        {/* Desktop Links (Icons hidden on mobile screens) */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className={navLinkClass("/")}>Home</Link>
          <Link href="/design" prefetch={false} className={navLinkClass("/design")}>AI Design</Link>
          <Link href="/builders" prefetch={false} className={navLinkClass("/builders")}>
            <span className="hidden md:inline-block mr-1"><i className="bx bx-hard-hat"></i></span> Builders
          </Link>
          <Link href="/materials" prefetch={false} className={navLinkClass("/materials")}>
            <span className="hidden md:inline-block mr-1"><i className="bx bx-box"></i></span> Material Supplier
          </Link>
          <Link href="/projects" prefetch={false} className={navLinkClass("/projects")}>
            <span className="hidden md:inline-block mr-1"><i className="bx bx-buildings"></i></span> Projects
          </Link>
          <Link href="/about" prefetch={false} className={navLinkClass("/about")}>
            <span className="hidden md:inline-block mr-1"><i className="bx bx-info-circle"></i></span> About
          </Link>
        </div>

        {/* Right Actions & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-24 h-9 bg-slate-800 rounded-full animate-pulse" />
            ) : user ? (
              /* ─── LOGGED IN STATE ─── */
              <div className="flex items-center gap-4">
                <Link href="/dashboard" prefetch={false} className="px-5 py-2 rounded-full border border-slate-700 text-white text-sm font-semibold hover:bg-white/5 transition-colors flex items-center gap-2">
                  <i className="bx bx-grid-alt text-base hidden md:inline-block"></i> Dashboard
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 transition-colors text-sm font-semibold"
                  >
                    <i className="bx bx-user-circle text-xl hidden md:inline-block"></i>
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

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800/80 border border-white/10 text-slate-200 hover:text-white"
            aria-label="Toggle Menu"
          >
            <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Icons disabled on mobile for Builders, Material Supplier, Projects, About) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-2 pb-2">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/") ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            Home
          </Link>
          <Link 
            href="/design" 
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/design") ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            AI Design
          </Link>
          <Link 
            href="/builders" 
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/builders") ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            Builders
          </Link>
          <Link 
            href="/materials" 
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/materials") ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            Material Supplier
          </Link>
          <Link 
            href="/projects" 
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/projects") ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            Projects
          </Link>
          <Link 
            href="/about" 
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/about") ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            About
          </Link>

          <div className="pt-3 border-t border-white/5 flex flex-col gap-2 md:hidden">
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600/20 text-blue-400 text-sm font-bold border border-blue-500/30"
                >
                  Dashboard ({user.name || user.email})
                </Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/30 text-left"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link 
                  href="/login" 
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl border border-slate-700 text-white text-sm font-bold"
                >
                  Sign In
                </Link>
                <Link 
                  href="/design" 
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

