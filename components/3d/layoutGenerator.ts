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
  wallColor?: string;
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
  
  const floors = parseInt(specs.floors) || 2;
  const numBeds = parseInt(specs.bedrooms) || 2;
  const numBaths = parseInt(specs.bathrooms) || 2;
  const hasPooja = specs.pooja === 'Yes';
  const hasStudy = specs.study === 'Yes';

  const marginX = 2.5;
  const houseW = plotW - (marginX * 2);
  const frontSetback = specs.parking === 'Yes' ? 12 : (specs.garden === 'Yes' ? 8 : 4);
  const backSetback = 3.5;
  const houseL = plotL - frontSetback - backSetback;
  
  const startX = marginX;
  const startY = frontSetback;

  const rooms: Room[] = [];

  // LEVEL 0 (Ground Floor - Architecturally matching Reference Image 1)
  // Left half: Living -> Dining -> Open Kitchen
  // Right half: Entrance Foyer & Staircase -> Bathroom -> Bedroom 1
  const leftW = houseW * 0.54;
  const rightW = houseW - leftW;

  const frontL = houseL * 0.38;
  const midL = houseL * 0.28;
  const backL = houseL - frontL - midL;

  // Left side:
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

  // Right side:
  rooms.push({ 
    id: 'floor0_foyer_stairs', 
    name: 'Foyer & Staircase', 
    type: 'Living Room', // rendered with staircase & entryway 
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

  // LEVEL 1 (First Floor / Upper Villa - Architecturally matching Reference Image 2)
  if (floors > 1) {
    // Left side: Rooftop Terrace with outdoor seating (matching Reference Image 2)
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

    // Right side: Master Bedroom & Lounge with floor-to-ceiling glass (matching Reference Image 2)
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

    if (numBeds >= 3) {
      rooms.push({ 
        id: 'floor1_bed3', 
        name: 'Bedroom 3', 
        type: 'Bedroom', 
        x: startX + leftW, 
        y: startY + frontL + midL, 
        w: rightW, 
        l: backL, 
        level: 1 
      });
    } else {
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

  // LEVEL 2
  if (floors > 2) {
    if (numBeds >= 4) {
      rooms.push({ id: 'floor2_bed4', name: 'Bedroom 4', type: 'Bedroom', x: startX + leftW, y: startY, w: rightW, l: frontL + midL, level: 2 });
      rooms.push({ id: 'floor2_terrace', name: 'Open Sky Terrace', type: 'Terrace', x: startX, y: startY, w: leftW, l: houseL, level: 2 });
    } else {
      rooms.push({ id: 'floor2_terrace', name: 'Open Sky Terrace', type: 'Terrace', x: startX, y: startY, w: houseW, l: houseL, level: 2 });
    }
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
