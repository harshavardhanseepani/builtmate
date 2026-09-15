// Firebase Seed Script - Run with: node seed-firebase.mjs
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAzJ-Im5LOJ6woC9GLROtulnYR1-KRlDoE",
  authDomain: "buildmate-1de0b.firebaseapp.com",
  projectId: "buildmate-1de0b",
  storageBucket: "buildmate-1de0b.appspot.com",
  messagingSenderId: "604598287628",
  appId: "1:604598287628:web:6519a2bd5264feda291d29",
  databaseURL: "https://buildmate-1de0b-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const builders = {
  b1: {
    id: "b1",
    name: "Ramesh Singh",
    company: "Apex Constructions",
    location: "Mumbai, Maharashtra",
    rating: "4.9",
    projects: "142",
    experience: "18 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    specialization: "Luxury Villas & High-Rise"
  },
  b2: {
    id: "b2",
    name: "Arjun Reddy",
    company: "BuildPro Solutions",
    location: "Hyderabad, TS",
    rating: "4.9",
    projects: "120",
    experience: "18 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    specialization: "Commercial & IT Parks"
  },
  b3: {
    id: "b3",
    name: "Arun Nair",
    company: "Nair Builders & Associates",
    location: "Chennai, Tamil Nadu",
    rating: "4.7",
    projects: "76",
    experience: "9 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    specialization: "Residential Apartments"
  },
  b4: {
    id: "b4",
    name: "Vijay Kumar",
    company: "VK Suppliers",
    location: "Chennai, TN",
    rating: "4.9",
    projects: "203",
    experience: "22 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    specialization: "Heritage & Modern Fusion"
  },
  b5: {
    id: "b5",
    name: "Meera Patel",
    company: "Patel Green Builders",
    location: "Ahmedabad, Gujarat",
    rating: "4.6",
    projects: "54",
    experience: "7 Yrs",
    verified: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    specialization: "Eco-Friendly & Sustainable"
  },
  b6: {
    id: "b6",
    name: "Suresh Reddy",
    company: "Reddy Skyline Projects",
    location: "Hyderabad, Telangana",
    rating: "4.8",
    projects: "119",
    experience: "15 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
    specialization: "Smart Homes & Automation"
  },
  b7: {
    id: "b7",
    name: "David Fernandez",
    company: "Urban Heights",
    location: "Goa",
    rating: "4.5",
    projects: "25",
    experience: "7 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&q=80&w=800",
    specialization: "Coastal Architecture"
  },
  b8: {
    id: "b8",
    name: "Amit Desai",
    company: "Desai Infrastructures",
    location: "Pune, Maharashtra",
    rating: "4.8",
    projects: "200",
    experience: "22 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=800",
    specialization: "Township Development"
  },
  b9: {
    id: "b9",
    name: "Neha Gupta",
    company: "GreenSpace Developers",
    location: "Delhi, NCR",
    rating: "4.7",
    projects: "55",
    experience: "9 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    specialization: "Green Building Standard"
  },
  b10: {
    id: "b10",
    name: "Karthik Rajan",
    company: "Rajan Civil Works",
    location: "Kochi, Kerala",
    rating: "4.9",
    projects: "75",
    experience: "11 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    specialization: "Kerala Style Villas"
  }
};

const materials = {
  m1: {
    id: "m1",
    name: "Tata Tiscon 550SD TMT",
    category: "Steel",
    price: "₹72,500/MT",
    stock: "In Stock",
    supplier: "Tata Steel Direct",
    location: "Jamshedpur",
    image: "https://images.unsplash.com/photo-1518557984649-7b161c230cfa?w=800&q=80"
  },
  m2: {
    id: "m2",
    name: "OPC 53 Grade Cement",
    category: "Cement",
    price: "₹380/Bag",
    stock: "In Stock",
    supplier: "UltraTech Cement",
    location: "Rajasthan",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
  },
  m3: {
    id: "m3",
    name: "Premium River Sand",
    category: "Aggregate",
    price: "₹11,200/MT",
    stock: "In Stock",
    supplier: "Coastal Minerals",
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&q=80"
  },
  m4: {
    id: "m4",
    name: "Asian Paints Royale",
    category: "Paint",
    price: "₹4,200/20L",
    stock: "In Stock",
    supplier: "Asian Paints Pro",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80"
  },
  m5: {
    id: "m5",
    name: "Fly Ash Bricks",
    category: "Masonry",
    price: "₹18.5/piece",
    stock: "In Stock",
    supplier: "EcoBrick Distributors",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&q=80"
  },
  m6: {
    id: "m6",
    name: "AAC Blocks (600x200)",
    category: "Masonry",
    price: "₹3,800/CBM",
    stock: "Low Stock",
    supplier: "Magicrete",
    location: "Surat",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  m7: {
    id: "m7",
    name: "UltraTech Cement (50kg)",
    category: "Cement",
    price: "₹380/bag",
    stock: "In Stock",
    supplier: "Sri Ram Steels",
    location: "Vijayanagar",
    image: "https://images.unsplash.com/photo-1565085360602-39a30c2c748a?w=800&q=80"
  },
  m8: {
    id: "m8",
    name: "White Marble Flooring",
    category: "Flooring",
    price: "₹1,180/sqft",
    stock: "In Stock",
    supplier: "Rajputana Marbles",
    location: "Udaipur",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
  },
  m9: {
    id: "m9",
    name: "Teak Wood Planks",
    category: "Wood",
    price: "₹3,500/sqft",
    stock: "In Stock",
    supplier: "Kerala Timbers",
    location: "Trivandrum",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80"
  },
  m10: {
    id: "m10",
    name: "UPVC Windows",
    category: "Fittings",
    price: "₹4,500/window",
    stock: "Low Stock",
    supplier: "Fenesta Direct",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?w=800&q=80"
  }
};

async function seed() {
  console.log("🌱 Seeding Firebase database...");
  
  try {
    await set(ref(db, 'builders'), builders);
    console.log("✅ Builders seeded successfully!");
    
    await set(ref(db, 'materials'), materials);
    console.log("✅ Materials seeded successfully!");
    
    console.log("\n🎉 Database seeded! Refresh your website to see the images.");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }

  process.exit(0);
}

seed();
