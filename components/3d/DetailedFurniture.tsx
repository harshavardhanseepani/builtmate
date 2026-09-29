import React from 'react';
import { Box, Cylinder, Cone } from '@react-three/drei';

export const Sofa = React.memo(({ color }: { color: any }) => (
  <group>
    {/* Floor Rug */}
    <Box args={[2.4, 0.01, 1.4]} position={[0, 0.005, 0.2]} receiveShadow>
      <meshStandardMaterial color="#334155" roughness={0.9} />
    </Box>
    {/* Sofa Frame & Cushions */}
    <Box args={[2.0, 0.2, 0.8]} position={[0, 0.1, 0]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.9, 0.2, 0.6]} position={[-0.5, 0.3, 0.1]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.9, 0.2, 0.6]} position={[0.5, 0.3, 0.1]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[2.0, 0.6, 0.2]} position={[0, 0.5, -0.3]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.2, 0.5, 0.8]} position={[-0.9, 0.35, 0]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.2, 0.5, 0.8]} position={[0.9, 0.35, 0]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    {/* Throw Pillows */}
    <Box args={[0.3, 0.3, 0.1]} position={[-0.7, 0.45, -0.15]} rotation={[0, 0.2, 0.2]}><meshStandardMaterial color="#38bdf8" /></Box>
    <Box args={[0.3, 0.3, 0.1]} position={[0.7, 0.45, -0.15]} rotation={[0, -0.2, -0.2]}><meshStandardMaterial color="#38bdf8" /></Box>
  </group>
));
Sofa.displayName = 'Sofa';

export const TVUnit = React.memo(({ color }: { color: any }) => (
  <group>
    <Box args={[2.4, 0.4, 0.4]} position={[0, 0.2, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[1.8, 1.0, 0.05]} position={[0, 1.2, -0.1]} castShadow><meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} /></Box>
    {/* Soundbar */}
    <Box args={[1.2, 0.08, 0.1]} position={[0, 0.44, 0.05]}><meshStandardMaterial color="#1e293b" /></Box>
  </group>
));
TVUnit.displayName = 'TVUnit';

export const Bed = React.memo(({ color }: { color: any }) => (
  <group>
    {/* Bedroom Rug */}
    <Box args={[2.2, 0.01, 2.5]} position={[0, 0.005, 0.2]} receiveShadow>
      <meshStandardMaterial color="#475569" roughness={0.8} />
    </Box>
    {/* Bed Frame & Mattress */}
    <Box args={[1.8, 0.3, 2.1]} position={[0, 0.15, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[1.7, 0.2, 2.0]} position={[0, 0.4, 0]} castShadow><meshStandardMaterial color="#f8fafc" /></Box>
    <Box args={[1.8, 1.0, 0.1]} position={[0, 0.5, -1.0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[0.6, 0.1, 0.3]} position={[-0.4, 0.55, -0.7]} castShadow><meshStandardMaterial color="#e2e8f0" /></Box>
    <Box args={[0.6, 0.1, 0.3]} position={[0.4, 0.55, -0.7]} castShadow><meshStandardMaterial color="#e2e8f0" /></Box>
    {/* Nightstands & Lamps */}
    <Box args={[0.4, 0.4, 0.4]} position={[-1.2, 0.2, -0.8]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[0.4, 0.4, 0.4]} position={[1.2, 0.2, -0.8]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Cone args={[0.15, 0.3, 8]} position={[-1.2, 0.55, -0.8]}><meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.5} /></Cone>
    <Cone args={[0.15, 0.3, 8]} position={[1.2, 0.55, -0.8]}><meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.5} /></Cone>
  </group>
));
Bed.displayName = 'Bed';

export const DiningSet = React.memo(({ color }: { color: any }) => (
  <group>
    {/* Table Top */}
    <Box args={[1.6, 0.05, 1.0]} position={[0, 0.75, 0]} castShadow><meshStandardMaterial color={color.wood} roughness={0.2} /></Box>
    {/* Legs */}
    <Box args={[0.06, 0.75, 0.06]} position={[-0.7, 0.375, -0.4]} castShadow><meshStandardMaterial color={color.metal} metalness={0.8} /></Box>
    <Box args={[0.06, 0.75, 0.06]} position={[0.7, 0.375, -0.4]} castShadow><meshStandardMaterial color={color.metal} metalness={0.8} /></Box>
    <Box args={[0.06, 0.75, 0.06]} position={[-0.7, 0.375, 0.4]} castShadow><meshStandardMaterial color={color.metal} metalness={0.8} /></Box>
    <Box args={[0.06, 0.75, 0.06]} position={[0.7, 0.375, 0.4]} castShadow><meshStandardMaterial color={color.metal} metalness={0.8} /></Box>
    {/* Chairs */}
    {[[-0.4, -0.6], [0.4, -0.6], [-0.4, 0.6], [0.4, 0.6]].map((pos, i) => (
      <group key={i} position={[pos[0], 0, pos[1]]}>
        <Box args={[0.4, 0.45, 0.4]} position={[0, 0.225, 0]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
        <Box args={[0.4, 0.4, 0.05]} position={[0, 0.65, pos[1] > 0 ? 0.175 : -0.175]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
      </group>
    ))}
    {/* Centerpiece Vase */}
    <Cylinder args={[0.08, 0.05, 0.2, 8]} position={[0, 0.875, 0]}><meshStandardMaterial color="#38bdf8" /></Cylinder>
  </group>
));
DiningSet.displayName = 'DiningSet';

export const KitchenSet = React.memo(({ color }: { color: any }) => (
  <group>
    <Box args={[2.5, 0.9, 0.6]} position={[0, 0.45, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[2.5, 0.6, 0.3]} position={[0, 1.8, -0.15]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[0.8, 1.8, 0.7]} position={[1.65, 0.9, 0.05]} castShadow><meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} /></Box>
    <Box args={[0.6, 0.02, 0.4]} position={[-0.5, 0.91, 0]} castShadow><meshStandardMaterial color="#111111" /></Box>
    <Box args={[0.5, 0.02, 0.4]} position={[0.5, 0.91, 0]} castShadow><meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} /></Box>
  </group>
));
KitchenSet.displayName = 'KitchenSet';

export const BathroomSet = React.memo(({ color }: { color: any }) => (
  <group>
    {/* Glass Shower Enclosure */}
    <Box args={[1.0, 1.8, 1.0]} position={[-0.5, 0.9, 0]}>
      <meshStandardMaterial color="#e0f2fe" transparent opacity={0.3} roughness={0.1} />
    </Box>
    <Box args={[0.6, 0.8, 0.5]} position={[0.6, 0.4, -0.25]} castShadow><meshStandardMaterial color="#ffffff" /></Box>
    <Box args={[0.4, 0.4, 0.6]} position={[0.6, 0.2, 0.5]} castShadow><meshStandardMaterial color="#ffffff" /></Box>
    <Box args={[0.4, 0.5, 0.2]} position={[0.6, 0.65, 0.3]} castShadow><meshStandardMaterial color="#ffffff" /></Box>
  </group>
));
BathroomSet.displayName = 'BathroomSet';

export const Wardrobe = React.memo(({ color }: { color: any }) => (
  <group>
    <Box args={[1.2, 2.2, 0.6]} position={[0, 1.1, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    {/* Handles */}
    <Box args={[0.02, 0.3, 0.04]} position={[-0.05, 1.1, 0.32]}><meshStandardMaterial color={color.metal} metalness={0.9} /></Box>
    <Box args={[0.02, 0.3, 0.04]} position={[0.05, 1.1, 0.32]}><meshStandardMaterial color={color.metal} metalness={0.9} /></Box>
  </group>
));
Wardrobe.displayName = 'Wardrobe';

export const StudySet = React.memo(({ color }: { color: any }) => (
  <group>
    <Box args={[1.4, 0.05, 0.6]} position={[0, 0.75, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[0.05, 0.75, 0.5]} position={[-0.65, 0.375, 0]} castShadow><meshStandardMaterial color={color.metal} /></Box>
    <Box args={[0.05, 0.75, 0.5]} position={[0.65, 0.375, 0]} castShadow><meshStandardMaterial color={color.metal} /></Box>
    <Box args={[0.4, 0.45, 0.4]} position={[0, 0.225, 0.4]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.4, 0.4, 0.05]} position={[0, 0.65, 0.575]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.3, 0.02, 0.2]} position={[0, 0.78, 0]} castShadow><meshStandardMaterial color="#cbd5e1" /></Box>
    <Box args={[0.3, 0.2, 0.02]} position={[0, 0.88, -0.1]} castShadow><meshStandardMaterial color="#111111" /></Box>
  </group>
));
StudySet.displayName = 'StudySet';

export const PoojaSet = React.memo(({ color }: { color: any }) => (
  <group>
    <Box args={[1.0, 0.4, 0.6]} position={[0, 0.2, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[0.8, 1.0, 0.4]} position={[0, 0.9, -0.1]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Cone args={[0.4, 0.4, 4]} position={[0, 1.6, -0.1]} castShadow><meshStandardMaterial color={color.frame} /></Cone>
    <Box args={[0.8, 0.02, 0.8]} position={[0, 0.01, 0.7]} receiveShadow><meshStandardMaterial color="#ef4444" /></Box>
  </group>
));
PoojaSet.displayName = 'PoojaSet';

// Architectural 3D Staircase for floor-to-floor pin-to-pin connection
export const Staircase = React.memo(({ height, color }: { height: number; color: any }) => {
  const steps = 10;
  const stepWidth = 0.8;
  const stepDepth = 0.18;
  const stepHeight = height / steps;

  return (
    <group>
      {Array.from({ length: steps }).map((_, i) => (
        <group key={i} position={[0, i * stepHeight + stepHeight / 2, i * stepDepth]}>
          {/* Step Tread */}
          <Box args={[stepWidth, stepHeight * 0.8, stepDepth * 1.1]} castShadow receiveShadow>
            <meshStandardMaterial color={color.wood} roughness={0.3} />
          </Box>
        </group>
      ))}
      {/* Stainless Steel Handrail */}
      <Cylinder args={[0.02, 0.02, Math.sqrt(height * height + (steps * stepDepth) * (steps * stepDepth))]} position={[stepWidth / 2 + 0.02, height / 2 + 0.4, (steps * stepDepth) / 2]} rotation={[Math.atan2(height, steps * stepDepth), 0, 0]}>
        <meshStandardMaterial color={color.metal} metalness={0.9} roughness={0.1} />
      </Cylinder>
    </group>
  );
});
Staircase.displayName = 'Staircase';

// Realistic 3D Tree with multi-tier foliage
export const RealTree = React.memo(({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Bark Trunk */}
    <Cylinder args={[0.08, 0.15, 1.8, 8]} position={[0, 0.9, 0]} castShadow>
      <meshStandardMaterial color="#451a03" roughness={0.9} />
    </Cylinder>
    {/* Tier 1 Canopy */}
    <Cone args={[1.1, 1.4, 8]} position={[0, 2.1, 0]} castShadow>
      <meshStandardMaterial color="#15803d" roughness={0.6} />
    </Cone>
    {/* Tier 2 Canopy */}
    <Cone args={[0.9, 1.2, 8]} position={[0, 2.7, 0]} castShadow>
      <meshStandardMaterial color="#16a34a" roughness={0.5} />
    </Cone>
    {/* Tier 3 Top Canopy */}
    <Cone args={[0.6, 0.9, 8]} position={[0, 3.2, 0]} castShadow>
      <meshStandardMaterial color="#22c55e" roughness={0.4} />
    </Cone>
  </group>
));
RealTree.displayName = 'RealTree';

// Detailed 3D SUV / Sedan for Parking
export const DrivewayCar = React.memo(({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Main Body */}
    <Box args={[1.4, 0.5, 2.4]} position={[0, 0.35, 0]} castShadow>
      <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
    </Box>
    {/* Cabin & Roof */}
    <Box args={[1.2, 0.45, 1.4]} position={[0, 0.8, -0.1]} castShadow>
      <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
    </Box>
    {/* Windshield & Windows */}
    <Box args={[1.15, 0.4, 1.35]} position={[0, 0.81, -0.1]}>
      <meshStandardMaterial color="#38bdf8" transparent opacity={0.6} metalness={0.8} />
    </Box>
    {/* Headlights */}
    <Box args={[0.3, 0.1, 0.05]} position={[-0.45, 0.4, 1.2]}>
      <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={1} />
    </Box>
    <Box args={[0.3, 0.1, 0.05]} position={[0.45, 0.4, 1.2]}>
      <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={1} />
    </Box>
    {/* Wheels */}
    {[[-0.7, 0.2, 0.7], [0.7, 0.2, 0.7], [-0.7, 0.2, -0.7], [0.7, 0.2, -0.7]].map((pos, i) => (
      <Cylinder key={i} args={[0.2, 0.2, 0.1, 16]} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <meshStandardMaterial color="#000000" roughness={0.9} />
      </Cylinder>
    ))}
  </group>
));
// Modern Exterior Up/Down LED Sconce Wall Spotlight
export const ExteriorSconceLight = React.memo(({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) => (
  <group position={position} rotation={rotation}>
    {/* Black Metal Cylinder Fixture */}
    <Cylinder args={[0.04, 0.04, 0.16, 8]} position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.1} />
    </Cylinder>
    {/* Wall Mount Plate */}
    <Box args={[0.08, 0.14, 0.02]} position={[0, 0, 0.01]}>
      <meshStandardMaterial color="#09090b" metalness={0.8} />
    </Box>
    {/* Up Beam Emissive Lens */}
    <Cylinder args={[0.035, 0.035, 0.01, 8]} position={[0, 0.085, 0.03]}>
      <meshStandardMaterial color="#ffb703" emissive="#ffb703" emissiveIntensity={2.5} />
    </Cylinder>
    {/* Down Beam Emissive Lens */}
    <Cylinder args={[0.035, 0.035, 0.01, 8]} position={[0, -0.085, 0.03]}>
      <meshStandardMaterial color="#ffb703" emissive="#ffb703" emissiveIntensity={2.5} />
    </Cylinder>
    {/* Warm Glow Point Light */}
    <pointLight position={[0, 0, 0.1]} intensity={0.8} distance={2.5} color="#ffb703" />
  </group>
));
ExteriorSconceLight.displayName = 'ExteriorSconceLight';

// Entrance Ceramic Planter with Shrubs
export const PottedPlant = React.memo(({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Dark Ceramic Pot */}
    <Cylinder args={[0.2, 0.14, 0.35, 12]} position={[0, 0.175, 0]} castShadow>
      <meshStandardMaterial color="#1e293b" roughness={0.3} />
    </Cylinder>
    {/* Soil */}
    <Cylinder args={[0.18, 0.18, 0.02, 12]} position={[0, 0.34, 0]}>
      <meshStandardMaterial color="#271c19" roughness={0.9} />
    </Cylinder>
    {/* Foliage Spheres */}
    <Cone args={[0.28, 0.5, 8]} position={[0, 0.55, 0]} castShadow>
      <meshStandardMaterial color="#15803d" roughness={0.6} />
    </Cone>
    <Cone args={[0.22, 0.4, 8]} position={[0, 0.8, 0]} castShadow>
      <meshStandardMaterial color="#22c55e" roughness={0.5} />
    </Cone>
  </group>
));
PottedPlant.displayName = 'PottedPlant';

// Entrance Porch Steps
export const PorchSteps = React.memo(({ width, position }: { width: number; position: [number, number, number] }) => (
  <group position={position}>
    <Box args={[width, 0.08, 0.4]} position={[0, 0.04, 0.4]} receiveShadow>
      <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
    </Box>
    <Box args={[width, 0.08, 0.8]} position={[0, -0.04, 0.2]} receiveShadow>
      <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
    </Box>
    <Box args={[width, 0.08, 1.2]} position={[0, -0.12, 0]} receiveShadow>
      <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
    </Box>
  </group>
));
PorchSteps.displayName = 'PorchSteps';

// Outdoor Wooden Deck Patio Armchairs & Coffee Table (matching reference image media_1790703281229.jpg)
export const PatioSet = React.memo(({ color }: { color: any }) => (
  <group>
    {/* Outdoor Patio Coffee Table */}
    <Cylinder args={[0.25, 0.25, 0.25, 12]} position={[0, 0.125, 0]} castShadow>
      <meshStandardMaterial color="#0f172a" roughness={0.2} />
    </Cylinder>
    {/* Patio Chair 1 */}
    <group position={[-0.55, 0, 0]}>
      <Box args={[0.45, 0.2, 0.45]} position={[0, 0.1, 0]} castShadow><meshStandardMaterial color="#cbd5e1" /></Box>
      <Box args={[0.45, 0.35, 0.06]} position={[0, 0.3, -0.2]} castShadow><meshStandardMaterial color={color.wood} /></Box>
      <Box args={[0.06, 0.35, 0.45]} position={[-0.2, 0.3, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    </group>
    {/* Patio Chair 2 */}
    <group position={[0.55, 0, 0]}>
      <Box args={[0.45, 0.2, 0.45]} position={[0, 0.1, 0]} castShadow><meshStandardMaterial color="#cbd5e1" /></Box>
      <Box args={[0.45, 0.35, 0.06]} position={[0, 0.3, -0.2]} castShadow><meshStandardMaterial color={color.wood} /></Box>
      <Box args={[0.06, 0.35, 0.45]} position={[0.2, 0.3, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    </group>
  </group>
));
PatioSet.displayName = 'PatioSet';

// Glass Sliding Patio Doors
export const SlidingGlassDoors = React.memo(({ width, height }: { width: number; height: number }) => (
  <group>
    {/* Door Frame Surround */}
    <Box args={[width, height, 0.06]} position={[0, height / 2, 0]}>
      <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
    </Box>
    {/* Left Sliding Glass Pane */}
    <Box args={[width * 0.48, height * 0.92, 0.02]} position={[-width * 0.24, height / 2, -0.01]}>
      <meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} roughness={0.1} />
    </Box>
    {/* Right Sliding Glass Pane */}
    <Box args={[width * 0.48, height * 0.92, 0.02]} position={[width * 0.24, height / 2, 0.01]}>
      <meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} roughness={0.1} />
    </Box>
    {/* Handles */}
    <Box args={[0.02, 0.3, 0.04]} position={[-0.04, height / 2, 0.02]}><meshStandardMaterial color="#cbd5e1" metalness={0.9} /></Box>
    <Box args={[0.02, 0.3, 0.04]} position={[0.04, height / 2, -0.02]}><meshStandardMaterial color="#cbd5e1" metalness={0.9} /></Box>
  </group>
));
SlidingGlassDoors.displayName = 'SlidingGlassDoors';

// Garden Perimeter Shrubs & Lavender/Purple Flower Clusters
export const GardenFlowers = React.memo(({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Green Shrub Base */}
    <Box args={[0.8, 0.25, 0.4]} position={[0, 0.125, 0]} castShadow>
      <meshStandardMaterial color="#15803d" roughness={0.7} />
    </Box>
    {/* Purple/Lavender Flower Cones */}
    {[-0.25, 0, 0.25].map((x, i) => (
      <Cone key={i} args={[0.1, 0.25, 6]} position={[x, 0.35, (i % 2 === 0 ? 0.05 : -0.05)]} castShadow>
        <meshStandardMaterial color={i % 2 === 0 ? '#8b5cf6' : '#c084fc'} roughness={0.5} />
      </Cone>
    ))}
  </group>
));
GardenFlowers.displayName = 'GardenFlowers';


