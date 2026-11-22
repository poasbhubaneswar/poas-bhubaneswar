import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Users, Shield, CheckCircle2, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Governing Body & Leadership | Paschim Odisha Agrani Sangathana",
  description: "Official 19-member Governing Body and Executive Committee of Paschim Odisha Agrani Sangathana (POAS), Bhubaneswar.",
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

  const governingBody = allBearers.filter((b) => b.category === "GOVERNING_BODY");
  const executiveBody = allBearers.filter((b) => b.category === "EXECUTIVE_BODY");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
            Official Leadership
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
            Governing Body &amp; Executive Council
          </h1>
          <p className="text-base text-[#D1D5DB] mt-3 leading-relaxed font-odia text-lg">
            "ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନର ନୂତନ କର୍ମକର୍ତ୍ତା ଓ କାର୍ଯ୍ୟକାରିଣୀ କମିଟି"
          </p>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2 max-w-2xl mx-auto">
            Democratically elected leadership structure comprising 19 office bearers and executive members guiding POAS and spearheading the Maa Samalei Mandir Project in Bhubaneswar.
          </p>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      {/* SECTION 1: GOVERNING BODY (9 MEMBERS) */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 border-l-4 border-[#A31D1D] pl-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Governing Body
              </h2>
              <span className="text-xs font-odia text-[#EF4444]">
                ପରିଚାଳନା ପରିଷଦ (୯ ଜଣ କର୍ମକର୍ତ୍ତା)
              </span>
            </div>
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

      {/* SECTION 2: EXECUTIVE BODY (10 MEMBERS) */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 border-l-4 border-white pl-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Executive Body
              </h2>
              <span className="text-xs font-odia text-[#D1D5DB]">
                କାର୍ଯ୍ୟକାରିଣୀ କମିଟି (୧୦ ଜଣ ସଦସ୍ୟ)
              </span>
            </div>
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

      {/* Audit & Verification Covenant Note */}
      <ScrollReveal>
        <div className="rounded-3xl glass-panel p-8 sm:p-10 border border-white/10">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-[#EF4444] flex-none mt-1" />
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-white">
                Official Electoral &amp; Document Record
              </h3>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                All 19 office bearers listed above were duly elected in accordance with the official POAS Governing Body resolution. The platform displays verified photographic portraits matched with respective designations. For the 5 members whose individual high-resolution portraits are currently under administrative archival compilation, formal verification badges are maintained.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}
