'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const router = useRouter();
  const { t } = useLanguage();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFooterLogoClick = async (e: React.MouseEvent) => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      e.preventDefault();
      clickCountRef.current = 0;
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch (err) {}
      router.push('/admin/login?force=1');
      router.refresh();
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1200);
  };

  const navItemsList = [
    { label: t('navHome'), href: '/' },
    { label: t('navProperties'), href: '/properties' },
    { label: t('navBuy'), href: '/buy' },
    { label: t('navRent'), href: '/rent' },
    { label: t('navCommercial'), href: '/commercial' },
    { label: t('navContact'), href: '/contact' },
  ];

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              onClick={handleFooterLogoClick}
              className="flex items-center space-x-3 group cursor-pointer select-none"
              title="Purandhar Properties (Click 3 times to open Admin Login)"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
                Purandhar<span className="text-brand-500">Properties</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t('footerDesc')}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="flex items-center space-x-1 text-xs text-brand-400 bg-brand-950/60 border border-brand-800/50 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 mr-1 text-brand-500 shrink-0" />
                <span>100% Verified Listings</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-amber-400 bg-amber-950/60 border border-amber-800/50 px-3 py-1.5 rounded-full">
                <Award className="w-4 h-4 mr-1 text-amber-500 shrink-0" />
                <span>Direct Owner Deals</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-semibold tracking-wide mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2.5 text-sm">
              {navItemsList.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-400 transition-colors inline-flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-1.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-white text-base font-semibold tracking-wide mb-4">{t('propertyTypes')}</h4>
            <ul className="space-y-2.5 text-sm">
              {['Apartment', 'Villa', 'Flat', 'Commercial Office', 'Plot / Land', 'Farmhouse'].map((type) => (
                <li key={type}>
                  <Link
                    href={`/properties?propertyType=${encodeURIComponent(type)}`}
                    className="hover:text-brand-400 transition-colors inline-flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-1.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-base font-semibold tracking-wide mb-4">{t('contactInfo')}</h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-brand-500 shrink-0 mt-0.5" />
                <span>Saswad Main Market Road, Purandhar Taluka, Pune, Maharashtra 412301</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-brand-500 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-brand-500 shrink-0" />
                <a href="mailto:info@purandharproperties.com" className="hover:text-white transition-colors">
                  info@purandharproperties.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Purandhar Properties. {t('allRightsReserved')}</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/admin/login?force=1" className="hover:text-slate-300 transition-colors">{t('navAdminPortal')}</Link>
            <Link href="/properties" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/properties" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
