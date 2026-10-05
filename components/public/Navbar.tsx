'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Building2, Heart, Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { getFavoriteIds } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/public/LanguageSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  // Triple-click secret trigger state for Admin Portal
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [adminNotice, setAdminNotice] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      setFavoriteCount(getFavoriteIds().length);
    };
    updateCount();
    window.addEventListener('favorites-updated', updateCount);
    return () => window.removeEventListener('favorites-updated', updateCount);
  }, []);

  const handleLogoClick = async (e: React.MouseEvent) => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 3) {
      e.preventDefault();
      clickCountRef.current = 0;
      setAdminNotice(true);

      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch (err) {
        // ignore
      }

      setTimeout(() => {
        setAdminNotice(false);
        router.push('/admin/login?force=1');
        router.refresh();
      }, 400);
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1200);
  };

  const navLinks = [
    { name: t('navHome'), href: '/' },
    { name: t('navProperties'), href: '/properties' },
    { name: t('navBuy'), href: '/buy' },
    { name: t('navRent'), href: '/rent' },
    { name: t('navCommercial'), href: '/commercial' },
    { name: t('navContact'), href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      
      {/* Secret Admin Redirect Toast Notice */}
      {adminNotice && (
        <div className="bg-navy-950 text-white text-center py-2 text-xs font-bold animate-in fade-in flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-brand-400" />
          <span>Triple click detected! Locking session and opening Admin Login...</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo with 3-click Secret Admin Trigger */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer select-none shrink-0"
            title="Purandhar Properties (Click 3 times to open Admin Login)"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-navy-900 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-900/10 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-extrabold tracking-tight text-navy-900 font-sans block leading-none">
                Purandhar<span className="text-brand-600">Properties</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-slate-400 block mt-0.5">
                Verified Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-700 bg-brand-50 font-semibold'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            
            {/* Trilingual Language Selector */}
            <LanguageSwitcher />

            {/* Favorites Badge Link */}
            <Link
              href="/favorites"
              className="relative p-2.5 rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title={t('navSavedFavorites')}
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {favoriteCount}
                </span>
              )}
            </Link>



            {/* Primary Action Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold shadow-md shadow-navy-900/10 hover:shadow-lg transition-all duration-200"
            >
              <Phone className="w-4 h-4 mr-2 text-brand-500" />
              {t('contactAgent')}
            </Link>
          </div>

          {/* Mobile Menu Button & Quick Actions */}
          <div className="flex md:hidden items-center space-x-1.5 sm:space-x-2">
            <Link
              href="/favorites"
              className="relative p-2 text-slate-600 hover:text-rose-600"
            >
              <Heart className="w-5.5 h-5.5" />
              {favoriteCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-navy-900 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6.5 h-6.5" /> : <Menu className="w-6.5 h-6.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          
          {/* Mobile Trilingual Language Selector */}
          <LanguageSwitcher isMobile={true} />

          <div className="space-y-1 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                  pathname === link.href
                    ? 'text-brand-700 bg-brand-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/admin/login?force=1"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-xl bg-slate-100 text-slate-800 text-sm font-semibold"
            >
              {t('navAdminPortal')}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-xl bg-navy-900 text-white text-sm font-semibold shadow-sm"
            >
              {t('contactAgent')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

