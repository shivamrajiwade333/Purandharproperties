'use client';

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import PropertyForm from '@/components/admin/PropertyForm';

export default function AddPropertyPage() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Add New Real Estate Property"
        subtitle="Fill in basic info, pricing, specs, amenities, photos, video walkthrough, and contact details"
      />
      <PropertyForm />
    </div>
  );
}
