'use client';
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Box, Cone, CameraControls, BakeShadows, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { generateHouseLayout, Room, HouseSpec } from './layoutGenerator';
import { Sofa, TVUnit, Bed, DiningSet, KitchenSet, BathroomSet, Wardrobe, StudySet, PoojaSet } from './DetailedFurniture';

const FLOOR_HEIGHT = 1.8;
const UNIT = 0.1;

const MemoizedRoomInterior = React.memo(({ room, w, l, styleColors }: { room: Room, w: number, l: number, styleColors: any }) => {
  const c = styleColors;
  return (
    <group>
      <pointLight position={[w/2, 1.2, l/2]} intensity={0.5} distance={4} color="#ffeedd" />
      {room.type === 'Living Room' && (
        <group position={[w/2, 0, l/2]}>
          <group position={[0, 0, 0]}><Sofa color={c} /></group>
          <group position={[0, 0, -l/2 + 0.3]}><TVUnit color={c} /></group>
        </group>
      )}
      {room.type.includes('Bedroom') && (
        <group position={[w/2, 0, l/2]}>
          <group position={[0, 0, -l/2 + 1.1]}><Bed color={c} /></group>
          <group position={[-w/2 + 0.7, 0, 0]} rotation={[0, Math.PI/2, 0]}><Wardrobe color={c} /></group>
        </group>
      )}
      {room.type === 'Kitchen' && <group position={[w/2, 0, 0.4]}><KitchenSet color={c} /></group>}
      {room.type === 'Dining' && <group position={[w/2, 0, l/2]}><DiningSet color={c} /></group>}
      {room.type === 'Bathroom' && <group position={[w/2, 0, l/2]}><BathroomSet color={c} /></group>}
      {room.type === 'Study Room' && <group position={[w/2, 0, l/2]}><StudySet color={c} /></group>}
      {room.type === 'Pooja Room' && <group position={[w/2, 0, 0.5]}><PoojaSet color={c} /></group>}
    </group>
  );
});

MemoizedRoomInterior.displayName = 'MemoizedRoomInterior';

const WallWithWindow = React.memo(({ w, h, thickness, color, isFront }: { w: number, h: number, thickness: number, color: any, isFront: boolean }) => {
  const ww = Math.min(w * 0.4, 1.5);
  const wh = h * 0.5;
  if (w < 1.0) {
    return (
      <Box args={[w, h, thickness]} castShadow receiveShadow>
        <meshPhysicalMaterial color={color.wall} transmission={0.6} opacity={1} roughness={0.2} metalness={0.1} ior={1.5} thickness={0.5} />
      </Box>
    );
  }
  return (
    <group>
      <Box position={[-w/2 + (w-ww)/4, 0, 0]} args={[(w-ww)/2, h, thickness]} castShadow receiveShadow>
        <meshPhysicalMaterial color={color.wall} transmission={0.6} opacity={1} roughness={0.2} metalness={0.1} ior={1.5} thickness={0.5} />
      </Box>
      <Box position={[w/2 - (w-ww)/4, 0, 0]} args={[(w-ww)/2, h, thickness]} castShadow receiveShadow>
        <meshPhysicalMaterial color={color.wall} transmission={0.6} opacity={1} roughness={0.2} metalness={0.1} ior={1.5} thickness={0.5} />
      </Box>
      <Box position={[0, -h/2 + (h-wh)/4, 0]} args={[ww, (h-wh)/2, thickness]} castShadow receiveShadow>
        <meshPhysicalMaterial color={color.wall} transmission={0.6} opacity={1} roughness={0.2} metalness={0.1} ior={1.5} thickness={0.5} />
      </Box>
      <Box position={[0, h/2 - (h-wh)/4, 0]} args={[ww, (h-wh)/2, thickness]} castShadow receiveShadow>
        <meshPhysicalMaterial color={color.wall} transmission={0.6} opacity={1} roughness={0.2} metalness={0.1} ior={1.5} thickness={0.5} />
      </Box>
      
      {/* HD Glass Window */}
      <Box position={[0, 0, 0]} args={[ww, wh, thickness*0.2]}>
        <meshPhysicalMaterial 
          color="#a3e6ff" 
          transmission={0.9} 
          opacity={1} 
          metalness={0.1} 
          roughness={0.1} 
          ior={1.5} 
          thickness={0.5} 
        />
      </Box>
      {/* Window Frame */}
      <Box position={[0, 0, 0]} args={[ww, wh, thickness*0.4]}><meshStandardMaterial color={color.frame} roughness={0.2} metalness={0.8}/></Box>
    </group>
  );
});

WallWithWindow.displayName = 'WallWithWindow';

const FloorGroup = ({ spec, level, children, isExploded }: { spec: HouseSpec, level: number, children: React.ReactNode, isExploded: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      const targetY = isExploded ? level * 2.5 : 0;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

const ArchitecturalModel = React.memo(({ spec, viewMode, activeFloor, activeRoomId, explodedView, onRoomClick }: { spec: HouseSpec, viewMode: string, activeFloor: number | 'ALL', activeRoomId: string | null, explodedView: boolean, onRoomClick: (id: string) => void }) => {
  const getStyleColors = (style: string) => {
    switch (style) {
      case 'Luxury': return { wall: '#fdfbf7', roof: '#0f172a', window: '#e0f2fe', frame: '#d4af37', floor: '#1e293b', wood: '#451a03', fabric: '#fef3c7', metal: '#d4af37', text: '#ffffff' };
      case 'Modern': return { wall: '#e2e8f0', roof: '#334155', window: '#bae6fd', frame: '#1e293b', floor: '#cbd5e1', wood: '#334155', fabric: '#94a3b8', metal: '#1e293b', text: '#000000' };
      case 'Traditional': return { wall: '#d6d3d1', roof: '#78350f', window: '#fef3c7', frame: '#451a03', floor: '#d4d4d8', wood: '#5d2906', fabric: '#d6d3d1', metal: '#451a03', text: '#ffffff' };
      case 'Industrial': return { wall: '#a1a1aa', roof: '#18181b', window: '#7dd3fc', frame: '#000000', floor: '#52525b', wood: '#27272a', fabric: '#52525b', metal: '#000000', text: '#ffffff' };
      default: return { wall: '#f1f5f9', roof: '#475569', window: '#bfdbfe', frame: '#334155', floor: '#e2e8f0', wood: '#475569', fabric: '#cbd5e1', metal: '#334155', text: '#000000' };
    }
  };

  const extColors = getStyleColors(spec.style);
  const intColors = getStyleColors(spec.interiorStyle);
  
  const isCutaway = viewMode === 'CUTAWAY' || viewMode === 'INTERIOR' || explodedView;

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
              
              {/* Floor Slab */}
              <Box position={[rw/2, 0.05, rl/2]} args={[rw, 0.1, rl]} receiveShadow>
                <meshStandardMaterial color={isBalcony || isTerrace ? '#94a3b8' : (activeRoomId === room.id ? '#6366f1' : extColors.floor)} />
              </Box>

              {/* Walls or Railings */}
              {(!isBalcony && !isTerrace) ? (
                <>
                  <group position={[rw/2, FLOOR_HEIGHT/2, 0.05]}>
                    <WallWithWindow w={rw} h={FLOOR_HEIGHT} thickness={0.1} color={extColors} isFront={false} />
                  </group>
                  <group position={[0.05, FLOOR_HEIGHT/2, rl/2]} rotation={[0, Math.PI/2, 0]}>
                    <WallWithWindow w={rl} h={FLOOR_HEIGHT} thickness={0.1} color={extColors} isFront={false} />
                  </group>
                  <group position={[rw - 0.05, FLOOR_HEIGHT/2, rl/2]} rotation={[0, Math.PI/2, 0]}>
                    <WallWithWindow w={rl} h={FLOOR_HEIGHT} thickness={0.1} color={extColors} isFront={false} />
                  </group>
                  {showFrontWall && (
                    <group position={[rw/2, FLOOR_HEIGHT/2, rl - 0.05]}>
                      <WallWithWindow w={rw} h={FLOOR_HEIGHT} thickness={0.1} color={extColors} isFront={true} />
                    </group>
                  )}
                  
                  <MemoizedRoomInterior room={room} w={rw} l={rl} styleColors={intColors} />
                </>
              ) : (
                <>
                  {/* Glass Railings for Balcony/Terrace */}
                  <group position={[rw/2, 0.5, rl - 0.05]}>
                    <Box args={[rw, 1.0, 0.05]} castShadow>
                       <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} roughness={0.1} ior={1.5} thickness={0.5} />
                    </Box>
                    <Box position={[0, 0.5, 0]} args={[rw, 0.05, 0.1]}><meshStandardMaterial color={extColors.metal} metalness={0.8} roughness={0.2} /></Box>
                  </group>
                  <group position={[0.05, 0.5, rl/2]} rotation={[0, Math.PI/2, 0]}>
                    <Box args={[rl, 1.0, 0.05]} castShadow>
                       <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} roughness={0.1} ior={1.5} thickness={0.5} />
                    </Box>
                    <Box position={[0, 0.5, 0]} args={[rl, 0.05, 0.1]}><meshStandardMaterial color={extColors.metal} metalness={0.8} roughness={0.2} /></Box>
                  </group>
                  <group position={[rw - 0.05, 0.5, rl/2]} rotation={[0, Math.PI/2, 0]}>
                    <Box args={[rl, 1.0, 0.05]} castShadow>
                       <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} roughness={0.1} ior={1.5} thickness={0.5} />
                    </Box>
                    <Box position={[0, 0.5, 0]} args={[rl, 0.05, 0.1]}><meshStandardMaterial color={extColors.metal} metalness={0.8} roughness={0.2} /></Box>
                  </group>
                  
                  {/* Few Plants on Balcony/Terrace */}
                  <group position={[0.4, 0, 0.4]}>
                    <Box args={[0.3, 0.4, 0.3]} position={[0, 0.2, 0]} castShadow><meshStandardMaterial color="#1e293b"/></Box>
                    <Cone args={[0.3, 0.8, 8]} position={[0, 0.8, 0]} castShadow><meshStandardMaterial color="#15803d"/></Cone>
                  </group>
                </>
              )}

              {/* Room Label */}
              {isCutaway && (
                    <Html 
                      position={[rw/2, 0.5, rl/2]} 
                      center 
                      zIndexRange={[100, 0]}
                    >
                      <div className="bg-[#0f1525]/90 border border-white/20 text-slate-200 px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap backdrop-blur-md shadow-2xl flex items-center gap-2 cursor-pointer hover:bg-white hover:text-black transition-colors"
                           onClick={(e) => { e.stopPropagation(); onRoomClick(room.id); }}>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_5px_#3b82f6] animate-pulse"></div>
                        {room.name}
                      </div>
                    </Html>
                  )}
            </group>
          );
        })}

        {/* Floor Label for Exploded View */}
        {(explodedView || isCutaway) && activeFloor === 'ALL' && (
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

  const drawW = (spec.plotW - 4) * UNIT;
  const drawL = (spec.plotL - (spec.hasParking ? 14 : 8) - 4) * UNIT;
  const roofY = spec.floors * FLOOR_HEIGHT + 0.1;

  return (
    <group>
      {Array.from({ length: spec.floors }).map((_, i) => renderFloor(i))}

      {/* Roof */}
      {(!isCutaway || (activeFloor !== 'ALL' && activeFloor < spec.floors - 1) || explodedView) && activeFloor === 'ALL' && (
        <FloorGroup spec={spec} level={spec.floors} isExploded={explodedView}>
          <group position={[0, roofY - (spec.floors * FLOOR_HEIGHT), (spec.hasParking ? -3 : 2) * UNIT]}>
             {spec.style === 'Traditional' ? (
               <Cone args={[Math.max(drawW, drawL) * 0.7, 1.5, 4]} rotation={[0, Math.PI / 4, 0]} castShadow>
                 <meshStandardMaterial color={extColors.roof} />
               </Cone>
             ) : (
               <Box args={[drawW + 0.4, 0.2, drawL + 0.4]} castShadow>
                 <meshStandardMaterial color={extColors.roof} />
               </Box>
             )}
          </group>
        </FloorGroup>
      )}

      {/* Parking */}
      {spec.hasParking && (
        <group position={[0, 0.02, (spec.plotL * UNIT) / 2 - 1]}>
           <Box args={[2.5, 0.04, 3]} receiveShadow><meshStandardMaterial color="#1e293b" /></Box>
           <Box args={[1.2, 0.4, 2.0]} position={[0, 0.24, 0]} castShadow><meshStandardMaterial color="#ef4444" /></Box>
           <Box args={[0.8, 0.3, 1.0]} position={[0, 0.6, -0.2]} castShadow><meshStandardMaterial color="#000000" /></Box>
        </group>
      )}
    </group>
  );
});

ArchitecturalModel.displayName = 'ArchitecturalModel';

export default function AdvancedViewer({ specs, viewMode, activeFloor, activeRoomId, resetCameraSignal, explodedView, onRoomClick }: { specs: any, viewMode: string, activeFloor: number | 'ALL', activeRoomId: string | null, resetCameraSignal: number, explodedView: boolean, onRoomClick: (id: string) => void }) {
  const houseSpec = useMemo(() => generateHouseLayout(specs), [specs]);
  const cameraControlsRef = useRef<CameraControls>(null);

  const pw = houseSpec.plotW * UNIT;
  const pl = houseSpec.plotL * UNIT;

  useEffect(() => {
    if (!cameraControlsRef.current) return;
    const ctrl = cameraControlsRef.current;
    
    if (viewMode === 'EXTERIOR') {
       ctrl.setLookAt(pw * 1.5, 4, pl * 1.5, 0, 1, 0, true);
    } else if (viewMode === 'CUTAWAY' && !activeRoomId) {
       ctrl.setLookAt(0, 5, pl * 1.5, 0, 1, 0, true);
    } else if (viewMode === 'INTERIOR' && activeRoomId) {
       const room = houseSpec.rooms.find(r => r.id === activeRoomId);
       if (room) {
          const cx = room.x * UNIT - pw/2 + (room.w * UNIT)/2;
          const cz = room.y * UNIT - pl/2 + (room.l * UNIT)/2;
          // Account for exploded Y offset if active
          const cy = room.level * FLOOR_HEIGHT + (explodedView ? room.level * 2.5 : 0) + 1.0;
          
          ctrl.setLookAt(cx, cy, cz + (room.l * UNIT)*0.4, cx, cy, cz, true);
       }
    }
  }, [viewMode, activeRoomId, pw, pl, houseSpec.rooms, resetCameraSignal, explodedView]);

  return (
    <div className="w-full h-full relative bg-slate-900 rounded-3xl overflow-hidden flex flex-col">
      <Canvas shadows camera={{ position: [pw * 1.5, 4, pl * 1.5], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={['#050810']} />
        <Environment preset="city" />
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[20, 30, 20]} 
          intensity={2.5} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
          shadow-camera-near={0.5} 
          shadow-camera-far={50} 
          shadow-camera-left={-10} 
          shadow-camera-right={10} 
          shadow-camera-top={10} 
          shadow-camera-bottom={-10} 
          shadow-bias={-0.0001} 
        />
        <directionalLight position={[-10, 10, -10]} intensity={1.5} color="#4f46e5" />
        
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[pw * 3.0, pl * 3.0]} />
          <meshStandardMaterial color={houseSpec.hasGarden ? '#0f291e' : '#1e293b'} roughness={0.8} />
        </mesh>

        <ArchitecturalModel spec={houseSpec} viewMode={viewMode} activeFloor={activeFloor} activeRoomId={activeRoomId} explodedView={explodedView} onRoomClick={onRoomClick} />
        <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
        
        <CameraControls 
          ref={cameraControlsRef} 
          minDistance={1} 
          maxDistance={20} 
          maxPolarAngle={Math.PI / 2 - 0.05} 
          makeDefault 
          dollySpeed={0.5}
        />
      </Canvas>
      
      {/* HTML Room Info Panel (Bottom Left overlay) */}
      {activeRoomId && viewMode === 'INTERIOR' && (
        <div className="absolute bottom-6 left-6 bg-slate-950/90 border border-indigo-500/50 backdrop-blur-md p-4 rounded-2xl z-20 shadow-2xl max-w-[250px]">
          {(() => {
             const room = houseSpec.rooms.find(r => r.id === activeRoomId);
             if (!room) return null;
             return (
               <>
                 <h4 className="text-sm font-black uppercase text-indigo-400 mb-1">{room.name}</h4>
                 <div className="text-[10px] font-bold text-slate-400 space-y-1">
                   <p>Type: {room.type}</p>
                   <p>Floor: {room.level + 1}</p>
                   <p>Area: {Math.round(room.w * room.l)} sq.ft</p>
                 </div>
               </>
             )
          })()}
        </div>
      )}
    </div>
  );
}
