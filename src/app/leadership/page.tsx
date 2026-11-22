import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Users, Shield, CheckCircle2, AlertCircle, Award, FileText, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Leadership & Governing Body | Paschim Odisha Agrani Sangathana",
  description: "Official Leadership, Board of Advisors according to POAS LH and Governing Body & Executive Council according to the official resolution.",
};

export default async function LeadershipPage() {
  const allBearers = await prisma.officeBearer.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: "asc" },
    select: {
      id: true,
      name: true,
      nameOdia: true,
      designation: true,
      category: true,
      imageUrl: true,
      bio: true,
      displayOrder: true,
    },
  });

  const advisors = allBearers.filter((b) => b.category === "ADVISORY_COUNCIL");
  const governingBody = allBearers.filter((b) => b.category === "GOVERNING_BODY");
  const executiveBody = allBearers.filter((b) => b.category === "EXECUTIVE_BODY");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">
      
      {/* =========================================================================
          PAGE HEADER & ARCHIVAL ACCREDITATION
         ========================================================================= */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A31D1D]/50 bg-[#1A1A1E] px-4 py-1 text-xs font-semibold text-[#EF4444] mb-3">
            <Award className="h-3.5 w-3.5" />
            <span>Constitutional Structure &amp; Institutional Governance</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
            Leadership &amp; Governing Body
          </h1>

          <p className="text-base text-[#D1D5DB] mt-3 leading-relaxed font-odia text-lg">
            "ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନର ନେତୃତ୍ୱ ମଣ୍ଡଳୀ, ଉପଦେଷ୍ଟା ପରିଷଦ ଓ ପରିଚାଳନା କମିଟି"
          </p>

          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-3 max-w-2xl mx-auto leading-relaxed">
            The official institutional hierarchy of Paschim Odisha Agrani Sangathan (POAS), Bhubaneswar. Leadership and Advisory Council formulated per official Letterhead (<strong className="text-white">POAS LH</strong>, Regd. No. KRD 6761-443, 95-96) and Governing Body constituted per the official Electoral Resolution.
          </p>

          {/* Dual Institutional Framework Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-300">
              <FileText className="h-3.5 w-3.5" />
              <span>Leadership per POAS LH</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A31D1D]/50 bg-[#241113] px-3.5 py-1 text-xs font-medium text-white">
              <Shield className="h-3.5 w-3.5 text-[#EF4444]" />
              <span>Governing Body per Electoral Resolution</span>
            </span>
          </div>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      {/* =========================================================================
          SECTION 1: BOARD OF ADVISORS (According to POAS LH.pdf)
         ========================================================================= */}
      <section id="advisors" className="space-y-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-amber-500 pl-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                <Award className="h-3.5 w-3.5" />
                <span>According to Official Letterhead (POAS LH)</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Board of Advisors · ଉପଦେଷ୍ଟାମଣ୍ଡଳୀ
              </h2>
              <span className="text-xs font-odia text-[#D1D5DB]">
                ସମ୍ମାନନୀୟ ଉପଦେଷ୍ଟା ପରିଷଦ (୫ ଜଣ ବିଶିଷ୍ଟ ବ୍ୟକ୍ତିତ୍ୱ)
              </span>
            </div>
            <span className="text-xs text-[#9CA3AF] bg-white/[0.04] px-3 py-1 rounded-full border border-white/10 self-start sm:self-auto">
              5 Distinguished Patrons
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advisors.map((member, idx) => (
            <ScrollReveal key={member.id} delay={idx * 60}>
              <div className="group relative flex flex-col rounded-3xl glass-card-interactive overflow-hidden h-full border border-amber-500/20 hover:border-amber-500/60 transition-all">
                <ShimmerBorder />
                
                {/* Advisor Visual Presentation */}
                <div className="relative aspect-[3/4] w-full bg-[#111114] overflow-hidden">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1E1912] via-[#141210] to-[#0B0B0C]">
                      <div className="h-20 w-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                        <Award className="h-9 w-9" />
                      </div>
                      <span className="text-xs font-bold text-white uppercase tracking-wider block">
                        {member.designation}
                      </span>
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold text-amber-300">
                        <Award className="h-3 w-3" />
                        <span>Official Advisor · POAS LH</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 rounded-full bg-black/85 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider border border-amber-500/30">
                    Advisor
                  </div>
                </div>

                {/* Advisor Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {member.name}
                    </h3>
                    {member.nameOdia && (
                      <span className="text-sm font-odia font-medium text-amber-400/90 block mt-1">
                        {member.nameOdia}
                      </span>
                    )}
                    <div className="mt-2.5 inline-block rounded-lg bg-amber-500/10 border border-amber-500/40 px-3 py-1 text-xs font-bold text-amber-300">
                      {member.designation}
                    </div>
                    {member.bio && (
                      <p className="text-xs text-[#9CA3AF] mt-3 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#2D2D35] flex items-center justify-between text-xs text-[#9CA3AF]">
                    <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider font-semibold">
                      Advisory Council
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> POAS LH
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: GOVERNING BODY (According to NEWLY ELECTED GOVERNING BODY.docx)
         ========================================================================= */}
      <section id="governing-body" className="space-y-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-[#A31D1D] pl-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EF4444] mb-1">
                <Shield className="h-3.5 w-3.5" />
                <span>According to Newly Elected Governing Body Resolution</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Governing Body · ପରିଚାଳନା ପରିଷଦ
              </h2>
              <span className="text-xs font-odia text-[#D1D5DB]">
                ନିର୍ବାଚିତ ପରିଚାଳନା ପରିଷଦ (୯ ଜଣ କର୍ମକର୍ତ୍ତା)
              </span>
            </div>
            <span className="text-xs text-[#9CA3AF] bg-white/[0.04] px-3 py-1 rounded-full border border-white/10 self-start sm:self-auto">
              9 Elected Office Bearers
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {governingBody.map((member, idx) => (
            <ScrollReveal key={member.id} delay={idx * 60}>
              <div className="group relative flex flex-col rounded-3xl glass-card-interactive overflow-hidden h-full border border-white/10 hover:border-[#A31D1D]">
                <ShimmerBorder />
                
                {/* Image or Cultural Placeholder */}
                <div className="relative aspect-[3/4] w-full bg-[#111114] overflow-hidden">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1E1214] to-[#0B0B0C]">
                      <div className="h-20 w-20 rounded-full bg-[#2A1114] border border-[#A31D1D]/50 flex items-center justify-center text-[#EF4444] mb-3 shadow-inner">
                        <Users className="h-9 w-9" />
                      </div>
                      <span className="text-xs font-bold text-white uppercase tracking-wider block">
                        {member.designation}
                      </span>
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold text-amber-400">
                        <AlertCircle className="h-3 w-3" />
                        <span>Photo verification pending</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 rounded-full bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-[#EF4444] uppercase tracking-wider border border-white/10">
                    Governing Body
                  </div>
                </div>

                {/* Member Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#EF4444] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    {member.nameOdia && (
                      <span className="text-sm font-odia font-medium text-[#EF4444] block mt-1">
                        {member.nameOdia}
                      </span>
                    )}
                    <div className="mt-2 inline-block rounded-lg bg-[#241113] border border-[#A31D1D]/50 px-3 py-1 text-xs font-bold text-white">
                      {member.designation}
                    </div>
                    {member.bio && (
                      <p className="text-xs text-[#9CA3AF] mt-3 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#2D2D35] flex items-center justify-between text-xs text-[#9CA3AF]">
                    <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider font-semibold">
                      Governing Council
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] text-green-400 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Elected
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: EXECUTIVE BODY (According to NEWLY ELECTED GOVERNING BODY.docx Table 2)
         ========================================================================= */}
      <section id="executive-body" className="space-y-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-white pl-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D1D5DB] mb-1">
                <Users className="h-3.5 w-3.5" />
                <span>Executive Committee (Table 2 of Electoral Resolution)</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Executive Body · କାର୍ଯ୍ୟକାରିଣୀ କମିଟି
              </h2>
              <span className="text-xs font-odia text-[#D1D5DB]">
                କାର୍ଯ୍ୟକାରିଣୀ କମିଟି (୧୦ ଜଣ ସଦସ୍ୟ)
              </span>
            </div>
            <span className="text-xs text-[#9CA3AF] bg-white/[0.04] px-3 py-1 rounded-full border border-white/10 self-start sm:self-auto">
              10 Executive Members
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {executiveBody.map((member, idx) => (
            <ScrollReveal key={member.id} delay={idx * 50}>
              <div className="group relative flex flex-col rounded-3xl glass-card-interactive overflow-hidden h-full border border-white/10 hover:border-[#A31D1D]">
                <ShimmerBorder />
                
                {/* Image or Cultural Placeholder */}
                <div className="relative aspect-[3/4] w-full bg-[#111114] overflow-hidden">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-[#1A1A20] to-[#0B0B0C]">
                      <div className="h-16 w-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white mb-2">
                        <Users className="h-7 w-7" />
                      </div>
                      <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                        {member.designation}
                      </span>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[9px] font-medium text-amber-400">
                        <AlertCircle className="h-2.5 w-2.5" />
                        <span>Photo pending</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold text-white/90 uppercase tracking-wider border border-white/10">
                    Executive
                  </div>
                </div>

                {/* Member Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base font-bold text-white group-hover:text-[#EF4444] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    {member.nameOdia && (
                      <span className="text-xs font-odia font-medium text-[#EF4444] block mt-0.5">
                        {member.nameOdia}
                      </span>
                    )}
                    <span className="text-xs text-[#9CA3AF] block mt-1">
                      {member.designation}
                    </span>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#2D2D35] flex items-center justify-between text-xs text-[#9CA3AF]">
                    <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider font-semibold">
                      Executive Council
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] text-green-400 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Elected
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          AUDIT & DOCUMENTARY ACCREDITATION COVENANT
         ========================================================================= */}
      <ScrollReveal>
        <div className="rounded-3xl glass-panel p-8 sm:p-10 border border-white/10 bg-gradient-to-br from-[#141418] via-[#101014] to-[#160D0E]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <Shield className="h-7 w-7 text-[#EF4444] flex-none mt-1" />
              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Official Documentary &amp; Constitutional Accreditation
                </h3>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed max-w-3xl">
                  This platform adheres strictly to the official records of Paschim Odisha Agrani Sangathan (POAS). Leadership titles, professional designations, and the Board of Advisors are accredited per <strong className="text-white">POAS LH.pdf</strong> (Registration No. KRD 6761-443, 95-96). The Governing Body and Executive Council members are documented per the official resolution in <strong className="text-white">NEWLY ELECTED GOVERNING BODY (1).docx</strong>.
                </p>
                <div className="pt-2 text-xs text-[#6B7280]">
                  Headquarters: Plot No.: 71, Satabdi Nagar, Bhubaneswar, PIN-751003, Dist.: Khordha, Odisha.
                </div>
              </div>
            </div>

            <Link
              href="/governing-body"
              className="inline-flex items-center gap-2 rounded-full border border-[#A31D1D] bg-[#241113] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#A31D1D] transition-all flex-none whitespace-nowrap shadow-sm"
            >
              <span>View Governing Body Resolution</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
