'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function MaterialsMarketplace() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMat, setSelectedMat] = useState<any>(null);

  const MOCK_MATERIALS = [
    { id: '1', name: 'Tata Tiscon 550SD TMT', category: 'Steel', price: '₹72,500 / MT', supplier: 'Tata Steel Direct', location: 'Jamshedpur', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1518557984649-7b161c230cfa?auto=format&fit=crop&q=80&w=800', contact: { phone: '+91 98765 43210', email: 'sales@tatasteel.com', address: 'Jamshedpur, Jharkhand', hours: 'Mon-Sat: 8 AM - 7 PM' } },
    { id: '2', name: 'OPC 53 Grade Cement', category: 'Cement', price: '₹380 / bag', supplier: 'UltraTech Cement', location: 'Rajasthan', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800', contact: { phone: '+91 98765 43211', email: 'info@ultratech.in', address: 'Rajasthan', hours: 'Mon-Sat: 9 AM - 6 PM' } },
    { id: '3', name: 'Asian Paints Royale', category: 'Paint', price: '₹4,200 / 20L', supplier: 'Asian Paints Pro', location: 'Mumbai', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800', contact: { phone: '+91 98765 43212', email: 'hello@asianpaints.com', address: 'Mumbai, MH', hours: 'Mon-Sun: 10 AM - 8 PM' } },
    { id: '4', name: 'Kajaria Vitrified Tiles', category: 'Flooring', price: '₹65 / sq.ft', supplier: 'Elegance Ceramics', location: 'Salt Lake', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800', contact: { phone: '+91 98765 43213', email: 'orders@eleganceceramics.in', address: 'Sector 5, Salt Lake, Kolkata', hours: 'Tue-Sun: 10 AM - 7 PM' } },
    { id: '5', name: 'Premium River Sand', category: 'Aggregate', price: '₹11,200 / MT', supplier: 'Coastal Minerals', location: 'Kochi', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&q=80&w=800', contact: { phone: '+91 98765 43214', email: 'sales@coastalminerals.in', address: 'Marine Drive, Kochi', hours: 'Mon-Sat: 7 AM - 6 PM' } },
    { id: '6', name: 'Fly Ash Bricks', category: 'Masonry', price: '₹18.5 / piece', supplier: 'EcoBrick Distributors', location: 'Delhi', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=800', contact: { phone: '+91 98765 43215', email: 'hello@ecobrick.com', address: 'Okhla Phase 1, Delhi', hours: 'Mon-Sat: 9 AM - 6 PM' } },
    { id: '7', name: 'AAC Blocks (600x200)', category: 'Masonry', price: '₹3,800 / CBM', supplier: 'Magicrete', location: 'Surat', stock: 'Low Stock', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800', contact: { phone: '+91 98765 43216', email: 'support@magicrete.in', address: 'GIDC, Surat', hours: 'Mon-Fri: 10 AM - 6 PM' } },
    { id: '8', name: 'White Marble Flooring', category: 'Flooring', price: '₹1,180 / sqft', supplier: 'Rajputana Marbles', location: 'Udaipur', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', contact: { phone: '+91 98765 43217', email: 'info@rajputanamarbles.com', address: 'Sukher, Udaipur', hours: 'Mon-Sun: 9 AM - 8 PM' } },
    { id: '9', name: 'Teak Wood Planks', category: 'Wood', price: '₹3,500 / sqft', supplier: 'Kerala Timbers', location: 'Trivandrum', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800', contact: { phone: '+91 98765 43218', email: 'sales@keralatimbers.com', address: 'Chalai Market, Trivandrum', hours: 'Mon-Sat: 8 AM - 6 PM' } },
    { id: '10', name: 'UPVC Windows', category: 'Fittings', price: '₹4,500 / window', supplier: 'Fenesta Direct', location: 'Pune', stock: 'Low Stock', image: 'https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?auto=format&fit=crop&q=80&w=800', contact: { phone: '+91 98765 43219', email: 'orders@fenesta.in', address: 'Hinjewadi, Pune', hours: 'Mon-Sat: 10 AM - 7 PM' } }
  ];

  useEffect(() => {
    setMaterials(MOCK_MATERIALS);
    setLoading(false);
  }, []);

  const filteredMaterials = materials.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 bg-slate-950">
      <Navbar />

      {/* Background Glows */}
      <div className="glow-sphere top-20 right-1/4 w-[400px] h-[400px] bg-rose-600/10" />

      {/* Contact Modal */}
      {selectedMat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={() => setSelectedMat(null)}
        >
          <div
            className="glass-card w-full max-w-md p-8 border-rose-500/30 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedMat(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-500/30 transition-all"
            >
              <i className="bx bx-x text-lg text-white"></i>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-2xl text-rose-500">
                <i className={`bx ${
                  selectedMat.category === 'Steel' ? 'bx-radar' :
                  selectedMat.category === 'Cement' ? 'bx-square-rounded' :
                  selectedMat.category === 'Paint' ? 'bx-color-fill' : 'bx-grid-alt'
                }`}></i>
              </div>
              <div>
                <h3 className="font-black text-lg text-white leading-tight">{selectedMat.name}</h3>
                <p className="text-[10px] text-rose-400 font-black uppercase tracking-widest">{selectedMat.supplier}</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <i className="bx bx-phone text-rose-500 text-xl mt-0.5"></i>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-white font-bold">{selectedMat.contact?.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <i className="bx bx-envelope text-rose-500 text-xl mt-0.5"></i>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Email</p>
                  <p className="text-white font-bold">{selectedMat.contact?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <i className="bx bx-map text-rose-500 text-xl mt-0.5"></i>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Address</p>
                  <p className="text-white font-bold text-sm">{selectedMat.contact?.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <i className="bx bx-time text-rose-500 text-xl mt-0.5"></i>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Working Hours</p>
                  <p className="text-white font-bold">{selectedMat.contact?.hours}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${selectedMat.contact?.phone}`}
                className="btn-primary text-center text-xs py-3.5 flex items-center justify-center gap-2"
              >
                <i className="bx bx-phone"></i> Call Now
              </a>
              <a
                href={`mailto:${selectedMat.contact?.email}`}
                className="btn-secondary text-center text-xs py-3.5 flex items-center justify-center gap-2"
              >
                <i className="bx bx-envelope"></i> Email
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
          <div className="space-y-4">
            <h1 className="text-6xl font-black uppercase tracking-tighter leading-none italic">
              Supply <span className="text-gradient-rose">Chain</span>
            </h1>
            <p className="text-slate-500 max-w-lg font-medium">Source industrial-grade raw materials directly from verified local distributors at wholesale rates.</p>
          </div>
          <div className="glass-card flex items-center px-8 py-2 w-full md:w-[450px] border-white/5 shadow-2xl">
            <i className="bx bx-search text-rose-500 mr-4 text-2xl"></i>
            <input
              type="text"
              placeholder="Filter materials (Cement, Steel...)"
              className="bg-transparent border-none outline-none text-white w-full py-5 text-sm font-bold uppercase tracking-widest placeholder:text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {loading ? (
             [1,2,3,4].map(n => <div key={n} className="glass-card h-96 animate-pulse"></div>)
           ) : (
             filteredMaterials.map((mat) => (
               <div key={mat.id} className="glass-card flex flex-col group hover:-translate-y-2 hover:border-rose-500/30 transition-all duration-500 border-white/5 overflow-hidden">

                  {/* Image Banner */}
                  <div className="h-44 relative overflow-hidden flex-shrink-0">
                    <img
                      src={mat.image}
                      alt={mat.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-rose-400">
                      {mat.category}
                    </span>
                    <span className={`absolute top-3 right-3 text-[9px] px-2 py-1 rounded-md font-black border uppercase tracking-tighter ${mat.stock === 'In Stock' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-rose-400 border-rose-500/30 bg-rose-500/10'}`}>
                      {mat.stock}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1 relative">
                    <div className="absolute -right-5 -top-5 opacity-5 group-hover:opacity-10 transition-opacity">
                      <i className={`bx ${mat.category === 'Steel' ? 'bx-cube-alt' : 'bx-layer'} text-8xl`}></i>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all border border-white/5 flex-shrink-0">
                        <i className={`bx ${
                          mat.category === 'Steel' ? 'bx-radar' :
                          mat.category === 'Cement' ? 'bx-square-rounded' :
                          mat.category === 'Paint' ? 'bx-color-fill' : 'bx-grid-alt'
                        }`}></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm leading-tight group-hover:text-white transition-colors">{mat.name}</h3>
                      </div>
                    </div>

                    <div className="mt-auto space-y-4">
                      <div className="flex justify-between items-end">
                        <p className="text-xl font-black text-white tracking-tighter">{mat.price}</p>
                      </div>
                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <span className="flex items-center gap-1.5"><i className="bx bxs-user-circle text-xs text-rose-500"></i> {mat.supplier}</span>
                          <span className="flex items-center gap-1.5"><i className="bx bx-map-pin text-xs"></i> {mat.location}</span>
                        </div>
                        <button
                          onClick={() => setSelectedMat(mat)}
                          className="w-full btn-secondary !py-2.5 !text-[10px] !uppercase !tracking-widest !rounded-xl group-hover:!bg-rose-600 group-hover:!border-rose-600 transition-all"
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
