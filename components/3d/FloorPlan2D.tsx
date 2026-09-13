'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import { generateHouseLayout } from './layoutGenerator';

export default function FloorPlan2D({ specs }: { specs: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const houseSpec = useMemo(() => generateHouseLayout(specs), [specs]);
  
  const [activeFloor, setActiveFloor] = React.useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = houseSpec.plotW;
    const l = houseSpec.plotL;

    // Scale to fit canvas (600x600)
    const padding = 60;
    const scale = Math.min((canvas.width - padding * 2) / w, (canvas.height - padding * 2) / l);
    
    const drawW = w * scale;
    const drawL = l * scale;
    const startX = (canvas.width - drawW) / 2;
    const startY = (canvas.height - drawL) / 2;

    // Draw Plot Boundary
    ctx.strokeStyle = '#334155'; // slate-700
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(startX, startY, drawW, drawL);
    ctx.setLineDash([]);
    
    // Plot Dimensions Labels
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${w} ft`, canvas.width / 2, startY - 10);
    
    ctx.save();
    ctx.translate(startX - 15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${l} ft`, 0, 0);
    ctx.restore();

    // Draw Rooms for active floor
    houseSpec.rooms.forEach(room => {
      if (room.level !== activeFloor) return;

      const rx = startX + (room.x * scale);
      const ry = startY + (room.y * scale);
      const rWidth = room.w * scale;
      const rLength = room.l * scale;

      // Color mapping
      let color = '#1e293b';
      if (room.type.includes('Bedroom')) color = '#312e81';
      if (room.type === 'Living Room') color = '#0f172a';
      if (room.type === 'Kitchen') color = '#78350f';
      if (room.type === 'Dining') color = '#14532d';
      if (room.type === 'Bathroom') color = '#0f766e';
      if (room.type === 'Balcony' || room.type === 'Terrace') color = '#475569';

      ctx.fillStyle = color;
      ctx.fillRect(rx, ry, rWidth, rLength);
      
      // Walls
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.strokeRect(rx, ry, rWidth, rLength);

      // Windows/Doors pseudo-drawing
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(rx + rWidth/2 - 10, ry + rLength - 3, 20, 6); // window bottom
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(rx + rWidth/2 - 10, ry - 3, 20, 6); // door top

      // Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(room.type, rx + rWidth / 2, ry + rLength / 2 - 6);
      
      ctx.font = '9px Inter, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`${Math.round(room.w)}x${Math.round(room.l)}`, rx + rWidth / 2, ry + rLength / 2 + 8);
    });

    // Add extra plot elements (only on ground floor)
    if (activeFloor === 0) {
      if (houseSpec.hasParking) {
         ctx.fillStyle = '#3f3f46';
         ctx.fillRect(startX + (w/2 - 10)*scale, startY + (l - 12)*scale, 10*scale, 12*scale);
         ctx.fillStyle = '#ffffff';
         ctx.fillText('Parking', startX + (w/2 - 5)*scale, startY + (l - 6)*scale);
      }
      if (houseSpec.hasGarden) {
         ctx.fillStyle = '#16653455'; // Transparent green
         ctx.fillRect(startX, startY, w*scale, houseSpec.hasParking ? (l-14)*scale : (l-6)*scale);
         ctx.fillStyle = '#4ade80';
         ctx.fillText('Garden / Lawn Area', startX + (w/2)*scale, startY + 10*scale);
      }
    }

  }, [houseSpec, activeFloor]);

  return (
    <div className="w-full h-full bg-slate-950 rounded-3xl overflow-hidden border border-white/5 relative flex flex-col">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
         <div className="flex bg-slate-900 rounded-xl p-1 border border-white/10 shadow-xl">
           {Array.from({ length: houseSpec.floors }).map((_, i) => (
              <button key={i} onClick={() => setActiveFloor(i)} className={`px-4 py-2 rounded-lg text-xs font-black uppercase ${activeFloor === i ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Floor {i+1}</button>
           ))}
         </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={800} 
          className="max-w-full max-h-full"
        />
      </div>
      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold text-white uppercase tracking-widest border border-white/10">
        Engineered 2D Draft
      </div>
    </div>
  );
}
