'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, LogOut } from 'lucide-react';

function AdminLoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin/dashboard';

  // Empty inputs so the user MUST type or enter credentials manually
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionCleared, setSessionCleared] = useState(false);

  // Clear any existing session cookie when visiting login page directly
  useEffect(() => {
    async function clearExistingSession() {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
        setSessionCleared(true);
      } catch (err) {
        // ignore
      }
    }
    clearExistingSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (json.success) {
        router.push(redirectPath);
        router.refresh();
      } else {
        setError(json.error || 'Invalid credentials. Access denied.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFillDemo = () => {
    setEmail('admin@realestate.com');
    setPassword('admin123');
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-300 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {sessionCleared && !error && (
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-[11px] font-medium text-center">
          🔒 Secure Portal Locked. Please enter admin credentials below to log in.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Admin Email</label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Password</label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-brand-900/40 flex items-center justify-center space-x-2 transition-all text-xs tracking-wider"
        >
          <span>{loading ? 'VERIFYING CREDENTIALS...' : 'LOG IN TO ADMIN DASHBOARD'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </form>

      {/* Demo Credentials Box */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-brand-400 flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-brand-400" /> Admin Credentials:
          </span>
          <button
            type="button"
            onClick={handleQuickFillDemo}
            className="text-[10px] font-bold text-brand-400 hover:underline"
          >
            Auto-fill Credentials
          </button>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span>Email: <code className="text-white bg-slate-800 px-1.5 py-0.5 rounded-sm">admin@realestate.com</code></span>
          <span>Pass: <code className="text-white bg-slate-800 px-1.5 py-0.5 rounded-sm">admin123</code></span>
        </div>
      </div>

    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-tr from-navy-950 via-slate-900 to-navy-900">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Top Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white mx-auto shadow-xl shadow-brand-900/30">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            Purandhar Properties Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Authentication Required. Please log in with your admin credentials.
          </p>
        </div>

        {/* Suspense Wrapped Form */}
        <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading login form...</div>}>
          <AdminLoginFormContent />
        </Suspense>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500">
          Purandhar Properties Secured Control Portal.
        </p>

      </div>
    </div>
  );
}
