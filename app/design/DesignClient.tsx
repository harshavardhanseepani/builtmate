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
      <span className="text-xs font-bold text-slate-300">{label}</span>
      <button
        type="button"
        onClick={() => onChange(isYes ? 'No' : 'Yes')}
        className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
          isYes ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-slate-700'
        }`}
      >
        <span className={`absolute text-[9px] font-black text-white top-1.5 ${isYes ? 'left-2' : 'right-2'}`}>{value}</span>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isYes ? 'translate-x-7' : 'translate-x-0'}`}></div>
      </button>
    </div>
  );
};

export default function DesignStudioContent() {
  const [specs, setSpecs] = useState({
    plotSize: '30x40',
    floors: '2',
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
    seed: 0,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [viewMode, setViewMode] = useState<string>('EXTERIOR'); // EXTERIOR | INTERIOR | CUTAWAY | FLOOR_PLAN | COST
  const [activeFloor, setActiveFloor] = useState<number | 'ALL'>('ALL');
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [explodedView, setExplodedView] = useState(false);
  const [resetCameraSignal, setResetCameraSignal] = useState(0);
  const [generationError, setGenerationError] = useState<any>(false);

  const houseSpec = useMemo(() => hasGenerated ? generateHouseLayout(specs) : null, [specs, hasGenerated]);

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

  const inputClass = "w-full bg-[#0a0f1c] border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-white focus:border-blue-500 focus:outline-none";
  const selectClass = "w-full bg-[#0a0f1c] border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-white appearance-none focus:border-blue-500 focus:outline-none";
  const labelClass = "block text-[10px] font-bold text-slate-400 mb-2";

  return (
    <main className="min-h-screen pt-24 bg-[#050810] pb-20 font-sans">
      <Navbar />

      <div className="max-w-[1800px] mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* User Requirements Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-[#0f1525] rounded-3xl p-6 space-y-6 sticky top-24 max-h-[85vh] overflow-y-auto custom-scrollbar border border-white/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <i className="bx bx-home-heart text-2xl text-blue-500"></i>
                <h2 className="text-lg font-bold text-white">House Requirements</h2>
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
                <span className={labelClass}>Exterior Architecture</span>
                <select className={selectClass} value={specs.exteriorStyle} onChange={e => updateSpec('exteriorStyle', e.target.value)}>
                  {['Modern', 'Traditional', 'Contemporary', 'Industrial'].map(o => <option key={o}>{o}</option>)}
                </select>
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
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-500/20 mt-4 transition-all"
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
              <div className="glass-card h-[700px] flex flex-col items-center justify-center text-center p-20 animate-pulse border-indigo-500/20">
                <i className="bx bx-buildings text-6xl text-indigo-500 animate-spin-slow mb-6"></i>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Building 3D Structure...</h3>
                <p className="text-slate-500">Generating {specs.exteriorStyle} exterior and {specs.interiorStyle} interior...</p>
              </div>
            ) : generationError ? (
              <div className="glass-card h-[700px] flex flex-col items-center justify-center text-center p-20 border-red-500/20">
                <i className="bx bx-error text-6xl text-red-500 mb-6"></i>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Design generation failed.</h3>
                <button onClick={handleGenerate} className="mt-4 px-6 py-2 bg-red-600 rounded-lg font-bold">RETRY</button>
              </div>
            ) : hasGenerated && houseSpec ? (
              <>
                {/* Top Toolbar */}
                <div className="flex bg-slate-900/60 rounded-full p-2 border border-white/5 gap-2 overflow-x-auto w-max mx-auto shadow-xl backdrop-blur-md mb-6 mt-2">
                  <button onClick={() => { setViewMode('EXTERIOR'); setExplodedView(false); }} className={`flex items-center gap-2 py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'EXTERIOR' ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-white/5'}`}>
                    <i className="bx bx-buildings"></i> EXTERIOR
                  </button>
                  <button onClick={() => { setViewMode('INTERIOR'); setExplodedView(false); }} className={`flex items-center gap-2 py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'INTERIOR' ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-white/5'}`}>
                    <i className="bx bx-sun"></i> VIEW INTERIOR
                  </button>
                  <button onClick={() => { setViewMode('CUTAWAY'); setExplodedView(false); }} className={`flex items-center gap-2 py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'CUTAWAY' ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-white/5'}`}>
                    <i className="bx bx-layer"></i> CUTAWAY VIEW
                  </button>
                  <button onClick={() => { setViewMode('FLOOR_PLAN'); setExplodedView(false); }} className={`flex items-center gap-2 py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'FLOOR_PLAN' ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-white/5'}`}>
                    <i className="bx bx-map-alt"></i> FLOOR PLAN
                  </button>
                </div>

                {/* Viewport */}
                <div className="h-[650px] w-full relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-black">
                  {/* Re-generation overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl animate-fade-in">
                      <i className="bx bx-loader-alt animate-spin text-5xl text-blue-500 mb-4"></i>
                      <p className="text-white font-bold tracking-widest uppercase text-sm animate-pulse">Redesigning...</p>
                    </div>
                  )}

                  {(viewMode === 'EXTERIOR' || viewMode === 'INTERIOR' || viewMode === 'CUTAWAY') && (
                     <>
                       {/* Floating UI over 3D Canvas - Left Tools */}
                       <div className="absolute top-1/2 -translate-y-1/2 left-6 z-10 flex flex-col gap-2">
                          <div className="bg-slate-900/80 p-2 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md flex flex-col items-center gap-4 py-4">
                            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white group">
                              <i className="bx bx-revision text-xl group-active:-rotate-90 transition-transform"></i>
                              <span className="text-[8px] font-bold uppercase">Rotate</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white group">
                              <i className="bx bx-search-alt-2 text-xl group-active:scale-90 transition-transform"></i>
                              <span className="text-[8px] font-bold uppercase">Zoom</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white group">
                              <i className="bx bx-hand text-xl group-active:scale-90 transition-transform"></i>
                              <span className="text-[8px] font-bold uppercase">Pan</span>
                            </button>
                            <button onClick={() => { setViewMode('EXTERIOR'); setResetCameraSignal(Date.now()); setExplodedView(false); }} className="flex flex-col items-center gap-1 text-slate-400 hover:text-white group">
                              <i className="bx bx-reset text-xl group-active:-rotate-180 transition-transform"></i>
                              <span className="text-[8px] font-bold uppercase">Reset</span>
                            </button>
                            
                            <div className="w-8 h-[1px] bg-white/10 my-1"></div>
                            
                            <button onClick={() => setViewMode('CUTAWAY')} className={`flex flex-col items-center gap-1 ${viewMode === 'CUTAWAY' ? 'text-blue-400' : 'text-slate-400 hover:text-white'} group`}>
                              <i className={`bx ${viewMode === 'CUTAWAY' ? 'bx-show' : 'bx-hide'} text-xl group-active:scale-90 transition-transform`}></i>
                              <span className="text-[8px] font-bold uppercase text-center leading-tight">Hide<br/>Roof</span>
                            </button>
                            <button onClick={() => setViewMode('FLOOR_PLAN')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-white group">
                              <i className="bx bx-cube-alt text-xl group-active:scale-90 transition-transform"></i>
                              <span className="text-[8px] font-bold uppercase text-center leading-tight">Hide<br/>Walls</span>
                            </button>
                          </div>
                       </div>

                       {/* Right Top Tools */}
                       <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 items-end">
                         {viewMode === 'CUTAWAY' && (
                           <div className="flex bg-slate-900/80 p-1.5 rounded-full border border-white/10 shadow-2xl backdrop-blur-md mb-2">
                              <button onClick={() => setActiveFloor('ALL')} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase mx-0.5 transition-all ${activeFloor === 'ALL' ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' : 'text-slate-400 hover:bg-white/10'}`}>All Floors</button>
                              {Array.from({ length: houseSpec.floors }).map((_, i) => (
                                <button key={i} onClick={() => setActiveFloor(i)} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase mx-0.5 transition-all ${activeFloor === i ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white' : 'text-slate-400 hover:bg-white/10'}`}>Floor {i+1}</button>
                              ))}
                           </div>
                         )}

                         {(viewMode === 'EXTERIOR' || viewMode === 'CUTAWAY') && (
                           <button 
                             onClick={() => setExplodedView(!explodedView)} 
                             className={`px-6 py-3 rounded-full text-[10px] font-black uppercase border shadow-2xl backdrop-blur-md transition-all ${explodedView ? 'bg-rose-600 border-rose-500 text-white' : 'bg-slate-900/80 border-white/10 text-slate-300 hover:border-white/30'}`}
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
                <div className="bg-slate-900/40 rounded-3xl border border-white/5 p-6 backdrop-blur-sm mt-4">
                  <h3 className="text-sm font-bold text-white mb-4">Interior Previews</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                     {houseSpec.rooms.filter(r => !['Balcony', 'Terrace'].includes(r.type)).map((room, i) => (
                       <button
                         key={room.id}
                         onClick={() => {
                            setActiveRoomId(room.id);
                            setViewMode('INTERIOR');
                            setExplodedView(false);
                         }}
                         className={`flex-shrink-0 w-44 text-center p-2 rounded-2xl border transition-all relative overflow-hidden group ${
                           activeRoomId === room.id && viewMode === 'INTERIOR'
                             ? 'bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/20' 
                             : 'bg-slate-950/50 border-white/5 hover:border-white/20'
                         }`}
                       >
                          <div className="h-24 bg-slate-900 rounded-xl mb-3 overflow-hidden flex items-center justify-center relative">
                            {/* Placeholder for actual room render - using icons for now */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <i className={`bx ${room.type === 'Kitchen' ? 'bx-fridge' : room.type === 'Bathroom' ? 'bx-bath' : room.type.includes('Bedroom') ? 'bx-bed' : 'bx-sofa'} text-5xl z-0 ${activeRoomId === room.id && viewMode === 'INTERIOR' ? 'text-blue-400' : 'text-slate-600'}`}></i>
                            <div className="absolute bottom-2 left-0 w-full z-20">
                              <h4 className={`text-[11px] font-bold ${activeRoomId === room.id && viewMode === 'INTERIOR' ? 'text-white' : 'text-slate-300'}`}>{room.name}</h4>
                            </div>
                          </div>
                       </button>
                     ))}
                  </div>
                </div>

              </>
            ) : (
              <div className="glass-card h-[700px] flex flex-col items-center justify-center text-center p-20 border-dashed border-white/5">
                <i className="bx bx-home-alt-2 text-6xl text-slate-700 mb-6"></i>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Ready to <span className="text-gradient">Generate</span></h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

