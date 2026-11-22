import React from "react";

export function SambalpuriBand({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden opacity-90 select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 800 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full text-[#A31D1D]"
      >
        <pattern id="poas-ikat-band" width="48" height="24" patternUnits="userSpaceOnUse">
          {/* Outer Sambalpuri Diamond Weave (Red & White) */}
          <path
            d="M24 2L44 12L24 22L4 12Z"
            stroke="#A31D1D"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Inner Stepped Diamond (White) */}
          <path
            d="M24 6L36 12L24 18L12 12Z"
            stroke="#FFFFFF"
            strokeWidth="1"
            fill="none"
            opacity="0.85"
          />
          {/* Central Bindu Point */}
          <circle cx="24" cy="12" r="2.5" fill="#EF4444" />
          {/* Stepping Ikat Weft Lines */}
          <path d="M0 12L8 8M0 12L8 16M48 12L40 8M48 12L40 16" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
          <path d="M2 12L10 6M2 12L10 18M46 12L38 6M46 12L38 18" stroke="#A31D1D" strokeWidth="1" opacity="0.8" />
        </pattern>
        <rect width="100%" height="24" fill="url(#poas-ikat-band)" />
      </svg>
    </div>
  );
}

export function MaaSamaleiWatermark({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 200 260"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-[#A31D1D]/15 animate-watermark-breath transition-all duration-1000"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M100 8 L112 34 L100 24 L88 34 Z" fill="#A31D1D" opacity="0.4" />
          <path d="M70 150 L70 70 Q100 40 130 70 L130 150 Z" stroke="#EF4444" />
          <path d="M55 150 L145 150 L160 190 L40 190 Z" stroke="#FFFFFF" opacity="0.6" />
          <path d="M40 190 L160 190 L172 230 L28 230 Z" stroke="#A31D1D" />
          <circle cx="100" cy="95" r="14" strokeWidth="1.5" stroke="#FFFFFF" />
          <path d="M100 70v14M85 95h14M100 95l11 11" strokeWidth="1.5" stroke="#EF4444" />
          <path d="M20 244c14-10 28-10 42 0M138 244c14-10 28-10 42 0" strokeWidth="1.6" stroke="#FFFFFF" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

export function ShimmerBorder({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-[#A31D1D]/30 bg-gradient-to-tr from-transparent via-[#A31D1D]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${className}`}
    />
  );
}
