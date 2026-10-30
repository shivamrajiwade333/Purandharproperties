'use client';

import React from 'react';
import Link from 'next/link';
import { PropertyItem } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import PropertyCard from '@/components/property/PropertyCard';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { ArrowRight } from 'lucide-react';

interface LatestListingsSectionProps {
  properties: PropertyItem[];
  onOpenVideo: (url: string, title: string) => void;
}

export default function LatestListingsSection({
  properties,
  onOpenVideo,
}: LatestListingsSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
              {t('latestListingsTitle')}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              {t('latestListingsSubtitle')}
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-800 mt-3 md:mt-0 group"
          >
            <span>{t('viewAllListings')} ({properties.length})</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>

      {/* Grid of Latest 6 Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {properties.map((property, idx) => (
          <ScrollReveal key={property._id || property.id} animation="pop-up" delay={(idx % 3) * 100} className="h-full">
            <PropertyCard
              property={property}
              onVideoClick={onOpenVideo}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
