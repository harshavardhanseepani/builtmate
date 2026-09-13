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
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold flex items-center gap-2">
          <i className="bx bx-cube-alt text-indigo-500 text-3xl"></i>
          <span>Build<span className="text-indigo-500">Mate</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/design" prefetch={false} className="text-slate-400 hover:text-white transition-colors text-sm font-semibold">AI Design</Link>
          <Link href="/builders" prefetch={false} className="text-slate-400 hover:text-white transition-colors text-sm font-semibold">Builders</Link>
          <Link href="/materials" prefetch={false} className="text-slate-400 hover:text-white transition-colors text-sm font-semibold">Materials</Link>
          {user ? (
            <Link href="/dashboard" prefetch={false} className="text-slate-400 hover:text-white transition-colors text-sm font-semibold">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" prefetch={false} className="text-slate-400 hover:text-white transition-colors text-sm font-semibold">Log In</Link>
              <Link href="/signup" prefetch={false} className="btn-primary py-2 px-6">Get Started</Link>
            </>
          )}
          <button onClick={triggerSeed} className="text-[10px] text-slate-800 hover:text-white transition-colors">Seed DB</button>
        </div>
      </div>
    </nav>
  );
}
