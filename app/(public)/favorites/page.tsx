'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/public/PropertyCard';
import VideoPlayerModal from '@/components/public/VideoPlayerModal';
import { PropertyItem } from '@/types';
import { getFavoriteIds } from '@/lib/utils';
import { Heart, Building2 } from 'lucide-react';

export default function FavoritesPage() {
  const [favoriteProperties, setFavoriteProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Video modal
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [activeVideoTitle, setActiveVideoTitle] = useState('');

  useEffect(() => {
    async function fetchFavorites() {
      const favIds = getFavoriteIds();
      if (favIds.length === 0) {
        setFavoriteProperties([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/properties');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const matched = json.data.filter((p: PropertyItem) => favIds.includes(p._id) || favIds.includes(p.id || ''));
          setFavoriteProperties(matched);
        }
      } catch (err) {
        console.error('Failed to load favorite properties', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();

    const handleUpdate = () => {
      fetchFavorites();
    };

    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, []);

  const handleOpenVideo = (url: string, title: string) => {
    setActiveVideoUrl(url);
    setActiveVideoTitle(title);
    setVideoModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center space-x-2 text-rose-600 mb-1 font-bold text-xs">
          <Heart className="w-4 h-4 fill-current" />
          <span>YOUR SAVED SHORTLIST</span>
        </div>
        <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
          Saved Favorite Properties
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Review and compare your saved real estate listings.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-96 bg-slate-200/60 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map((property) => (
            <PropertyCard
              key={property._id || property.id}
              property={property}
              onVideoClick={handleOpenVideo}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-navy-900">No saved properties yet</h3>
          <p className="text-sm text-slate-500">
            Click the heart icon on any property card to save your favorite luxury listings here.
          </p>
          <Link
            href="/properties"
            className="inline-block px-6 py-3 rounded-xl bg-navy-900 text-white font-bold text-xs shadow-md hover:bg-navy-800 transition-colors"
          >
            Explore Properties Catalog
          </Link>
        </div>
      )}

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
