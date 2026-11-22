import { GoldenEmbers } from "@/components/ui/GoldenEmbers";

export function AmbientLighting() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Floating Crimson Embers */}
      <GoldenEmbers />

      {/* Primary Floating Crimson Red Aurora Mesh */}
      <div className="absolute -top-48 left-1/2 h-[680px] w-[880px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#A31D1D]/20 via-[#6B0F10]/12 to-transparent blur-[140px] animate-float-1" />
      
      {/* Secondary Ambient Accent Tone */}
      <div className="absolute top-1/3 -right-24 h-[520px] w-[620px] rounded-full bg-gradient-to-bl from-[#A31D1D]/15 via-white/[0.04] to-transparent blur-[130px] animate-float-2" />

      {/* Tertiary Left Ambient Aura */}
      <div className="absolute top-2/3 -left-32 h-[480px] w-[580px] rounded-full bg-gradient-to-tr from-[#6B0F10]/20 via-[#A31D1D]/10 to-transparent blur-[120px] animate-float-1" />

      {/* Subtle Fine Grain Film Texture Overlay (3.5% opacity) */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
