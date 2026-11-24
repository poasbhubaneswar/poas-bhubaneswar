import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Award, Compass, Heart, Users, History, CheckCircle, Sparkles, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About POAS | Paschim Odisha Agrani Sangathana, Bhubaneswar",
  description: "30+ year legacy of Paschim Odisha Agrani Sangathana (POAS) in Bhubaneswar. Dedicated to Western Odisha cultural preservation, 10+ districts unity, and the Maa Samalei Mandir Project.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <div className="relative mb-5 mx-auto h-22 w-22 flex items-center justify-center rounded-2xl bg-white border-2 border-[#A31D1D] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2),0_0_20px_rgba(163,29,29,0.5)] p-2">
            <Image
              src="/images/poas-logo.png"
              alt="POAS Official Logo"
              fill
              sizes="88px"
              className="object-contain"
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
            Three Decades of Stewardship
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
            Paschim Odisha Agrani Sangathana
          </h1>
          <p className="text-base text-[#D1D5DB] mt-3 leading-relaxed font-odia text-lg">
            "ସଂସ୍କୃତି · ସମାଜ · ସେବା" — Culture · Community · Service
          </p>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      {/* Narrative Section */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A31D1D]/40 bg-[#241113] px-3.5 py-1 text-xs font-semibold text-[#EF4444]">
              <Sparkles className="h-3 w-3" />
              <span>Founded in Bhubaneswar · 1990s</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Who We Are &amp; Our Genesis
            </h2>
            <p className="text-base text-[#D1D5DB] leading-relaxed">
              <strong className="text-white">Paschim Odisha Agrani Sangathana (POAS)</strong> is an esteemed socio-cultural organization representing the vibrant heritage, distinct linguistic beauty, and diaspora of Western Odisha residing in the state capital, Bhubaneswar.
            </p>
            <p className="text-base text-[#D1D5DB] leading-relaxed">
              Founded over 30 years ago by prominent cultural luminaries, scholars, and community elders, POAS was established to provide an authoritative, democratic, and unifying platform for families originating from all 10+ Western Odisha districts: <strong className="text-white">Sambalpur, Balangir, Bargarh, Kalahandi, Nuapada, Subarnapur (Sonepur), Deogarh, Jharsuguda, Sundargarh, Boudh</strong>, and neighboring diaspora communities.
            </p>
            <p className="text-base text-[#9CA3AF] leading-relaxed">
              Today, POAS stands as the vanguard of Western Odisha's cultural aspirations—spearheading the grand annual <strong className="text-white">Nuakhai Bhetghat</strong>, orchestrating youth development initiatives, and driving the landmark <strong className="text-white">Maa Samalei Mandir &amp; Cultural Complex</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] w-full rounded-3xl glass-panel p-2 overflow-hidden shadow-2xl border border-[#A31D1D]/30">
              <Image
                src="/images/events/poas-committee-review.jpeg"
                alt="POAS Executive Committee Meeting"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Core Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScrollReveal delay={60}>
          <div className="group relative flex flex-col rounded-3xl glass-card-interactive p-6 h-full border border-white/10 hover:border-[#A31D1D]">
            <ShimmerBorder />
            <Compass className="h-8 w-8 text-[#EF4444] mb-4" />
            <h3 className="font-serif text-lg font-bold text-white">Cultural Preservation</h3>
            <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
              Protecting and celebrating Sambalpuri handloom, folk music, Panchabadya dance, culinary arts, and linguistic identity.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="group relative flex flex-col rounded-3xl glass-card-interactive p-6 h-full border border-white/10 hover:border-[#A31D1D]">
            <ShimmerBorder />
            <Users className="h-8 w-8 text-[#EF4444] mb-4" />
            <h3 className="font-serif text-lg font-bold text-white">10+ Districts Solidarity</h3>
            <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
              Fostering a tight-knit brotherhood among tens of thousands of Western Odia students, professionals, and families in Bhubaneswar.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <div className="group relative flex flex-col rounded-3xl glass-card-interactive p-6 h-full border border-white/10 hover:border-[#A31D1D]">
            <ShimmerBorder />
            <Heart className="h-8 w-8 text-[#EF4444] mb-4" />
            <h3 className="font-serif text-lg font-bold text-white">Social Action &amp; Service</h3>
            <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
              Coordinating emergency medical assistance, youth mentorship, disaster relief, and charitable educational aid.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <div className="group relative flex flex-col rounded-3xl glass-card-interactive p-6 h-full border border-white/10 hover:border-[#A31D1D]">
            <ShimmerBorder />
            <Award className="h-8 w-8 text-[#EF4444] mb-4" />
            <h3 className="font-serif text-lg font-bold text-white">Democratic Governance</h3>
            <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
              Open general body participation, verified administrative records, constitutional elections, and transparent leadership.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* 30-Year Milestones Timeline */}
      <ScrollReveal>
        <div className="rounded-3xl glass-panel-elevated p-8 sm:p-12 border border-[#2D2D35]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
              Historic Journey
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">
              Three Decades of Milestones
            </h2>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              {
                year: "1990s",
                title: "Founding of POAS in Bhubaneswar",
                desc: "Western Odisha elders and cultural custodians united in Bhubaneswar to form a registered platform ensuring mutual support, cultural continuity, and celebration of Nuakhai in the state capital.",
              },
              {
                year: "2000s",
                title: "Institutional Expansion & Nuakhai Bhetghat",
                desc: "Established the grand annual Nuakhai Bhetghat festival, bringing together Sambalpuri folk artistes, dignitaries, ministers, and thousands of diaspora families every autumn.",
              },
              {
                year: "2010s",
                title: "Maa Samalei Mandir Vision & Youth Wing",
                desc: "Formulated the foundational blueprint for a central Maa Samalei temple and cultural complex in Bhubaneswar. Mobilized youth committees and emergency mutual aid network.",
              },
              {
                year: "2020s & Beyond",
                title: "Democratic Consolidation & New Governing Body",
                desc: "Electing a modern 19-member Governing Body and Executive Council, digitizing membership enrolment, and advancing land allocation for the sacred Mandir.",
              },
            ].map((milestone, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#A31D1D] transition-colors"
              >
                <div className="rounded-xl bg-[#A31D1D] px-4 py-2 text-xs font-bold text-white h-fit sm:w-28 text-center flex-none">
                  {milestone.year}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* CTA Box */}
      <ScrollReveal>
        <div className="rounded-3xl glass-panel p-8 text-center space-y-4 border border-[#A31D1D]/40">
          <h3 className="font-serif text-2xl font-bold text-white">
            Be Part of Our Next Chapter
          </h3>
          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xl mx-auto">
            Whether you are from Sambalpur, Balangir, Bargarh, Kalahandi or any of our 10+ districts, POAS welcomes you with open arms.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A31D1D] to-[#EF4444] px-6 py-3 text-xs font-bold text-white shadow-lg hover:scale-105 transition-all"
            >
              <span>Join POAS Today</span>
            </Link>
            <Link
              href="/leadership"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3 text-xs font-semibold text-white hover:bg-white/[0.1] transition-all"
            >
              <span>Meet Governing Body</span>
            </Link>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}
