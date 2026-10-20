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

/**
 * L-Shaped Sectional Sofa in deep peacock teal velvet with terracotta & ochre throw pillows,
 * woven rug, and oak coffee table with accessories matching Reference Image 1.
 */
export const Sofa = React.memo(({ color }: { color?: any }) => {
  const rugTexture = useMemo(() => getWovenRugTexture(2, 2), []);
  const tealVelvet = '#0e7490'; // Rich peacock teal/petrol blue from Image 1
  const terracotta = '#c2410c'; // Burnt orange from Image 1
  const ochreYellow = '#d97706'; // Mustard accent from Image 1
  const creamFabric = '#f8fafc'; // Crisp accent pillow

  return (
    <group>
      {/* 1. Neutral Woven Area Rug */}
      <Box args={[2.5, 0.015, 2.0]} position={[0.2, 0.008, 0.3]} receiveShadow>
        <meshStandardMaterial map={rugTexture} roughness={0.9} />
      </Box>

      {/* 2. Main L-Shaped Sectional Sofa */}
      {/* Base Foundation Frame */}
      <Box args={[2.2, 0.16, 0.85]} position={[-0.1, 0.1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.6} />
      </Box>
      {/* Chaise / L-Extension forward on left */}
      <Box args={[0.9, 0.16, 1.2]} position={[-0.75, 0.1, 0.85]} castShadow receiveShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.6} />
      </Box>

      {/* Plush Seat Cushions */}
      <Box args={[0.7, 0.14, 0.78]} position={[0.6, 0.24, 0]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.55} />
      </Box>
      <Box args={[0.7, 0.14, 0.78]} position={[-0.1, 0.24, 0]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.55} />
      </Box>
      <Box args={[0.82, 0.14, 0.85]} position={[-0.75, 0.24, 0]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.55} />
      </Box>
      <Box args={[0.82, 0.14, 1.15]} position={[-0.75, 0.24, 0.85]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.55} />
      </Box>

      {/* Backrest Cushions */}
      <Box args={[2.2, 0.45, 0.18]} position={[-0.1, 0.42, -0.38]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.6} />
      </Box>
      {/* Left Backrest Cushion along Chaise */}
      <Box args={[0.18, 0.45, 1.45]} position={[-1.15, 0.42, 0.42]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.6} />
      </Box>

      {/* Right Armrest */}
      <Box args={[0.2, 0.35, 0.85]} position={[0.95, 0.3, 0]} castShadow>
        <meshStandardMaterial color={tealVelvet} roughness={0.6} />
      </Box>

      {/* Throw Pillows in Terracotta, Ochre & Cream */}
      <Box args={[0.32, 0.3, 0.1]} position={[-0.95, 0.38, -0.22]} rotation={[0, 0.4, 0.15]} castShadow>
        <meshStandardMaterial color={terracotta} roughness={0.5} />
      </Box>
      <Box args={[0.28, 0.28, 0.08]} position={[-0.98, 0.35, 0.2]} rotation={[0, 0.8, -0.1]} castShadow>
        <meshStandardMaterial color={ochreYellow} roughness={0.5} />
      </Box>
      <Box args={[0.3, 0.28, 0.08]} position={[0.5, 0.36, -0.25]} rotation={[0, -0.2, 0]} castShadow>
        <meshStandardMaterial color={terracotta} roughness={0.5} />
      </Box>
      <Box args={[0.26, 0.26, 0.08]} position={[0.8, 0.34, -0.2]} rotation={[0, -0.5, 0.1]} castShadow>
        <meshStandardMaterial color={creamFabric} roughness={0.6} />
      </Box>

      {/* 3. Natural Oak Scandinavian Coffee Table */}
      <group position={[0.25, 0, 0.4]}>
        {/* Table Top */}
        <Box args={[0.85, 0.035, 0.48]} position={[0, 0.22, 0]} castShadow>
          <meshStandardMaterial color="#c28b57" roughness={0.35} />
        </Box>
        {/* Slender Dowel Legs */}
        {[[-0.38, -0.2], [0.38, -0.2], [-0.38, 0.2], [0.38, 0.2]].map((p, i) => (
          <Cylinder key={i} args={[0.018, 0.012, 0.21, 8]} position={[p[0], 0.105, p[1]]} castShadow>
            <meshStandardMaterial color="#8a5327" roughness={0.4} />
          </Cylinder>
        ))}
        {/* Coffee Table Books & Succulent Planter */}
        <Box args={[0.22, 0.02, 0.16]} position={[-0.15, 0.25, 0]} rotation={[0, 0.15, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.2, 0.02, 0.14]} position={[-0.15, 0.27, 0]} rotation={[0, -0.1, 0]}>
          <meshStandardMaterial color="#1e293b" />
        </Box>
        {/* Ceramic Planter with Succulent */}
        <Cylinder args={[0.05, 0.04, 0.06, 12]} position={[0.2, 0.26, 0]}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </Cylinder>
        <Sphere args={[0.045, 8, 8]} position={[0.2, 0.31, 0]}>
          <meshStandardMaterial color="#166534" roughness={0.8} />
        </Sphere>
      </group>

      {/* 4. Arched Floor Lamp */}
      <group position={[1.1, 0, 0.9]}>
        {/* Heavy Circular Marble Base */}
        <Cylinder args={[0.15, 0.15, 0.025, 16]} position={[0, 0.012, 0]}>
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </Cylinder>
        {/* Brass Stem */}
        <Cylinder args={[0.012, 0.012, 1.45, 8]} position={[0, 0.73, 0]}>
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
        </Cylinder>
        {/* Curved Arm Overhang */}
        <Cylinder args={[0.012, 0.012, 0.35, 8]} position={[-0.12, 1.48, 0]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
        </Cylinder>
        {/* Glowing Translucent White Globe Shade */}
        <Sphere args={[0.1, 16, 16]} position={[-0.24, 1.4, 0]}>
          <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={0.6} roughness={0.1} />
        </Sphere>
      </group>
    </group>
  );
});
Sofa.displayName = 'Sofa';

/**
 * Modern Low Media Console & Ultra-Thin OLED Television mounted along dividing wall
 */
export const TVUnit = React.memo(({ color }: { color?: any }) => (
  <group>
    {/* Floating / Low Profile Dark Wood Media Console */}
    <Box args={[2.0, 0.32, 0.35]} position={[0, 0.16, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#292524" roughness={0.4} />
    </Box>
    {/* Console Compartment Divisions & Brass Feet */}
    <Box args={[1.96, 0.02, 0.36]} position={[0, 0.31, 0]}>
      <meshStandardMaterial color="#44403c" roughness={0.3} />
    </Box>
    <Box args={[0.02, 0.28, 0.34]} position={[-0.65, 0.16, 0]}><meshStandardMaterial color="#1c1917" /></Box>
    <Box args={[0.02, 0.28, 0.34]} position={[0.65, 0.16, 0]}><meshStandardMaterial color="#1c1917" /></Box>

    {/* Modern Slim Soundbar */}
    <Box args={[0.9, 0.05, 0.07]} position={[0, 0.34, 0.08]}>
      <meshStandardMaterial color="#0f172a" roughness={0.5} />
    </Box>

    {/* OLED Screen with Thin Bezel & Delicate Stand */}
    <Box args={[0.4, 0.015, 0.2]} position={[0, 0.33, -0.05]}>
      <meshStandardMaterial color="#1e293b" metalness={0.8} />
    </Box>
    <Cylinder args={[0.015, 0.015, 0.12, 8]} position={[0, 0.4, -0.05]}>
      <meshStandardMaterial color="#0f172a" metalness={0.9} />
    </Cylinder>
    {/* Black Glass Display */}
    <Box args={[1.4, 0.8, 0.03]} position={[0, 0.85, -0.05]} castShadow>
      <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
    </Box>
    {/* Active Screen Ambient Glow */}
    <Box args={[1.36, 0.76, 0.01]} position={[0, 0.85, -0.03]}>
      <meshStandardMaterial color="#1e293b" emissive="#0284c7" emissiveIntensity={0.2} roughness={0.2} />
    </Box>
  </group>
));
TVUnit.displayName = 'TVUnit';

// ==========================================
// 2. DINING AREA (Reference Image 1)
// ==========================================

/**
 * Rectangular Solid Wood Dining Table with Colorful Bohemian Striped Runner,
 * Fruit Bowl Centerpiece, and 6 Curved Ochre/Mustard Yellow Shell Chairs.
 */
export const DiningSet = React.memo(({ color }: { color?: any }) => {
  const runnerTexture = useMemo(() => getStripedRunnerTexture(), []);
  const ochreYellow = '#ca8a04'; // Warm mustard/ochre yellow from Image 1

  return (
    <group>
      {/* 1. Dining Table */}
      {/* Natural Solid Oak Tabletop */}
      <Box args={[1.8, 0.05, 0.95]} position={[0, 0.74, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#a16207" roughness={0.3} />
      </Box>
      {/* Sturdy Angled Wood/Steel Legs */}
      {[[-0.75, -0.38], [0.75, -0.38], [-0.75, 0.38], [0.75, 0.38]].map((p, i) => (
        <Box key={i} args={[0.055, 0.72, 0.055]} position={[p[0], 0.36, p[1]]} castShadow>
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </Box>
      ))}

      {/* 2. Striped Bohemian Table Runner */}
      <Box args={[1.82, 0.005, 0.32]} position={[0, 0.768, 0]}>
        <meshStandardMaterial map={runnerTexture} roughness={0.8} />
      </Box>

      {/* 3. Ceramic Centerpiece Fruit Bowl with Fruit */}
      <group position={[0, 0.77, 0]}>
        {/* White Ceramic Bowl */}
        <Cylinder args={[0.14, 0.08, 0.06, 16]} position={[0, 0.03, 0]}>
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </Cylinder>
        {/* Fresh Fruit: Red Apple, Yellow Banana, Orange Citrus */}
        <Sphere args={[0.035, 8, 8]} position={[-0.04, 0.07, 0.02]}><meshStandardMaterial color="#dc2626" roughness={0.3} /></Sphere>
        <Sphere args={[0.035, 8, 8]} position={[0.04, 0.07, -0.02]}><meshStandardMaterial color="#ea580c" roughness={0.3} /></Sphere>
        <Cylinder args={[0.018, 0.018, 0.08, 8]} position={[0, 0.075, 0.03]} rotation={[0.4, 0.2, 1.2]}><meshStandardMaterial color="#eab308" roughness={0.4} /></Cylinder>
        <Sphere args={[0.028, 8, 8]} position={[0.02, 0.085, -0.01]}><meshStandardMaterial color="#16a34a" roughness={0.3} /></Sphere>
      </group>

      {/* 4. 6 Curved Ochre Yellow Dining Chairs (3 on each side) */}
      {/* Front 3 Chairs */}
      {[-0.55, 0, 0.55].map((x, i) => (
        <group key={`front_${i}`} position={[x, 0, 0.68]}>
          {/* Curved Upholstered Seat Cushion */}
          <Box args={[0.38, 0.06, 0.36]} position={[0, 0.44, 0]} castShadow>
            <meshStandardMaterial color={ochreYellow} roughness={0.5} />
          </Box>
          {/* Curved Ergonomic Backrest */}
          <Box args={[0.38, 0.34, 0.05]} position={[0, 0.63, 0.16]} rotation={[-0.15, 0, 0]} castShadow>
            <meshStandardMaterial color={ochreYellow} roughness={0.5} />
          </Box>
          {/* Slender Black Steel Splayed Legs */}
          {[[-0.15, -0.14], [0.15, -0.14], [-0.15, 0.14], [0.15, 0.14]].map((lp, li) => (
            <Cylinder key={li} args={[0.012, 0.008, 0.44, 6]} position={[lp[0], 0.22, lp[1]]} castShadow>
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </Cylinder>
          ))}
        </group>
      ))}

      {/* Back 3 Chairs */}
      {[-0.55, 0, 0.55].map((x, i) => (
        <group key={`back_${i}`} position={[x, 0, -0.68]}>
          <Box args={[0.38, 0.06, 0.36]} position={[0, 0.44, 0]} castShadow>
            <meshStandardMaterial color={ochreYellow} roughness={0.5} />
          </Box>
          <Box args={[0.38, 0.34, 0.05]} position={[0, 0.63, -0.16]} rotation={[0.15, 0, 0]} castShadow>
            <meshStandardMaterial color={ochreYellow} roughness={0.5} />
          </Box>
          {[[-0.15, -0.14], [0.15, -0.14], [-0.15, 0.14], [0.15, 0.14]].map((lp, li) => (
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

/**
 * Modern Sleek Kitchen with Matte Slate-Grey Cabinetry, Carrara White Countertop,
 * Undermount Double-Basin Sink, Induction Cooktop with Pots, Dishwasher & Fridge.
 */
export const KitchenSet = React.memo(({ color }: { color?: any }) => (
  <group>
    {/* 1. Main Base Counter Cabinets in Matte Slate Grey */}
    <Box args={[2.7, 0.88, 0.65]} position={[0, 0.44, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#475569" roughness={0.4} />
    </Box>

    {/* Seamless Handleless Drawer Gaps */}
    <Box args={[2.68, 0.015, 0.02]} position={[0, 0.58, 0.33]}><meshStandardMaterial color="#1e293b" /></Box>
    <Box args={[2.68, 0.015, 0.02]} position={[0, 0.28, 0.33]}><meshStandardMaterial color="#1e293b" /></Box>

    {/* 2. Polished Carrara White Quartz Countertop with Waterfall Edge */}
    <Box args={[2.74, 0.04, 0.68]} position={[0, 0.9, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.1} />
    </Box>

    {/* 3. Built-in Undermount Stainless Steel Double Sink & Gooseneck Faucet */}
    <group position={[0.45, 0.92, 0]}>
      {/* Sink Basin Cavity */}
      <Box args={[0.55, 0.01, 0.4]}>
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.02, 0.015, 0.38]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </Box>
      {/* Chrome High-Arc Gooseneck Mixer Tap */}
      <Cylinder args={[0.012, 0.012, 0.18, 8]} position={[0, 0.1, -0.16]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </Cylinder>
      <Cylinder args={[0.01, 0.01, 0.1, 8]} position={[0, 0.18, -0.1]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </Cylinder>
    </group>

    {/* 4. Induction Cooktop with Stainless Steel Pots */}
    <group position={[-0.55, 0.92, 0]}>
      {/* Black Glass Cooktop Surface */}
      <Box args={[0.62, 0.01, 0.44]}>
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.8} />
      </Box>
      {/* Burner Rings */}
      <Cylinder args={[0.08, 0.08, 0.012, 16]} position={[-0.14, 0.005, -0.08]}>
        <meshStandardMaterial color="#1e293b" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.012, 16]} position={[0.14, 0.005, 0.08]}>
        <meshStandardMaterial color="#1e293b" />
      </Cylinder>
      {/* Stockpot with Lid on Burner */}
      <Cylinder args={[0.09, 0.09, 0.1, 16]} position={[-0.14, 0.06, -0.08]} castShadow>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </Cylinder>
      <Cylinder args={[0.095, 0.095, 0.015, 16]} position={[-0.14, 0.115, -0.08]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </Cylinder>
      {/* Saucepan with Long Handle */}
      <Cylinder args={[0.07, 0.07, 0.05, 16]} position={[0.14, 0.035, 0.08]} castShadow>
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.008, 0.008, 0.12, 8]} position={[0.14, 0.05, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1e293b" />
      </Cylinder>
    </group>

    {/* 5. Built-in Stainless Steel Dishwasher / Oven under counter */}
    <Box args={[0.55, 0.58, 0.02]} position={[0.45, 0.38, 0.33]}>
      <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
    </Box>
    <Box args={[0.4, 0.02, 0.03]} position={[0.45, 0.62, 0.35]}>
      <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
    </Box>

    {/* 6. Tall Stainless Steel Counter-Depth Refrigerator */}
    <group position={[1.75, 0.95, 0.02]}>
      <Box args={[0.75, 1.9, 0.7]} castShadow receiveShadow>
        <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
      </Box>
      {/* Vertical Door Split Seam */}
      <Box args={[0.01, 1.88, 0.02]} position={[0, 0, 0.355]}><meshStandardMaterial color="#64748b" /></Box>
      {/* Long Bar Door Handles */}
      <Cylinder args={[0.01, 0.01, 0.55, 8]} position={[-0.04, 0.1, 0.37]}>
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </Cylinder>
      <Cylinder args={[0.01, 0.01, 0.55, 8]} position={[0.04, 0.1, 0.37]}>
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </Cylinder>
    </group>
  </group>
));
KitchenSet.displayName = 'KitchenSet';

// ==========================================
// 4. MASTER BEDROOM (Reference Image 1)
// ==========================================

/**
 * Furnished Bedroom with King-Size Platform Bed, Terracotta Waffle Duvet,
 * Padded Headboard, Floating Oak Nightstands with Dome Lamps.
 */
export const Bed = React.memo(({ color }: { color?: any }) => (
  <group>
    {/* 1. Oak Platform Bed Frame */}
    <Box args={[1.9, 0.22, 2.2]} position={[0, 0.11, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#8a5327" roughness={0.4} />
    </Box>

    {/* 2. Padded Grey Fabric Headboard */}
    <Box args={[2.0, 0.85, 0.12]} position={[0, 0.55, -1.05]} castShadow>
      <meshStandardMaterial color="#64748b" roughness={0.7} />
    </Box>
    {/* Vertical Cushion Tufting */}
    <Box args={[0.02, 0.8, 0.02]} position={[-0.35, 0.55, -0.98]}><meshStandardMaterial color="#475569" /></Box>
    <Box args={[0.02, 0.8, 0.02]} position={[0.35, 0.55, -0.98]}><meshStandardMaterial color="#475569" /></Box>

    {/* 3. Deep Mattress with Crisp Light-Grey Linen Sheets */}
    <Box args={[1.75, 0.24, 2.05]} position={[0, 0.32, 0.02]} castShadow>
      <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
    </Box>

    {/* 4. Folded Terracotta / Burnt Orange Waffle Duvet Runner from Image 1 */}
    <Box args={[1.76, 0.06, 1.1]} position={[0, 0.45, 0.48]} castShadow>
      <meshStandardMaterial color="#b45309" roughness={0.65} />
    </Box>

    {/* 5. Sleeping Pillows & Accent Cushions */}
    {/* Left Sleeping Pillow */}
    <Box args={[0.62, 0.12, 0.38]} position={[-0.45, 0.48, -0.7]} rotation={[0.2, 0, 0]} castShadow>
      <meshStandardMaterial color="#f8fafc" roughness={0.6} />
    </Box>
    {/* Right Sleeping Pillow */}
    <Box args={[0.62, 0.12, 0.38]} position={[0.45, 0.48, -0.7]} rotation={[0.2, 0, 0]} castShadow>
      <meshStandardMaterial color="#f8fafc" roughness={0.6} />
    </Box>
    {/* Terracotta Accent Pillow */}
    <Box args={[0.35, 0.25, 0.1]} position={[-0.45, 0.55, -0.52]} rotation={[0.35, 0, 0]} castShadow>
      <meshStandardMaterial color="#c2410c" roughness={0.5} />
    </Box>

    {/* 6. Twin Floating Oak Nightstands with Mushroom Dome Lamps */}
    {/* Left Nightstand */}
    <group position={[-1.25, 0.22, -0.85]}>
      <Box args={[0.42, 0.22, 0.38]} castShadow>
        <meshStandardMaterial color="#a16207" roughness={0.4} />
      </Box>
      {/* Dome Table Lamp */}
      <Cylinder args={[0.015, 0.015, 0.16, 8]} position={[0, 0.18, 0]}>
        <meshStandardMaterial color="#d4af37" metalness={0.9} />
      </Cylinder>
      <Sphere args={[0.1, 16, 16]} position={[0, 0.28, 0]}>
        <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={0.5} roughness={0.2} />
      </Sphere>
    </group>

    {/* Right Nightstand */}
    <group position={[1.25, 0.22, -0.85]}>
      <Box args={[0.42, 0.22, 0.38]} castShadow>
        <meshStandardMaterial color="#a16207" roughness={0.4} />
      </Box>
      <Cylinder args={[0.015, 0.015, 0.16, 8]} position={[0, 0.18, 0]}>
        <meshStandardMaterial color="#d4af37" metalness={0.9} />
      </Cylinder>
      <Sphere args={[0.1, 16, 16]} position={[0, 0.28, 0]}>
        <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={0.5} roughness={0.2} />
      </Sphere>
    </group>
  </group>
));
Bed.displayName = 'Bed';

/**
 * Open-Concept Walk-In Wardrobe with Chrome Hanging Rail, Clothes on Hangers,
 * Upper Storage Shelf, and Shoe Cubbies matching Reference Image 1.
 */
export const Wardrobe = React.memo(({ color }: { color?: any }) => (
  <group>
    {/* Wardrobe Outer Frame in Sleek White / Light Oak */}
    <Box args={[1.5, 1.4, 0.45]} position={[0, 0.7, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
    </Box>
    {/* Inner Cavity Cutout */}
    <Box args={[1.42, 1.32, 0.42]} position={[0, 0.7, 0.03]}>
      <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
    </Box>
    {/* Horizontal Dividing Shelf */}
    <Box args={[1.42, 0.03, 0.4]} position={[0, 1.1, 0.03]}>
      <meshStandardMaterial color="#cbd5e1" />
    </Box>
    {/* Chrome Hanging Clothes Rail */}
    <Cylinder args={[0.012, 0.012, 1.4, 8]} position={[0, 1.02, 0.03]} rotation={[0, 0, Math.PI / 2]}>
      <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
    </Cylinder>

    {/* Hanging Clothes on Hangers in various colors */}
    {[-0.5, -0.35, -0.2, -0.05, 0.1, 0.25, 0.4, 0.55].map((x, i) => {
      const shirtColors = ['#1e293b', '#c2410c', '#f8fafc', '#3b82f6', '#475569', '#ca8a04', '#0f766e', '#e2e8f0'];
      return (
        <group key={i} position={[x, 0.75, 0.03]}>
          {/* Hanger Hook */}
          <Cylinder args={[0.005, 0.005, 0.08, 6]} position={[0, 0.22, 0]}><meshStandardMaterial color="#94a3b8" /></Cylinder>
          {/* Hanging Garment Body */}
          <Box args={[0.1, 0.42, 0.26]} castShadow>
            <meshStandardMaterial color={shirtColors[i % shirtColors.length]} roughness={0.7} />
          </Box>
        </group>
      );
    })}

    {/* Lower Shoe / Storage Cubbies */}
    <Box args={[1.42, 0.03, 0.4]} position={[0, 0.25, 0.03]}><meshStandardMaterial color="#cbd5e1" /></Box>
    {[-0.45, 0, 0.45].map((x, i) => (
      <group key={i} position={[x, 0.12, 0.05]}>
        <Box args={[0.12, 0.06, 0.22]} position={[-0.07, 0, 0]}><meshStandardMaterial color="#1e293b" /></Box>
        <Box args={[0.12, 0.06, 0.22]} position={[0.07, 0, 0]}><meshStandardMaterial color="#1e293b" /></Box>
      </group>
    ))}
  </group>
));
Wardrobe.displayName = 'Wardrobe';

/**
 * Home Office Work Desk with Laptop, Task Lamp, and Cognac Brown Leather Armchair.
 */
export const StudySet = React.memo(({ color }: { color?: any }) => (
  <group>
    {/* Wooden Work Desk */}
    <Box args={[1.1, 0.04, 0.55]} position={[0, 0.72, 0]} castShadow>
      <meshStandardMaterial color="#a16207" roughness={0.35} />
    </Box>
    {/* Desk Drawer Unit on Right */}
    <Box args={[0.32, 0.68, 0.52]} position={[0.38, 0.35, 0]} castShadow>
      <meshStandardMaterial color="#78350f" roughness={0.4} />
    </Box>
    {/* Left Steel Legs */}
    <Box args={[0.04, 0.7, 0.5]} position={[-0.5, 0.35, 0]}>
      <meshStandardMaterial color="#1e293b" metalness={0.8} />
    </Box>

    {/* Open Laptop on Desk */}
    <group position={[-0.1, 0.74, 0]}>
      {/* Keyboard Base */}
      <Box args={[0.26, 0.008, 0.18]}><meshStandardMaterial color="#94a3b8" metalness={0.9} /></Box>
      {/* Opened Screen */}
      <Box args={[0.26, 0.18, 0.008]} position={[0, 0.09, -0.09]} rotation={[-0.2, 0, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.1} />
      </Box>
      {/* Glowing Display */}
      <Box args={[0.24, 0.16, 0.002]} position={[0, 0.09, -0.084]} rotation={[-0.2, 0, 0]}>
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.3} />
      </Box>
    </group>

    {/* Cognac Brown Leather Swivel Armchair */}
    <group position={[-0.1, 0, 0.48]}>
      {/* Star Base & Stem */}
      <Cylinder args={[0.02, 0.02, 0.35, 8]} position={[0, 0.18, 0]}><meshStandardMaterial color="#1e293b" metalness={0.9} /></Cylinder>
      {/* Bucket Leather Seat */}
      <Box args={[0.42, 0.08, 0.4]} position={[0, 0.42, 0]} castShadow>
        <meshStandardMaterial color="#9a3412" roughness={0.5} />
      </Box>
      <Box args={[0.42, 0.45, 0.07]} position={[0, 0.65, 0.18]} rotation={[-0.1, 0, 0]} castShadow>
        <meshStandardMaterial color="#9a3412" roughness={0.5} />
      </Box>
    </group>
  </group>
));
StudySet.displayName = 'StudySet';

// ==========================================
// 5. BATHROOM FIXTURES (Reference Image 1)
// ==========================================

/**
 * Modern Bathroom with Wall-Hung Toilet, Floating Oak Vanity with Ceramic Basin,
 * Wall Mirror, Glass Shower Partition matching Reference Image 1.
 */
export const BathroomSet = React.memo(({ color }: { color?: any }) => (
  <group>
    {/* 1. Wall-Hung Ceramic Toilet with Dual-Flush Wall Plate */}
    <group position={[-0.45, 0, -0.3]}>
      {/* Ceramic Toilet Bowl */}
      <Box args={[0.38, 0.35, 0.52]} position={[0, 0.25, 0.2]} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </Box>
      {/* Toilet Lid / Seat */}
      <Box args={[0.36, 0.03, 0.48]} position={[0, 0.43, 0.2]}>
        <meshStandardMaterial color="#f1f5f9" roughness={0.1} />
      </Box>
      {/* In-Wall Concealed Cistern Flush Plate */}
      <Box args={[0.18, 0.12, 0.015]} position={[0, 0.65, -0.05]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </Box>
    </group>

    {/* 2. Floating Oak Vanity & Ceramic Vessel Basin */}
    <group position={[0.45, 0, -0.1]}>
      {/* Wall-Hung Wood Cabinet */}
      <Box args={[0.65, 0.38, 0.45]} position={[0, 0.5, 0]} castShadow>
        <meshStandardMaterial color="#a16207" roughness={0.4} />
      </Box>
      {/* Rectangular Ceramic Vessel Sink */}
      <Box args={[0.45, 0.12, 0.32]} position={[0, 0.74, 0]} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </Box>
      {/* Chrome Mixer Tap */}
      <Cylinder args={[0.012, 0.012, 0.14, 8]} position={[0, 0.86, -0.12]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
      </Cylinder>
      {/* Wall Mirror with Warm Oak Frame */}
      <Box args={[0.55, 0.7, 0.03]} position={[0, 1.35, -0.22]}>
        <meshStandardMaterial color="#a16207" roughness={0.4} />
      </Box>
      <Box args={[0.49, 0.64, 0.01]} position={[0, 1.35, -0.2]}>
        <meshStandardMaterial color="#e0f2fe" roughness={0.05} metalness={0.95} />
      </Box>
    </group>

    {/* 3. Walk-In Glass Shower Partition */}
    <group position={[-0.45, 0, 0.5]}>
      <Box args={[0.02, 1.8, 0.8]} position={[0.25, 0.9, 0]}>
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.3} roughness={0.05} />
      </Box>
      {/* Chrome Shower Head Column */}
      <Cylinder args={[0.012, 0.012, 1.5, 8]} position={[-0.2, 1.0, -0.35]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.02, 16]} position={[-0.2, 1.75, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
      </Cylinder>
    </group>
  </group>
));
BathroomSet.displayName = 'BathroomSet';

// ==========================================
// 6. ARCHITECTURAL STAIRCASE (Reference Image 1)
// ==========================================

/**
 * Open-Riser Floating Wooden Staircase with Oak Treads and Brushed Stainless Balustrade.
 */
export const Staircase = React.memo(({ height, color }: { height: number; color?: any }) => {
  const steps = 10;
  const stepHeight = height / steps;
  const stepDepth = 0.22;
  const stepWidth = 0.85;

  return (
    <group>
      {Array.from({ length: steps }).map((_, i) => (
        <group key={i} position={[0, i * stepHeight, -i * stepDepth]}>
          {/* Solid Oak Floating Tread */}
          <Box args={[stepWidth, 0.05, stepDepth * 1.15]} position={[0, 0.025, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#a16207" roughness={0.3} />
          </Box>
          {/* Vertical Stainless Steel Baluster Spindle */}
          <Cylinder args={[0.008, 0.008, 0.75, 6]} position={[stepWidth / 2 - 0.04, 0.42, 0]}>
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
          </Cylinder>
        </group>
      ))}
      {/* Continuous Slanted Top Handrail */}
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

// ==========================================
// 7. ENTRANCE FOYER & DOORS (Reference Image 1)
// ==========================================

export const EntrywayFoyer = React.memo(() => (
  <group>
    {/* Wooden Entryway Shoe Bench with Arranged Shoes */}
    <group position={[-0.4, 0, 0]}>
      <Box args={[0.65, 0.35, 0.28]} position={[0, 0.175, 0]} castShadow>
        <meshStandardMaterial color="#78350f" roughness={0.4} />
      </Box>
      {/* Shoes on top */}
      <Box args={[0.1, 0.04, 0.18]} position={[-0.15, 0.37, 0]}><meshStandardMaterial color="#1e293b" /></Box>
      <Box args={[0.1, 0.04, 0.18]} position={[0.15, 0.37, 0]}><meshStandardMaterial color="#991b1b" /></Box>
    </group>

    {/* Modern Oak Entry Door with Brushed Metal Handle */}
    <group position={[0.45, 0, 0]}>
      <Box args={[0.75, 1.8, 0.06]} position={[0, 0.9, 0]} castShadow>
        <meshStandardMaterial color="#5c3818" roughness={0.4} />
      </Box>
      {/* Brushed Long Pull Handle */}
      <Cylinder args={[0.012, 0.012, 0.45, 8]} position={[0.26, 0.9, 0.05]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
      </Cylinder>
    </group>
  </group>
));
EntrywayFoyer.displayName = 'EntrywayFoyer';

/**
 * Modern Framed Abstract Artwork for interior dividing walls
 */
export const WallArtwork = React.memo(({ width = 0.6, height = 0.8, color = '#e11d48' }: { width?: number; height?: number; color?: string }) => (
  <group>
    {/* Thin Black Frame */}
    <Box args={[width, height, 0.02]} castShadow>
      <meshStandardMaterial color="#0f172a" roughness={0.4} />
    </Box>
    {/* White Mat Border */}
    <Box args={[width - 0.04, height - 0.04, 0.025]}>
      <meshStandardMaterial color="#f8fafc" roughness={0.8} />
    </Box>
    {/* Abstract Colorful Painting Print */}
    <Box args={[width - 0.12, height - 0.12, 0.03]}>
      <meshStandardMaterial color={color} roughness={0.5} />
    </Box>
  </group>
));
WallArtwork.displayName = 'WallArtwork';

// ==========================================
// 8. EXTERIOR & LANDSCAPING (Reference Image 2)
// ==========================================

/**
 * Sculpted Spiral / Cone Topiary Evergreen Bush (Reference Image 2)
 */
export const SpiralTopiary = React.memo(({ position = [0, 0, 0] as [number, number, number] }) => (
  <group position={position}>
    {/* Ceramic Terracotta Planter Urn */}
    <Cylinder args={[0.22, 0.15, 0.35, 16]} position={[0, 0.175, 0]} castShadow>
      <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
    </Cylinder>
    {/* Tiered Sculpted Cone / Spiral Topiary Foliage */}
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

/**
 * Manicured Spherical Boxwood Shrub along pathway borders (Reference Image 2)
 */
export const BoxwoodShrub = React.memo(({ position = [0, 0, 0] as [number, number, number], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Sphere args={[0.22, 12, 12]} position={[0, 0.22, 0]} castShadow>
      <meshStandardMaterial color="#166534" roughness={0.8} />
    </Sphere>
  </group>
));
BoxwoodShrub.displayName = 'BoxwoodShrub';

/**
 * Multi-Stem Flowering Garden Tree with leafy green canopy (Reference Image 2)
 */
export const GardenTree = React.memo(({ position = [0, 0, 0] as [number, number, number] }) => (
  <group position={position}>
    {/* Natural Bark Trunk */}
    <Cylinder args={[0.08, 0.12, 1.4, 8]} position={[0, 0.7, 0]} castShadow>
      <meshStandardMaterial color="#451a03" roughness={0.8} />
    </Cylinder>
    {/* Canopy Foliage Clusters */}
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

/**
 * Winding Flagstone Garden Walkway leading to the villa entrance (Reference Image 2)
 */
export const CurvedStoneWalkway = React.memo(({ start = [0, 0] as [number, number], end = [0, 0] as [number, number] }) => {
  const pathTexture = useMemo(() => getFlagstonePathTexture(4, 8), []);

  return (
    <group>
      {/* S-curved organic stepping path sections */}
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

/**
 * Dense Perimeter Privacy Hedges surrounding villa boundary (Reference Image 2)
 */
export const PerimeterHedges = React.memo(({ width, length, height = 1.4 }: { width: number; length: number; height?: number }) => (
  <group>
    {/* Right Boundary Hedge */}
    <Box args={[0.35, height, length]} position={[width / 2 + 0.5, height / 2, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#14532d" roughness={0.85} />
    </Box>
    {/* Back Boundary Hedge */}
    <Box args={[width + 1.2, height, 0.35]} position={[0, height / 2, -length / 2 - 0.5]} castShadow receiveShadow>
      <meshStandardMaterial color="#14532d" roughness={0.85} />
    </Box>
    {/* Left Boundary Hedge (partial, allowing driveway access) */}
    <Box args={[0.35, height, length * 0.55]} position={[-width / 2 - 0.5, height / 2, -length * 0.2]} castShadow receiveShadow>
      <meshStandardMaterial color="#14532d" roughness={0.85} />
    </Box>
  </group>
));
PerimeterHedges.displayName = 'PerimeterHedges';

/**
 * Rooftop Terrace Outdoor Patio Dining & Lounge Set (Reference Image 2)
 */
export const PatioSet = React.memo(({ color }: { color?: any }) => (
  <group>
    {/* Outdoor Charcoal Glass-Top Dining Table */}
    <Box args={[1.2, 0.04, 0.8]} position={[0, 0.65, 0]} castShadow>
      <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.7} />
    </Box>
    {/* Table Legs */}
    {[[-0.5, -0.3], [0.5, -0.3], [-0.5, 0.3], [0.5, 0.3]].map((p, i) => (
      <Box key={i} args={[0.04, 0.65, 0.04]} position={[p[0], 0.325, p[1]]}>
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </Box>
    ))}
    {/* 4 Outdoor All-Weather Woven Armchairs */}
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

    {/* Terrace Planter Box */}
    <Box args={[0.9, 0.35, 0.3]} position={[0.9, 0.175, 0.8]}>
      <meshStandardMaterial color="#ffffff" roughness={0.3} />
    </Box>
    <Sphere args={[0.18, 8, 8]} position={[0.65, 0.42, 0.8]}><meshStandardMaterial color="#15803d" /></Sphere>
    <Sphere args={[0.18, 8, 8]} position={[1.15, 0.42, 0.8]}><meshStandardMaterial color="#15803d" /></Sphere>
  </group>
));
PatioSet.displayName = 'PatioSet';

/**
 * Traditional Indian Pooja Room Set
 */
export const PoojaSet = React.memo(({ color }: { color?: any }) => (
  <group>
    <Box args={[0.8, 1.2, 0.4]} position={[0, 0.6, 0]} castShadow>
      <meshStandardMaterial color="#78350f" roughness={0.4} />
    </Box>
    <Cone args={[0.15, 0.25, 4]} position={[0, 1.32, 0]}>
      <meshStandardMaterial color="#d4af37" metalness={0.9} />
    </Cone>
    <Sphere args={[0.03, 8, 8]} position={[0, 0.6, 0.15]}>
      <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={0.8} />
    </Sphere>
  </group>
));
PoojaSet.displayName = 'PoojaSet';

/**
 * Exterior Architectural Sconce Spotlight
 */
export const ExteriorSconceLight = React.memo(({ position = [0, 0, 0] as [number, number, number] }) => (
  <group position={position}>
    <Box args={[0.05, 0.12, 0.04]}>
      <meshStandardMaterial color="#0f172a" metalness={0.8} />
    </Box>
    <Box args={[0.03, 0.02, 0.02]} position={[0, 0.05, 0.02]}>
      <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.8} />
    </Box>
    <Box args={[0.03, 0.02, 0.02]} position={[0, -0.05, 0.02]}>
      <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.8} />
    </Box>
  </group>
));
ExteriorSconceLight.displayName = 'ExteriorSconceLight';

/**
 * Potted Ceramic Houseplants
 */
export const PottedPlant = React.memo(({ position = [0, 0, 0] as [number, number, number] }) => (
  <group position={position}>
    <Cylinder args={[0.15, 0.1, 0.35, 12]} position={[0, 0.175, 0]} castShadow>
      <meshStandardMaterial color="#f8fafc" roughness={0.2} />
    </Cylinder>
    <Sphere args={[0.2, 10, 10]} position={[0, 0.45, 0]} castShadow>
      <meshStandardMaterial color="#166534" roughness={0.8} />
    </Sphere>
  </group>
));
PottedPlant.displayName = 'PottedPlant';

/**
 * Floating Multi-Tier Concrete Porch Steps
 */
export const PorchSteps = React.memo(({ width = 2.0, position = [0, 0, 0] as [number, number, number] }) => (
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

/**
 * Sliding Glass Balcony Doors
 */
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
 * Terrace Flowers
 */
export const GardenFlowers = React.memo(({ position = [0, 0, 0] as [number, number, number] }) => (
  <group position={position}>
    <Sphere args={[0.12, 8, 8]} position={[0, 0.1, 0]}><meshStandardMaterial color="#8b5cf6" /></Sphere>
    <Sphere args={[0.1, 8, 8]} position={[0.1, 0.12, 0.05]}><meshStandardMaterial color="#ec4899" /></Sphere>
  </group>
));
GardenFlowers.displayName = 'GardenFlowers';

/**
 * Modern Luxury Driveway SUV
 */
export const DrivewayCar = React.memo(({ position = [0, 0, 0] as [number, number, number] }) => (
  <group position={position}>
    {/* Metallic Grey SUV Body */}
    <Box args={[1.5, 0.45, 2.6]} position={[0, 0.4, 0]} castShadow>
      <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.15} />
    </Box>
    {/* Cabin & Tinted Windows */}
    <Box args={[1.3, 0.45, 1.4]} position={[0, 0.75, -0.1]} castShadow>
      <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
    </Box>
    {/* Headlights */}
    <Box args={[0.3, 0.08, 0.02]} position={[-0.45, 0.42, 1.3]}>
      <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.8} />
    </Box>
    <Box args={[0.3, 0.08, 0.02]} position={[0.45, 0.42, 1.3]}>
      <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.8} />
    </Box>
    {/* Wheels */}
    {[[-0.78, 0.8], [0.78, 0.8], [-0.78, -0.8], [0.78, -0.8]].map((p, i) => (
      <Cylinder key={i} args={[0.26, 0.26, 0.18, 16]} position={[p[0], 0.26, p[1]]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </Cylinder>
    ))}
  </group>
));
DrivewayCar.displayName = 'DrivewayCar';
