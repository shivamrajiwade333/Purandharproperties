'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'pop-up' | 'fade-up' | 'fade-in' | 'zoom-in' | 'slide-left' | 'slide-right';
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  threshold?: number; // Viewport trigger threshold (0.0 to 1.0)
  className?: string;
  triggerOnce?: boolean;
}

export default function ScrollReveal({
  children,
  animation = 'pop-up',
  delay = 0,
  duration = 650,
  threshold = 0.12,
  className = '',
  triggerOnce = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Fallback if IntersectionObserver is not supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Triggers when element is slightly into viewport
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  // Dynamic transform & opacity styles
  const getStyles = (): React.CSSProperties => {
    const baseTransition: React.CSSProperties = {
      transitionProperty: 'opacity, transform',
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      transitionDelay: `${delay}ms`,
      willChange: 'opacity, transform',
    };

    if (!isVisible) {
      switch (animation) {
        case 'pop-up':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateY(32px) scale(0.96)',
          };
        case 'fade-up':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateY(40px)',
          };
        case 'zoom-in':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'scale(0.92)',
          };
        case 'slide-left':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateX(40px)',
          };
        case 'slide-right':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateX(-40px)',
          };
        case 'fade-in':
        default:
          return {
            ...baseTransition,
            opacity: 0,
          };
      }
    }

    return {
      ...baseTransition,
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1)',
    };
  };

  return (
    <div ref={elementRef} style={getStyles()} className={className}>
      {children}
    </div>
  );
}
