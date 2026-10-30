'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { ShieldCheck, Award, Play, Headphones } from 'lucide-react';

export default function WhyChooseUsSection() {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: ShieldCheck,
      bgColor: 'bg-brand-100',
      textColor: 'text-brand-700',
      title: t('adv1Title'),
      desc: t('adv1Desc'),
      delay: 0,
    },
    {
      icon: Award,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      title: t('adv2Title'),
      desc: t('adv2Desc'),
      delay: 80,
    },
    {
      icon: Play,
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-700',
      title: t('adv3Title'),
      desc: t('adv3Desc'),
      delay: 160,
      fill: true,
    },
    {
      icon: Headphones,
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-700',
      title: t('adv4Title'),
      desc: t('adv4Desc'),
      delay: 240,
    },
  ];

  return (
    <section className="bg-white py-10 sm:py-16 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
              {t('advantageTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight font-sans">
              {t('whyChooseUsTitle')}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {advantages.map((adv) => {
            const IconComp = adv.icon;
            return (
              <ScrollReveal key={adv.title} animation="pop-up" delay={adv.delay} className="h-full">
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-2.5 h-full">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${adv.bgColor} ${adv.textColor} mx-auto flex items-center justify-center shrink-0`}>
                    <IconComp className={`w-5 h-5 sm:w-6 sm:h-6 ${adv.fill ? 'fill-current' : ''}`} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-navy-900">{adv.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
