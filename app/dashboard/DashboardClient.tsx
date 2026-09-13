'use client';

import { useState, useEffect, useRef } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, push, set, serverTimestamp, query, orderByChild } from 'firebase/database';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

import { Suspense } from 'react';

export default function DashboardContent() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProject, setActiveProject] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectIdParam = searchParams.get('project');

  const loadUserProjects = (uid: string) => {
    const projectsRef = ref(db, 'projects');
    return onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userProjects = Object.values(data).filter((p: any) => p.userId === uid || p.userId === 'demo-user');
        setProjects(userProjects);
        
        if (projectIdParam) {
          const selected = userProjects.find((p: any) => p.id === projectIdParam);
          if (selected) setActiveProject(selected);
        } else if (userProjects.length > 0 && !activeProject) {
          setActiveProject(userProjects[0]);
        }
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    let unsubscribeProjects: (() => void) | undefined;
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        unsubscribeProjects = loadUserProjects(u.uid);
      } else {
        router.push('/login');
      }
    });
    return () => {
      unsubscribeAuth();
      if (unsubscribeProjects) unsubscribeProjects();
    };
  }, [projectIdParam]);

  useEffect(() => {
    if (activeProject) {
      const msgsRef = ref(db, `messages/${activeProject.id}`);
      const unsubscribe = onValue(msgsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessages(Object.values(data).sort((a: any, b: any) => a.timestamp - b.timestamp));
        } else {
          setMessages([]);
        }
      });
      return () => unsubscribe();
    }
  }, [activeProject]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeProject || !user) return;

    const msgRef = push(ref(db, `messages/${activeProject.id}`));
    await set(msgRef, {
      id: msgRef.key,
      text: newMessage,
      senderId: user.uid,
      senderName: user.displayName || 'User',
      timestamp: serverTimestamp()
    });
    setNewMessage('');
  };

  const stages = ['Foundation', 'Brickwork', 'Roofing', 'Plastering', 'Finishing'];

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-bold animate-pulse">Initializing BuildMate HUD...</div>;

  return (
    <main className="min-h-screen pt-20 bg-slate-950 pb-20">
      <Navbar />
      
      {/* HUD Glows */}
      <div className="glow-sphere top-0 right-0 w-[600px] h-[600px] bg-violet-600/10" />

      <div className="max-w-[1600px] mx-auto p-6 grid lg:grid-cols-4 gap-8 relative z-10">
        
        {/* Sidebar: Projects & Stats */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card p-8 bg-gradient-to-br from-slate-900/80 to-slate-950">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-0.5 shadow-lg shadow-violet-500/20">
                   <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-2xl font-black text-white">
                      {user?.displayName?.charAt(0) || 'U'}
                   </div>
                </div>
                <div>
                   <h3 className="font-black text-lg tracking-tight">{user?.displayName || 'Builder Pro'}</h3>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Client</p>
                </div>
             </div>
             
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">Construction Pipeline</h4>
                <div className="space-y-3">
                   {projects.length === 0 && <p className="text-sm text-slate-600 italic">No blueprints found.</p>}
                   {projects.map((p) => (
                     <button 
                       key={p.id}
                       onClick={() => setActiveProject(p)}
                       className={`w-full text-left p-5 rounded-2xl border transition-all duration-500 relative overflow-hidden group ${activeProject?.id === p.id ? 'bg-violet-600/10 border-violet-500/50 shadow-lg shadow-violet-500/10' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                     >
                       {activeProject?.id === p.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.8)]" />}
                       <p className={`font-black text-sm tracking-tight ${activeProject?.id === p.id ? 'text-white' : 'text-slate-400'}`}>Project #{p.id.substring(0,8).toUpperCase()}</p>
                       <p className="text-[9px] text-slate-500 mt-2 uppercase tracking-tighter font-black flex items-center gap-2 group-hover:text-slate-300 transition-colors">
                          <i className="bx bx-loader-circle animate-spin text-xs"></i> {p.stage} Phase
                       </p>
                     </button>
                   ))}
                </div>
             </div>
          </div>

          {/* Quick Stats Box */}
          <div className="glass-card p-6 border-white/5 bg-slate-900/20 overflow-hidden relative">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-6">Efficiency Pulse</h4>
             <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                   <p className="text-2xl font-black text-white">12</p>
                   <p className="text-[8px] text-slate-500 font-bold uppercase">Days Active</p>
                </div>
                <div className="text-center">
                   <p className="text-2xl font-black text-emerald-400">On Track</p>
                   <p className="text-[8px] text-slate-500 font-bold uppercase">Schedule</p>
                </div>
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
           
           {/* Progress Tracker Column */}
           <div className="md:col-span-2 space-y-8">
              {activeProject ? (
                <>
                <div className="glass-card p-10 bg-gradient-to-br from-slate-900/90 to-slate-950 border-white/5 relative group overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                      <i className="bx bx-buildings text-[12rem]"></i>
                   </div>
                   
                   <div className="relative z-10">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                         <div>
                            <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase leading-none">
                               Master Plan <span className="text-gradient">HUD</span>
                            </h2>
                            <p className="text-slate-500 font-medium">Monitoring real-time construction telemetry for {activeProject.builderName || 'Apex Structures'}.</p>
                         </div>
                         <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                            <span className="text-xs font-black uppercase tracking-widest">System Online</span>
                         </div>
                      </div>
                      
                      {/* Interactive Progress Bar */}
                      <div className="mb-12">
                         <div className="flex justify-between items-end mb-4">
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Build Integrity</p>
                               <p className="text-sm font-bold text-white uppercase">{activeProject.stage} Milestone</p>
                            </div>
                            <div className="text-right">
                               <p className="text-4xl font-black text-gradient leading-none">{activeProject.progress}%</p>
                            </div>
                         </div>
                         <div className="w-full h-5 bg-slate-900 rounded-2xl p-1 border border-white/5 inner-shadow">
                            <div 
                              className="h-full bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-1000 relative"
                              style={{ width: `${activeProject.progress}%` }}
                            >
                               <div className="absolute top-0 right-0 h-full w-24 bg-white/10 skew-x-[30deg] translate-x-12 blur-sm" />
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: 'Blueprints', value: activeProject.plotSize || '1500 sqft', icon: 'bx-shape-square' },
                          { label: 'Budget Cap', value: activeProject.budget || '₹40L - ₹60L', icon: 'bx-shield-quarter' },
                          { label: 'Structure', value: activeProject.bhk || '3 BHK Unit', icon: 'bx-home-alt' },
                          { label: 'Elevation', value: activeProject.floors || '2 Levels', icon: 'bx-layer' }
                        ].map((stat, i) => (
                          <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                             <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center mb-3">
                                <i className={`bx ${stat.icon} text-violet-500 text-lg`}></i>
                             </div>
                             <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">{stat.label}</p>
                             <p className="font-black text-sm text-white tracking-tight">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                {/* Tracking Timeline */}
                <div className="glass-card p-10">
                   <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter">Timeline <span className="text-gradient">Nodes</span></h3>
                   <div className="relative">
                      {/* Vertical line through timeline */}
                      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-800" />
                      
                      <div className="space-y-10">
                        {stages.map((s, i) => {
                          const activeIdx = stages.indexOf(activeProject.stage);
                          const isDone = i < activeIdx;
                          const isCurrent = i === activeIdx;

                          return (
                            <div key={i} className="flex items-center gap-8 group">
                               <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 z-10 transition-all duration-500 ${isDone ? 'bg-emerald-500 border-emerald-500 text-white animate-pulse-subtle' : isCurrent ? 'bg-slate-950 border-violet-500 text-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'bg-slate-950 border-slate-800 text-slate-800'}`}>
                                  {isDone ? <i className="bx bx-check text-2xl"></i> : <span className="text-sm font-black">{i + 1}</span>}
                               </div>
                               <div className="flex-1 glass-card p-6 border-white/5 hover:border-violet-500/20 group-hover:bg-white/5 transition-all">
                                  <div className="flex justify-between items-center">
                                     <h4 className={`font-black uppercase tracking-widest text-sm ${isDone ? 'text-slate-400' : isCurrent ? 'text-white' : 'text-slate-700'}`}>{s}</h4>
                                     <span className={`text-[9px] font-black px-3 py-1 rounded-full ${isDone ? 'bg-emerald-500/10 text-emerald-500' : isCurrent ? 'bg-violet-500/10 text-violet-500' : 'bg-slate-900 text-slate-700'}`}>
                                        {isDone ? 'SYNCED' : isCurrent ? 'OPERATIONAL' : 'PENDING'}
                                     </span>
                                  </div>
                                  <p className="text-xs text-slate-500 mt-2 font-medium">{isDone ? 'Milestone successfully cleared. Validation complete.' : isCurrent ? 'Active site activity detected. Syncing with builder...' : 'Waiting for prerequisite phase completion.'}</p>
                               </div>
                            </div>
                          );
                        })}
                      </div>
                   </div>
                </div>
                </>
              ) : (
                <div className="glass-card h-[700px] flex flex-col items-center justify-center text-center p-12 border-dashed border-white/5">
                   <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center mb-8 border border-white/5">
                      <i className="bx bx-atom text-5xl text-slate-700 animate-spin-slow"></i>
                   </div>
                   <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">No Active <span className="text-gradient">Core</span></h3>
                   <p className="text-slate-500 max-w-md font-medium leading-relaxed">System is idle. Initiate a construction project via the builder marketplace to activate HUD monitoring.</p>
                   <Link href="/builders" prefetch={false} className="btn-primary mt-10">Access Marketplace</Link>
                </div>
              )}
           </div>

           {/* Communications Terminal */}
           <div className="md:col-span-1">
              <div className="glass-card flex flex-col h-[800px] overflow-hidden sticky top-28 bg-slate-950/20 backdrop-blur-3xl border-white/5">
                 <div className="p-6 border-b border-white/5 bg-slate-900/40 flex items-center justify-between">
                    <div>
                       <h3 className="font-black text-xs uppercase tracking-widest text-slate-300">Comm Terminal</h3>
                       <div className="flex items-center gap-2 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Secure Link: Active</span>
                       </div>
                    </div>
                    <button className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-slate-500"><i className="bx bx-cog text-xl"></i></button>
                 </div>

                 {/* Chat Messages */}
                 <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {messages.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full text-center p-8">
                         <i className="bx bx-message-square-dots text-5xl text-slate-800 mb-4"></i>
                         <p className="text-xs text-slate-600 font-bold uppercase tracking-widest italic">Encrypted Secure Link Established. Waiting for transmission...</p>
                      </div>
                    )}
                    {messages.map((m, i) => (
                      <div key={i} className={`flex flex-col ${m.senderId === user?.uid ? 'items-end' : 'items-start'}`}>
                        <div className={`group relative max-w-[90%] p-4 rounded-3xl text-sm leading-relaxed ${m.senderId === user?.uid ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-tr-none shadow-lg shadow-violet-500/10' : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'}`}>
                           {m.text}
                           <div className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-slate-500 font-bold uppercase bg-slate-950 px-2 py-1 rounded-full border border-white/5 ${m.senderId === user?.uid ? '-left-16' : '-right-16'}`}>
                              {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </div>
                        </div>
                        <span className="text-[9px] text-slate-600 mt-2 font-black uppercase tracking-widest px-2">
                           {m.senderId === user?.uid ? 'ME' : m.senderName.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                 </div>

                 {/* Message Input */}
                 <form onSubmit={sendMessage} className="p-6 bg-slate-900/60 border-t border-white/5">
                    <div className="relative flex items-center">
                       <input 
                         type="text" 
                         placeholder="Enter transmission..." 
                         className="flex-1 bg-slate-950 border border-white/5 outline-none text-white py-4 pl-6 pr-16 rounded-2xl text-sm focus:border-violet-500/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all"
                         value={newMessage}
                         onChange={(e) => setNewMessage(e.target.value)}
                       />
                       <button type="submit" className="absolute right-2 w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all active:scale-95">
                          <i className="bx bxs-paper-plane text-xl"></i>
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}



