'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function ImageLightbox({ images, initialIndex = 0, isOpen, onClose, title }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || !images || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
      
      {/* Top Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 text-white">
        <span className="text-sm font-semibold text-slate-300">
          {title || 'Property Photos'} ({currentIndex + 1} / {images.length})
        </span>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative w-full max-w-5xl aspect-16/10 rounded-xl overflow-hidden flex items-center justify-center">
        <Image
          src={images[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>

      {/* Prev / Next navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 inset-x-0 flex items-center justify-center space-x-2 px-4 overflow-x-auto z-20">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                currentIndex === idx ? 'border-brand-500 scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
