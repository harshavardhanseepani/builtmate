import React from 'react';
import { Box, Cylinder, Cone } from '@react-three/drei';

export const Sofa = ({ color }: { color: any }) => (
  <group>
    <Box args={[2.0, 0.2, 0.8]} position={[0, 0.1, 0]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.9, 0.2, 0.6]} position={[-0.5, 0.3, 0.1]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.9, 0.2, 0.6]} position={[0.5, 0.3, 0.1]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[2.0, 0.6, 0.2]} position={[0, 0.5, -0.3]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.2, 0.5, 0.8]} position={[-0.9, 0.35, 0]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.2, 0.5, 0.8]} position={[0.9, 0.35, 0]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
  </group>
);

export const TVUnit = ({ color }: { color: any }) => (
  <group>
    <Box args={[2.4, 0.4, 0.4]} position={[0, 0.2, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[1.8, 1.0, 0.05]} position={[0, 1.2, -0.1]} castShadow><meshStandardMaterial color="#111111" /></Box>
  </group>
);

export const Bed = ({ color }: { color: any }) => (
  <group>
    <Box args={[1.8, 0.3, 2.1]} position={[0, 0.15, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[1.7, 0.2, 2.0]} position={[0, 0.4, 0]} castShadow><meshStandardMaterial color="#ffffff" /></Box>
    <Box args={[1.8, 1.0, 0.1]} position={[0, 0.5, -1.0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[0.6, 0.1, 0.3]} position={[-0.4, 0.55, -0.7]} castShadow><meshStandardMaterial color="#e2e8f0" /></Box>
    <Box args={[0.6, 0.1, 0.3]} position={[0.4, 0.55, -0.7]} castShadow><meshStandardMaterial color="#e2e8f0" /></Box>
  </group>
);

export const DiningSet = ({ color }: { color: any }) => (
  <group>
    <Box args={[1.6, 0.05, 1.0]} position={[0, 0.75, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[0.05, 0.75, 0.05]} position={[-0.7, 0.375, -0.4]} castShadow><meshStandardMaterial color={color.metal} /></Box>
    <Box args={[0.05, 0.75, 0.05]} position={[0.7, 0.375, -0.4]} castShadow><meshStandardMaterial color={color.metal} /></Box>
    <Box args={[0.05, 0.75, 0.05]} position={[-0.7, 0.375, 0.4]} castShadow><meshStandardMaterial color={color.metal} /></Box>
    <Box args={[0.05, 0.75, 0.05]} position={[0.7, 0.375, 0.4]} castShadow><meshStandardMaterial color={color.metal} /></Box>
    {[[-0.4, -0.6], [0.4, -0.6], [-0.4, 0.6], [0.4, 0.6]].map((pos, i) => (
      <group key={i} position={[pos[0], 0, pos[1]]}>
        <Box args={[0.4, 0.45, 0.4]} position={[0, 0.225, 0]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
        <Box args={[0.4, 0.4, 0.05]} position={[0, 0.65, pos[1] > 0 ? 0.175 : -0.175]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
      </group>
    ))}
  </group>
);

export const KitchenSet = ({ color }: { color: any }) => (
  <group>
    <Box args={[2.5, 0.9, 0.6]} position={[0, 0.45, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[2.5, 0.6, 0.3]} position={[0, 1.8, -0.15]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[0.8, 1.8, 0.7]} position={[1.65, 0.9, 0.05]} castShadow><meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} /></Box>
    <Box args={[0.6, 0.02, 0.4]} position={[-0.5, 0.91, 0]} castShadow><meshStandardMaterial color="#111111" /></Box>
    <Box args={[0.5, 0.02, 0.4]} position={[0.5, 0.91, 0]} castShadow><meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} /></Box>
  </group>
);

export const BathroomSet = ({ color }: { color: any }) => (
  <group>
    {/* Shower Glass */}
    <Box args={[1.0, 2.0, 1.0]} position={[-0.5, 1.0, 0]}>
      <meshPhysicalMaterial color="#e0f2fe" transmission={0.9} opacity={1} roughness={0.1} ior={1.5} thickness={0.5} />
    </Box>
    <Box args={[0.6, 0.8, 0.5]} position={[0.6, 0.4, -0.25]} castShadow><meshStandardMaterial color="#ffffff" /></Box>
    <Box args={[0.4, 0.4, 0.6]} position={[0.6, 0.2, 0.5]} castShadow><meshStandardMaterial color="#ffffff" /></Box>
    <Box args={[0.4, 0.5, 0.2]} position={[0.6, 0.65, 0.3]} castShadow><meshStandardMaterial color="#ffffff" /></Box>
  </group>
);

export const Wardrobe = ({ color }: { color: any }) => (
  <Box args={[1.2, 2.2, 0.6]} position={[0, 1.1, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
);

export const StudySet = ({ color }: { color: any }) => (
  <group>
    {/* Desk */}
    <Box args={[1.4, 0.05, 0.6]} position={[0, 0.75, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Box args={[0.05, 0.75, 0.5]} position={[-0.65, 0.375, 0]} castShadow><meshStandardMaterial color={color.metal} /></Box>
    <Box args={[0.05, 0.75, 0.5]} position={[0.65, 0.375, 0]} castShadow><meshStandardMaterial color={color.metal} /></Box>
    {/* Chair */}
    <Box args={[0.4, 0.45, 0.4]} position={[0, 0.225, 0.4]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    <Box args={[0.4, 0.4, 0.05]} position={[0, 0.65, 0.575]} castShadow><meshStandardMaterial color={color.fabric} /></Box>
    {/* Laptop */}
    <Box args={[0.3, 0.02, 0.2]} position={[0, 0.78, 0]} castShadow><meshStandardMaterial color="#cbd5e1" /></Box>
    <Box args={[0.3, 0.2, 0.02]} position={[0, 0.88, -0.1]} castShadow><meshStandardMaterial color="#111111" /></Box>
  </group>
);

export const PoojaSet = ({ color }: { color: any }) => (
  <group>
    {/* Base Cabinet */}
    <Box args={[1.0, 0.4, 0.6]} position={[0, 0.2, 0]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    {/* Mandir Structure */}
    <Box args={[0.8, 1.0, 0.4]} position={[0, 0.9, -0.1]} castShadow><meshStandardMaterial color={color.wood} /></Box>
    <Cone args={[0.4, 0.4, 4]} position={[0, 1.6, -0.1]} castShadow><meshStandardMaterial color={color.frame} /></Cone>
    {/* Small Rug */}
    <Box args={[0.8, 0.02, 0.8]} position={[0, 0.01, 0.7]} receiveShadow><meshStandardMaterial color="#ef4444" /></Box>
  </group>
);
