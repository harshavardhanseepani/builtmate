'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

import { BUILDERS_LIST, Builder } from '@/lib/buildersData';

export default function BuildersMarketplace() {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState<'ALL' | 'AVAILABLE' | 'BOOKED'>('ALL');
  const [activeContactBuilder, setActiveContactBuilder] = useState<Builder | null>(null);

  useEffect(() => {
    setBuilders(BUILDERS_LIST);
    setLoading(false);
  }, []);

  const filteredBuilders = builders.filter(b => {
    const matchesSearch = b.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterAvailability === 'AVAILABLE') return matchesSearch && b.available;
    if (filterAvailability === 'BOOKED') return matchesSearch && !b.available;
    return matchesSearch;
  });

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-[#faf9f6] bg-texture-luxury font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />
      
      {/* Background Glows */}
      <div className="glow-sphere top-0 left-1/4 w-[500px] h-[500px] bg-amber-400/10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none text-slate-900">
              Verified <span className="text-gradient-gold-rich">Architects</span>
            </h1>
            <p className="text-slate-600 max-w-lg font-normal text-sm md:text-base">
              Connect with top-rated construction experts to bring your AI-generated design to reality.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Availability Filter Tabs */}
            <div className="flex items-center gap-1 bg-white/90 p-1.5 rounded-2xl border border-amber-200/80 shadow-xs">
              <button
                type="button"
                onClick={() => setFilterAvailability('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${filterAvailability === 'ALL' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterAvailability('AVAILABLE')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${filterAvailability === 'AVAILABLE' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-50'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Available
              </button>
              <button
                type="button"
                onClick={() => setFilterAvailability('BOOKED')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${filterAvailability === 'BOOKED' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-800 hover:bg-amber-50'}`}
              >
                Booked
              </button>
            </div>

            <div className="glass-card-luxury flex items-center px-4 py-1.5 w-full sm:w-[320px] rounded-2xl shadow-md border-amber-200/80 bg-white/90">
              <i className="bx bx-search text-amber-600 mr-2 text-lg"></i>
              <input 
                type="text" 
                placeholder="Search location or company..." 
                className="bg-transparent border-none outline-none text-slate-900 w-full py-2 text-xs font-semibold placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             [1,2,3].map(n => <div key={n} className="glass-card h-96 animate-pulse"></div>)
          ) : (
            filteredBuilders.map((builder) => (
              <div key={builder.id} className="glass-card-luxury group hover:scale-[1.02] transition-all duration-500 overflow-hidden border border-amber-200/80 rounded-3xl bg-white/90 shadow-sm hover:shadow-xl flex flex-col justify-between">
                <div>
                  <div className="h-48 relative overflow-hidden bg-slate-100">
                    <img src={builder.image} alt={builder.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                    
                    {/* Star Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1.5 shadow-sm">
                      <i className="bx bxs-star text-amber-500 text-xs"></i>
                      <span className="text-xs font-black text-slate-900">{builder.rating}</span>
                    </div>

                    {/* Verified & Availability Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {builder.verified && (
                        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 px-2.5 py-1 rounded-lg shadow-md font-black text-[10px] uppercase tracking-wider flex items-center gap-1 w-fit">
                          <i className="bx bxs-badge-check text-sm"></i>
                          <span>Verified</span>
                        </div>
                      )}
                      
                      {/* Availability Indicator */}
                      <div className={`px-2.5 py-1 rounded-lg backdrop-blur-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit border shadow-md ${
                        builder.available 
                          ? 'bg-emerald-950/85 text-emerald-300 border-emerald-500/50' 
                          : 'bg-amber-950/85 text-amber-300 border-amber-500/50'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${builder.available ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                        <span>{builder.availabilityNote}</span>
                      </div>
                    </div>

                    {/* Builder Name at Bottom of Image */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-xs font-medium text-amber-300 uppercase tracking-widest">{builder.name} • Lead Architect</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white/60">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-800 transition-colors">{builder.company}</h3>
                      <p className="text-xs text-amber-700 font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                        <i className="bx bx-map text-amber-600 text-sm"></i> {builder.location}
                      </p>
                    </div>

                    {/* Contact Details Section */}
                    <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-3 mb-5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium flex items-center gap-1.5">
                          <i className="bx bx-phone text-amber-600"></i> Phone:
                        </span>
                        <a 
                          href={`tel:${builder.phone}`} 
                          className="font-bold text-slate-800 hover:text-amber-700 hover:underline transition-colors"
                        >
                          {builder.phone}
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium flex items-center gap-1.5">
                          <i className="bx bx-envelope text-amber-600"></i> Email:
                        </span>
                        <a 
                          href={`mailto:${builder.email}`} 
                          className="font-bold text-slate-800 hover:text-amber-700 hover:underline transition-colors truncate max-w-[170px]"
                          title={builder.email}
                        >
                          {builder.email}
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                         <p className="text-slate-900 text-base font-black">{builder.projects}</p>
                         <p>Completed</p>
                      </div>
                      <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                         <p className="text-slate-900 text-base font-black">{builder.experience}</p>
                         <p>Experience</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 bg-white/60">
                  <div className="flex flex-col gap-2.5">
                    <Link href={`/builder/${builder.id}`} prefetch={false} className="w-full btn-primary text-center text-xs py-3 shadow-md font-black uppercase tracking-wider">
                      Select Builder
                    </Link>
                    <div className="grid grid-cols-2 gap-2.5">
                      <Link href={`/builder/${builder.id}`} prefetch={false} className="btn-secondary text-center text-xs py-2.5 font-bold">
                        View Profile
                      </Link>
                      <button 
                        type="button"
                        onClick={() => setActiveContactBuilder(builder)}
                        className="btn-secondary text-center text-xs py-2.5 font-bold flex items-center justify-center gap-1 cursor-pointer hover:border-amber-400"
                      >
                        <i className="bx bx-phone-call text-amber-600"></i> Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Builder Quick Contact Modal */}
        {activeContactBuilder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full border border-amber-200 p-7 shadow-2xl relative">
              <button 
                onClick={() => setActiveContactBuilder(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <i className="bx bx-x text-xl"></i>
              </button>

              <div className="flex items-center gap-4 mb-5">
                <img 
                  src={activeContactBuilder.image} 
                  alt={activeContactBuilder.company} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-300"
                />
                <div>
                  <h3 className="text-lg font-black text-slate-900">{activeContactBuilder.company}</h3>
                  <p className="text-xs text-amber-700 font-bold uppercase">{activeContactBuilder.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{activeContactBuilder.location}</p>
                </div>
              </div>

              {/* Status Pill */}
              <div className={`p-3 rounded-2xl mb-5 flex items-center justify-between text-xs font-bold ${
                activeContactBuilder.available 
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                  : 'bg-amber-50 border border-amber-200 text-amber-800'
              }`}>
                <span className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeContactBuilder.available ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  Availability Status:
                </span>
                <span>{activeContactBuilder.availabilityNote}</span>
              </div>

              {/* Direct Action Buttons */}
              <div className="space-y-3">
                <a 
                  href={`tel:${activeContactBuilder.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all cursor-pointer"
                >
                  <i className="bx bx-phone-call text-base"></i>
                  Call Directly: {activeContactBuilder.phone}
                </a>

                <a 
                  href={`mailto:${activeContactBuilder.email}?subject=Project%20Inquiry%20via%20BuildMate`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-slate-200"
                >
                  <i className="bx bx-envelope text-base text-amber-600"></i>
                  Email: {activeContactBuilder.email}
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                <Link 
                  href={`/builder/${activeContactBuilder.id}`}
                  onClick={() => setActiveContactBuilder(null)}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline"
                >
                  View Full Portfolio & Verified Credentials &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
