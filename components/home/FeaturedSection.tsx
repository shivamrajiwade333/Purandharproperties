'use client';

import React from 'react';
import Link from 'next/link';
import { PropertyItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import PropertyCard from '@/components/property/PropertyCard';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedSectionProps {
  properties: PropertyItem[];
  loading: boolean;
  onOpenVideo: (url: string, title: string) => void;
}

export default function FeaturedSection({
  properties,
  loading,
  onOpenVideo,
}: FeaturedSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center space-x-1 text-[11px] sm:text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              PURANDHAR TALUKA HIGHLIGHTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
              {t('featuredTitle')}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              {t('featuredSubtitle')}
            </p>
          </div>
          <Link
            href="/properties?featured=true"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 mt-3 md:mt-0 group"
          >
            <span>{t('exploreFeatured')}</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>

      {/* 3-State Conditional Rendering: Loading Skeletons vs Real Cards vs Empty */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 sm:h-96 bg-slate-200/60 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {properties.slice(0, 3).map((property, idx) => (
            <ScrollReveal key={property._id || property.id} animation="pop-up" delay={idx * 120} className="h-full">
              <PropertyCard
                property={property}
                onVideoClick={onOpenVideo}
              />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-center py-8 text-xs sm:text-sm">
          No featured properties available at the moment.
        </p>
      )}
    </section>
  );
}
