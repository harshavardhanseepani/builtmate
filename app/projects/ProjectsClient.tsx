'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface DayLog {
  day: number;
  date: string;
  stage: string;
  phase: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress: number;
  summary: string;
  qcPassed: boolean;
  inspector: string;
  inspectorRole: string;
  workforce: { role: string; count: number }[];
  materials: { name: string; quantity: string }[];
  weather: string;
  temperature: string;
  cameraAngles: {
    name: string;
    description: string;
    imageUrl: string;
    badge: string;
  }[];
  checklist: { task: string; done: boolean }[];
  engineerNotes: string;
}

const dayLogs: DayLog[] = [
  {
    day: 1,
    date: '12 Nov 2025',
    stage: 'Plot Demarcation & Soil Testing',
    phase: 'Site Preparation',
    status: 'completed',
    progress: 5,
    summary: 'Total station survey completed. Boundary pegs placed and soil core samples extracted for SBC testing.',
    qcPassed: true,
    inspector: 'Er. Rajesh K. Sharma',
    inspectorRole: 'Chief Structural Consultant (Reg #BMA-4102)',
    workforce: [
      { role: 'Site Surveyor', count: 2 },
      { role: 'Soil Geotechnical Tech', count: 2 },
      { role: 'Civil Supervisor', count: 1 },
      { role: 'Labor Helpers', count: 4 },
    ],
    materials: [
      { name: 'Boundary Marker Pillars', quantity: '8 Units' },
      { name: 'Safety Perimeter Barricades', quantity: '120 Rft' },
      { name: 'Water Storage Tank (1000L)', quantity: '2 Tanks' },
    ],
    weather: 'Clear Sun',
    temperature: '29°C',
    cameraAngles: [
      {
        name: 'Front Plot View',
        description: 'Level ground with marked centerlines and boundary cords',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        badge: 'CCTV 01 • Live Archival',
      },
      {
        name: 'Soil Drilling Rig',
        description: 'Borehole extraction at 3.5m depth for bearing capacity verification',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        badge: 'QC Tech Cam',
      },
    ],
    checklist: [
      { task: 'Survey benchmarks verified with municipality layout plan', done: true },
      { task: 'Safe water & electricity temporary hookup connected', done: true },
      { task: 'Soil sample sent to NABL accredited laboratory', done: true },
    ],
    engineerNotes: 'Safe bearing capacity estimated at 190 kN/m². Approved for isolated trapezoidal footing design.',
  },
  {
    day: 14,
    date: '25 Nov 2025',
    stage: 'Excavation & Anti-Termite Treatment',
    phase: 'Substructure',
    status: 'completed',
    progress: 18,
    summary: 'Excavation of 14 footing pits completed with JCB 3DX. Chlorpyrifos chemical termite soil barrier injected.',
    qcPassed: true,
    inspector: 'Er. S. Venkat Raman',
    inspectorRole: 'Quality Assurance Head',
    workforce: [
      { role: 'JCB Operator', count: 1 },
      { role: 'Termite Specialists', count: 2 },
      { role: 'Masons', count: 4 },
      { role: 'Excavation Crew', count: 6 },
    ],
    materials: [
      { name: 'Chemical Termiticide (Chlorpyrifos 20% EC)', quantity: '35 Liters' },
      { name: 'PCC Cement M10 Grade', quantity: '80 Bags' },
      { name: 'River Sand Coarse', quantity: '600 Cft' },
    ],
    weather: 'Sunny',
    temperature: '31°C',
    cameraAngles: [
      {
        name: 'Foundation Trenches',
        description: 'Excavated 5ft depth pits with levelled bottom PCC bed',
        imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
        badge: 'CCTV 01 • Excavation Log',
      },
    ],
    checklist: [
      { task: 'Footing pit dimensions match structural drawings (5ft x 5ft x 5ft)', done: true },
      { task: 'PCC bed layer compacted to 100mm thickness', done: true },
      { task: 'Anti-termite chemical spray applied to bottom and sides', done: true },
    ],
    engineerNotes: 'Pit depths verified. No underground water table intrusion observed. Ready for steel footing mesh.',
  },
  {
    day: 28,
    date: '09 Dec 2025',
    stage: 'Footing Concrete Pour & Plinth Beam',
    phase: 'Foundation',
    status: 'completed',
    progress: 34,
    summary: 'All 14 footings and continuous ground plinth beam reinforced with Fe 550D TMT and poured with M25 concrete.',
    qcPassed: true,
    inspector: 'Er. Rajesh K. Sharma',
    inspectorRole: 'Chief Structural Consultant',
    workforce: [
      { role: 'Steel Fitters', count: 6 },
      { role: 'Concrete Pouring Crew', count: 8 },
      { role: 'Vibrator Operator', count: 2 },
      { role: 'Site Supervisor', count: 1 },
    ],
    materials: [
      { name: 'UltraTech OPC 53 Grade Cement', quantity: '145 Bags' },
      { name: 'Jindal Panther Fe 550D Rebars (16mm & 12mm)', quantity: '3.8 MT' },
      { name: '20mm Crushed Blue Metal Granite', quantity: '750 Cft' },
    ],
    weather: 'Clear',
    temperature: '28°C',
    cameraAngles: [
      {
        name: 'Footing Mesh Inspection',
        description: 'Tied rebar mats with 50mm cover blocks placed prior to pour',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        badge: 'QC Inspector Camera',
      },
      {
        name: 'Plinth Beam Concrete Pour',
        description: 'Monolithic plinth beam casting with needle vibrator compaction',
        imageUrl: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
        badge: 'CCTV 02 • Plinth Deck',
      },
    ],
    checklist: [
      { task: 'Rebar overlap length (50d) verified on all column starter bars', done: true },
      { task: 'Slump test checked at 110mm before pumping', done: true },
      { task: 'Concrete test cubes (6 nos) casted for 7-day and 28-day crush tests', done: true },
    ],
    engineerNotes: 'Cube test after 7 days achieved 19.8 N/mm² (exceeds target). Curing Hessian bags wrapped.',
  },
  {
    day: 45,
    date: '26 Dec 2025',
    stage: 'Ground Floor RCC Columns & Earth Filling',
    phase: 'Superstructure Framing',
    status: 'completed',
    progress: 52,
    summary: 'Cast 14 RCC vertical columns up to 10.5 ft ceiling height. Clean morrum backfilling compacted in 6-inch layers.',
    qcPassed: true,
    inspector: 'Er. S. Venkat Raman',
    inspectorRole: 'Quality Assurance Head',
    workforce: [
      { role: 'Carpenters (Shuttering)', count: 4 },
      { role: 'Steel Benders', count: 4 },
      { role: 'Masons', count: 6 },
      { role: 'Compactor Crew', count: 3 },
    ],
    materials: [
      { name: 'UltraTech OPC 53 Grade Cement', quantity: '90 Bags' },
      { name: 'Waterproof Plywood Shuttering Sheets', quantity: '45 Sheets' },
      { name: 'Filtered Morrum Soil', quantity: '12 Truck Loads' },
    ],
    weather: 'Mild Sun',
    temperature: '26°C',
    cameraAngles: [
      {
        name: 'Vertical Columns Grid',
        description: 'De-shuttered smooth columns with true plumb line check verified',
        imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        badge: 'CCTV 01 • Grid Scan',
      },
    ],
    checklist: [
      { task: 'Plumb bob alignment verified for all 14 columns (<2mm tolerance)', done: true },
      { task: 'Mechanical plate compactor used for soil backfilling', done: true },
      { task: 'De-shuttering done after mandatory 24 hours', done: true },
    ],
    engineerNotes: 'Honeycombing check: 0 defects detected. Columns wrapped with burlap for continuous wet curing.',
  },
  {
    day: 68,
    date: '18 Jan 2026',
    stage: 'First Floor RCC Roof Slab Casting',
    phase: 'Superstructure Slab',
    status: 'in-progress',
    progress: 68,
    summary: 'TODAY: Heavy beam shuttering complete. Electrical conduit pipes laid. Concrete boom pump pouring M25 slab.',
    qcPassed: true,
    inspector: 'Er. Rajesh K. Sharma',
    inspectorRole: 'Chief Structural Consultant (Reg #BMA-4102)',
    workforce: [
      { role: 'Pump & Pour Specialist', count: 4 },
      { role: 'Conduit Electricians', count: 2 },
      { role: 'Bar Benders on standby', count: 4 },
      { role: 'Vibrator & Leveling Masons', count: 6 },
    ],
    materials: [
      { name: 'UltraTech OPC 53 Grade Cement (Poured Today)', quantity: '160 Bags' },
      { name: 'Concealed Heavy PVC Conduit Pipes', quantity: '420 Rft' },
      { name: 'Fan Box & Junction Concealed Units', quantity: '28 Units' },
      { name: 'M25 Ready Mix Concrete Flow', quantity: '24 m³' },
    ],
    weather: 'Clear Skies, Perfect Pouring Conditions',
    temperature: '27°C',
    cameraAngles: [
      {
        name: 'Roof Slab Overhead View',
        description: 'Reinforcement mesh with chairs and electrical junction boxes locked in place',
        imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
        badge: '🔴 LIVE CCTV 01 • Slab Cam',
      },
      {
        name: 'Concrete Boom Pump Pouring',
        description: 'Direct boom discharge with continuous mechanical vibration',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        badge: '🔴 LIVE CCTV 02 • Yard View',
      },
      {
        name: 'Drone 4K Aerial Scan',
        description: 'Complete plot layout showing slab boundary and surrounding cured structures',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        badge: '4K Drone Capture',
      },
    ],
    checklist: [
      { task: 'Top reinforcement chairs placed every 1.0m to prevent mat sinking', done: true },
      { task: 'Electrical fan boxes tied with binding wire & packed with thermocol', done: true },
      { task: 'Slab thickness gauge markers set at 150mm (6 inches)', done: true },
      { task: 'Pre-pour clearance certificate signed by structural engineer', done: true },
    ],
    engineerNotes: 'Live pour underway. Slump tested at 120mm. Temperature is optimal. Water ponding will begin at 24 hours.',
  },
  {
    day: 92,
    date: '11 Feb 2026',
    stage: 'AAC Blockwork & Lintel Bands',
    phase: 'Masonry & Enclosure',
    status: 'upcoming',
    progress: 78,
    summary: 'Autoclaved Aerated Concrete (AAC) lightweight blocks laid with polymer thin-bed adhesive mortar.',
    qcPassed: false,
    inspector: 'Er. S. Venkat Raman',
    inspectorRole: 'Quality Assurance Head',
    workforce: [
      { role: 'Certified AAC Masons', count: 6 },
      { role: 'Lintel Carpenters', count: 3 },
      { role: 'Helpers', count: 6 },
    ],
    materials: [
      { name: 'UltraTech Super Stucco / AAC Blocks (8 inch)', quantity: '1,400 Blocks' },
      { name: 'Thin Bed Jointing Polymer Mortar', quantity: '45 Bags' },
      { name: 'Lintel Reinforcement Rebars', quantity: '0.8 MT' },
    ],
    weather: 'Sunny',
    temperature: '32°C',
    cameraAngles: [
      {
        name: 'Room Partitioning View',
        description: 'Exterior 200mm walls and interior 100mm walls with true right-angle corners',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        badge: 'Architectural Cam',
      },
    ],
    checklist: [
      { task: 'Continuous RCC lintel band casted at 7ft window/door top height', done: false },
      { task: 'Joint thickness maintained between 2mm to 4mm', done: false },
      { task: 'Sill bands provided under every window opening to prevent diagonal cracking', done: false },
    ],
    engineerNotes: 'Scheduled to commence immediately following slab curing completion.',
  },
  {
    day: 120,
    date: '11 Mar 2026',
    stage: 'Internal Cement Plaster & MEP Lines',
    phase: 'Finishing & Services',
    status: 'upcoming',
    progress: 88,
    summary: 'Concealed CPVC/UPVC plumbing lines pressure tested at 10 Bar. Double coat smooth river sand plaster.',
    qcPassed: false,
    inspector: 'Er. Rajesh K. Sharma',
    inspectorRole: 'Chief Structural Consultant',
    workforce: [
      { role: 'Plastering Masons', count: 8 },
      { role: 'Certified Plumbers', count: 3 },
      { role: 'Electricians', count: 3 },
    ],
    materials: [
      { name: 'UltraTech Readymix Super Plaster', quantity: '220 Bags' },
      { name: 'Astral CPVC Pro Pipes & Fittings', quantity: 'Lot' },
      { name: 'Chicken Wire Mesh for Joints', quantity: '180 Sqm' },
    ],
    weather: 'Dry & Clear',
    temperature: '34°C',
    cameraAngles: [
      {
        name: 'Living Hall Plaster Finish',
        description: 'Smooth sponge finish walls ready for wall putty application',
        imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        badge: 'Interior Cam 01',
      },
    ],
    checklist: [
      { task: 'Hydrostatic pressure test on bathroom pipes held for 24 hours without drop', done: false },
      { task: 'Wire mesh anchored over electrical chases to prevent cracking', done: false },
      { task: 'Bull marks and button marks checked for 90-degree true vertical finish', done: false },
    ],
    engineerNotes: 'Plumbing testing will be video recorded and logged into homeowner portal.',
  },
  {
    day: 160,
    date: '20 Apr 2026',
    stage: 'Luxury Tile Flooring & Royal Emulsion Painting',
    phase: 'Interiors & Finishes',
    status: 'upcoming',
    progress: 96,
    summary: 'Italian marble look 800x1600mm vitrified tiles with epoxy grout. Premium exterior weather-shield painting.',
    qcPassed: false,
    inspector: 'Er. S. Venkat Raman',
    inspectorRole: 'Quality Assurance Head',
    workforce: [
      { role: 'Master Tile Layers', count: 4 },
      { role: 'Asian Paints Certified Painters', count: 6 },
      { role: 'Door Fitters', count: 2 },
    ],
    materials: [
      { name: 'Kajaria 800x1600mm Glazed Vitrified Tiles', quantity: '2,600 Sqft' },
      { name: 'Laticrete Epoxy Tile Grout', quantity: '18 Buckets' },
      { name: 'Asian Paints Apex Ultima Protek', quantity: '120 Liters' },
    ],
    weather: 'Clear Skies',
    temperature: '35°C',
    cameraAngles: [
      {
        name: 'Master Bedroom Flooring',
        description: 'Laser leveled seamless tiles with zero lip',
        imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        badge: 'Interior Cam 02',
      },
    ],
    checklist: [
      { task: 'Hollow sound hammer tap test on 100% of floor tiles', done: false },
      { task: 'Moisture meter reading below 12% before primer coating', done: false },
      { task: 'Teak wood door frame polish coat protection wrapped', done: false },
    ],
    engineerNotes: 'Flooring protected with corrugated bubble sheet during finishing touches.',
  },
  {
    day: 180,
    date: '10 May 2026',
    stage: 'Final QC Snag Audit, OC & Key Handover',
    phase: 'Delivery & Handover',
    status: 'upcoming',
    progress: 100,
    summary: 'Zero-snag final audit certificate, occupancy certificate issued, keys and 10-year warranty handbook handed over!',
    qcPassed: false,
    inspector: 'Er. Rajesh K. Sharma & Client',
    inspectorRole: 'Executive Handover Committee',
    workforce: [
      { role: 'Quality Audit Team', count: 3 },
      { role: 'Deep Cleaning Crew', count: 4 },
      { role: 'Handover Executive', count: 1 },
    ],
    materials: [
      { name: 'Brass Key Presentation Box', quantity: '1 Set' },
      { name: '10-Year Structural Warranty Certificate', quantity: '1 Set' },
      { name: 'As-Built Architectural & Electrical Drawings Booklet', quantity: '2 Copies' },
    ],
    weather: 'Sunny',
    temperature: '36°C',
    cameraAngles: [
      {
        name: 'Completed Luxury Villa',
        description: 'Exquisite modern facade with warm ambient lighting, completed garden, and glass balcony',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        badge: 'Final Delivered Villa',
      },
    ],
    checklist: [
      { task: 'Comprehensive 150-point snag checklist verified and signed by client', done: false },
      { task: 'All electrical fixtures, MCBs, inverter hookups tested and energized', done: false },
      { task: 'Pest control warranty & structural certificate formally handed over', done: false },
    ],
    engineerNotes: 'Dream house completed on schedule. Welcome home!',
  },
];

export default function ProjectsClient() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(4); // Day 68 (current day)
  const [activeCamIndex, setActiveCamIndex] = useState(0);
  const [isPlayingTimelapse, setIsPlayingTimelapse] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const currentLog = dayLogs[selectedDayIndex];

  // Auto-play time-lapse effect
  useEffect(() => {
    let interval: any;
    if (isPlayingTimelapse) {
      interval = setInterval(() => {
        setSelectedDayIndex((prev) => {
          if (prev >= dayLogs.length - 1) {
            setIsPlayingTimelapse(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlayingTimelapse]);

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] bg-texture-luxury text-slate-900 overflow-x-hidden pt-28 pb-24 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <div className="max-w-[1700px] mx-auto px-4 md:px-8">
        
        {/* Top Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 border-b border-amber-200/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Homeowner Tracking Preview • No Login Required
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Day-by-Day <span className="text-gradient-gold-rich">House Construction</span> Tracker
            </h1>
            <p className="text-base text-slate-600 mt-2 max-w-2xl font-normal">
              Experience how Builtmate keeps homeowners updated every single day with verified site photos, engineer audit checklists, material manifests, and live webcam feeds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPlayingTimelapse(!isPlayingTimelapse)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                isPlayingTimelapse 
                  ? 'bg-amber-600 text-white animate-pulse' 
                  : 'bg-white/90 border border-amber-300 text-slate-800 hover:bg-amber-50'
              }`}
            >
              <i className={`bx ${isPlayingTimelapse ? 'bx-pause' : 'bx-play'} text-xl text-amber-600`}></i>
              {isPlayingTimelapse ? 'Pause Time-Lapse' : 'Play Day-by-Day Time-Lapse'}
            </button>

            <Link
              href="/design"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <i className="bx bx-cube-alt text-lg"></i>
              Open 3D Design Twin
            </Link>
          </div>
        </div>

        {/* Project Keycard Ribbon */}
        <div className="glass-card-luxury bg-white/90 border border-amber-200/80 rounded-3xl p-6 md:p-8 mb-8 shadow-[0_10px_35px_rgba(212,175,55,0.06)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            
            <div className="col-span-2">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-1">Active Build Project</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 truncate">Villa Aurelia • 3BHK Luxury</h2>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <i className="bx bx-map-pin text-amber-600"></i> Road 36, Jubilee Hills, Hyderabad
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-1">Total Progress</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">{currentLog.progress}%</span>
                <span className="text-xs font-bold text-emerald-600">Day {currentLog.day}/180</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden border border-amber-100">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-700" 
                  style={{ width: `${currentLog.progress}%` }} 
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-1">Budget Tracker</span>
              <div className="text-lg font-black text-slate-900">₹46.5L <span className="text-xs text-slate-400 font-normal">/ ₹68.5L</span></div>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                <i className="bx bx-check-double"></i> 100% Escrow Protected
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-1">Assigned Builder</span>
              <div className="text-sm font-black text-slate-900">Apex Master Builders</div>
              <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1 mt-0.5">
                <i className="bx bxs-star text-amber-500"></i> Grade A+ Certified
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-1">Schedule Status</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <i className="bx bx-time text-sm"></i> 4 Days Ahead
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Target Handover: May 2026</span>
            </div>

          </div>
        </div>

        {/* Interactive Day Scrubber Timeline */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <i className="bx bx-calendar-check text-amber-600 text-lg"></i>
              Select Construction Day ({dayLogs.length} Key Milestones Logged)
            </h3>
            <span className="text-xs text-slate-500">Click any day to inspect full engineering telemetry</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
            {dayLogs.map((log, index) => {
              const isSelected = selectedDayIndex === index;
              return (
                <button
                  key={log.day}
                  onClick={() => {
                    setSelectedDayIndex(index);
                    setActiveCamIndex(0);
                  }}
                  className={`flex-shrink-0 text-left p-4 rounded-2xl border transition-all duration-300 min-w-[155px] cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-md ring-2 ring-amber-500/30'
                      : 'bg-white/80 border-amber-200/70 hover:border-amber-300 hover:bg-white'
                  }`}
                >
                  {log.status === 'in-progress' && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-amber-800' : 'text-slate-400'}`}>
                      {log.date}
                    </span>
                  </div>

                  <div className="text-base font-black text-slate-900">
                    Day {log.day}
                  </div>

                  <div className="text-[11px] font-medium text-slate-600 truncate mt-0.5" title={log.stage}>
                    {log.stage}
                  </div>

                  <div className="mt-2.5 flex items-center gap-1.5">
                    {log.status === 'completed' ? (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <i className="bx bx-check-circle text-xs"></i> Verified
                      </span>
                    ) : log.status === 'in-progress' ? (
                      <span className="text-[10px] font-bold text-amber-700 flex items-center gap-0.5">
                        <i className="bx bx-loader-alt animate-spin text-xs"></i> Active Today
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5">
                        <i className="bx bx-time text-xs"></i> Scheduled
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Daily Inspection Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column (8 cols): Site Visuals & Live Cams */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Main Visual Display */}
            <div className="bg-white/90 backdrop-blur-xl border border-amber-200/80 rounded-3xl overflow-hidden shadow-xl">
              
              {/* Camera Header Tabs */}
              <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-amber-200/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
                    Day {currentLog.day} Telemetry • {currentLog.cameraAngles[activeCamIndex]?.badge || 'Site Feed'}
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                  {currentLog.cameraAngles.map((cam, idx) => (
                    <button
                      key={cam.name}
                      onClick={() => setActiveCamIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeCamIndex === idx
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      <i className="bx bx-cctv mr-1"></i> {cam.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo / Render Frame */}
              <div className="relative aspect-video max-h-[520px] w-full bg-slate-950 overflow-hidden group">
                <img
                  src={currentLog.cameraAngles[activeCamIndex]?.imageUrl || currentLog.cameraAngles[0].imageUrl}
                  alt={currentLog.stage}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-102"
                />

                {/* Telemetry HUD Overlays */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-bold text-white flex items-center gap-2 shadow-lg">
                    <i className="bx bx-sun text-amber-400 text-sm"></i>
                    <span>{currentLog.weather} • {currentLog.temperature}</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 shadow-lg">
                    <i className="bx bx-check-shield text-sm"></i>
                    <span>GPS Geofence Verified</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-950/85 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
                  <div>
                    <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <i className="bx bx-info-circle"></i>
                      {currentLog.stage}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                      {currentLog.cameraAngles[activeCamIndex]?.description || currentLog.summary}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Captured Date</span>
                    <span className="text-xs font-mono font-bold text-white">{currentLog.date} 14:30 IST</span>
                  </div>
                </div>
              </div>

              {/* Work Details & Engineer Observation Bar */}
              <div className="p-6 md:p-8 bg-white border-t border-amber-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Structural Engineer Observation</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">{currentLog.stage}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDownloadReport}
                      className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100/70 border border-amber-200 text-amber-900 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <i className="bx bx-download text-sm text-amber-600"></i>
                      {downloadSuccess ? 'Inspection PDF Generated!' : 'Download Daily QC Log (PDF)'}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0 text-amber-700 font-black text-lg">
                      <i className="bx bx-notepad"></i>
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        &ldquo;{currentLog.engineerNotes}&rdquo;
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-bold text-slate-800">{currentLog.inspector}</span>
                        <span>•</span>
                        <span>{currentLog.inspectorRole}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                          <i className="bx bxs-badge-check"></i> Digitally Signed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Checklist Tasks */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                    <i className="bx bx-list-check text-amber-600 text-base"></i>
                    On-Site Quality Checklist (Day {currentLog.day})
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {currentLog.checklist.map((item, i) => (
                      <div 
                        key={i}
                        className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs font-medium transition-colors ${
                          item.done 
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' 
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <i className={`bx ${item.done ? 'bx-check-circle text-emerald-600' : 'bx-time text-slate-400'} text-base shrink-0 mt-0.5`}></i>
                        <span>{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Materials, Workforce & Live Feed */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* QC Stamp Card */}
            <div className="glass-card-luxury bg-white/95 border border-amber-200/80 rounded-3xl p-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center text-3xl font-black shadow-md shadow-amber-500/20 shrink-0">
                  <i className="bx bx-shield-quarter"></i>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 uppercase tracking-widest">
                    <span>QC Certified Audit</span>
                    <i className="bx bxs-check-circle text-emerald-500 text-sm"></i>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">Zero-Defect Quality Pass</h4>
                  <p className="text-xs text-slate-500">Inspected by {currentLog.inspector}</p>
                </div>
              </div>
            </div>

            {/* Daily Material Inflow Card */}
            <div className="glass-card-luxury bg-white/95 border border-amber-200/80 rounded-3xl p-6 shadow-md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <i className="bx bx-package text-amber-600 text-lg"></i>
                Materials Consumed / Delivered (Day {currentLog.day})
              </h3>

              <div className="space-y-3">
                {currentLog.materials.map((mat, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/40 border border-amber-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 text-sm shrink-0">
                        <i className="bx bx-cube"></i>
                      </div>
                      <span className="text-xs font-bold text-slate-800">{mat.name}</span>
                    </div>
                    <span className="text-xs font-extrabold text-amber-800 bg-white px-2.5 py-1 rounded-lg border border-amber-200/80 shrink-0">
                      {mat.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-amber-100 flex items-center justify-between text-xs text-slate-500">
                <span>Material Source</span>
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <i className="bx bx-check-shield text-amber-600"></i> Builtmate Verified Supplier
                </span>
              </div>
            </div>

            {/* Daily Workforce on Site */}
            <div className="glass-card-luxury bg-white/95 border border-amber-200/80 rounded-3xl p-6 shadow-md">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <i className="bx bx-hard-hat text-amber-600 text-lg"></i>
                Active Site Workforce ({currentLog.workforce.reduce((a, b) => a + b.count, 0)} Personnel)
              </h3>

              <div className="space-y-2.5">
                {currentLog.workforce.map((w, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">{w.role}</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                      {w.count} On-Site
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-amber-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Site Safety Protocol</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  100% PPE Compliant
                </span>
              </div>
            </div>

            {/* Direct Homeowner Action */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-300 text-slate-900 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <i className="bx bx-conversation text-amber-700 text-2xl"></i>
                <h4 className="font-bold text-sm">Have a question for the engineer?</h4>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Homeowners can chat directly with their assigned structural architect or schedule an on-site joint walkthrough.
              </p>
              <Link
                href="/about"
                className="w-full py-3 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-50 text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <i className="bx bx-phone-call text-amber-600 text-sm"></i> Connect with BuildMate Architect
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

