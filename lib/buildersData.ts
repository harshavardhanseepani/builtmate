export interface Builder {
  id: string;
  name: string;
  company: string;
  location: string;
  phone: string;
  email: string;
  available: boolean;
  availabilityNote: string;
  projects: number;
  experience: string;
  rating: number;
  verified: boolean;
  image: string;
  description: string;
  specialization: string;
  portfolio: string[];
}

export const BUILDERS_LIST: Builder[] = [
  {
    id: '1',
    name: 'Ramesh Singh',
    company: 'Apex Constructions',
    location: 'Mumbai, MH',
    phone: '+91 98201 44820',
    email: 'contact@apexconstructions.in',
    available: true,
    availabilityNote: 'Available Now',
    projects: 45,
    experience: '12 Yrs',
    rating: 4.8,
    verified: true,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    description: 'Premier residential builder specializing in earthquake-resistant high-rise villas and sustainable modern bungalows across Mumbai and Thane.',
    specialization: 'Luxury Villas & High-End Residences',
    portfolio: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '2',
    name: 'Arjun Reddy',
    company: 'BuildPro Solutions',
    location: 'Hyderabad, TS',
    phone: '+91 98490 23114',
    email: 'projects@buildprosolutions.com',
    available: true,
    availabilityNote: 'Available Now',
    projects: 120,
    experience: '18 Yrs',
    rating: 4.9,
    verified: true,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    description: 'End-to-end turnkey engineering and architectural construction serving Jubilee Hills, Gachibowli, and Cyberabad tech corridors.',
    specialization: 'Contemporary Smart Homes & Duplexes',
    portfolio: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '3',
    name: 'Priya Sharma',
    company: 'Sharma Architects & Builders',
    location: 'Bangalore, KA',
    phone: '+91 98860 78201',
    email: 'hello@sharmaarchitects.co',
    available: true,
    availabilityNote: 'Available Now',
    projects: 32,
    experience: '8 Yrs',
    rating: 4.7,
    verified: true,
    image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800',
    description: 'Biophilic architectural firm blending lush courtyards, rainwater harvesting, and modern open floor plans in Whitefield and Indiranagar.',
    specialization: 'Eco-Friendly Biophilic Villas',
    portfolio: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '4',
    name: 'Vijay Kumar',
    company: 'VK Structural Builders',
    location: 'Chennai, TN',
    phone: '+91 94440 55912',
    email: 'contact@vkbuilders.in',
    available: false,
    availabilityNote: 'Booked until Nov 2026',
    projects: 85,
    experience: '15 Yrs',
    rating: 4.6,
    verified: true,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    description: 'Expertise in traditional Dravidian teak carpentry fused with cutting-edge reinforced RCC column engineering along ECR and OMR.',
    specialization: 'Coastal & Traditional Architecture',
    portfolio: [
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '5',
    name: 'Sneha Patel',
    company: 'Patel Builders & Infra',
    location: 'Ahmedabad, GJ',
    phone: '+91 98250 89341',
    email: 'info@patelbuilders.com',
    available: true,
    availabilityNote: 'Available Now',
    projects: 60,
    experience: '10 Yrs',
    rating: 4.9,
    verified: true,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
    description: 'Pioneers in high-density AAC block construction, modern exposed brick facades, and luxury row houses in SG Highway and Bopal.',
    specialization: 'Modern Brick & Minimalist Mansions',
    portfolio: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '6',
    name: 'David Fernandez',
    company: 'Urban Heights Goa',
    location: 'Goa, GA',
    phone: '+91 98221 67432',
    email: 'enquiry@urbanheightsgoa.com',
    available: true,
    availabilityNote: 'Available Now',
    projects: 25,
    experience: '7 Yrs',
    rating: 4.5,
    verified: true,
    image: 'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&q=80&w=800',
    description: 'Bespoke Indo-Portuguese coastal villas with clay-tiled sloping roofs, expansive verandas, and resort-grade private pools.',
    specialization: 'Portuguese Heritage & Resort Villas',
    portfolio: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '7',
    name: 'Amit Desai',
    company: 'Desai Infrastructures',
    location: 'Pune, MH',
    phone: '+91 98230 45678',
    email: 'projects@desaiinfrastructures.in',
    available: false,
    availabilityNote: 'Fully Booked Q4',
    projects: 200,
    experience: '22 Yrs',
    rating: 4.8,
    verified: true,
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=800',
    description: 'Two decades of structural excellence delivering gated villa communities and multi-storey family estates in Baner and Hinjewadi.',
    specialization: 'Large-Scale Family Compounds',
    portfolio: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '8',
    name: 'Neha Gupta',
    company: 'GreenSpace Developers',
    location: 'Delhi, DL',
    phone: '+91 98110 99823',
    email: 'contact@greenspacedevelopers.org',
    available: true,
    availabilityNote: 'Available Now',
    projects: 55,
    experience: '9 Yrs',
    rating: 4.7,
    verified: true,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    description: 'Energy-neutral modern architecture with integrated solar facades, thermal insulation, and advanced double-glazed fenestrations in NCR.',
    specialization: 'Solar & Net-Zero Residences',
    portfolio: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '9',
    name: 'Rahul Verma',
    company: 'Verma Constructors',
    location: 'Lucknow, UP',
    phone: '+91 94150 12389',
    email: 'support@vermaconstructors.in',
    available: true,
    availabilityNote: 'Available Now',
    projects: 40,
    experience: '14 Yrs',
    rating: 4.6,
    verified: true,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional Awadhi architectural revival integrated with modern reinforced concrete construction in Gomti Nagar.',
    specialization: 'Colonial & Neo-Classical Homes',
    portfolio: [
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '10',
    name: 'Karthik Rajan',
    company: 'Rajan Civil Works',
    location: 'Kochi, KL',
    phone: '+91 98470 33490',
    email: 'projects@rajancivilworks.com',
    available: true,
    availabilityNote: 'Available Now',
    projects: 75,
    experience: '11 Yrs',
    rating: 4.9,
    verified: true,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    description: 'Renowned for monsoon-proof Kerala heritage villas featuring intricate wooden eaves, ventilated attics, and laterite stone craftsmanship.',
    specialization: 'Kerala Heritage & Waterfront Homes',
    portfolio: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
    ]
  }
];
