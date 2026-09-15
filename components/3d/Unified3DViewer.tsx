'use client';
import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, ContactShadows, Box, Cone, Cylinder } from '@react-three/drei';
import { generateHouseLayout, Room, HouseSpec } from './layoutGenerator';
import * as THREE from 'three';

// Procedural Furniture Generator
const Furniture = ({ roomType, w, l, style }: { roomType: string, w: number, l: number, style: string }) => {
  const isLuxury = style === 'Luxury';
  const isTraditional = style === 'Traditional';
  const cWood = isTraditional ? '#451a03' : (isLuxury ? '#d4af37' : '#334155');
  const cFabric = isTraditional ? '#fef3c7' : (isLuxury ? '#1e293b' : '#cbd5e1');

  if (roomType === 'Living Room') {
    return (
      <group position={[w/2, 0, l/2]}>
        {/* Sofa */}
        <Box position={[0, 0.4, 1.5]} args={[w * 0.6, 0.8, 0.8]} castShadow>
          <meshStandardMaterial color={cFabric} />
        </Box>
        {/* Coffee Table */}
        <Box position={[0, 0.3, 0]} args={[w * 0.4, 0.3, 0.6]} castShadow>
          <meshStandardMaterial color={cWood} />
        </Box>
        {/* TV Unit */}
        <Box position={[0, 0.6, -1.5]} args={[w * 0.5, 1.2, 0.2]} castShadow>
          <meshStandardMaterial color={cWood} />
        </Box>
      </group>
    );
  }

  if (roomType.includes('Bedroom')) {
    return (
      <group position={[w/2, 0, l/2]}>
        {/* Bed */}
        <Box position={[0, 0.4, -0.5]} args={[w * 0.5, 0.5, l * 0.5]} castShadow>
          <meshStandardMaterial color={cWood} />
        </Box>
        {/* Mattress */}
        <Box position={[0, 0.7, -0.5]} args={[w * 0.45, 0.2, l * 0.45]} castShadow>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        {/* Wardrobe */}
        <Box position={[-w/2 + 0.6, 1.2, 0]} args={[1, 2.4, l * 0.6]} castShadow>
          <meshStandardMaterial color={cWood} />
        </Box>
      </group>
    );
  }

  if (roomType === 'Kitchen') {
    return (
      <group position={[w/2, 0, l/2]}>
        {/* L-shaped counter */}
        <Box position={[0, 0.5, -l/2 + 0.6]} args={[w * 0.8, 1, 1.2]} castShadow>
          <meshStandardMaterial color={cWood} />
        </Box>
        <Box position={[-w/2 + 0.6, 0.5, 0]} args={[1.2, 1, l * 0.6]} castShadow>
          <meshStandardMaterial color={cWood} />
        </Box>
        {/* Fridge */}
        <Box position={[w/2 - 0.6, 1, -l/2 + 0.6]} args={[1, 2, 1]} castShadow>
          <meshStandardMaterial color="#cbd5e1" />
        </Box>
      </group>
    );
  }

  if (roomType === 'Dining') {
    return (
      <group position={[w/2, 0, l/2]}>
        {/* Table */}
        <Box position={[0, 0.5, 0]} args={[w * 0.5, 0.1, l * 0.5]} castShadow>
          <meshStandardMaterial color={cWood} />
        </Box>
        <Cylinder position={[0, 0.25, 0]} args={[0.2, 0.2, 0.5]} castShadow>
          <meshStandardMaterial color={cWood} />
        </Cylinder>
      </group>
    );
  }

  if (roomType === 'Bathroom') {
    return (
      <group position={[w/2, 0, l/2]}>
         <Box position={[0, 0.4, -l/2 + 0.5]} args={[w * 0.6, 0.8, 1]} castShadow>
          <meshStandardMaterial color="#ffffff" />
        </Box>
      </group>
    );
  }

  return null;
};

// Generates the 3D model of the house
const HouseModel = ({ spec, cutawayMode, activeFloor }: { spec: HouseSpec, cutawayMode: boolean, activeFloor: number | 'ALL' }) => {
  const getStyleColors = (style: string) => {
    switch (style) {
      case 'Modern': return { wall: '#e2e8f0', roof: '#334155', window: '#bae6fd', frame: '#1e293b', floor: '#cbd5e1' };
      case 'Traditional': return { wall: '#d6d3d1', roof: '#78350f', window: '#fef3c7', frame: '#451a03', floor: '#d4d4d8' };
      case 'Luxury': return { wall: '#fdfbf7', roof: '#0f172a', window: '#e0f2fe', frame: '#d4af37', floor: '#1e293b' };
      case 'Industrial': return { wall: '#a1a1aa', roof: '#18181b', window: '#7dd3fc', frame: '#000000', floor: '#52525b' };
      default: return { wall: '#f1f5f9', roof: '#475569', window: '#bfdbfe', frame: '#334155', floor: '#e2e8f0' };
    }
  };

  const colors = getStyleColors(spec.style);
  const wallHeight = 1.2;
  const unit = 0.1; // scale factor

  // Translate a layout room into 3D geometry
  const renderRoom = (room: Room) => {
    // Check if this floor should be visible
    if (activeFloor !== 'ALL' && room.level !== activeFloor) return null;
    if (cutawayMode && activeFloor !== 'ALL' && room.level > activeFloor) return null;

    const rx = room.x * unit;
    const rz = room.y * unit;
    const rw = room.w * unit;
    const rl = room.l * unit;
    const ry = room.level * wallHeight;
    const isBalcony = room.type === 'Balcony';
    const isTerrace = room.type === 'Terrace';

    const showFrontWall = !(cutawayMode && (room.level === activeFloor || activeFloor === 'ALL'));
    const showRoof = !cutawayMode && room.level === spec.floors - 1;

    return (
      <group key={room.id} position={[rx - (spec.plotW * unit)/2, ry, rz - (spec.plotL * unit)/2]}>
        
        {/* Floor Slab */}
        <Box position={[rw/2, 0.05, rl/2]} args={[rw, 0.1, rl]} receiveShadow>
          <meshStandardMaterial color={isBalcony || isTerrace ? '#94a3b8' : colors.floor} />
        </Box>

        {!isTerrace && (
          <>
            {/* Back Wall */}
            <Box position={[rw/2, wallHeight/2, 0.05]} args={[rw, wallHeight, 0.1]} castShadow receiveShadow>
              <meshStandardMaterial color={colors.wall} transparent={isBalcony} opacity={isBalcony ? 0.3 : 1} />
            </Box>
            
            {/* Left Wall */}
            <Box position={[0.05, wallHeight/2, rl/2]} args={[0.1, wallHeight, rl]} castShadow receiveShadow>
              <meshStandardMaterial color={colors.wall} transparent={isBalcony} opacity={isBalcony ? 0.3 : 1} />
            </Box>

            {/* Right Wall */}
            <Box position={[rw - 0.05, wallHeight/2, rl/2]} args={[0.1, wallHeight, rl]} castShadow receiveShadow>
              <meshStandardMaterial color={colors.wall} transparent={isBalcony} opacity={isBalcony ? 0.3 : 1} />
            </Box>

            {/* Front Wall (Hidable for Cutaway) */}
            {showFrontWall && (
              <Box position={[rw/2, wallHeight/2, rl - 0.05]} args={[rw, wallHeight, 0.1]} castShadow receiveShadow>
                <meshStandardMaterial color={colors.wall} transparent={isBalcony} opacity={isBalcony ? 0.3 : 1} />
              </Box>
            )}

            {/* Furniture (Only show in Cutaway/Interior mode for active floor) */}
            {(cutawayMode || activeFloor !== 'ALL') && !isBalcony && (activeFloor === 'ALL' || room.level === activeFloor) && (
              <Furniture roomType={room.type} w={rw} l={rl} style={spec.interiorStyle} />
            )}
          </>
        )}
      </group>
    );
  };

  const drawW = (spec.plotW - 4) * unit;
  const drawL = (spec.plotL - (spec.hasParking ? 14 : 8) - 4) * unit;
  const roofY = spec.floors * wallHeight + 0.1;

  return (
    <group>
      {/* Rooms */}
      {spec.rooms.map(renderRoom)}

      {/* Roof (Hidden in Cutaway unless specified) */}
      {!cutawayMode && (activeFloor === 'ALL' || activeFloor === spec.floors - 1) && (
        <group position={[0, roofY, (spec.hasParking ? -3 : 2) * unit]}>
           {spec.style === 'Traditional' ? (
             <Cone args={[Math.max(drawW, drawL) * 0.7, 1.5, 4]} rotation={[0, Math.PI / 4, 0]} castShadow>
               <meshStandardMaterial color={colors.roof} />
             </Cone>
           ) : (
             <Box args={[drawW + 0.4, 0.2, drawL + 0.4]} castShadow>
               <meshStandardMaterial color={colors.roof} />
             </Box>
           )}
        </group>
      )}

      {/* Parking Pad */}
      {spec.hasParking && (
        <Box position={[0, 0.02, (spec.plotL * unit) / 2 - 1]} args={[2.5, 0.04, 3]} receiveShadow>
           <meshStandardMaterial color="#1e293b" />
        </Box>
      )}
    </group>
  );
};

export default function Unified3DViewer({ specs, activeTab }: { specs: any, activeTab: string }) {
  const isCutaway = activeTab === 'DOLLHOUSE';
  const [activeFloor, setActiveFloor] = React.useState<number | 'ALL'>(isCutaway ? 0 : 'ALL');
  
  const houseSpec = useMemo(() => generateHouseLayout(specs), [specs]);
  
  const pw = houseSpec.plotW * 0.1;
  const pl = houseSpec.plotL * 0.1;

  // Sync floor reset
  React.useEffect(() => {
    if (!isCutaway) setActiveFloor('ALL');
  }, [isCutaway]);

  return (
    <div className="w-full h-full relative bg-slate-900 rounded-3xl overflow-hidden border border-white/5 flex flex-col touch-none select-none">
      {/* 3D Viewport Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
         {isCutaway && (
           <div className="flex bg-slate-950/80 backdrop-blur rounded-xl p-1 border border-white/10 shadow-xl">
             <button onClick={() => setActiveFloor('ALL')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase ${activeFloor === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>All Floors</button>
             {Array.from({ length: houseSpec.floors }).map((_, i) => (
                <button key={i} onClick={() => setActiveFloor(i)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase ${activeFloor === i ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Floor {i+1}</button>
             ))}
           </div>
         )}
      </div>

      <Canvas dpr={[1, 1.25]} camera={{ position: [pw * 1.5, 3, pl * 1.5], fov: 45 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow shadow-mapSize={[512, 512]} />
        
        {/* Plot Ground */}
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[pw * 1.2, pl * 1.2]} />
          <meshStandardMaterial color={houseSpec.hasGarden ? '#166534' : '#475569'} />
        </mesh>

        <HouseModel spec={houseSpec} cutawayMode={isCutaway} activeFloor={activeFloor} />

        <ContactShadows resolution={256} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2 - 0.05} target={[0, 1, 0]} />
      </Canvas>

      <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold text-white uppercase tracking-widest border border-white/10 shadow-xl">
        <i className="bx bx-move mr-2"></i> {isCutaway ? 'Dollhouse Cutaway Mode' : 'Exterior Architectural View'}
      </div>
    </div>
  );
}
