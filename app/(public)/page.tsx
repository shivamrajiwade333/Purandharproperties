'use client';

import React, { useState, useEffect } from 'react';
import Hero from '@/components/hero/HeroSection';
import VideoPlayerModal from '@/components/modals/VideoPlayerModal';
import { PropertyItem } from '@/types';

// Modular Homepage Section Components
import FeaturedSection from '@/components/home/FeaturedSection';
import PropertyTypesSection from '@/components/home/PropertyTypesSection';
import VideoToursSection from '@/components/home/VideoToursSection';
import LatestListingsSection from '@/components/home/LatestListingsSection';
import VillagesSection from '@/components/home/VillagesSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';

export default function HomePage() {
  // 1. Property Datasets
  const [featuredProperties, setFeaturedProperties] = useState<PropertyItem[]>([]);
  const [latestProperties, setLatestProperties] = useState<PropertyItem[]>([]);
  const [videoProperties, setVideoProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Video Player Modal State
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    url: '',
    title: '',
  });

  // 3. Fetch Properties from API on Initial Load
  useEffect(() => {
    async function fetchHomeData() {
      try {
        const res = await fetch('/api/properties?publishStatus=Published');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const list: PropertyItem[] = json.data;
          setFeaturedProperties(list.filter((p) => p.featured));
          setLatestProperties(list.slice(0, 6));
          setVideoProperties(list.filter((p) => p.videos && p.videos.length > 0));
        }
      } catch (err) {
        console.error('Failed to fetch home page properties', err);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeData();
  }, []);

  // Handlers to Open & Close Video Walkthrough Modal
  const handleOpenVideo = (url: string, title: string) => {
    setVideoModal({ isOpen: true, url, title });
  };

  const handleCloseVideo = () => {
    setVideoModal({ isOpen: false, url: '', title: '' });
  };

  return (
    <div className="space-y-10 sm:space-y-16 pb-12 sm:pb-16">
      {/* 1. Hero Search Banner */}
      <Hero />

      {/* 2. Top Featured Properties */}
      <FeaturedSection
        properties={featuredProperties}
        loading={loading}
        onOpenVideo={handleOpenVideo}
      />

      {/* 3. Browse By Property Type (Apartment, Villa, Plot...) */}
      <PropertyTypesSection />

      {/* 4. Virtual Video Tours Showcase */}
      <VideoToursSection
        properties={videoProperties}
        onOpenVideo={handleOpenVideo}
      />

      {/* 5. Latest 6 Property Listings */}
      <LatestListingsSection
        properties={latestProperties}
        onOpenVideo={handleOpenVideo}
      />

      {/* 6. Explore Purandhar Villages (Saswad, Jejuri, Dive...) */}
      <VillagesSection />

      {/* 7. Why Choose Us Trust Badges */}
      <WhyChooseUsSection />

      {/* Interactive Video Tour Popup Player */}
      <VideoPlayerModal
        isOpen={videoModal.isOpen}
        onClose={handleCloseVideo}
        videoUrl={videoModal.url}
        title={videoModal.title}
      />
    </div>
  );
}
