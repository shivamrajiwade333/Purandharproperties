'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          propertyTitle: 'General Contact Inquiry'
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setForm({ name: '', phone: '', email: '', message: '' });
      } else {
        setError(json.error || 'Failed to submit enquiry');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">GET IN TOUCH</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight font-sans">
          Contact Our Real Estate Specialists
        </h1>
        <p className="text-slate-500 text-sm">
          Have questions about buying, renting, or listing your luxury property? Send us a message and our advisors will respond within 2 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-navy-900 border-b border-slate-100 pb-3">
              Headquarters & Offices
            </h3>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy-900 block">Pune Head Office</span>
                  <span className="text-xs text-slate-500">Apex Tower, High Street Road, Baner, Pune 411045</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                <div>
                  <span className="font-bold text-navy-900 block">Direct Hotline</span>
                  <a href="tel:+919876543210" className="text-xs text-slate-600 hover:text-brand-600">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <div>
                  <span className="font-bold text-navy-900 block">Email Advisory</span>
                  <a href="mailto:info@apexestate.com" className="text-xs text-slate-600 hover:text-brand-600">
                    info@apexestate.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                <div>
                  <span className="font-bold text-navy-900 block">Working Hours</span>
                  <span className="text-xs text-slate-500">Mon - Sat: 9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instant WhatsApp Quick Box */}
          <div className="bg-emerald-950 text-white rounded-2xl p-6 space-y-3 shadow-lg border border-emerald-800">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-sm">Need Instant WhatsApp Assistance?</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connect directly with our senior property consultant for immediate availability & site visit scheduling.
            </p>
            <a
              href="https://wa.me/919876543210?text=Hello,%20I%20would%20like%20to%20inquire%20about%20properties%20on%20ApexEstate."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md transition-colors"
            >
              Start WhatsApp Chat Now
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-xl font-extrabold text-navy-900 tracking-tight font-sans">
            Send Us a Message
          </h3>

          {success ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2">
              <h4 className="text-base font-bold">Thank You! Your Message Has Been Received.</h4>
              <p className="text-xs text-emerald-700">
                A senior property specialist will review your request and get back to you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-2 text-xs font-bold text-brand-700 underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul.sharma@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us what type of property you are looking for, budget, or preferred location..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Sending Request...' : 'Send Contact Inquiry'}</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
