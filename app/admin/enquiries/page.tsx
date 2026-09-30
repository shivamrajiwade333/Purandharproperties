'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { EnquiryItem, EnquiryStatus } from '@/types';
import { MessageSquare, Phone, Mail, Calendar, CheckCircle2, Clock, Trash2, Filter } from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEnquiries(json.data);
      }
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        fetchEnquiries();
      }
    } catch (err) {
      console.error('Failed to update enquiry status', err);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setDeleteModalId(null);
        fetchEnquiries();
      }
    } catch (err) {
      console.error('Failed to delete enquiry', err);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter === 'All') return true;
    return e.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      
      <AdminHeader
        title="Customer Leads & Enquiries"
        subtitle="Manage customer property inquiries, phone contacts, and status updates"
      />

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-500 uppercase">Filter Status:</span>
          {['All', 'New', 'Contacted', 'Closed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === status
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <span className="text-xs font-bold text-slate-500">
          Showing <span className="text-navy-900">{filteredEnquiries.length}</span> lead inquiries
        </span>

      </div>

      {/* Enquiries Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading customer enquiries...</div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No enquiries found for this status.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Property Reference</th>
                  <th className="py-3.5 px-4 max-w-xs">Message</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq._id || enq.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Customer Name */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-navy-900 block">{enq.name}</span>
                    </td>

                    {/* Contact Phone & Email */}
                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="flex items-center text-slate-900 font-semibold">
                        <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        <a href={`tel:${enq.phone}`} className="hover:text-brand-600">{enq.phone}</a>
                      </div>
                      <div className="flex items-center text-slate-500 text-[11px]">
                        <Mail className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        <a href={`mailto:${enq.email}`} className="hover:text-brand-600">{enq.email}</a>
                      </div>
                    </td>

                    {/* Property Title */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-brand-700 max-w-xs block truncate">
                        {enq.propertyTitle || 'General Inquiry'}
                      </span>
                    </td>

                    {/* Message snippet */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-slate-600 line-clamp-2 text-xs leading-relaxed">
                        "{enq.message}"
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateStatus(enq._id || enq.id || '', e.target.value as EnquiryStatus)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-hidden ${
                          enq.status === 'New'
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-50 border-amber-200 text-amber-800'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        }`}
                      >
                        <option value="New">New Lead</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    {/* Delete Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setDeleteModalId(enq._id || enq.id || '')}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-navy-900">Delete Enquiry Lead?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to remove this lead record?
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEnquiry(deleteModalId)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
