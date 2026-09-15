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
    <main className="min-h-screen relative overflow-hidden bg-[#020817] font-sans">
      
      {/* Background Image / Overlay - Using a placeholder architectural image with dark gradient */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent"></div>
      </div>

      <Navbar />

      {/* Hero Content */}
      <section className="relative z-10 pt-48 pb-32 px-8 min-h-screen flex items-center">
        <div className="max-w-[1800px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-12">
          
          {/* Left Column - Text and Features */}
          <div className="max-w-2xl text-left space-y-10">
            
            <div className="space-y-4">
              <h3 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-slate-400">
                Turn your ideas into reality
              </h3>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] text-white">
                Build Smarter.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  Live Better.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-xl font-medium leading-relaxed">
                AI-powered home design, trusted builders, quality materials and complete project management — all in one platform.
              </p>
            </div>

            {/* Grid of 4 small features */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <i className="bx bx-home-alt-2 text-2xl text-blue-400"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">AI Design</h4>
                  <p className="text-slate-400 text-xs font-semibold mt-1">2D Plans & 3D Models</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <i className="bx bx-user-check text-2xl text-indigo-400"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Verified Builders</h4>
                  <p className="text-slate-400 text-xs font-semibold mt-1">Trusted Professionals</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <i className="bx bx-box text-2xl text-purple-400"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Quality Materials</h4>
                  <p className="text-slate-400 text-xs font-semibold mt-1">Best Brands, Best Deals</p>
                </div>
              </div>
              {/* Feature 4 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <i className="bx bx-clipboard text-2xl text-emerald-400"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">Project Management</h4>
                  <p className="text-slate-400 text-xs font-semibold mt-1">Track. Plan. Build.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6 pt-4">
              <button onClick={handleStartDesigning} className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2">
                Start Designing <i className="bx bx-right-arrow-alt text-2xl"></i>
              </button>
              <button onClick={() => setShowVideoModal(true)} className="px-8 py-4 rounded-full border border-slate-600 hover:bg-white/5 hover:border-white/20 text-white font-bold text-lg transition-all flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center">
                  <i className="bx bx-play text-xl ml-1"></i>
                </div>
                Watch Demo
              </button>
            </div>

          </div>

          {/* Right Column - Decorative UI Elements representing the 3D model */}
          <div className="hidden lg:block relative w-[600px] h-[600px]">
            {/* The actual house image is in the background, but we can overlay the UI boxes from the mockup */}
            <div className="absolute top-[20%] left-0 glass-card bg-slate-900/60 p-4 border border-blue-500/30 rounded-2xl flex items-center gap-4 animate-float">
               <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                 <i className="bx bx-home-alt-2 text-xl text-blue-400"></i>
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm">AI Design</h4>
                 <p className="text-slate-300 text-xs mt-0.5">2D Plans &rarr;</p>
               </div>
            </div>

            <div className="absolute top-[50%] -left-10 glass-card bg-slate-900/60 p-4 border border-indigo-500/30 rounded-2xl flex items-center gap-4 animate-float" style={{ animationDelay: '1s' }}>
               <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                 <i className="bx bx-cube-alt text-xl text-indigo-400"></i>
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm">3D Visualization</h4>
                 <p className="text-slate-300 text-xs mt-0.5">Real-Time &rarr;</p>
               </div>
            </div>

            <div className="absolute top-[30%] right-0 glass-card bg-slate-900/60 p-4 border border-emerald-500/30 rounded-2xl flex items-center gap-4 animate-float" style={{ animationDelay: '2s' }}>
               <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                 <i className="bx bx-hard-hat text-xl text-emerald-400"></i>
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm">Build</h4>
                 <p className="text-slate-300 text-xs mt-0.5">With Experts &rarr;</p>
               </div>
            </div>
            
            {/* Hand-written text SVGs / Styling */}
            <div className="absolute top-[10%] right-10 text-xl font-medium text-white/90 italic -rotate-6">
              From Concept<br/>to Completion
            </div>
            <div className="absolute bottom-[20%] right-0 text-xl font-medium text-white/90 italic rotate-3">
              A Smarter<br/>Way to Build
            </div>
          </div>
          
        </div>
      </section>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 w-full z-20 px-8 pb-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-[#0a1229]/80 backdrop-blur-2xl border border-white/5 rounded-2xl py-6 px-10 flex flex-wrap md:flex-nowrap justify-between items-center gap-8 shadow-2xl">
            
            <div className="flex items-center gap-4">
              <i className="bx bx-home-heart text-3xl text-blue-400"></i>
              <div>
                <h4 className="text-white font-black text-xl">10K+</h4>
                <p className="text-slate-400 text-xs font-semibold">Homes Designed</p>
              </div>
            </div>
            
            <div className="w-px h-10 bg-white/10 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <i className="bx bx-group text-3xl text-indigo-400"></i>
              <div>
                <h4 className="text-white font-black text-xl">2K+</h4>
                <p className="text-slate-400 text-xs font-semibold">Verified Builders</p>
              </div>
            </div>

            <div className="w-px h-10 bg-white/10 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <i className="bx bx-cube-alt text-3xl text-purple-400"></i>
              <div>
                <h4 className="text-white font-black text-xl">500+</h4>
                <p className="text-slate-400 text-xs font-semibold">Material Suppliers</p>
              </div>
            </div>

            <div className="w-px h-10 bg-white/10 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <i className="bx bx-star text-3xl text-yellow-400"></i>
              <div>
                <h4 className="text-white font-black text-xl">98%</h4>
                <p className="text-slate-400 text-xs font-semibold">User Satisfaction</p>
              </div>
            </div>

            <div className="w-px h-10 bg-white/10 hidden md:block"></div>

            <div className="flex items-center gap-4 ml-auto">
              <i className="bx bx-leaf text-3xl text-emerald-400"></i>
              <div>
                <h4 className="text-white font-semibold text-sm">Sustainable Homes</h4>
                <p className="text-slate-400 text-xs font-semibold">Brighter Tomorrows</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in zoom-in duration-200">
          <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-slate-800/50">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <i className="bx bx-cube-alt text-blue-400 text-xl"></i>
                BuildMate Demo
              </h3>
              <button onClick={() => setShowVideoModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <i className="bx bx-x text-xl"></i>
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black relative">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/D9R-jmn2jAE?autoplay=1&mute=1" 
                title="BuildMate AI Architectural Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            
          </div>
        </div>
      )}
      
    </main>
  );
}
