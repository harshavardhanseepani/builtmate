export type Room = {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  w: number;
  l: number;
  level: number;
};

export type HouseSpec = {
  plotW: number;
  plotL: number;
  floors: number;
  rooms: Room[];
  style: string;
  interiorStyle: string;
  hasParking: boolean;
  hasGarden: boolean;
  hasBalcony: boolean;
  hasTerrace: boolean;
  bedrooms: number;
  bathrooms: number;
  wallColor: string;
  houseW?: number;
  houseL?: number;
  startX?: number;
  startY?: number;
  leftW?: number;
  rightW?: number;
};

export function generateHouseLayout(specs: any): HouseSpec {
  let plotW = 30;
  let plotL = 40;
  if (specs?.plotSize) {
    const parts = specs.plotSize.split('x');
    plotW = parseInt(parts[0]) || 30;
    plotL = parseInt(parts[1]) || 40;
  } else {
    plotW = parseInt(specs?.plotWidth) || 30;
    plotL = parseInt(specs?.plotLength) || 40;
  }
  
  const floors = Math.max(1, Math.min(4, parseInt(specs?.floors) || 2));
  const numBeds = Math.max(1, Math.min(5, parseInt(specs?.bedrooms) || 3));
  const numBaths = Math.max(1, Math.min(5, parseInt(specs?.bathrooms) || 3));
  const hasStudy = specs?.study === 'Yes';
  const hasPooja = specs?.pooja === 'Yes';
  const hasBalcony = specs?.balcony !== 'No';
  const hasTerrace = specs?.terrace !== 'No';
  const style = specs?.exteriorStyle || 'Modern';

  // Seed pseudo-random variation
  const seed = typeof specs?.seed === 'number' ? specs.seed : 0.5;
  const pseudo = (offset: number) => {
    const val = Math.sin((seed + offset) * 9876.5432) * 10000;
    return val - Math.floor(val);
  };

  const marginX = 2.5;
  const houseW = plotW - (marginX * 2);
  const frontSetback = specs?.parking === 'Yes' ? 12 : (specs?.garden === 'Yes' ? 8 : 5);
  const backSetback = 3.5;
  const houseL = plotL - frontSetback - backSetback;
  
  const startX = marginX;
  const startY = frontSetback;

  // Architectural wing split ratio based on style & seed
  let leftRatio = 0.54;
  if (style === 'Luxury') {
    leftRatio = 0.50; // Palladian symmetry
  } else if (style === 'Modern') {
    leftRatio = 0.56 + (pseudo(1) - 0.5) * 0.06; // Dynamic cantilever wing
  } else if (style === 'Minimalist') {
    leftRatio = 0.60 + (pseudo(2) - 0.5) * 0.05; // Dominant minimalist block
  } else if (style === 'Traditional') {
    leftRatio = 0.52 + (pseudo(3) - 0.5) * 0.04; // Verandah proportion
  } else if (style === 'Industrial') {
    leftRatio = 0.55 + (pseudo(4) - 0.5) * 0.06; // Staggered industrial bay
  } else if (style === 'Bungalow') {
    leftRatio = 0.50 + (pseudo(5) - 0.5) * 0.04; // Grounded craftsman balance
  }

  const leftW = houseW * leftRatio;
  const rightW = houseW - leftW;
  
  // Depth division
  const frontRatio = 0.38 + (pseudo(6) - 0.5) * 0.04;
  const midRatio = 0.28 + (pseudo(7) - 0.5) * 0.03;
  const frontL = houseL * frontRatio;
  const midL = houseL * midRatio;
  const backL = houseL - frontL - midL;

  const rooms: Room[] = [];

  // -------------------------------------------------------------
  // LEVEL 0 (Ground Floor)
  // -------------------------------------------------------------
  // Left wing: Open Living -> Dining -> Kitchen
  rooms.push({ 
    id: 'floor0_living', 
    name: style === 'Luxury' ? 'Grand Salon' : (style === 'Industrial' ? 'Industrial Loft Living' : 'Living Room'), 
    type: 'Living Room', 
    x: startX, 
    y: startY, 
    w: leftW, 
    l: frontL, 
    level: 0 
  });
  
  rooms.push({ 
    id: 'floor0_dining', 
    name: 'Dining Area', 
    type: 'Dining', 
    x: startX, 
    y: startY + frontL, 
    w: leftW, 
    l: midL, 
    level: 0 
  });

  rooms.push({ 
    id: 'floor0_kitchen', 
    name: 'Modular Kitchen', 
    type: 'Kitchen', 
    x: startX, 
    y: startY + frontL + midL, 
    w: leftW, 
    l: backL, 
    level: 0 
  });

  // Right wing: Foyer & Entrance -> Bathroom 1 -> Ground Bedroom 1
  rooms.push({ 
    id: 'floor0_foyer_stairs', 
    name: style === 'Luxury' ? 'Grand Entrance Portico' : (style === 'Traditional' ? 'Poomukham & Foyer' : 'Foyer & Entrance'), 
    type: 'Foyer', 
    x: startX + leftW, 
    y: startY, 
    w: rightW, 
    l: frontL, 
    level: 0 
  });

  rooms.push({ 
    id: 'floor0_bath1', 
    name: 'Powder Room / Bath 1', 
    type: 'Bathroom', 
    x: startX + leftW, 
    y: startY + frontL, 
    w: rightW, 
    l: midL, 
    level: 0 
  });

  // Ground floor bedroom or guest suite
  rooms.push({ 
    id: 'floor0_bed1', 
    name: numBeds === 1 ? 'Primary Bedroom' : 'Guest Bedroom', 
    type: 'Bedroom', 
    x: startX + leftW, 
    y: startY + frontL + midL, 
    w: rightW, 
    l: backL, 
    level: 0 
  });

  // Optional Pooja Room tucked into dining area if requested
  if (hasPooja && leftW > 14) {
    rooms.push({
      id: 'floor0_pooja',
      name: 'Pooja Mandir',
      type: 'Study Room',
      x: startX + leftW - 4.5,
      y: startY + frontL,
      w: 4.5,
      l: midL * 0.6,
      level: 0
    });
  }

  // -------------------------------------------------------------
  // LEVEL 1 (First Floor - if floors >= 2)
  // -------------------------------------------------------------
  if (floors >= 2) {
    if (floors === 2) {
      // 2-Floor Layout:
      // Left wing: Rooftop terrace or Balcony + Optional Study
      if (hasTerrace) {
        rooms.push({ 
          id: 'floor1_terrace', 
          name: style === 'Luxury' ? 'Royal Balustraded Terrace' : (style === 'Traditional' ? 'Traditional Verandah' : 'Open Sun Terrace'), 
          type: 'Terrace', 
          x: startX, 
          y: startY, 
          w: leftW, 
          l: frontL + midL, 
          level: 1 
        });
      } else {
        rooms.push({ 
          id: 'floor1_lounge', 
          name: 'Family Lounge', 
          type: 'Living Room', 
          x: startX, 
          y: startY, 
          w: leftW, 
          l: frontL + midL, 
          level: 1 
        });
      }

      if (hasStudy || numBeds >= 3) {
        rooms.push({ 
          id: 'floor1_study', 
          name: numBeds >= 3 ? 'Bedroom 2' : 'Private Study & Library', 
          type: numBeds >= 3 ? 'Bedroom' : 'Study Room', 
          x: startX, 
          y: startY + frontL + midL, 
          w: leftW, 
          l: backL, 
          level: 1 
        });
      }

      // Right wing: Master Suite + Ensuite Bath
      rooms.push({ 
        id: 'floor1_master', 
        name: 'Master Bedroom Suite', 
        type: 'Master Bedroom', 
        x: startX + leftW, 
        y: startY, 
        w: rightW, 
        l: frontL + midL, 
        level: 1 
      });

      rooms.push({ 
        id: 'floor1_bath2', 
        name: 'Master Ensuite Bath', 
        type: 'Bathroom', 
        x: startX + leftW, 
        y: startY + frontL + midL, 
        w: rightW, 
        l: backL, 
        level: 1 
      });
    } else {
      // 3 or 4 Floors: Full enclosed first floor with bedrooms and balcony
      if (hasBalcony) {
        rooms.push({ 
          id: 'floor1_balcony', 
          name: 'Front Balcony', 
          type: 'Terrace', 
          x: startX, 
          y: startY, 
          w: leftW, 
          l: frontL * 0.45, 
          level: 1 
        });
      }

      rooms.push({ 
        id: 'floor1_bed2', 
        name: 'Bedroom 2', 
        type: 'Bedroom', 
        x: startX, 
        y: startY + (hasBalcony ? frontL * 0.45 : 0), 
        w: leftW, 
        l: hasBalcony ? (frontL * 0.55 + midL) : (frontL + midL), 
        level: 1 
      });

      rooms.push({ 
        id: 'floor1_study', 
        name: hasStudy ? 'Private Study' : (numBeds >= 4 ? 'Bedroom 3' : 'Family Lounge'), 
        type: (hasStudy || numBeds < 4) ? 'Study Room' : 'Bedroom', 
        x: startX, 
        y: startY + frontL + midL, 
        w: leftW, 
        l: backL, 
        level: 1 
      });

      rooms.push({ 
        id: 'floor1_master', 
        name: 'Master Suite', 
        type: 'Master Bedroom', 
        x: startX + leftW, 
        y: startY, 
        w: rightW, 
        l: frontL + midL, 
        level: 1 
      });

      rooms.push({ 
        id: 'floor1_bath2', 
        name: 'Master Bath', 
        type: 'Bathroom', 
        x: startX + leftW, 
        y: startY + frontL + midL, 
        w: rightW, 
        l: backL, 
        level: 1 
      });
    }
  }

  // -------------------------------------------------------------
  // LEVEL 2 (Second Floor - if floors >= 3)
  // -------------------------------------------------------------
  if (floors >= 3) {
    if (floors === 3) {
      // 3-Floor Villa Top: Sky Terrace on left, Penthouse on right
      rooms.push({ 
        id: 'floor2_terrace', 
        name: style === 'Luxury' ? 'Royal Sky Terrace' : 'Panoramic Sky Terrace', 
        type: 'Terrace', 
        x: startX, 
        y: startY, 
        w: leftW, 
        l: frontL + midL, 
        level: 2 
      });

      rooms.push({ 
        id: 'floor2_penthouse', 
        name: numBeds >= 4 ? 'Bedroom 4 (Penthouse)' : 'Penthouse Suite', 
        type: 'Master Bedroom', 
        x: startX + leftW, 
        y: startY, 
        w: rightW, 
        l: frontL + midL, 
        level: 2 
      });

      rooms.push({ 
        id: 'floor2_bath3', 
        name: 'Sky Bath 3', 
        type: 'Bathroom', 
        x: startX + leftW, 
        y: startY + frontL + midL, 
        w: rightW, 
        l: backL, 
        level: 2 
      });
    } else {
      // 4 Floors: Full Level 2
      rooms.push({ 
        id: 'floor2_bed3', 
        name: 'Bedroom 3', 
        type: 'Bedroom', 
        x: startX, 
        y: startY, 
        w: leftW, 
        l: frontL + midL, 
        level: 2 
      });

      rooms.push({ 
        id: 'floor2_lounge', 
        name: 'Media & Entertainment Lounge', 
        type: 'Living Room', 
        x: startX + leftW, 
        y: startY, 
        w: rightW, 
        l: frontL + midL, 
        level: 2 
      });

      rooms.push({ 
        id: 'floor2_bath3', 
        name: 'Bathroom 3', 
        type: 'Bathroom', 
        x: startX + leftW, 
        y: startY + frontL + midL, 
        w: rightW, 
        l: backL, 
        level: 2 
      });
    }
  }

  // -------------------------------------------------------------
  // LEVEL 3 (Third Floor - if floors === 4)
  // -------------------------------------------------------------
  if (floors >= 4) {
    rooms.push({ 
      id: 'floor3_terrace', 
      name: 'Rooftop Observatory Deck', 
      type: 'Terrace', 
      x: startX, 
      y: startY, 
      w: leftW, 
      l: houseL, 
      level: 3 
    });

    rooms.push({ 
      id: 'floor3_penthouse', 
      name: numBeds >= 5 ? 'Bedroom 5 (Sky Suite)' : 'Sky Penthouse', 
      type: 'Master Bedroom', 
      x: startX + leftW, 
      y: startY, 
      w: rightW, 
      l: frontL + midL, 
      level: 3 
    });

    rooms.push({ 
      id: 'floor3_bath4', 
      name: 'Penthouse Bath 4', 
      type: 'Bathroom', 
      x: startX + leftW, 
      y: startY + frontL + midL, 
      w: rightW, 
      l: backL, 
      level: 3 
    });
  }

  return {
    plotW, 
    plotL, 
    floors, 
    rooms,
    style,
    interiorStyle: specs?.interiorStyle || 'Luxury',
    hasParking: specs?.parking === 'Yes',
    hasGarden: specs?.garden === 'Yes',
    hasBalcony,
    hasTerrace,
    bedrooms: numBeds,
    bathrooms: numBaths,
    wallColor: specs?.wallColor || '#f8fafc',
    houseW,
    houseL,
    startX,
    startY,
    leftW,
    rightW
  };
}
