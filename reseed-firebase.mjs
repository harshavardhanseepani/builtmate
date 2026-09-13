// Updated Firebase Seed Script
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

// Each builder has unique portfolio images and description
const builders = {
  b1: {
    id: "b1",
    name: "Rajesh Kumar",
    company: "Kumar Constructions",
    location: "Mumbai, Maharashtra",
    rating: "4.9",
    projects: "142",
    experience: "18 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    specialization: "Luxury Villas & High-Rise",
    description: "Kumar Constructions has been redefining Mumbai's skyline for 18 years. We specialize in delivering luxury high-rise residential and commercial complexes with unmatched precision, using modern construction methodologies and sustainable practices.",
    portfolio: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80"
    ]
  },
  b2: {
    id: "b2",
    name: "Priya Sharma",
    company: "Sharma Infra Pvt Ltd",
    location: "Bangalore, Karnataka",
    rating: "4.8",
    projects: "98",
    experience: "12 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    specialization: "Commercial & IT Parks",
    description: "Sharma Infra is Bangalore's leading commercial construction firm. With 12 years of excellence, we have delivered world-class IT campuses, co-working spaces, and tech parks for Fortune 500 companies across Karnataka.",
    portfolio: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&q=80"
    ]
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
    specialization: "Residential Apartments",
    description: "Nair Builders brings a fresh perspective to residential construction in Chennai. Focused on smart layouts, quality finishes, and timely delivery, we've helped over 500 families settle into their dream homes across Tamil Nadu.",
    portfolio: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
    ]
  },
  b4: {
    id: "b4",
    name: "Vikram Singh",
    company: "Singh Heritage Homes",
    location: "Delhi, NCR",
    rating: "4.9",
    projects: "203",
    experience: "22 Yrs",
    verified: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    specialization: "Heritage & Modern Fusion",
    description: "Singh Heritage Homes blends classical Rajasthani craftsmanship with contemporary architecture. With over 200 projects across Delhi NCR, we are the go-to firm for those who want elegance, heritage, and modern comfort under one roof.",
    portfolio: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80"
    ]
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
    specialization: "Eco-Friendly & Sustainable",
    description: "Patel Green Builders is pioneering eco-conscious construction in Gujarat. Every project is designed with solar integration, rainwater harvesting, and green-rated materials to minimize environmental impact without compromising on comfort.",
    portfolio: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80",
      "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=600&q=80"
    ]
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
    specialization: "Smart Homes & Automation",
    description: "Reddy Skyline Projects is Hyderabad's most innovative smart-home construction company. We integrate IoT-based automation, AI-driven energy management, and modern aesthetics to build homes that think for you.",
    portfolio: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=600&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&q=80"
    ]
  }
};

// Materials with UNIQUE images for all categories + contact details
const materials = {
  m1: {
    id: "m1",
    name: "Ultra-Grade TMT Steel",
    category: "Steel",
    price: "₹72,500/MT",
    stock: "In Stock",
    supplier: "Tata Steel Direct",
    location: "Jamshedpur",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
    contact: { phone: "+91 90000 11001", email: "sales@tatasteel-direct.in", address: "Tata Nagar, Jamshedpur, Jharkhand - 831001", hours: "Mon–Sat 9am–6pm" }
  },
  m2: {
    id: "m2",
    name: "OPC 53 Grade Cement",
    category: "Cement",
    price: "₹380/Bag",
    stock: "In Stock",
    supplier: "UltraTech Cement",
    location: "Rajasthan",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    contact: { phone: "+91 90002 22002", email: "orders@ultratech-raj.in", address: "Industrial Area Phase II, Jodhpur, Rajasthan - 342003", hours: "Mon–Sat 8am–5pm" }
  },
  m3: {
    id: "m3",
    name: "Premium River Sand",
    category: "Aggregate",
    price: "₹1,200/MT",
    stock: "In Stock",
    supplier: "Coastal Minerals Co.",
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&q=80",
    contact: { phone: "+91 90003 33003", email: "info@coastalminerals.in", address: "NH-66, Kozhikode, Kerala - 673001", hours: "Mon–Sun 7am–7pm" }
  },
  m4: {
    id: "m4",
    name: "Exterior Weather Shield Paint",
    category: "Paint",
    price: "₹4,200/20L",
    stock: "In Stock",
    supplier: "Asian Paints Pro",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
    contact: { phone: "+91 90004 44004", email: "proorders@asianpaints.com", address: "Asian Paints House, 6A Shantinagar, Mumbai - 400010", hours: "Mon–Sat 9am–6pm" }
  },
  m5: {
    id: "m5",
    name: "Fly Ash Bricks",
    category: "Masonry",
    price: "₹8.5/piece",
    stock: "In Stock",
    supplier: "EcoBrick Distributors",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&q=80",
    contact: { phone: "+91 90005 55005", email: "bulk@ecobrick.in", address: "Plot 22, Okhla Industrial Area, New Delhi - 110020", hours: "Mon–Sat 8am–6pm" }
  },
  m6: {
    id: "m6",
    name: "AAC Blocks (600x200x200)",
    category: "Masonry",
    price: "₹3,800/CBM",
    stock: "Low Stock",
    supplier: "Magicrete Building Solutions",
    location: "Surat",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    contact: { phone: "+91 90006 66006", email: "supply@magicrete.in", address: "Magicrete Park, Sachin GIDC, Surat, Gujarat - 394230", hours: "Mon–Fri 9am–5pm" }
  },
  m7: {
    id: "m7",
    name: "MS Hollow Square Pipe",
    category: "Steel",
    price: "₹62,000/MT",
    stock: "In Stock",
    supplier: "JSW Steel Direct",
    location: "Vijayanagar",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80",
    contact: { phone: "+91 90007 77007", email: "industrial@jsw-direct.in", address: "JSW Steel Plant, Toranagallu, Vijayanagar, Karnataka - 583275", hours: "Mon–Sat 8am–6pm" }
  },
  m8: {
    id: "m8",
    name: "White Marble Flooring",
    category: "Flooring",
    price: "₹180/sqft",
    stock: "In Stock",
    supplier: "Rajputana Marbles",
    location: "Udaipur",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    contact: { phone: "+91 90008 88008", email: "export@rajputanamarbles.com", address: "Marble Market, Hiran Magri, Udaipur, Rajasthan - 313001", hours: "Mon–Sat 10am–7pm" }
  }
};

async function seed() {
  console.log("🌱 Reseeding Firebase database...");
  try {
    await set(ref(db, 'builders'), builders);
    console.log("✅ Builders reseeded with unique portfolio images!");
    await set(ref(db, 'materials'), materials);
    console.log("✅ Materials reseeded with unique steel images + contact details!");
    console.log("\n🎉 Done! Refresh your website.");
  } catch (error) {
    console.error("❌ Error:", error);
  }
  process.exit(0);
}

seed();
