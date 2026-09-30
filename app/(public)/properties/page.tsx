'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PropertyCard from '@/components/public/PropertyCard';
import VideoPlayerModal from '@/components/public/VideoPlayerModal';
import { PropertyItem } from '@/types';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Building2, 
  MapPin, 
  DollarSign, 
  BedDouble, 
  Bath, 
  Maximize2,
  Check
} from 'lucide-react';

function SearchCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for properties & API
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Video modal
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [activeVideoTitle, setActiveVideoTitle] = useState('');

  // Filter States initialized from URL params
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [location, setLocation] = useState(searchParams.get('location') || searchParams.get('city') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'All');
  const [listingType, setListingType] = useState(searchParams.get('listingType') || 'All');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || 'All');
  const [bathrooms, setBathrooms] = useState(searchParams.get('bathrooms') || 'All');
  const [furnishing, setFurnishing] = useState(searchParams.get('furnishing') || 'All');
  const [status, setStatus] = useState(searchParams.get('status') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get('amenities') ? searchParams.get('amenities')!.split(',') : []
  );

  const availableAmenities = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Lift', 'Garden', 
    'Club House', 'CCTV', 'Power Backup', 'Water Supply', 'EV Charging', 'Wi-Fi'
  ];

  // Fetch properties whenever filters change
  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set('query', query);
        if (location) params.set('location', location);
        if (propertyType !== 'All') params.set('propertyType', propertyType);
        if (listingType !== 'All') params.set('listingType', listingType);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
        if (bedrooms !== 'All') params.set('bedrooms', bedrooms);
        if (bathrooms !== 'All') params.set('bathrooms', bathrooms);
        if (furnishing !== 'All') params.set('furnishing', furnishing);
        if (status !== 'All') params.set('status', status);
        if (sortBy) params.set('sortBy', sortBy);

        const res = await fetch(`/api/properties?${params.toString()}`);
        const json = await res.json();
        
        if (json.success && Array.isArray(json.data)) {
          let list: PropertyItem[] = json.data;
          
          // Client side amenity filter if selected
          if (selectedAmenities.length > 0) {
            list = list.filter(p => 
              selectedAmenities.every(amenity => p.amenities && p.amenities.includes(amenity))
            );
          }

          setProperties(list);
        }
      } catch (err) {
        console.error('Error fetching property search results:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [query, location, propertyType, listingType, minPrice, maxPrice, bedrooms, bathrooms, furnishing, status, sortBy, selectedAmenities]);

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleResetFilters = () => {
    setQuery('');
    setLocation('');
    setPropertyType('All');
    setListingType('All');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('All');
    setBathrooms('All');
    setFurnishing('All');
    setStatus('All');
    setSortBy('newest');
    setSelectedAmenities([]);
    router.push('/properties');
  };

  const handleOpenVideo = (url: string, title: string) => {
    setActiveVideoUrl(url);
    setActiveVideoTitle(title);
    setVideoModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
            Search Properties
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Showing <span className="font-bold text-navy-900">{properties.length}</span> verified properties matching your filters
          </p>
        </div>

        {/* View Switcher & Sorting */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-500 hover:text-navy-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-500 hover:text-navy-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-navy-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="area_desc">Area: High to Low</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full bg-navy-900 text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-between transition-colors"
        >
          <span className="flex items-center text-sm">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-brand-400" />
            {showMobileFilters ? 'Hide Search Filters' : 'Filter Properties'}
          </span>
          <span className="text-xs bg-brand-600 px-2.5 py-1 rounded-md">
            {properties.length} Results
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Filter Panel */}
        <aside className={`lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs h-fit sticky top-24 ${
          showMobileFilters ? 'block mb-6' : 'hidden lg:block'
        }`}>
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-navy-900 flex items-center">
              <SlidersHorizontal className="w-4 h-4 mr-2 text-brand-600" />
              Filter Properties
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center transition-colors"
            >
              <RotateCcw className="w-3 h-3 mr-1" /> Reset
            </button>
          </div>

          {/* Search Keyword */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Keyword Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Title, description, project..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Location / City</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Pune, Goa, Mumbai..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Listing Type (Buy / Rent) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Listing Type</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
              {['All', 'Sale', 'Rent'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setListingType(type)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    listingType === type ? 'bg-navy-900 text-white shadow-xs' : 'text-slate-600 hover:text-navy-900'
                  }`}
                >
                  {type === 'Sale' ? 'Buy' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
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

          {/* Price Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Price Range (₹)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Bedrooms</label>
            <div className="flex flex-wrap gap-1.5">
              {['All', '1', '2', '3', '4+'].map((bed) => (
                <button
                  key={bed}
                  type="button"
                  onClick={() => setBedrooms(bed)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    bedrooms === bed
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {bed === 'All' ? 'Any' : `${bed} BHK`}
                </button>
              ))}
            </div>
          </div>

          {/* Furnishing Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Furnishing</label>
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">Any Furnishing</option>
              <option value="Unfurnished">Unfurnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Fully Furnished">Fully Furnished</option>
            </select>
          </div>

          {/* Amenities Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-600 uppercase block">Amenities</label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {availableAmenities.map((amenity) => {
                const checked = selectedAmenities.includes(amenity);
                return (
                  <label key={amenity} className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer hover:text-navy-900">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAmenity(amenity)}
                      className="rounded-sm text-brand-600 focus:ring-brand-500 h-3.5 w-3.5"
                    />
                    <span>{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>

        </aside>

        {/* Right Main Catalog Grid */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 4, 5].map((n) => (
                <div key={n} className="h-96 bg-slate-200/60 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
              {properties.map((property) => (
                <PropertyCard
                  key={property._id || property.id}
                  property={property}
                  onVideoClick={handleOpenVideo}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-navy-900">No properties found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                We couldn't find any property listings matching your selected search criteria. Try adjusting or clearing your filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-bold shadow-md hover:bg-navy-800 transition-colors inline-flex items-center"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-2" /> Clear Filters
              </button>
            </div>
          )}
        </main>

      </div>

      {/* Video Modal Player */}
      <VideoPlayerModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={activeVideoUrl}
        title={activeVideoTitle}
      />

    </div>
  );
}

export default function SearchCatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading properties...</div>}>
      <SearchCatalogContent />
    </Suspense>
  );
}
