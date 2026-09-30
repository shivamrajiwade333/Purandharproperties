'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminHeader from '@/components/admin/AdminHeader';
import { PropertyItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import {
  Building2,
  Plus,
  Search,
  FileEdit,
  Eye,
  Trash2,
  Sparkles,
  CheckCircle,
  FileText
} from 'lucide-react';

export default function AdminPropertiesListPage() {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPublish, setSelectedPublish] = useState('All');

  // Delete modal
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/properties?publishStatus=All');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProperties(json.data);
      }
    } catch (err) {
      console.error('Failed to load admin properties list', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
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
        loadProperties();
      }
    } catch (err) {
      console.error('Failed to update publish status', err);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setDeleteModalId(null);
        loadProperties();
      }
    } catch (err) {
      console.error('Failed to delete property', err);
    }
  };

  // Filtered properties
  const filteredList = properties.filter((p) => {
    const matchesQuery = query === '' || 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.city.toLowerCase().includes(query.toLowerCase());
    const matchesType = selectedType === 'All' || p.propertyType === selectedType;
    const matchesPublish = selectedPublish === 'All' || p.publishStatus === selectedPublish;
    return matchesQuery && matchesType && matchesPublish;
  });

  return (
    <div className="space-y-6">
      
      <AdminHeader
        title="All Real Estate Properties"
        subtitle="View, search, edit, publish/unpublish, or delete property listings"
      />

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Keyword */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by title, city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
          >
            <option value="All">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Flat">Flat</option>
            <option value="Commercial Property">Commercial</option>
            <option value="Plot / Land">Plot / Land</option>
            <option value="Farmhouse">Farmhouse</option>
          </select>

          <select
            value={selectedPublish}
            onChange={(e) => setSelectedPublish(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published Live</option>
            <option value="Draft">Drafts</option>
          </select>
        </div>

      </div>

      {/* Properties Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading properties...</div>
        ) : filteredList.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No properties match your filter criteria.</div>
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
                  <th className="py-3.5 px-4">Publish</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {filteredList.map((prop) => (
                  <tr key={prop._id || prop.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Title & Thumbnail */}
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
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-navy-900 truncate">{prop.title}</span>
                            {prop.featured && (
                              <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-sm">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 block">{prop.bedrooms} BHK | {prop.area} sqft</span>
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

                    {/* Type */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {prop.propertyType}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        prop.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {prop.status}
                      </span>
                    </td>

                    {/* Live / Draft Toggle */}
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

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/property/${prop._id || prop.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-100"
                          title="View Public Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/properties/${prop._id || prop.id}/edit`}
                          className="p-1.5 rounded-lg text-brand-600 hover:bg-brand-50"
                          title="Edit"
                        >
                          <FileEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteModalId(prop._id || prop.id || '')}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                          title="Delete"
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
            <h3 className="text-base font-bold text-navy-900">Delete Property Listing?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to permanently delete this property listing?
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProperty(deleteModalId)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
