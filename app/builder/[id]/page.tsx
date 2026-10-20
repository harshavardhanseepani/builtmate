'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

import { BUILDERS_LIST, Builder } from '@/lib/buildersData';

export default function BuilderProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [builder, setBuilder] = useState<Builder | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      const found = BUILDERS_LIST.find(b => b.id === id) || BUILDERS_LIST[0];
      setBuilder(found);
      setLoading(false);
    }
  }, [id]);

  const startProject = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    router.push('/projects');
  };

  if (loading) return <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-amber-800 font-bold">Loading Profile...</div>;
  if (!builder) return <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-amber-800 font-bold">Builder Not Found</div>;

  return (
    <main className="min-h-screen pt-24 bg-[#faf9f6] bg-texture-luxury font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />
      
      {/* Background Glows */}
      <div className="glow-sphere top-20 right-20 w-96 h-96 bg-amber-400/10" />
      <div className="glow-sphere bottom-20 left-20 w-80 h-80 bg-yellow-500/10" />

      <div className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card-luxury p-8 text-center sticky top-32 rounded-3xl border border-amber-200/80 bg-white/90 shadow-xl">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-amber-300 shadow-md">
                <img src={builder.image} alt={builder.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="font-display text-2xl font-black mb-1 text-slate-900">{builder.name}</h1>
              <p className="text-amber-700 font-bold uppercase tracking-widest text-xs mb-2">{builder.company}</p>
              
              {/* Availability Badge */}
              <div className="mb-5 flex justify-center">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border shadow-xs ${
                  builder.available 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                    : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${builder.available ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  {builder.availabilityNote}
                </span>
              </div>
              
              <div className="flex justify-center gap-6 mb-6 text-sm border-y border-amber-100 py-6">
                <div>
                  <p className="font-display text-2xl font-black text-slate-900">{builder.rating}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Rating</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-slate-900">{builder.projects}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Projects</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-slate-900">{builder.experience}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Exp</p>
                </div>
              </div>

              {/* Direct Contact Info */}
              <div className="bg-amber-50/50 rounded-2xl border border-amber-200/60 p-4 mb-6 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5"><i className="bx bx-phone text-amber-600"></i> Phone:</span>
                  <a href={`tel:${builder.phone}`} className="font-bold text-slate-800 hover:text-amber-700 transition-colors">{builder.phone}</a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5"><i className="bx bx-envelope text-amber-600"></i> Email:</span>
                  <a href={`mailto:${builder.email}`} className="font-bold text-slate-800 hover:text-amber-700 transition-colors truncate max-w-[150px]" title={builder.email}>{builder.email}</a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5"><i className="bx bx-map text-amber-600"></i> Location:</span>
                  <span className="font-bold text-slate-800">{builder.location}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={startProject} className="w-full btn-primary py-3.5 shadow-md cursor-pointer font-bold">Start Project</button>
                <a 
                  href={`tel:${builder.phone}`} 
                  className="w-full btn-secondary py-3 flex items-center justify-center gap-2 cursor-pointer font-bold"
                >
                  <i className="bx bx-phone-call text-amber-600 text-base"></i> Call Builder
                </a>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-2 space-y-10">
            <div className="glass-card-luxury p-10 rounded-3xl border border-amber-200/80 bg-white/90 shadow-md">
              <h2 className="font-display text-3xl font-black mb-6 tracking-tight uppercase text-slate-900">Company <span className="text-gradient-gold-rich">Philosophy</span></h2>
              <p className="text-slate-600 leading-relaxed text-lg italic">
                "{builder.description}"
              </p>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/60">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase mb-1">Service Area</h4>
                  <p className="text-xs font-bold text-slate-900">{builder.location}</p>
                </div>
                <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/60">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase mb-1">Availability</h4>
                  <p className={`text-xs font-bold flex items-center gap-1.5 ${builder.available ? 'text-emerald-700' : 'text-amber-700'}`}>
                    <span className={`w-2 h-2 rounded-full ${builder.available ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                    {builder.availabilityNote}
                  </p>
                </div>
                <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/60">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase mb-1">Contact Phone</h4>
                  <a href={`tel:${builder.phone}`} className="text-xs font-bold text-slate-900 hover:text-amber-700 block truncate">{builder.phone}</a>
                </div>
                <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/60">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase mb-1">Official Email</h4>
                  <a href={`mailto:${builder.email}`} className="text-xs font-bold text-slate-900 hover:text-amber-700 block truncate" title={builder.email}>{builder.email}</a>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card-luxury p-8 rounded-3xl border border-amber-200/80 bg-white/90 shadow-md">
                <h3 className="font-display text-xl font-bold mb-4 text-slate-900">Expertise</h3>
                <ul className="space-y-3">
                  {['Sustainable Materials', 'Modern High-Rise', 'Luxury Residential', 'Fast Track Construction'].map((skill, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                      <i className="bx bx-check-circle text-amber-600 text-lg"></i> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card-luxury p-8 rounded-3xl border border-amber-200/80 bg-white/90 shadow-md">
                <h3 className="font-display text-xl font-bold mb-4 text-slate-900">Verification</h3>
                <div className="flex items-center gap-4 p-4 bg-amber-50/80 rounded-2xl border border-amber-200/60">
                   <i className="bx bxs-badge-check text-4xl text-amber-600"></i>
                   <div>
                     <p className="text-sm font-bold text-slate-900 uppercase tracking-wider">BuildMate Verified</p>
                     <p className="text-[10px] text-slate-500 italic">Identity and Business License Checked</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Portfolio Grid */}
            <div>
               <h3 className="font-display text-2xl font-black mb-6 uppercase tracking-tight text-slate-900">Project <span className="text-gradient-gold-rich">Portfolio</span></h3>
               <div className="grid grid-cols-2 gap-4">
                  {(builder.portfolio || []).map((imgUrl: string, n: number) => (
                    <div key={n} className="aspect-video rounded-3xl overflow-hidden glass-card-luxury relative group cursor-pointer border border-amber-200/80 shadow-md">
                      <img src={imgUrl} alt={`Portfolio ${n + 1}`} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-slate-950 border border-amber-300 shadow-md">View Project</span>
                      </div>
                      <p className="absolute bottom-4 left-6 text-xs font-bold uppercase tracking-widest text-white">{builder.specialization} · #{String(n + 1).padStart(2, '0')}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
