'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  const router = useRouter();
  const [plotSize, setPlotSize] = useState('30x40');
  const [direction, setDirection] = useState('North');
  const [style, setStyle] = useState('Modern');
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleStartDesigning = () => {
    router.push('/design');
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#faf9f6] bg-texture-luxury font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Reduced subtle background architectural accent */}
      <div 
        className="absolute top-0 right-0 w-[55%] h-full z-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop')`,
          maskImage: 'radial-gradient(circle at 60% 40%, black 10%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 60% 40%, black 10%, transparent 75%)',
        }}
      ></div>

      {/* Ambient Warm Golden/Amber Glow Spheres */}
      <div className="glow-sphere w-[550px] h-[550px] bg-amber-400/10 top-[-80px] left-[-80px]"></div>
      <div className="glow-sphere w-[600px] h-[600px] bg-yellow-500/10 top-[20%] right-[-120px]"></div>
      <div className="glow-sphere w-[450px] h-[450px] bg-amber-600/10 bottom-0 left-[20%]"></div>

      <Navbar />

      {/* Hero Content */}
      <section className="relative z-10 pt-44 pb-36 px-6 md:px-8 min-h-screen flex items-center">
        <div className="max-w-[1800px] mx-auto w-full flex flex-col lg:flex-row justify-between items-center gap-12">
          
          {/* Left Column - Text and Features */}
          <div className="max-w-2xl text-left space-y-9">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping"></span>
                <h3 className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-amber-800">
                  Turn your ideas into reality
                </h3>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.08] text-slate-900">
                Build Smarter.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 drop-shadow-xs">
                  Live Better.
                </span>
              </h1>
              <p className="text-base md:text-xl text-slate-600 max-w-xl font-normal leading-relaxed">
                AI-powered home design, trusted builders, quality materials and complete project management — all in one unified architectural platform.
              </p>
            </div>

            {/* Grid of features */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1">
              {/* Feature 1: AI Design */}
              <Link href="/design" className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group backdrop-blur-sm cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-amber-100/70 transition-all">
                  <i className="bx bx-home-alt-2 text-2xl text-amber-600"></i>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm sm:text-base tracking-wide group-hover:text-amber-800 transition-colors">AI Design</h4>
                  <p className="text-slate-500 text-xs font-medium mt-0.5">2D Plans & 3D Models</p>
                </div>
              </Link>

              {/* Feature 2: AI Renovate (beside AI Design) */}
              <Link href="/renovate" className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-amber-300 shadow-xs hover:border-amber-500 hover:shadow-md transition-all group backdrop-blur-sm cursor-pointer relative overflow-hidden">
                <div className="absolute top-1 right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-xs">New</div>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-amber-200/60 transition-all">
                  <i className="bx bx-paint-roll text-2xl text-amber-700"></i>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm sm:text-base tracking-wide group-hover:text-amber-800 transition-colors">AI Renovate</h4>
                  <p className="text-slate-500 text-xs font-medium mt-0.5 leading-tight">Transform your existing house with AI.</p>
                </div>
              </Link>

              {/* Feature 3: Verified Builders */}
              <Link href="/builders" className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group backdrop-blur-sm cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-amber-100/60 border border-amber-300 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-amber-100 transition-all">
                  <i className="bx bx-user-check text-2xl text-amber-700"></i>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm sm:text-base tracking-wide group-hover:text-amber-800 transition-colors">Verified Builders</h4>
                  <p className="text-slate-500 text-xs font-medium mt-0.5">Trusted Professionals</p>
                </div>
              </Link>

              {/* Feature 4: Quality Materials */}
              <Link href="/materials" className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group backdrop-blur-sm cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-amber-100/70 transition-all">
                  <i className="bx bx-box text-2xl text-amber-600"></i>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm sm:text-base tracking-wide group-hover:text-amber-800 transition-colors">Quality Materials</h4>
                  <p className="text-slate-500 text-xs font-medium mt-0.5">Best Brands, Best Deals</p>
                </div>
              </Link>

              {/* Feature 5: Project Tracking */}
              <Link href="/projects" className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-amber-200/80 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all group backdrop-blur-sm cursor-pointer sm:col-span-2 lg:col-span-1">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-emerald-100/70 transition-all">
                  <i className="bx bx-buildings text-2xl text-emerald-600"></i>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm sm:text-base tracking-wide group-hover:text-emerald-800 transition-colors">Project Tracking</h4>
                  <p className="text-emerald-700/80 text-xs font-bold mt-0.5">Day-by-Day Live &rarr;</p>
                </div>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-3">
              <button onClick={handleStartDesigning} className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-105 text-slate-950 font-bold text-lg shadow-[0_4px_25px_rgba(212,175,55,0.35)] transition-all flex items-center gap-2 transform hover:-translate-y-1 active:scale-95 cursor-pointer">
                Start Designing <i className="bx bx-right-arrow-alt text-2xl"></i>
              </button>
              <button onClick={() => setShowVideoModal(true)} className="px-8 py-4 rounded-full bg-white/90 backdrop-blur-md border border-amber-300 hover:border-amber-400 hover:bg-amber-50/80 text-slate-800 font-bold text-lg transition-all flex items-center gap-3 transform hover:-translate-y-1 active:scale-95 cursor-pointer shadow-xs">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center shadow-xs">
                  <i className="bx bx-play text-xl ml-0.5"></i>
                </div>
                Watch Demo
              </button>
            </div>

          </div>

          {/* Right Column - Contained Architectural Showcase & Floating Badges */}
          <div className="hidden lg:block relative w-[600px] h-[600px]">
            {/* Reduced, Contained House Showcase Card */}
            <div className="absolute inset-6 rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-[0_20px_50px_rgba(212,175,55,0.12),0_4px_16px_rgba(0,0,0,0.04)] bg-white/80 backdrop-blur-md group">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-white/30"></div>
              </div>
            </div>

            {/* Floating Card 1 */}
            <div className="absolute top-[12%] -left-4 glass-card-luxury p-4 rounded-2xl flex items-center gap-3.5 animate-float shadow-lg">
               <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shadow-xs">
                 <i className="bx bx-home-alt-2 text-2xl text-amber-600"></i>
               </div>
               <div>
                 <h4 className="text-slate-900 font-bold text-sm tracking-wide">AI Design</h4>
                 <p className="text-amber-700 text-xs font-semibold mt-0.5">2D Plans &rarr;</p>
               </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute top-[48%] -left-8 glass-card-luxury p-4 rounded-2xl flex items-center gap-3.5 animate-float shadow-lg" style={{ animationDelay: '1s' }}>
               <div className="w-11 h-11 rounded-xl bg-amber-100/60 border border-amber-300 flex items-center justify-center shadow-xs">
                 <i className="bx bx-cube-alt text-2xl text-amber-700"></i>
               </div>
               <div>
                 <h4 className="text-slate-900 font-bold text-sm tracking-wide">3D Visualization</h4>
                 <p className="text-amber-700 text-xs font-semibold mt-0.5">Real-Time &rarr;</p>
               </div>
            </div>

            {/* Floating Card 3 */}
            <Link href="/projects" className="absolute bottom-[16%] -right-4 glass-card-luxury p-4 rounded-2xl flex items-center gap-3.5 animate-float shadow-lg hover:scale-105 transition-transform cursor-pointer" style={{ animationDelay: '2s' }}>
               <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-xs">
                 <i className="bx bx-buildings text-2xl text-emerald-600"></i>
               </div>
               <div>
                 <h4 className="text-slate-900 font-bold text-sm tracking-wide">Live Tracking</h4>
                 <p className="text-emerald-700 text-xs font-semibold mt-0.5">Day-by-Day &rarr;</p>
               </div>
            </Link>
            
            {/* Elegant Script Typography Callouts */}
            <div className="absolute top-[5%] right-6 text-2xl font-serif italic text-amber-800 -rotate-6 drop-shadow-[0_1px_4px_rgba(217,119,6,0.15)] tracking-wide">
              From Concept<br/>to Completion
            </div>
            <div className="absolute bottom-[5%] left-4 text-2xl font-serif italic text-amber-800 rotate-2 drop-shadow-[0_1px_4px_rgba(217,119,6,0.15)] tracking-wide">
              A Smarter<br/>Way to Build
            </div>
          </div>
          
        </div>
      </section>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 w-full z-20 px-6 md:px-8 pb-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-white/90 backdrop-blur-2xl border border-amber-200/80 rounded-2xl py-6 px-10 flex flex-wrap md:flex-nowrap justify-between items-center gap-8 shadow-[0_15px_40px_rgba(212,175,55,0.08),0_2px_8px_rgba(0,0,0,0.04)]">
            
            <div className="flex items-center gap-4">
              <i className="bx bx-home-heart text-3xl text-amber-600"></i>
              <div>
                <h4 className="font-display font-black text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 tracking-tight">10K+</h4>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Homes Designed</p>
              </div>
            </div>
            
            <div className="w-px h-10 bg-amber-200/80 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <i className="bx bx-group text-3xl text-amber-600"></i>
              <div>
                <h4 className="font-display font-black text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 tracking-tight">2K+</h4>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Verified Builders</p>
              </div>
            </div>

            <div className="w-px h-10 bg-amber-200/80 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <i className="bx bx-cube-alt text-3xl text-amber-600"></i>
              <div>
                <h4 className="font-display font-black text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 tracking-tight">500+</h4>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Material Suppliers</p>
              </div>
            </div>

            <div className="w-px h-10 bg-amber-200/80 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <i className="bx bx-star text-3xl text-amber-500"></i>
              <div>
                <h4 className="font-display font-black text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 tracking-tight">98%</h4>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">User Satisfaction</p>
              </div>
            </div>

            <div className="w-px h-10 bg-amber-200/80 hidden md:block"></div>

            <div className="flex items-center gap-4 ml-auto">
              <i className="bx bx-leaf text-3xl text-emerald-600"></i>
              <div>
                <h4 className="text-slate-800 font-bold text-sm tracking-wide">Sustainable Homes</h4>
                <p className="text-emerald-700 text-xs font-medium">Brighter Tomorrows</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8 animate-in fade-in zoom-in duration-200">
          <div className="bg-white border border-amber-300 rounded-3xl w-full max-w-5xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(212,175,55,0.15)] relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-amber-200 bg-amber-50/60">
              <h3 className="text-slate-900 font-bold text-lg flex items-center gap-2">
                <i className="bx bx-cube-alt text-amber-600 text-xl"></i>
                BuildMate Demo
              </h3>
              <button onClick={() => setShowVideoModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer">
                <i className="bx bx-x text-xl"></i>
              </button>
            </div>

            {/* Video Player - Full Clear Playback without Overlay */}
            <div className="aspect-video w-full bg-black relative overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/RwZYExYnZHU?autoplay=1&controls=1&modestbranding=1&rel=0" 
                title="Architectural Demo Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
          </div>
        </div>
      )}
      
    </main>
  );
}
