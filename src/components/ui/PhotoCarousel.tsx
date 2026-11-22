"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface PhotoCarouselProps {
  images: string[];
  alt?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  className?: string;
  showCounter?: boolean;
  showDots?: boolean;
}

export function PhotoCarousel({
  images,
  alt = "POAS Gallery Moment",
  aspectRatio = "video",
  className = "",
  showCounter = true,
  showDots = true,
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const validImages = images && images.length > 0 ? images : ["/images/hero/nuakhai-ceremony-hero.jpeg"];
  const total = validImages.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation for carousel & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape" && lightboxOpen) setLightboxOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, lightboxOpen]);

  // Touch Swipe Handlers (Instagram mobile swipe feel)
  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "portrait"
      ? "aspect-[3/4]"
      : aspectRatio === "video"
      ? "aspect-[16/10]"
      : "aspect-[16/10]";

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-2xl bg-[#0B0B0C] border border-[#2D2D35] select-none ${className}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slides Track */}
        <div className={`relative w-full ${aspectClass}`}>
          {validImages.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-400 ease-out ${
                idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} — Photo ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover cursor-pointer"
                onClick={() => setLightboxOpen(true)}
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Counter Badge (e.g. 1/5) */}
        {showCounter && total > 1 && (
          <div className="absolute top-3 right-3 z-20 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white/90 border border-white/15 shadow-md flex items-center gap-1">
            <span>{currentIndex + 1}</span>
            <span className="text-white/50">/</span>
            <span>{total}</span>
          </div>
        )}

        {/* Expand / Lightbox Button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3 left-3 z-20 rounded-full bg-black/60 backdrop-blur-md p-1.5 text-white/80 hover:text-white hover:bg-black/80 transition-all border border-white/10"
          title="Open Fullscreen Lightbox"
          aria-label="Open Fullscreen Lightbox"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>

        {/* Prev / Next Chevrons (Visible if > 1 photo) */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/65 backdrop-blur-md p-2 text-white/90 hover:bg-[#A31D1D] hover:text-white transition-all border border-white/15 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/65 backdrop-blur-md p-2 text-white/90 hover:bg-[#A31D1D] hover:text-white transition-all border border-white/15 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg"
              aria-label="Next Photo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Indicator Dots (Instagram-style) */}
        {showDots && total > 1 && (
          <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-1.5">
            {validImages.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                className={`rounded-full transition-all duration-300 ${
                  dotIdx === currentIndex
                    ? "w-5 h-1.5 bg-[#A31D1D] shadow-[0_0_8px_rgba(163,29,29,0.8)]"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 z-50 rounded-full bg-white/10 p-2.5 text-white hover:bg-[#A31D1D] transition-colors border border-white/20"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox Counter */}
          <div className="absolute top-6 left-6 z-50 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 border border-white/15">
            {currentIndex + 1} / {total}
          </div>

          {/* Prev/Next buttons inside Lightbox */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-[#A31D1D] transition-colors border border-white/20"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-[#A31D1D] transition-colors border border-white/20"
                aria-label="Next Photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Main Fullscreen Image Container */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] aspect-[16/10] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={validImages[currentIndex]}
              alt={`${alt} Fullscreen ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
