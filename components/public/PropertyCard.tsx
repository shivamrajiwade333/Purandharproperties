'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyItem } from '@/types';
import { formatPrice, formatArea, getFavoriteIds, toggleFavoriteId } from '@/lib/utils';
import { MapPin, Bed, Bath, Maximize2, Heart, Video, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PropertyCardProps {
  property: PropertyItem;
  onVideoClick?: (videoUrl: string, title: string) => void;
}

export default function PropertyCard({ property, onVideoClick }: PropertyCardProps) {
  const { t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavoriteIds();
    const isFav = favorites.includes(property._id) || (property.id ? favorites.includes(property.id) : false);
    setIsFavorite(isFav);

    const handleUpdate = () => {
      const favs = getFavoriteIds();
      setIsFavorite(favs.includes(property._id) || (property.id ? favs.includes(property.id) : false));
    };

    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, [property._id, property.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavoriteId(property._id || property.id || '');
  };

  const hasVideo = property.videos && property.videos.length > 0;
  const firstVideo = hasVideo ? property.videos[0] : null;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Media & Badges Overlay */}
      <div className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden">
        <Image
          src={property.coverImage || property.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex flex-wrap gap-1.5 items-center">
            {property.featured && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500 text-slate-950 shadow-md">
                <Sparkles className="w-3 h-3 mr-1 fill-current" />
                {t('featured')}
              </span>
            )}
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold shadow-md ${
              property.listingType === 'Sale' ? 'bg-navy-900 text-white' : 'bg-brand-600 text-white'
            }`}>
              {property.listingType === 'Sale' ? t('forSale') : t('forRent')}
            </span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              isFavorite 
                ? 'bg-rose-600 text-white shadow-md scale-110' 
                : 'bg-black/30 text-white hover:bg-white hover:text-rose-600'
            }`}
            aria-label="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Media Badges (Status & Video Button) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          {/* Availability Status Badge */}
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
            property.status === 'Available'
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
              : property.status === 'Sold'
              ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
              : 'bg-amber-950/80 text-amber-300 border-amber-500/50'
          }`}>
            {property.status}
          </span>

          {/* Video Tour Badge button */}
          {hasVideo && firstVideo && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onVideoClick) onVideoClick(firstVideo.url, property.title);
              }}
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-600/90 hover:bg-rose-600 text-white backdrop-blur-md transition-colors shadow-sm"
            >
              <Video className="w-3.5 h-3.5 mr-1 animate-pulse" />
              {t('videoTour')}
            </button>
          )}
        </div>
      </div>

      {/* Property Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        
        <div className="space-y-1.5">
          {/* Price & Type */}
          <div className="flex flex-wrap items-baseline justify-between gap-1">
            <span className="text-lg sm:text-xl font-extrabold text-navy-900 tracking-tight">
              {formatPrice(property.price, property.listingType)}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
              {property.propertyType}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-navy-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
            <Link href={`/property/${property._id || property.slug}`}>
              {property.title}
            </Link>
          </h3>

          {/* Location */}
          <p className="text-xs text-slate-500 flex items-center font-medium line-clamp-1">
            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
            {property.address ? `${property.address}, ` : ''}{property.city}, {property.state}
          </p>
        </div>

        {/* Core Specs Grid */}
        {(() => {
          const isPlot = property.propertyType?.toLowerCase().includes('plot') || property.propertyType?.toLowerCase().includes('land');
          const areaText = formatArea(property.area);

          if (isPlot || (property.bedrooms === 0 && property.bathrooms === 0)) {
            return (
              <div className="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-xs font-semibold">
                <span className="text-slate-400 text-[10px] uppercase tracking-wider flex items-center">
                  <Maximize2 className="w-3.5 h-3.5 mr-1 text-brand-600" /> Plot Area
                </span>
                <span className="font-extrabold text-navy-900">{areaText || 'Plot / Land'}</span>
              </div>
            );
          }

          return (
            <div className="grid grid-cols-3 gap-1 sm:gap-2 py-2.5 px-2 sm:px-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-[11px] sm:text-xs font-semibold">
              <div className="flex flex-col items-center justify-center text-center min-w-0">
                <span className="text-slate-400 text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5 flex items-center truncate">
                  <Bed className="w-3 h-3 mr-0.5 sm:mr-1 text-brand-600 shrink-0" /> {t('beds')}
                </span>
                <span className="truncate">{property.bedrooms > 0 ? `${property.bedrooms}` : '-'}</span>
              </div>

              <div className="flex flex-col items-center justify-center text-center border-x border-slate-200 min-w-0 px-0.5">
                <span className="text-slate-400 text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5 flex items-center truncate">
                  <Bath className="w-3 h-3 mr-0.5 sm:mr-1 text-brand-600 shrink-0" /> {t('baths')}
                </span>
                <span className="truncate">{property.bathrooms > 0 ? `${property.bathrooms}` : '-'}</span>
              </div>

              <div className="flex flex-col items-center justify-center text-center min-w-0">
                <span className="text-slate-400 text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5 flex items-center truncate">
                  <Maximize2 className="w-3 h-3 mr-0.5 sm:mr-1 text-brand-600 shrink-0" /> {t('area')}
                </span>
                <span className="truncate">{areaText || '-'}</span>
              </div>
            </div>
          );
        })()}

        {/* Footer & Action button */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm truncate max-w-[50%]">
            {property.propertyType?.toLowerCase().includes('plot') || property.propertyType?.toLowerCase().includes('land') ? 'Plot / Land' : property.furnishing}
          </span>

          <Link
            href={`/property/${property._id || property.slug}`}
            className="inline-flex items-center text-xs font-bold text-navy-900 group-hover:text-brand-600 transition-colors py-1"
          >
            {t('viewDetails')} &rarr;
          </Link>
        </div>

      </div>

    </div>
  );
}
