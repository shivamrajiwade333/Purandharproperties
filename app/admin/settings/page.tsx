'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Settings, RefreshCw, ShieldCheck, Database, Server, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState('');
  const [seedError, setSeedError] = useState('');

  const handleReSeedDatabase = async () => {
    setSeeding(true);
    setSeedSuccess('');
    setSeedError('');

    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setSeedSuccess(json.message || 'Database successfully re-seeded with demo luxury properties & video tours!');
      } else {
        setSeedError(json.error || 'Failed to seed database');
      }
    } catch (err) {
      setSeedError('Failed to trigger database seed.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      <AdminHeader
        title="Admin Settings & Database Utilities"
        subtitle="Manage credentials, database connection status, and demo data re-seeding"
      />

      {/* Admin Profile & Credentials Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-navy-900">Administrator Credentials</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-400 uppercase tracking-wider block">Admin Email</span>
            <span className="font-bold text-navy-900 text-sm">admin@realestate.com</span>
          </div>

          <div className="space-y-1 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-400 uppercase tracking-wider block">Role & Privileges</span>
            <span className="font-bold text-brand-700 text-sm">Super Administrator (Full Access)</span>
          </div>
        </div>
      </div>

      {/* Database & Storage Status */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <Database className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-navy-900">Database & Media Storage Architecture</h3>
        </div>

        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-navy-900 block">MongoDB / In-Memory Dual Engine</span>
              <span>
                Connected via Mongoose with connection pooling. If `MONGODB_URI` environment variable is defined, it persists to real MongoDB database collections. Otherwise, it operates with zero-config in-memory fallback.
              </span>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-navy-900 block">Cloud & Local Media Storage</span>
              <span>
                Images and videos are processed by `/api/upload` and stored with unique persistent URLs, keeping database payloads clean and optimized for scalable thousands of properties.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Seeding Utility */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <RefreshCw className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-navy-900">Reset & Seed Demo Properties</h3>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Click below to re-seed the system with realistic luxury property listings, high-resolution photo galleries, video walkthrough tours, sample leads, and default admin user credentials.
        </p>

        {seedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            {seedSuccess}
          </div>
        )}

        {seedError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
            {seedError}
          </div>
        )}

        <button
          onClick={handleReSeedDatabase}
          disabled={seeding}
          className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white font-bold text-xs shadow-md inline-flex items-center space-x-2 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
          <span>{seeding ? 'RE-SEEDING SYSTEM...' : 'RESET & RE-SEED DEMO DATA'}</span>
        </button>
      </div>

    </div>
  );
}
