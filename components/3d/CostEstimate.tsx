'use client';
import React, { useMemo } from 'react';

export default function CostEstimate({ specs }: { specs: any }) {
  const estimate = useMemo(() => {
    const area = (parseInt(specs.plotWidth) || 30) * (parseInt(specs.plotLength) || 40);
    const floors = parseInt(specs.floors) || 1;
    const totalBuildArea = area * floors;
    
    let baseRate = 1500; // Base rate per sqft in INR
    
    if (specs.exteriorStyle === 'Luxury' || specs.interiorStyle === 'Luxury') baseRate += 800;
    if (specs.exteriorStyle === 'Modern') baseRate += 300;
    
    // Add feature costs
    let featureCost = 0;
    if (specs.parking === 'Yes') featureCost += 150000;
    if (specs.garden === 'Yes') featureCost += 50000;
    if (specs.balcony === 'Yes') featureCost += 100000 * floors;
    
    const materialCost = totalBuildArea * (baseRate * 0.6);
    const labourCost = totalBuildArea * (baseRate * 0.25);
    const interiorCost = totalBuildArea * (baseRate * 0.15);
    const totalCost = materialCost + labourCost + interiorCost + featureCost;

    const formatINR = (num: number) => {
      if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
      if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lakhs`;
      return `₹${num.toLocaleString('en-IN')}`;
    };

    return {
      area: totalBuildArea,
      materialCost: formatINR(materialCost),
      labourCost: formatINR(labourCost),
      interiorCost: formatINR(interiorCost),
      featureCost: formatINR(featureCost),
      totalCost: formatINR(totalCost)
    };
  }, [specs]);

  return (
    <div className="w-full h-full p-8 bg-slate-900 rounded-3xl border border-white/5 overflow-y-auto">
      <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">
        Estimated Construction <span className="text-gradient">Cost</span>
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Build Area</p>
          <p className="text-2xl font-black text-white">{estimate.area} <span className="text-sm text-slate-400">sq.ft</span></p>
        </div>
        <div className="bg-indigo-600/10 p-6 rounded-2xl border border-indigo-500/20">
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Estimated Total</p>
          <p className="text-3xl font-black text-indigo-400">{estimate.totalCost}</p>
        </div>
      </div>

      <div className="space-y-4">
        <CostRow label="Material Cost (Cement, Steel, Bricks)" value={estimate.materialCost} icon="bx-cube-alt" />
        <CostRow label="Labour Cost" value={estimate.labourCost} icon="bx-hard-hat" />
        <CostRow label="Interior & Finishes" value={estimate.interiorCost} icon="bx-paint" />
        <CostRow label="Additional Features (Parking, Garden)" value={estimate.featureCost} icon="bx-plus-circle" />
      </div>
      
      <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3 text-yellow-500/80">
        <i className="bx bx-info-circle text-xl"></i>
        <p className="text-xs font-medium">This is an approximate algorithmic estimate based on current market rates and your selected requirements. Actual costs may vary depending on location and material availability.</p>
      </div>
    </div>
  );
}

function CostRow({ label, value, icon }: { label: string, value: string, icon: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
          <i className={`bx ${icon}`}></i>
        </div>
        <span className="text-sm font-bold text-slate-300">{label}</span>
      </div>
      <span className="text-lg font-black text-white">{value}</span>
    </div>
  );
}
