'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/public/Hero';
import PropertyCard from '@/components/public/PropertyCard';
import VideoPlayerModal from '@/components/public/VideoPlayerModal';
import { PropertyItem } from '@/types';
import { 
  Building2, 
  Home, 
  Building, 
  Landmark, 
  Store, 
  Trees, 
  ShieldCheck, 
  Award, 
  Headphones, 
  Play, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<PropertyItem[]>([]);
  const [latestProperties, setLatestProperties] = useState<PropertyItem[]>([]);
  const [videoProperties, setVideoProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [activeVideoTitle, setActiveVideoTitle] = useState('');

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const res = await fetch('/api/properties?publishStatus=Published');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const list: PropertyItem[] = json.data;
          setFeaturedProperties(list.filter(p => p.featured));
          setLatestProperties(list.slice(0, 6));
          setVideoProperties(list.filter(p => p.videos && p.videos.length > 0));
        }
      } catch (err) {
        console.error('Failed to fetch home page properties', err);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeData();
  }, []);

  const handleOpenVideo = (url: string, title: string) => {
    setActiveVideoUrl(url);
    setActiveVideoTitle(title);
    setVideoModalOpen(true);
  };

  const propertyTypesList = [
    { name: 'Apartment', icon: Building2, count: 'Saswad & Jejuri' },
    { name: 'Villa', icon: Home, count: 'Purandhar Foothills' },
    { name: 'Flat', icon: Building, count: 'Town Center Units' },
    { name: 'Plot / Land', icon: Landmark, count: 'Dive & Belsar Plots' },
    { name: 'Commercial Property', icon: Store, count: 'Saswad Main Market' },
    { name: 'Farmhouse', icon: Trees, count: 'Narayanpur & Walhe' },
  ];

  const popularLocations = [
    { city: 'Saswad', state: 'Purandhar Taluka', count: 'Capital Town Listings', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
    { city: 'Jejuri', state: 'Purandhar Taluka', count: 'Temple Highway Units', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80' },
    { city: 'Narayanpur', state: 'Purandhar Taluka', count: 'Fort Foothill Farmhouses', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80' },
    { city: 'Dive', state: 'Purandhar Taluka', count: 'Highway NA Residential Plots', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <Hero />

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center space-x-1 text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              PURANDHAR TALUKA HIGHLIGHTS
            </div>
            <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
              Featured Properties in Purandhar
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Top verified homes, plots, and commercial units across Saswad, Jejuri, Narayanpur, and Dive.
            </p>
          </div>
          <Link
            href="/properties?featured=true"
            className="inline-flex items-center text-sm font-bold text-brand-700 hover:text-brand-800 mt-4 md:mt-0 group"
          >
            <span>Explore All Featured</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-slate-200/60 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.slice(0, 3).map((property) => (
              <PropertyCard
                key={property._id || property.id}
                property={property}
                onVideoClick={handleOpenVideo}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">No featured properties available at the moment.</p>
        )}
      </section>

      {/* Browse by Property Type */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
              Browse Properties by Type
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Discover apartments, agricultural plots, and farmhouses tailored to Purandhar Taluka.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {propertyTypesList.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.name}
                  href={`/properties?propertyType=${encodeURIComponent(item.name)}`}
                  className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-brand-500/50 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-brand-500 text-slate-700 group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                      {item.count}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Tours Highlight Section */}
      {videoProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-3">
                <Play className="w-3.5 h-3.5 mr-1 fill-current" /> VIRTUAL WALKTHROUGHS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
                Experience Purandhar Property Video Tours
              </h2>
              <p className="text-slate-300 text-sm mt-2">
                Take virtual video walkthroughs of luxury homes, plots, and farmhouses in Purandhar Taluka.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {videoProperties.slice(0, 3).map((prop) => {
                const video = prop.videos[0];
                return (
                  <div
                    key={prop._id || prop.id}
                    onClick={() => handleOpenVideo(video.url, prop.title)}
                    className="group relative aspect-16/10 rounded-2xl overflow-hidden cursor-pointer border border-slate-800 shadow-lg"
                  >
                    <Image
                      src={prop.coverImage || prop.images[0]}
                      alt={prop.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm bg-black/60 text-brand-400">
                        {prop.city}
                      </span>
                      <h4 className="text-sm font-bold mt-1 line-clamp-1 group-hover:text-brand-300 transition-colors">
                        {prop.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Latest Properties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
              Latest Property Listings in Purandhar
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Freshly added homes, apartments, plots, and shops across Purandhar Taluka.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center text-sm font-bold text-brand-700 hover:text-brand-800 mt-4 md:mt-0 group"
          >
            <span>View All Listings ({latestProperties.length})</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProperties.map((property) => (
            <PropertyCard
              key={property._id || property.id}
              property={property}
              onVideoClick={handleOpenVideo}
            />
          ))}
        </div>
      </section>

      {/* Browse by Purandhar Taluka Villages/Towns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
            Explore Properties Across Purandhar Taluka
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Discover real estate listings across the major towns and villages of Purandhar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularLocations.map((loc) => (
            <Link
              key={loc.city}
              href={`/properties?location=${encodeURIComponent(loc.city)}`}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-md border border-slate-200/80 hover:shadow-2xl transition-all"
            >
              <Image
                src={loc.img}
                alt={loc.city}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest block mb-0.5">
                  {loc.state}
                </span>
                <h3 className="text-2xl font-bold font-sans">{loc.city}</h3>
                <span className="text-xs text-slate-300 font-medium block mt-1">
                  {loc.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
              THE PURANDHAR PROPERTIES ADVANTAGE
            </span>
            <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
              Why Homebuyers & Investors Trust Purandhar Properties
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-900">100% Purandhar Local Focus</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated exclusively to verified properties, NA plots, and homes across Purandhar Taluka.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 mx-auto flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-900">Direct Owner & Agent Contact</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect instantly via Call or WhatsApp directly with verified property owners and local agents in Purandhar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-base font-bold text-navy-900">HD Virtual Video Tours</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Experience full-screen property video tours before taking the time to schedule on-site visits in Saswad or Jejuri.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-900">End-to-End Assistance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                From title verification to 7/12 land extract checks, our team guides you at every step in Purandhar.
              </p>
            </div>
          </div>
        </div>
      </section>

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
