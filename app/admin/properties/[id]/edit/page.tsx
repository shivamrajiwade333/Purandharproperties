'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import PropertyForm from '@/components/admin/PropertyForm';
import { PropertyItem } from '@/types';

export default function EditPropertyPage() {
  const params = useParams();
  const id = params.id as string;

  const [property, setProperty] = useState<PropertyItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const json = await res.json();
        if (json.success && json.data) {
          setProperty(json.data);
        }
      } catch (err) {
        console.error('Failed to load property for edit', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="p-12 text-center text-slate-500">Loading property details for editor...</div>;
  }

  if (!property) {
    return <div className="p-12 text-center text-slate-500">Property not found.</div>;
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title={`Edit Property: ${property.title}`}
        subtitle="Modify details, price, location, photos, videos, or publish status"
      />
      <PropertyForm initialData={property} isEditMode={true} />
    </div>
  );
}
