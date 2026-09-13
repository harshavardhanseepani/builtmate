'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { ref, set, push } from 'firebase/database';

export const seedDatabase = async () => {
  try {
    // 1. Seed Builders (5 robust profiles)
    const buildersRef = ref(db, 'builders');
    const buildersData = {
      "apex_structures": {
        id: "apex_structures",
        name: "Arjun Mehta",
        company: "Apex Structures",
        rating: 4.9,
        location: "Mumbai, Maharashtra",
        projects: 124,
        experience: "15 Years",
        verified: true,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
        description: "Specializing in luxury villas and modern high-rises with sustainable materials."
      },
      "ecobuild": {
        id: "ecobuild",
        name: "Sarah Khan",
        company: "EcoBuild Solutions",
        rating: 4.7,
        location: "Bangalore, Karnataka",
        projects: 86,
        experience: "10 Years",
        verified: true,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        description: "Leader in green construction and energy-efficient home designs."
      },
      "skyline_homes": {
        id: "skyline_homes",
        name: "Vikram Singh",
        company: "Skyline Homes",
        rating: 4.8,
        location: "Delhi, NCR",
        projects: 210,
        experience: "20 Years",
        verified: true,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        description: "Expert in urban architecture and smart-home integrated projects."
      },
      "zenith_builders": {
        id: "zenith_builders",
        name: "Priya Sharma",
        company: "Zenith Builders",
        rating: 4.6,
        location: "Pune, Maharashtra",
        projects: 45,
        experience: "6 Years",
        verified: true,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        description: "Young, dynamic team focused on contemporary minimalist aesthetics."
      },
      "heritage_constructions": {
        id: "heritage_constructions",
        name: "Rajesh Iyer",
        company: "Heritage Constructions",
        rating: 4.5,
        location: "Chennai, Tamil Nadu",
        projects: 150,
        experience: "25 Years",
        verified: true,
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
        description: "Traditional architecture with a modern touch. Known for reliability."
      }
    };
    await set(buildersRef, buildersData);

    // 2. Seed Materials (10 items)
    const materialsRef = ref(db, 'materials');
    const materialsData = {
      "mat1": { id: "mat1", name: "UltraTech Cement", category: "Cement", supplier: "BuildCenter", price: "₹450 / bag", location: "Local Store", stock: "In Stock" },
      "mat2": { id: "mat2", name: "TATA Tiscon Steel", category: "Steel", supplier: "Global Metals", price: "₹65,000 / ton", location: "WareHouse", stock: "In Stock" },
      "mat3": { id: "mat3", name: "River Sand", category: "Sand", supplier: "RawSupplies", price: "₹3,500 / unit", location: "District A", stock: "Limited" },
      "mat4": { id: "mat4", name: "Red Bricks", category: "Bricks", supplier: "ClayWorks", price: "₹9 / piece", location: "Factory", stock: "In Stock" },
      "mat5": { id: "mat5", name: "Premium Vitrified Tiles", category: "Tiles", supplier: "DecorHub", price: "₹85 / sqft", location: "Showroom", stock: "Out of Stock" },
      "mat6": { id: "mat6", name: "Asian Paints Royale", category: "Paint", supplier: "ColorCo", price: "₹1,200 / 4L", location: "Local Store", stock: "In Stock" },
      "mat7": { id: "mat7", name: "Teak Wood", category: "Wood", supplier: "TimberLine", price: "₹4,500 / cuft", location: "Yard", stock: "In Stock" },
      "mat8": { id: "mat8", name: "CPVC Plumbing Kit", category: "Plumbing", supplier: "FlowSafe", price: "₹12,000 / set", location: "WareHouse", stock: "In Stock" },
      "mat9": { id: "mat9", name: "Havells Gold Wiring", category: "Electrical", supplier: "ElecTrade", price: "₹2,400 / coil", location: "Showroom", stock: "In Stock" },
      "mat10": { id: "mat11", name: "Granite Kitchen Top", category: "Stone", supplier: "RockStudio", price: "₹250 / sqft", location: "Slab Yard", stock: "Limited" }
    };
    await set(materialsRef, materialsData);

    // 3. Seed Demo Project (For the logged-in user to see something initially)
    // Note: This will use a placeholder userId 'demo-user' until actual auth is used
    const projectsRef = ref(db, 'projects/demo_project');
    await set(projectsRef, {
      id: "demo_project",
      userId: "demo-user",
      builderId: "apex_structures",
      status: "in-progress",
      progress: 35,
      stage: "Brickwork",
      budget: "₹45L - ₹55L",
      plotSize: "1500 sqft",
      bhk: "3 BHK",
      floors: "2 Floors",
      createdAt: new Date().toISOString()
    });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};
