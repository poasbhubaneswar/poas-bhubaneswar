import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ShimmerBorder } from "@/components/ui/SambalpuriMotif";

interface MetricItem {
  number: string;
  label: string;
  odiaLabel: string;
  description: string;
}

const METRICS: MetricItem[] = [
  {
    number: "30+",
    label: "Years of Heritage",
    odiaLabel: "ତିରିଶ ବର୍ଷର ଗୌରବ",
    description: "Preserving Western Odisha cultural roots & fellowship in Bhubaneswar since the 1990s.",
  },
  {
    number: "10+",
    label: "Districts United",
    odiaLabel: "ଦଶରୁ ଊର୍ଦ୍ଧ୍ୱ ଜିଲ୍ଲାର ଏକତା",
    description: "Sambalpur, Balangir, Bargarh, Kalahandi, Nuapada, Subarnapur, Deogarh, Jharsuguda, Sundargarh, Boudh & beyond.",
  },
  {
    number: "10,000+",
    label: "Enrolled Community",
    odiaLabel: "ଦଶ ହଜାରରୁ ଊର୍ଦ୍ଧ୍ୱ ସଦସ୍ୟ",
    description: "Students, families, professionals, and senior citizens participating in POAS initiatives.",
  },
  {
    number: "Sangathan",
    label: "Community Fellowship",
    odiaLabel: "ସଦସ୍ୟତା ଓ ସହଭାଗିତା",
    description: "Uniting Western Odisha families, youth, and elders under one democratic umbrella.",
  },
];

export function ImpactMetrics() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="relative rounded-3xl glass-panel-elevated p-8 sm:p-12 overflow-hidden shadow-2xl">
          <ShimmerBorder />
          
          {/* Ambient Background Flare */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#A31D1D]/15 rounded-full blur-[100px]" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
              POAS Historic Milestones
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] mt-1.5">
              Three Decades of Unity &amp; Collective Voice
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl glass-card-interactive p-6 transition-all duration-300"
              >
                {/* Traditional Ikat Corner Accent */}
                <div className="absolute top-2.5 right-2.5 text-[#A31D1D]/40 group-hover:text-[#EF4444] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L18 10L10 18L2 10Z" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="10" cy="10" r="2" fill="#FFFFFF" />
                  </svg>
                </div>

                <div>
                  <div className="font-serif text-4xl sm:text-5xl font-bold text-[#FFFFFF] group-hover:text-[#EF4444] group-hover:scale-105 transition-all duration-300 origin-left">
                    {metric.number}
                  </div>
                  <h3 className="text-sm font-bold text-[#F4F4F6] mt-2 group-hover:text-[#EF4444] transition-colors">
                    {metric.label}
                  </h3>
                  <span className="text-[11px] font-odia font-medium text-[#EF4444] block mt-0.5">
                    {metric.odiaLabel}
                  </span>
                </div>

                <p className="text-xs text-[#9CA3AF] mt-3 leading-relaxed border-t border-[#2D2D35] pt-3">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
