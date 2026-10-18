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
    <main className="min-h-screen relative overflow-hidden bg-[#07090e] font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Background Image / Overlay - Using architectural image with luxury dark vignette */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-45 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/95 to-[#07090e]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-[#07090e]/80"></div>
      </div>

      {/* Ambient Warm Golden/Amber Glow Spheres */}
      <div className="glow-sphere w-[550px] h-[550px] bg-amber-500/10 top-[-100px] left-[-100px]"></div>
      <div className="glow-sphere w-[600px] h-[600px] bg-yellow-600/10 top-[30%] right-[-150px]"></div>
      <div className="glow-sphere w-[400px] h-[400px] bg-amber-700/10 bottom-0 left-[25%]"></div>

      <Navbar />

      {/* Hero Content */}
      <section className="relative z-10 pt-44 pb-36 px-6 md:px-8 min-h-screen flex items-center">
        <div className="max-w-[1800px] mx-auto w-full flex flex-col lg:flex-row justify-between items-center gap-12">
          
          {/* Left Column - Text and Features */}
          <div className="max-w-2xl text-left space-y-10">
            
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                <h3 className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-amber-200">
                  Turn your ideas into reality
                </h3>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.08] text-white">
                Build Smarter.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#ca8a04] drop-shadow-[0_2px_15px_rgba(212,175,55,0.25)]">
                  Live Better.
                </span>
              </h1>
              <p className="text-base md:text-xl text-slate-300/90 max-w-xl font-normal leading-relaxed">
                AI-powered home design, trusted builders, quality materials and complete project management — all in one unified architectural platform.
              </p>
            </div>

            {/* Grid of 4 small features */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-2">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-sm group-hover:border-amber-400/50 group-hover:bg-amber-500/20 transition-all">
                  <i className="bx bx-home-alt-2 text-2xl text-amber-400"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base tracking-wide">AI Design</h4>
                  <p className="text-amber-200/70 text-xs font-medium mt-1">2D Plans & 3D Models</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-yellow-600/10 border border-yellow-600/25 flex items-center justify-center shrink-0 shadow-sm group-hover:border-yellow-500/50 group-hover:bg-yellow-600/20 transition-all">
                  <i className="bx bx-user-check text-2xl text-yellow-400"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base tracking-wide">Verified Builders</h4>
                  <p className="text-amber-200/70 text-xs font-medium mt-1">Trusted Professionals</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center shrink-0 shadow-sm group-hover:border-amber-300/50 group-hover:bg-amber-400/20 transition-all">
                  <i className="bx bx-box text-2xl text-amber-300"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base tracking-wide">Quality Materials</h4>
                  <p className="text-amber-200/70 text-xs font-medium mt-1">Best Brands, Best Deals</p>
                </div>
              </div>
              {/* Feature 4 */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 shadow-sm group-hover:border-emerald-400/50 group-hover:bg-emerald-500/20 transition-all">
                  <i className="bx bx-clipboard text-2xl text-emerald-400"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base tracking-wide">Project Management</h4>
                  <p className="text-emerald-300/70 text-xs font-medium mt-1">Track. Plan. Build.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <button onClick={handleStartDesigning} className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3df93] to-[#c59b27] hover:brightness-110 text-slate-950 font-bold text-lg shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 transform hover:-translate-y-1 active:scale-95 cursor-pointer">
                Start Designing <i className="bx bx-right-arrow-alt text-2xl"></i>
              </button>
              <button onClick={() => setShowVideoModal(true)} className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-amber-500/25 hover:border-amber-400/60 hover:bg-amber-500/10 text-white font-bold text-lg transition-all flex items-center gap-3 transform hover:-translate-y-1 active:scale-95 cursor-pointer shadow-lg shadow-black/40">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-slate-950 flex items-center justify-center shadow-md">
                  <i className="bx bx-play text-xl ml-0.5"></i>
                </div>
                Watch Demo
              </button>
            </div>

          </div>

          {/* Right Column - Decorative UI Elements representing the 3D model */}
          <div className="hidden lg:block relative w-[600px] h-[600px]">
            {/* The actual house image is in the background, but we can overlay the UI boxes from the mockup */}
            <div className="absolute top-[20%] left-0 glass-card-luxury p-4.5 rounded-2xl flex items-center gap-4 animate-float">
               <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shadow-inner">
                 <i className="bx bx-home-alt-2 text-2xl text-amber-300"></i>
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm tracking-wide">AI Design</h4>
                 <p className="text-amber-200/70 text-xs font-medium mt-0.5">2D Plans &rarr;</p>
               </div>
            </div>

            <div className="absolute top-[50%] -left-10 glass-card-luxury p-4.5 rounded-2xl flex items-center gap-4 animate-float" style={{ animationDelay: '1s' }}>
               <div className="w-11 h-11 rounded-xl bg-yellow-600/15 border border-yellow-600/30 flex items-center justify-center shadow-inner">
                 <i className="bx bx-cube-alt text-2xl text-yellow-300"></i>
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm tracking-wide">3D Visualization</h4>
                 <p className="text-amber-200/70 text-xs font-medium mt-0.5">Real-Time &rarr;</p>
               </div>
            </div>

            <div className="absolute top-[30%] right-0 glass-card-luxury p-4.5 rounded-2xl flex items-center gap-4 animate-float" style={{ animationDelay: '2s' }}>
               <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shadow-inner">
                 <i className="bx bx-hard-hat text-2xl text-emerald-400"></i>
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm tracking-wide">Build</h4>
                 <p className="text-emerald-300/80 text-xs font-medium mt-0.5">With Experts &rarr;</p>
               </div>
            </div>
            
            {/* Hand-written text SVGs / Styling */}
            <div className="absolute top-[10%] right-10 text-2xl font-serif italic text-amber-200/80 -rotate-6 drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)] tracking-wide">
              From Concept<br/>to Completion
            </div>
            <div className="absolute bottom-[20%] right-0 text-2xl font-serif italic text-amber-200/80 rotate-3 drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)] tracking-wide">
              A Smarter<br/>Way to Build
            </div>
          </div>
          
        </div>
      </section>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 w-full z-20 px-6 md:px-8 pb-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-[#090d16]/90 backdrop-blur-2xl border border-amber-500/20 rounded-2xl py-6 px-10 flex flex-wrap md:flex-nowrap justify-between items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            
            <div className="flex items-center gap-4">
              <i className="bx bx-home-heart text-3xl text-amber-400"></i>
              <div>
                <h4 className="font-display text-white font-extrabold text-2xl tracking-tight">10K+</h4>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Homes Designed</p>
              </div>
            </div>
            
            <div className="w-px h-10 bg-amber-500/15 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <i className="bx bx-group text-3xl text-yellow-400"></i>
              <div>
                <h4 className="font-display text-white font-extrabold text-2xl tracking-tight">2K+</h4>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Verified Builders</p>
              </div>
            </div>

            <div className="w-px h-10 bg-amber-500/15 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <i className="bx bx-cube-alt text-3xl text-amber-300"></i>
              <div>
                <h4 className="font-display text-white font-extrabold text-2xl tracking-tight">500+</h4>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Material Suppliers</p>
              </div>
            </div>

            <div className="w-px h-10 bg-amber-500/15 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <i className="bx bx-star text-3xl text-yellow-300"></i>
              <div>
                <h4 className="font-display text-white font-extrabold text-2xl tracking-tight">98%</h4>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">User Satisfaction</p>
              </div>
            </div>

            <div className="w-px h-10 bg-amber-500/15 hidden md:block"></div>

            <div className="flex items-center gap-4 ml-auto">
              <i className="bx bx-leaf text-3xl text-emerald-400"></i>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide">Sustainable Homes</h4>
                <p className="text-emerald-400/80 text-xs font-medium">Brighter Tomorrows</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8 animate-in fade-in zoom-in duration-200">
          <div className="bg-[#0c101d] border border-amber-500/30 rounded-3xl w-full max-w-5xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.15)] relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-amber-500/15 bg-[#0a0e19]/90">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <i className="bx bx-cube-alt text-amber-400 text-xl"></i>
                BuildMate Demo
              </h3>
              <button onClick={() => setShowVideoModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <i className="bx bx-x text-xl"></i>
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black relative overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/RwZYExYnZHU?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=RwZYExYnZHU" 
                title="BuildMate Architectural Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute inset-0 w-full h-full opacity-60 scale-105 pointer-events-none"
              ></iframe>

              {/* BuildMate Branding Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-8 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/30">
                <div className="flex items-center gap-4 mb-6">
                  <i className="bx bx-cube-alt text-amber-400 text-6xl md:text-8xl drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]"></i>
                  <div className="flex flex-col text-left">
                    <span className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-none drop-shadow-2xl">
                      Build<span className="text-gradient-gold">Mate</span>
                    </span>
                    <span className="text-sm md:text-xl text-amber-200/80 font-bold tracking-[0.3em] uppercase mt-2 drop-shadow-lg">
                      Design. Build. Manage.
                    </span>
                  </div>
                </div>
                <div className="px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-100 text-sm md:text-base font-semibold shadow-lg">
                  The Future of Home Construction is Here
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
      
    </main>
  );
}
