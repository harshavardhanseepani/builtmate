'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // Save user data to Realtime Database
      await set(ref(db, `users/${user.uid}`), {
        uid: user.uid,
        name,
        email,
        role,
        createdAt: new Date().toISOString()
      });

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
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
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-slate-400 mt-2">Start your construction journey today</p>
        </div>

        {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-3 rounded-lg text-sm mb-6">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-indigo-500/50 transition-all"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">I am a...</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`py-3 rounded-lg border transition-all ${role === 'client' ? 'bg-indigo-600/20 border-indigo-500/50 text-white' : 'bg-slate-900/50 border-white/10 text-slate-400'}`}
                onClick={() => setRole('client')}
              >
                Client
              </button>
              <button
                type="button"
                className={`py-3 rounded-lg border transition-all ${role === 'builder' ? 'bg-indigo-600/20 border-indigo-500/50 text-white' : 'bg-slate-900/50 border-white/10 text-slate-400'}`}
                onClick={() => setRole('builder')}
              >
                Builder
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-lg mt-4 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-8">
          Already have an account? <Link href="/login" className="text-indigo-400 hover:underline">Log In</Link>
        </p>
      </div>
    </main>
  );
}
