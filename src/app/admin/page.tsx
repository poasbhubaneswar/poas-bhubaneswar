import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Calendar,
  FileText,
  Image as ImageIcon,
  Heart,
  MessageSquare,
  Sparkles,
  Briefcase,
  Layers,
  ArrowRight,
} from "lucide-react";

export const revalidate = 0; // Dynamic admin metrics

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [
    memberCount,
    bearerCount,
    meetingCount,
    donationCount,
    messageCount,
    articleCount,
    galleryCount,
    eventCount,
    recentMembers,
    recentMeetings,
  ] = await Promise.all([
    prisma.memberInquiry.count(),
    prisma.officeBearer.count(),
    prisma.meeting.count(),
    prisma.donationPledge.count(),
    prisma.contactMessage.count(),
    prisma.article.count(),
    prisma.galleryItem.count(),
    prisma.event.count(),
    prisma.memberInquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.meeting.findMany({ take: 5, orderBy: { displayOrder: "asc" } }),
  ]);

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
          Secretariat Administration
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          POAS Overview &amp; Executive Metrics
        </h1>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Real-time activity across office bearers, documented meetings, member enrolments, and cultural assets
        </p>
      </div>

      {/* Stats KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="rounded-2xl border border-[#A31D1D]/40 bg-[#141416] p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9CA3AF]">Office Bearers</span>
            <Users className="h-4 w-4 text-[#EF4444]" />
          </div>
          <span className="font-serif text-3xl font-bold text-white mt-2 block">
            {bearerCount}
          </span>
          <span className="text-[11px] text-[#EF4444] mt-1 block">24 Leadership &amp; Council Members</span>
        </div>

        <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9CA3AF]">Documented Meetings</span>
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          <span className="font-serif text-3xl font-bold text-white mt-2 block">
            {meetingCount}
          </span>
          <span className="text-[11px] text-[#9CA3AF] mt-1 block">With Photos &amp; Writeups</span>
        </div>

        <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9CA3AF]">Member Enrolments</span>
            <Layers className="h-4 w-4 text-[#EF4444]" />
          </div>
          <span className="font-serif text-3xl font-bold text-white mt-2 block">
            {memberCount}
          </span>
          <span className="text-[11px] text-green-400 mt-1 block">Lifetime &amp; Yearly Tiers</span>
        </div>

        <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9CA3AF]">Donation Pledges</span>
            <Heart className="h-4 w-4 text-[#EF4444]" />
          </div>
          <span className="font-serif text-3xl font-bold text-white mt-2 block">
            {donationCount}
          </span>
          <span className="text-[11px] text-[#9CA3AF] mt-1 block">Mandir &amp; Event Fund</span>
        </div>

      </div>

      {/* Two Columns: Recent Enrolments & Documented Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Member Inquiries */}
        <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2D2D35]">
            <h2 className="font-serif text-lg font-bold text-white">
              Recent Member Registrations
            </h2>
            <Link
              href="/admin/membership"
              className="text-xs font-semibold text-[#EF4444] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {recentMembers.length === 0 ? (
            <p className="text-xs text-[#9CA3AF] py-4 text-center">No member registrations recorded yet.</p>
          ) : (
            <div className="divide-y divide-[#2D2D35]">
              {recentMembers.map((m) => (
                <div key={m.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white block">{m.name}</span>
                    <span className="text-[11px] text-[#9CA3AF]">{m.phone} · {m.nativeDistrict || m.city}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    m.membershipTier === "LIFETIME" ? "bg-[#A31D1D] text-white" : "bg-white/10 text-white"
                  }`}>
                    {m.membershipTier === "LIFETIME" ? "Lifetime (₹1,000)" : "Yearly (₹100)"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Documented Meetings Preview */}
        <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2D2D35]">
            <h2 className="font-serif text-lg font-bold text-white">
              POAS Meeting Proceedings
            </h2>
            <Link
              href="/admin/meetings"
              className="text-xs font-semibold text-[#EF4444] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-[#2D2D35]">
            {recentMeetings.map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between text-xs">
                <div className="pr-4">
                  <span className="font-semibold text-white block line-clamp-1">{m.title}</span>
                  <span className="text-[11px] text-[#9CA3AF]">
                    {m.date ? new Date(m.date).toLocaleDateString() : ""} · {m.location}
                  </span>
                </div>
                <Link
                  href={`/meetings/${m.slug}`}
                  target="_blank"
                  className="text-[#EF4444] hover:underline flex-none text-[11px] font-medium"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
