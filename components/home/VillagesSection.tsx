'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/shared/ScrollReveal';

const popularLocations = [
  { city: 'Saswad', state: 'Purandhar Taluka', count: 'Capital Town Listings', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
  { city: 'Jejuri', state: 'Purandhar Taluka', count: 'Temple Highway Units', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80' },
  { city: 'Narayanpur', state: 'Purandhar Taluka', count: 'Fort Foothill Farmhouses', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80' },
  { city: 'Dive', state: 'Purandhar Taluka', count: 'Highway NA Residential Plots', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' },
];

export default function VillagesSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal animation="fade-up">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
            {t('exploreVillagesTitle')}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            {t('exploreVillagesSubtitle')}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {popularLocations.map((loc, idx) => (
          <ScrollReveal key={loc.city} animation="pop-up" delay={idx * 80} className="h-full">
            <Link
              href={`/properties?location=${encodeURIComponent(loc.city)}`}
              className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-slate-200/80 hover:shadow-2xl transition-all block"
            >
              <Image
                src={loc.img}
                alt={loc.city}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] sm:text-xs font-semibold text-brand-400 uppercase tracking-widest block mb-0.5">
                  {loc.state}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-sans">{loc.city}</h3>
                <span className="text-[11px] sm:text-xs text-slate-300 font-medium block mt-0.5">
                  {loc.count}
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
