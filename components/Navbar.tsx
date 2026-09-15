'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { seedDatabase } from '@/lib/seed';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const triggerSeed = async () => {
    await seedDatabase();
    alert('Database Seeded!');
  };

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
          <Link href="/" className="text-white border-b-2 border-blue-500 pb-1 text-sm font-semibold transition-colors">Home</Link>
          <Link href="/design" prefetch={false} className="text-slate-300 hover:text-white transition-colors text-sm font-semibold">AI Design</Link>
          <Link href="/builders" prefetch={false} className="text-slate-300 hover:text-white transition-colors text-sm font-semibold">Builders</Link>
          <Link href="/materials" prefetch={false} className="text-slate-300 hover:text-white transition-colors text-sm font-semibold">Materials</Link>
          <Link href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-semibold">Projects</Link>
          <Link href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-semibold">About</Link>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-slate-300 hover:text-white transition-colors text-xl">
            <i className="bx bx-search"></i>
          </button>
          
          {user ? (
            <Link href="/dashboard" prefetch={false} className="px-6 py-2.5 rounded-full border border-slate-700 text-white text-sm font-semibold hover:bg-white/5 transition-colors">Dashboard</Link>
          ) : (
            <Link href="/login" prefetch={false} className="px-6 py-2.5 rounded-full border border-slate-700 text-white text-sm font-semibold hover:bg-white/5 transition-colors">Sign In</Link>
          )}
          
          <Link href="/design" prefetch={false} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all">
            Get Started
          </Link>
        </div>
        
      </div>
    </nav>
  );
}
