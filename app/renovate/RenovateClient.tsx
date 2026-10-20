'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface PhotoItem {
  id: string;
  url: string;
  name: string;
}

interface RedesignPreset {
  id: string;
  title: string;
  style: string;
  scope: 'FACADE_MODERNIZATION' | 'EXTENSION' | 'COMPLETE_REBUILD';
  budget: string;
  originalImage: string;
  originalName: string;
  proposedImage: string;
  summary: string;
  requirements: string;
  badge: string;
}

const SAMPLE_EXISTING_HOUSES = [
  {
    id: 'sample-brick',
    name: 'Dated Suburban Brick',
    desc: 'Classic 1990s brick structure',
    url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sample-concrete',
    name: 'Single-Floor Concrete Box',
    desc: 'Flat slab with expansion potential',
    url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sample-kerala',
    name: 'Traditional Sloped Roof',
    desc: 'Clay tile roof & vintage verandah',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sample-colonial',
    name: 'Colonial Bungalow',
    desc: 'Arch portico with vintage pillars',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  }
];

const REDESIGN_PREVIEWS: RedesignPreset[] = [
  {
    id: 'preview-minimalist',
    title: 'Modern Minimalist Glass Villa',
    style: 'Modern Minimalist',
    scope: 'FACADE_MODERNIZATION',
    budget: '₹30L – ₹60L',
    originalImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800',
    originalName: 'Dated Suburban Brick',
    proposedImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    summary: 'Sleek white facade with floor-to-ceiling double-glazed windows, dark graphite louvers, and warm recessed LED perimeter lighting.',
    requirements: 'Modern white stucco, dark graphite louvers, floor-to-ceiling glass fenestration, integrated perimeter warm lighting.',
    badge: 'Popular Facade Revamp'
  },
  {
    id: 'preview-kerala',
    title: 'Kerala Contemporary Sloped Estate',
    style: 'Kerala Contemporary',
    scope: 'COMPLETE_REBUILD',
    budget: '₹60L+',
    originalImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
    originalName: 'Traditional Sloped Roof',
    proposedImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200',
    summary: 'Monsoon-ready clay tile pitched roofs, polished teakwood columns, internal courtyard (nadumuttam), and cantilevered rain decks.',
    requirements: 'Kerala clay roof tiles, exposed seasoned teak eaves, large verandah portico, monsoon drainage spouts.',
    badge: 'Heritage Rebuild'
  },
  {
    id: 'preview-luxury',
    title: 'Ultra-Luxury Cantilevered Villa',
    style: 'Ultra-Luxury Villa',
    scope: 'EXTENSION',
    budget: '₹60L+',
    originalImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    originalName: 'Single-Floor Concrete Box',
    proposedImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    summary: 'Dramatic 1st-floor cantilevered living pavilion, structural glass balustrades, infinity pool reflection pond, and imported travertine cladding.',
    requirements: 'Cantilevered first floor extension, frameless glass railings, imported travertine wall cladding, infinity plunge pool.',
    badge: 'Luxury Extension'
  },
  {
    id: 'preview-brutalist',
    title: 'Exposed Terracotta Brick Residence',
    style: 'Brutalist Brick',
    scope: 'FACADE_MODERNIZATION',
    budget: '₹30L – ₹60L',
    originalImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800',
    originalName: 'Dated Suburban Brick',
    proposedImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
    summary: 'Parametric wirecut terracotta jaali screens, textured fair-faced concrete bands, and energy-efficient courtyard ventilation shafts.',
    requirements: 'Wirecut red terracotta brick facade, perforated jaali brick screen for passive cooling, board-formed concrete lintels.',
    badge: 'Eco Terracotta'
  },
  {
    id: 'preview-nordic',
    title: 'Nordic Cubic Pavilion Home',
    style: 'Modern Minimalist',
    scope: 'EXTENSION',
    budget: '₹30L – ₹60L',
    originalImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    originalName: 'Single-Floor Concrete Box',
    proposedImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    summary: 'Pure geometric white cubes with black mullion French windows, rooftop terrace pergola, and cedar siding accents.',
    requirements: 'Add second floor cubic room, black powder-coated aluminum French doors, cedar vertical battens, solar pergola.',
    badge: 'Vertical Expansion'
  },
  {
    id: 'preview-colonial',
    title: 'Neoclassical Manor Revival',
    style: 'Classical Colonial',
    scope: 'COMPLETE_REBUILD',
    budget: '₹60L+',
    originalImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    originalName: 'Colonial Bungalow',
    proposedImage: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1200',
    summary: 'Grand Tuscan portico columns, arched entrance transom, symmetrical double-hung sashes, and ornamental cornices.',
    requirements: 'Tuscan stone columns, semi-circular arched entrance door, classical roof cornice mouldings, symmetrical flanking wings.',
    badge: 'Grand Heritage'
  }
];

export default function RenovateClient() {
  // Photos state
  const [photos, setPhotos] = useState<PhotoItem[]>([
    {
      id: 'default-1',
      url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800',
      name: 'Dated Suburban Brick'
    }
  ]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Renovation parameters
  const [scope, setScope] = useState<'FACADE_MODERNIZATION' | 'EXTENSION' | 'COMPLETE_REBUILD'>('FACADE_MODERNIZATION');
  const [style, setStyle] = useState('Modern Minimalist');
  const [budget, setBudget] = useState('₹30L – ₹60L');
  const [preservedFeatures, setPreservedFeatures] = useState<string[]>([
    'Existing Foundation',
    'Main Plinth Beams',
    'Boundary Wall'
  ]);
  const [customRequirements, setCustomRequirements] = useState(
    'Transform front elevation with modern white stucco, natural teak wood slats, large double-glazed windows, and a cantilevered balcony.'
  );

  // Active Preset state
  const [activePresetId, setActivePresetId] = useState<string>('preview-minimalist');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [result, setResult] = useState<any>({
    proposedImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    api_status: 'SUCCESS',
    report: {
      scopeTitle: 'Modern Minimalist Facade Revamp',
      scopeSummary: 'Sleek white stucco facade with floor-to-ceiling double-glazed windows, dark graphite louvers, and warm recessed LED perimeter lighting.',
      estimatedBudget: '₹30L – ₹60L',
      civilCost: '₹14.5L',
      finishCost: '₹11.2L',
      mepCost: '₹6.3L',
      structuralModifications: [
        'Strip old brick finish and treat existing structural surfaces',
        'Install structural steel lintels over expanded fenestration openings',
        'Apply weather-resistant white stucco exterior coating with anti-efflorescence primer',
        'Install double-glazed thermal break aluminum facade panels and tempered glass balconies'
      ],
      materials: [
        'Weathercoat AllGuard White Stucco',
        'Dark Graphite Aluminum Louvers',
        'Saint-Gobain Low-E Double Glazed Windows',
        'Warm 3000K Architectural Recessed LEDs',
        'Toughened Frameless 12mm Balcony Glass'
      ],
      constructionTimeline: '3 – 5 Months',
      permitRequirements: 'Minor Elevation & Facade Clearance'
    }
  });

  // Comparison view mode
  const [comparisonMode, setComparisonMode] = useState<'SLIDER' | 'DUAL'>('SLIDER');
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDraggingRef = useRef(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-configured style options
  const STYLE_OPTIONS = [
    { id: 'Modern Minimalist', label: 'Modern Minimalist', desc: 'White stucco, glass facades, clean geometry', icon: 'bx-cube' },
    { id: 'Kerala Contemporary', label: 'Kerala Contemporary', desc: 'Clay tiles, wooden eaves, monsoon-grade porches', icon: 'bx-home-smile' },
    { id: 'Ultra-Luxury Villa', label: 'Ultra-Luxury Villa', desc: 'Double height glass, cantilevered decks, ambient LEDs', icon: 'bx-diamond' },
    { id: 'Brutalist Brick', label: 'Brutalist Brick', desc: 'Exposed terracotta brickwork, natural stone accents', icon: 'bx-buildings' },
    { id: 'Classical Colonial', label: 'Classical Colonial', desc: 'Symmetric portico, arches, grand entrance doors', icon: 'bx-crown' }
  ];

  // Preservable elements
  const PRESERVABLE_ITEMS = [
    'Existing Foundation',
    'Main Plinth Beams',
    'Ground Floor Masonry',
    'Boundary Wall & Gate',
    'Garden Trees & Lawn',
    'Existing Staircase'
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleTogglePreserve = (item: string) => {
    setPreservedFeatures(prev => 
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  const handleSelectSampleHouse = (sample: typeof SAMPLE_EXISTING_HOUSES[0]) => {
    const newPhoto: PhotoItem = {
      id: 'sample-' + Date.now(),
      url: sample.url,
      name: sample.name
    };
    setPhotos([newPhoto]);
    setSelectedPhotoIndex(0);
    showToast(`Loaded sample house: "${sample.name}"`);
  };

  const applyPreset = (preset: RedesignPreset) => {
    setActivePresetId(preset.id);
    setScope(preset.scope);
    setStyle(preset.style);
    setBudget(preset.budget);
    setCustomRequirements(preset.requirements);

    // Set sample original photo
    setPhotos([
      {
        id: 'photo-' + Date.now(),
        url: preset.originalImage,
        name: preset.originalName
      }
    ]);
    setSelectedPhotoIndex(0);

    // Apply redesign result instantly
    setResult({
      proposedImageUrl: preset.proposedImage,
      api_status: 'SUCCESS',
      report: {
        scopeTitle: `${preset.style} (${preset.scope.replace(/_/g, ' ')})`,
        scopeSummary: preset.summary,
        estimatedBudget: preset.budget,
        civilCost: preset.budget === '₹60L+' ? '₹26.5L' : preset.budget === '₹30L – ₹60L' ? '₹15.0L' : '₹9.0L',
        finishCost: preset.budget === '₹60L+' ? '₹22.0L' : preset.budget === '₹30L – ₹60L' ? '₹12.5L' : '₹7.5L',
        mepCost: preset.budget === '₹60L+' ? '₹11.5L' : preset.budget === '₹30L – ₹60L' ? '₹6.5L' : '₹3.5L',
        structuralModifications: [
          'Retrofit structural footings and plinth tie-beams',
          'Execute precision architectural openings for floor-to-ceiling fenestration',
          'Apply anti-efflorescence water repellent base coat and premium exterior finish',
          'Install high-load structural brackets for cantilevered decks and architectural louvers'
        ],
        materials: [
          'High Performance Weatherproof Stucco',
          'Architectural Grade Seasoned Teak Battens',
          'Saint-Gobain Low-E Double Glazed Units (DGU)',
          'IP65 Exterior Warm Architectural LEDs',
          'Wirecut Terracotta Cladding Panels'
        ],
        constructionTimeline: preset.scope === 'COMPLETE_REBUILD' ? '9 – 12 Months' : '3 – 6 Months',
        permitRequirements: preset.scope === 'COMPLETE_REBUILD' ? 'Full Municipal Sanction Plan' : 'Standard Alteration Clearance'
      }
    });

    showToast(`Applied "${preset.title}" Redesign Concept!`);
  };

  const handleRandomizeHouse = () => {
    // Pick a random preset different from activePresetId
    const otherPresets = REDESIGN_PREVIEWS.filter(p => p.id !== activePresetId);
    const randomPreset = otherPresets[Math.floor(Math.random() * otherPresets.length)] || REDESIGN_PREVIEWS[0];
    applyPreset(randomPreset);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhoto: PhotoItem = {
            id: 'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            url: event.target.result as string,
            name: file.name
          };
          setPhotos(prev => [...prev.slice(-4), newPhoto]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos(prev => {
      const filtered = prev.filter(p => p.id !== id);
      if (filtered.length === 0) {
        setSelectedPhotoIndex(0);
      } else if (selectedPhotoIndex >= filtered.length) {
        setSelectedPhotoIndex(filtered.length - 1);
      }
      return filtered;
    });
  };

  const handleGenerate = async () => {
    if (photos.length === 0) {
      setGenerationError('Please upload at least one photo of your existing house.');
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);
    setGenerationStep(1);

    const stepInterval = setInterval(() => {
      setGenerationStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 1200);

    try {
      const activePhotoUrl = photos[selectedPhotoIndex]?.url || photos[0]?.url;

      const res = await fetch('/api/renovate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photos: [activePhotoUrl],
          scope,
          style,
          budget,
          preservedFeatures,
          customRequirements
        })
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        throw new Error('Failed to generate renovation concept. HTTP ' + res.status);
      }

      const data = await res.json();
      setResult(data);
      showToast('Generated fresh renovation concept for your house!');
    } catch (err: any) {
      clearInterval(stepInterval);
      setGenerationError(err.message || 'Something went wrong while generating the concept.');
    } finally {
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  // Slider drag handler
  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const currentOriginalPhoto = useMemo(() => {
    return photos[selectedPhotoIndex]?.url || photos[0]?.url || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800';
  }, [photos, selectedPhotoIndex]);

  const proposedImage = useMemo(() => {
    if (result?.proposedImageUrl) return result.proposedImageUrl;
    return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600';
  }, [result]);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-[#faf9f6] bg-texture-luxury font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      {/* Background Decorative Glows */}
      <div className="glow-sphere top-20 right-10 w-96 h-96 bg-amber-400/10 pointer-events-none" />
      <div className="glow-sphere bottom-20 left-10 w-96 h-96 bg-yellow-500/10 pointer-events-none" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-amber-300 border border-amber-500/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-bold">
          <i className="bx bx-check-circle text-amber-400 text-lg"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-amber-500/15 border border-amber-300 shadow-xs">
            <i className="bx bx-paint-roll text-amber-700 text-sm"></i>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-900">
              New AI Studio • Intelligent House Transformation
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-slate-900 leading-none">
            AI <span className="text-gradient-gold-rich">Renovate</span> Studio
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Transform your existing house with AI. Upload elevation photos, select architectural styles, configure extensions or complete rebuilding, and preview side-by-side proposed concepts.
          </p>

          {/* Quick Random Action Pill */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleRandomizeHouse}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <i className="bx bx-shuffle text-base"></i>
              <span>Generate Random House Redesign</span>
            </button>
          </div>
        </div>

        {/* Studio Layout: 2 Columns */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: Controls & Uploads (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* 1. PHOTO UPLOADER & SAMPLE HOUSES */}
            <div className="glass-card-luxury bg-white/90 rounded-3xl border border-amber-200/80 p-6 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 flex items-center gap-2">
                  <i className="bx bx-camera text-amber-600 text-base"></i>
                  1. Existing House Photo
                </h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  {photos.length}/5 Photos
                </span>
              </div>

              {/* Sample House Quick Picker */}
              <div className="mb-4 bg-amber-50/60 border border-amber-200/70 rounded-2xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 flex items-center gap-1">
                    <i className="bx bx-image-alt text-amber-600"></i> Or pick a sample house:
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_EXISTING_HOUSES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSelectSampleHouse(sample)}
                      className="flex items-center gap-2 p-1.5 rounded-xl border border-amber-200/80 bg-white/90 hover:bg-amber-100/60 hover:border-amber-400 text-left transition-all cursor-pointer group"
                    >
                      <img
                        src={sample.url}
                        alt={sample.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-amber-200"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-900 truncate group-hover:text-amber-900">
                          {sample.name}
                        </p>
                        <p className="text-[9px] text-slate-500 truncate">{sample.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/40 hover:bg-amber-50/80 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-amber-200 flex items-center justify-center mx-auto mb-3 text-amber-600 group-hover:scale-110 transition-transform">
                  <i className="bx bx-cloud-upload text-2xl"></i>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  Click to upload or drag & drop your house photos
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Upload front elevation, side view, or rooftop (PNG, JPG up to 10MB)
                </p>
              </div>

              {/* Photo Thumbnails */}
              {photos.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Selected Elevation View:
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {photos.map((photo, idx) => (
                      <div
                        key={photo.id}
                        onClick={() => setSelectedPhotoIndex(idx)}
                        className={'relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ' + 
                          (selectedPhotoIndex === idx ? 'border-amber-500 ring-2 ring-amber-500/30 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100')
                        }
                      >
                        <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={(e) => removePhoto(photo.id, e)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/80 text-white flex items-center justify-center text-xs hover:bg-rose-600 transition-colors"
                          title="Remove photo"
                        >
                          &times;
                        </button>
                        {selectedPhotoIndex === idx && (
                          <div className="absolute bottom-0 inset-x-0 bg-amber-500 text-slate-950 font-black text-[8px] uppercase text-center py-0.5">
                            Active
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. RENOVATION SCOPE */}
            <div className="glass-card-luxury bg-white/90 rounded-3xl border border-amber-200/80 p-6 shadow-md">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 mb-3 flex items-center gap-2">
                <i className="bx bx-layer text-amber-600 text-base"></i>
                2. Choose Renovation Scope
              </h3>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'FACADE_MODERNIZATION',
                    title: 'Facade & Exterior Revamp',
                    desc: 'Curb appeal revamp, modern cladding, glass balconies, external LED lighting.',
                    icon: 'bx-palette'
                  },
                  {
                    id: 'EXTENSION',
                    title: 'Floor or Wing Extension',
                    desc: 'Add vertical 1st/2nd floor or expand rooms on existing foundation.',
                    icon: 'bx-layer-plus'
                  },
                  {
                    id: 'COMPLETE_REBUILD',
                    title: 'Complete Architectural Rebuild',
                    desc: 'Total redesign from the ground up utilizing the property footprint.',
                    icon: 'bx-buildings'
                  }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setScope(item.id as any)}
                    className={'p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ' +
                      (scope === item.id 
                        ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20 shadow-xs' 
                        : 'bg-white/60 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30')
                    }
                  >
                    <div className={'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg ' +
                      (scope === item.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600')
                    }>
                      <i className={'bx ' + item.icon}></i>
                    </div>
                    <div>
                      <h4 className={'text-xs font-bold ' + (scope === item.id ? 'text-amber-950' : 'text-slate-900')}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. STYLE & BUDGET SELECTOR */}
            <div className="glass-card-luxury bg-white/90 rounded-3xl border border-amber-200/80 p-6 shadow-md space-y-5">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 mb-3 flex items-center gap-2">
                  <i className="bx bx-brush text-amber-600 text-base"></i>
                  3. Preferred Design Style
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {STYLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setStyle(opt.id)}
                      className={'p-2.5 rounded-xl border text-left transition-all cursor-pointer ' +
                        (style === opt.id 
                          ? 'bg-amber-500/15 border-amber-500 text-slate-950 font-bold shadow-xs' 
                          : 'bg-white/60 border-slate-200 text-slate-700 hover:border-amber-300')
                      }
                    >
                      <div className="flex items-center gap-2">
                        <i className={'bx ' + opt.icon + ' text-amber-600 text-sm'}></i>
                        <span className="text-xs font-bold">{opt.label}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 mb-2 flex items-center gap-2">
                  <i className="bx bx-rupee text-amber-600 text-base"></i>
                  Target Budget Tier
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {['₹15L – ₹30L', '₹30L – ₹60L', '₹60L+'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setBudget(tier)}
                      className={'py-2.5 px-2 rounded-xl text-xs font-black uppercase text-center border transition-all cursor-pointer ' +
                        (budget === tier 
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-500 text-slate-950 shadow-sm' 
                          : 'bg-white/60 border-slate-200 text-slate-700 hover:border-amber-300')
                      }
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. PRESERVED FEATURES */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 mb-2 flex items-center gap-2">
                  <i className="bx bx-check-shield text-amber-600 text-base"></i>
                  Features to Preserve
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {PRESERVABLE_ITEMS.map((item) => {
                    const isSelected = preservedFeatures.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleTogglePreserve(item)}
                        className={'px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ' +
                          (isSelected 
                            ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-xs' 
                            : 'bg-white/60 border-slate-200 text-slate-600 hover:border-amber-200')
                        }
                      >
                        {isSelected && <i className="bx bx-check mr-1 text-amber-700"></i>}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. CUSTOM REQUIREMENTS */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">
                  Special Requirements & Architectural Vision
                </label>
                <textarea
                  rows={3}
                  value={customRequirements}
                  onChange={(e) => setCustomRequirements(e.target.value)}
                  placeholder="e.g. Add 2-car covered garage, double-glazed windows, rooftop solar pergola..."
                  className="w-full text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white outline-none text-slate-900 transition-all placeholder:text-slate-400 resize-none font-medium"
                />
              </div>

              {/* GENERATE BUTTON */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
              >
                {isGenerating ? (
                  <>
                    <i className="bx bx-loader-alt animate-spin text-lg"></i>
                    <span>
                      {generationStep === 1 
                        ? 'Analyzing Structure...' 
                        : generationStep === 2 
                        ? 'Engineering Feasibility...' 
                        : 'Synthesizing 3D Concept...'}
                    </span>
                  </>
                ) : (
                  <>
                    <i className="bx bx-sparkles text-lg"></i>
                    <span>Generate AI Renovation Concept</span>
                  </>
                )}
              </button>

              {generationError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <i className="bx bx-error-circle text-base text-rose-600 shrink-0 mt-0.5"></i>
                  <div className="flex-1">
                    <p className="font-bold">{generationError}</p>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="mt-1 text-xs font-bold text-rose-900 underline cursor-pointer"
                    >
                      Click here to retry
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Results & Side-by-Side Comparison (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* PREVIEW CONTAINER */}
            <div className="glass-card-luxury bg-white/90 rounded-3xl border border-amber-200/80 p-6 shadow-xl">

              {/* Top Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-amber-100 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center font-black">
                    <i className="bx bx-slider-alt text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">
                      Visual Comparison
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Original Structure vs. Proposed Renovation
                    </p>
                  </div>
                </div>

                {/* Actions: Randomizer & View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRandomizeHouse}
                    className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    title="Generate a random house redesign"
                  >
                    <i className="bx bx-shuffle text-amber-700"></i>
                    <span>Random Redesign</span>
                  </button>

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setComparisonMode('SLIDER')}
                      className={'px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ' +
                        (comparisonMode === 'SLIDER' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900')
                      }
                    >
                      <i className="bx bx-git-compare"></i> Split Slider
                    </button>
                    <button
                      type="button"
                      onClick={() => setComparisonMode('DUAL')}
                      className={'px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ' +
                        (comparisonMode === 'DUAL' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900')
                      }
                    >
                      <i className="bx bx-columns"></i> Side by Side
                    </button>
                  </div>
                </div>
              </div>

              {/* IMAGE COMPARISON VIEWPORT */}
              <div className="mt-6">

                {comparisonMode === 'SLIDER' ? (
                  /* SPLIT SLIDER VIEW */
                  <div 
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-inner select-none cursor-ew-resize bg-slate-900"
                    onMouseMove={(e) => {
                      if (isDraggingRef.current || e.buttons === 1) {
                        handleSliderMove(e.clientX, e.currentTarget.getBoundingClientRect());
                      }
                    }}
                    onTouchMove={(e) => {
                      if (e.touches[0]) {
                        handleSliderMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
                      }
                    }}
                    onMouseDown={() => (isDraggingRef.current = true)}
                    onMouseUp={() => (isDraggingRef.current = false)}
                  >
                    {/* AFTER: Proposed Renovation Image (Full Width underneath) */}
                    <img
                      src={proposedImage}
                      alt="Proposed AI Renovation"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* BEFORE: Original Image (Clipped by slider percentage) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: sliderPosition + '%' }}
                    >
                      <img
                        src={currentOriginalPhoto}
                        alt="Original Existing House"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ width: '100%', maxWidth: 'none' }}
                      />
                    </div>

                    {/* Vertical Dividing Line & Handle */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center cursor-ew-resize"
                      style={{ left: 'calc(' + sliderPosition + '% - 2px)' }}
                    >
                      <div className="w-8 h-8 rounded-full bg-white shadow-xl border-2 border-amber-500 flex items-center justify-center text-slate-800 text-xs">
                        <i className="bx bx-transfer text-amber-600"></i>
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white border border-white/20 z-10 shadow-lg">
                      Original
                    </div>
                    <div className="absolute top-3 right-3 bg-amber-500/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-lg z-10 border border-amber-400">
                      Proposed ({style})
                    </div>

                    {/* Bottom Prompt Helper */}
                    <div className="absolute bottom-3 inset-x-0 flex justify-center z-10 pointer-events-none">
                      <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10">
                        Drag or slide horizontally to compare before and after
                      </span>
                    </div>
                  </div>
                ) : (
                  /* DUAL SIDE-BY-SIDE VIEW */
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Original Card */}
                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col">
                      <div className="relative aspect-video bg-slate-900">
                        <img src={currentOriginalPhoto} alt="Original Existing House" className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-slate-950/80 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/20">
                          Original House
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs">
                        <p className="font-bold text-slate-800">Current Structure</p>
                        <p className="text-[10px] text-slate-500">Selected photo for elevation analysis</p>
                      </div>
                    </div>

                    {/* Proposed Card */}
                    <div className="rounded-2xl overflow-hidden border border-amber-300 bg-white shadow-sm flex flex-col">
                      <div className="relative aspect-video bg-slate-900">
                        <img src={proposedImage} alt="Proposed AI Renovation" className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md font-bold">
                          Proposed ({style})
                        </span>
                      </div>
                      <div className="p-3 bg-amber-50/50 border-t border-amber-100 text-xs">
                        <p className="font-bold text-slate-900">Redesigned Concept</p>
                        <p className="text-[10px] text-amber-800">{scope.replace(/_/g, ' ')}</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* 5. REDESIGN PREVIEW INSPIRATION GALLERY */}
              <div className="mt-6 pt-5 border-t border-amber-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <i className="bx bx-grid-alt text-amber-600"></i>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Redesign Preview Gallery
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Click any card to preview & compare that redesign instantly
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {REDESIGN_PREVIEWS.map((preset) => {
                    const isActive = activePresetId === preset.id;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => applyPreset(preset)}
                        className={'group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ' +
                          (isActive 
                            ? 'border-amber-500 ring-2 ring-amber-500/30 scale-102 shadow-md' 
                            : 'border-slate-200 hover:border-amber-300 hover:shadow-xs')
                        }
                      >
                        <div className="aspect-[4/3] relative bg-slate-900">
                          <img
                            src={preset.proposedImage}
                            alt={preset.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                          <span className="absolute top-1.5 left-1.5 text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                            {preset.badge}
                          </span>
                          <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-bold text-white leading-tight truncate">
                            {preset.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* API Configuration & Status Banner */}
              {result?.api_status === 'API_KEY_REQUIRED' ? (
                <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <i className="bx bx-info-circle text-lg text-amber-600"></i>
                    <span>Architectural Concept Preview Ready</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {result.missingKeyNotice}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-500 italic">
                      Expected key: <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-mono font-bold">REPLICATE_API_TOKEN</code> or <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-mono font-bold">OPENAI_API_KEY</code>
                    </span>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-all cursor-pointer"
                    >
                      Re-run Check
                    </button>
                  </div>
                </div>
              ) : result?.api_status === 'SUCCESS' ? (
                <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between">
                  <span className="flex items-center gap-2 font-bold">
                    <i className="bx bxs-check-shield text-emerald-600 text-base"></i>
                    Live AI Image Generated Successfully
                  </span>
                  <span className="text-[10px] bg-emerald-200/80 px-2.5 py-0.5 rounded-full font-black uppercase text-emerald-950">
                    Architectural Concept Preview
                  </span>
                </div>
              ) : null}

            </div>

            {/* ARCHITECTURAL DOSSIER REPORT */}
            {result?.report && (
              <div className="glass-card-luxury bg-white/90 rounded-3xl border border-amber-200/80 p-6 shadow-xl space-y-6 animate-fade-in">

                {/* Scope Header */}
                <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                      Architectural Feasibility Analysis
                    </span>
                    <h3 className="text-lg font-black text-slate-900">
                      {result.report.scopeTitle}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-amber-600 block">Est. Budget</span>
                    <span className="text-lg font-black text-slate-900">{result.report.estimatedBudget}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/60">
                  "{result.report.scopeSummary}"
                </p>

                {/* 3-Way Cost Breakdown */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Civil & Structural</p>
                    <p className="text-base font-black text-slate-900 mt-1">{result.report.civilCost || '₹14.5L'}</p>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Finishes & Glass</p>
                    <p className="text-base font-black text-amber-700 mt-1">{result.report.finishCost || '₹11.2L'}</p>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                    <p className="text-[10px] font-bold uppercase text-slate-500">MEP & Conduits</p>
                    <p className="text-base font-black text-slate-900 mt-1">{result.report.mepCost || '₹6.3L'}</p>
                  </div>
                </div>

                {/* Structural Steps Schedule */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                    <i className="bx bx-wrench text-amber-600"></i> Structural Modifications Schedule
                  </h4>
                  <ul className="space-y-2">
                    {result.report.structuralModifications.map((mod: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials Manifest */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                    <i className="bx bx-check-circle text-amber-600"></i> Approved Materials Schedule
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.report.materials.map((mat: string, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline & Municipal Clearances */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Timeline</span>
                    <span className="font-bold text-slate-900">{result.report.constructionTimeline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Municipal Feasibility</span>
                    <span className="font-bold text-slate-900">{result.report.permitRequirements}</span>
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/builders"
                    className="flex-1 btn-primary text-center text-xs py-3.5 shadow-md font-black uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <i className="bx bx-hard-hat text-base"></i>
                    Hire Verified Renovation Builder
                  </Link>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-secondary text-center text-xs py-3.5 font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <i className="bx bx-printer text-amber-600 text-base"></i>
                    Print Renovation Plan
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}
