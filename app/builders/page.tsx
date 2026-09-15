'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function BuildersMarketplace() {
  const [builders, setBuilders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const MOCK_BUILDERS = [
    { id: '1', name: 'Ramesh Singh', company: 'Apex Constructions', location: 'Mumbai, MH', projects: 45, experience: '12 Yrs', rating: 4.8, verified: true, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800' },
    { id: '2', name: 'Arjun Reddy', company: 'BuildPro Solutions', location: 'Hyderabad, TS', projects: 120, experience: '18 Yrs', rating: 4.9, verified: true, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: '3', name: 'Priya Sharma', company: 'Sharma Architects', location: 'Bangalore, KA', projects: 32, experience: '8 Yrs', rating: 4.7, verified: true, image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800' },
    { id: '4', name: 'Vijay Kumar', company: 'VK Suppliers', location: 'Chennai, TN', projects: 85, experience: '15 Yrs', rating: 4.6, verified: true, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' },
    { id: '5', name: 'Sneha Patel', company: 'Patel Builders', location: 'Ahmedabad, GJ', projects: 60, experience: '10 Yrs', rating: 4.9, verified: true, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800' },
    { id: '6', name: 'David Fernandez', company: 'Urban Heights', location: 'Goa, GA', projects: 25, experience: '7 Yrs', rating: 4.5, verified: true, image: 'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&q=80&w=800' },
    { id: '7', name: 'Amit Desai', company: 'Desai Infrastructures', location: 'Pune, MH', projects: 200, experience: '22 Yrs', rating: 4.8, verified: true, image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=800' },
    { id: '8', name: 'Neha Gupta', company: 'GreenSpace Developers', location: 'Delhi, DL', projects: 55, experience: '9 Yrs', rating: 4.7, verified: true, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
    { id: '9', name: 'Rahul Verma', company: 'Verma Constructors', location: 'Lucknow, UP', projects: 40, experience: '14 Yrs', rating: 4.6, verified: false, image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800' },
    { id: '10', name: 'Karthik Rajan', company: 'Rajan Civil Works', location: 'Kochi, KL', projects: 75, experience: '11 Yrs', rating: 4.9, verified: true, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800' }
  ];

  useEffect(() => {
    setBuilders(MOCK_BUILDERS);
    setLoading(false);
  }, []);

  const filteredBuilders = builders.filter(b => 
    b.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-24 pb-12 px-6 bg-slate-950">
      <Navbar />
      
      {/* Background Glows */}
      <div className="glow-sphere top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
              Verified <span className="text-gradient">Architects</span>
            </h1>
            <p className="text-slate-500 max-w-lg font-medium italic">
              Connect with top-rated construction experts to bring your AI-generated design to reality.
            </p>
          </div>
          <div className="glass-card flex items-center px-6 py-2 w-full md:w-[400px]">
            <i className="bx bx-search text-slate-500 mr-4 text-xl"></i>
            <input 
              type="text" 
              placeholder="Search by location or company..." 
              className="bg-transparent border-none outline-none text-white w-full py-4 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             [1,2,3].map(n => <div key={n} className="glass-card h-96 animate-pulse"></div>)
          ) : (
            filteredBuilders.map((builder) => (
              <div key={builder.id} className="glass-card group hover:scale-[1.02] transition-all duration-500 overflow-hidden border-white/5">
                <div className="h-48 relative overflow-hidden">
                  <img src={builder.image} alt={builder.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <i className="bx bxs-star text-yellow-500"></i>
                    <span className="text-xs font-black">{builder.rating}</span>
                  </div>
                  {builder.verified && (
                    <div className="absolute top-4 left-4 bg-violet-500 text-white p-1.5 rounded-lg shadow-lg">
                       <i className="bx bxs-badge-check text-xl"></i>
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-1 tracking-tight group-hover:text-violet-400 transition-colors">{builder.company}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                      <i className="bx bx-map text-sm"></i> {builder.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8 text-center text-[10px] font-bold uppercase tracking-tighter text-slate-500">
                    <div className="bg-white/5 p-3 rounded-2xl">
                       <p className="text-white text-lg font-black">{builder.projects}</p>
                       <p>Projects</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl">
                       <p className="text-white text-lg font-black">{builder.experience}</p>
                       <p>Experience</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link href={`/builder/${builder.id}`} prefetch={false} className="w-full btn-primary text-center text-sm py-4">
                      Select Builder
                    </Link>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href={`/builder/${builder.id}`} prefetch={false} className="btn-secondary text-center text-xs py-3.5">
                        Profile
                      </Link>
                      <button className="btn-secondary text-center text-xs py-3.5">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
