import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { Building2, Heart, CheckCircle2, MapPin, Sparkles, Shield, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Maa Samalei Mandir Project | Paschim Odisha Agrani Sangathana",
  description: "A proposed spiritual, cultural, and community sanctuary honoring Presiding Deity Maa Samaleswari in Bhubaneswar, Odisha. Vision, architecture, and consultative status.",
};

export default function MaaSamaleiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">

      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
            Sacred Cultural Sanctuary
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
            Maa Samalei Mandir Project
          </h1>
          <p className="text-base text-[#D1D5DB] mt-3 leading-relaxed font-odia text-xl">
            "ଜୟ ମାଁ ସମଲେଇ — ଭୁବନେଶ୍ୱରରେ ଏକ ପବିତ୍ର ସାଂସ୍କୃତିକ କେନ୍ଦ୍ର"
          </p>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      {/* Sacred Darshan Hero Grid */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Authentic Maa Samalei Sacred Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="group relative mx-auto max-w-md rounded-3xl overflow-hidden border-2 border-[#A31D1D] shadow-[0_0_40px_rgba(163,29,29,0.5)] bg-black">
              <ShimmerBorder />
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/maa-samalei-sacred-darshan.jpeg"
                  alt="Sacred Darshan of Presiding Deity Maa Samaleswari"
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />
              </div>
              <div className="p-4 bg-[#141416] text-center border-t border-[#A31D1D]/50">
                <span className="font-odia text-base font-bold text-[#EF4444] block">
                  ଜୟ ମାଁ ସମଲେଇ 🙏
                </span>
                <span className="text-xs text-[#D1D5DB] block mt-1">
                  The Spiritual Beacon of Western Odisha Diaspora in Bhubaneswar
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A31D1D]/50 bg-[#241113] px-3.5 py-1 text-xs font-semibold text-[#EF4444]">
              <Sparkles className="h-3 w-3" />
              <span>30-Year Cherished Vision</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              A Long-Cherished Spiritual Anchor in the State Capital
            </h2>
            <p className="text-base text-[#D1D5DB] leading-relaxed">
              Paschim Odisha Agrani Sangathana (POAS) is actively spearheading the establishment of a dedicated <strong className="text-white">Maa Samalei Mandir and Cultural Complex</strong> in Bhubaneswar.
            </p>
            <p className="text-base text-[#D1D5DB] leading-relaxed">
              With tens of thousands of students, working professionals, government servants, and senior citizens from Western Odisha residing in Bhubaneswar, the absence of a dedicated sacred temple for Presiding Deity <strong className="text-white">Maa Samaleswari</strong> has been keenly felt.
            </p>
            <p className="text-base text-[#9CA3AF] leading-relaxed">
              During consultative deliberations with elected MLAs and leadership patrons, POAS presented the architectural roadmap and collective diaspora backing for land allocation and development under applicable statutory guidelines.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link
                href="/donations"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A31D1D] to-[#EF4444] px-6 py-3 text-xs font-bold text-white shadow-lg hover:scale-105 transition-all"
              >
                <Heart className="h-4 w-4" />
                <span>Contribute to Mandir Fund</span>
              </Link>
              <Link
                href="/meetings"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-5 py-3 text-xs font-semibold text-white hover:border-[#A31D1D] hover:bg-white/[0.1] transition-all"
              >
                <span>Read Consultative Proceedings</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#EF4444]" />
              </Link>
            </div>
          </div>

        </div>
      </ScrollReveal>

      {/* Project Pillars / Scope */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScrollReveal delay={80}>
          <div className="group relative flex flex-col rounded-3xl glass-card-interactive p-6 h-full border border-white/10 hover:border-[#A31D1D]">
            <ShimmerBorder />
            <Building2 className="h-8 w-8 text-[#EF4444] mb-4" />
            <h3 className="font-serif text-xl font-bold text-white">1. Authentic Temple Shikhara</h3>
            <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
              Classical Rekha Deula temple structure carved from traditional stone, honoring the sacred architectural motifs of the original Sambalpur Samaleswari shrine.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div className="group relative flex flex-col rounded-3xl glass-card-interactive p-6 h-full border border-white/10 hover:border-[#A31D1D]">
            <ShimmerBorder />
            <Sparkles className="h-8 w-8 text-[#EF4444] mb-4" />
            <h3 className="font-serif text-xl font-bold text-white">2. Sambalpuri Kala Bhavan</h3>
            <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
              An auditorium and cultural exhibition hall dedicated to staging traditional Western Odia dance forms, drama, handloom exhibitions, and literary conclaves.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <div className="group relative flex flex-col rounded-3xl glass-card-interactive p-6 h-full border border-white/10 hover:border-[#A31D1D]">
            <ShimmerBorder />
            <Shield className="h-8 w-8 text-[#EF4444] mb-4" />
            <h3 className="font-serif text-xl font-bold text-white">3. Pilgrim &amp; Student Bhavan</h3>
            <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
              Guest accommodations and counseling facilities for Western Odisha patients, students appearing for examinations, and pilgrims visiting Bhubaneswar.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Official Status Metrics Box */}
      <ScrollReveal>
        <div className="rounded-3xl glass-panel-elevated p-8 sm:p-12 border border-[#2D2D35]">
          <h3 className="font-serif text-2xl font-bold text-white mb-6">
            Project Status &amp; Administrative Transparency
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl border border-white/10 bg-[#0B0B0C] p-4">
              <span className="text-[11px] font-bold text-[#EF4444] uppercase block">Location</span>
              <span className="text-sm font-semibold text-white mt-1 block">Bhubaneswar, Odisha</span>
              <span className="text-xs text-[#9CA3AF] mt-0.5 block">Site allocation under verification</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0B0B0C] p-4">
              <span className="text-[11px] font-bold text-[#EF4444] uppercase block">Project Status</span>
              <span className="text-sm font-semibold text-white mt-1 block">Proposed &amp; Deliberated</span>
              <span className="text-xs text-[#9CA3AF] mt-0.5 block">Subject to applicable statutory approvals</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0B0B0C] p-4">
              <span className="text-[11px] font-bold text-[#EF4444] uppercase block">Community Backing</span>
              <span className="text-sm font-semibold text-white mt-1 block">10,000+ Enrolled Voices</span>
              <span className="text-xs text-[#9CA3AF] mt-0.5 block">Participatory grassroots movement</span>
            </div>
          </div>

          <p className="text-xs text-[#6B7280] mt-6 italic">
            *Note: All architectural proposals, approvals, funding, and construction will proceed in strict accordance with statutory, municipal, and legal norms of the Government of Odisha.
          </p>
        </div>
      </ScrollReveal>

    </div>
  );
}
