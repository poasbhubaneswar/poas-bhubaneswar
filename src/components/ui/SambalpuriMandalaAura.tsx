import React from "react";

interface MandalaProps {
  className?: string;
}

export function SambalpuriMandalaAura({ className = "" }: MandalaProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible ${className}`}
    >
      {/* Central Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#A31D1D]/30 via-[#EF4444]/15 to-transparent blur-[90px] -z-10" />

      <svg
        viewBox="0 0 600 600"
        className="w-[580px] h-[580px] max-w-[90vw] max-h-[90vw] text-[#A31D1D] opacity-35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="mandala-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#A31D1D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#A31D1D" stopOpacity="0" />
          </radialGradient>
          <filter id="poas-shimmer" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#EF4444" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* 1. OUTER RING (Clockwise Rotation): 24 Nabanna Harvest Paddy Rays */}
        <g className="animate-mandala-cw origin-center" filter="url(#poas-shimmer)">
          <circle cx="300" cy="300" r="270" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />
          <circle cx="300" cy="300" r="255" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
          
          {/* 24 Radiating Paddy Motif Nodes */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                <path
                  d="M300 35 L306 48 L300 60 L294 48 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="#A31D1D"
                  fillOpacity="0.4"
                />
                <circle cx="300" cy="32" r="2" fill="#FFFFFF" />
                <path d="M300 60 L300 80" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
              </g>
            );
          })}
        </g>

        {/* 2. MIDDLE RING (Counter-Clockwise Rotation): Sambalpuri Ikat Stepped Triangles */}
        <g className="animate-mandala-ccw origin-center">
          <circle cx="300" cy="300" r="215" stroke="currentColor" strokeWidth="1.4" opacity="0.75" />
          <circle cx="300" cy="300" r="185" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />

          {/* 16 Stepped Ikat Weave Teeth */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                <polygon
                  points="300,85 312,112 300,118 288,112"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="#EF4444"
                  fillOpacity="0.35"
                />
                <circle cx="300" cy="115" r="3" fill="#FFFFFF" fillOpacity="0.9" />
              </g>
            );
          })}
        </g>

        {/* 3. INNER CORE (Subtle Sacred Pulse): 8-Petal Solar Lotus */}
        <g className="animate-mandala-pulse origin-center">
          <circle cx="300" cy="300" r="140" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
          <circle cx="300" cy="300" r="115" stroke="#FFFFFF" strokeWidth="1.2" fill="url(#mandala-glow)" fillOpacity="0.1" />

          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                <path
                  d="M300 160 Q320 220 300 260 Q280 220 300 160 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="#A31D1D"
                  fillOpacity="0.35"
                />
                <circle cx="300" cy="155" r="3" fill="#FFFFFF" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
