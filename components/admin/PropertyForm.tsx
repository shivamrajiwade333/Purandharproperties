'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PropertyItem, PropertyType, ListingType, AvailabilityStatus, PublishStatus, FurnishingStatus } from '@/types';
import {
  Upload,
  X,
  Plus,
  Video,
  Sparkles,
  Save,
  Send,
  Building,
  MapPin,
  DollarSign,
  Bed,
  Phone,
  Star,
  Info
} from 'lucide-react';

interface PropertyFormProps {
  initialData?: Partial<PropertyItem>;
  isEditMode?: boolean;
}

export default function PropertyForm({ initialData, isEditMode = false }: PropertyFormProps) {
  const router = useRouter();

  // Form States
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [propertyType, setPropertyType] = useState<PropertyType>(initialData?.propertyType || 'Apartment');
  const [listingType, setListingType] = useState<ListingType>(initialData?.listingType || 'Sale');
  const [status, setStatus] = useState<AvailabilityStatus>(initialData?.status || 'Available');
  const [publishStatus, setPublishStatus] = useState<PublishStatus>(initialData?.publishStatus || 'Published');
  const [featured, setFeatured] = useState(initialData?.featured || false);

  // Pricing
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : '');
  const [maintenance, setMaintenance] = useState(initialData?.maintenance ? String(initialData.maintenance) : '');
  const [deposit, setDeposit] = useState(initialData?.deposit ? String(initialData.deposit) : '');

  // Location (Default Purandhar Taluka)
  const [address, setAddress] = useState(initialData?.address || '');
  const [city, setCity] = useState(initialData?.city || 'Saswad (Purandhar)');
  const [state, setState] = useState(initialData?.state || 'Maharashtra');
  const [pincode, setPincode] = useState(initialData?.pincode || '412301');
  const [latitude, setLatitude] = useState(initialData?.latitude ? String(initialData.latitude) : '');
  const [longitude, setLongitude] = useState(initialData?.longitude ? String(initialData.longitude) : '');

  // Specs
  const [bedrooms, setBedrooms] = useState(initialData?.bedrooms !== undefined ? String(initialData.bedrooms) : '3');
  const [bathrooms, setBathrooms] = useState(initialData?.bathrooms !== undefined ? String(initialData.bathrooms) : '2');
  const [balconies, setBalconies] = useState(initialData?.balconies !== undefined ? String(initialData.balconies) : '1');
  const [floor, setFloor] = useState(initialData?.floor !== undefined ? String(initialData.floor) : '');
  const [totalFloors, setTotalFloors] = useState(initialData?.totalFloors !== undefined ? String(initialData.totalFloors) : '');
  const [area, setArea] = useState(initialData?.area ? String(initialData.area) : '');
  const [carpetArea, setCarpetArea] = useState(initialData?.carpetArea ? String(initialData.carpetArea) : '');
  const [parking, setParking] = useState(initialData?.parking || '1 Covered Slot');
  const [furnishing, setFurnishing] = useState<FurnishingStatus>(initialData?.furnishing || 'Semi-Furnished');

  // Amenities
  const availableAmenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Lift', 'Garden',
    'Club House', 'CCTV', 'Power Backup', 'Water Supply', 'EV Charging', 'Wi-Fi', 'Intercom', 'Play Area'
  ];
  const [amenities, setAmenities] = useState<string[]>(initialData?.amenities || ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Lift']);

  // Media
  const [images, setImages] = useState<string[]>(
    initialData?.images || [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ]
  );
  const [coverImage, setCoverImage] = useState<string>(initialData?.coverImage || images[0] || '');
  const [videoUrl, setVideoUrl] = useState<string>(
    initialData?.videos?.[0]?.url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [newPhotoInput, setNewPhotoInput] = useState('');

  // Contact Info
  const [ownerName, setOwnerName] = useState(initialData?.ownerName || 'Purandhar Properties Agent');
  const [phone, setPhone] = useState(initialData?.phone || '+91 98765 43210');
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || '919876543210');
  const [email, setEmail] = useState(initialData?.email || 'info@purandharproperties.com');

  // Uploading & Submitting state
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'video') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const json = await res.json();
        if (json.success && json.url) {
          if (type === 'photo') {
            setImages((prev) => [...prev, json.url]);
            if (!coverImage) setCoverImage(json.url);
          } else {
            setVideoUrl(json.url);
          }
        } else {
          setError(json.error || 'Upload failed');
        }
      }
    } catch (err) {
      setError('File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddPhotoByUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoInput.trim()) return;
    const urls = newPhotoInput.split('\n').map(u => u.trim()).filter(u => u.length > 0);
    setImages(prev => [...prev, ...urls]);
    if (!coverImage && urls[0]) setCoverImage(urls[0]);
    setNewPhotoInput('');
  };

  const handleRemovePhoto = (url: string) => {
    const filtered = images.filter(img => img !== url);
    setImages(filtered);
    if (coverImage === url) {
      setCoverImage(filtered[0] || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent, targetPublishStatus?: PublishStatus) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const finalPublishStatus = targetPublishStatus || publishStatus;

    if (!title || !price || !city || !area) {
      setError('Please fill in all required basic information fields.');
      setSubmitting(false);
      return;
    }

    const payload = {
      title,
      description,
      propertyType,
      listingType,
      status,
      publishStatus: finalPublishStatus,
      featured,
      price: Number(price),
      maintenance: maintenance ? Number(maintenance) : 0,
      deposit: deposit ? Number(deposit) : 0,
      address,
      city,
      state,
      pincode,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      bedrooms: Number(bedrooms || 0),
      bathrooms: Number(bathrooms || 0),
      balconies: Number(balconies || 0),
      floor: floor ? Number(floor) : undefined,
      totalFloors: totalFloors ? Number(totalFloors) : undefined,
      area: Number(area || 0),
      carpetArea: carpetArea ? Number(carpetArea) : undefined,
      parking,
      furnishing,
      amenities,
      images,
      coverImage: coverImage || images[0] || '',
      videos: videoUrl ? [{ url: videoUrl, title: 'Virtual Video Tour' }] : [],
      ownerName,
      phone,
      whatsapp,
      email,
    };

    try {
      const url = isEditMode && initialData?._id
        ? `/api/properties/${initialData._id || initialData.id}`
        : '/api/properties';
      
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        router.push('/admin/properties');
        router.refresh();
      } else {
        setError(json.error || 'Failed to save property listing');
      }
    } catch (err) {
      setError('Network error while saving property.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Purandhar Taluka Location Guidelines Banner */}
      <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 text-brand-900 text-xs font-semibold flex items-start space-x-3">
        <Info className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-sm block mb-0.5">Purandhar Taluka Property Listing Rule</span>
          <span>
            This platform exclusively lists properties located in **Purandhar Taluka** (Saswad, Jejuri, Narayanpur, Dive, Belsar, Walhe, Kapurhol, etc.). Please ensure your property location is specified within Purandhar Taluka.
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          {error}
        </div>
      )}

      {/* 1. Basic Information */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <Building className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-navy-900">1. Basic Property Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Property Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Skyline Grand 3 BHK Luxury Apartment in Saswad"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Property Type *</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            >
              <option value="Apartment">Apartment</option>
              <option value="Flat">Flat</option>
              <option value="Villa">Villa</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Independent House">Independent House</option>
              <option value="Plot / Land">Plot / Land</option>
              <option value="Commercial Property">Commercial Property</option>
              <option value="Office">Office</option>
              <option value="Shop">Shop</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="PG / Hostel">PG / Hostel</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Listing Type *</label>
            <select
              value={listingType}
              onChange={(e) => setListingType(e.target.value as ListingType)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            >
              <option value="Sale">For Sale</option>
              <option value="Rent">For Rent</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Availability Status *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AvailabilityStatus)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Property Description *</label>
            <textarea
              rows={4}
              required
              placeholder="Provide complete description of the property, highlight key features, nearby Purandhar Taluka landmarks (Saswad Bus Stand, Jejuri Temple, Dive Ghat, Purandhar Fort view, etc)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 resize-none font-medium"
            />
          </div>
        </div>
      </div>

      {/* 2. Pricing */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <DollarSign className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-navy-900">2. Pricing & Financials</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Price (₹) *</label>
            <input
              type="number"
              required
              placeholder="e.g. 6500000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Monthly Maintenance (₹)</label>
            <input
              type="number"
              placeholder="e.g. 2500"
              value={maintenance}
              onChange={(e) => setMaintenance(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Security Deposit (₹)</label>
            <input
              type="number"
              placeholder="e.g. 200000"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* 3. Location (Purandhar Taluka) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <MapPin className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-navy-900">3. Purandhar Taluka Location & Address</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Street / Village Address *</label>
            <input
              type="text"
              required
              placeholder="e.g. Station Road, Saswad / Temple Road, Jejuri / Datta Mandir Rd, Narayanpur"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">City / Taluka Area *</label>
            <input
              type="text"
              required
              placeholder="Saswad, Jejuri, Narayanpur, Dive, Walhe..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">State *</label>
            <input
              type="text"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Pincode *</label>
            <input
              type="text"
              required
              placeholder="412301"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Latitude (Optional)</label>
            <input
              type="number"
              step="any"
              placeholder="18.3444"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Longitude (Optional)</label>
            <input
              type="number"
              step="any"
              placeholder="74.0305"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* 4. Specifications */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <Bed className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-navy-900">4. Property Specifications & Layout</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Bedrooms</label>
            <input
              type="number"
              placeholder="3"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Bathrooms</label>
            <input
              type="number"
              placeholder="2"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Balconies</label>
            <input
              type="number"
              placeholder="1"
              value={balconies}
              onChange={(e) => setBalconies(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Built-up Area (sqft) *</label>
            <input
              type="number"
              required
              placeholder="1450"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Carpet Area (sqft)</label>
            <input
              type="number"
              placeholder="1120"
              value={carpetArea}
              onChange={(e) => setCarpetArea(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Floor No.</label>
            <input
              type="number"
              placeholder="4"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Total Floors</label>
            <input
              type="number"
              placeholder="7"
              value={totalFloors}
              onChange={(e) => setTotalFloors(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Furnishing Status</label>
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value as FurnishingStatus)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            >
              <option value="Unfurnished">Unfurnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Fully Furnished">Fully Furnished</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Parking Information</label>
            <input
              type="text"
              placeholder="e.g. 1 Covered Slot"
              value={parking}
              onChange={(e) => setParking(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* 5. Amenities Checkbox Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <Star className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-navy-900">5. Amenities & Key Features</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {availableAmenitiesList.map((item) => {
            const isChecked = amenities.includes(item);
            return (
              <label
                key={item}
                className={`flex items-center space-x-2.5 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-brand-50 border-brand-500 text-brand-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAmenity(item)}
                  className="rounded-sm text-brand-600 focus:ring-brand-500 h-4 w-4"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 6. Media Management (Photos & Video) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <Upload className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-navy-900">6. Property Photos & Video Upload</h3>
        </div>

        {/* Upload Property Photos */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-600 uppercase block">Upload Property Photos</label>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-brand-500 transition-colors bg-slate-50">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-navy-900">Drag & drop photos or click to browse</p>
            <p className="text-[11px] text-slate-400 mt-1">Supports PNG, JPG, WEBP up to 10MB each</p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'photo')}
              className="hidden"
              id="photo-upload-input"
            />
            <label
              htmlFor="photo-upload-input"
              className="mt-3 inline-block px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold cursor-pointer hover:bg-navy-800"
            >
              {uploading ? 'Uploading...' : 'Browse Photo Files'}
            </label>
          </div>

          {/* Or Add Image URL directly */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
              <span>OR PASTE DIRECT IMAGE URL(S) (Cloudinary, Imgur, Unsplash, Google Drive):</span>
              <span className="text-slate-400 font-normal">One URL per line for multiple photos</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <textarea
                rows={2}
                placeholder="https://images.unsplash.com/photo-1545324418...\nhttps://images.unsplash.com/photo-1600596542815..."
                value={newPhotoInput}
                onChange={(e) => setNewPhotoInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono resize-none focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="button"
                onClick={handleAddPhotoByUrl}
                className="px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors self-end sm:self-auto shrink-0"
              >
                + Add Image URL(s)
              </button>
            </div>
          </div>

          {/* Loaded Photo Previews & Cover Selection */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {images.map((imgUrl, idx) => {
                const isCover = coverImage === imgUrl;
                return (
                  <div key={idx} className="relative aspect-16/10 rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
                    <Image src={imgUrl} alt={`Uploaded ${idx}`} fill className="object-cover" />
                    
                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(imgUrl)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-md"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {/* Set cover button badge */}
                    <button
                      type="button"
                      onClick={() => setCoverImage(imgUrl)}
                      className={`absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                        isCover ? 'bg-amber-400 text-slate-950' : 'bg-black/60 text-white hover:bg-black'
                      }`}
                    >
                      {isCover ? 'COVER PHOTO' : 'Set as Cover'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upload Property Video */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-600 uppercase block">Upload Property Video / Walkthrough</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="url"
                placeholder="Paste MP4 video URL..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium"
              />
            </div>

            <div>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
                className="hidden"
                id="video-upload-input"
              />
              <label
                htmlFor="video-upload-input"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-rose-950 text-rose-200 border border-rose-900 text-xs font-bold cursor-pointer hover:bg-rose-900"
              >
                <Video className="w-4 h-4 mr-2" />
                <span>Upload MP4 Video File</span>
              </label>
            </div>
          </div>

          {videoUrl && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700 font-medium">
              <span className="truncate max-w-md">Video Attached: {videoUrl}</span>
              <button
                type="button"
                onClick={() => setVideoUrl('')}
                className="text-rose-600 font-bold hover:underline"
              >
                Remove Video
              </button>
            </div>
          )}
        </div>

      </div>

      {/* 7. Contact Information */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <Phone className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-navy-900">7. Owner / Listing Agent Contact</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Agent / Owner Name *</label>
            <input
              type="text"
              required
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Phone Number *</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">WhatsApp Number *</label>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 uppercase">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium"
            />
          </div>
        </div>
      </div>

      {/* 8. Publishing Controls & Submit */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center space-x-6">
          {/* Featured Toggle */}
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded-sm text-brand-600 focus:ring-brand-500 h-4 w-4"
            />
            <span className="text-xs font-bold text-navy-900 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500 fill-current" />
              Mark as Featured Property
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Save Draft Button */}
          <button
            type="button"
            disabled={submitting}
            onClick={(e) => handleSubmit(e, 'Draft')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE DRAFT</span>
          </button>

          {/* Publish Property Button */}
          <button
            type="submit"
            disabled={submitting}
            onClick={(e) => handleSubmit(e, 'Published')}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-lg shadow-brand-900/20 transition-all flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'SAVING...' : isEditMode ? 'UPDATE PROPERTY' : 'PUBLISH PROPERTY'}</span>
          </button>
        </div>

      </div>

    </form>
  );
}
