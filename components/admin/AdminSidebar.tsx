'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Properties', href: '/admin/properties', icon: Building2 },
    { name: 'Add Property', href: '/admin/properties/new', icon: PlusCircle },
    { name: 'Customer Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Settings & Database', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top Bar with Hamburger Menu */}
      <div className="lg:hidden flex items-center justify-between bg-navy-950 text-white px-4 py-3 sticky top-0 z-40 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-base font-sans tracking-tight">
            Purandhar<span className="text-brand-400">Admin</span>
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-950 text-slate-300 flex flex-col justify-between border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header */}
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-brand-900/40">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white font-sans block">
                Purandhar<span className="text-brand-400">Admin</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Management Portal
              </span>
            </div>
          </div>

          {/* Quick Public Site Link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors group"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-400 transition-colors" />
          </Link>

          {/* Navigation items */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-900/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <IconComp className="w-4 h-4 mr-3 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="p-4 border-t border-slate-900 space-y-2">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
            <div className="w-8 h-8 rounded-full bg-brand-900 text-brand-300 border border-brand-700/50 flex items-center justify-center font-bold text-xs">
              PP
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">Admin User</span>
              <span className="text-[10px] text-slate-400 block truncate">admin@realestate.com</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold border border-rose-900/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay backdrop for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-xs"
        />
      )}
    </>
  );
}
