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
    `transition-all duration-200 text-sm font-medium tracking-wide pb-1 border-b-2 ${
      isActive(path)
        ? "text-amber-300 border-amber-400 font-semibold drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
        : "text-slate-300 border-transparent hover:text-amber-200 hover:border-amber-400/40"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#07090e]/85 backdrop-blur-2xl border-b border-amber-500/15 py-4 px-6 md:px-8 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <i className="bx bx-cube-alt text-amber-400 text-3xl md:text-4xl drop-shadow-[0_0_14px_rgba(212,175,55,0.5)] group-hover:scale-105 transition-transform"></i>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white leading-none">
              Build<span className="text-gradient-gold">Mate</span>
            </span>
            <span className="text-[9px] md:text-[10px] text-amber-200/70 font-semibold tracking-[0.25em] uppercase mt-1">
              Design. Build. Manage.
            </span>
          </div>
        </Link>

        {/* Desktop Links (Icons hidden on mobile screens) */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className={navLinkClass("/")}>Home</Link>
          <Link href="/design" prefetch={false} className={navLinkClass("/design")}>AI Design</Link>
          <Link href="/builders" prefetch={false} className={navLinkClass("/builders")}>
            <span className="hidden md:inline-block mr-1"><i className="bx bx-hard-hat text-amber-400/80"></i></span> Builders
          </Link>
          <Link href="/materials" prefetch={false} className={navLinkClass("/materials")}>
            <span className="hidden md:inline-block mr-1"><i className="bx bx-box text-amber-400/80"></i></span> Material Supplier
          </Link>
          <Link href="/projects" prefetch={false} className={navLinkClass("/projects")}>
            <span className="hidden md:inline-block mr-1"><i className="bx bx-buildings text-amber-400/80"></i></span> Projects
          </Link>
          <Link href="/about" prefetch={false} className={navLinkClass("/about")}>
            <span className="hidden md:inline-block mr-1"><i className="bx bx-info-circle text-amber-400/80"></i></span> About
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
                <Link href="/dashboard" prefetch={false} className="px-5 py-2 rounded-full border border-amber-500/30 text-amber-100 text-sm font-semibold hover:bg-amber-500/10 hover:border-amber-400/50 transition-colors flex items-center gap-2">
                  <i className="bx bx-grid-alt text-base text-amber-400 hidden md:inline-block"></i> Dashboard
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-200 hover:bg-amber-500/20 transition-colors text-sm font-semibold shadow-sm"
                  >
                    <i className="bx bx-user-circle text-xl text-amber-400 hidden md:inline-block"></i>
                    <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                    <i className={`bx bx-chevron-down transition-transform text-amber-400 ${dropdownOpen ? "rotate-180" : ""}`}></i>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#0c101d] border border-amber-500/20 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl">
                      <div className="p-4 border-b border-amber-500/10 bg-white/5">
                        <p className="text-white font-bold text-sm truncate">{user.name}</p>
                        <p className="text-amber-200/60 text-xs truncate mt-0.5">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link href="/dashboard" prefetch={false} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-500/10 text-slate-300 hover:text-white text-sm transition-colors">
                          <i className="bx bx-grid-alt text-lg text-amber-400"></i> Dashboard
                        </Link>
                        <Link href="/projects" prefetch={false} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-500/10 text-slate-300 hover:text-white text-sm transition-colors">
                          <i className="bx bx-buildings text-lg text-amber-400"></i> My Projects
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
                <Link href="/login" prefetch={false} className="px-6 py-2.5 rounded-full border border-amber-500/25 hover:border-amber-400/60 text-slate-200 hover:text-white text-sm font-semibold hover:bg-amber-500/10 backdrop-blur-md transition-all">
                  Sign In
                </Link>
                <Link href="/design" prefetch={false} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3df93] to-[#c59b27] hover:brightness-110 text-slate-950 text-sm font-bold shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all transform hover:-translate-y-0.5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-amber-500/20 text-amber-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Icons disabled on mobile for Builders, Material Supplier, Projects, About) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-amber-500/20 flex flex-col gap-2 pb-2 bg-[#07090e]/95 backdrop-blur-2xl rounded-2xl p-4">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/") ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            Home
          </Link>
          <Link 
            href="/design" 
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/design") ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            AI Design
          </Link>
          <Link 
            href="/builders" 
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/builders") ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            Builders
          </Link>
          <Link 
            href="/materials" 
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/materials") ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            Material Supplier
          </Link>
          <Link 
            href="/projects" 
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/projects") ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            Projects
          </Link>
          <Link 
            href="/about" 
            prefetch={false}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${isActive("/about") ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "text-slate-300 hover:bg-white/5"}`}
          >
            About
          </Link>

          <div className="pt-3 border-t border-amber-500/10 flex flex-col gap-2 md:hidden">
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/15 text-amber-300 text-sm font-bold border border-amber-500/30"
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
                  className="flex-1 text-center py-2.5 rounded-xl border border-amber-500/25 text-white text-sm font-bold hover:bg-amber-500/10"
                >
                  Sign In
                </Link>
                <Link 
                  href="/design" 
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3df93] to-[#c59b27] text-slate-950 text-sm font-bold shadow-lg"
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

