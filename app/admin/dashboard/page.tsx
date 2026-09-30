'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import { PropertyItem, EnquiryItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import {
  Building2,
  CheckCircle,
  FileEdit,
  Sparkles,
  DollarSign,
  MessageSquare,
  Eye,
  Trash2,
  Plus,
  RefreshCw,
  Lock
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Delete modal state
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const checkAuthAndFetchData = async () => {
    setLoading(true);
    try {
      // 1. Check authentication status
      const authRes = await fetch('/api/auth/me');
      const authJson = await authRes.json();

      if (!authRes.ok || !authJson.authenticated) {
        setAuthenticated(false);
        router.push('/admin/login');
        return;
      }

      setAuthenticated(true);

      // 2. Fetch dashboard data
      const [propRes, enqRes] = await Promise.all([
        fetch('/api/properties?publishStatus=All'),
        fetch('/api/enquiries'),
      ]);

      const propJson = await propRes.json();
      const enqJson = await enqRes.json();

      if (propJson.success && Array.isArray(propJson.data)) {
        setProperties(propJson.data);
      }
      if (enqJson.success && Array.isArray(enqJson.data)) {
        setEnquiries(enqJson.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard data', err);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const handleTogglePublish = async (property: PropertyItem) => {
    const newStatus = property.publishStatus === 'Published' ? 'Draft' : 'Published';
    try {
      const res = await fetch(`/api/properties/${property._id || property.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publishStatus: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        checkAuthAndFetchData();
      }
    } catch (err) {
      console.error('Failed to toggle publish status', err);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setDeleteModalId(null);
        checkAuthAndFetchData();
      }
    } catch (err) {
      console.error('Failed to delete property', err);
    }
  };

  if (authenticated === false) {
    return (
      <div className="p-12 text-center space-y-4">
        <Lock className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-xl font-bold text-navy-900">Admin Authentication Required</h3>
        <p className="text-sm text-slate-500">Redirecting to login portal...</p>
      </div>
    );
  }

  // Metric Stats Calculation
  const totalProperties = properties.length;
  const publishedCount = properties.filter(p => p.publishStatus === 'Published').length;
  const draftCount = properties.filter(p => p.publishStatus === 'Draft').length;
  const featuredCount = properties.filter(p => p.featured).length;
  const soldCount = properties.filter(p => p.status === 'Sold').length;
  const rentedCount = properties.filter(p => p.status === 'Rented').length;
  const totalEnquiries = enquiries.length;

  return (
    <div className="space-y-6">
      
      <AdminHeader
        title="Admin Overview Dashboard"
        subtitle="Live metrics, property management, and recent customer enquiries"
      />

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-navy-900">{totalProperties}</span>
            <Building2 className="w-5 h-5 text-brand-600" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Properties</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Published</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-emerald-600">{publishedCount}</span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Live Listings</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Drafts</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-amber-600">{draftCount}</span>
            <FileEdit className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Unpublished</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Featured</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-amber-500">{featuredCount}</span>
            <Sparkles className="w-5 h-5 text-amber-400 fill-current" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Highlighted</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sold</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-rose-600">{soldCount}</span>
            <DollarSign className="w-5 h-5 text-rose-500" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Closed Deals</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rented</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-blue-600">{rentedCount}</span>
            <Building2 className="w-5 h-5 text-blue-500" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Leased Out</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Enquiries</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-purple-600">{totalEnquiries}</span>
            <MessageSquare className="w-5 h-5 text-purple-500" />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Customer Leads</span>
        </div>

      </div>

      {/* Recent Properties Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-navy-900">Manage Properties</h3>
            <p className="text-xs text-slate-500">Add, edit, publish/unpublish, or delete property listings</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={checkAuthAndFetchData}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4 mr-1" /> Refresh
            </button>
            <Link
              href="/admin/properties/new"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Property
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading listings data...</div>
        ) : properties.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No properties in system yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Property</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Published</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {properties.map((prop) => (
                  <tr key={prop._id || prop.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Title & Cover Image */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3 max-w-xs">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                          <Image
                            src={prop.coverImage || prop.images[0]}
                            alt={prop.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="truncate">
                          <span className="font-bold text-navy-900 block truncate">{prop.title}</span>
                          <span className="text-[10px] text-slate-400 block">{prop.bedrooms} Bed | {prop.bathrooms} Bath | {prop.area} sqft</span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4">
                      <span className="block font-semibold text-slate-800">{prop.city}</span>
                      <span className="text-[10px] text-slate-400">{prop.state}</span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-navy-900">
                      {formatPrice(prop.price, prop.listingType)}
                    </td>

                    {/* Property Type */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700 text-[11px]">
                        {prop.propertyType}
                      </span>
                    </td>

                    {/* Availability Status */}
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        prop.status === 'Available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prop.status === 'Sold'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {prop.status}
                      </span>
                    </td>

                    {/* Publish/Unpublish Toggle Badge */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(prop)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                          prop.publishStatus === 'Published'
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {prop.publishStatus === 'Published' ? 'LIVE' : 'DRAFT'}
                      </button>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {/* View Public Page */}
                        <Link
                          href={`/property/${prop._id || prop.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                          title="View Property Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Edit Property */}
                        <Link
                          href={`/admin/properties/${prop._id || prop.id}/edit`}
                          className="p-1.5 rounded-lg text-brand-600 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                          title="Edit Property"
                        >
                          <FileEdit className="w-4 h-4" />
                        </Link>

                        {/* Delete Property */}
                        <button
                          onClick={() => setDeleteModalId(prop._id || prop.id || '')}
                          className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
            <h3 className="text-base font-bold text-navy-900">Confirm Delete Property?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to permanently remove this property listing? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProperty(deleteModalId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Yes, Delete Property
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
