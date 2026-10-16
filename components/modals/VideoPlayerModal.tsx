'use client';

import React from 'react';
import { X, Play, Volume2, Maximize } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export default function VideoPlayerModal({ isOpen, onClose, videoUrl, title }: VideoPlayerModalProps) {
  if (!isOpen || !videoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl z-10 border border-slate-800">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 text-white">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <h3 className="text-sm font-bold truncate max-w-md">{title || 'Property Video Tour'}</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-16/9 bg-black flex items-center justify-center">
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            controlsList="nodownload"
            className="w-full h-full object-contain"
          >
            Your browser does not support HTML5 video playback.
          </video>
        </div>

      </div>

    </div>
  );
}
