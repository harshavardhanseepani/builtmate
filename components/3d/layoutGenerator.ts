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
};

export function generateHouseLayout(specs: any): HouseSpec {
  const plotW = parseInt(specs.plotWidth) || 30;
  const plotL = parseInt(specs.plotLength) || 40;
  const floors = parseInt(specs.floors) || 1;
  const numBeds = parseInt(specs.bedrooms) || 1;
  const numBaths = parseInt(specs.bathrooms) || 1;
  const hasPooja = specs.pooja === 'Yes';
  const hasStudy = specs.study === 'Yes';

  const marginX = 2;
  const houseW = plotW - (marginX * 2);
  const frontSetback = specs.parking === 'Yes' ? 14 : (specs.garden === 'Yes' ? 8 : 4);
  const backSetback = 4;
  const houseL = plotL - frontSetback - backSetback;
  
  const startX = marginX;
  const startY = frontSetback;

  const rooms: Room[] = [];

  // LEVEL 0 (Ground Floor)
  const frontL = houseL * 0.4;
  const midL = houseL * 0.3;
  const backL = houseL * 0.3;

  rooms.push({ id: 'floor0_living', name: 'Living Room', type: 'Living Room', x: startX, y: startY, w: houseW, l: frontL, level: 0 });
  
  // Kitchen, Dining, and possibly Pooja
  if (hasPooja) {
    rooms.push({ id: 'floor0_kitchen', name: 'Kitchen', type: 'Kitchen', x: startX, y: startY + frontL, w: houseW * 0.4, l: midL, level: 0 });
    rooms.push({ id: 'floor0_dining', name: 'Dining Room', type: 'Dining', x: startX + houseW * 0.4, y: startY + frontL, w: houseW * 0.4, l: midL, level: 0 });
    rooms.push({ id: 'floor0_pooja', name: 'Pooja Room', type: 'Pooja Room', x: startX + houseW * 0.8, y: startY + frontL, w: houseW * 0.2, l: midL, level: 0 });
  } else {
    rooms.push({ id: 'floor0_kitchen', name: 'Kitchen', type: 'Kitchen', x: startX, y: startY + frontL, w: houseW / 2, l: midL, level: 0 });
    rooms.push({ id: 'floor0_dining', name: 'Dining Room', type: 'Dining', x: startX + houseW / 2, y: startY + frontL, w: houseW / 2, l: midL, level: 0 });
  }

  rooms.push({ id: 'floor0_bed1', name: 'Bedroom 1', type: 'Bedroom', x: startX, y: startY + frontL + midL, w: houseW * 0.6, l: backL, level: 0 });
  rooms.push({ id: 'floor0_bath1', name: 'Bathroom', type: 'Bathroom', x: startX + houseW * 0.6, y: startY + frontL + midL, w: houseW * 0.4, l: backL, level: 0 });

  // LEVEL 1
  if (floors > 1) {
    if (specs.balcony === 'Yes') {
       rooms.push({ id: 'floor1_balcony', name: 'Balcony', type: 'Balcony', x: startX, y: startY - 4, w: houseW, l: 4, level: 1 });
    }
    rooms.push({ id: 'floor1_master', name: 'Master Bedroom', type: 'Master Bedroom', x: startX, y: startY, w: houseW, l: frontL, level: 1 });
    
    if (numBeds >= 2) {
       rooms.push({ id: 'floor1_bed2', name: 'Bedroom 2', type: 'Bedroom', x: startX, y: startY + frontL, w: houseW / 2, l: midL + backL, level: 1 });
       if (numBeds >= 3) {
          rooms.push({ id: 'floor1_bed3', name: 'Bedroom 3', type: 'Bedroom', x: startX + houseW / 2, y: startY + frontL, w: houseW / 2, l: midL, level: 1 });
          
          if (hasStudy) {
            rooms.push({ id: 'floor1_bath2', name: 'Bathroom 2', type: 'Bathroom', x: startX + houseW / 2, y: startY + frontL + midL, w: houseW * 0.25, l: backL, level: 1 });
            rooms.push({ id: 'floor1_study', name: 'Study Room', type: 'Study Room', x: startX + houseW * 0.75, y: startY + frontL + midL, w: houseW * 0.25, l: backL, level: 1 });
          } else {
            rooms.push({ id: 'floor1_bath2', name: 'Bathroom 2', type: 'Bathroom', x: startX + houseW / 2, y: startY + frontL + midL, w: houseW / 2, l: backL, level: 1 });
          }
       } else {
          rooms.push({ id: 'floor1_bath2', name: 'Bathroom 2', type: 'Bathroom', x: startX + houseW / 2, y: startY + frontL, w: houseW / 2, l: midL + backL, level: 1 });
       }
    } else {
       if (hasStudy) {
          rooms.push({ id: 'floor1_study', name: 'Study Room', type: 'Study Room', x: startX, y: startY + frontL, w: houseW / 2, l: midL + backL, level: 1 });
          rooms.push({ id: 'floor1_terrace', name: 'Terrace', type: 'Terrace', x: startX + houseW / 2, y: startY + frontL, w: houseW / 2, l: midL + backL, level: 1 });
       } else {
          rooms.push({ id: 'floor1_terrace', name: 'Terrace', type: 'Terrace', x: startX, y: startY + frontL, w: houseW, l: midL + backL, level: 1 });
       }
    }
  }

  // LEVEL 2
  if (floors > 2) {
      if (numBeds >= 4) {
         rooms.push({ id: 'floor2_bed4', name: 'Bedroom 4', type: 'Bedroom', x: startX, y: startY, w: houseW, l: frontL, level: 2 });
         rooms.push({ id: 'floor2_terrace', name: 'Terrace', type: 'Terrace', x: startX, y: startY + frontL, w: houseW, l: midL + backL, level: 2 });
      } else {
         rooms.push({ id: 'floor2_terrace', name: 'Terrace', type: 'Terrace', x: startX, y: startY, w: houseW, l: houseL, level: 2 });
      }
  }

  // Level 3
  if (floors > 3) {
     rooms.push({ id: 'floor3_terrace', name: 'Terrace', type: 'Terrace', x: startX, y: startY, w: houseW, l: houseL, level: 3 });
  }

  return {
    plotW, plotL, floors, rooms,
    style: specs.exteriorStyle,
    interiorStyle: specs.interiorStyle,
    hasParking: specs.parking === 'Yes',
    hasGarden: specs.garden === 'Yes',
    hasBalcony: specs.balcony === 'Yes',
    hasTerrace: specs.terrace === 'Yes',
    bedrooms: numBeds,
    bathrooms: numBaths
  };
}
