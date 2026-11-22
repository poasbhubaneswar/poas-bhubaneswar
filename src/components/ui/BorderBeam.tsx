import React from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function GlowingBorderRunner({
  className = "",
  duration = 8,
}: {
  className?: string;
  duration?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-[1px] rounded-[inherit] overflow-hidden ${className}`}
    >
      <div
        style={{ animationDuration: `${duration}s` }}
        className="absolute -inset-[120%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(163,29,29,0.5)_330deg,#EF4444_360deg)] opacity-75"
      />
    </div>
  );
}

export function BorderBeam({
  className = "",
  size = 280,
  duration = 10,
  colorFrom = "#EF4444",
  colorTo = "#A31D1D",
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-[1px] rounded-[inherit] overflow-hidden ${className}`}
    >
      <div
        style={{ animationDuration: `${duration}s` }}
        className="absolute -inset-[140%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_320deg,#A31D1D_345deg,#EF4444_360deg)] opacity-85"
      />
      <div className="absolute inset-[1px] rounded-[inherit] bg-inherit backdrop-blur-inherit" />
    </div>
  );
}
