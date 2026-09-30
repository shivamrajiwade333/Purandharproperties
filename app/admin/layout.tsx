'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If on login page, render full screen without sidebar
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
