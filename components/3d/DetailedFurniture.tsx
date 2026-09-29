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

