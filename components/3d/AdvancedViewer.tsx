'use client';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Box, Cylinder, CameraControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Room, HouseSpec, generateHouseLayout } from './layoutGenerator';
import { 
  Sofa, 
  TVUnit, 
  Bed, 
  DiningSet, 
  KitchenSet, 
  BathroomSet, 
  Wardrobe, 
  StudySet, 
  Staircase, 
  EntrywayFoyer, 
  WallArtwork,
  PatioSet, 
  SpiralTopiary, 
  BoxwoodShrub, 
  GardenTree, 
  CurvedStoneWalkway, 
  PerimeterHedges, 
  PorchSteps, 
  DrivewayCar, 
  SlidingGlassDoors,
  ExteriorSconceLight
} from './DetailedFurniture';
import { 
  getWoodParquetTexture, 
  getTerrazzoTexture, 
  getStuccoTexture, 
  getGrassTexture 
} from './RealisticMaterials';

const FLOOR_HEIGHT = 2.0;
const UNIT = 0.1;

export type QualityMode = 'AUTO' | 'HIGH' | 'MEDIUM' | 'LOW';

/**
 * Furniture and interior decoration placement matching Reference Image 1
 */
const RoomInteriorDecor = React.memo(({ 
  room, 
  w, 
  l, 
  isCutaway 
}: { 
  room: Room; 
  w: number; 
  l: number; 
  isCutaway: boolean;
}) => {
  return (
    <group>
      {/* 1. Living Room: Peacock Teal L-Sofa, Coffee Table, Woven Rug, Floor Lamp, TV Unit */}
      {room.id === 'floor0_living' && (
        <group position={[w / 2, 0, l / 2]}>
          <group position={[0, 0, 0.2]}>
            <Sofa />
          </group>
          <group position={[w / 2 - 0.25, 0, 0.1]} rotation={[0, -Math.PI / 2, 0]}>
            <TVUnit />
          </group>
        </group>
      )}

      {/* 2. Dining Area: Solid Oak Table, Bohemian Runner, Fruit Bowl, 6 Ochre Chairs */}
      {room.id === 'floor0_dining' && (
        <group position={[w / 2, 0, l / 2]}>
          <DiningSet />
        </group>
      )}

      {/* 3. Gourmet Kitchen: Matte Grey Cabinets, Carrara Counter, Sink, Cooktop, Fridge */}
      {room.id === 'floor0_kitchen' && (
        <group position={[w / 2, 0, l / 2]}>
          <KitchenSet />
        </group>
      )}

      {/* 4. Foyer & Staircase: Entrance Porch, Door, Shoe Bench, and Open-Tread Staircase */}
      {room.id === 'floor0_foyer_stairs' && (
        <group position={[w / 2, 0, l / 2]}>
          {/* Foyer Door and Shoe Bench at Front */}
          <group position={[0, 0, l / 2 - 0.35]}>
            <EntrywayFoyer />
          </group>
          {/* Open-Riser Floating Wooden Staircase leading upstairs */}
          <group position={[w / 2 - 0.55, 0, -0.1]} rotation={[0, -Math.PI / 2, 0]}>
            <Staircase height={FLOOR_HEIGHT} />
          </group>
        </group>
      )}

      {/* 5. Bathroom: Terrazzo Floor, Wall-Hung Toilet, Floating Vanity, Shower */}
      {room.id === 'floor0_bath1' && (
        <group position={[w / 2, 0, l / 2]}>
          <BathroomSet />
        </group>
      )}

      {/* 6. Ground Floor Bedroom 1: Bed, Terracotta Duvet, Open Wardrobe, Study Desk */}
      {room.id === 'floor0_bed1' && (
        <group position={[w / 2, 0, l / 2]}>
          <group position={[0, 0, -l / 2 + 1.25]}>
            <Bed />
          </group>
          <group position={[-w / 2 + 0.45, 0, 0.2]} rotation={[0, Math.PI / 2, 0]}>
            <Wardrobe />
          </group>
          <group position={[w / 2 - 0.65, 0, l / 2 - 0.4]}>
            <StudySet />
          </group>
        </group>
      )}

      {/* 7. Level 1 Rooftop Terrace: Outdoor Dining Table, Armchairs, Planter Boxes */}
      {room.id === 'floor1_terrace' && (
        <group position={[w / 2, 0, l / 2]}>
          <PatioSet />
          <group position={[0, 0, -l / 2 + 0.1]}>
            <SlidingGlassDoors width={Math.min(w * 0.8, 2.2)} height={FLOOR_HEIGHT * 0.9} />
          </group>
        </group>
      )}

      {/* 8. Level 1 Master Suite: King Bed, Wardrobe, Study Desk */}
      {room.id === 'floor1_master' && (
        <group position={[w / 2, 0, l / 2]}>
          <group position={[0, 0, -l / 2 + 1.25]}>
            <Bed />
          </group>
          <group position={[-w / 2 + 0.45, 0, 0.2]} rotation={[0, Math.PI / 2, 0]}>
            <Wardrobe />
          </group>
          <group position={[w / 2 - 0.65, 0, l / 2 - 0.4]}>
            <StudySet />
          </group>
        </group>
      )}

      {/* Hanging Framed Wall Art on Partition Walls */}
      {isCutaway && (room.id === 'floor0_living' || room.id === 'floor0_foyer_stairs') && (
        <group position={[w - 0.05, 0.7, l / 2]} rotation={[0, -Math.PI / 2, 0]}>
          <WallArtwork width={0.45} height={0.55} color={room.id === 'floor0_living' ? '#e11d48' : '#3b82f6'} />
        </group>
      )}
    </group>
  );
});
RoomInteriorDecor.displayName = 'RoomInteriorDecor';

/**
 * Architectural Exterior Facade Wall with Large Floor-To-Ceiling Glass Windows (Reference Image 2)
 */
const ExteriorWallSegment = React.memo(({ 
  w, 
  h, 
  thickness, 
  wallTexture, 
  isLargeGlass = false 
}: { 
  w: number; 
  h: number; 
  thickness: number; 
  wallTexture: THREE.CanvasTexture; 
  isLargeGlass?: boolean;
}) => {
  if (!isLargeGlass) {
    return (
      <Box args={[w, h, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} roughness={0.5} />
      </Box>
    );
  }

  // Large Panoramic Floor-to-Ceiling Glass Window with Dark Mullions (Reference Image 2)
  const windowW = w * 0.82;
  const windowH = h * 0.78;
  const wallPillarW = (w - windowW) / 2;

  return (
    <group>
      {/* Left Wall Stucco Pier */}
      <Box position={[-w / 2 + wallPillarW / 2, 0, 0]} args={[wallPillarW, h, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} roughness={0.5} />
      </Box>
      {/* Right Wall Stucco Pier */}
      <Box position={[w / 2 - wallPillarW / 2, 0, 0]} args={[wallPillarW, h, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} roughness={0.5} />
      </Box>
      {/* Top Header Lintel */}
      <Box position={[0, h / 2 - (h - windowH) / 4, 0]} args={[windowW, (h - windowH) / 2, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} roughness={0.5} />
      </Box>
      {/* Low Bottom Sill */}
      <Box position={[0, -h / 2 + (h - windowH) / 4, 0]} args={[windowW, (h - windowH) / 2, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} roughness={0.5} />
      </Box>

      {/* Dark Architectural Aluminum Window Frame Surround */}
      <Box position={[0, 0, thickness / 2 + 0.01]} args={[windowW + 0.04, windowH + 0.04, 0.04]}>
        <meshStandardMaterial color="#1f242d" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Interior Warm Illumination Panel behind glass */}
      <Box position={[0, 0, -0.02]} args={[windowW - 0.02, windowH - 0.02, 0.01]}>
        <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.5} />
      </Box>

      {/* Large Reflective / Tinted Architectural Glass Pane */}
      <Box position={[0, 0, 0]} args={[windowW, windowH, 0.02]}>
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.55} roughness={0.08} metalness={0.3} />
      </Box>

      {/* Dark Vertical & Horizontal Mullion Bars */}
      <Box position={[0, 0, 0.02]} args={[0.025, windowH, 0.02]}>
        <meshStandardMaterial color="#1f242d" metalness={0.8} />
      </Box>
      <Box position={[0, 0, 0.02]} args={[windowW, 0.025, 0.02]}>
        <meshStandardMaterial color="#1f242d" metalness={0.8} />
      </Box>
    </group>
  );
});
ExteriorWallSegment.displayName = 'ExteriorWallSegment';

/**
 * Animated floor group for Exploded 3D view
 */
const FloorGroup = ({ level, children, isExploded }: { level: number; children: React.ReactNode; isExploded: boolean }) => {
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

/**
 * Primary Architectural 3D House Model
 */
const ArchitecturalModel = React.memo(({ 
  spec, 
  viewMode, 
  activeFloor, 
  activeRoomId, 
  explodedView, 
  onRoomClick,
  enableShadows
}: { 
  spec: HouseSpec; 
  viewMode: string; 
  activeFloor: number | 'ALL'; 
  activeRoomId: string | null; 
  explodedView: boolean; 
  onRoomClick: (id: string) => void;
  enableShadows: boolean;
}) => {
  const isCutaway = viewMode === 'CUTAWAY' || viewMode === 'INTERIOR' || explodedView;
  const wallH = isCutaway ? 1.05 : FLOOR_HEIGHT; // Sectioned at ~1.05m in Cutaway mode (Reference Image 1)

  // Cached PBR procedural textures
  const woodTexture = useMemo(() => getWoodParquetTexture(5, 5), []);
  const terrazzoTexture = useMemo(() => getTerrazzoTexture(4, 4), []);
  const stuccoTexture = useMemo(() => getStuccoTexture(6, 6), []);
  const grassTexture = useMemo(() => getGrassTexture(16, 16), []);

  const pw = spec.plotW * UNIT;
  const pl = spec.plotL * UNIT;

  const renderFloor = (level: number) => {
    if (activeFloor !== 'ALL' && level !== activeFloor) return null;
    if (isCutaway && activeFloor !== 'ALL' && level > (activeFloor as number)) return null;

    const floorRooms = spec.rooms.filter(r => r.level === level);
    if (floorRooms.length === 0) return null;

    return (
      <FloorGroup key={`floor_${level}`} level={level} isExploded={explodedView}>
        {floorRooms.map(room => {
          const rx = room.x * UNIT;
          const rz = room.y * UNIT;
          const rw = room.w * UNIT;
          const rl = room.l * UNIT;
          const ry = room.level * FLOOR_HEIGHT;
          const isTerrace = room.type === 'Terrace';
          const isBath = room.type === 'Bathroom';
          const floorMat = isBath ? terrazzoTexture : woodTexture;

          return (
            <group 
              key={room.id} 
              position={[rx - pw / 2, ry, rz - pl / 2]}
              onClick={(e) => {
                if (isCutaway) {
                  e.stopPropagation();
                  onRoomClick(room.id);
                }
              }}
            >
              {/* Floor Slab with Wood Parquet / Terrazzo Tile (Reference Image 1) */}
              <Box position={[rw / 2, 0.04, rl / 2]} args={[rw, 0.08, rl]} receiveShadow={enableShadows}>
                {isTerrace ? (
                  <meshStandardMaterial color="#64748b" roughness={0.6} />
                ) : (
                  <meshStandardMaterial map={floorMat} roughness={0.35} />
                )}
              </Box>

              {/* Room Walls or Glass Railings */}
              {!isTerrace ? (
                <>
                  {/* Back Wall */}
                  <group position={[rw / 2, wallH / 2, 0.06]}>
                    <ExteriorWallSegment 
                      w={rw} 
                      h={wallH} 
                      thickness={0.12} 
                      wallTexture={stuccoTexture} 
                      isLargeGlass={!isCutaway && level === 1}
                    />
                  </group>
                  {/* Left Wall */}
                  <group position={[0.06, wallH / 2, rl / 2]} rotation={[0, Math.PI / 2, 0]}>
                    <ExteriorWallSegment 
                      w={rl} 
                      h={wallH} 
                      thickness={0.12} 
                      wallTexture={stuccoTexture} 
                      isLargeGlass={!isCutaway && level === 1 && room.id === 'floor1_master'}
                    />
                  </group>
                  {/* Right Wall */}
                  <group position={[rw - 0.06, wallH / 2, rl / 2]} rotation={[0, Math.PI / 2, 0]}>
                    <ExteriorWallSegment 
                      w={rl} 
                      h={wallH} 
                      thickness={0.12} 
                      wallTexture={stuccoTexture} 
                      isLargeGlass={!isCutaway && level === 1}
                    />
                  </group>
                  {/* Front Facade Wall: Full in Exterior mode; Cleanly open/sectioned in Cutaway mode */}
                  {!isCutaway ? (
                    <group position={[rw / 2, wallH / 2, rl - 0.06]}>
                      <ExteriorWallSegment 
                        w={rw} 
                        h={wallH} 
                        thickness={0.12} 
                        wallTexture={stuccoTexture} 
                        isLargeGlass={true} // Large glass window matching Reference Image 2
                      />
                    </group>
                  ) : (
                    /* Low sectioned front threshold wall in cutaway */
                    <group position={[rw / 2, 0.15, rl - 0.05]}>
                      <Box args={[rw, 0.2, 0.1]} receiveShadow>
                        <meshStandardMaterial color="#ffffff" roughness={0.3} />
                      </Box>
                    </group>
                  )}

                  {/* Furnishings & Realistic Interior Decor */}
                  {(isCutaway || viewMode === 'INTERIOR') && (
                    <RoomInteriorDecor 
                      room={room} 
                      w={rw} 
                      l={rl} 
                      isCutaway={isCutaway} 
                    />
                  )}
                </>
              ) : (
                <>
                  {/* Rooftop Terrace (Reference Image 2) with Glass Balustrades and Patio Set */}
                  <RoomInteriorDecor 
                    room={room} 
                    w={rw} 
                    l={rl} 
                    isCutaway={isCutaway} 
                  />

                  {/* Modern Glass Railings along the Terrace Perimeter */}
                  <group position={[rw / 2, 0.45, rl - 0.04]}>
                    <Box args={[rw, 0.85, 0.03]} castShadow>
                      <meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} roughness={0.05} />
                    </Box>
                    <Box position={[0, 0.43, 0]} args={[rw, 0.03, 0.06]}><meshStandardMaterial color="#1e293b" metalness={0.8} /></Box>
                  </group>
                  <group position={[0.04, 0.45, rl / 2]} rotation={[0, Math.PI / 2, 0]}>
                    <Box args={[rl, 0.85, 0.03]} castShadow>
                      <meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} roughness={0.05} />
                    </Box>
                    <Box position={[0, 0.43, 0]} args={[rl, 0.03, 0.06]}><meshStandardMaterial color="#1e293b" metalness={0.8} /></Box>
                  </group>
                </>
              )}
            </group>
          );
        })}
      </FloorGroup>
    );
  };

  const roofY = spec.floors * FLOOR_HEIGHT;

  return (
    <group>
      {/* 1. Lush Emerald Lawn Ground Plane (Reference Image 2) */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={enableShadows}>
        <planeGeometry args={[pw * 2.8, pl * 2.8]} />
        <meshStandardMaterial map={grassTexture} roughness={0.85} />
      </mesh>

      {/* 2. Floors & Interior / Exterior Geometry */}
      {Array.from({ length: spec.floors }).map((_, i) => renderFloor(i))}

      {/* 3. Modern Flat Roof with Parapets (Visible in Exterior Mode) */}
      {!isCutaway && activeFloor === 'ALL' && (
        <FloorGroup level={spec.floors} isExploded={explodedView}>
          <group position={[0, roofY, 0]}>
            {/* Right-Side Upper Bedroom Flat Roof Slab */}
            <Box args={[pw * 0.52, 0.16, pl * 0.7]} position={[pw * 0.24, 0.08, -pl * 0.05]} castShadow receiveShadow>
              <meshStandardMaterial map={stuccoTexture} roughness={0.5} />
            </Box>
            {/* Parapet Wall Lip */}
            <Box args={[pw * 0.52, 0.22, 0.08]} position={[pw * 0.24, 0.24, pl * 0.3]}><meshStandardMaterial color="#ffffff" /></Box>
            <Box args={[pw * 0.52, 0.22, 0.08]} position={[pw * 0.24, 0.24, -pl * 0.4]}><meshStandardMaterial color="#ffffff" /></Box>
            <Box args={[0.08, 0.22, pl * 0.7]} position={[pw * 0.5, 0.24, -pl * 0.05]}><meshStandardMaterial color="#ffffff" /></Box>
          </group>
        </FloorGroup>
      )}

      {/* 4. Surrounding Landscaping (Reference Image 2) */}
      {/* Entrance Porch Concrete Steps */}
      <PorchSteps width={1.8} position={[0.4, 0.02, pl / 2 - 0.25]} />

      {/* S-Curved Flagstone Walkway winding to Entrance */}
      <CurvedStoneWalkway />

      {/* Sculpted Spiral Topiaries flanking Entrance and Pathway */}
      <SpiralTopiary position={[1.4, 0, pl / 2 - 0.1]} />
      <SpiralTopiary position={[-0.7, 0, pl / 2 - 0.1]} />
      <SpiralTopiary position={[-1.2, 0, pl / 2 + 1.6]} />

      {/* Boxwood Spherical Shrubs lining the pathway */}
      <BoxwoodShrub position={[0.8, 0, pl / 2 + 0.8]} scale={1.1} />
      <BoxwoodShrub position={[1.0, 0, pl / 2 + 1.8]} scale={0.9} />
      <BoxwoodShrub position={[-0.9, 0, pl / 2 + 2.5]} scale={1.0} />
      <BoxwoodShrub position={[-0.2, 0, pl / 2 + 3.2]} scale={1.2} />

      {/* Ornamental Flowering Garden Trees in Yard Corners */}
      <GardenTree position={[pw / 2 + 1.8, 0, pl / 2 + 1.5]} />
      <GardenTree position={[-pw / 2 - 1.6, 0, -pl / 2 + 1.0]} />

      {/* Perimeter Dense Green Privacy Hedges */}
      <PerimeterHedges width={pw * 1.8} length={pl * 1.8} />

      {/* Driveway Car Pad & Luxury SUV */}
      {spec.hasParking && (
        <group position={[-pw / 2 - 0.8, 0.02, pl / 2 + 1.0]}>
          <Box args={[2.0, 0.03, 3.2]} receiveShadow={enableShadows}>
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </Box>
          <DrivewayCar />
        </group>
      )}
    </group>
  );
});
ArchitecturalModel.displayName = 'ArchitecturalModel';

/**
 * AdvancedViewer Component with Three.js Canvas, Lighting & Responsive Controls
 */
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

  const effectiveQuality = useMemo(() => {
    if (qualityMode !== 'AUTO') return qualityMode;
    return isMobile ? 'LOW' : 'HIGH';
  }, [qualityMode, isMobile]);

  const pw = houseSpec.plotW * UNIT;
  const pl = houseSpec.plotL * UNIT;

  // Camera presets tuned to match Reference Images 1 & 2
  useEffect(() => {
    if (!cameraControlsRef.current) return;
    const ctrl = cameraControlsRef.current;
    
    if (viewMode === 'EXTERIOR') {
      // Elevated 3/4 architectural perspective showing the villa facade, rooftop terrace, and garden (Reference Image 2)
      ctrl.setLookAt(pw * 1.35, 5.2, pl * 1.5, 0, 1.2, 0, true);
    } else if (viewMode === 'CUTAWAY' && !activeRoomId) {
      // Top-down angled isometric cutaway view (~50° pitch) showing all rooms clearly (Reference Image 1)
      ctrl.setLookAt(0.2, 7.5, pl * 0.95, 0, 0.4, 0, true);
    } else if (viewMode === 'INTERIOR' && activeRoomId) {
      // Room-by-room close-up focus
      const room = houseSpec.rooms.find(r => r.id === activeRoomId);
      if (room) {
        const cx = room.x * UNIT - pw / 2 + (room.w * UNIT) / 2;
        const cz = room.y * UNIT - pl / 2 + (room.l * UNIT) / 2;
        const cy = room.level * FLOOR_HEIGHT + 0.8;
        ctrl.setLookAt(cx, cy + 1.2, cz + (room.l * UNIT) * 0.6, cx, cy, cz, true);
      }
    }
  }, [viewMode, activeRoomId, pw, pl, houseSpec.rooms, resetCameraSignal, explodedView]);

  const enableShadows = effectiveQuality === 'HIGH';
  const dprRange: [number, number] = effectiveQuality === 'HIGH' ? [1, 1.5] : [1, 1];

  return (
    <div className="w-full h-full relative bg-[#090d16] rounded-3xl overflow-hidden flex flex-col touch-none select-none">
      
      {/* Performance Preset Selector (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-slate-950/80 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-300 shadow-xl">
        <span className="text-amber-400 flex items-center gap-1 mr-1">
          <i className="bx bx-bulb text-xs"></i> 3D Quality:
        </span>
        {(['AUTO', 'HIGH', 'MEDIUM', 'LOW'] as QualityMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setQualityMode(mode)}
            className={`px-2 py-0.5 rounded-md uppercase font-black tracking-wider transition-all cursor-pointer ${
              qualityMode === mode
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {mode === 'MEDIUM' ? 'MED' : mode}
          </button>
        ))}
      </div>

      <Canvas 
        shadows={enableShadows} 
        camera={{ position: [pw * 1.35, 5.2, pl * 1.5], fov: 45 }} 
        dpr={dprRange}
      >
        <color attach="background" args={['#090d16']} />
        
        {/* Soft Golden Daylight Sun Lighting */}
        <ambientLight intensity={enableShadows ? 0.65 : 0.9} color="#ffffff" />
        
        {enableShadows ? (
          <directionalLight 
            position={[16, 26, 18]} 
            intensity={2.4} 
            castShadow 
            shadow-mapSize={[2048, 2048]} 
            shadow-camera-near={0.5} 
            shadow-camera-far={50} 
            shadow-camera-left={-12} 
            shadow-camera-right={12} 
            shadow-camera-top={12} 
            shadow-camera-bottom={-12} 
            shadow-bias={-0.0001} 
          />
        ) : (
          <directionalLight position={[12, 20, 12]} intensity={1.8} color="#ffffff" />
        )}

        {/* Gentle Sky & Ground Bounce Fill Lights */}
        <directionalLight position={[-12, 10, -12]} intensity={0.65} color="#93c5fd" />
        <directionalLight position={[0, -5, 0]} intensity={0.2} color="#15803d" />

        {/* 3D Architectural Model */}
        <ArchitecturalModel 
          spec={houseSpec} 
          viewMode={viewMode} 
          activeFloor={activeFloor} 
          activeRoomId={activeRoomId} 
          explodedView={explodedView} 
          onRoomClick={onRoomClick} 
          enableShadows={enableShadows}
        />
        
        {enableShadows && (
          <ContactShadows resolution={512} scale={24} blur={2.2} opacity={0.45} far={12} color="#000000" />
        )}
        
        <CameraControls 
          ref={cameraControlsRef} 
          minDistance={1.2} 
          maxDistance={22} 
          maxPolarAngle={Math.PI / 2 - 0.02} 
          makeDefault 
          dollySpeed={0.5}
        />
      </Canvas>
      
      {/* HTML Room Info Pill (Top Right) */}
      {activeRoomId && viewMode === 'INTERIOR' && (
        <div className="absolute top-4 right-4 bg-slate-950/90 border border-amber-500/50 backdrop-blur-md p-3.5 rounded-2xl z-20 shadow-2xl max-w-[220px]">
          {(() => {
             const room = houseSpec.rooms.find(r => r.id === activeRoomId);
             if (!room) return null;
             return (
               <>
                 <h4 className="text-xs font-black uppercase text-amber-400 mb-1">{room.name}</h4>
                 <div className="text-[10px] font-bold text-slate-300 space-y-0.5">
                   <p>Type: {room.type}</p>
                   <p>Level: {room.level === 0 ? 'Ground Floor' : `Floor ${room.level + 1}`}</p>
                   <p>Est. Area: {Math.round(room.w * room.l)} sq.ft</p>
                 </div>
               </>
             );
          })()}
        </div>
      )}
    </div>
  );
}
