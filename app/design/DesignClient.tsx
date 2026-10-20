'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AdvancedViewer from '@/components/3d/AdvancedViewer';
import FloorPlan2D from '@/components/3d/FloorPlan2D';
import CostEstimate from '@/components/3d/CostEstimate';
import { generateHouseLayout } from '@/components/3d/layoutGenerator';

const Toggle = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => {
  const isYes = value === 'Yes';
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-slate-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(isYes ? 'No' : 'Yes')}
        className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
          isYes ? 'bg-gradient-to-r from-amber-500 to-yellow-500 shadow-sm' : 'bg-slate-300'
        }`}
      >
        <span className={`absolute text-[9px] font-black ${isYes ? 'text-slate-950 left-2' : 'text-slate-600 right-2'}`}>{value}</span>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isYes ? 'translate-x-7' : 'translate-x-0'}`}></div>
      </button>
    </div>
  );
};

export default function DesignStudioContent() {
  const [specs, setSpecs] = useState({
    plotSize: '30x40',
    floors: '2',
    budgetTier: 'Premium',
    targetBudget: '₹40L - ₹65L',
    bedrooms: '3',
    bathrooms: '3',
    livingRoom: '1',
    kitchen: '1',
    dining: '1',
    balcony: 'Yes',
    parking: 'Yes',
    garden: 'Yes',
    terrace: 'Yes',
    pooja: 'No',
    study: 'No',
    utility: 'No',
    staircase: 'Internal',
    exteriorStyle: 'Modern',
    interiorStyle: 'Luxury',
    wallColor: '#f8fafc',
    seed: 0,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [viewMode, setViewMode] = useState<string>('EXTERIOR'); // EXTERIOR | INTERIOR | CUTAWAY | FLOOR_PLAN | COST
  const [activeFloor, setActiveFloor] = useState<number | 'ALL'>('ALL');
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [explodedView, setExplodedView] = useState(false);
  const [resetCameraSignal, setResetCameraSignal] = useState(0);
  const [generationError, setGenerationError] = useState<any>(false);

  const houseSpec = useMemo(() => hasGenerated ? generateHouseLayout(specs) : null, [specs, hasGenerated]);

  const estimatedCost = useMemo(() => {
    let w = 30, l = 40;
    if (specs.plotSize) {
      const parts = specs.plotSize.split('x');
      w = parseInt(parts[0]) || 30;
      l = parseInt(parts[1]) || 40;
    }
    const numFloors = parseInt(specs.floors) || 1;
    const builtUpSqft = Math.round(w * l * 0.75 * numFloors);
    
    let rate = 2200; // default premium
    if (specs.budgetTier === 'Economy') rate = 1750;
    if (specs.budgetTier === 'Luxury') rate = 2850;
    if (specs.budgetTier === 'Ultra') rate = 3600;

    const totalCost = builtUpSqft * rate;
    const lakhs = (totalCost / 100000).toFixed(1);
    return {
      builtUpSqft,
      rate,
      lakhs,
      civilCost: (totalCost * 0.48 / 100000).toFixed(1),
      finishCost: (totalCost * 0.32 / 100000).toFixed(1),
      mepCost: (totalCost * 0.20 / 100000).toFixed(1),
    };
  }, [specs.plotSize, specs.floors, specs.budgetTier]);

  const updateSpec = (key: string, value: any) => {
    setSpecs(s => ({ ...s, [key]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationError(null);
    
    // Give multiple models by varying the seed
    updateSpec('seed', Math.random());
    
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setViewMode('EXTERIOR');
      setActiveRoomId(null);
    }, 2000);
  };

  const inputClass = "w-full bg-amber-50/50 border border-amber-200/80 rounded-xl px-4 py-2 text-sm font-bold text-slate-900 focus:border-amber-500 focus:outline-none";
  const selectClass = "w-full bg-amber-50/50 border border-amber-200/80 rounded-xl px-4 py-2 text-sm font-bold text-slate-900 appearance-none focus:border-amber-500 focus:outline-none";
  const labelClass = "block text-[10px] font-bold text-amber-800/90 mb-2 uppercase tracking-wider";

  return (
    <main className="min-h-screen pt-24 bg-[#faf9f6] bg-texture-luxury pb-20 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <div className="max-w-[1800px] mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* User Requirements Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 space-y-6 sticky top-24 max-h-[85vh] overflow-y-auto custom-scrollbar border border-amber-200/80 shadow-[0_10px_35px_rgba(212,175,55,0.08)]">
              <div className="flex items-center gap-3 mb-2">
                <i className="bx bx-home-heart text-2xl text-amber-600"></i>
                <h2 className="font-display text-lg font-bold text-slate-900">House Requirements</h2>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className={labelClass}>Plot Size (ft)</span>
                  <span className={labelClass}>Floors</span>
                </div>
                <div className="flex gap-2 items-center">
                  <select className={selectClass} value={specs.plotSize} onChange={e => updateSpec('plotSize', e.target.value)}>
                    <option value="20x30">20x30 (600 sqft)</option>
                    <option value="30x40">30x40 (1200 sqft)</option>
                    <option value="30x50">30x50 (1500 sqft)</option>
                    <option value="40x60">40x60 (2400 sqft)</option>
                    <option value="50x80">50x80 (4000 sqft)</option>
                  </select>
                  <div className="w-4"></div>
                  <select className={selectClass} value={specs.floors} onChange={e => updateSpec('floors', e.target.value)}>
                    {['1','2','3','4'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Construction Budget Option */}
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/90 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className={labelClass}>Construction Budget</span>
                  <span className="text-xs font-black text-amber-900 bg-white px-2 py-0.5 rounded-md border border-amber-200 shadow-xs">
                    Est. ~₹{estimatedCost.lakhs} Lakhs
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { id: 'Economy', name: 'Economy', range: '₹25L - ₹40L', rate: '₹1,750/sqft' },
                    { id: 'Premium', name: 'Premium', range: '₹40L - ₹65L', rate: '₹2,200/sqft' },
                    { id: 'Luxury', name: 'Luxury', range: '₹65L - ₹95L', rate: '₹2,850/sqft' },
                    { id: 'Ultra', name: 'Ultra Luxury', range: '₹1 Cr+', rate: '₹3,600/sqft' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => updateSpec('budgetTier', tier.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        specs.budgetTier === tier.id
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold border-amber-600 shadow-sm'
                          : 'bg-white border-amber-200/70 text-slate-700 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{tier.name}</div>
                      <div className={`text-[10px] ${specs.budgetTier === tier.id ? 'text-slate-950 font-semibold' : 'text-amber-800'}`}>
                        {tier.range}
                      </div>
                      <div className={`text-[9px] ${specs.budgetTier === tier.id ? 'text-slate-900' : 'text-slate-400'}`}>
                        {tier.rate}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Built-up: <strong className="text-slate-800">{estimatedCost.builtUpSqft} sqft</strong></span>
                  <span>Civil: <strong>₹{estimatedCost.civilCost}L</strong> • Finish: <strong>₹{estimatedCost.finishCost}L</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className={labelClass}>Bedrooms</span>
                  <select className={selectClass} value={specs.bedrooms} onChange={e => updateSpec('bedrooms', e.target.value)}>
                    {['1','2','3','4','5'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <span className={labelClass}>Bathrooms</span>
                  <select className={selectClass} value={specs.bathrooms} onChange={e => updateSpec('bathrooms', e.target.value)}>
                    {['1','2','3','4','5'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2">
                <Toggle label="Parking" value={specs.parking} onChange={v => updateSpec('parking', v)} />
                <Toggle label="Garden" value={specs.garden} onChange={v => updateSpec('garden', v)} />
                <Toggle label="Balcony" value={specs.balcony} onChange={v => updateSpec('balcony', v)} />
                <Toggle label="Terrace" value={specs.terrace} onChange={v => updateSpec('terrace', v)} />
                <Toggle label="Pooja Room" value={specs.pooja} onChange={v => updateSpec('pooja', v)} />
                <Toggle label="Study Room" value={specs.study} onChange={v => updateSpec('study', v)} />
              </div>

              <div className="pt-2">
                <span className={labelClass}>Exterior Architectural Style</span>
                <select className={selectClass} value={specs.exteriorStyle} onChange={e => updateSpec('exteriorStyle', e.target.value)}>
                  <option value="Modern">Modern Villa (Cantilever & Wood)</option>
                  <option value="Traditional">Traditional Indian (Sloped Roof)</option>
                  <option value="Luxury">Luxury Mansion (Marble & Gold)</option>
                  <option value="Industrial">Industrial Loft (Concrete & Steel)</option>
                  <option value="Minimalist">Minimalist Box (Monochrome)</option>
                </select>
              </div>

              <div>
                <span className={labelClass}>House Exterior Paint Color</span>
                <div className="flex items-center gap-2 mt-1.5 overflow-x-auto pb-1">
                  {[
                    { name: 'Stucco White', color: '#f8fafc' },
                    { name: 'Warm Cream', color: '#fdfbf7' },
                    { name: 'Terracotta', color: '#991b1b' },
                    { name: 'Slate Grey', color: '#475569' },
                    { name: 'Soft Peach', color: '#ffedd5' },
                    { name: 'Sage Green', color: '#dcfce7' },
                    { name: 'Charcoal', color: '#1e293b' },
                  ].map((c) => (
                    <button
                      key={c.color}
                      type="button"
                      title={c.name}
                      onClick={() => updateSpec('wallColor', c.color)}
                      className={`w-7 h-7 rounded-full border-2 transition-all shrink-0 ${
                        specs.wallColor === c.color ? 'border-amber-500 scale-110 shadow-md ring-2 ring-amber-500/40' : 'border-slate-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className={labelClass}>Interior Vibe</span>
                <select className={selectClass} value={specs.interiorStyle} onChange={e => updateSpec('interiorStyle', e.target.value)}>
                  {['Luxury', 'Modern', 'Traditional', 'Industrial', 'Minimal'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-slate-950 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-amber-500/20 mt-4 transition-all cursor-pointer"
              >
                {isGenerating ? (
                  <i className="bx bx-loader-alt animate-spin text-xl"></i>
                ) : (
                  <>
                    <i className="bx bx-sparkles text-lg"></i>
                    Generate Design
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Viewport */}
          <div className="lg:col-span-9 flex flex-col gap-4 relative">
            {isGenerating && !hasGenerated ? (
              <div className="glass-card-luxury bg-white/85 border border-amber-200/80 rounded-3xl shadow-xl h-[700px] flex flex-col items-center justify-center text-center p-20 animate-pulse">
                <i className="bx bx-buildings text-6xl text-amber-600 animate-spin-slow mb-6"></i>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter text-slate-900">Building 3D Structure...</h3>
                <p className="text-slate-600">Generating {specs.exteriorStyle} exterior and {specs.interiorStyle} interior tailored for {specs.budgetTier} budget (~₹{estimatedCost.lakhs}L)...</p>
              </div>
            ) : generationError ? (
              <div className="glass-card-luxury bg-white/85 border border-rose-300 rounded-3xl shadow-xl h-[700px] flex flex-col items-center justify-center text-center p-20">
                <i className="bx bx-error text-6xl text-rose-500 mb-6"></i>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter text-slate-900">Design generation failed.</h3>
                <button onClick={handleGenerate} className="mt-4 px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-lg font-bold shadow-md">RETRY</button>
              </div>
            ) : hasGenerated && houseSpec ? (
              <>
                {/* Top Toolbar */}
                <div className="flex bg-white/95 rounded-full p-2 border border-amber-200/80 gap-2 overflow-x-auto w-max mx-auto shadow-xl backdrop-blur-md mb-6 mt-2">
                  <button onClick={() => { setViewMode('EXTERIOR'); setExplodedView(false); }} className={`flex items-center gap-2 py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'EXTERIOR' ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/60'}`}>
                    <i className="bx bx-buildings"></i> EXTERIOR
                  </button>
                  <button onClick={() => { setViewMode('INTERIOR'); setExplodedView(false); }} className={`flex items-center gap-2 py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'INTERIOR' ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/60'}`}>
                    <i className="bx bx-sun"></i> VIEW INTERIOR
                  </button>
                  <button onClick={() => { setViewMode('CUTAWAY'); setExplodedView(false); setActiveRoomId(null); }} className={`flex items-center gap-2 py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'CUTAWAY' ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/60'}`}>
                    <i className="bx bx-layer"></i> 3D CUTAWAY PLAN
                  </button>
                  <button onClick={() => { setViewMode('FLOOR_PLAN'); setExplodedView(false); }} className={`flex items-center gap-2 py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'FLOOR_PLAN' ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/60'}`}>
                    <i className="bx bx-map-alt"></i> FLOOR PLAN
                  </button>
                </div>

                {/* Viewport */}
                <div className="h-[650px] w-full relative rounded-3xl overflow-hidden border border-amber-200/80 shadow-2xl bg-[#0b0e14]">
                  {/* Re-generation overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl animate-fade-in">
                      <i className="bx bx-loader-alt animate-spin text-5xl text-amber-600 mb-4"></i>
                      <p className="text-slate-950 font-bold tracking-widest uppercase text-sm animate-pulse">Redesigning...</p>
                    </div>
                  )}

                  {(viewMode === 'EXTERIOR' || viewMode === 'INTERIOR' || viewMode === 'CUTAWAY') && (
                     <>
                       {/* Floating UI over 3D Canvas - Left Tools */}
                       <div className="absolute top-1/2 -translate-y-1/2 left-6 z-10 flex flex-col gap-2">
                          <div className="bg-white/95 p-2 rounded-2xl border border-amber-200/80 shadow-2xl backdrop-blur-md flex flex-col items-center gap-4 py-4">
                            <button className="flex flex-col items-center gap-1 text-slate-600 hover:text-amber-700 group cursor-pointer">
                              <i className="bx bx-revision text-xl group-active:-rotate-90 transition-transform"></i>
                              <span className="text-[8px] font-bold uppercase">Rotate</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-slate-600 hover:text-amber-700 group cursor-pointer">
                              <i className="bx bx-search-alt-2 text-xl group-active:scale-90 transition-transform"></i>
                              <span className="text-[8px] font-bold uppercase">Zoom</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-slate-600 hover:text-amber-700 group cursor-pointer">
                              <i className="bx bx-hand text-xl group-active:scale-90 transition-transform"></i>
                              <span className="text-[8px] font-bold uppercase">Pan</span>
                            </button>
                            <button onClick={() => { setViewMode('EXTERIOR'); setResetCameraSignal(Date.now()); setExplodedView(false); }} className="flex flex-col items-center gap-1 text-slate-600 hover:text-amber-700 group cursor-pointer">
                              <i className="bx bx-reset text-xl group-active:-rotate-180 transition-transform"></i>
                              <span className="text-[8px] font-bold uppercase">Reset</span>
                            </button>
                            
                            <div className="w-8 h-[1px] bg-amber-200/80 my-1"></div>
                            
                            <button onClick={() => setViewMode('CUTAWAY')} className={`flex flex-col items-center gap-1 ${viewMode === 'CUTAWAY' ? 'text-amber-600 font-bold' : 'text-slate-600 hover:text-amber-700'} group cursor-pointer`}>
                              <i className={`bx ${viewMode === 'CUTAWAY' ? 'bx-show' : 'bx-hide'} text-xl group-active:scale-90 transition-transform`}></i>
                              <span className="text-[8px] font-bold uppercase text-center leading-tight">Hide<br/>Roof</span>
                            </button>
                            <button onClick={() => setViewMode('FLOOR_PLAN')} className="flex flex-col items-center gap-1 text-slate-600 hover:text-amber-700 group cursor-pointer">
                              <i className="bx bx-cube-alt text-xl group-active:scale-90 transition-transform"></i>
                              <span className="text-[8px] font-bold uppercase text-center leading-tight">Hide<br/>Walls</span>
                            </button>
                          </div>
                       </div>

                       {/* Right Top Tools */}
                       <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 items-end">
                         {/* Live Estimated Budget Pill */}
                         <div className="flex bg-white/95 px-4 py-2 rounded-full border border-amber-200/80 shadow-2xl backdrop-blur-md items-center gap-2 mb-1">
                           <i className="bx bx-rupee text-amber-600 font-bold text-base"></i>
                           <span className="text-[11px] font-bold text-slate-800">
                             Est. Budget: <span className="text-amber-800 font-black">₹{estimatedCost.lakhs}L</span>
                           </span>
                           <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 font-bold">
                             {specs.budgetTier} Tier
                           </span>
                         </div>
                         {viewMode === 'CUTAWAY' && (
                           <div className="flex bg-white/95 p-1.5 rounded-full border border-amber-200/80 shadow-2xl backdrop-blur-md mb-2">
                              <button onClick={() => setActiveFloor('ALL')} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase mx-0.5 transition-all ${activeFloor === 'ALL' ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50'}`}>All Floors</button>
                              {Array.from({ length: houseSpec.floors }).map((_, i) => (
                                <button key={i} onClick={() => setActiveFloor(i)} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase mx-0.5 transition-all ${activeFloor === i ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50'}`}>Floor {i+1}</button>
                              ))}
                           </div>
                         )}

                         {(viewMode === 'EXTERIOR' || viewMode === 'CUTAWAY') && (
                           <button 
                             onClick={() => setExplodedView(!explodedView)} 
                             className={`px-6 py-3 rounded-full text-[10px] font-black uppercase border shadow-2xl backdrop-blur-md transition-all cursor-pointer ${explodedView ? 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-500 text-slate-950 font-bold' : 'bg-white/95 border-amber-200/80 text-slate-700 hover:text-slate-900 hover:border-amber-300'}`}
                           >
                             <i className={`bx ${explodedView ? 'bx-collapse' : 'bx-expand'} mr-2`}></i>
                             {explodedView ? 'Assemble House' : 'Exploded View'}
                           </button>
                         )}
                       </div>

                       <AdvancedViewer 
                         specs={specs} 
                         viewMode={viewMode} 
                         activeFloor={activeFloor} 
                         activeRoomId={activeRoomId} 
                         resetCameraSignal={resetCameraSignal}
                         explodedView={explodedView}
                         onRoomClick={(id) => {
                            setActiveRoomId(id);
                            setViewMode('INTERIOR');
                            setExplodedView(false);
                         }}
                       />
                     </>
                  )}
                  
                  {viewMode === 'FLOOR_PLAN' && <FloorPlan2D specs={specs} />}
                </div>

                {/* Bottom Interior Previews */}
                <div className="bg-white/90 rounded-3xl border border-amber-200/80 p-6 backdrop-blur-md mt-4 shadow-xl">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <i className="bx bx-door-open text-amber-600 text-base"></i>
                    Interior Previews
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                     {houseSpec.rooms.filter(r => !['Balcony', 'Terrace'].includes(r.type)).map((room, i) => (
                       <button
                         key={room.id}
                         onClick={() => {
                            setActiveFloor(room.level);
                            setActiveRoomId(room.id);
                            setViewMode('INTERIOR');
                            setExplodedView(false);
                         }}
                         className={`flex-shrink-0 w-44 text-center p-2 rounded-2xl border transition-all relative overflow-hidden group cursor-pointer ${
                           activeRoomId === room.id && viewMode === 'INTERIOR'
                             ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-500/20' 
                             : 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/40'
                         }`}
                       >
                          <div className="h-24 bg-gradient-to-b from-slate-100 to-amber-50/30 rounded-xl mb-3 overflow-hidden flex items-center justify-center relative border border-slate-200/60">
                            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-10"></div>
                            <i className={`bx ${room.type === 'Kitchen' ? 'bx-fridge' : room.type === 'Bathroom' ? 'bx-bath' : room.type.includes('Bedroom') ? 'bx-bed' : 'bx-sofa'} text-5xl z-0 ${activeRoomId === room.id && viewMode === 'INTERIOR' ? 'text-amber-600' : 'text-slate-400'}`}></i>
                            <div className="absolute bottom-2 left-0 w-full z-20">
                              <h4 className={`text-[11px] font-bold ${activeRoomId === room.id && viewMode === 'INTERIOR' ? 'text-amber-900' : 'text-slate-700'}`}>{room.name}</h4>
                            </div>
                          </div>
                       </button>
                     ))}
                  </div>
                </div>

              </>
            ) : (
              <div className="glass-card-luxury bg-white/85 border border-dashed border-amber-200/80 rounded-3xl h-[700px] flex flex-col items-center justify-center text-center p-20 shadow-xl">
                <i className="bx bx-home-alt-2 text-6xl text-amber-500/60 mb-6"></i>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter text-slate-900">Ready to <span className="text-gradient-gold-rich">Generate</span></h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

