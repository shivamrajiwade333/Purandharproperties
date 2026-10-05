'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher({ isMobile = false }: { isMobile?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isMobile) {
    return (
      <div className="pt-2 border-t border-slate-100 space-y-1.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
          Select Language / भाषा निवडा
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border transition-all ${
                language === lang.code
                  ? 'bg-navy-900 text-white border-navy-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-navy-900 text-xs font-bold transition-all border border-slate-200/60"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-brand-600 shrink-0" />
        <span>{currentLangObj.label}</span>
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white shadow-xl border border-slate-200/80 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1 border-b border-slate-100 mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Choose Language
            </span>
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors ${
                language === lang.code
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              {language === lang.code && <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
