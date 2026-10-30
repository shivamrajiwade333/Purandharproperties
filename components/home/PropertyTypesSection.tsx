'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { 
  Building2, 
  Home, 
  Building, 
  Landmark, 
  Store, 
  Trees 
} from 'lucide-react';

const propertyTypesList = [
  { name: 'Apartment', icon: Building2, count: 'Saswad & Jejuri' },
  { name: 'Villa', icon: Home, count: 'Purandhar Foothills' },
  { name: 'Flat', icon: Building, count: 'Town Center Units' },
  { name: 'Plot / Land', icon: Landmark, count: 'Dive & Belsar Plots' },
  { name: 'Commercial Property', icon: Store, count: 'Saswad Main Market' },
  { name: 'Farmhouse', icon: Trees, count: 'Narayanpur & Walhe' },
];

export default function PropertyTypesSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-100/70 py-10 sm:py-16 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
              {t('browseByTypeTitle')}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2">
              {t('browseByTypeSubtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {propertyTypesList.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <ScrollReveal key={item.name} animation="pop-up" delay={idx * 60} className="h-full">
                <Link
                  href={`/properties?propertyType=${encodeURIComponent(item.name)}`}
                  className="group bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-brand-500/50 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-2 sm:space-y-3 h-full"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 group-hover:bg-brand-500 text-slate-700 group-hover:text-white flex items-center justify-center transition-colors duration-300 shrink-0">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-navy-900 group-hover:text-brand-600 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 block mt-0.5">
                      {item.count}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
