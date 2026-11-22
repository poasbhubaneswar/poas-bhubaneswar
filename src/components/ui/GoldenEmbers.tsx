import React from "react";

export function GoldenEmbers() {
  const embers = [
    { left: "10%", delay: "0s", duration: "18s", size: "3px", opacity: 0.7, color: "#EF4444" },
    { left: "18%", delay: "4s", duration: "22s", size: "2px", opacity: 0.5, color: "#FFFFFF" },
    { left: "26%", delay: "8s", duration: "16s", size: "4px", opacity: 0.8, color: "#A31D1D" },
    { left: "35%", delay: "2s", duration: "20s", size: "2.5px", opacity: 0.6, color: "#EF4444" },
    { left: "44%", delay: "10s", duration: "24s", size: "3px", opacity: 0.7, color: "#FFFFFF" },
    { left: "52%", delay: "6s", duration: "19s", size: "2px", opacity: 0.5, color: "#A31D1D" },
    { left: "61%", delay: "1s", duration: "21s", size: "3.5px", opacity: 0.75, color: "#EF4444" },
    { left: "70%", delay: "9s", duration: "17s", size: "2.5px", opacity: 0.6, color: "#FFFFFF" },
    { left: "79%", delay: "5s", duration: "23s", size: "3px", opacity: 0.65, color: "#A31D1D" },
    { left: "88%", delay: "11s", duration: "18s", size: "2px", opacity: 0.5, color: "#EF4444" },
    { left: "94%", delay: "3s", duration: "20s", size: "4px", opacity: 0.8, color: "#FFFFFF" },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {embers.map((ember, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float-ember"
          style={{
            left: ember.left,
            bottom: "-20px",
            width: ember.size,
            height: ember.size,
            backgroundColor: ember.color,
            boxShadow: `0 0 8px ${ember.color}`,
            animationDelay: ember.delay,
            animationDuration: ember.duration,
            opacity: ember.opacity,
          }}
        />
      ))}
    </div>
  );
}
