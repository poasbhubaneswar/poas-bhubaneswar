import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { SambalpuriBand, MaaSamaleiWatermark, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { SambalpuriMandalaAura } from "@/components/ui/SambalpuriMandalaAura";
import { GlowingBorderRunner } from "@/components/ui/BorderBeam";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ImpactMetrics } from "@/components/ui/ImpactMetrics";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Calendar, MapPin, Users, Heart, Sparkles, Building2, Shield, Check, Clock, ExternalLink, Download, Bell, Phone } from "lucide-react";

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
      take: 6,
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

        {/* Sacred Maa Samalei Deity Photograph in Hero Background (Positioned directly in the back of the Ring Animation) */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 -z-10 flex items-center justify-center"
        >
          {/* Divine Crimson & Amber Radiance Aura Halo */}
          <div className="absolute w-[460px] h-[460px] sm:w-[560px] sm:h-[560px] rounded-full bg-gradient-to-tr from-[#A31D1D]/45 via-[#EF4444]/25 to-amber-500/20 blur-[85px] animate-pulse-subtle" />

          {/* Authentic Maa Samalei Portrait with Ethereal Circular Feathering */}
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full overflow-hidden border-2 border-[#A31D1D]/40 shadow-[0_0_60px_rgba(163,29,29,0.55)]">
            <Image
              src="/images/maa-samalei-sacred-darshan.jpeg"
              alt="Maa Samaleswari Sacred Darshan"
              fill
              priority
              sizes="(max-width: 768px) 380px, 440px"
              className="object-cover object-top opacity-60 scale-105"
            />
            {/* Ethereal Vignette Gradients for Seamless Cosmic Blending */}
            <div className="absolute inset-0 bg-radial-[at_50%_40%] from-transparent via-[#0B0B0C]/35 to-[#0B0B0C]/85" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#A31D1D]/25" />
          </div>
        </div>

        {/* Sacred Concentric Sambalpuri Mandala Aura (Rotating Rings Animation in front of Maa Samalei) */}
        <SambalpuriMandalaAura className="top-1/3 opacity-60" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          
          {/* Official POAS Logo Presentation with Clean White Square Background */}
          <div className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl bg-white border-3 border-[#A31D1D] shadow-[0_0_35px_rgba(255,255,255,0.25),0_0_25px_rgba(163,29,29,0.5)] overflow-hidden p-2.5 transition-transform duration-300 hover:scale-105">
            <Image
              src="/images/poas-logo.png"
              alt="Paschim Odisha Agrani Sangathana Official Logo"
              fill
              priority
              sizes="112px"
              className="object-contain"
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
              <span>Membership (Coming Soon)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/leadership"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/[0.12] hover:border-[#A31D1D]"
            >
              <Users className="h-4 w-4 text-[#EF4444]" />
              <span>Leadership</span>
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
                  Maa Samalei Mandir &amp; Cultural Complex, Hirapur, Bhubaneswar
                </h2>

                <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                  For over three decades, the families of Western Odisha residing in the capital have aspired for a central spiritual sanctum and cultural anchor. Paschim Odisha Agrani Sangathana is actively spearheading the historic establishment of Maa Samalei Mandir at Hirapur, Bhubaneswar.
                </p>

                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  The complex is envisioned with authentic Kalinga-Kosala temple architecture, community auditorium, cultural archives, and student fellowship center—uniting the diaspora across all 10+ districts.
                </p>

                {/* Project Status Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="rounded-xl border border-white/10 bg-[#0B0B0C]/80 p-3.5 shadow-inner">
                    <span className="text-[11px] font-semibold uppercase text-[#EF4444] block">Status</span>
                    <span className="text-sm font-bold text-white block mt-1">Land Allotted, Planning in Progress</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0B0B0C]/80 p-3.5 shadow-inner">
                    <span className="text-[11px] font-semibold uppercase text-[#EF4444] block">Location</span>
                    <span className="text-sm font-bold text-white block mt-1">Hirapur, Bhubaneswar</span>
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
          UPCOMING LANDMARK EVENT · NUAKHAI BHETGHAT 2026 (FULL POSTER SHOWCASE)
         ========================================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl glass-panel-elevated p-6 sm:p-10 lg:p-12 border border-[#A31D1D]/40 shadow-2xl">
            <GlowingBorderRunner />
            <ShimmerBorder />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Event Details (Left Column) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#EF4444]/40 bg-[#241113] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#EF4444]">
                  <span className="h-2 w-2 rounded-full bg-[#EF4444] animate-ping" />
                  <span>Upcoming Celebration · ୨୯ ନଭେମ୍ବର ୨୦୨୬</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  POAS Nuakhai Bhetghat 2026
                </h2>

                <p className="font-odia text-xl sm:text-2xl text-[#EF4444] font-medium">
                  ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନର ଭବ୍ୟ ନୂଆଁଖାଇ ଭେଟଘାଟ
                </p>

                <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                  Join the families, youth, and diaspora of all 10+ Western Odisha districts in Bhubaneswar for our grand annual cultural conclave. Experience the sacred Nabanna offering to Maa Samalei, traditional Panchabadya, Sambalpuri folk music and dance performances, and community fellowship.
                </p>

                {/* Key Event Badges */}
                <div className="space-y-3 pt-2 text-xs sm:text-sm text-white">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-[#EF4444] flex-none" />
                    <span className="font-semibold">Sunday, 29 November, 2026</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-[#EF4444] flex-none" />
                    <span>10:30 AM onwards</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[#EF4444] flex-none" />
                    <span>Adivasi Ground, Unit-1, Bhubaneswar</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A31D1D] to-[#EF4444] px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>View Event Schedule</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <a
                    href="/images/events/nuakhai-bhetghat-29-november-poster.jpeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.05] px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/[0.1] hover:border-[#A31D1D] transition-colors"
                  >
                    <span>View Full Poster (HD)</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#EF4444]" />
                  </a>
                </div>
              </div>

              {/* Full Official Event Poster (Right Column - Fully Optimized for Phone & Desktop) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] aspect-[1132/1600] rounded-2xl overflow-hidden border-2 border-[#A31D1D] shadow-[0_0_35px_rgba(163,29,29,0.45)] bg-black group transition-transform duration-300 hover:scale-[1.01]">
                  <Image
                    src="/images/events/nuakhai-bhetghat-29-november-poster.jpeg"
                    alt="Official Nuakhai Bhetghat 2026 Poster"
                    fill
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 400px"
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] text-[#9CA3AF] mt-2 block text-center">
                  Official Invitation Poster · Nuakhai Bhetghat 2026
                </span>
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date & Location Down in the card */}
                    <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#EF4444]" />
                        <span>{meeting.date ? new Date(meeting.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Recorded"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#EF4444]" />
                        <span>{meeting.location || "Bhubaneswar"}</span>
                      </div>
                    </div>

                    {/* Dignitary / Key Participant Name */}
                    {meeting.participants && (
                      <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-2.5 py-1 text-xs font-semibold text-white border border-white/10">
                        <Users className="h-3 w-3 text-[#EF4444]" />
                        <span className="truncate max-w-[260px]">{meeting.participants.split(",")[0]}</span>
                      </div>
                    )}

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
          4. LEADERSHIP & GOVERNING BODY (ALL MEMBERS SHOWN IN SMALL SQUARES)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
              Constitutional Governance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1.5">
              Leadership &amp; Governing Body
            </h2>
            <p className="text-sm text-[#9CA3AF] mt-2">
              Distinguished advisors, elected governing body office bearers, and executive council members guiding Paschim Odisha Agrani Sangathana.
            </p>
          </div>
        </ScrollReveal>

        {/* Small Squares Grid: 6 columns on desktop, 4 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {officeBearers.map((ob, idx) => {
            const shortCategory =
              ob.category === "GOVERNING_BODY"
                ? "Gov. Body"
                : ob.category === "ADVISORY_COUNCIL"
                ? "Advisor"
                : "Executive";

            const badgeColor =
              ob.category === "GOVERNING_BODY"
                ? "bg-[#A31D1D]/90 text-white border-[#A31D1D]"
                : ob.category === "ADVISORY_COUNCIL"
                ? "bg-amber-600/90 text-white border-amber-500/50"
                : "bg-white/15 text-[#D1D5DB] border-white/20";

            return (
              <ScrollReveal key={ob.id} delay={Math.min(idx * 30, 300)}>
                <div className="group relative flex flex-col justify-between rounded-2xl glass-card-interactive p-2.5 sm:p-3 border border-white/10 hover:border-[#A31D1D] transition-all duration-300 h-full shadow-sm hover:shadow-[0_0_20px_rgba(163,29,29,0.35)]">
                  <div>
                    {/* Small Square Photo Box */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/90 border border-white/10 group-hover:border-[#A31D1D]/70 transition-all">
                      {ob.imageUrl ? (
                        <Image
                          src={ob.imageUrl}
                          alt={ob.name}
                          fill
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 16vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center p-2 text-center bg-[#17171B]">
                          <div className="h-10 w-10 rounded-full bg-[#241113] border border-[#A31D1D]/40 flex items-center justify-center text-[#EF4444] mb-1">
                            <Users className="h-5 w-5" />
                          </div>
                          <span className="text-[9px] uppercase font-bold text-[#9CA3AF] tracking-wider">
                            POAS
                          </span>
                        </div>
                      )}
                      
                      {/* Subtle Bottom Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Small Category Pill */}
                      <div
                        className={`absolute top-1.5 right-1.5 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border backdrop-blur-xs shadow-xs ${badgeColor}`}
                      >
                        {shortCategory}
                      </div>
                    </div>

                    {/* Member Details Directly Under Photo */}
                    <div className="mt-2.5 space-y-0.5">
                      <h3 className="font-serif text-xs sm:text-[13px] font-bold text-white group-hover:text-[#EF4444] transition-colors leading-snug line-clamp-1">
                        {ob.name}
                      </h3>
                      {ob.nameOdia && (
                        <span className="text-[10px] sm:text-[11px] font-odia text-[#EF4444] font-medium block truncate leading-tight">
                          {ob.nameOdia}
                        </span>
                      )}
                      <p className="text-[10px] sm:text-[11px] text-[#9CA3AF] leading-snug line-clamp-2 pt-0.5">
                        {ob.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-6 py-2.5 text-xs font-bold text-white hover:bg-white/[0.1] hover:border-[#A31D1D] transition-all"
          >
            <span>View Complete Portfolio &amp; Constitutional Roster</span>
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
            "Maa Samalei Mandir Project: Building Our Sacred Cultural Sanctuary at Hirapur, Bhubaneswar",
            "Uniting 10+ Districts: Sambalpur, Balangir, Bargarh, Kalahandi, Nuapada & beyond",
            "POAS Membership Enrolment Coming Soon — Stay Tuned",
            "ଜୟ ମାଁ ସମଲେଇ 🙏 Sacred Heritage, Solidarity and Shared Future",
          ].concat([
            "ଜୁହାର 🙏 ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନ (POAS) ଭୁବନେଶ୍ୱର",
            "30+ Years of Western Odisha Culture, Community and Social Leadership",
            "Maa Samalei Mandir Project: Building Our Sacred Cultural Sanctuary at Hirapur, Bhubaneswar",
            "Uniting 10+ Districts: Sambalpur, Balangir, Bargarh, Kalahandi, Nuapada & beyond",
            "POAS Membership Enrolment Coming Soon — Stay Tuned",
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
          7. MEMBERSHIP SPOTLIGHT (COMING SOON)
         ========================================================================= */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rounded-3xl glass-panel-elevated p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-[#A31D1D]/40 text-center">
            <GlowingBorderRunner />
            <ShimmerBorder />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#EF4444]/40 bg-[#EF4444]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#EF4444] animate-pulse">
                <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
                Official Sangathan Announcement
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
                Membership Coming Soon
              </h2>

              <p className="font-odia text-xl sm:text-2xl font-bold text-[#EF4444]">
                ସଦସ୍ୟତା ନାମାଙ୍କନ ଶୀଘ୍ର ଆରମ୍ଭ ହେଉଛି
              </p>

              <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed max-w-xl mx-auto">
                Official registration for Paschim Odisha Agrani Sangathana (POAS) membership is being configured and will open shortly. Stay connected with our executive body for the official launch.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A31D1D] to-[#EF4444] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-[#A31D1D]/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Membership Details</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/[0.12] hover:border-[#A31D1D] transition-all"
                >
                  <span>Contact Secretariat</span>
                </Link>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
