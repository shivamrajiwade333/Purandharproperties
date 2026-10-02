'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'All' | 'Sale' | 'Rent'>('All');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (activeTab !== 'All') params.set('listingType', activeTab);
    if (location) params.set('location', location);
    if (propertyType !== 'All') params.set('propertyType', propertyType);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative bg-navy-950 text-white min-h-[500px] sm:min-h-[580px] flex items-center justify-center overflow-hidden py-10 sm:py-16">
      
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-10000 hover:scale-100"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />

      {/* Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-900/60" />

      {/* Decorative Blur Circles */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Trust pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-semibold text-brand-300 mb-3 sm:mb-6 shadow-sm max-w-full">
          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-400 shrink-0" />
          <span className="truncate">Verified Real Estate Across Purandhar Taluka (Saswad, Jejuri, Dive...)</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Find a Place You'll Love in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-200">Purandhar Taluka</span>
        </h1>

        {/* Subheading */}
        <p className="mt-2.5 sm:mt-5 text-xs sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Explore verified homes, apartments, villas, agricultural plots, and commercial spaces across Purandhar Taluka.
        </p>

        {/* Search Card Container */}
        <div className="mt-6 sm:mt-10 max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 text-slate-900">
          
          {/* Buy / Rent / All Tabs */}
          <div className="flex items-center space-x-2 border-b border-slate-200/70 pb-3 mb-4 overflow-x-auto whitespace-nowrap no-scrollbar">
            {(['All', 'Sale', 'Rent'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 ${
                  activeTab === tab
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                }`}
              >
                {tab === 'All' ? 'ALL PROPERTIES' : tab === 'Sale' ? 'BUY PROPERTY' : 'RENT PROPERTY'}
              </button>
            ))}
          </div>

          {/* Search Inputs Grid */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-left">
            
            {/* Location */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-brand-600 shrink-0" /> Location / Area
              </label>
              <input
                type="text"
                placeholder="Saswad, Jejuri, Dive..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 shadow-2xs"
              />
            </div>

            {/* Property Type */}
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center">
                <Building className="w-3.5 h-3.5 mr-1 text-brand-600 shrink-0" /> Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 shadow-2xs"
              >
                <option value="All">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Flat">Flat</option>
                <option value="Villa">Villa</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Independent House">Independent House</option>
                <option value="Plot / Land">Plot / Land</option>
                <option value="Commercial Property">Commercial</option>
                <option value="Office">Office</option>
                <option value="Shop">Shop</option>
                <option value="Farmhouse">Farmhouse</option>
                <option value="PG / Hostel">PG / Hostel</option>
              </select>
            </div>

            {/* Search Submit Button */}
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all duration-200 active:scale-95 text-sm"
              >
                <Search className="w-4 h-4" />
                <span>SEARCH</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
