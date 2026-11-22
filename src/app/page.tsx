import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { SambalpuriBand, MaaSamaleiWatermark, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { SambalpuriMandalaAura } from "@/components/ui/SambalpuriMandalaAura";
import { GlowingBorderRunner } from "@/components/ui/BorderBeam";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ImpactMetrics } from "@/components/ui/ImpactMetrics";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Calendar, MapPin, Users, Heart, Sparkles, Building2, Shield, Check } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  // Fetch dynamic content from Prisma database
  const [event, officeBearers, meetings, articles, galleryItems, siteSettings] = await Promise.all([
    prisma.event.findFirst({
      where: { isPublished: true },
      include: { schedules: { orderBy: { orderIndex: "asc" } } },
    }),
    prisma.officeBearer.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
      take: 4,
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
    }),
    prisma.meeting.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
      take: 3,
    }),
    prisma.article.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.galleryItem.findMany({
      where: { isFeatured: true },
      orderBy: { displayOrder: "asc" },
      take: 6,
    }),
    prisma.siteSetting.findMany(),
  ]);

  const settingsMap = Object.fromEntries(siteSettings.map((s) => [s.key, s.value]));

  // Dynamic CMS Settings
  const heroOdia = settingsMap.hero_odia_title || "ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନ";
  const heroEnglishTitle = settingsMap.hero_english_title || "POAS – Paschim Odisha Agrani Sangathana";
  const heroDesc = settingsMap.hero_description || "Uniting the vibrant diaspora of 10+ Western Odisha districts in Bhubaneswar. For over 30 years, preserving our sacred cultural heritage, advancing community empowerment, and building the landmark Maa Samalei Mandir & Cultural Complex.";

  return (
    <div className="flex flex-col gap-24 pb-24 overflow-hidden">
      
      {/* =========================================================================
          1. CINEMATIC POAS HERO SECTION
         ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-20">
        
        {/* Background Event Image with Deep Obsidian & Crimson Red Masks */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/hero/nuakhai-ceremony-hero.jpeg"
            alt="POAS Community Gathering"
            fill
            priority
            className="object-cover object-center opacity-25 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/85 to-[#A31D1D]/40" />
          <div className="absolute inset-0 bg-radial-[at_50%_30%] from-transparent via-[#0B0B0C]/60 to-[#0B0B0C]" />
        </div>

        {/* Ambient Maa Samalei Watermark Iconography */}
        <MaaSamaleiWatermark className="absolute right-4 top-1/4 w-[420px] max-w-[45vw] opacity-35 -z-10" />

        {/* Sacred Concentric Sambalpuri Mandala Aura behind title */}
        <SambalpuriMandalaAura className="top-1/3 opacity-40" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          
          {/* Official POAS Logo Presentation */}
          <div className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-black/80 border-2 border-[#A31D1D] shadow-[0_0_30px_rgba(163,29,29,0.5)] overflow-hidden animate-pulse-subtle">
            <Image
              src="/images/poas-logo.png"
              alt="Paschim Odisha Agrani Sangathana Official Logo"
              fill
              priority
              sizes="112px"
              className="object-contain p-2"
            />
          </div>

          {/* Main Odia Calligraphic Title with White-to-Red Shimmer */}
          <h1 className="font-odia text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md max-w-4xl leading-[1.2] animate-text-shimmer">
            {heroOdia}
          </h1>

          {/* English Subtitle */}
          <h2 className="font-serif text-2xl sm:text-4xl text-white mt-3 font-semibold tracking-wide">
            {heroEnglishTitle}
          </h2>

          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#A31D1D]/50 bg-[#1A1A1E]/80 px-4 py-1 text-xs font-semibold text-[#EF4444]">
            <Sparkles className="h-3 w-3" />
            <span>Serving 10+ Western Odisha Districts · 30+ Years of Heritage</span>
          </div>

          <p className="mt-5 max-w-3xl text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
            {heroDesc}
          </p>

          {/* Hero Action CTAs */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A31D1D] to-[#EF4444] px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#A31D1D]/25 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Join POAS · Membership</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/leadership"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/[0.12] hover:border-[#A31D1D]"
            >
              <Users className="h-4 w-4 text-[#EF4444]" />
              <span>Governing Body</span>
            </Link>

            <Link
              href="/meetings"
              className="inline-flex items-center gap-2 rounded-full border border-[#2D2D35] bg-[#141416]/90 px-6 py-3.5 text-sm font-medium text-[#D1D5DB] hover:text-white hover:border-white/30 transition-colors"
            >
              <Calendar className="h-4 w-4 text-[#EF4444]" />
              <span>Meetings &amp; Activities</span>
            </Link>
          </div>

        </div>

        {/* Decorative Sambalpuri Band at Section Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <SambalpuriBand />
        </div>
      </section>


      {/* =========================================================================
          CULTURAL IMPACT METRICS & THREE DECADES OF HERITAGE
         ========================================================================= */}
      <ImpactMetrics />


      {/* =========================================================================
          2. MAA SAMALEI SACRED DARSHAN & MANDIR PROJECT (FEATURED PHOTOGRAPH)
         ========================================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl glass-panel-elevated p-8 sm:p-12 border border-[#A31D1D]/40">
            <GlowingBorderRunner />
            <ShimmerBorder />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Authentic Maa Samalei Photograph */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden border-2 border-[#A31D1D] shadow-[0_0_35px_rgba(163,29,29,0.45)] bg-black">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="/images/maa-samalei-sacred-darshan.jpeg"
                      alt="Sacred Darshan of Presiding Deity Maa Samaleswari"
                      fill
                      priority
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  </div>
                  <div className="p-3.5 bg-black/90 text-center border-t border-[#A31D1D]/50">
                    <span className="font-odia text-sm font-bold text-[#EF4444] block">
                      ଜୟ ମାଁ ସମଲେଇ 🙏
                    </span>
                    <span className="text-[11px] text-[#D1D5DB] block mt-0.5">
                      Presiding Deity of Western Odisha &amp; Spiritual Foundation of POAS
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Mandir Project & Cultural Sanctuary */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#A31D1D]/40 bg-[#1A1A1E] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#EF4444]">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Landmark Cultural Project</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  Maa Samalei Mandir &amp; Cultural Complex, Bhubaneswar
                </h2>

                <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                  For over three decades, the families of Western Odisha residing in the capital have aspired for a central spiritual sanctum and cultural anchor. Paschim Odisha Agrani Sangathana is actively spearheading the historic establishment of Maa Samalei Mandir in Bhubaneswar.
                </p>

                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  The complex is envisioned with authentic Kalinga-Kosala temple architecture, community auditorium, cultural archives, and student fellowship center—uniting the diaspora across all 10+ districts.
                </p>

                {/* Project Status Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="rounded-xl border border-white/10 bg-[#0B0B0C]/80 p-3.5 shadow-inner">
                    <span className="text-[11px] font-semibold uppercase text-[#EF4444] block">Status</span>
                    <span className="text-sm font-bold text-white block mt-1">Land &amp; Planning</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0B0B0C]/80 p-3.5 shadow-inner">
                    <span className="text-[11px] font-semibold uppercase text-[#EF4444] block">Location</span>
                    <span className="text-sm font-bold text-white block mt-1">Bhubaneswar</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0B0B0C]/80 p-3.5 col-span-2 sm:col-span-1 shadow-inner">
                    <span className="text-[11px] font-semibold uppercase text-[#EF4444] block">Districts</span>
                    <span className="text-sm font-bold text-white block mt-1">10+ Western Odisha</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/maasamalei"
                    className="inline-flex items-center gap-2 rounded-full bg-[#A31D1D] px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-[#EF4444] transition-all hover:scale-105"
                  >
                    <span>Read Mandir Blueprint</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/donations"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-6 py-2.5 text-xs font-semibold text-white hover:bg-white/[0.1] hover:border-[#A31D1D] transition-colors"
                  >
                    <Heart className="h-3.5 w-3.5 text-[#EF4444]" />
                    <span>Support Mandir Fund</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>
      </section>


      {/* =========================================================================
          3. MEETINGS & ACTIVITIES SECTION (ORGANIZED ENTRIES)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
                Official Records &amp; Deliberations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Meetings &amp; Sangathan Activities
              </h2>
            </div>
            <Link
              href="/meetings"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white hover:border-[#A31D1D] hover:bg-white/[0.1] transition-all"
            >
              <span>View All Meetings</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#EF4444]" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {meetings.map((meeting, idx) => (
            <ScrollReveal key={meeting.id} delay={idx * 100}>
              <SpotlightCard className="group relative flex flex-col rounded-3xl glass-card-interactive h-full">
                <ShimmerBorder />
                {meeting.coverImage && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <Image
                      src={meeting.coverImage}
                      alt={meeting.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 rounded-full bg-black/75 px-3 py-1 text-[10px] font-bold text-[#EF4444] border border-white/10 backdrop-blur-md">
                      {meeting.date ? new Date(meeting.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Recorded"}
                    </div>
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mb-2">
                      <MapPin className="h-3.5 w-3.5 text-[#EF4444]" />
                      <span>{meeting.location || "Bhubaneswar"}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#EF4444] transition-colors leading-snug">
                      {meeting.title}
                    </h3>
                    <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-3 leading-relaxed">
                      {meeting.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#2D2D35] flex items-center justify-between text-xs">
                    <span className="text-[#6B7280] font-medium">Documented Record</span>
                    <Link
                      href={`/meetings/${meeting.slug}`}
                      className="text-[#EF4444] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Details</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </section>


      {/* =========================================================================
          4. LEADERSHIP & GOVERNING BODY (MATCHED 19 MEMBERS SPOTLIGHT)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
              Constitutional Governance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1.5">
              Governing Body &amp; Leadership Structure
            </h2>
            <p className="text-sm text-[#9CA3AF] mt-2">
              Elected office bearers and executive members guiding Paschim Odisha Agrani Sangathana.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {officeBearers.map((ob, idx) => (
            <ScrollReveal key={ob.id} delay={idx * 80}>
              <SpotlightCard className="group relative flex flex-col rounded-3xl glass-card-interactive h-full">
                <ShimmerBorder />
                <div className="relative aspect-[3/4] w-full bg-black overflow-hidden">
                  {ob.imageUrl ? (
                    <Image
                      src={ob.imageUrl}
                      alt={ob.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-4 text-center bg-[#17171B]">
                      <div className="h-16 w-16 rounded-full bg-[#241113] border border-[#A31D1D]/40 flex items-center justify-center text-[#EF4444] mb-2">
                        <Users className="h-7 w-7" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#9CA3AF] tracking-wider">
                        Official Office Bearer
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 rounded-md bg-[#A31D1D]/90 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-xs">
                    {ob.category.replace("_", " ")}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base font-bold text-white group-hover:text-[#EF4444] transition-colors leading-snug">
                      {ob.name}
                    </h3>
                    {ob.nameOdia && (
                      <span className="text-xs font-odia font-medium text-[#EF4444] block mt-0.5">
                        {ob.nameOdia}
                      </span>
                    )}
                    <p className="text-xs font-semibold text-white/90 mt-1">
                      {ob.designation}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-6 py-2.5 text-xs font-bold text-white hover:bg-white/[0.1] hover:border-[#A31D1D] transition-all"
          >
            <span>View All 19 Governing &amp; Executive Members</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#EF4444]" />
          </Link>
        </div>
      </section>


      {/* =========================================================================
          5. AUTHENTIC GALLERY PREVIEW
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
                Photographic Archives
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Heritage &amp; Community Archives
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white hover:border-[#A31D1D] hover:bg-white/[0.1] transition-all"
            >
              <span>Explore All Photos</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#EF4444]" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 80}>
              <SpotlightCard className="group relative flex flex-col rounded-3xl glass-card-interactive h-full">
                <ShimmerBorder />
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-white mt-1 group-hover:text-[#EF4444] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#9CA3AF] mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </section>


      {/* =========================================================================
          6. COMMUNITY MARQUEE TICKER (POAS RED & WHITE)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden py-9 bg-[#111114] border-y border-[#2D2D35] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0B0B0C] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0B0B0C] to-transparent" />

        <div className="animate-marquee flex gap-6">
          {[
            "ଜୁହାର 🙏 ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନ (POAS) ଭୁବନେଶ୍ୱର",
            "30+ Years of Western Odisha Culture, Community and Social Leadership",
            "Maa Samalei Mandir Project: Building Our Sacred Cultural Sanctuary in Bhubaneswar",
            "Uniting 10+ Districts: Sambalpur, Balangir, Bargarh, Kalahandi, Nuapada & beyond",
            "Lifetime Membership (₹1,000) & Yearly Membership (₹100) — Enrol Today",
            "ଜୟ ମାଁ ସମଲେଇ 🙏 Sacred Heritage, Solidarity and Shared Future",
          ].concat([
            "ଜୁହାର 🙏 ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନ (POAS) ଭୁବନେଶ୍ୱର",
            "30+ Years of Western Odisha Culture, Community and Social Leadership",
            "Maa Samalei Mandir Project: Building Our Sacred Cultural Sanctuary in Bhubaneswar",
            "Uniting 10+ Districts: Sambalpur, Balangir, Bargarh, Kalahandi, Nuapada & beyond",
            "Lifetime Membership (₹1,000) & Yearly Membership (₹100) — Enrol Today",
            "ଜୟ ମାଁ ସମଲେଇ 🙏 Sacred Heritage, Solidarity and Shared Future",
          ]).map((msg, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-full border border-[#A31D1D]/40 bg-[#1A1A1E] px-5 py-2 text-xs font-semibold text-white whitespace-nowrap shadow-sm hover:border-[#EF4444] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-pulse" />
              <span>{msg}</span>
            </div>
          ))}
        </div>
      </section>


      {/* =========================================================================
          7. TWO-TIER MEMBERSHIP SPOTLIGHT (LIFETIME ₹1,000 & YEARLY ₹100)
         ========================================================================= */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rounded-3xl glass-panel-elevated p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-[#A31D1D]/40">
            <GlowingBorderRunner />
            <ShimmerBorder />
            
            <div className="max-w-3xl mx-auto text-center space-y-3 relative z-10 mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
                Join the Sangathan
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                Official POAS Membership System
              </h2>
              <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                Be an active stakeholder in preserving Western Odisha's heritage, participating in Maa Samalei Mandir deliberations, and building our community solidarity in Bhubaneswar.
              </p>
            </div>

            {/* Two Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              
              {/* Tier 1: Lifetime Membership (₹1,000) */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#241113] to-[#141416] border-2 border-[#A31D1D] p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_25px_rgba(163,29,29,0.3)]">
                <div className="absolute -top-3 right-6 rounded-full bg-[#A31D1D] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Most Recommended
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Lifetime Membership
                  </h3>
                  <span className="text-xs font-odia text-[#EF4444] block mt-0.5">
                    ଆଜୀବନ ସଦସ୍ୟତା
                  </span>
                  
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                      ₹1,000
                    </span>
                    <span className="text-xs text-[#9CA3AF]">one-time contribution</span>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-[#D1D5DB]">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#EF4444] flex-none" />
                      <span>Permanent digital membership badge &amp; certificate</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#EF4444] flex-none" />
                      <span>Full constitutional voting rights in POAS General Body</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#EF4444] flex-none" />
                      <span>VIP seating &amp; invitations at Nuakhai Bhetghat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#EF4444] flex-none" />
                      <span>Direct representation in Maa Samalei Mandir committee</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/membership?tier=LIFETIME"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#A31D1D] to-[#EF4444] py-3 text-xs font-bold text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Enrol as Lifetime Member (₹1,000)
                  </Link>
                </div>
              </div>

              {/* Tier 2: Yearly Membership (₹100) */}
              <div className="rounded-2xl bg-[#141416] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/30 transition-all">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Yearly Membership
                  </h3>
                  <span className="text-xs font-odia text-[#9CA3AF] block mt-0.5">
                    ବାର୍ଷିକ ସଦସ୍ୟତା
                  </span>
                  
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                      ₹100
                    </span>
                    <span className="text-xs text-[#9CA3AF]">per annum</span>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-[#D1D5DB]">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-white/70 flex-none" />
                      <span>Annual membership card &amp; directory listing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-white/70 flex-none" />
                      <span>Participation in community forums &amp; youth events</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-white/70 flex-none" />
                      <span>Access to POAS emergency mutual aid support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-white/70 flex-none" />
                      <span>Option to upgrade to Lifetime Membership anytime</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/membership?tier=YEARLY"
                    className="w-full inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] py-3 text-xs font-bold text-white hover:bg-white/[0.12] hover:border-white/40 transition-all"
                  >
                    Enrol as Yearly Member (₹100)
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
