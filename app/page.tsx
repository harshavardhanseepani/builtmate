'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleAIDesignRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      router.push(`/design?prompt=${encodeURIComponent(prompt)}`);
    } else {
      router.push('/design');
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Background Glows */}
      <div className="glow-sphere top-[-200px] left-[-200px] w-[600px] h-[600px] bg-violet-600/30" />
      <div className="glow-sphere bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-600/20" />
      <div className="glow-sphere top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md mb-4 transform hover:scale-105 transition-all">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Next-Gen Construction Ecosystem</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
              Build<span className="text-gradient">Mate</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              Democratizing architecture through <span className="text-white font-bold">Generative AI</span>. Design, match, and build your legacy with a single prompt.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleAIDesignRedirect} className="glass-card p-2 flex flex-col md:flex-row gap-3 border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.15)] group focus-within:border-violet-500/50 transition-all duration-500">
              <input 
                type="text" 
                placeholder="Describe your dream home (e.g. Modern glass villa in Goa...)" 
                className="flex-1 bg-transparent border-none outline-none text-white px-8 py-5 text-lg font-medium placeholder:text-slate-600"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button type="submit" className="btn-primary group !py-5">
                Generate Design
                <i className="bx bx-right-arrow-alt ml-2 group-hover:translate-x-2 transition-transform"></i>
              </button>
            </form>
            <div className="flex justify-center gap-8 mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-4">
               <span className="flex items-center gap-2"><i className="bx bx-check-double text-violet-500"></i> AI ARCHITECT</span>
               <span className="flex items-center gap-2"><i className="bx bx-check-double text-violet-500"></i> VERIFIED BUILDERS</span>
               <span className="flex items-center gap-2"><i className="bx bx-check-double text-violet-500"></i> SMART BUDGETING</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { 
              title: 'AI Design Engine', 
              desc: 'State-of-the-art LLMs trained on millions of architectural patterns to generate bespoke floor plans and concepts.', 
              icon: 'bx-atom',
              gradient: 'from-violet-500 to-indigo-500',
              link: '/design'
            },
            { 
              title: 'Builder Sync', 
              desc: 'Instant matching with builders specialized in your generated style. Real-time construction project monitoring.', 
              icon: 'bx-infinite',
              gradient: 'from-blue-500 to-emerald-500',
              link: '/builders'
            },
            { 
              title: 'Supply Chain HUD', 
              desc: 'Direct access to raw materials at wholesale rates with real-time inventory tracking for cost efficiency.', 
              icon: 'bx-shield-quarter',
              gradient: 'from-pink-500 to-rose-500',
              link: '/materials'
            }
          ].map((f, i) => (
            <Link href={f.link} prefetch={false} key={i} className="glass-card p-10 group hover:-translate-y-3 duration-500 card-glow h-full flex flex-col">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-10 shadow-lg shadow-white/5`}>
                <i className={`bx ${f.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-10 border-l-2 border-white/5 pl-6">{f.desc}</p>
              <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-400 group-hover:gap-4 transition-all">
                 Explore Feature <i className="bx bx-right-arrow-alt text-lg"></i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative">
         <div className="glow-sphere top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-violet-600/5" />
         <div className="max-w-5xl mx-auto glass-card p-16 md:p-24 text-center space-y-12 overflow-hidden border-violet-500/20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight italic">
               Ready to architect <br /><span className="text-gradient">your future</span>?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium lead-relaxed">
               Join the first construction platform that combines artificial intelligence with real-world execution.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
               <Link href="/signup" prefetch={false} className="btn-primary">Sign Up Now</Link>
               <Link href="/design" prefetch={false} className="btn-secondary">Try AI Design</Link>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 relative bg-slate-950/40 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <Link href="/" prefetch={false} className="text-3xl font-black italic flex items-center gap-2 justify-center md:justify-start">
               <i className="bx bx-cube-alt text-violet-500"></i>
               <span>Build<span className="text-gradient">Mate</span></span>
            </Link>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">&copy; 2026 BuildMate AI. All rights reserved.</p>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">Docs</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
