'use client';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Box, Cone, Cylinder, Ring, CameraControls, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { generateHouseLayout, Room, HouseSpec } from './layoutGenerator';
import { Sofa, TVUnit, Bed, DiningSet, KitchenSet, BathroomSet, Wardrobe, StudySet, PoojaSet, Staircase, DrivewayCar, ExteriorSconceLight, PottedPlant, PorchSteps, PatioSet, SlidingGlassDoors, GardenFlowers } from './DetailedFurniture';

const FLOOR_HEIGHT = 1.8;
const UNIT = 0.1;

export type QualityMode = 'AUTO' | 'HIGH' | 'MEDIUM' | 'LOW';

const MemoizedRoomInterior = React.memo(({ 
  room, 
  w, 
  l, 
  styleColors, 
  isLightActive, 
  showFurniture 
}: { 
  room: Room; 
  w: number; 
  l: number; 
  styleColors: any; 
  isLightActive: boolean; 
  showFurniture: boolean; 
}) => {
  const c = styleColors;
  return (
    <group>
      {/* Render point light ONLY for the active room to drastically improve mobile FPS */}
      {isLightActive && (
        <pointLight position={[w / 2, 1.2, l / 2]} intensity={0.6} distance={5} color="#ffeedd" />
      )}
      
      {showFurniture && (
        <>
          {room.type === 'Living Room' && (
            <group position={[w / 2, 0, l / 2]}>
              <group position={[0, 0, 0]}><Sofa color={c} /></group>
              <group position={[0, 0, -l / 2 + 0.3]}><TVUnit color={c} /></group>
            </group>
          )}
          {room.type.includes('Bedroom') && (
            <group position={[w / 2, 0, l / 2]}>
              <group position={[0, 0, -l / 2 + 1.1]}><Bed color={c} /></group>
              <group position={[-w / 2 + 0.7, 0, 0]} rotation={[0, Math.PI / 2, 0]}><Wardrobe color={c} /></group>
            </group>
          )}
          {room.type === 'Kitchen' && <group position={[w / 2, 0, 0.4]}><KitchenSet color={c} /></group>}
          {room.type === 'Dining' && <group position={[w / 2, 0, l / 2]}><DiningSet color={c} /></group>}
          {room.type === 'Bathroom' && <group position={[w / 2, 0, l / 2]}><BathroomSet color={c} /></group>}
          {room.type === 'Study Room' && <group position={[w / 2, 0, l / 2]}><StudySet color={c} /></group>}
          {room.type === 'Pooja Room' && <group position={[w / 2, 0, 0.5]}><PoojaSet color={c} /></group>}
        </>
      )}
    </group>
  );
});

MemoizedRoomInterior.displayName = 'MemoizedRoomInterior';

// Pin-to-pin Wall with architectural window frame and door cutouts
// Pin-to-pin Wall with architectural cantilever frame, wood slat cladding, glowing windows and LED sconces
const WallWithWindow = React.memo(({ w, h, thickness, color, isFront, enableShadows }: { w: number; h: number; thickness: number; color: any; isFront: boolean; enableShadows: boolean }) => {
  const ww = Math.min(w * 0.45, 1.5);
  const wh = h * 0.55;
  
  if (w < 1.0) {
    return (
      <Box args={[w, h, thickness]} castShadow={enableShadows} receiveShadow={enableShadows}>
        <meshStandardMaterial color={color.wall} roughness={0.3} metalness={0.1} />
      </Box>
    );
  }
  
  return (
    <group>
      {/* Wall Segments with Stucco Texture Finish */}
      <Box position={[-w / 2 + (w - ww) / 4, 0, 0]} args={[(w - ww) / 2, h, thickness]} castShadow={enableShadows} receiveShadow={enableShadows}>
        <meshStandardMaterial color={color.wall} roughness={0.4} metalness={0.05} />
      </Box>
      <Box position={[w / 2 - (w - ww) / 4, 0, 0]} args={[(w - ww) / 2, h, thickness]} castShadow={enableShadows} receiveShadow={enableShadows}>
        <meshStandardMaterial color={color.wall} roughness={0.4} metalness={0.05} />
      </Box>
      <Box position={[0, -h / 2 + (h - wh) / 4, 0]} args={[ww, (h - wh) / 2, thickness]} castShadow={enableShadows} receiveShadow={enableShadows}>
        <meshStandardMaterial color={color.wall} roughness={0.4} metalness={0.05} />
      </Box>
      <Box position={[0, h / 2 - (h - wh) / 4, 0]} args={[ww, (h - wh) / 2, thickness]} castShadow={enableShadows} receiveShadow={enableShadows}>
        <meshStandardMaterial color={color.wall} roughness={0.4} metalness={0.05} />
      </Box>

      {/* Modern Architectural Wood Slat Accent Cladding on Front Facades */}
      {isFront && (
        <group position={[-w / 2 + (w - ww) / 4, 0, thickness / 2 + 0.005]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Box key={i} position={[0, -h / 2 + (i + 0.5) * (h / 8), 0.005]} args={[(w - ww) / 2 - 0.04, h / 12, 0.01]}>
              <meshStandardMaterial color="#4a2c17" roughness={0.4} />
            </Box>
          ))}
        </group>
      )}

      {/* Skirting Trim / Baseboard */}
      <Box position={[0, -h / 2 + 0.03, 0]} args={[w, 0.06, thickness * 1.1]}>
        <meshStandardMaterial color={color.wood} roughness={0.4} />
      </Box>

      {/* Warm Interior Glow Light Panel behind glass */}
      <Box position={[0, 0, -thickness * 0.05]} args={[ww - 0.02, wh - 0.02, 0.01]}>
        <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.6} />
      </Box>

      {/* Glass Window */}
      <Box position={[0, 0, 0]} args={[ww, wh, thickness * 0.2]}>
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.65} metalness={0.2} roughness={0.1} />
      </Box>

      {/* Black Architectural Window Mullions / Grid Bars */}
      <Box position={[0, 0, thickness * 0.12]} args={[0.03, wh, 0.02]}>
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </Box>
      <Box position={[0, 0, thickness * 0.12]} args={[ww, 0.03, 0.02]}>
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Modern Window Frame Box (Cantilever Surround) */}
      <Box position={[0, 0, thickness * 0.15]} args={[ww + 0.08, wh + 0.08, 0.06]}>
        <meshStandardMaterial color={color.frame} roughness={0.2} metalness={0.7} />
      </Box>

      {/* Up/Down LED Exterior Sconce Spotlights on Front Elevation */}
      {isFront && enableShadows && (
        <>
          <ExteriorSconceLight position={[-w / 2 + 0.2, 0.2, thickness / 2]} />
          <ExteriorSconceLight position={[w / 2 - 0.2, 0.2, thickness / 2]} />
        </>
      )}
    </group>
  );
});

WallWithWindow.displayName = 'WallWithWindow';

// Pin-Point 3D Room Marker Pointer
const RoomPinMarker = React.memo(({ position, name, isSelected, onClick }: { position: [number, number, number]; name: string; isSelected: boolean; onClick: () => void }) => {
  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {/* Glowing Floor Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.2, 0.28, 32]} />
        <meshStandardMaterial color={isSelected ? '#6366f1' : '#38bdf8'} emissive={isSelected ? '#6366f1' : '#38bdf8'} emissiveIntensity={0.8} />
      </mesh>

      {/* Vertical Pin Line */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
        <meshStandardMaterial color={isSelected ? '#818cf8' : '#38bdf8'} />
      </mesh>

      {/* Pin Head Cone */}
      <Cone args={[0.12, 0.3, 4]} position={[0, 1.25, 0]} rotation={[Math.PI, 0, 0]}>
        <meshStandardMaterial color={isSelected ? '#4f46e5' : '#0284c7'} roughness={0.2} metalness={0.8} />
      </Cone>

      {/* Floating Pin Badge */}
      <Html position={[0, 1.55, 0]} center zIndexRange={[100, 0]}>
        <div 
          className={`bg-[#0f1525]/95 border ${isSelected ? 'border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-110 font-black' : 'border-white/20 text-slate-200 font-bold'} px-3.5 py-1.5 rounded-full text-[10px] whitespace-nowrap backdrop-blur-md flex items-center gap-2 cursor-pointer hover:scale-105 transition-all`}
        >
          <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-indigo-400 shadow-[0_0_8px_#818cf8]' : 'bg-blue-400'} animate-pulse`}></div>
          {name}
        </div>
      </Html>
    </group>
  );
});

RoomPinMarker.displayName = 'RoomPinMarker';

const FloorGroup = ({ spec, level, children, isExploded }: { spec: HouseSpec; level: number; children: React.ReactNode; isExploded: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const targetY = isExploded ? level * 2.5 : 0;
      const currentY = groupRef.current.position.y;
      if (Math.abs(currentY - targetY) > 0.005) {
        groupRef.current.position.y = THREE.MathUtils.lerp(currentY, targetY, 0.1);
      } else {
        groupRef.current.position.y = targetY;
      }
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

const ArchitecturalModel = React.memo(({ 
  spec, 
  viewMode, 
  activeFloor, 
  activeRoomId, 
  explodedView, 
  onRoomClick,
  effectiveQuality
}: { 
  spec: HouseSpec; 
  viewMode: string; 
  activeFloor: number | 'ALL'; 
  activeRoomId: string | null; 
  explodedView: boolean; 
  onRoomClick: (id: string) => void;
  effectiveQuality: string;
}) => {
  const getStyleColors = (style: string, isExterior = false) => {
    let base = { wall: '#f8fafc', roof: '#1e293b', window: '#e0f2fe', frame: '#334155', floor: '#cbd5e1', wood: '#4a2c17', fabric: '#94a3b8', metal: '#1e293b', text: '#ffffff' };
    switch (style) {
      case 'Luxury': 
        base = { wall: '#fafaf9', roof: '#0f172a', window: '#e0f2fe', frame: '#d4af37', floor: '#1e293b', wood: '#451a03', fabric: '#fef3c7', metal: '#d4af37', text: '#ffffff' };
        break;
      case 'Modern': 
        base = { wall: '#f8fafc', roof: '#1e293b', window: '#e0f2fe', frame: '#334155', floor: '#cbd5e1', wood: '#4a2c17', fabric: '#94a3b8', metal: '#1e293b', text: '#000000' };
        break;
      case 'Traditional': 
        base = { wall: '#fdfbf7', roof: '#991b1b', window: '#fef3c7', frame: '#78350f', floor: '#d4d4d8', wood: '#78350f', fabric: '#d6d3d1', metal: '#451a03', text: '#ffffff' };
        break;
      case 'Industrial': 
        base = { wall: '#475569', roof: '#09090b', window: '#7dd3fc', frame: '#1e293b', floor: '#52525b', wood: '#27272a', fabric: '#52525b', metal: '#000000', text: '#ffffff' };
        break;
      case 'Minimalist': 
        base = { wall: '#ffffff', roof: '#0f172a', window: '#e0f2fe', frame: '#09090b', floor: '#e2e8f0', wood: '#18181b', fabric: '#e2e8f0', metal: '#09090b', text: '#000000' };
        break;
      default: 
        base = { wall: '#f8fafc', roof: '#1e293b', window: '#bfdbfe', frame: '#334155', floor: '#e2e8f0', wood: '#475569', fabric: '#cbd5e1', metal: '#334155', text: '#000000' };
    }
    if (isExterior && spec.wallColor) {
      base.wall = spec.wallColor;
    }
    return base;
  };

  const extColors = getStyleColors(spec.style, true);
  const intColors = getStyleColors(spec.interiorStyle, false);
  const isCutaway = viewMode === 'CUTAWAY' || viewMode === 'INTERIOR' || explodedView;
  const enableShadows = effectiveQuality === 'HIGH';

  const renderFloor = (level: number) => {
    if (activeFloor !== 'ALL' && level !== activeFloor) return null;
    if (isCutaway && activeFloor !== 'ALL' && level > (activeFloor as number)) return null;

    const floorRooms = spec.rooms.filter(r => r.level === level);
    if (floorRooms.length === 0) return null;

    return (
      <FloorGroup key={`floor_${level}`} spec={spec} level={level} isExploded={explodedView}>
        {floorRooms.map(room => {
          const rx = room.x * UNIT;
          const rz = room.y * UNIT;
          const rw = room.w * UNIT;
          const rl = room.l * UNIT;
          const ry = room.level * FLOOR_HEIGHT;
          const isBalcony = room.type === 'Balcony';
          const isTerrace = room.type === 'Terrace';
          const showFrontWall = !isCutaway;
          const isSelectedRoom = activeRoomId === room.id;
          const wallH = viewMode === 'CUTAWAY' ? FLOOR_HEIGHT * 0.4 : FLOOR_HEIGHT;

          // Performance optimization: Furniture pruning
          const showFurniture = isCutaway && (activeFloor === 'ALL' || activeFloor === level);

          // Floor material variations for pin-to-pin interior detailing
          const floorColor = isBalcony || isTerrace
            ? '#64748b'
            : (room.type === 'Living Room' || room.type === 'Dining'
                ? (isSelectedRoom ? '#6366f1' : '#1e293b')
                : (room.type.includes('Bedroom')
                    ? '#451a03'
                    : '#334155'));

          // Pin-Point label decision
          let showPin = false;
          if (isCutaway) {
            if (effectiveQuality === 'LOW') {
              showPin = isSelectedRoom;
            } else if (effectiveQuality === 'MEDIUM') {
              showPin = isSelectedRoom || activeFloor === level || activeFloor === 'ALL';
            } else {
              showPin = true;
            }
          }

          return (
            <group 
              key={room.id} 
              position={[rx - (spec.plotW * UNIT)/2, ry, rz - (spec.plotL * UNIT)/2]}
              onClick={(e) => {
                if (isCutaway) {
                  e.stopPropagation();
                  onRoomClick(room.id);
                }
              }}
            >
              
              {/* Floor Slab with Pin-to-pin Tile Edging */}
              <Box position={[rw/2, 0.05, rl/2]} args={[rw, 0.1, rl]} receiveShadow={enableShadows}>
                <meshStandardMaterial color={floorColor} roughness={0.4} />
              </Box>

              {/* Corner Structural Pillars (Pin-to-pin Framing) */}
              <Box position={[0.04, FLOOR_HEIGHT / 2, 0.04]} args={[0.08, FLOOR_HEIGHT, 0.08]}>
                <meshStandardMaterial color={extColors.frame} metalness={0.7} roughness={0.2} />
              </Box>
              <Box position={[rw - 0.04, FLOOR_HEIGHT / 2, 0.04]} args={[0.08, FLOOR_HEIGHT, 0.08]}>
                <meshStandardMaterial color={extColors.frame} metalness={0.7} roughness={0.2} />
              </Box>
              <Box position={[0.04, FLOOR_HEIGHT / 2, rl - 0.04]} args={[0.08, FLOOR_HEIGHT, 0.08]}>
                <meshStandardMaterial color={extColors.frame} metalness={0.7} roughness={0.2} />
              </Box>
              <Box position={[rw - 0.04, FLOOR_HEIGHT / 2, rl - 0.04]} args={[0.08, FLOOR_HEIGHT, 0.08]}>
                <meshStandardMaterial color={extColors.frame} metalness={0.7} roughness={0.2} />
              </Box>

              {/* Walls or Railings */}
              {(!isBalcony && !isTerrace) ? (
                <>
                  <group position={[rw/2, wallH/2, 0.05]}>
                    <WallWithWindow w={rw} h={wallH} thickness={0.1} color={extColors} isFront={false} enableShadows={enableShadows} />
                  </group>
                  <group position={[0.05, wallH/2, rl/2]} rotation={[0, Math.PI/2, 0]}>
                    <WallWithWindow w={rl} h={wallH} thickness={0.1} color={extColors} isFront={false} enableShadows={enableShadows} />
                  </group>
                  <group position={[rw - 0.05, wallH/2, rl/2]} rotation={[0, Math.PI/2, 0]}>
                    <WallWithWindow w={rl} h={wallH} thickness={0.1} color={extColors} isFront={false} enableShadows={enableShadows} />
                  </group>
                  {showFrontWall && (
                    <group position={[rw/2, wallH/2, rl - 0.05]}>
                      <WallWithWindow w={rw} h={wallH} thickness={0.1} color={extColors} isFront={true} enableShadows={enableShadows} />
                    </group>
                  )}
                  
                  <MemoizedRoomInterior 
                    room={room} 
                    w={rw} 
                    l={rl} 
                    styleColors={intColors} 
                    isLightActive={isSelectedRoom || (viewMode === 'INTERIOR' && isSelectedRoom)}
                    showFurniture={showFurniture}
                  />

                  {/* 3D Internal Staircase for Living Room on Ground/First Floor */}
                  {room.type === 'Living Room' && level < spec.floors - 1 && (
                    <group position={[0.6, 0.1, rl - 1.2]} rotation={[0, -Math.PI / 2, 0]}>
                      <Staircase height={FLOOR_HEIGHT} color={intColors} />
                    </group>
                  )}
                </>
              ) : (
                <>
                  {/* Sliding Glass Doors connecting room to outdoor terrace */}
                  <group position={[rw / 2, 0, 0.05]}>
                    <SlidingGlassDoors width={Math.min(rw * 0.8, 2.0)} height={FLOOR_HEIGHT * 0.85} />
                  </group>

                  {/* Outdoor Patio Armchairs & Coffee Table (matching reference image) */}
                  <group position={[rw / 2, 0.1, rl / 2]}>
                    <PatioSet color={extColors} />
                  </group>

                  {/* Glass Railings for Balcony/Terrace */}
                  <group position={[rw/2, 0.5, rl - 0.05]}>
                    <Box args={[rw, 1.0, 0.05]} castShadow={enableShadows}>
                       <meshStandardMaterial color="#a3e6ff" transparent opacity={0.4} roughness={0.1} />
                    </Box>
                    <Box position={[0, 0.5, 0]} args={[rw, 0.05, 0.1]}><meshStandardMaterial color={extColors.metal} metalness={0.8} roughness={0.2} /></Box>
                  </group>
                  <group position={[0.05, 0.5, rl/2]} rotation={[0, Math.PI/2, 0]}>
                    <Box args={[rl, 1.0, 0.05]} castShadow={enableShadows}>
                       <meshStandardMaterial color="#a3e6ff" transparent opacity={0.4} roughness={0.1} />
                    </Box>
                    <Box position={[0, 0.5, 0]} args={[rl, 0.05, 0.1]}><meshStandardMaterial color={extColors.metal} metalness={0.8} roughness={0.2} /></Box>
                  </group>
                  <group position={[rw - 0.05, 0.5, rl/2]} rotation={[0, Math.PI/2, 0]}>
                    <Box args={[rl, 1.0, 0.05]} castShadow={enableShadows}>
                       <meshStandardMaterial color="#a3e6ff" transparent opacity={0.4} roughness={0.1} />
                    </Box>
                    <Box position={[0, 0.5, 0]} args={[rl, 0.05, 0.1]}><meshStandardMaterial color={extColors.metal} metalness={0.8} roughness={0.2} /></Box>
                  </group>
                  
                  {/* Lavender/Purple Flowers & Shrubs along Terrace Border */}
                  <GardenFlowers position={[0.4, 0.1, rl - 0.3]} />
                  <GardenFlowers position={[rw - 0.4, 0.1, rl - 0.3]} />
                </>
              )}

              {/* Pin-Point Room Pointer Beacon */}
              {showPin && (
                <RoomPinMarker 
                  position={[rw / 2, 0.1, rl / 2]} 
                  name={room.name} 
                  isSelected={isSelectedRoom} 
                  onClick={() => onRoomClick(room.id)}
                />
              )}
            </group>
          );
        })}

        {/* Floor Level Pin Label for Exploded View */}
        {(explodedView || isCutaway) && activeFloor === 'ALL' && effectiveQuality === 'HIGH' && (
           <Html 
             position={[- (spec.plotW * UNIT)/2 - 0.2, level * FLOOR_HEIGHT + FLOOR_HEIGHT/2, 0]} 
             center
           >
             <div className="flex items-center gap-3 pr-8 opacity-90 hover:opacity-100 transition-opacity">
               <div className="w-16 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500 flex justify-end items-center relative">
                  <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa] absolute right-0 translate-x-1/2"></div>
               </div>
               <div className="bg-[#0f1525]/90 border border-blue-500/50 text-blue-100 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.3)] whitespace-nowrap">
                 FLOOR {level + 1}
               </div>
             </div>
           </Html>
        )}
      </FloorGroup>
    );
  };

  const pw = spec.plotW * UNIT;
  const pl = spec.plotL * UNIT;
  const drawW = (spec.plotW - 4) * UNIT;
  const drawL = (spec.plotL - (spec.hasParking ? 14 : 8) - 4) * UNIT;
  const roofY = spec.floors * FLOOR_HEIGHT + 0.1;

  return (
    <group>
      {Array.from({ length: spec.floors }).map((_, i) => renderFloor(i))}

      {/* Roof & Terrace Architectural Accessories */}
      {(!isCutaway || (activeFloor !== 'ALL' && activeFloor < spec.floors - 1) || explodedView) && activeFloor === 'ALL' && (
        <FloorGroup spec={spec} level={spec.floors} isExploded={explodedView}>
           <group position={[0, roofY - (spec.floors * FLOOR_HEIGHT), (spec.hasParking ? -3 : 2) * UNIT]}>
             {spec.style === 'Traditional' ? (
               <Cone args={[Math.max(drawW, drawL) * 0.7, 1.5, 4]} rotation={[0, Math.PI / 4, 0]} castShadow={enableShadows}>
                 <meshStandardMaterial color={extColors.roof} roughness={0.3} />
               </Cone>
             ) : (
               <group>
                 {/* Main Slab */}
                 <Box args={[drawW + 0.4, 0.2, drawL + 0.4]} castShadow={enableShadows}>
                   <meshStandardMaterial color={extColors.roof} roughness={0.3} />
                 </Box>
                 {/* Parapet Wall Perimeter */}
                 <Box args={[drawW + 0.4, 0.3, 0.08]} position={[0, 0.25, (drawL + 0.4) / 2]}><meshStandardMaterial color={extColors.wall} /></Box>
                 <Box args={[drawW + 0.4, 0.3, 0.08]} position={[0, 0.25, -(drawL + 0.4) / 2]}><meshStandardMaterial color={extColors.wall} /></Box>
                 <Box args={[0.08, 0.3, drawL + 0.4]} position={[(drawW + 0.4) / 2, 0.25, 0]}><meshStandardMaterial color={extColors.wall} /></Box>
                 <Box args={[0.08, 0.3, drawL + 0.4]} position={[-(drawW + 0.4) / 2, 0.25, 0]}><meshStandardMaterial color={extColors.wall} /></Box>
                 {/* Rooftop Water Storage Tank */}
                 <group position={[drawW / 3, 0.5, -drawL / 3]}>
                   <Cylinder args={[0.4, 0.4, 0.9, 16]} position={[0, 0.45, 0]} castShadow><meshStandardMaterial color="#0284c7" metalness={0.6} roughness={0.2} /></Cylinder>
                   <Box args={[0.9, 0.2, 0.9]} position={[0, 0.1, 0]}><meshStandardMaterial color="#334155" /></Box>
                 </group>
               </group>
             )}
           </group>
        </FloorGroup>
      )}

      {/* Entrance Plants */}
      <group>
        {/* Potted Ceramic Planters at Main Entrance */}
        <PottedPlant position={[-0.9, 0.05, pl / 2 + 0.2]} />
        <PottedPlant position={[0.9, 0.05, pl / 2 + 0.2]} />
      </group>

      {/* Main Entrance Porch Steps */}
      <PorchSteps width={2.2} position={[0, 0.05, pl / 2 - 0.2]} />

      {/* Stone Paved Walkway */}
      <Box args={[1.8, 0.02, 2.5]} position={[0, 0.01, pl / 2 + 1.2]} receiveShadow={enableShadows}>
        <meshStandardMaterial color="#64748b" roughness={0.7} />
      </Box>

      {/* Parking Pad & Driveway SUV */}
      {spec.hasParking && (
        <group position={[pw / 2 - 1.5, 0.02, (spec.plotL * UNIT) / 2 - 1]}>
           <Box args={[2.5, 0.04, 3]} receiveShadow={enableShadows}><meshStandardMaterial color="#1e293b" /></Box>
           <DrivewayCar position={[0, 0, 0]} />
        </group>
      )}
    </group>
  );
});

ArchitecturalModel.displayName = 'ArchitecturalModel';

export default function AdvancedViewer({ 
  specs, 
  viewMode, 
  activeFloor, 
  activeRoomId, 
  resetCameraSignal, 
  explodedView, 
  onRoomClick 
}: { 
  specs: any; 
  viewMode: string; 
  activeFloor: number | 'ALL'; 
  activeRoomId: string | null; 
  resetCameraSignal: number; 
  explodedView: boolean; 
  onRoomClick: (id: string) => void;
}) {
  const houseSpec = useMemo(() => generateHouseLayout(specs), [specs]);
  const cameraControlsRef = useRef<CameraControls>(null);

  // Quality & Device Adaptation
  const [qualityMode, setQualityMode] = useState<QualityMode>('AUTO');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || (typeof navigator !== 'undefined' && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window));
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Default mobile devices to LOW quality preset for 60fps performance
  const effectiveQuality = useMemo(() => {
    if (qualityMode !== 'AUTO') return qualityMode;
    return isMobile ? 'LOW' : 'HIGH';
  }, [qualityMode, isMobile]);

  const pw = houseSpec.plotW * UNIT;
  const pl = houseSpec.plotL * UNIT;

  useEffect(() => {
    if (!cameraControlsRef.current) return;
    const ctrl = cameraControlsRef.current;
    
    if (viewMode === 'EXTERIOR') {
       ctrl.setLookAt(pw * 1.5, 4, pl * 1.5, 0, 1, 0, true);
    } else if (viewMode === 'CUTAWAY' && !activeRoomId) {
       ctrl.setLookAt(pw * 1.2, 6, pl * 1.2, 0, 0.5, 0, true);
    } else if (viewMode === 'INTERIOR' && activeRoomId) {
       const room = houseSpec.rooms.find(r => r.id === activeRoomId);
       if (room) {
          const cx = room.x * UNIT - pw/2 + (room.w * UNIT)/2;
          const cz = room.y * UNIT - pl/2 + (room.l * UNIT)/2;
          const cy = room.level * FLOOR_HEIGHT + (explodedView ? room.level * 2.5 : 0) + 0.65;
          
          ctrl.setLookAt(cx, cy, cz + (room.l * UNIT) * 0.35, cx, cy - 0.1, cz - 0.2, true);
       }
    }
  }, [viewMode, activeRoomId, pw, pl, houseSpec.rooms, resetCameraSignal, explodedView]);

  // Dynamic DPR and shadow parameters based on performance preset
  const dprRange: [number, number] = effectiveQuality === 'HIGH' ? [1, 1.5] : [1, 1];

  return (
    <div className="w-full h-full relative bg-slate-900 rounded-3xl overflow-hidden flex flex-col touch-none select-none">
      
      {/* Sleek Performance Preset Selector Overlay (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-slate-950/80 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-300 shadow-xl">
        <span className="text-blue-400 flex items-center gap-1 mr-1">
          <i className="bx bx-bolt-circle text-xs"></i> Mode:
        </span>
        {(['AUTO', 'HIGH', 'MEDIUM', 'LOW'] as QualityMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setQualityMode(mode)}
            className={`px-2 py-0.5 rounded-md uppercase font-black tracking-wider transition-all ${
              qualityMode === mode
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {mode === 'MEDIUM' ? 'MED' : mode}
          </button>
        ))}
      </div>

      <Canvas 
        shadows={effectiveQuality === 'HIGH'} 
        camera={{ position: [pw * 1.5, 4, pl * 1.5], fov: 50 }} 
        dpr={dprRange}
      >
        <color attach="background" args={['#050810']} />
        
        {/* Environment HDR loaded ONLY in HIGH quality mode to avoid mobile network/texture stalls */}
        {effectiveQuality === 'HIGH' && <Environment preset="city" />}
        
        <ambientLight intensity={effectiveQuality === 'HIGH' ? 0.4 : 0.8} />
        
        {effectiveQuality === 'HIGH' ? (
          <directionalLight 
            position={[20, 30, 20]} 
            intensity={2.2} 
            castShadow 
            shadow-mapSize={[1024, 1024]} 
            shadow-camera-near={0.5} 
            shadow-camera-far={50} 
            shadow-camera-left={-10} 
            shadow-camera-right={10} 
            shadow-camera-top={10} 
            shadow-camera-bottom={-10} 
            shadow-bias={-0.0001} 
          />
        ) : (
          <directionalLight position={[15, 25, 15]} intensity={1.8} color="#ffffff" />
        )}
        
        <directionalLight position={[-10, 10, -10]} intensity={1.0} color="#4f46e5" />
        
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={effectiveQuality === 'HIGH'}>
          <planeGeometry args={[pw * 3.0, pl * 3.0]} />
          <meshStandardMaterial color={houseSpec.hasGarden ? '#0f291e' : '#1e293b'} roughness={0.8} />
        </mesh>

        <ArchitecturalModel 
          spec={houseSpec} 
          viewMode={viewMode} 
          activeFloor={activeFloor} 
          activeRoomId={activeRoomId} 
          explodedView={explodedView} 
          onRoomClick={onRoomClick} 
          effectiveQuality={effectiveQuality}
        />
        
        {effectiveQuality === 'HIGH' && (
          <ContactShadows resolution={512} scale={20} blur={2} opacity={0.4} far={10} color="#000000" />
        )}
        
        <CameraControls 
          ref={cameraControlsRef} 
          minDistance={1} 
          maxDistance={20} 
          maxPolarAngle={Math.PI / 2 - 0.05} 
          makeDefault 
          dollySpeed={0.5}
        />
      </Canvas>
      
      {/* HTML Room Info Panel (Top Right overlay) */}
      {activeRoomId && viewMode === 'INTERIOR' && (
        <div className="absolute top-4 right-4 bg-slate-950/90 border border-indigo-500/50 backdrop-blur-md p-3.5 rounded-2xl z-20 shadow-2xl max-w-[220px]">
          {(() => {
             const room = houseSpec.rooms.find(r => r.id === activeRoomId);
             if (!room) return null;
             return (
               <>
                 <h4 className="text-xs font-black uppercase text-indigo-400 mb-1">{room.name}</h4>
                 <div className="text-[10px] font-bold text-slate-400 space-y-0.5">
                   <p>Type: {room.type}</p>
                   <p>Floor: {room.level + 1}</p>
                   <p>Area: {Math.round(room.w * room.l)} sq.ft</p>
                 </div>
               </>
             );
          })()}
        </div>
      )}

      {/* Attached Interior Quick Room Navigator Bar (Bottom Center overlay) */}
      {viewMode === 'INTERIOR' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-950/95 border border-indigo-500/50 backdrop-blur-xl px-4 py-2 rounded-full shadow-2xl overflow-x-auto max-w-[94%] custom-scrollbar">
          <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <i className="bx bx-door-open text-sm"></i> Rooms:
          </span>
          {houseSpec.rooms.filter(r => !['Balcony', 'Terrace'].includes(r.type)).map((room) => {
            const isSelected = activeRoomId === room.id;
            return (
              <button
                key={room.id}
                onClick={() => onRoomClick(room.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase transition-all shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/40 scale-105 ring-2 ring-indigo-400/50'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 bg-slate-900/60 border border-white/5'
                }`}
              >
                <i className={`bx ${room.type === 'Kitchen' ? 'bx-fridge' : room.type === 'Bathroom' ? 'bx-bath' : room.type.includes('Bedroom') ? 'bx-bed' : 'bx-sofa'} text-xs`}></i>
                {room.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
