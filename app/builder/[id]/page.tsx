'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { ref, onValue, push, set } from 'firebase/database';
import Navbar from '@/components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';

export default function BuilderProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [builder, setBuilder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

const MOCK_BUILDERS = [
  { id: '1', name: 'Ramesh Singh', company: 'Apex Construction', location: 'Mumbai, MH', projects: 45, experience: '12 Yrs', rating: 4.8, verified: true, image: 'https://images.unsplash.com/photo-1541888086925-920eb1f1dc17?auto=format&fit=crop&q=80&w=800', description: 'Building the future of Mumbai with modern and sustainable construction.', portfolio: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800'], specialization: 'Luxury Villas' },
  { id: '2', name: 'Arjun Reddy', company: 'BuildPro Solutions', location: 'Hyderabad, TS', projects: 120, experience: '18 Yrs', rating: 4.9, verified: true, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800', description: 'Excellence in commercial and residential execution.', portfolio: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'], specialization: 'Modern Homes' },
  { id: '3', name: 'Priya Sharma', company: 'Sharma Architects', location: 'Bangalore, KA', projects: 32, experience: '8 Yrs', rating: 4.7, verified: true, image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800', description: 'Combining nature with contemporary architecture.', portfolio: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'], specialization: 'Eco Houses' },
  { id: '4', name: 'Vijay Kumar', company: 'VK Designs', location: 'Chennai, TN', projects: 85, experience: '15 Yrs', rating: 4.6, verified: true, image: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&q=80&w=800', description: 'Traditional South Indian aesthetics meet modern engineering.', portfolio: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800'], specialization: 'Traditional Homes' }
];

  useEffect(() => {
    if (id) {
      let timeout: NodeJS.Timeout;
      try {
        if (!db) {
          setBuilder(MOCK_BUILDERS.find(b => b.id === id) || MOCK_BUILDERS[0]);
          setLoading(false);
          return;
        }
        const builderRef = ref(db, `builders/${id}`);
        onValue(builderRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setBuilder(data);
          } else {
            setBuilder(MOCK_BUILDERS.find(b => b.id === id) || MOCK_BUILDERS[0]);
          }
          setLoading(false);
        }, (err) => {
          setBuilder(MOCK_BUILDERS.find(b => b.id === id) || MOCK_BUILDERS[0]);
          setLoading(false);
        });

        timeout = setTimeout(() => {
           setBuilder((prev: any) => prev ? prev : (MOCK_BUILDERS.find(b => b.id === id) || MOCK_BUILDERS[0]));
           setLoading(false);
        }, 1000);
      } catch(e) {
        setBuilder(MOCK_BUILDERS.find(b => b.id === id) || MOCK_BUILDERS[0]);
        setLoading(false);
      }
      return () => {
         if (timeout) clearTimeout(timeout);
      }
    }
  }, [id]);

  const startProject = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!db) {
      router.push('/projects');
      return;
    }

    const projectsRef = push(ref(db, 'projects'));
    const newProject = {
      id: projectsRef.key,
      userId: user.uid,
      builderId: builder.id,
      builderName: builder.company,
      status: 'pending',
      progress: 0,
      stage: 'Foundation',
      budget: '₹30L - ₹50L', // Default or from previous AI design context
      plotSize: '1200 sqft',
      createdAt: new Date().toISOString()
    };

    await set(projectsRef, newProject);
    router.push(`/dashboard?project=${projectsRef.key}`);
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Profile...</div>;
  if (!builder) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Builder Not Found</div>;

  return (
    <main className="min-h-screen pt-24 bg-slate-950">
      <Navbar />
      
      {/* Background Glows */}
      <div className="glow-sphere top-20 right-20 w-96 h-96 bg-violet-600/20" />
      <div className="glow-sphere bottom-20 left-20 w-80 h-80 bg-blue-600/20" />

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-8 text-center sticky top-32">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-violet-500/30">
                <img src={builder.image} alt={builder.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold mb-1">{builder.name}</h1>
              <p className="text-violet-400 font-bold uppercase tracking-widest text-xs mb-6">{builder.company}</p>
              
              <div className="flex justify-center gap-6 mb-8 text-sm border-y border-white/5 py-6">
                <div>
                  <p className="text-2xl font-black text-white">{builder.rating}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{builder.projects}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{builder.experience}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Exp</p>
                </div>
              </div>

              <div className="space-y-4">
                <button onClick={startProject} className="w-full btn-primary py-4">Start Project</button>
                <button className="w-full btn-secondary py-4">Send Message</button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-2 space-y-10">
            <div className="glass-card p-10">
              <h2 className="text-3xl font-black mb-6 tracking-tighter uppercase">Company <span className="text-gradient">Philosophy</span></h2>
              <p className="text-slate-400 leading-relaxed text-lg italic">
                "{builder.description}"
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Service Area</h4>
                  <p className="text-sm font-bold text-white">{builder.location}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Status</h4>
                  <p className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Available for Projects
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4">Expertise</h3>
                <ul className="space-y-3">
                  {['Sustainable Materials', 'Modern High-Rise', 'Luxury Residential', 'Fast Track Construction'].map((skill, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                      <i className="bx bx-check-circle text-violet-500"></i> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-8 border-violet-500/20">
                <h3 className="text-xl font-bold mb-4">Verification</h3>
                <div className="flex items-center gap-4 p-4 bg-violet-500/10 rounded-2xl">
                   <i className="bx bxs-badge-check text-4xl text-violet-500"></i>
                   <div>
                     <p className="text-sm font-bold text-white uppercase tracking-widest">BuildMate Verified</p>
                     <p className="text-[10px] text-slate-500 italic">Identity and Business License Checked</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Portfolio Grid — unique images per builder from Firebase */}
            <div>
               <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">Project <span className="text-gradient">Portfolio</span></h3>
               <div className="grid grid-cols-2 gap-4">
                  {(builder.portfolio || []).map((imgUrl: string, n: number) => (
                    <div key={n} className="aspect-video rounded-3xl overflow-hidden glass-card relative group cursor-pointer">
                      <img src={imgUrl} alt={`Portfolio ${n + 1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-violet-400 border border-violet-500/30">View Project</span>
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
