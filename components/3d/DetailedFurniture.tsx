import React, { useMemo } from 'react';
import { Box, Cylinder, Cone, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { 
  getWoodParquetTexture, 
  getTerrazzoTexture, 
  getFlagstonePathTexture, 
  getWovenRugTexture, 
  getStripedRunnerTexture 
} from './RealisticMaterials';

// ==========================================
// 1. LIVING ROOM FURNITURE (Reference Image 1)
// ==========================================

export const Sofa = React.memo(({ color }: { color?: any }) => {
  const rugTexture = useMemo(() => getWovenRugTexture(2, 2), []);
  const tealVelvet = '#0e7490'; // Deep peacock teal from Image 1
  const terracotta = '#c2410c'; // Burnt orange from Image 1
  const ochreYellow = '#d97706'; // Mustard accent from Image 1

  return (
    <group>
      {/* 1. Neutral Woven Area Rug */}
      <Box args={[2.5, 0.015, 2.0]} position={[0.2, 0.008, 0.3]} receiveShadow>
        <meshStandardMaterial map={rugTexture} roughness={0.9} />
      </Box>

      {/* 2. Main L-Shaped Sectional Sofa */}
      <Box args={[2.1, 0.16, 0.85]} position={[-0.1, 0.1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.6} />
      </Box>
      <Box args={[0.85, 0.16, 1.15]} position={[-0.725, 0.1, 0.85]} castShadow receiveShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.6} />
      </Box>

      {/* Seat Cushions */}
      <Box args={[0.68, 0.14, 0.78]} position={[0.6, 0.24, 0]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.55} />
      </Box>
      <Box args={[0.68, 0.14, 0.78]} position={[-0.1, 0.24, 0]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.55} />
      </Box>
      <Box args={[0.8, 0.14, 0.82]} position={[-0.725, 0.24, 0]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.55} />
      </Box>
      <Box args={[0.8, 0.14, 1.1]} position={[-0.725, 0.24, 0.85]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.55} />
      </Box>

      {/* Backrest Cushions */}
      <Box args={[2.1, 0.45, 0.18]} position={[-0.1, 0.42, -0.38]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.6} />
      </Box>
      <Box args={[0.18, 0.45, 1.4]} position={[-1.12, 0.42, 0.42]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.6} />
      </Box>
      <Box args={[0.2, 0.35, 0.85]} position={[0.95, 0.3, 0]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.6} />
      </Box>

      {/* Throw Pillows in Terracotta, Ochre & Cream */}
      <Box args={[0.32, 0.3, 0.1]} position={[-0.92, 0.38, -0.22]} rotation={[0, 0.4, 0.15]} castShadow>
        <meshStandardMaterial color={terracotta} roughness={0.5} />
      </Box>
      <Box args={[0.28, 0.28, 0.08]} position={[-0.95, 0.35, 0.2]} rotation={[0, 0.8, -0.1]} castShadow>
        <meshStandardMaterial color={ochreYellow} roughness={0.5} />
      </Box>
      <Box args={[0.3, 0.28, 0.08]} position={[0.5, 0.36, -0.25]} rotation={[0, -0.2, 0]} castShadow>
        <meshStandardMaterial color={terracotta} roughness={0.5} />
      </Box>
      <Box args={[0.26, 0.26, 0.08]} position={[0.8, 0.34, -0.2]} rotation={[0, -0.5, 0.1]} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </Box>

      {/* 3. Natural Oak Scandinavian Coffee Table */}
      <group position={[0.25, 0, 0.4]}>
        <Box args={[0.85, 0.035, 0.48]} position={[0, 0.22, 0]} castShadow>
          <meshStandardMaterial color="#c28b57" roughness={0.35} />
        </Box>
        {[[-0.38, -0.2], [0.38, -0.2], [-0.38, 0.2], [0.38, 0.2]].map((p, i) => (
          <Cylinder key={i} args={[0.018, 0.012, 0.21, 8]} position={[p[0], 0.105, p[1]]} castShadow>
            <meshStandardMaterial color="#8a5327" roughness={0.4} />
          </Cylinder>
        ))}
        <Box args={[0.22, 0.02, 0.16]} position={[-0.15, 0.25, 0]} rotation={[0, 0.15, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.2, 0.02, 0.14]} position={[-0.15, 0.27, 0]} rotation={[0, -0.1, 0]}>
          <meshStandardMaterial color="#1e293b" />
        </Box>
        <Cylinder args={[0.05, 0.04, 0.06, 12]} position={[0.2, 0.26, 0]}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </Cylinder>
        <Sphere args={[0.045, 8, 8]} position={[0.2, 0.31, 0]}>
          <meshStandardMaterial color="#166534" roughness={0.8} />
        </Sphere>
      </group>

      {/* 4. Arched Floor Lamp */}
      <group position={[1.1, 0, 0.9]}>
        <Cylinder args={[0.15, 0.15, 0.025, 16]} position={[0, 0.012, 0]}>
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Cylinder args={[0.012, 0.012, 1.45, 8]} position={[0, 0.73, 0]}>
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
        </Cylinder>
        <Cylinder args={[0.012, 0.012, 0.35, 8]} position={[-0.12, 1.48, 0]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
        </Cylinder>
        <Sphere args={[0.1, 16, 16]} position={[-0.24, 1.4, 0]}>
          <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={0.6} roughness={0.1} />
        </Sphere>
      </group>
    </group>
  );
});
Sofa.displayName = 'Sofa';

export const TVUnit = React.memo(({ color }: { color?: any }) => (
  <group>
    <Box args={[1.9, 0.32, 0.35]} position={[0, 0.16, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#292524" roughness={0.4} />
    </Box>
    <Box args={[1.86, 0.02, 0.36]} position={[0, 0.31, 0]}>
      <meshStandardMaterial color="#44403c" roughness={0.3} />
    </Box>
    <Box args={[0.9, 0.05, 0.07]} position={[0, 0.34, 0.08]}>
      <meshStandardMaterial color="#0f172a" roughness={0.5} />
    </Box>
    <Box args={[0.4, 0.015, 0.2]} position={[0, 0.33, -0.05]}>
      <meshStandardMaterial color="#1e293b" metalness={0.8} />
    </Box>
    <Cylinder args={[0.015, 0.015, 0.12, 8]} position={[0, 0.4, -0.05]}>
      <meshStandardMaterial color="#0f172a" metalness={0.9} />
    </Cylinder>
    <Box args={[1.35, 0.78, 0.03]} position={[0, 0.85, -0.05]} castShadow>
      <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
    </Box>
    <Box args={[1.31, 0.74, 0.01]} position={[0, 0.85, -0.03]}>
      <meshStandardMaterial color="#1e293b" emissive="#0284c7" emissiveIntensity={0.2} roughness={0.2} />
    </Box>
  </group>
));
TVUnit.displayName = 'TVUnit';

// ==========================================
// 2. DINING AREA (Reference Image 1)
// ==========================================

export const DiningSet = React.memo(({ color }: { color?: any }) => {
  const runnerTexture = useMemo(() => getStripedRunnerTexture(), []);
  const ochreYellow = '#ca8a04';

  return (
    <group>
      <Box args={[1.75, 0.05, 0.92]} position={[0, 0.74, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#a16207" roughness={0.3} />
      </Box>
      {[[-0.72, -0.36], [0.72, -0.36], [-0.72, 0.36], [0.72, 0.36]].map((p, i) => (
        <Box key={i} args={[0.055, 0.72, 0.055]} position={[p[0], 0.36, p[1]]} castShadow>
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </Box>
      ))}

      <Box args={[1.77, 0.005, 0.32]} position={[0, 0.768, 0]}>
        <meshStandardMaterial map={runnerTexture} roughness={0.8} />
      </Box>

      {/* Centerpiece Fruit Bowl */}
      <group position={[0, 0.77, 0]}>
        <Cylinder args={[0.14, 0.08, 0.06, 16]} position={[0, 0.03, 0]}>
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </Cylinder>
        <Sphere args={[0.035, 8, 8]} position={[-0.04, 0.07, 0.02]}><meshStandardMaterial color="#dc2626" roughness={0.3} /></Sphere>
        <Sphere args={[0.035, 8, 8]} position={[0.04, 0.07, -0.02]}><meshStandardMaterial color="#ea580c" roughness={0.3} /></Sphere>
        <Cylinder args={[0.018, 0.018, 0.08, 8]} position={[0, 0.075, 0.03]} rotation={[0.4, 0.2, 1.2]}><meshStandardMaterial color="#eab308" roughness={0.4} /></Cylinder>
        <Sphere args={[0.028, 8, 8]} position={[0.02, 0.085, -0.01]}><meshStandardMaterial color="#16a34a" roughness={0.3} /></Sphere>
      </group>

      {/* 6 Curved Ochre Yellow Dining Chairs */}
      {[-0.52, 0, 0.52].map((x, i) => (
        <group key={`front_${i}`} position={[x, 0, 0.65]}>
          <Box args={[0.36, 0.06, 0.35]} position={[0, 0.44, 0]} castShadow>
            <meshStandardMaterial color={ochreYellow} roughness={0.5} />
          </Box>
          <Box args={[0.36, 0.32, 0.05]} position={[0, 0.62, 0.15]} rotation={[-0.15, 0, 0]} castShadow>
            <meshStandardMaterial color={ochreYellow} roughness={0.5} />
          </Box>
          {[[-0.14, -0.13], [0.14, -0.13], [-0.14, 0.13], [0.14, 0.13]].map((lp, li) => (
            <Cylinder key={li} args={[0.012, 0.008, 0.44, 6]} position={[lp[0], 0.22, lp[1]]} castShadow>
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </Cylinder>
          ))}
        </group>
      ))}

      {[-0.52, 0, 0.52].map((x, i) => (
        <group key={`back_${i}`} position={[x, 0, -0.65]}>
          <Box args={[0.36, 0.06, 0.35]} position={[0, 0.44, 0]} castShadow>
            <meshStandardMaterial color={ochreYellow} roughness={0.5} />
          </Box>
          <Box args={[0.36, 0.32, 0.05]} position={[0, 0.62, -0.15]} rotation={[0.15, 0, 0]} castShadow>
            <meshStandardMaterial color={ochreYellow} roughness={0.5} />
          </Box>
          {[[-0.14, -0.13], [0.14, -0.13], [-0.14, 0.13], [0.14, 0.13]].map((lp, li) => (
            <Cylinder key={li} args={[0.012, 0.008, 0.44, 6]} position={[lp[0], 0.22, lp[1]]} castShadow>
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </Cylinder>
          ))}
        </group>
      ))}
    </group>
  );
});
DiningSet.displayName = 'DiningSet';

// ==========================================
// 3. GOURMET OPEN KITCHEN (Reference Image 1)
// ==========================================

export const KitchenSet = React.memo(({ color }: { color?: any }) => (
  <group>
    <Box args={[2.5, 0.88, 0.65]} position={[0, 0.44, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#475569" roughness={0.4} />
    </Box>

    <Box args={[2.48, 0.015, 0.02]} position={[0, 0.58, 0.33]}><meshStandardMaterial color="#1e293b" /></Box>
    <Box args={[2.48, 0.015, 0.02]} position={[0, 0.28, 0.33]}><meshStandardMaterial color="#1e293b" /></Box>

    <Box args={[2.54, 0.04, 0.68]} position={[0, 0.9, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.1} />
    </Box>

    {/* Double Sink & Faucet */}
    <group position={[0.45, 0.92, 0]}>
      <Box args={[0.55, 0.01, 0.4]}>
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.02, 0.015, 0.38]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </Box>
      <Cylinder args={[0.012, 0.012, 0.18, 8]} position={[0, 0.1, -0.16]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </Cylinder>
      <Cylinder args={[0.01, 0.01, 0.1, 8]} position={[0, 0.18, -0.1]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </Cylinder>
    </group>

    {/* Induction Cooktop & Pots */}
    <group position={[-0.55, 0.92, 0]}>
      <Box args={[0.6, 0.01, 0.42]}>
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.8} />
      </Box>
      <Cylinder args={[0.09, 0.09, 0.1, 16]} position={[-0.14, 0.06, -0.08]} castShadow>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </Cylinder>
      <Cylinder args={[0.07, 0.07, 0.05, 16]} position={[0.14, 0.035, 0.08]} castShadow>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </Cylinder>
    </group>

    {/* Counter-Depth Refrigerator */}
    <group position={[1.65, 0.95, 0.02]}>
      <Box args={[0.72, 1.9, 0.68]} castShadow receiveShadow>
        <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
      </Box>
      <Box args={[0.01, 1.88, 0.02]} position={[0, 0, 0.345]}><meshStandardMaterial color="#64748b" /></Box>
    </group>
  </group>
));
KitchenSet.displayName = 'KitchenSet';

// ==========================================
// 4. MASTER BEDROOM (No Colliding Pillars)
// ==========================================

export const Bed = React.memo(({ color }: { color?: any }) => (
  <group>
    {/* 1. Oak Platform Bed Frame - Calibrated Standard 1.6m x 2.0m */}
    <Box args={[1.65, 0.22, 2.0]} position={[0, 0.11, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#8a5327" roughness={0.4} />
    </Box>

    {/* 2. Padded Grey Fabric Headboard */}
    <Box args={[1.72, 0.85, 0.1]} position={[0, 0.55, -0.98]} castShadow>
      <meshStandardMaterial color="#64748b" roughness={0.7} />
    </Box>

    {/* 3. Deep Mattress with Crisp Light-Grey Linen Sheets */}
    <Box args={[1.58, 0.22, 1.9]} position={[0, 0.31, 0.02]} castShadow>
      <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
    </Box>

    {/* 4. Folded Terracotta / Burnt Orange Waffle Duvet Runner from Image 1 */}
    <Box args={[1.6, 0.06, 0.95]} position={[0, 0.43, 0.45]} castShadow>
      <meshStandardMaterial color="#b45309" roughness={0.65} />
    </Box>

    {/* 5. Sleeping Pillows & Accent Cushions */}
    <Box args={[0.55, 0.12, 0.35]} position={[-0.4, 0.46, -0.68]} rotation={[0.2, 0, 0]} castShadow>
      <meshStandardMaterial color="#f8fafc" roughness={0.6} />
    </Box>
    <Box args={[0.55, 0.12, 0.35]} position={[0.4, 0.46, -0.68]} rotation={[0.2, 0, 0]} castShadow>
      <meshStandardMaterial color="#f8fafc" roughness={0.6} />
    </Box>
    <Box args={[0.32, 0.22, 0.08]} position={[-0.4, 0.52, -0.5]} rotation={[0.35, 0, 0]} castShadow>
      <meshStandardMaterial color="#c2410c" roughness={0.5} />
    </Box>

    {/* 6. Twin Floating Oak Nightstands with Mushroom Dome Lamps */}
    <group position={[-1.1, 0.2, -0.8]}>
      <Box args={[0.38, 0.2, 0.34]} castShadow>
        <meshStandardMaterial color="#a16207" roughness={0.4} />
      </Box>
      <Cylinder args={[0.012, 0.012, 0.16, 8]} position={[0, 0.16, 0]}>
        <meshStandardMaterial color="#d4af37" metalness={0.9} />
      </Cylinder>
      <Sphere args={[0.09, 16, 16]} position={[0, 0.26, 0]}>
        <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={0.5} roughness={0.2} />
      </Sphere>
    </group>

    <group position={[1.1, 0.2, -0.8]}>
      <Box args={[0.38, 0.2, 0.34]} castShadow>
        <meshStandardMaterial color="#a16207" roughness={0.4} />
      </Box>
      <Cylinder args={[0.012, 0.012, 0.16, 8]} position={[0, 0.16, 0]}>
        <meshStandardMaterial color="#d4af37" metalness={0.9} />
      </Cylinder>
      <Sphere args={[0.09, 16, 16]} position={[0, 0.26, 0]}>
        <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={0.5} roughness={0.2} />
      </Sphere>
    </group>
  </group>
));
Bed.displayName = 'Bed';

export const Wardrobe = React.memo(({ color }: { color?: any }) => (
  <group>
    <Box args={[1.35, 1.4, 0.42]} position={[0, 0.7, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
    </Box>
    <Box args={[1.28, 1.32, 0.4]} position={[0, 0.7, 0.02]}>
      <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
    </Box>
    <Box args={[1.28, 0.03, 0.38]} position={[0, 1.1, 0.02]}>
      <meshStandardMaterial color="#cbd5e1" />
    </Box>
    <Cylinder args={[0.012, 0.012, 1.25, 8]} position={[0, 1.02, 0.02]} rotation={[0, 0, Math.PI / 2]}>
      <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
    </Cylinder>

    {[-0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45].map((x, i) => {
      const shirtColors = ['#1e293b', '#c2410c', '#f8fafc', '#3b82f6', '#475569', '#ca8a04', '#0f766e'];
      return (
        <group key={i} position={[x, 0.75, 0.02]}>
          <Box args={[0.09, 0.4, 0.24]} castShadow>
            <meshStandardMaterial color={shirtColors[i % shirtColors.length]} roughness={0.7} />
          </Box>
        </group>
      );
    })}

    <Box args={[1.28, 0.03, 0.38]} position={[0, 0.25, 0.02]}><meshStandardMaterial color="#cbd5e1" /></Box>
  </group>
));
Wardrobe.displayName = 'Wardrobe';

export const StudySet = React.memo(({ color }: { color?: any }) => (
  <group>
    <Box args={[1.05, 0.04, 0.52]} position={[0, 0.72, 0]} castShadow>
      <meshStandardMaterial color="#a16207" roughness={0.35} />
    </Box>
    <Box args={[0.3, 0.68, 0.48]} position={[0.36, 0.35, 0]} castShadow>
      <meshStandardMaterial color="#78350f" roughness={0.4} />
    </Box>
    <Box args={[0.04, 0.7, 0.48]} position={[-0.48, 0.35, 0]}>
      <meshStandardMaterial color="#1e293b" metalness={0.8} />
    </Box>

    {/* Laptop */}
    <group position={[-0.1, 0.74, 0]}>
      <Box args={[0.26, 0.008, 0.18]}><meshStandardMaterial color="#94a3b8" metalness={0.9} /></Box>
      <Box args={[0.26, 0.18, 0.008]} position={[0, 0.09, -0.09]} rotation={[-0.2, 0, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.1} />
      </Box>
      <Box args={[0.24, 0.16, 0.002]} position={[0, 0.09, -0.084]} rotation={[-0.2, 0, 0]}>
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.3} />
      </Box>
    </group>

    {/* Cognac Leather Armchair */}
    <group position={[-0.1, 0, 0.46]}>
      <Cylinder args={[0.02, 0.02, 0.35, 8]} position={[0, 0.18, 0]}><meshStandardMaterial color="#1e293b" metalness={0.9} /></Cylinder>
      <Box args={[0.4, 0.08, 0.38]} position={[0, 0.42, 0]} castShadow>
        <meshStandardMaterial color="#9a3412" roughness={0.5} />
      </Box>
      <Box args={[0.4, 0.42, 0.07]} position={[0, 0.64, 0.16]} rotation={[-0.1, 0, 0]} castShadow>
        <meshStandardMaterial color="#9a3412" roughness={0.5} />
      </Box>
    </group>
  </group>
));
StudySet.displayName = 'StudySet';

// ==========================================
// 5. BATHROOM FIXTURES
// ==========================================

export const BathroomSet = React.memo(({ color }: { color?: any }) => (
  <group>
    {/* Wall-Hung Toilet */}
    <group position={[-0.45, 0, -0.3]}>
      <Box args={[0.38, 0.35, 0.52]} position={[0, 0.25, 0.2]} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </Box>
      <Box args={[0.36, 0.03, 0.48]} position={[0, 0.43, 0.2]}>
        <meshStandardMaterial color="#f1f5f9" roughness={0.1} />
      </Box>
      <Box args={[0.18, 0.12, 0.015]} position={[0, 0.65, -0.05]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </Box>
    </group>

    {/* Floating Oak Vanity & Mirror */}
    <group position={[0.45, 0, -0.1]}>
      <Box args={[0.65, 0.38, 0.45]} position={[0, 0.5, 0]} castShadow>
        <meshStandardMaterial color="#a16207" roughness={0.4} />
      </Box>
      <Box args={[0.45, 0.12, 0.32]} position={[0, 0.74, 0]} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </Box>
      <Cylinder args={[0.012, 0.012, 0.14, 8]} position={[0, 0.86, -0.12]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
      </Cylinder>
      <Box args={[0.55, 0.7, 0.03]} position={[0, 1.35, -0.22]}>
        <meshStandardMaterial color="#a16207" roughness={0.4} />
      </Box>
      <Box args={[0.49, 0.64, 0.01]} position={[0, 1.35, -0.2]}>
        <meshStandardMaterial color="#e0f2fe" roughness={0.05} metalness={0.95} />
      </Box>
    </group>

    {/* Walk-in Glass Shower */}
    <group position={[-0.45, 0, 0.5]}>
      <Box args={[0.02, 1.8, 0.8]} position={[0.25, 0.9, 0]}>
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.3} roughness={0.05} />
      </Box>
    </group>
  </group>
));
BathroomSet.displayName = 'BathroomSet';

// ==========================================
// 6. ARCHITECTURAL STAIRCASE & FOYER
// ==========================================

export const Staircase = React.memo(({ height }: { height: number }) => {
  const steps = 10;
  const stepHeight = height / steps;
  const stepDepth = 0.22;
  const stepWidth = 0.85;

  return (
    <group>
      {Array.from({ length: steps }).map((_, i) => (
        <group key={i} position={[0, i * stepHeight, -i * stepDepth]}>
          <Box args={[stepWidth, 0.05, stepDepth * 1.15]} position={[0, 0.025, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#a16207" roughness={0.3} />
          </Box>
          <Cylinder args={[0.008, 0.008, 0.75, 6]} position={[stepWidth / 2 - 0.04, 0.42, 0]}>
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
          </Cylinder>
        </group>
      ))}
      <Box 
        args={[0.04, 0.04, Math.sqrt(Math.pow(height, 2) + Math.pow(steps * stepDepth, 2))]} 
        position={[stepWidth / 2 - 0.04, height / 2 + 0.45, - (steps * stepDepth) / 2]}
        rotation={[Math.atan2(height, steps * stepDepth), 0, 0]}
        castShadow
      >
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </Box>
    </group>
  );
});
Staircase.displayName = 'Staircase';

export const EntrywayFoyer = React.memo(() => (
  <group>
    <group position={[-0.4, 0, 0]}>
      <Box args={[0.65, 0.35, 0.28]} position={[0, 0.175, 0]} castShadow>
        <meshStandardMaterial color="#78350f" roughness={0.4} />
      </Box>
      <Box args={[0.1, 0.04, 0.18]} position={[-0.15, 0.37, 0]}><meshStandardMaterial color="#1e293b" /></Box>
      <Box args={[0.1, 0.04, 0.18]} position={[0.15, 0.37, 0]}><meshStandardMaterial color="#991b1b" /></Box>
    </group>
    <group position={[0.45, 0, 0]}>
      <Box args={[0.75, 1.8, 0.06]} position={[0, 0.9, 0]} castShadow>
        <meshStandardMaterial color="#5c3818" roughness={0.4} />
      </Box>
      <Cylinder args={[0.012, 0.012, 0.45, 8]} position={[0.26, 0.9, 0.05]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
      </Cylinder>
    </group>
  </group>
));
EntrywayFoyer.displayName = 'EntrywayFoyer';

/**
 * Grand Architectural Main Entrance Door for Front Facade
 */
export const GrandFrontDoor = React.memo(({ height = 1.9, width = 1.2 }: { height?: number; width?: number }) => (
  <group>
    {/* Dark Architectural Door Frame */}
    <Box args={[width + 0.12, height + 0.08, 0.14]} position={[0, height / 2, 0]} castShadow>
      <meshStandardMaterial color="#1e242d" metalness={0.8} roughness={0.2} />
    </Box>

    {/* Modern Pivot Door in Rich Teak Wood Slats */}
    <Box args={[width * 0.72, height, 0.08]} position={[-width * 0.12, height / 2, 0.01]} castShadow>
      <meshStandardMaterial color="#6b3a16" roughness={0.35} />
    </Box>
    {/* Horizontal Door Slat Accents */}
    {[0.2, 0.45, 0.7, 0.95, 1.2, 1.45, 1.7].map((y, i) => (
      <Box key={i} args={[width * 0.7, 0.01, 0.09]} position={[-width * 0.12, y, 0.01]}>
        <meshStandardMaterial color="#3b1d06" />
      </Box>
    ))}

    {/* Long Brushed Stainless Steel Vertical Bar Pull Handle */}
    <Cylinder args={[0.016, 0.016, height * 0.55, 8]} position={[width * 0.18, height * 0.5, 0.07]}>
      <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
    </Cylinder>

    {/* Vertical Glass Sidelight with Dark Frame */}
    <Box args={[width * 0.22, height, 0.04]} position={[width * 0.38, height / 2, 0]}>
      <meshStandardMaterial color="#e0f2fe" transparent opacity={0.5} roughness={0.1} />
    </Box>

    {/* Overhead Entrance Canopy with Integrated Warm LED Downlight */}
    <Box args={[width + 0.4, 0.08, 0.8]} position={[0, height + 0.06, 0.35]} castShadow>
      <meshStandardMaterial color="#1e242d" metalness={0.8} roughness={0.3} />
    </Box>
    <Sphere args={[0.06, 8, 8]} position={[0, height + 0.01, 0.35]}>
      <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={1.0} />
    </Sphere>
  </group>
));
GrandFrontDoor.displayName = 'GrandFrontDoor';

export const WallArtwork = React.memo(({ width = 0.6, height = 0.8, color = '#e11d48' }: { width?: number; height?: number; color?: string }) => (
  <group>
    <Box args={[width, height, 0.02]} castShadow>
      <meshStandardMaterial color="#0f172a" roughness={0.4} />
    </Box>
    <Box args={[width - 0.04, height - 0.04, 0.025]}>
      <meshStandardMaterial color="#f8fafc" roughness={0.8} />
    </Box>
    <Box args={[width - 0.12, height - 0.12, 0.03]}>
      <meshStandardMaterial color={color} roughness={0.5} />
    </Box>
  </group>
));
WallArtwork.displayName = 'WallArtwork';

// ==========================================
// 7. EXTERIOR & LANDSCAPING (Reference Image 2)
// ==========================================

export const SpiralTopiary = React.memo(({ position = [0, 0, 0] as [number, number, number] }: { position?: [number, number, number] }) => (
  <group position={position}>
    <Cylinder args={[0.22, 0.15, 0.35, 16]} position={[0, 0.175, 0]} castShadow>
      <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
    </Cylinder>
    <Cone args={[0.24, 0.45, 12]} position={[0, 0.52, 0]} castShadow>
      <meshStandardMaterial color="#166534" roughness={0.7} />
    </Cone>
    <Cone args={[0.20, 0.4, 12]} position={[0, 0.82, 0]} castShadow>
      <meshStandardMaterial color="#15803d" roughness={0.7} />
    </Cone>
    <Cone args={[0.15, 0.35, 12]} position={[0, 1.08, 0]} castShadow>
      <meshStandardMaterial color="#22c55e" roughness={0.65} />
    </Cone>
  </group>
));
SpiralTopiary.displayName = 'SpiralTopiary';

export const BoxwoodShrub = React.memo(({ position = [0, 0, 0] as [number, number, number], scale = 1 }: { position?: [number, number, number]; scale?: number }) => (
  <group position={position} scale={scale}>
    <Sphere args={[0.22, 12, 12]} position={[0, 0.22, 0]} castShadow>
      <meshStandardMaterial color="#166534" roughness={0.8} />
    </Sphere>
  </group>
));
BoxwoodShrub.displayName = 'BoxwoodShrub';

export const GardenTree = React.memo(({ position = [0, 0, 0] as [number, number, number] }: { position?: [number, number, number] }) => (
  <group position={position}>
    <Cylinder args={[0.08, 0.12, 1.4, 8]} position={[0, 0.7, 0]} castShadow>
      <meshStandardMaterial color="#451a03" roughness={0.8} />
    </Cylinder>
    <Sphere args={[0.65, 12, 12]} position={[0, 1.7, 0]} castShadow>
      <meshStandardMaterial color="#15803d" roughness={0.7} />
    </Sphere>
    <Sphere args={[0.5, 12, 12]} position={[0.3, 1.9, 0.2]} castShadow>
      <meshStandardMaterial color="#22c55e" roughness={0.7} />
    </Sphere>
    <Sphere args={[0.45, 12, 12]} position={[-0.25, 1.8, -0.2]} castShadow>
      <meshStandardMaterial color="#166534" roughness={0.7} />
    </Sphere>
  </group>
));
GardenTree.displayName = 'GardenTree';

export const CurvedStoneWalkway = React.memo(() => {
  const pathTexture = useMemo(() => getFlagstonePathTexture(4, 8), []);

  return (
    <group>
      {[
        { pos: [-0.6, 0.015, 3.2], rot: 0.15, size: [1.2, 0.02, 1.4] },
        { pos: [-0.3, 0.015, 2.0], rot: -0.25, size: [1.1, 0.02, 1.3] },
        { pos: [0.1, 0.015, 0.9], rot: 0.1, size: [1.1, 0.02, 1.2] },
        { pos: [0.35, 0.015, -0.1], rot: -0.05, size: [1.2, 0.02, 1.0] },
      ].map((seg, i) => (
        <Box key={i} args={[seg.size[0], seg.size[1], seg.size[2]]} position={[seg.pos[0], seg.pos[1], seg.pos[2]]} rotation={[0, seg.rot, 0]} receiveShadow>
          <meshStandardMaterial map={pathTexture} roughness={0.8} />
        </Box>
      ))}
    </group>
  );
});
CurvedStoneWalkway.displayName = 'CurvedStoneWalkway';

export const PerimeterHedges = React.memo(({ width, length, height = 1.4 }: { width: number; length: number; height?: number }) => (
  <group>
    <Box args={[0.35, height, length]} position={[width / 2 + 0.5, height / 2, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#14532d" roughness={0.85} />
    </Box>
    <Box args={[width + 1.2, height, 0.35]} position={[0, height / 2, -length / 2 - 0.5]} castShadow receiveShadow>
      <meshStandardMaterial color="#14532d" roughness={0.85} />
    </Box>
    <Box args={[0.35, height, length * 0.55]} position={[-width / 2 - 0.5, height / 2, -length * 0.2]} castShadow receiveShadow>
      <meshStandardMaterial color="#14532d" roughness={0.85} />
    </Box>
  </group>
));
PerimeterHedges.displayName = 'PerimeterHedges';

export const PatioSet = React.memo(({ color }: { color?: any }) => (
  <group>
    <Box args={[1.2, 0.04, 0.8]} position={[0, 0.65, 0]} castShadow>
      <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.7} />
    </Box>
    {[[-0.5, -0.3], [0.5, -0.3], [-0.5, 0.3], [0.5, 0.3]].map((p, i) => (
      <Box key={i} args={[0.04, 0.65, 0.04]} position={[p[0], 0.325, p[1]]}>
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </Box>
    ))}
    {[
      { pos: [0, 0, 0.55], rot: 0 },
      { pos: [0, 0, -0.55], rot: Math.PI },
      { pos: [-0.75, 0, 0], rot: Math.PI / 2 },
      { pos: [0.75, 0, 0], rot: -Math.PI / 2 },
    ].map((c, i) => (
      <group key={i} position={c.pos as [number, number, number]} rotation={[0, c.rot, 0]}>
        <Box args={[0.38, 0.05, 0.36]} position={[0, 0.38, 0]} castShadow>
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </Box>
        <Box args={[0.38, 0.35, 0.04]} position={[0, 0.55, 0.16]} castShadow>
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </Box>
      </group>
    ))}

    <Box args={[0.9, 0.35, 0.3]} position={[0.9, 0.175, 0.8]}>
      <meshStandardMaterial color="#ffffff" roughness={0.3} />
    </Box>
    <Sphere args={[0.18, 8, 8]} position={[0.65, 0.42, 0.8]}><meshStandardMaterial color="#15803d" /></Sphere>
    <Sphere args={[0.18, 8, 8]} position={[1.15, 0.42, 0.8]}><meshStandardMaterial color="#15803d" /></Sphere>
  </group>
));
PatioSet.displayName = 'PatioSet';

export const PorchSteps = React.memo(({ width = 2.0, position = [0, 0, 0] as [number, number, number] }: { width?: number; position?: [number, number, number] }) => (
  <group position={position}>
    <Box args={[width, 0.08, 0.9]} position={[0, 0.04, 0]} receiveShadow>
      <meshStandardMaterial color="#94a3b8" roughness={0.5} />
    </Box>
    <Box args={[width * 0.85, 0.08, 0.6]} position={[0, 0.12, -0.15]} receiveShadow>
      <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
    </Box>
  </group>
));
PorchSteps.displayName = 'PorchSteps';

export const SlidingGlassDoors = React.memo(({ width = 2.0, height = 1.8 }: { width?: number; height?: number }) => (
  <group>
    <Box args={[width, height, 0.04]} position={[0, height / 2, 0]}>
      <meshStandardMaterial color="#e0f2fe" transparent opacity={0.35} roughness={0.05} />
    </Box>
    <Box args={[width, 0.05, 0.06]} position={[0, height, 0]}><meshStandardMaterial color="#1e293b" /></Box>
    <Box args={[width, 0.05, 0.06]} position={[0, 0.025, 0]}><meshStandardMaterial color="#1e293b" /></Box>
    <Box args={[0.04, height, 0.06]} position={[0, height / 2, 0]}><meshStandardMaterial color="#1e293b" /></Box>
  </group>
));
SlidingGlassDoors.displayName = 'SlidingGlassDoors';

/**
 * High-Detail Realistic Luxury SUV with Contoured Chassis, Clearcoat Paint,
 * Curved Windshield, Alloy Wheels, and Headlight Projectors
 */
export const DrivewayCar = React.memo(({ position = [0, 0, 0] as [number, number, number] }: { position?: [number, number, number] }) => {
  const metallicCharcoal = '#262e3d';

  return (
    <group position={position}>
      {/* 1. Main Lower Chassis with Wheel Well Arches */}
      <Box args={[1.58, 0.38, 2.9]} position={[0, 0.35, 0]} castShadow>
        <meshStandardMaterial color={metallicCharcoal} metalness={0.9} roughness={0.15} />
      </Box>

      {/* Aerodynamic Front Hood & Bumper */}
      <Box args={[1.54, 0.18, 0.95]} position={[0, 0.44, 0.95]} rotation={[-0.08, 0, 0]} castShadow>
        <meshStandardMaterial color={metallicCharcoal} metalness={0.9} roughness={0.15} />
      </Box>

      {/* Front Radiator Grille with Chrome Bars */}
      <Box args={[0.9, 0.18, 0.03]} position={[0, 0.32, 1.46]}>
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </Box>
      {[-0.04, 0, 0.04].map((y, i) => (
        <Box key={i} args={[0.85, 0.015, 0.04]} position={[0, 0.32 + y, 1.465]}>
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
        </Box>
      ))}

      {/* Sleek Projector LED Headlights with Glowing DRLs */}
      <Box args={[0.3, 0.08, 0.04]} position={[-0.56, 0.42, 1.44]} rotation={[0, 0.15, 0]}>
        <meshStandardMaterial color="#e0f2fe" emissive="#38bdf8" emissiveIntensity={0.8} />
      </Box>
      <Box args={[0.3, 0.08, 0.04]} position={[0.56, 0.42, 1.44]} rotation={[0, -0.15, 0]}>
        <meshStandardMaterial color="#e0f2fe" emissive="#38bdf8" emissiveIntensity={0.8} />
      </Box>

      {/* 2. Cabin Greenhouse with Slanted Windshield and Pillars */}
      {/* Slanted Front Windshield */}
      <Box args={[1.36, 0.52, 0.04]} position={[0, 0.68, 0.45]} rotation={[-0.58, 0, 0]} castShadow>
        <meshStandardMaterial color="#0f172a" roughness={0.05} metalness={0.9} transparent opacity={0.85} />
      </Box>
      {/* Roof Panel */}
      <Box args={[1.36, 0.06, 1.25]} position={[0, 0.88, -0.22]} castShadow>
        <meshStandardMaterial color={metallicCharcoal} metalness={0.9} roughness={0.15} />
      </Box>
      {/* Slanted Rear Windshield */}
      <Box args={[1.36, 0.5, 0.04]} position={[0, 0.68, -0.9]} rotation={[0.55, 0, 0]} castShadow>
        <meshStandardMaterial color="#0f172a" roughness={0.05} metalness={0.9} transparent opacity={0.85} />
      </Box>
      {/* Tinted Side Windows & Dark Pillars */}
      <Box args={[0.02, 0.38, 1.15]} position={[-0.67, 0.68, -0.22]}>
        <meshStandardMaterial color="#090d16" roughness={0.05} metalness={0.8} />
      </Box>
      <Box args={[0.02, 0.38, 1.15]} position={[0.67, 0.68, -0.22]}>
        <meshStandardMaterial color="#090d16" roughness={0.05} metalness={0.8} />
      </Box>

      {/* Side Mirrors */}
      <Box args={[0.14, 0.08, 0.06]} position={[-0.82, 0.62, 0.4]} rotation={[0, -0.2, 0]}>
        <meshStandardMaterial color={metallicCharcoal} metalness={0.9} />
      </Box>
      <Box args={[0.14, 0.08, 0.06]} position={[0.82, 0.62, 0.4]} rotation={[0, 0.2, 0]}>
        <meshStandardMaterial color={metallicCharcoal} metalness={0.9} />
      </Box>

      {/* Rear Taillight Bar */}
      <Box args={[1.45, 0.06, 0.04]} position={[0, 0.52, -1.45]}>
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.8} />
      </Box>

      {/* 3. 4 Realistic Alloy Wheels with Silver 5-Spoke Rims and Brake Calipers */}
      {[
        [-0.82, 0.88],
        [0.82, 0.88],
        [-0.82, -0.88],
        [0.82, -0.88],
      ].map((p, i) => (
        <group key={i} position={[p[0], 0.26, p[1]]}>
          {/* Black Rubber Tire with Tread Profile */}
          <Cylinder args={[0.27, 0.27, 0.18, 24]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#18181b" roughness={0.9} />
          </Cylinder>
          {/* Silver Alloy Rim Hub */}
          <Cylinder args={[0.18, 0.18, 0.19, 16]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.15} />
          </Cylinder>
          {/* Red Performance Brake Caliper */}
          <Box args={[0.04, 0.09, 0.06]} position={[0, 0.08, 0]}>
            <meshStandardMaterial color="#ef4444" roughness={0.4} />
          </Box>
        </group>
      ))}
    </group>
  );
});
DrivewayCar.displayName = 'DrivewayCar';
