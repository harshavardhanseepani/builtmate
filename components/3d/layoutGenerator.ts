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
};

export function generateHouseLayout(specs: any): HouseSpec {
  let plotW = 30;
  let plotL = 40;
  if (specs.plotSize) {
    const parts = specs.plotSize.split('x');
    plotW = parseInt(parts[0]) || 30;
    plotL = parseInt(parts[1]) || 40;
  } else {
    plotW = parseInt(specs.plotWidth) || 30;
    plotL = parseInt(specs.plotLength) || 40;
  }
  
  const floors = Math.max(1, Math.min(4, parseInt(specs.floors) || 2));
  const numBeds = Math.max(1, parseInt(specs.bedrooms) || 2);
  const numBaths = Math.max(1, parseInt(specs.bathrooms) || 2);
  const hasStudy = specs.study === 'Yes';

  const marginX = 2.5;
  const houseW = plotW - (marginX * 2);
  const frontSetback = specs.parking === 'Yes' ? 12 : (specs.garden === 'Yes' ? 8 : 5);
  const backSetback = 3.5;
  const houseL = plotL - frontSetback - backSetback;
  
  const startX = marginX;
  const startY = frontSetback;

  const rooms: Room[] = [];

  // Division ratios
  const leftW = houseW * 0.54;
  const rightW = houseW - leftW;
  const frontL = houseL * 0.38;
  const midL = houseL * 0.28;
  const backL = houseL - frontL - midL;

  // -------------------------------------------------------------
  // LEVEL 0 (Ground Floor - Inspired by Reference Image 1)
  // -------------------------------------------------------------
  // Left wing: Open Living -> Dining -> Kitchen
  rooms.push({ 
    id: 'floor0_living', 
    name: 'Living Room', 
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
    name: 'Open Kitchen', 
    type: 'Kitchen', 
    x: startX, 
    y: startY + frontL + midL, 
    w: leftW, 
    l: backL, 
    level: 0 
  });

  // Right wing: Main Foyer Entrance & Staircase -> Bathroom -> Bedroom 1
  rooms.push({ 
    id: 'floor0_foyer_stairs', 
    name: 'Foyer & Entrance', 
    type: 'Foyer', 
    x: startX + leftW, 
    y: startY, 
    w: rightW, 
    l: frontL, 
    level: 0 
  });

  rooms.push({ 
    id: 'floor0_bath1', 
    name: 'Bathroom', 
    type: 'Bathroom', 
    x: startX + leftW, 
    y: startY + frontL, 
    w: rightW, 
    l: midL, 
    level: 0 
  });

  rooms.push({ 
    id: 'floor0_bed1', 
    name: 'Bedroom 1', 
    type: 'Bedroom', 
    x: startX + leftW, 
    y: startY + frontL + midL, 
    w: rightW, 
    l: backL, 
    level: 0 
  });

  // -------------------------------------------------------------
  // LEVEL 1 (First Floor)
  // -------------------------------------------------------------
  if (floors >= 2) {
    if (floors === 2) {
      // 2-Floor Villa (Matching Reference Image 2: terrace on left, master suite on right)
      rooms.push({ 
        id: 'floor1_terrace', 
        name: 'Rooftop Terrace', 
        type: 'Terrace', 
        x: startX, 
        y: startY, 
        w: leftW, 
        l: frontL + midL, 
        level: 1 
      });

      if (hasStudy) {
        rooms.push({ 
          id: 'floor1_study', 
          name: 'Study Room', 
          type: 'Study Room', 
          x: startX, 
          y: startY + frontL + midL, 
          w: leftW, 
          l: backL, 
          level: 1 
        });
      }

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
        name: 'Ensuite Bath', 
        type: 'Bathroom', 
        x: startX + leftW, 
        y: startY + frontL + midL, 
        w: rightW, 
        l: backL, 
        level: 1 
      });
    } else {
      // 3 or 4 Floors: Full enclosed first floor with bedrooms and balcony
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

      rooms.push({ 
        id: 'floor1_bed2', 
        name: 'Bedroom 2', 
        type: 'Bedroom', 
        x: startX, 
        y: startY + frontL * 0.45, 
        w: leftW, 
        l: frontL * 0.55 + midL, 
        level: 1 
      });

      rooms.push({ 
        id: 'floor1_study', 
        name: hasStudy ? 'Private Study' : 'Family Lounge', 
        type: hasStudy ? 'Study Room' : 'Living Room', 
        x: startX, 
        y: startY + frontL + midL, 
        w: leftW, 
        l: backL, 
        level: 1 
      });

      rooms.push({ 
        id: 'floor1_master', 
        name: 'Master Bedroom', 
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
  // LEVEL 2 (Second Floor - for 3 or 4 Floors)
  // -------------------------------------------------------------
  if (floors >= 3) {
    if (floors === 3) {
      // 3-Floor Villa Top: Sky Terrace on left, Penthouse Bedroom on right
      rooms.push({ 
        id: 'floor2_terrace', 
        name: 'Sky Terrace', 
        type: 'Terrace', 
        x: startX, 
        y: startY, 
        w: leftW, 
        l: frontL + midL, 
        level: 2 
      });

      rooms.push({ 
        id: 'floor2_penthouse', 
        name: 'Penthouse Suite', 
        type: 'Master Bedroom', 
        x: startX + leftW, 
        y: startY, 
        w: rightW, 
        l: frontL + midL, 
        level: 2 
      });

      rooms.push({ 
        id: 'floor2_bath3', 
        name: 'Sky Bath', 
        type: 'Bathroom', 
        x: startX + leftW, 
        y: startY + frontL + midL, 
        w: rightW, 
        l: backL, 
        level: 2 
      });
    } else {
      // 4 Floors: Full floor Level 2
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
        name: 'Media Lounge', 
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
  // LEVEL 3 (Third Floor - for 4 Floors)
  // -------------------------------------------------------------
  if (floors >= 4) {
    rooms.push({ 
      id: 'floor3_terrace', 
      name: 'Rooftop Observatory', 
      type: 'Terrace', 
      x: startX, 
      y: startY, 
      w: leftW, 
      l: houseL, 
      level: 3 
    });

    rooms.push({ 
      id: 'floor3_penthouse', 
      name: 'Sky Penthouse', 
      type: 'Master Bedroom', 
      x: startX + leftW, 
      y: startY, 
      w: rightW, 
      l: frontL + midL, 
      level: 3 
    });

    rooms.push({ 
      id: 'floor3_bath4', 
      name: 'Penthouse Bath', 
      type: 'Bathroom', 
      x: startX + leftW, 
      y: startY + frontL + midL, 
      w: rightW, 
      l: backL, 
      level: 3 
    });
  }

  return {
    plotW, plotL, floors, rooms,
    style: specs.exteriorStyle || 'Modern',
    interiorStyle: specs.interiorStyle || 'Luxury',
    hasParking: specs.parking === 'Yes',
    hasGarden: specs.garden === 'Yes',
    hasBalcony: specs.balcony === 'Yes',
    hasTerrace: specs.terrace === 'Yes',
    bedrooms: numBeds,
    bathrooms: numBaths,
    wallColor: specs.wallColor || '#f8fafc'
  };
}
