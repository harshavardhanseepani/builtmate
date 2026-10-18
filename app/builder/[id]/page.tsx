'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

export default function BuilderProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [builder, setBuilder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const MOCK_BUILDERS = [
    { id: '1', name: 'Ramesh Singh', company: 'Apex Construction', location: 'Mumbai, MH', projects: 45, experience: '12 Yrs', rating: 4.8, verified: true, image: 'https://images.unsplash.com/photo-1541888086925-920eb1f1dc17?auto=format&fit=crop&q=80&w=800', description: 'Building the future of Mumbai with modern and sustainable construction.', portfolio: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800'], specialization: 'Luxury Villas' },
    { id: '2', name: 'Arjun Reddy', company: 'BuildPro Solutions', location: 'Hyderabad, TS', projects: 120, experience: '18 Yrs', rating: 4.9, verified: true, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800', description: 'Excellence in commercial and residential execution.', portfolio: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'], specialization: 'Modern Homes' },
    { id: '3', name: 'Priya Sharma', company: 'Sharma Architects', location: 'Bangalore, KA', projects: 32, experience: '8 Yrs', rating: 4.7, verified: true, image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800', description: 'Combining nature with contemporary architecture.', portfolio: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'], specialization: 'Eco Houses' },
    { id: '4', name: 'Vijay Kumar', company: 'VK Designs', location: 'Chennai, TN', projects: 85, experience: '15 Yrs', rating: 4.6, verified: true, image: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&q=80&w=800', description: 'Traditional South Indian aesthetics meet modern engineering.', portfolio: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800'], specialization: 'Traditional Homes' }
  ];

  useEffect(() => {
    if (id) {
      const found = MOCK_BUILDERS.find(b => b.id === id) || MOCK_BUILDERS[0];
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
              <p className="text-amber-700 font-bold uppercase tracking-widest text-xs mb-6">{builder.company}</p>
              
              <div className="flex justify-center gap-6 mb-8 text-sm border-y border-amber-100 py-6">
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

              <div className="space-y-4">
                <button onClick={startProject} className="w-full btn-primary py-4 shadow-md cursor-pointer">Start Project</button>
                <button className="w-full btn-secondary py-4 cursor-pointer">Send Message</button>
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
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Service Area</h4>
                  <p className="text-sm font-bold text-slate-900">{builder.location}</p>
                </div>
                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Status</h4>
                  <p className="text-sm font-bold text-emerald-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Available for Projects
                  </p>
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
