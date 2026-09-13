'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="glow-sphere top-0 left-0 w-[400px] h-[400px] bg-indigo-600/20" />
      <div className="glow-sphere bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/10" />

      <div className="glass-card w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold flex items-center justify-center gap-2 mb-4">
            <i className="bx bx-cube-alt text-indigo-500"></i>
            <span>BuildMate</span>
          </Link>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-slate-400 mt-2">Log in to manage your construction projects</p>
        </div>

        {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-3 rounded-lg text-sm mb-6">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-indigo-500/50 transition-all"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">Password</label>
            <input
              type="password"
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-indigo-500/50 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-lg mt-4 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-8">
          Don't have an account? <Link href="/signup" className="text-indigo-400 hover:underline">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}
