import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Calendar, MapPin, Users, ArrowRight, FileText } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Meetings & Activities | Paschim Odisha Agrani Sangathana",
  description: "Official records, consultations, and proceedings of Paschim Odisha Agrani Sangathana (POAS) in Bhubaneswar.",
};

export default async function MeetingsPage() {
  const meetings = await prisma.meeting.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
            Official Archives
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
            Meetings &amp; Sangathan Activities
          </h1>
          <p className="text-base text-[#D1D5DB] mt-3 leading-relaxed font-odia text-lg">
            "ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନର ବୈଠକ ଓ କାର୍ଯ୍ୟକ୍ରମ ବିବରଣୀ"
          </p>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2 max-w-2xl mx-auto">
            Documented proceedings, consultative sessions, and executive committee deliberations regarding community welfare and the Maa Samalei Mandir Project.
          </p>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meetings.map((meeting, idx) => {
          return (
            <ScrollReveal key={meeting.id} delay={idx * 70}>
              <div className="group relative flex flex-col rounded-3xl glass-card-interactive overflow-hidden h-full border border-white/10 hover:border-[#A31D1D]">
                <ShimmerBorder />
                
                {/* Single Dedicated Meeting Photo with Dignitary Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <Image
                    src={meeting.coverImage || "/images/poas-logo.png"}
                    alt={meeting.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Dignitary Name & Date Tag on Photo */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/85 px-2.5 py-1 text-xs font-semibold text-white border border-white/20 backdrop-blur-md shadow-md">
                      <Users className="h-3.5 w-3.5 text-[#EF4444]" />
                      <span className="truncate max-w-[190px]">{meeting.participants?.split(",")[0] || meeting.title}</span>
                    </span>
                    {meeting.date && (
                      <span className="rounded-lg bg-black/85 px-2 py-1 text-[11px] font-bold text-[#EF4444] border border-[#A31D1D]/50 backdrop-blur-md">
                        {new Date(meeting.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>

                {/* Meeting Meta & Description */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF] mb-3">
                      {meeting.date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[#EF4444]" />
                          <span>
                            {new Date(meeting.date).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#EF4444]" />
                        <span>{meeting.location || "Bhubaneswar"}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#EF4444] transition-colors leading-snug">
                      {meeting.title}
                    </h3>

                    {meeting.participants && (
                      <div className="mt-3 flex items-start gap-2 text-xs text-white/80 bg-white/[0.04] p-2.5 rounded-xl border border-white/5">
                        <Users className="h-3.5 w-3.5 text-[#EF4444] flex-none mt-0.5" />
                        <span className="line-clamp-2"><strong>Participants:</strong> {meeting.participants}</span>
                      </div>
                    )}

                    <p className="text-xs text-[#9CA3AF] mt-3 line-clamp-4 leading-relaxed">
                      {meeting.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#2D2D35] flex items-center justify-between text-xs">
                    <span className="text-[#6B7280] font-medium">Record Entry #{idx + 1}</span>
                    <Link
                      href={`/meetings/${meeting.slug}`}
                      className="inline-flex items-center gap-1.5 font-bold text-[#EF4444] hover:underline"
                    >
                      <span>Full Write-up &amp; Photos</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

    </div>
  );
}
