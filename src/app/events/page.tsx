import { prisma } from "@/lib/prisma";
import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { Calendar, Clock, MapPin, Sparkles, ExternalLink, Download } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Events & Timeline | Paschim Odisha Agrani Sangathana",
  description: "Official schedule, celebrations, and timeline of POAS Nuakhai Bhetghat and cultural assemblies in Bhubaneswar.",
};

export default async function EventsPage() {
  const event = await prisma.event.findFirst({
    where: { isPublished: true },
    include: { schedules: { orderBy: { orderIndex: "asc" } } },
  });

  const formattedDate = event?.eventDate
    ? format(new Date(event.eventDate), "EEEE, d MMMM, yyyy")
    : "Saturday, 26 September, 2026";

  let eventImages: string[] = [];
  if (event?.images) {
    try {
      eventImages = JSON.parse(event.images);
    } catch {
      eventImages = [];
    }
  }
  if (eventImages.length === 0 && event?.bannerImage) {
    eventImages = [event.bannerImage];
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
            Annual Cultural Festival
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
            {event?.title || "POAS Celebrations & Schedule"}
          </h1>
          <p className="text-base text-[#D1D5DB] mt-3 leading-relaxed font-odia text-lg">
            "ଏକାଠି ହେବା, ଆଶୀର୍ବାଦ ନେବା, ସଂସ୍କୃତି ଉଜ୍ଜୀବିତ କରିବା"
          </p>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      {/* Main Event Showcase Banner */}
      {event ? (
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl glass-panel-elevated p-8 sm:p-12 shadow-2xl border border-[#A31D1D]/40">
            <ShimmerBorder />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#A31D1D]/50 bg-[#241113] px-3.5 py-1 text-xs font-semibold text-[#EF4444]">
                  <Sparkles className="h-3 w-3" />
                  <span>Grand Community Gathering</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {event.title}
                </h2>
                <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-3 pt-2 text-sm text-white">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-[#EF4444]" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-[#EF4444]" />
                    <span>{event.startTime} to {event.endTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[#EF4444]" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>

              {/* Official Upcoming Event Poster (Full Poster Display, Optimized for Phone & Desktop) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[1132/1600] rounded-2xl overflow-hidden border-2 border-[#A31D1D] shadow-[0_0_35px_rgba(163,29,29,0.45)] bg-black transition-transform duration-300 hover:scale-[1.01]">
                  <Image
                    src={event.bannerImage || "/images/events/nuakhai-bhetghat-29-november-poster.jpeg"}
                    alt="Official POAS Nuakhai Bhetghat 2026 Celebration Poster"
                    fill
                    priority
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 420px, 450px"
                    className="object-contain"
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={event.bannerImage || "/images/events/nuakhai-bhetghat-29-november-poster.jpeg"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#A31D1D] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#EF4444] transition-all"
                  >
                    <span>View Full Poster (HD)</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={event.bannerImage || "/images/events/nuakhai-bhetghat-29-november-poster.jpeg"}
                    download="POAS-Nuakhai-Bhetghat-2026-Poster.jpeg"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.1] transition-colors"
                  >
                    <Download className="h-3.5 w-3.5 text-[#EF4444]" />
                    <span>Download</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>
      ) : (
        <div className="rounded-3xl glass-panel p-12 text-center space-y-4">
          <Calendar className="h-10 w-10 text-[#EF4444] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-white">
            Gathering Schedule Under Deliberation
          </h2>
          <p className="text-sm text-[#9CA3AF] max-w-lg mx-auto">
            The Paschim Odisha Agrani Sangathana executive committee is currently finalizing upcoming celebration dates and venue. Details will be published here shortly.
          </p>
        </div>
      )}

      {/* Programme Schedule Timeline */}
      {event && event.schedules && event.schedules.length > 0 && (
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/10">
          <ScrollReveal>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              Event Programme Timeline
            </h3>
          </ScrollReveal>

          <div className="space-y-6 max-w-3xl mx-auto">
            {event.schedules.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 60}>
                <div className="group relative flex flex-col sm:flex-row items-start gap-4 rounded-2xl glass-card-interactive p-5 border border-white/5 hover:border-[#A31D1D]">
                  <ShimmerBorder />
                  <div className="rounded-lg bg-[#A31D1D] px-3.5 py-1.5 text-xs font-bold text-white whitespace-nowrap shadow-sm">
                    {item.timeSlot}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#EF4444] transition-colors">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
