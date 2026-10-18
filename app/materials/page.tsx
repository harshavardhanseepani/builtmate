'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function MaterialsMarketplace() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMat, setSelectedMat] = useState<any>(null);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const MOCK_MATERIALS = [
    { id: '1', name: 'Tata Tiscon 550SD TMT', category: 'Steel', price: '₹72,500 / MT', supplier: 'Tata Steel Direct', location: 'Jamshedpur', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1518557984649-7b161c230cfa?auto=format&fit=crop&q=80&w=800', dealerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43210', email: 'sales@tatasteel.com', address: 'Jamshedpur, Jharkhand', hours: 'Mon-Sat: 8 AM - 7 PM' } },
    { id: '2', name: 'OPC 53 Grade Cement', category: 'Cement', price: '₹380 / bag', supplier: 'UltraTech Cement Dealer', location: 'Rajasthan', stock: 'In Stock', image: '/api/materials/cement-image', dealerImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43211', email: 'orders@ultratech-cement.in', address: 'Plot 45, RIICO Industrial Area, Jodhpur, Rajasthan', hours: 'Mon-Sat: 8 AM - 6 PM' } },
    { id: '2b', name: 'PPC Cement (Fly-Ash Based)', category: 'Cement', price: '₹360 / bag', supplier: 'Ambuja Cements Dealer', location: 'Gujarat', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800', dealerImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43220', email: 'sales@ambujacement.in', address: 'Ambujanagar, Gujarat', hours: 'Mon-Sat: 9 AM - 6 PM' } },
    { id: '3', name: 'Asian Paints Royale', category: 'Paint', price: '₹4,200 / 20L', supplier: 'Asian Paints Pro', location: 'Mumbai', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800', dealerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43212', email: 'hello@asianpaints.com', address: 'Mumbai, MH', hours: 'Mon-Sun: 10 AM - 8 PM' } },
    { id: '4', name: 'Kajaria Vitrified Tiles', category: 'Flooring', price: '₹65 / sq.ft', supplier: 'Elegance Ceramics', location: 'Salt Lake', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800', dealerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43213', email: 'orders@eleganceceramics.in', address: 'Sector 5, Salt Lake, Kolkata', hours: 'Tue-Sun: 10 AM - 7 PM' } },
    { id: '5', name: 'Premium River Sand', category: 'Aggregate', price: '₹11,200 / MT', supplier: 'Coastal Minerals', location: 'Kochi', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&q=80&w=800', dealerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43214', email: 'sales@coastalminerals.in', address: 'Marine Drive, Kochi', hours: 'Mon-Sat: 7 AM - 6 PM' } },
    { id: '6', name: 'Fly Ash Bricks', category: 'Masonry', price: '₹18.5 / piece', supplier: 'EcoBrick Distributors', location: 'Delhi', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=800', dealerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43215', email: 'hello@ecobrick.com', address: 'Okhla Phase 1, Delhi', hours: 'Mon-Sat: 9 AM - 6 PM' } },
    { id: '7', name: 'AAC Blocks (600x200)', category: 'Masonry', price: '₹3,800 / CBM', supplier: 'Magicrete', location: 'Surat', stock: 'Low Stock', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800', dealerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43216', email: 'support@magicrete.in', address: 'GIDC, Surat', hours: 'Mon-Fri: 10 AM - 6 PM' } },
    { id: '8', name: 'White Marble Flooring', category: 'Flooring', price: '₹1,180 / sqft', supplier: 'Rajputana Marbles', location: 'Udaipur', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', dealerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43217', email: 'info@rajputanamarbles.com', address: 'Sukher, Udaipur', hours: 'Mon-Sun: 9 AM - 8 PM' } },
    { id: '9', name: 'Teak Wood Planks', category: 'Wood', price: '₹3,500 / sqft', supplier: 'Kerala Timbers', location: 'Trivandrum', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800', dealerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43218', email: 'sales@keralatimbers.com', address: 'Chalai Market, Trivandrum', hours: 'Mon-Sat: 8 AM - 6 PM' } },
    { id: '10', name: 'UPVC Windows', category: 'Fittings', price: '₹4,500 / window', supplier: 'Fenesta Direct', location: 'Pune', stock: 'Low Stock', image: 'https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?auto=format&fit=crop&q=80&w=800', dealerImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', contact: { phone: '+91 98765 43219', email: 'orders@fenesta.in', address: 'Hinjewadi, Pune', hours: 'Mon-Sat: 10 AM - 7 PM' } }
  ];

  useEffect(() => {
    setMaterials(MOCK_MATERIALS);
    setLoading(false);
  }, []);

  const categories = ['All', 'Cement', 'Steel', 'Paint', 'Flooring', 'Masonry', 'Aggregate', 'Wood', 'Fittings'];

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || m.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 bg-[#faf9f6] bg-texture-luxury font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      {/* Background Glows */}
      <div className="glow-sphere top-20 right-1/4 w-[400px] h-[400px] bg-amber-400/10" />

      {/* Contact Modal */}
      {selectedMat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedMat(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-md p-8 border-2 border-amber-300 shadow-[0_25px_60px_rgba(0,0,0,0.25),0_0_35px_rgba(212,175,55,0.15)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedMat(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center hover:bg-amber-200 text-slate-800 transition-all z-10 cursor-pointer"
            >
              <i className="bx bx-x text-lg"></i>
            </button>

            {/* Header with Product & Dealer Image */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-amber-100">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-300 flex-shrink-0 bg-slate-100 shadow-md">
                <img
                  src={selectedMat.image}
                  alt={selectedMat.name}
                  className="w-full h-full object-cover"
                  onError={(e: any) => {
                    e.currentTarget.src = 'https://5.imimg.com/data5/SELLER/Default/2026/1/573829326/JC/JH/YU/99417085/ultratech-cement-opc-53-500x500.jpeg';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-black uppercase tracking-widest text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-md inline-block mb-1">
                  {selectedMat.category}
                </span>
                <h3 className="font-bold text-lg text-slate-900 leading-tight truncate">{selectedMat.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={selectedMat.dealerImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100'}
                    alt={selectedMat.supplier}
                    className="w-5 h-5 rounded-full object-cover border border-amber-300"
                  />
                  <p className="text-xs text-amber-700 font-bold tracking-wide truncate">{selectedMat.supplier}</p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70">
                <i className="bx bx-phone text-amber-600 text-xl mt-0.5"></i>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-slate-900 font-bold">{selectedMat.contact?.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70">
                <i className="bx bx-envelope text-amber-600 text-xl mt-0.5"></i>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Email</p>
                  <p className="text-slate-900 font-bold">{selectedMat.contact?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70">
                <i className="bx bx-map text-amber-600 text-xl mt-0.5"></i>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Address</p>
                  <p className="text-slate-900 font-bold text-sm">{selectedMat.contact?.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70">
                <i className="bx bx-time text-amber-600 text-xl mt-0.5"></i>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Working Hours</p>
                  <p className="text-slate-900 font-bold">{selectedMat.contact?.hours}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${selectedMat.contact?.phone}`}
                className="btn-primary text-center text-xs py-3.5 flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <i className="bx bx-phone text-base"></i> Call Now
              </a>
              <a
                href={`mailto:${selectedMat.contact?.email}`}
                className="btn-secondary text-center text-xs py-3.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="bx bx-envelope text-base"></i> Email
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8">
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none text-slate-900">
              Supply <span className="text-gradient-gold-rich">Chain</span>
            </h1>
            <p className="text-slate-600 max-w-lg font-normal text-sm md:text-base">Source industrial-grade raw materials directly from verified local distributors at wholesale rates.</p>
          </div>
          <div className="glass-card-luxury flex items-center px-6 py-2 w-full md:w-[450px] rounded-2xl shadow-md border-amber-200/80 bg-white/90">
            <i className="hidden md:inline-block bx bx-search text-amber-600 mr-4 text-2xl"></i>
            <input
              type="text"
              placeholder="Filter materials (Cement, Steel...)"
              className="bg-transparent border-none outline-none text-slate-900 w-full py-3.5 text-sm font-bold uppercase tracking-wider placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25 ring-2 ring-amber-400/50 scale-105'
                  : 'bg-white/90 text-slate-600 hover:text-amber-800 border border-amber-200/80 hover:border-amber-400/80 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {loading ? (
             [1,2,3,4].map(n => <div key={n} className="glass-card h-96 animate-pulse"></div>)
           ) : (
             filteredMaterials.map((mat) => (
               <div key={mat.id} className="glass-card-luxury flex flex-col group hover:-translate-y-2 hover:border-amber-400 transition-all duration-500 border border-amber-200/80 rounded-3xl overflow-hidden bg-white/90 shadow-sm hover:shadow-xl">

                  {/* Image Banner */}
                  <div className="h-48 relative overflow-hidden flex-shrink-0 bg-slate-100">
                    <img
                      src={mat.image}
                      alt={mat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      onError={(e: any) => {
                        e.currentTarget.src = 'https://5.imimg.com/data5/SELLER/Default/2026/1/573829326/JC/JH/YU/99417085/ultratech-cement-opc-53-500x500.jpeg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-200 text-[9px] font-black uppercase tracking-widest text-amber-800 shadow-xs">
                      {mat.category}
                    </span>
                    <span className={`absolute top-3 right-3 text-[9px] px-2 py-1 rounded-md font-black border uppercase tracking-tighter ${mat.stock === 'In Stock' ? 'text-emerald-700 border-emerald-300 bg-emerald-50' : 'text-amber-800 border-amber-300 bg-amber-50'}`}>
                      {mat.stock}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1 relative bg-white/60">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="hidden sm:flex w-10 h-10 rounded-xl bg-amber-50 items-center justify-center text-xl text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all border border-amber-200 flex-shrink-0">
                        <i className={`bx ${
                          mat.category === 'Steel' ? 'bx-radar' :
                          mat.category === 'Cement' ? 'bx-square-rounded' :
                          mat.category === 'Paint' ? 'bx-color-fill' : 'bx-grid-alt'
                        }`}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 leading-tight group-hover:text-amber-800 transition-colors">{mat.name}</h3>
                      </div>
                    </div>

                    <div className="mt-auto space-y-4">
                      <div className="flex justify-between items-end">
                        <p className="font-display text-xl font-extrabold text-slate-900 tracking-tight">{mat.price}</p>
                      </div>
                      <div className="space-y-3 pt-4 border-t border-amber-100">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <span className="flex items-center gap-1.5 truncate max-w-[140px]">
                            <img
                              src={mat.dealerImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100'}
                              alt={mat.supplier}
                              className="w-4 h-4 rounded-full object-cover border border-amber-300 flex-shrink-0"
                            />
                            <span className="truncate">{mat.supplier}</span>
                          </span>
                          <span className="flex items-center gap-1.5 text-amber-700"><i className="bx bx-map-pin text-xs"></i> {mat.location}</span>
                        </div>
                        <button
                          onClick={() => setSelectedMat(mat)}
                          className="w-full py-2.5 text-[10px] uppercase tracking-widest rounded-xl bg-amber-50 border border-amber-300 text-slate-800 font-bold hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-500 hover:text-slate-950 hover:border-amber-400 transition-all shadow-xs cursor-pointer"
                        >
                          Contact Supplier
                        </button>
                      </div>
                    </div>
                  </div>

               </div>
             ))
           )}
        </div>
      </div>
    </main>
  );
}
