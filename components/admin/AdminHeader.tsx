'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Bell, Plus, ExternalLink } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-extrabold text-navy-900 tracking-tight font-sans">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {/* Quick Add Property Button */}
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-900/10 transition-all"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add New Property</span>
        </Link>

        {/* View Public Website */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-bold transition-colors"
          title="Open Public Website"
        >
          <ExternalLink className="w-3.5 h-3.5 mr-1 text-slate-500" />
          <span>Public Site</span>
        </Link>
      </div>
    </header>
  );
}
