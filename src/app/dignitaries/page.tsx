import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Users, Award, Shield, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Dignitaries & Patrons | Paschim Odisha Agrani Sangathana",
  description: "Elected public representatives (MLAs), cultural patrons, and leadership partners collaborating with POAS in Bhubaneswar.",
};

export default async function DignitariesPage() {
  const dignitaries = await prisma.dignitary.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
            Patrons &amp; Representation
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
            Dignitaries &amp; Public Leadership
          </h1>
          <p className="text-base text-[#D1D5DB] mt-3 leading-relaxed font-odia text-lg">
            "ପଶ୍ଚିମ ଓଡ଼ିଶାର ଗୌରବ ଓ ପ୍ରତିନିଧିତ୍ୱ"
          </p>
        </div>
      </ScrollReveal>

      {/* Prominent Callout Banner for Governing Body */}
      <ScrollReveal>
        <div className="rounded-3xl bg-gradient-to-r from-[#241113] via-[#141416] to-[#0B0B0C] border-2 border-[#A31D1D] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_25px_rgba(163,29,29,0.3)]">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#EF4444] block">
              Official Resolution Roster
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Looking for the 19-Member POAS Governing Body?
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              View all 19 democratically elected office bearers, matched photographic portraits, designations, and contact details.
            </p>
          </div>
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 rounded-xl bg-[#A31D1D] px-6 py-3 text-xs font-bold text-white shadow hover:bg-[#EF4444] transition-all flex-none hover:scale-105"
          >
            <span>View Governing Body (19)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      {/* Dignitaries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dignitaries.map((dig, idx) => (
          <ScrollReveal key={dig.id} delay={idx * 90}>
            <div className="group relative flex flex-col sm:flex-row rounded-3xl glass-card-interactive overflow-hidden h-full border border-white/10 hover:border-[#A31D1D]">
              <ShimmerBorder />
              <div className="relative aspect-[4/3] sm:aspect-square sm:w-56 bg-black flex-none">
                {dig.imageUrl ? (
                  <Image
                    src={dig.imageUrl}
                    alt={dig.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#EF4444]">
                    <Users className="h-12 w-12" />
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="rounded-md bg-[#A31D1D] px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                    {dig.constituency ? `MLA — ${dig.constituency}` : dig.category}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-white mt-3 group-hover:text-[#EF4444] transition-colors">
                    {dig.name}
                  </h3>
                  <p className="text-xs text-[#EF4444] font-semibold mt-1">
                    {dig.designation}
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-3 leading-relaxed">
                    {dig.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#2D2D35] flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span>Maa Samalei Deliberation</span>
                  <span className="text-green-400 flex items-center gap-1 font-medium">
                    <CheckCircle className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
}
