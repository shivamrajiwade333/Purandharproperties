'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PropertyItem } from '@/types';
import { formatPrice, formatArea, getFavoriteIds, toggleFavoriteId } from '@/lib/utils';
import ImageLightbox from '@/components/public/ImageLightbox';
import VideoPlayerModal from '@/components/public/VideoPlayerModal';
import { useLanguage } from '@/context/LanguageContext';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Phone,
  MessageSquare,
  Send,
  Heart,
  Share2,
  Video,
  Play,
  CheckCircle2,
  Building,
  Layers,
  Car,
  Sofa,
  Sparkles
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { t } = useLanguage();

  const [property, setProperty] = useState<PropertyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lightbox & Video Modal states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Enquiry Form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryError, setEnquiryError] = useState('');

  // Favorites state
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchPropertyDetails() {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const json = await res.json();
        if (json.success && json.data) {
          setProperty(json.data);
          const favs = getFavoriteIds();
          setIsFavorite(favs.includes(json.data._id) || favs.includes(json.data.id));
        }
      } catch (err) {
        console.error('Error fetching property details', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPropertyDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!property) return;
    const updated = toggleFavoriteId(property._id || property.id || '');
    setIsFavorite(updated.includes(property._id) || updated.includes(property.id || ''));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out ${property?.title} on ApexEstate`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    setEnquirySubmitting(true);
    setEnquiryError('');
    setEnquirySuccess(false);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...enquiryForm,
          propertyId: property._id || property.id,
          propertyTitle: property.title,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setEnquirySuccess(true);
        setEnquiryForm({ name: '', phone: '', email: '', message: '' });
      } else {
        setEnquiryError(json.error || 'Failed to submit enquiry');
      }
    } catch (err) {
      setEnquiryError('Network error. Please try again.');
    } finally {
      setEnquirySubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 font-medium">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-navy-900">Property Not Found</h2>
        <p className="text-slate-500">The property you are looking for may have been removed or updated.</p>
        <Link href="/properties" className="inline-block px-5 py-2.5 rounded-xl bg-navy-900 text-white text-sm font-bold">
          Browse All Properties
        </Link>
      </div>
    );
  }

  // Generate WhatsApp pre-filled link
  const whatsappPhone = property.whatsapp || '919876543210';
  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in "${property.title}" located in ${property.city}, ${property.state}. Please provide more details.`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  const hasVideo = property.videos && property.videos.length > 0;
  const firstVideo = hasVideo ? property.videos[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-10 space-y-6 sm:space-y-10">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs font-semibold text-slate-500 mb-2 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-navy-900 shrink-0">{t('navHome')}</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-navy-900 shrink-0">{t('navProperties')}</Link>
            <span>/</span>
            <span className="text-brand-700 font-bold truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
            {property.featured && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-amber-500 text-slate-950">
                <Sparkles className="w-3 h-3 mr-1 fill-current" /> {t('featured')}
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold ${
              property.listingType === 'Sale' ? 'bg-navy-900 text-white' : 'bg-brand-600 text-white'
            }`}>
              {property.listingType === 'Sale' ? t('forSale') : t('forRent')}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-slate-100 text-slate-700">
              {property.propertyType}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold ${
              property.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {property.status}
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-navy-900 font-sans tracking-tight leading-tight">
            {property.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 flex items-center mt-1 font-medium">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-slate-400 shrink-0" />
            {property.address ? `${property.address}, ` : ''}{property.city}, {property.state} {property.pincode ? `- ${property.pincode}` : ''}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between space-y-0 md:space-y-3 pt-2 md:pt-0 border-t border-slate-100 md:border-t-0">
          <div className="text-left md:text-right">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Price</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-sans tracking-tight">
              {formatPrice(property.price, property.listingType)}
            </span>
            {property.maintenance ? (
              <span className="text-[10px] sm:text-xs text-slate-500 block mt-0.5">+ ₹{property.maintenance.toLocaleString()}/mo maintenance</span>
            ) : null}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleFavoriteToggle}
              className={`inline-flex items-center px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold border transition-colors ${
                isFavorite 
                  ? 'bg-rose-50 text-rose-600 border-rose-200' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 mr-1 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 mr-1" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Image & Video Gallery Showcase */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Main Hero Photo */}
          <div 
            onClick={() => setLightboxOpen(true)}
            className="lg:col-span-2 relative aspect-16/10 rounded-2xl overflow-hidden cursor-pointer group bg-slate-100 shadow-md"
          >
            <Image
              src={property.images[activeImageIndex] || property.coverImage}
              alt={property.title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white text-xs font-bold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center">
                <Maximize2 className="w-3.5 h-3.5 mr-1.5" /> View Full Gallery ({property.images.length} Photos)
              </span>
            </div>
          </div>

          {/* Side Media (Second Photo + Video Card) */}
          <div className="flex flex-col gap-4">
            
            {/* Secondary Photo */}
            <div 
              onClick={() => {
                setActiveImageIndex(1 % property.images.length);
                setLightboxOpen(true);
              }}
              className="relative aspect-16/9 rounded-2xl overflow-hidden cursor-pointer group bg-slate-100 shadow-sm"
            >
              <Image
                src={property.images[1] || property.coverImage}
                alt="Property Detail 2"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Video Tour Banner Card */}
            {hasVideo && firstVideo ? (
              <div 
                onClick={() => setVideoModalOpen(true)}
                className="relative aspect-16/9 rounded-2xl overflow-hidden cursor-pointer group bg-navy-950 shadow-md border border-slate-800 flex items-center justify-center"
              >
                <Image
                  src={firstVideo.thumbnail || property.coverImage}
                  alt="Video Thumbnail"
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="relative z-10 flex flex-col items-center space-y-2 text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                  <span className="text-white text-xs font-bold tracking-wide">
                    WATCH PROPERTY VIDEO TOUR
                  </span>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setLightboxOpen(true)}
                className="relative aspect-16/9 rounded-2xl bg-slate-900 text-white p-6 flex flex-col items-center justify-center cursor-pointer group shadow-sm"
              >
                <Maximize2 className="w-8 h-8 text-brand-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">Browse Photo Gallery</span>
                <span className="text-[11px] text-slate-400 mt-0.5">{property.images.length} High-Res Images</span>
              </div>
            )}

          </div>

        </div>

        {/* Thumbnail Navigation Strip */}
        {property.images.length > 1 && (
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  activeImageIndex === idx ? 'border-brand-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Layout (Left Column: Details, Right Column: Agent Contact) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column (Overview, Specs, Description, Amenities, Map) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Key Specifications Grid */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-3">
              {t('keySpecs')}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-2">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center">
                  <Bed className="w-3.5 h-3.5 mr-1 text-brand-600" /> {t('bedrooms')}
                </span>
                <span className="text-sm font-extrabold text-navy-900">{property.bedrooms > 0 ? `${property.bedrooms}` : 'N/A'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center">
                  <Bath className="w-3.5 h-3.5 mr-1 text-brand-600" /> {t('bathrooms')}
                </span>
                <span className="text-sm font-extrabold text-navy-900">{property.bathrooms > 0 ? `${property.bathrooms}` : 'N/A'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center">
                  <Maximize2 className="w-3.5 h-3.5 mr-1 text-brand-600" /> {t('builtUpArea')}
                </span>
                <span className="text-sm font-extrabold text-navy-900">{formatArea(property.area)}</span>
              </div>

              {property.carpetArea ? (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center">
                    <Maximize2 className="w-3.5 h-3.5 mr-1 text-brand-600" /> {t('carpetArea')}
                  </span>
                  <span className="text-sm font-extrabold text-navy-900">{formatArea(property.carpetArea)}</span>
                </div>
              ) : null}

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center">
                  <Sofa className="w-3.5 h-3.5 mr-1 text-brand-600" /> {t('furnishing')}
                </span>
                <span className="text-sm font-extrabold text-navy-900">{property.furnishing}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center">
                  <Car className="w-3.5 h-3.5 mr-1 text-brand-600" /> {t('parking')}
                </span>
                <span className="text-sm font-extrabold text-navy-900">{property.parking || 'None'}</span>
              </div>

              {property.floor !== undefined ? (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center">
                    <Layers className="w-3.5 h-3.5 mr-1 text-brand-600" /> {t('floor')}
                  </span>
                  <span className="text-sm font-extrabold text-navy-900">
                    {property.floor} {property.totalFloors ? `of ${property.totalFloors}` : ''}
                  </span>
                </div>
              ) : null}

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center">
                  <Building className="w-3.5 h-3.5 mr-1 text-brand-600" /> {t('listingTypeLabel')}
                </span>
                <span className="text-sm font-extrabold text-navy-900">{property.listingType === 'Sale' ? t('forSale') : t('forRent')}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-3">
              {t('descriptionTitle')}
            </h3>
            <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-sans whitespace-pre-line">
              {property.description}
            </div>
          </div>

          {/* Amenities Cards */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-3">
                {t('amenitiesTitle')}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-xs font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location Map Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-brand-600" />
              Property Location & Map
            </h3>

            <p className="text-xs text-slate-500">
              Located at <span className="font-semibold text-slate-800">{property.address}, {property.city}, {property.state} {property.pincode}</span>
            </p>

            {/* Embedded Interactive Map View */}
            <div className="relative aspect-16/8 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
              <iframe
                title="Property Map Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.address || ''} ${property.city} ${property.state}`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </div>

        </div>

        {/* Right Sticky Column (Owner / Agent Contact Card) */}
        <aside className="space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg space-y-6 sticky top-24">
            
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold text-brand-600 uppercase tracking-widest block mb-1">
                {t('contactAgentTitle')}
              </span>
              <h3 className="text-xl font-extrabold text-navy-900 font-sans">
                {property.ownerName || 'Purandhar Properties'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Verified Premier Real Estate Partner</p>
            </div>

            {/* Instant Contact CTA Buttons */}
            <div className="space-y-2.5">
              
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all text-sm"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t('chatWhatsapp')}</span>
              </a>

              {/* Direct Phone Call Button */}
              <a
                href={`tel:${property.phone}`}
                className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{t('callAgent')}</span>
              </a>

            </div>

            {/* Send Enquiry Form */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="text-sm font-bold text-navy-900">{t('interestedTitle')}</h4>
              
              {enquirySuccess ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold space-y-1">
                  <p className="font-bold">{t('enquirySuccessMsg')}</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  {enquiryError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      {enquiryError}
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      placeholder={t('fullNameReq')}
                      required
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder={t('phoneReq')}
                      required
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder={t('emailReq')}
                      required
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder={t('messageReq')}
                      required
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{enquirySubmitting ? t('sendingEnquiry') : t('sendEnquiry')}</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </aside>

      </div>

      {/* Fixed Mobile Bottom Action Bar (WhatsApp & Call) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center gap-2 shadow-2xl">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-emerald-600 active:bg-emerald-700 text-white font-bold py-3 px-3 rounded-xl shadow-md flex items-center justify-center space-x-1.5 text-xs tracking-tight"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>{t('chatWhatsapp')}</span>
        </a>

        <a
          href={`tel:${property.phone}`}
          className="flex-1 bg-navy-900 active:bg-navy-800 text-white font-bold py-3 px-3 rounded-xl shadow-md flex items-center justify-center space-x-1.5 text-xs tracking-tight"
        >
          <Phone className="w-4 h-4" />
          <span>{t('callAgent')}</span>
        </a>
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={property.images}
        initialIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={property.title}
      />

      {/* Video Tour Modal */}
      <VideoPlayerModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={firstVideo?.url || ''}
        title={property.title}
      />

    </div>
  );
}
