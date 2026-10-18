import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] bg-texture-luxury text-slate-800 overflow-x-hidden pt-28 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-8 pb-32 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 blur-[100px] rounded-full pointer-events-none"></div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight relative z-10 leading-[1.1]">
            Building the Future of <br/>
            <span className="text-gradient-gold-rich">Home Construction</span>
          </h1>
          <p className="text-xs md:text-sm text-amber-800 font-bold tracking-[0.25em] uppercase mb-6 relative z-10">Design. Build. Manage.</p>
          <p className="text-lg text-slate-600 leading-relaxed relative z-10 font-normal">
            BuildMate is an AI-powered construction platform that helps people transform their home ideas into realistic designs, connect with trusted builders, source construction materials, and manage their projects from one platform.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card-luxury p-12 rounded-[2.5rem] mb-20 relative overflow-hidden text-center bg-white/90 border border-amber-200/80 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.25em] text-amber-700 mb-6 relative z-10">Our Mission</h2>
          <p className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight max-w-4xl mx-auto relative z-10">
            "Make home construction simpler, smarter, more transparent, and accessible to everyone."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {/* What We Solve */}
          <div>
            <h2 className="font-display text-3xl font-black text-slate-900 mb-8">What We Solve</h2>
            <ul className="space-y-4">
              {[
                { title: 'Difficult home planning', icon: 'bx-home-alt' },
                { title: 'Lack of reliable builders', icon: 'bx-hard-hat' },
                { title: 'Difficulty comparing materials', icon: 'bx-box' },
                { title: 'Unclear construction costs', icon: 'bx-wallet' },
                { title: 'Poor project tracking', icon: 'bx-line-chart' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-white/80 border border-amber-200/70 shadow-xs">
                  <div className="hidden sm:flex w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 items-center justify-center shrink-0 shadow-xs">
                    <i className={`bx ${item.icon} text-2xl text-amber-700`}></i>
                  </div>
                  <span className="text-base font-bold text-slate-800">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Solution */}
          <div>
            <h2 className="font-display text-3xl font-black text-slate-900 mb-8">Our Solution</h2>
            <div className="space-y-4">
              <div className="glass-card-luxury p-6 rounded-2xl border-l-4 border-l-amber-500 bg-white/90 border border-amber-200/70 shadow-xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2">AI House Design</h3>
                <p className="text-slate-600">Generate personalized 2D floor plans and interactive 3D house models.</p>
              </div>
              <div className="glass-card-luxury p-6 rounded-2xl border-l-4 border-l-yellow-600 bg-white/90 border border-amber-200/70 shadow-xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Builders</h3>
                <p className="text-slate-600">Connect users with trusted construction professionals.</p>
              </div>
              <div className="glass-card-luxury p-6 rounded-2xl border-l-4 border-l-amber-600 bg-white/90 border border-amber-200/70 shadow-xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Materials</h3>
                <p className="text-slate-600">Discover and compare cement, bricks, steel, sand and other materials.</p>
              </div>
              <div className="glass-card-luxury p-6 rounded-2xl border-l-4 border-l-emerald-600 bg-white/90 border border-amber-200/70 shadow-xs">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Project Management</h3>
                <p className="text-slate-600">Track construction progress, costs, tasks and milestones.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-24">
          <h2 className="font-display text-3xl font-black text-slate-900 mb-12 text-center">How BuildMate Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Enter Requirements', icon: 'bx-notepad' },
              { num: '02', title: 'AI Generates Design', icon: 'bx-bot' },
              { num: '03', title: 'Connect With Builders', icon: 'bx-hard-hat' },
              { num: '04', title: 'Source Materials', icon: 'bx-box' },
              { num: '05', title: 'Manage Construction', icon: 'bx-line-chart' }
            ].map((step, i) => (
              <div key={i} className="glass-card-luxury p-6 rounded-3xl text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 bg-white/90 border border-amber-200/80 shadow-md">
                <div className="font-display text-5xl font-black text-amber-500/10 absolute -top-2 -right-2 group-hover:text-amber-500/25 transition-colors">{step.num}</div>
                <div className="hidden sm:flex w-16 h-16 bg-amber-50 border border-amber-200 rounded-2xl mx-auto items-center justify-center mb-4 text-amber-600 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-yellow-500 group-hover:text-slate-950 transition-all duration-300 shadow-xs">
                  <i className={`bx ${step.icon} text-3xl`}></i>
                </div>
                <h3 className="text-sm font-bold text-slate-900 relative z-10">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass-card-luxury p-12 rounded-[2.5rem] mb-24 text-center bg-white/90 border border-amber-200/80 shadow-md">
          <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-500 mb-10">Technology Powered By</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {['Next.js', 'AI / Groq', 'Supabase', '3D Visualization', 'Maps', 'Payment Integration'].map((tech, i) => (
              <div key={i} className="px-6 py-3 bg-amber-50/60 rounded-full border border-amber-200 text-slate-800 font-bold text-sm shadow-xs">
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-[2rem] mb-8 shadow-xl">
            <div className="bg-[#faf9f6] px-12 py-8 rounded-[1.8rem] border border-amber-200">
              <h2 className="font-display text-2xl font-black text-slate-900 mb-2">Team: AIrchitects</h2>
              <p className="text-amber-700 font-bold mb-1">Project: BuildMate</p>
              <p className="text-slate-500 text-xs tracking-widest uppercase font-bold">Design. Build. Manage.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
