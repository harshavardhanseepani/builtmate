import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden pt-28">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-8 pb-32">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter relative z-10">
            Building the Future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Home Construction</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium tracking-wide mb-8 relative z-10">Design. Build. Manage.</p>
          <p className="text-lg text-slate-300 leading-relaxed relative z-10">
            BuildMate is an AI-powered construction platform that helps people transform their home ideas into realistic designs, connect with trusted builders, source construction materials, and manage their projects from one platform.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card p-12 rounded-[2.5rem] mb-20 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400 mb-6 relative z-10">Our Mission</h2>
          <p className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-4xl mx-auto relative z-10">
            "Make home construction simpler, smarter, more transparent, and accessible to everyone."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {/* What We Solve */}
          <div>
            <h2 className="text-3xl font-black text-white mb-8">What We Solve</h2>
            <ul className="space-y-6">
              {[
                { title: 'Difficult home planning', icon: 'bx-home-alt' },
                { title: 'Lack of reliable builders', icon: 'bx-hard-hat' },
                { title: 'Difficulty comparing materials', icon: 'bx-box' },
                { title: 'Unclear construction costs', icon: 'bx-wallet' },
                { title: 'Poor project tracking', icon: 'bx-line-chart' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-red-500/10 items-center justify-center shrink-0">
                    <i className={`bx ${item.icon} text-2xl text-red-400`}></i>
                  </div>
                  <span className="text-lg font-bold text-slate-300">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Solution */}
          <div>
            <h2 className="text-3xl font-black text-white mb-8">Our Solution</h2>
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl border-l-4 border-l-blue-500">
                <h3 className="text-xl font-bold text-white mb-2">AI House Design</h3>
                <p className="text-slate-400">Generate personalized 2D floor plans and interactive 3D house models.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border-l-4 border-l-indigo-500">
                <h3 className="text-xl font-bold text-white mb-2">Verified Builders</h3>
                <p className="text-slate-400">Connect users with trusted construction professionals.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border-l-4 border-l-purple-500">
                <h3 className="text-xl font-bold text-white mb-2">Smart Materials</h3>
                <p className="text-slate-400">Discover and compare cement, bricks, steel, sand and other materials.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border-l-4 border-l-pink-500">
                <h3 className="text-xl font-bold text-white mb-2">Project Management</h3>
                <p className="text-slate-400">Track construction progress, costs, tasks and milestones.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-24">
          <h2 className="text-3xl font-black text-white mb-12 text-center">How BuildMate Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Enter Requirements', icon: 'bx-notepad' },
              { num: '02', title: 'AI Generates Design', icon: 'bx-bot' },
              { num: '03', title: 'Connect With Builders', icon: 'bx-hard-hat' },
              { num: '04', title: 'Source Materials', icon: 'bx-box' },
              { num: '05', title: 'Manage Construction', icon: 'bx-line-chart' }
            ].map((step, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="text-5xl font-black text-white/5 absolute -top-2 -right-2 group-hover:text-blue-500/10 transition-colors">{step.num}</div>
                <div className="hidden sm:flex w-16 h-16 bg-blue-500/10 rounded-2xl mx-auto items-center justify-center mb-4 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  <i className={`bx ${step.icon} text-3xl`}></i>
                </div>
                <h3 className="text-sm font-bold text-white relative z-10">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass-card p-12 rounded-[2.5rem] mb-24 text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-10">Technology Powered By</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {['Next.js', 'AI / Groq', 'Supabase', '3D Visualization', 'Maps', 'Payment Integration'].map((tech, i) => (
              <div key={i} className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-white font-bold text-sm">
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] mb-8">
            <div className="bg-[#020617] px-12 py-8 rounded-[1.8rem]">
              <h2 className="text-2xl font-black text-white mb-2">Team: AIrchitects</h2>
              <p className="text-indigo-400 font-bold mb-1">Project: BuildMate</p>
              <p className="text-slate-400 text-sm tracking-widest uppercase font-black">Design. Build. Manage.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
