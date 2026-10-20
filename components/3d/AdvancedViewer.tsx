'use client';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Box, Cylinder, Cone, Sphere, CameraControls } from '@react-three/drei';
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
  GrandFrontDoor, 
  WallArtwork,
  PatioSet, 
  SpiralTopiary, 
  BoxwoodShrub, 
  GardenTree, 
  CurvedStoneWalkway, 
  PerimeterHedges, 
  PorchSteps, 
  DrivewayCar, 
  SlidingGlassDoors
} from './DetailedFurniture';
import { 
  getWoodParquetTexture, 
  getTerrazzoTexture, 
  getStuccoTexture, 
  getMarbleTexture,
  getParametricBrickTexture,
  getClayTileRoofTexture,
  getWoodSlatTexture,
  getGrassTexture 
} from './RealisticMaterials';

const FLOOR_HEIGHT = 2.0;
const UNIT = 0.1;

export type QualityMode = 'AUTO' | 'HIGH' | 'MEDIUM' | 'LOW';

/**
 * Furnishings and interior room decoration matching Reference Image 1
 * Safely placed with zero colliding pillars or clipping into beds.
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
      {room.type === 'Living Room' && (
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
      {room.type === 'Dining' && (
        <group position={[w / 2, 0, l / 2]}>
          <DiningSet />
        </group>
      )}

      {/* 3. Gourmet Kitchen: Matte Grey Cabinets, Carrara Counter, Sink, Cooktop, Fridge */}
      {room.type === 'Kitchen' && (
        <group position={[w / 2, 0, l / 2]}>
          <KitchenSet />
        </group>
      )}

      {/* 4. Foyer & Staircase: Entrance Door and Open-Tread Staircase */}
      {room.type === 'Foyer' && (
        <group position={[w / 2, 0, l / 2]}>
          <group position={[w / 2 - 0.55, 0, -0.05]} rotation={[0, -Math.PI / 2, 0]}>
            <Staircase height={FLOOR_HEIGHT} />
          </group>
        </group>
      )}

      {/* 5. Bathroom: Terrazzo Floor, Wall-Hung Toilet, Floating Vanity, Shower */}
      {room.type === 'Bathroom' && (
        <group position={[w / 2, 0, l / 2]}>
          <BathroomSet />
        </group>
      )}

      {/* 6. Bedroom (Cleanly anchored with safe clearances, NO overlapping pillars) */}
      {(room.type === 'Bedroom' || room.type === 'Master Bedroom') && (
        <group position={[w / 2, 0, l / 2]}>
          <group position={[0, 0, -l / 2 + 1.15]}>
            <Bed />
          </group>
          <group position={[-w / 2 + 0.35, 0, 0.2]} rotation={[0, Math.PI / 2, 0]}>
            <Wardrobe />
          </group>
          {w > 1.8 && (
            <group position={[w / 2 - 0.55, 0, l / 2 - 0.35]}>
              <StudySet />
            </group>
          )}
        </group>
      )}

      {/* 7. Rooftop Terrace / Balcony */}
      {room.type === 'Terrace' && (
        <group position={[w / 2, 0, l / 2]}>
          <PatioSet />
          <group position={[0, 0, -l / 2 + 0.08]}>
            <SlidingGlassDoors width={Math.min(w * 0.8, 2.2)} height={FLOOR_HEIGHT * 0.9} />
          </group>
        </group>
      )}

      {/* 8. Study Room */}
      {room.type === 'Study Room' && (
        <group position={[w / 2, 0, l / 2]}>
          <StudySet />
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
 * Exterior Wall Segment with style-specific architectural treatments
 */
const ExteriorWallSegment = React.memo(({ 
  w, 
  h, 
  thickness, 
  wallTexture, 
  wallColor, 
  style, 
  isLargeGlass = false, 
  isFrontEntrance = false 
}: { 
  w: number; 
  h: number; 
  thickness: number; 
  wallTexture: THREE.CanvasTexture; 
  wallColor: string; 
  style: string; 
  isLargeGlass?: boolean; 
  isFrontEntrance?: boolean;
}) => {
  if (isFrontEntrance) {
    const doorW = Math.min(w * 0.7, 1.4);
    const wallSideW = (w - doorW) / 2;
    return (
      <group>
        <Box position={[-w / 2 + wallSideW / 2, 0, 0]} args={[wallSideW, h, thickness]} castShadow receiveShadow>
          <meshStandardMaterial map={wallTexture} color={wallColor} roughness={0.4} />
        </Box>
        <Box position={[w / 2 - wallSideW / 2, 0, 0]} args={[wallSideW, h, thickness]} castShadow receiveShadow>
          <meshStandardMaterial map={wallTexture} color={wallColor} roughness={0.4} />
        </Box>
        <Box position={[0, h / 2 - 0.15, 0]} args={[doorW, 0.3, thickness]} castShadow receiveShadow>
          <meshStandardMaterial map={wallTexture} color={wallColor} roughness={0.4} />
        </Box>
        <group position={[0, -h / 2, 0]}>
          <GrandFrontDoor width={doorW} height={h - 0.3} />
        </group>
      </group>
    );
  }

  if (!isLargeGlass) {
    return (
      <Box args={[w, h, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} color={wallColor} roughness={0.4} />
      </Box>
    );
  }

  const windowW = w * 0.82;
  const windowH = h * 0.78;
  const wallPillarW = (w - windowW) / 2;
  const frameColor = style === 'Luxury' ? '#d4af37' : (style === 'Minimalist' ? '#090d16' : '#1f242d');

  return (
    <group>
      <Box position={[-w / 2 + wallPillarW / 2, 0, 0]} args={[wallPillarW, h, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} color={wallColor} roughness={0.4} />
      </Box>
      <Box position={[w / 2 - wallPillarW / 2, 0, 0]} args={[wallPillarW, h, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} color={wallColor} roughness={0.4} />
      </Box>
      <Box position={[0, h / 2 - (h - windowH) / 4, 0]} args={[windowW, (h - windowH) / 2, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} color={wallColor} roughness={0.4} />
      </Box>
      <Box position={[0, -h / 2 + (h - windowH) / 4, 0]} args={[windowW, (h - windowH) / 2, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} color={wallColor} roughness={0.4} />
      </Box>

      {/* Frame */}
      <Box position={[0, 0, thickness / 2 + 0.01]} args={[windowW + 0.04, windowH + 0.04, 0.04]}>
        <meshStandardMaterial color={frameColor} metalness={style === 'Luxury' ? 0.95 : 0.8} roughness={0.2} />
      </Box>

      {/* Warm Illumination */}
      <Box position={[0, 0, -0.02]} args={[windowW - 0.02, windowH - 0.02, 0.01]}>
        <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.5} />
      </Box>

      {/* Glass Pane */}
      <Box position={[0, 0, 0]} args={[windowW, windowH, 0.02]}>
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.55} roughness={0.08} metalness={0.3} />
      </Box>

      {/* Mullions */}
      <Box position={[0, 0, 0.02]} args={[0.025, windowH, 0.02]}>
        <meshStandardMaterial color={frameColor} metalness={0.8} />
      </Box>
      <Box position={[0, 0, 0.02]} args={[windowW, 0.025, 0.02]}>
        <meshStandardMaterial color={frameColor} metalness={0.8} />
      </Box>
    </group>
  );
});
ExteriorWallSegment.displayName = 'ExteriorWallSegment';

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
 * Architectural 3D House Model with support for all 6 reference design styles:
 * 1. Modern Villa (Cantilever Glass & Rooftop Terrace)
 * 2. Royal Classical (Neoclassical White & Gold Arches - Image 5)
 * 3. Minimalist Skillion (Slanted Roof & Double Carport - Image 4)
 * 4. Organic Brick (Parametric Brick Curves & Concrete - Image 3)
 * 5. Kerala Heritage (Clay Mangalore Tile Roof & Wood Veranda - Image 2)
 * 6. Modern Bungalow (Pitched Gable Roof & Veranda - Image 1)
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
  const wallH = isCutaway ? 1.05 : FLOOR_HEIGHT;

  // Style-Specific Textures
  const wallTexture = useMemo(() => {
    switch (spec.style) {
      case 'Luxury': return getMarbleTexture(4, 4);
      case 'Industrial': return getParametricBrickTexture(8, 8);
      case 'Bungalow': return getStuccoTexture(6, 6);
      default: return getStuccoTexture(6, 6);
    }
  }, [spec.style]);

  const clayRoofTexture = useMemo(() => getClayTileRoofTexture(8, 8), []);
  const woodSlatTexture = useMemo(() => getWoodSlatTexture(4, 8), []);
  const woodTexture = useMemo(() => getWoodParquetTexture(5, 5), []);
  const terrazzoTexture = useMemo(() => getTerrazzoTexture(4, 4), []);
  const grassTexture = useMemo(() => getGrassTexture(16, 16), []);

  const pw = spec.plotW * UNIT;
  const pl = spec.plotL * UNIT;
  const activeColor = spec.wallColor || (spec.style === 'Luxury' ? '#fafaf9' : (spec.style === 'Bungalow' ? '#64748b' : '#f8fafc'));
  const roofY = spec.floors * FLOOR_HEIGHT;

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
          const isFoyerFront = level === 0 && room.id === 'floor0_foyer_stairs';

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
              {/* Floor Slab */}
              <Box position={[rw / 2, 0.04, rl / 2]} args={[rw, 0.08, rl]} receiveShadow={enableShadows}>
                {isTerrace ? (
                  <meshStandardMaterial color={spec.style === 'Traditional' ? '#854d0e' : '#64748b'} roughness={0.6} />
                ) : (
                  <meshStandardMaterial map={floorMat} roughness={0.35} />
                )}
              </Box>

              {/* Room Walls or Glass Railings */}
              {!isTerrace ? (
                <>
                  <group position={[rw / 2, wallH / 2, 0.06]}>
                    <ExteriorWallSegment 
                      w={rw} 
                      h={wallH} 
                      thickness={0.12} 
                      wallTexture={wallTexture} 
                      wallColor={activeColor}
                      style={spec.style}
                      isLargeGlass={!isCutaway && level > 0}
                    />
                  </group>
                  <group position={[0.06, wallH / 2, rl / 2]} rotation={[0, Math.PI / 2, 0]}>
                    <ExteriorWallSegment 
                      w={rl} 
                      h={wallH} 
                      thickness={0.12} 
                      wallTexture={wallTexture} 
                      wallColor={activeColor}
                      style={spec.style}
                      isLargeGlass={!isCutaway && level > 0 && room.type.includes('Bedroom')}
                    />
                  </group>
                  <group position={[rw - 0.06, wallH / 2, rl / 2]} rotation={[0, Math.PI / 2, 0]}>
                    <ExteriorWallSegment 
                      w={rl} 
                      h={wallH} 
                      thickness={0.12} 
                      wallTexture={wallTexture} 
                      wallColor={activeColor}
                      style={spec.style}
                      isLargeGlass={!isCutaway && level > 0}
                    />
                  </group>
                  {!isCutaway ? (
                    <group position={[rw / 2, wallH / 2, rl - 0.06]}>
                      <ExteriorWallSegment 
                        w={rw} 
                        h={wallH} 
                        thickness={0.12} 
                        wallTexture={wallTexture} 
                        wallColor={activeColor}
                        style={spec.style}
                        isLargeGlass={!isFoyerFront}
                        isFrontEntrance={isFoyerFront}
                      />
                    </group>
                  ) : (
                    <group position={[rw / 2, 0.15, rl - 0.05]}>
                      <Box args={[rw, 0.2, 0.1]} receiveShadow>
                        <meshStandardMaterial color="#ffffff" roughness={0.3} />
                      </Box>
                    </group>
                  )}

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
                  <RoomInteriorDecor 
                    room={room} 
                    w={rw} 
                    l={rl} 
                    isCutaway={isCutaway} 
                  />

                  {/* Railing based on Style */}
                  <group position={[rw / 2, 0.45, rl - 0.04]}>
                    <Box args={[rw, 0.85, 0.03]} castShadow>
                      <meshStandardMaterial 
                        color={spec.style === 'Luxury' ? '#d4af37' : (spec.style === 'Minimalist' ? '#0f172a' : '#e0f2fe')} 
                        transparent={spec.style !== 'Minimalist'}
                        opacity={spec.style === 'Luxury' ? 0.7 : (spec.style === 'Minimalist' ? 1.0 : 0.4)} 
                        roughness={0.05} 
                      />
                    </Box>
                    <Box position={[0, 0.43, 0]} args={[rw, 0.03, 0.06]}>
                      <meshStandardMaterial color={spec.style === 'Luxury' ? '#d4af37' : '#1e293b'} metalness={0.9} />
                    </Box>
                  </group>
                </>
              )}

              {/* SPECIAL FACADE ARCHITECTURE FOR DISTINCT STYLES (EXTERIOR MODE) */}
              {!isCutaway && (
                <>
                  {/* STYLE 1: ROYAL CLASSICAL (Reference Image 5) — Classical Arches & Golden Relief */}
                  {spec.style === 'Luxury' && level === 1 && (
                    <group position={[rw / 2, wallH / 2, rl + 0.08]}>
                      {/* Classical Semi-Circular Arch Portico */}
                      <Box args={[rw * 0.75, 0.18, 0.1]} position={[0, wallH / 2 - 0.09, 0]}>
                        <meshStandardMaterial color="#ffffff" roughness={0.3} />
                      </Box>
                      {/* Gold Baroque Emblem Crest */}
                      <Sphere args={[0.16, 12, 12]} position={[0, wallH / 2 + 0.12, 0.06]}>
                        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
                      </Sphere>
                      {/* Fluted Neoclassical Columns */}
                      <Cylinder args={[0.08, 0.09, wallH, 16]} position={[-rw * 0.35, 0, 0.04]} castShadow>
                        <meshStandardMaterial color="#ffffff" roughness={0.3} />
                      </Cylinder>
                      <Cylinder args={[0.08, 0.09, wallH, 16]} position={[rw * 0.35, 0, 0.04]} castShadow>
                        <meshStandardMaterial color="#ffffff" roughness={0.3} />
                      </Cylinder>
                    </group>
                  )}

                  {/* STYLE 2: ORGANIC BRICK PARAMETRIC (Reference Image 3) — Sweeping Terracotta Brick Wave */}
                  {spec.style === 'Industrial' && level === 1 && (
                    <group position={[rw * 0.3, wallH / 2, rl + 0.08]}>
                      <Box args={[rw * 0.65, wallH * 1.15, 0.14]} rotation={[0, 0, -0.1]} castShadow>
                        <meshStandardMaterial map={wallTexture} roughness={0.7} />
                      </Box>
                      {/* Arched Window Cutout */}
                      <Box args={[0.45, 0.65, 0.16]} position={[0, 0.1, 0.01]}>
                        <meshStandardMaterial color="#1e293b" metalness={0.8} />
                      </Box>
                    </group>
                  )}

                  {/* STYLE 3: MODERN BUNGALOW (Reference Image 1) — Horizontal Wood Slat Accent */}
                  {spec.style === 'Bungalow' && level === 0 && !isFoyerFront && (
                    <group position={[rw / 2 - 0.35, wallH / 2, rl + 0.02]}>
                      <Box args={[0.65, wallH * 0.85, 0.04]}>
                        <meshStandardMaterial map={woodSlatTexture} roughness={0.4} />
                      </Box>
                    </group>
                  )}
                </>
              )}
            </group>
          );
        })}
      </FloorGroup>
    );
  };

  return (
    <group>
      {/* 1. Lush Green Lawn Ground Plane */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={enableShadows}>
        <planeGeometry args={[pw * 2.8, pl * 2.8]} />
        <meshStandardMaterial map={grassTexture} roughness={0.85} />
      </mesh>

      {/* 2. Floors & Interior/Exterior Geometry for 1-4 Floors */}
      {Array.from({ length: spec.floors }).map((_, i) => renderFloor(i))}

      {/* 3. ROOFLINE ARCHITECTURE ACCORDING TO USER'S SELECTED STYLE */}
      {!isCutaway && activeFloor === 'ALL' && (
        <FloorGroup level={spec.floors} isExploded={explodedView}>
          <group position={[0, roofY, 0]}>
            {/* STYLE A: KERALA HERITAGE (Reference Image 2) — Mangalore Clay Tile Hip Roof with Wooden Eaves */}
            {spec.style === 'Traditional' ? (
              <group position={[0, 0.85, 0]}>
                <Cone args={[Math.max(pw, pl) * 0.72, 1.7, 4]} rotation={[0, Math.PI / 4, 0]} castShadow>
                  <meshStandardMaterial map={clayRoofTexture} color="#b91c1c" roughness={0.45} />
                </Cone>
                {/* Teak Wood Overhanging Eaves Fascia */}
                <Box args={[pw * 1.05, 0.08, pl * 1.05]} position={[0, -0.85, 0]} castShadow>
                  <meshStandardMaterial color="#5c2e0b" roughness={0.4} />
                </Box>
              </group>
            ) : spec.style === 'Minimalist' ? (
              /* STYLE B: MINIMALIST SKILLION (Reference Image 4) — Slanted Monopitch Roof with Wood Soffit */
              <group position={[0, 0.45, 0]}>
                <Box 
                  args={[pw * 0.78, 0.14, pl * 0.85]} 
                  position={[pw * 0.12, 0.2, -pl * 0.05]} 
                  rotation={[-0.14, 0, 0]} 
                  castShadow 
                  receiveShadow
                >
                  <meshStandardMaterial color="#1e293b" roughness={0.3} />
                </Box>
                {/* Warm Teak Wood Soffit Underneath */}
                <Box 
                  args={[pw * 0.76, 0.02, pl * 0.83]} 
                  position={[pw * 0.12, 0.12, -pl * 0.05]} 
                  rotation={[-0.14, 0, 0]}
                >
                  <meshStandardMaterial map={woodSlatTexture} roughness={0.4} />
                </Box>
              </group>
            ) : spec.style === 'Bungalow' ? (
              /* STYLE C: MODERN BUNGALOW (Reference Image 1) — Triangular Gable Roof with Attic Vent */
              <group position={[0, 0.75, 0]}>
                <Cone args={[Math.max(pw * 0.7, pl * 0.7), 1.5, 4]} rotation={[0, Math.PI / 4, 0]} castShadow>
                  <meshStandardMaterial color="#334155" roughness={0.4} />
                </Cone>
                {/* White Fascia Trim & Attic Vent */}
                <Box args={[0.45, 0.45, 0.04]} position={[0, -0.15, pl * 0.38]}>
                  <meshStandardMaterial color="#ffffff" />
                </Box>
              </group>
            ) : spec.style === 'Luxury' ? (
              /* STYLE D: ROYAL CLASSICAL (Reference Image 5) — Crown Moulding & Classical Pediment */
              <group>
                <Box args={[pw * 0.55, 0.18, pl * 0.75]} position={[pw * 0.23, 0.09, -pl * 0.05]} castShadow receiveShadow>
                  <meshStandardMaterial map={wallTexture} color="#ffffff" roughness={0.4} />
                </Box>
                {/* Classical Crown Parapet with Gold Finials */}
                <Box args={[pw * 0.55, 0.35, 0.1]} position={[pw * 0.23, 0.35, pl * 0.325]}>
                  <meshStandardMaterial color="#ffffff" />
                </Box>
                <Cone args={[0.18, 0.35, 4]} rotation={[0, Math.PI / 4, 0]} position={[pw * 0.23, 0.7, pl * 0.325]}>
                  <meshStandardMaterial color="#d4af37" metalness={0.9} />
                </Cone>
              </group>
            ) : (
              /* STYLE E: MODERN VILLA (Original Reference 2) — Contemporary Flat Parapet */
              <group>
                <Box args={[pw * 0.55, 0.16, pl * 0.75]} position={[pw * 0.23, 0.08, -pl * 0.05]} castShadow receiveShadow>
                  <meshStandardMaterial map={wallTexture} color={activeColor} roughness={0.5} />
                </Box>
                <Box args={[pw * 0.55, 0.22, 0.08]} position={[pw * 0.23, 0.24, pl * 0.325]}>
                  <meshStandardMaterial color={activeColor} />
                </Box>
                <Box args={[pw * 0.55, 0.22, 0.08]} position={[pw * 0.23, 0.24, -pl * 0.425]}>
                  <meshStandardMaterial color={activeColor} />
                </Box>
                <Box args={[0.08, 0.22, pl * 0.75]} position={[pw * 0.5, 0.24, -pl * 0.05]}>
                  <meshStandardMaterial color={activeColor} />
                </Box>
              </group>
            )}
          </group>
        </FloorGroup>
      )}

      {/* 4. SPECIAL LANDSCAPING ELEMENTS FOR DIFFERENT STYLES */}
      {/* Front Entrance Steps */}
      <PorchSteps width={1.8} position={[pw * 0.24, 0.02, pl / 2 - 0.25]} />

      {/* S-Curved Flagstone Walkway */}
      <CurvedStoneWalkway />

      {/* Sculpted Spiral Topiaries */}
      <SpiralTopiary position={[pw * 0.24 + 1.2, 0, pl / 2 - 0.1]} />
      <SpiralTopiary position={[pw * 0.24 - 1.2, 0, pl / 2 - 0.1]} />

      {/* Boxwood Spherical Shrubs */}
      <BoxwoodShrub position={[0.8, 0, pl / 2 + 0.8]} scale={1.1} />
      <BoxwoodShrub position={[1.0, 0, pl / 2 + 1.8]} scale={0.9} />
      <BoxwoodShrub position={[-0.9, 0, pl / 2 + 2.5]} scale={1.0} />

      {/* Garden Trees */}
      <GardenTree position={[pw / 2 + 1.8, 0, pl / 2 + 1.5]} />
      <GardenTree position={[-pw / 2 - 1.6, 0, -pl / 2 + 1.0]} />

      {/* Perimeter Hedges */}
      <PerimeterHedges width={pw * 1.8} length={pl * 1.8} />

      {/* Paved Parking Pad with Realistic Luxury SUV or Double Carport (Image 4) */}
      {spec.hasParking && (
        <group position={[-pw / 2 - 0.8, 0.02, pl / 2 + 1.0]}>
          <Box args={[2.2, 0.03, 3.4]} receiveShadow={enableShadows}>
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </Box>
          <DrivewayCar />
          {/* Integrated Canopy for Minimalist style (Reference Image 4) */}
          {spec.style === 'Minimalist' && (
            <group position={[0, 0, 0]}>
              <Box args={[2.4, 0.12, 3.6]} position={[0, 2.2, 0]} castShadow>
                <meshStandardMaterial color="#ffffff" roughness={0.3} />
              </Box>
              <Cylinder args={[0.05, 0.05, 2.2, 8]} position={[-1.0, 1.1, 1.6]}><meshStandardMaterial color="#ffffff" /></Cylinder>
              <Cylinder args={[0.05, 0.05, 2.2, 8]} position={[1.0, 1.1, 1.6]}><meshStandardMaterial color="#ffffff" /></Cylinder>
            </group>
          )}
        </group>
      )}

      {/* Royal Classical Decorative Compound Wall & Gate (Reference Image 5) */}
      {spec.style === 'Luxury' && (
        <group position={[0, 0, pl / 2 + 2.2]}>
          <Box args={[pw * 1.4, 0.9, 0.12]} position={[-pw * 0.45, 0.45, 0]} castShadow>
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </Box>
          <Box args={[pw * 1.4, 0.9, 0.12]} position={[pw * 0.45, 0.45, 0]} castShadow>
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </Box>
          {/* Black & Gold Wrought Iron Center Gate */}
          <Box args={[1.6, 0.95, 0.04]} position={[0, 0.475, 0]}>
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </Box>
          <Sphere args={[0.08, 8, 8]} position={[-0.8, 0.98, 0]}><meshStandardMaterial color="#d4af37" metalness={0.95} /></Sphere>
          <Sphere args={[0.08, 8, 8]} position={[0.8, 0.98, 0]}><meshStandardMaterial color="#d4af37" metalness={0.95} /></Sphere>
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

  useEffect(() => {
    if (!cameraControlsRef.current) return;
    const ctrl = cameraControlsRef.current;
    
    if (viewMode === 'EXTERIOR') {
      ctrl.setLookAt(pw * 1.35, Math.max(5.2, houseSpec.floors * 1.8), pl * 1.5, 0, (houseSpec.floors * FLOOR_HEIGHT) / 3, 0, true);
    } else if (viewMode === 'CUTAWAY' && !activeRoomId) {
      ctrl.setLookAt(0.2, Math.max(7.5, houseSpec.floors * 2.5), pl * 0.95, 0, 0.4, 0, true);
    } else if (viewMode === 'INTERIOR' && activeRoomId) {
      const room = houseSpec.rooms.find(r => r.id === activeRoomId);
      if (room) {
        const cx = room.x * UNIT - pw / 2 + (room.w * UNIT) / 2;
        const cz = room.y * UNIT - pl / 2 + (room.l * UNIT) / 2;
        const cy = room.level * FLOOR_HEIGHT + 0.8;
        ctrl.setLookAt(cx, cy + 1.2, cz + (room.l * UNIT) * 0.6, cx, cy, cz, true);
      }
    }
  }, [viewMode, activeRoomId, pw, pl, houseSpec.rooms, houseSpec.floors, resetCameraSignal, explodedView]);

  const enableShadows = effectiveQuality === 'HIGH';
  const dprRange: [number, number] = effectiveQuality === 'HIGH' ? [1, 1.5] : [1, 1];

  return (
    <div className="w-full h-full relative bg-[#090d16] rounded-3xl overflow-hidden flex flex-col touch-none select-none">
      
      {/* 3D Performance Selector */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-slate-950/80 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-300 shadow-xl">
        <span className="text-amber-400 flex items-center gap-1 mr-1">
          <i className="bx bx-bulb text-xs"></i> 3D Mode:
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

        <directionalLight position={[-12, 10, -12]} intensity={0.65} color="#93c5fd" />
        <directionalLight position={[0, -5, 0]} intensity={0.2} color="#15803d" />

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
          maxDistance={25} 
          maxPolarAngle={Math.PI / 2 - 0.02} 
          makeDefault 
          dollySpeed={0.5}
        />
      </Canvas>
      
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
