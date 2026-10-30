'use client';

import React from 'react';
import Image from 'next/image';
import { PropertyItem } from '@/types';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { Play } from 'lucide-react';

interface VideoToursSectionProps {
  properties: PropertyItem[];
  onOpenVideo: (url: string, title: string) => void;
}

export default function VideoToursSection({
  properties,
  onOpenVideo,
}: VideoToursSectionProps) {
  // If no property has video, hide this section gracefully
  if (!properties || properties.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal animation="zoom-in" duration={700}>
        <div className="bg-navy-950 text-white rounded-3xl p-5 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 max-w-3xl mb-6 sm:mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-2 sm:mb-3">
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 fill-current" /> VIRTUAL WALKTHROUGHS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Experience Purandhar Property Video Tours
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 sm:mt-2">
              Take virtual video walkthroughs of luxury homes, plots, and farmhouses in Purandhar Taluka.
            </p>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {properties.slice(0, 3).map((prop, idx) => {
              const video = prop.videos[0];
              return (
                <ScrollReveal key={prop._id || prop.id} animation="pop-up" delay={idx * 100}>
                  <div
                    onClick={() => onOpenVideo(video.url, prop.title)}
                    className="group relative aspect-16/10 rounded-2xl overflow-hidden cursor-pointer border border-slate-800 shadow-lg"
                  >
                    <Image
                      src={prop.coverImage || prop.images[0]}
                      alt={prop.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm bg-black/60 text-brand-400">
                        {prop.city}
                      </span>
                      <h4 className="text-sm font-bold mt-1 line-clamp-1 group-hover:text-brand-300 transition-colors">
                        {prop.title}
                      </h4>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
