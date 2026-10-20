'use client';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Box, Cylinder, Cone, Sphere, CameraControls } from '@react-three/drei';
import * as THREE from 'three';
import { Room, HouseSpec, generateHouseLayout } from './layoutGenerator';
import { exportSceneToGLB } from './ExportServices';
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
  getGrassTexture,
  getStackedStoneTexture,
  getConcreteTexture
} from './RealisticMaterials';

const FLOOR_HEIGHT = 2.0;
const UNIT = 0.1;

export type QualityMode = 'AUTO' | 'HIGH' | 'MEDIUM' | 'LOW';

/**
 * Furnishings and interior room decoration.
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
      {/* 1. Living Room: Sofa, Coffee Table, TV Unit */}
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

      {/* 2. Dining Area */}
      {room.type === 'Dining' && (
        <group position={[w / 2, 0, l / 2]}>
          <DiningSet />
        </group>
      )}

      {/* 3. Gourmet Kitchen */}
      {room.type === 'Kitchen' && (
        <group position={[w / 2, 0, l / 2]}>
          <KitchenSet />
        </group>
      )}

      {/* 4. Foyer & Staircase */}
      {room.type === 'Foyer' && (
        <group position={[w / 2, 0, l / 2]}>
          <group position={[w / 2 - 0.55, 0, -0.05]} rotation={[0, -Math.PI / 2, 0]}>
            <Staircase height={FLOOR_HEIGHT} />
          </group>
        </group>
      )}

      {/* 5. Bathroom */}
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
        <group position={[w / 2, FLOOR_HEIGHT * 0.55, l - 0.08]}>
          <WallArtwork width={0.7} height={0.5} />
        </group>
      )}
    </group>
  );
});
RoomInteriorDecor.displayName = 'RoomInteriorDecor';

/**
 * Exterior Wall Segment with style-specific windows, frames, and materials.
 */
const ExteriorWallSegment = React.memo(({ 
  w, 
  h, 
  thickness, 
  wallTexture, 
  wallColor, 
  style, 
  isLargeGlass = false, 
  isFrontEntrance = false,
  isGroundFloor = false
}: { 
  w: number; 
  h: number; 
  thickness: number; 
  wallTexture: THREE.CanvasTexture; 
  wallColor: string; 
  style: string; 
  isLargeGlass?: boolean; 
  isFrontEntrance?: boolean;
  isGroundFloor?: boolean;
}) => {
  // If Bungalow on ground floor, add stone wainscot on the lower 1/3
  const isBungalowWainscot = style === 'Bungalow' && isGroundFloor && !isFrontEntrance;
  const stoneWainscotTexture = useMemo(() => isBungalowWainscot ? getStackedStoneTexture(4, 2) : null, [isBungalowWainscot]);

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
    if (isBungalowWainscot && stoneWainscotTexture) {
      const stoneH = h * 0.32;
      const upperH = h - stoneH;
      return (
        <group>
          {/* Lower Stone Wainscot */}
          <Box position={[0, -h / 2 + stoneH / 2, 0.01]} args={[w, stoneH, thickness + 0.02]} castShadow receiveShadow>
            <meshStandardMaterial map={stoneWainscotTexture} roughness={0.8} />
          </Box>
          {/* Stone Wainscot Ledge Trim */}
          <Box position={[0, -h / 2 + stoneH, 0.02]} args={[w + 0.04, 0.04, thickness + 0.04]} castShadow>
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </Box>
          {/* Upper Stucco Wall */}
          <Box position={[0, -h / 2 + stoneH + upperH / 2, 0]} args={[w, upperH, thickness]} castShadow receiveShadow>
            <meshStandardMaterial map={wallTexture} color={wallColor} roughness={0.4} />
          </Box>
        </group>
      );
    }

    return (
      <Box args={[w, h, thickness]} castShadow receiveShadow>
        <meshStandardMaterial map={wallTexture} color={wallColor} roughness={0.4} />
      </Box>
    );
  }

  const windowW = w * 0.82;
  const windowH = h * 0.78;
  const wallPillarW = (w - windowW) / 2;
  
  // Style-specific frame colors
  let frameColor = '#1f242d';
  if (style === 'Luxury') frameColor = '#d4af37';
  if (style === 'Minimalist') frameColor = '#090d16';
  if (style === 'Industrial') frameColor = '#09090b';
  if (style === 'Traditional') frameColor = '#5c2e0b';
  if (style === 'Bungalow') frameColor = '#ffffff';

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

      {/* Frame Trim */}
      <Box position={[0, 0, thickness / 2 + 0.01]} args={[windowW + 0.04, windowH + 0.04, 0.04]}>
        <meshStandardMaterial color={frameColor} metalness={style === 'Luxury' ? 0.9 : (style === 'Industrial' ? 0.85 : 0.4)} roughness={0.2} />
      </Box>

      {/* Warm Illumination Glow Behind Glass */}
      <Box position={[0, 0, -0.02]} args={[windowW - 0.02, windowH - 0.02, 0.01]}>
        <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.5} />
      </Box>

      {/* Glass Pane */}
      <Box position={[0, 0, 0]} args={[windowW, windowH, 0.02]}>
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.55} roughness={0.08} metalness={0.3} />
      </Box>

      {/* Style-Specific Window Mullion Patterns */}
      {style === 'Industrial' ? (
        /* Industrial Crittall 3x3 Grid */
        <group position={[0, 0, 0.02]}>
          <Box position={[-windowW / 3, 0, 0]} args={[0.02, windowH, 0.02]}><meshStandardMaterial color={frameColor} metalness={0.8} /></Box>
          <Box position={[windowW / 3, 0, 0]} args={[0.02, windowH, 0.02]}><meshStandardMaterial color={frameColor} metalness={0.8} /></Box>
          <Box position={[0, -windowH / 3, 0]} args={[windowW, 0.02, 0.02]}><meshStandardMaterial color={frameColor} metalness={0.8} /></Box>
          <Box position={[0, windowH / 3, 0]} args={[windowW, 0.02, 0.02]}><meshStandardMaterial color={frameColor} metalness={0.8} /></Box>
        </group>
      ) : style === 'Bungalow' ? (
        /* Craftsman Cottage Window with White Muntins & Dark Shutters */
        <group>
          {/* Center Cross Mullions */}
          <Box position={[0, 0, 0.02]} args={[0.025, windowH, 0.02]}><meshStandardMaterial color="#ffffff" /></Box>
          <Box position={[0, windowH * 0.15, 0.02]} args={[windowW, 0.025, 0.02]}><meshStandardMaterial color="#ffffff" /></Box>
          {/* Flanking Timber Shutters */}
          <Box position={[-windowW / 2 - 0.12, 0, thickness / 2 + 0.01]} args={[0.22, windowH, 0.03]} castShadow>
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </Box>
          <Box position={[windowW / 2 + 0.12, 0, thickness / 2 + 0.01]} args={[0.22, windowH, 0.03]} castShadow>
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </Box>
        </group>
      ) : style === 'Luxury' ? (
        /* Neoclassical Arched Top Trim with Gold Crest */
        <group>
          <Box position={[0, 0, 0.02]} args={[0.025, windowH, 0.02]}><meshStandardMaterial color={frameColor} metalness={0.9} /></Box>
          <Box position={[0, 0, 0.02]} args={[windowW, 0.025, 0.02]}><meshStandardMaterial color={frameColor} metalness={0.9} /></Box>
          {/* Classical Crown Moulding above window */}
          <Box position={[0, windowH / 2 + 0.06, thickness / 2 + 0.02]} args={[windowW + 0.12, 0.08, 0.06]} castShadow>
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </Box>
        </group>
      ) : (
        /* Modern / Minimalist Sleek Slim Cross */
        <group position={[0, 0, 0.02]}>
          <Box args={[0.025, windowH, 0.02]}><meshStandardMaterial color={frameColor} metalness={0.8} /></Box>
          <Box args={[windowW, 0.025, 0.02]}><meshStandardMaterial color={frameColor} metalness={0.8} /></Box>
        </group>
      )}
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
 * Signature Architectural Building Elements for Each of the 6 Styles.
 * Renders distinct columns, cantilevers, verandas, jaali screens, pergolas, and belt courses.
 */
const StyleFacadeArchitecture = React.memo(({
  spec,
  pw,
  pl,
  activeColor,
  enableShadows
}: {
  spec: HouseSpec;
  pw: number;
  pl: number;
  activeColor: string;
  enableShadows: boolean;
}) => {
  const woodSlatTexture = useMemo(() => getWoodSlatTexture(4, 8), []);
  const brickTexture = useMemo(() => getParametricBrickTexture(8, 8), []);
  const clayRoofTexture = useMemo(() => getClayTileRoofTexture(8, 8), []);
  const buildingHeight = spec.floors * FLOOR_HEIGHT;

  // 1. MODERN VILLA: Dramatic Cantilevered Volume, Corner Glass, Floating Canopy, Teak Louvers
  if (spec.style === 'Modern') {
    return (
      <group>
        {/* Cantilevered 1st/2nd Floor Architectural Frame projecting forward */}
        {spec.floors >= 2 && (
          <group position={[-pw * 0.05, FLOOR_HEIGHT, pl / 2 - 0.2]}>
            {/* Projecting Cantilever Balcony Box */}
            <Box args={[pw * 0.58, 0.14, 0.7]} position={[0, -0.07, 0.35]} castShadow receiveShadow>
              <meshStandardMaterial color="#0f172a" roughness={0.3} />
            </Box>
            {/* Frameless Glass Railing with Black Aluminum Handrail */}
            <Box args={[pw * 0.58, 0.85, 0.02]} position={[0, 0.425, 0.7]} castShadow>
              <meshStandardMaterial color="#bae6fd" transparent opacity={0.45} roughness={0.1} />
            </Box>
            <Box args={[pw * 0.58, 0.03, 0.04]} position={[0, 0.85, 0.7]}>
              <meshStandardMaterial color="#020617" metalness={0.9} />
            </Box>
            {/* Underside Warm LED Recessed Lighting strip */}
            <Box args={[pw * 0.54, 0.02, 0.04]} position={[0, -0.15, 0.35]}>
              <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.8} />
            </Box>
          </group>
        )}

        {/* Floating Minimalist Concrete Entrance Canopy over Front Door */}
        <group position={[pw * 0.24, FLOOR_HEIGHT * 0.88, pl / 2 - 0.1]}>
          <Box args={[1.8, 0.08, 1.2]} position={[0, 0, 0.6]} castShadow receiveShadow>
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </Box>
          {/* Slim Black Structural Steel Column */}
          <Cylinder args={[0.04, 0.04, FLOOR_HEIGHT * 0.88, 12]} position={[0.85, -FLOOR_HEIGHT * 0.44, 1.15]} castShadow>
            <meshStandardMaterial color="#020617" metalness={0.9} />
          </Cylinder>
          {/* LED Spotlights in canopy */}
          <Sphere args={[0.05, 8, 8]} position={[-0.4, -0.05, 0.6]}><meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.9} /></Sphere>
          <Sphere args={[0.05, 8, 8]} position={[0.4, -0.05, 0.6]}><meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.9} /></Sphere>
        </group>

        {/* Vertical Teak Wood Architectural Louvers on Living Wing Facade */}
        <group position={[-pw * 0.28, buildingHeight / 2, pl / 2 - 0.25]}>
          {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((xOffset, idx) => (
            <Box key={idx} args={[0.04, buildingHeight * 0.85, 0.12]} position={[xOffset, 0, 0.08]} castShadow>
              <meshStandardMaterial map={woodSlatTexture} roughness={0.4} />
            </Box>
          ))}
        </group>

        {/* Rooftop Steel Pergola over Sky Terrace */}
        {spec.hasTerrace && (
          <group position={[-pw * 0.18, buildingHeight, pl * 0.05]}>
            <Box args={[pw * 0.48, 0.06, 0.08]} position={[0, 1.6, -pl * 0.2]}><meshStandardMaterial color="#0f172a" metalness={0.8} /></Box>
            <Box args={[pw * 0.48, 0.06, 0.08]} position={[0, 1.6, pl * 0.2]}><meshStandardMaterial color="#0f172a" metalness={0.8} /></Box>
            {[-0.6, -0.3, 0, 0.3, 0.6].map((zOff, i) => (
              <Box key={i} args={[0.04, 0.08, pl * 0.45]} position={[zOff * pw * 0.35, 1.65, 0]}>
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </Box>
            ))}
          </group>
        )}
      </group>
    );
  }

  // 2. ROYAL CLASSICAL / LUXURY: Grand 2-Storey Neoclassical Portico, 4 Fluted Columns, Classical Pediment, Stone Quoins
  if (spec.style === 'Luxury') {
    const colHeight = Math.min(buildingHeight, FLOOR_HEIGHT * 2);
    return (
      <group>
        {/* Grand Neoclassical Projecting Portico */}
        <group position={[pw * 0.24, 0, pl / 2 - 0.15]}>
          {/* Base Plinth Steps */}
          <Box args={[2.4, 0.12, 1.3]} position={[0, 0.06, 0.65]} receiveShadow>
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </Box>
          {/* 4 Majestic Fluted Neoclassical Columns */}
          {[-0.9, -0.3, 0.3, 0.9].map((cx, idx) => (
            <group key={idx} position={[cx, 0.12, 1.15]}>
              {/* Column Base Torus */}
              <Cylinder args={[0.12, 0.14, 0.1, 16]} position={[0, 0.05, 0]} castShadow>
                <meshStandardMaterial color="#ffffff" roughness={0.3} />
              </Cylinder>
              {/* Fluted Column Shaft */}
              <Cylinder args={[0.08, 0.09, colHeight - 0.3, 20]} position={[0, (colHeight - 0.3) / 2 + 0.1, 0]} castShadow>
                <meshStandardMaterial color="#ffffff" roughness={0.3} />
              </Cylinder>
              {/* Corinthian Capital & Abacus */}
              <Box args={[0.22, 0.1, 0.22]} position={[0, colHeight - 0.15, 0]} castShadow>
                <meshStandardMaterial color="#ffffff" roughness={0.3} />
              </Box>
              <Sphere args={[0.05, 8, 8]} position={[0, colHeight - 0.1, 0]}>
                <meshStandardMaterial color="#d4af37" metalness={0.95} />
              </Sphere>
            </group>
          ))}

          {/* Classical Heavy Entablature Architrave Beam */}
          <Box args={[2.6, 0.24, 1.4]} position={[0, colHeight + 0.12, 0.65]} castShadow>
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </Box>

          {/* Classical Triangular Pediment with Gold Crest */}
          <group position={[0, colHeight + 0.24, 1.25]}>
            <Cone args={[1.35, 0.7, 4]} rotation={[0, Math.PI / 4, 0]} position={[0, 0.35, 0]} castShadow>
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </Cone>
            {/* Gold Baroque Crest */}
            <Sphere args={[0.12, 12, 12]} position={[0, 0.28, 0.12]}>
              <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} />
            </Sphere>
          </group>

          {/* Twin Illuminated Brass Carriage Lanterns flanking Grand Door */}
          <group position={[-0.8, FLOOR_HEIGHT * 0.65, 0.05]}>
            <Box args={[0.1, 0.18, 0.1]}><meshStandardMaterial color="#d4af37" metalness={0.9} /></Box>
            <Sphere args={[0.04, 8, 8]} position={[0, 0, 0.02]}><meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={1.0} /></Sphere>
          </group>
          <group position={[0.8, FLOOR_HEIGHT * 0.65, 0.05]}>
            <Box args={[0.1, 0.18, 0.1]}><meshStandardMaterial color="#d4af37" metalness={0.9} /></Box>
            <Sphere args={[0.04, 8, 8]} position={[0, 0, 0.02]}><meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={1.0} /></Sphere>
          </group>
        </group>

        {/* Classical Belt-Course Cornice separating floors */}
        {Array.from({ length: spec.floors - 1 }).map((_, i) => (
          <Box key={i} args={[pw * 1.04, 0.12, pl * 1.04]} position={[0, (i + 1) * FLOOR_HEIGHT, 0]} castShadow>
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </Box>
        ))}

        {/* Rusticated Ashlar Stone Corner Quoins on building corners */}
        {[-pw / 2 + 0.1, pw / 2 - 0.1].map((cx, idx) => (
          <group key={idx} position={[cx, buildingHeight / 2, pl / 2 - 0.15]}>
            {Array.from({ length: Math.floor(buildingHeight / 0.3) }).map((_, qIdx) => (
              <Box 
                key={qIdx} 
                args={[0.22, 0.12, 0.22]} 
                position={[0, -buildingHeight / 2 + qIdx * 0.3 + 0.15, 0]} 
                castShadow
              >
                <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
              </Box>
            ))}
          </group>
        ))}
      </group>
    );
  }

  // 3. KERALA HERITAGE / TRADITIONAL: Wraparound Colonnaded Verandah (Chuttu-Varandah), Teak Pillars, Charupadi, Mukhappu
  if (spec.style === 'Traditional') {
    return (
      <group>
        {/* Continuous Colonnaded Verandah (Chuttu-Varandah) running across front and side */}
        <group position={[0, 0, pl / 2 - 0.1]}>
          {/* Granite Plinth Foundation */}
          <Box args={[pw * 1.08, 0.16, 1.2]} position={[0, 0.08, 0.6]} receiveShadow>
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </Box>

          {/* Traditional Round Teakwood Pillars resting on carved Granite Pedestals */}
          {[-pw * 0.45, -pw * 0.2, 0.05, pw * 0.3, pw * 0.48].map((px, idx) => (
            <group key={idx} position={[px, 0.16, 1.1]}>
              {/* Black Granite Pedestal Base */}
              <Cylinder args={[0.11, 0.13, 0.14, 16]} position={[0, 0.07, 0]} castShadow>
                <meshStandardMaterial color="#18181b" roughness={0.7} />
              </Cylinder>
              {/* Turned Teak Pillar Shaft */}
              <Cylinder args={[0.075, 0.085, FLOOR_HEIGHT - 0.35, 16]} position={[0, (FLOOR_HEIGHT - 0.35) / 2 + 0.14, 0]} castShadow>
                <meshStandardMaterial color="#5c2e0b" roughness={0.4} />
              </Cylinder>
              {/* Carved Wooden Capital Bracket */}
              <Box args={[0.22, 0.1, 0.16]} position={[0, FLOOR_HEIGHT - 0.15, 0]}>
                <meshStandardMaterial color="#451a03" roughness={0.4} />
              </Box>
            </group>
          ))}

          {/* Traditional Wooden Charupadi (Slanted Bench Balustrade) enclosing the sit-out */}
          <group position={[-pw * 0.2, 0.16, 1.1]}>
            <Box args={[pw * 0.45, 0.45, 0.08]} position={[0, 0.25, 0]} castShadow>
              <meshStandardMaterial color="#5c2e0b" roughness={0.4} />
            </Box>
            {/* Slanted Backrest battens */}
            <Box args={[pw * 0.45, 0.04, 0.12]} position={[0, 0.48, -0.04]}>
              <meshStandardMaterial color="#451a03" roughness={0.3} />
            </Box>
          </group>

          {/* Ground Floor Sloping Clay Tile Verandah Eaves with Exposed Rafters */}
          <group position={[0, FLOOR_HEIGHT, 0.6]}>
            <Box args={[pw * 1.15, 0.12, 1.5]} rotation={[0.18, 0, 0]} castShadow receiveShadow>
              <meshStandardMaterial map={clayRoofTexture} color="#b91c1c" roughness={0.45} />
            </Box>
            {/* Teak Eaves Fascia Board */}
            <Box args={[pw * 1.16, 0.08, 0.03]} position={[0, -0.15, 0.72]}>
              <meshStandardMaterial color="#451a03" roughness={0.4} />
            </Box>
          </group>

          {/* Ornate Carved Wooden Mukhappu (Gable End) over Entrance Porch */}
          <group position={[pw * 0.24, FLOOR_HEIGHT + 0.15, 1.25]}>
            <Cone args={[0.9, 0.75, 4]} rotation={[0, Math.PI / 4, 0]} position={[0, 0.38, 0]} castShadow>
              <meshStandardMaterial map={clayRoofTexture} color="#b91c1c" roughness={0.45} />
            </Cone>
            {/* Wooden Gable Face with Louvered Attic Vent */}
            <Box args={[0.65, 0.45, 0.04]} position={[0, 0.25, 0.25]}>
              <meshStandardMaterial color="#451a03" roughness={0.4} />
            </Box>
            {/* Brass Thazhikakkudam (Spire Finial) */}
            <Cone args={[0.06, 0.35, 8]} position={[0, 0.85, 0]}>
              <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} />
            </Cone>
          </group>

          {/* Hanging Brass Temple Lamp (Thookkuvilakku) */}
          <group position={[pw * 0.24, FLOOR_HEIGHT - 0.2, 0.8]}>
            <Cylinder args={[0.005, 0.005, 0.35, 6]} position={[0, 0.15, 0]}><meshStandardMaterial color="#d4af37" metalness={0.9} /></Cylinder>
            <Sphere args={[0.06, 8, 8]} position={[0, 0, 0]}><meshStandardMaterial color="#d4af37" metalness={0.95} /></Sphere>
            <Sphere args={[0.03, 8, 8]} position={[0, -0.05, 0]}><meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={1.2} /></Sphere>
          </group>
        </group>
      </group>
    );
  }

  // 4. MINIMALIST SKILLION: Slanted Monopitch, Vertical Cedar Screen, Cantilevered Steel Carport
  if (spec.style === 'Minimalist') {
    return (
      <group>
        {/* Full-Height Vertical Cedar Slat Architectural Screen (Brise-Soleil) on Upper Bay */}
        {spec.floors >= 2 && (
          <group position={[-pw * 0.2, FLOOR_HEIGHT + 0.1, pl / 2 - 0.1]}>
            <Box args={[pw * 0.45, FLOOR_HEIGHT * 0.88, 0.08]} castShadow>
              <meshStandardMaterial map={woodSlatTexture} roughness={0.4} />
            </Box>
            {/* Black Steel Frame surrounding the screen */}
            <Box args={[pw * 0.47, 0.04, 0.1]} position={[0, FLOOR_HEIGHT * 0.44, 0]}><meshStandardMaterial color="#020617" metalness={0.9} /></Box>
            <Box args={[pw * 0.47, 0.04, 0.1]} position={[0, -FLOOR_HEIGHT * 0.44, 0]}><meshStandardMaterial color="#020617" metalness={0.9} /></Box>
          </group>
        )}

        {/* Minimalist Recessed Entry Portal with Vertical Amber LED Light Channel */}
        <group position={[pw * 0.24, FLOOR_HEIGHT * 0.45, pl / 2 - 0.05]}>
          <Box args={[1.6, FLOOR_HEIGHT * 0.9, 0.2]} position={[0, 0, -0.1]}>
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </Box>
          {/* Vertical Recessed LED Channel */}
          <Box args={[0.02, FLOOR_HEIGHT * 0.75, 0.02]} position={[-0.65, 0, 0.02]}>
            <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={1.2} />
          </Box>
        </group>

        {/* Cantilevered Minimalist Steel Carport with Diagonal Tension Rods */}
        {spec.hasParking && (
          <group position={[-pw / 2 - 0.8, FLOOR_HEIGHT * 0.85, pl / 2 + 1.0]}>
            <Box args={[2.4, 0.06, 3.8]} position={[0, 0, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#0f172a" roughness={0.3} />
            </Box>
            {/* Diagonal Suspension Rods */}
            <Cylinder args={[0.015, 0.015, 1.8, 6]} position={[-1.1, 0.8, -1.2]} rotation={[0.4, 0, 0.2]}>
              <meshStandardMaterial color="#020617" metalness={0.9} />
            </Cylinder>
            <Cylinder args={[0.015, 0.015, 1.8, 6]} position={[1.1, 0.8, -1.2]} rotation={[0.4, 0, -0.2]}>
              <meshStandardMaterial color="#020617" metalness={0.9} />
            </Cylinder>
          </group>
        )}
      </group>
    );
  }

  // 5. ORGANIC BRICK / INDUSTRIAL: Exposed Brick, Parametric Jaali Lattice, Structural Steel I-Beams
  if (spec.style === 'Industrial') {
    return (
      <group>
        {/* Structural Black Steel I-Beams (H-Columns) Framing Corners */}
        {[-pw / 2 + 0.08, pw / 2 - 0.08].map((bx, idx) => (
          <group key={idx} position={[bx, buildingHeight / 2, pl / 2 - 0.18]}>
            <Box args={[0.14, buildingHeight, 0.14]} castShadow>
              <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.2} />
            </Box>
          </group>
        ))}

        {/* Exposed Concrete Floor Slab Bands */}
        {Array.from({ length: spec.floors }).map((_, fIdx) => (
          <Box key={fIdx} args={[pw * 1.02, 0.16, pl * 1.02]} position={[0, (fIdx + 1) * FLOOR_HEIGHT, 0]} castShadow>
            <meshStandardMaterial color="#64748b" roughness={0.7} />
          </Box>
        ))}

        {/* Parametric Perforated Brick Jaali Lattice Screen Wall on First Floor */}
        {spec.floors >= 2 && (
          <group position={[-pw * 0.18, FLOOR_HEIGHT * 1.5, pl / 2 - 0.1]}>
            <Box args={[pw * 0.45, FLOOR_HEIGHT * 0.88, 0.1]} castShadow>
              <meshStandardMaterial map={brickTexture} roughness={0.7} />
            </Box>
            {/* Jaali Perforations with Ambient Light Transmission */}
            {[-0.5, -0.25, 0, 0.25, 0.5].map((jx, i) => (
              [-0.3, 0, 0.3].map((jy, j) => (
                <Box key={`${i}_${j}`} args={[0.12, 0.14, 0.14]} position={[jx * (pw * 0.38), jy * (FLOOR_HEIGHT * 0.7), 0]}>
                  <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.6} />
                </Box>
              ))
            ))}
          </group>
        )}
      </group>
    );
  }

  // 6. MODERN BUNGALOW: Covered Craftsman Porch, Stacked Stone Piers, Heavy Timber Posts
  if (spec.style === 'Bungalow') {
    const stoneTexture = getStackedStoneTexture(4, 4);
    return (
      <group>
        {/* Prominent Craftsman Covered Front Porch */}
        <group position={[pw * 0.24, 0, pl / 2 - 0.15]}>
          {/* Stone Plinth Deck */}
          <Box args={[2.5, 0.16, 1.4]} position={[0, 0.08, 0.7]} receiveShadow>
            <meshStandardMaterial map={stoneTexture} roughness={0.8} />
          </Box>

          {/* Heavy Timber Posts on Tapered Stone Piers */}
          {[-1.0, 1.0].map((px, idx) => (
            <group key={idx} position={[px, 0.16, 1.25]}>
              {/* Tapered Stone Pier Base */}
              <Box args={[0.34, 0.65, 0.34]} position={[0, 0.325, 0]} castShadow>
                <meshStandardMaterial map={stoneTexture} roughness={0.8} />
              </Box>
              <Box args={[0.38, 0.04, 0.38]} position={[0, 0.65, 0]}>
                <meshStandardMaterial color="#ffffff" roughness={0.4} />
              </Box>
              {/* Square Heavy Timber Post */}
              <Box args={[0.16, FLOOR_HEIGHT - 0.75, 0.16]} position={[0, (FLOOR_HEIGHT - 0.75) / 2 + 0.67, 0]} castShadow>
                <meshStandardMaterial color="#451a03" roughness={0.5} />
              </Box>
            </group>
          ))}

          {/* Craftsman Porch Roof with Timber Gable Truss */}
          <group position={[0, FLOOR_HEIGHT, 0.7]}>
            <Cone args={[1.5, 0.85, 4]} rotation={[0, Math.PI / 4, 0]} position={[0, 0.425, 0]} castShadow>
              <meshStandardMaterial color="#334155" roughness={0.4} />
            </Cone>
            {/* Exposed Timber King-Post Truss */}
            <Box args={[1.8, 0.08, 0.04]} position={[0, 0.04, 0.65]}><meshStandardMaterial color="#ffffff" /></Box>
            <Box args={[0.08, 0.5, 0.04]} position={[0, 0.28, 0.65]}><meshStandardMaterial color="#ffffff" /></Box>
          </group>
        </group>
      </group>
    );
  }

  return null;
});
StyleFacadeArchitecture.displayName = 'StyleFacadeArchitecture';

/**
 * Architectural 3D House Model with full structural support for all 6 styles:
 * 1. Modern Villa (Cantilever Glass & Rooftop Terrace)
 * 2. Royal Classical (Neoclassical Portico, Fluted Columns, Arches & Pediment)
 * 3. Minimalist Skillion (Slanted Monopitch Roof, Cedar Screen, Carport)
 * 4. Organic Brick (Exposed Terracotta Brick, Jaali Screen & Steel Beams)
 * 5. Kerala Heritage (Chuttu-Varandah, Teak Pillars, Charupadi, Mukhappu)
 * 6. Modern Bungalow (Craftsman Porch, Stacked Stone Wainscot & Gable Trusses)
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
                      isGroundFloor={level === 0}
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
                      isGroundFloor={level === 0}
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
                      isGroundFloor={level === 0}
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
                        isGroundFloor={level === 0}
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

      {/* 3. SIGNATURE FACADE ARCHITECTURE (Columns, Portico, Verandah, Cantilevers, Jaali Screens) */}
      {!isCutaway && activeFloor === 'ALL' && (
        <StyleFacadeArchitecture 
          spec={spec} 
          pw={pw} 
          pl={pl} 
          activeColor={activeColor} 
          enableShadows={enableShadows} 
        />
      )}

      {/* 4. ROOFLINE ARCHITECTURE ACCORDING TO USER'S SELECTED STYLE & FLOOR COUNT */}
      {!isCutaway && activeFloor === 'ALL' && (
        <FloorGroup level={spec.floors} isExploded={explodedView}>
          <group position={[0, roofY, 0]}>
            {/* STYLE A: KERALA HERITAGE — Mangalore Clay Tile Hip Roof with Wooden Eaves */}
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
              /* STYLE B: MINIMALIST SKILLION — Slanted Monopitch Roof with Wood Soffit */
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
              /* STYLE C: MODERN BUNGALOW — Dual Pitch Gable Roof with Craftsman Truss */
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
              /* STYLE D: ROYAL CLASSICAL — Crown Moulding, Classical Balustrade & Pediment */
              <group>
                <Box args={[pw * 0.65, 0.18, pl * 0.8]} position={[pw * 0.18, 0.09, -pl * 0.05]} castShadow receiveShadow>
                  <meshStandardMaterial map={wallTexture} color="#ffffff" roughness={0.4} />
                </Box>
                {/* Classical Crown Parapet with Gold Finials */}
                <Box args={[pw * 0.65, 0.35, 0.1]} position={[pw * 0.18, 0.35, pl * 0.35]}>
                  <meshStandardMaterial color="#ffffff" />
                </Box>
                <Cone args={[0.18, 0.35, 4]} rotation={[0, Math.PI / 4, 0]} position={[pw * 0.18, 0.7, pl * 0.35]}>
                  <meshStandardMaterial color="#d4af37" metalness={0.9} />
                </Cone>
              </group>
            ) : spec.style === 'Industrial' ? (
              /* STYLE E: INDUSTRIAL / ORGANIC BRICK — Stepped Brick Parapet & Gravel Terrace */
              <group>
                <Box args={[pw * 0.65, 0.22, pl * 0.8]} position={[pw * 0.18, 0.11, -pl * 0.05]} castShadow receiveShadow>
                  <meshStandardMaterial map={getParametricBrickTexture(8, 8)} roughness={0.7} />
                </Box>
                {/* Matte Black Steel Safety Railing */}
                <Box args={[pw * 0.65, 0.04, 0.04]} position={[pw * 0.18, 0.55, pl * 0.35]}>
                  <meshStandardMaterial color="#09090b" metalness={0.9} />
                </Box>
              </group>
            ) : (
              /* STYLE F: MODERN VILLA — Minimalist Parapet with Cantilevered Concrete Slab & LED Wash */
              <group>
                <Box args={[pw * 0.65, 0.16, pl * 0.8]} position={[pw * 0.18, 0.08, -pl * 0.05]} castShadow receiveShadow>
                  <meshStandardMaterial map={wallTexture} color={activeColor} roughness={0.5} />
                </Box>
                <Box args={[pw * 0.65, 0.24, 0.08]} position={[pw * 0.18, 0.24, pl * 0.35]}>
                  <meshStandardMaterial color="#0f172a" />
                </Box>
                <Box args={[pw * 0.65, 0.24, 0.08]} position={[pw * 0.18, 0.24, -pl * 0.45]}>
                  <meshStandardMaterial color="#0f172a" />
                </Box>
                <Box args={[0.08, 0.24, pl * 0.8]} position={[pw * 0.5, 0.24, -pl * 0.05]}>
                  <meshStandardMaterial color="#0f172a" />
                </Box>
              </group>
            )}
          </group>
        </FloorGroup>
      )}

      {/* 5. LANDSCAPING ELEMENTS */}
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

      {/* Paved Parking Pad with Realistic Luxury SUV or Double Carport */}
      {spec.hasParking && (
        <group position={[-pw / 2 - 0.8, 0.02, pl / 2 + 1.0]}>
          <Box args={[2.2, 0.03, 3.4]} receiveShadow={enableShadows}>
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </Box>
          <DrivewayCar />
        </group>
      )}

      {/* Royal Classical Decorative Compound Wall & Gate */}
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

function ModelExportHandler({ signal, fileName }: { signal?: number; fileName: string }) {
  const { scene } = useThree();
  const lastSignalRef = useRef(signal);

  useEffect(() => {
    if (signal && signal !== lastSignalRef.current) {
      lastSignalRef.current = signal;
      exportSceneToGLB(scene, fileName);
    }
  }, [signal, scene, fileName]);

  return null;
}

export default function AdvancedViewer({ 
  specs, 
  viewMode, 
  activeFloor, 
  activeRoomId, 
  resetCameraSignal, 
  explodedView, 
  onRoomClick,
  exportModelSignal 
}: { 
  specs: any; 
  viewMode: string; 
  activeFloor: number | 'ALL'; 
  activeRoomId: string | null; 
  resetCameraSignal: number; 
  explodedView: boolean; 
  onRoomClick: (id: string) => void;
  exportModelSignal?: number;
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
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              qualityMode === mode 
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs' 
                : 'hover:text-white hover:bg-white/10'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      <Canvas
        shadows={enableShadows}
        dpr={dprRange}
        gl={{ 
          antialias: effectiveQuality !== 'LOW', 
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        camera={{ position: [pw * 1.35, Math.max(5.2, houseSpec.floors * 1.8), pl * 1.5], fov: 42 }}
      >
        <CameraControls 
          ref={cameraControlsRef} 
          minDistance={1.8} 
          maxDistance={35} 
          dollySpeed={0.8}
          truckSpeed={0.8}
        />

        {/* Ambient & Directional Architectural Sun Lighting */}
        <ambientLight intensity={effectiveQuality === 'LOW' ? 1.0 : 0.65} />
        <directionalLight 
          position={[10, 16, 12]} 
          intensity={effectiveQuality === 'LOW' ? 1.2 : 1.45} 
          castShadow={enableShadows}
          shadow-mapSize-width={effectiveQuality === 'HIGH' ? 1024 : 512}
          shadow-mapSize-height={effectiveQuality === 'HIGH' ? 1024 : 512}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-10, 10, -10]} intensity={0.4} />

        {/* Architectural 3D House Assembly */}
        <ArchitecturalModel 
          spec={houseSpec}
          viewMode={viewMode}
          activeFloor={activeFloor}
          activeRoomId={activeRoomId}
          explodedView={explodedView}
          onRoomClick={onRoomClick}
          enableShadows={enableShadows}
        />

        {/* Ground Soft Ambient Shadow */}
        {enableShadows && (
          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.65} 
            scale={Math.max(pw, pl) * 2.2} 
            blur={1.5} 
            far={10} 
          />
        )}

        <ModelExportHandler 
          signal={exportModelSignal} 
          fileName={`${houseSpec.style.toLowerCase()}_house_model.glb`} 
        />
      </Canvas>
    </div>
  );
}
