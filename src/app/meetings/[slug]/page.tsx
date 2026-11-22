import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Calendar, MapPin, Users, ArrowLeft, Shield, FileText } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meeting = await prisma.meeting.findUnique({ where: { slug } });
  if (!meeting) return { title: "Meeting Not Found | POAS" };

  return {
    title: `${meeting.title} | POAS Meetings`,
    description: meeting.description.slice(0, 160),
  };
}

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meeting = await prisma.meeting.findUnique({
    where: { slug },
  });

  if (!meeting) {
    notFound();
  }

  let imageList: string[] = [];
  if (meeting.images) {
    try {
      imageList = JSON.parse(meeting.images);
    } catch {
      imageList = [];
    }
  }
  if (imageList.length === 0 && meeting.coverImage) {
    imageList = [meeting.coverImage];
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      
      {/* Back button */}
      <div>
        <Link
          href="/meetings"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-[#D1D5DB] hover:text-white hover:border-[#A31D1D] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Meetings</span>
        </Link>
      </div>

      {/* Meeting Header */}
      <ScrollReveal>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF]">
            {meeting.date && (
              <div className="flex items-center gap-1.5 rounded-full bg-[#1A1A1E] px-3 py-1 border border-white/10">
                <Calendar className="h-3.5 w-3.5 text-[#EF4444]" />
                <span>
                  {new Date(meeting.date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5 rounded-full bg-[#1A1A1E] px-3 py-1 border border-white/10">
              <MapPin className="h-3.5 w-3.5 text-[#EF4444]" />
              <span>{meeting.location || "Bhubaneswar"}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[#241113] px-3 py-1 border border-[#A31D1D]/50 text-[#EF4444]">
              <Shield className="h-3.5 w-3.5" />
              <span>Official POAS Record</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {meeting.title}
          </h1>
        </div>
      </ScrollReveal>

      {/* Instagram-Style Multi-Photo Carousel */}
      <ScrollReveal>
        <div className="rounded-3xl overflow-hidden border border-[#2D2D35] bg-black shadow-2xl">
          <PhotoCarousel
            images={imageList}
            alt={meeting.title}
            aspectRatio="video"
            showCounter={true}
            showDots={true}
          />
        </div>
      </ScrollReveal>

      {/* Participants Box */}
      {meeting.participants && (
        <ScrollReveal>
          <div className="rounded-2xl glass-panel p-6 border border-white/10">
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
              <Users className="h-4 w-4 text-[#EF4444]" />
              <span>Attendees &amp; Key Participants</span>
            </div>
            <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
              {meeting.participants}
            </p>
          </div>
        </ScrollReveal>
      )}

      {/* Full Meeting Write-up */}
      <ScrollReveal>
        <div className="rounded-3xl glass-panel-elevated p-8 sm:p-12 space-y-6 border border-[#2D2D35]">
          <div className="flex items-center gap-2 pb-4 border-b border-[#2D2D35]">
            <FileText className="h-5 w-5 text-[#EF4444]" />
            <h2 className="font-serif text-2xl font-bold text-white">
              Meeting Proceedings &amp; Resolutions
            </h2>
          </div>

          <div className="prose prose-invert max-w-none text-sm sm:text-base text-[#D1D5DB] leading-relaxed whitespace-pre-line">
            {meeting.description}
          </div>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-[#2D2D35] flex items-center justify-between">
        <Link
          href="/meetings"
          className="text-xs font-semibold text-[#9CA3AF] hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>View Other Meetings</span>
        </Link>
        <Link
          href="/membership"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#A31D1D] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#EF4444] transition-colors"
        >
          <span>Join POAS</span>
        </Link>
      </div>

    </div>
  );
}
