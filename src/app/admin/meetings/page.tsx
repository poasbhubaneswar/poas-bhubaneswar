import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createMeeting } from "@/actions/admin";
import { MeetingCard } from "./MeetingCard";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMeetingsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const meetings = await prisma.meeting.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-10 max-w-6xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
          Meeting Records &amp; Proceedings
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          Meetings &amp; Sangathan Activities CMS
        </h1>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Manage documented records, consultative sessions, and multi-photo Instagram carousel albums for POAS activities.
        </p>
      </div>

      {/* Create New Meeting Form */}
      <div className="rounded-2xl border border-[#A31D1D]/40 bg-[#141416] p-6 shadow-sm">
        <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Plus className="h-4 w-4 text-[#EF4444]" />
          <span>Add New Documented Meeting Entry</span>
        </h2>

        <form action={createMeeting} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Meeting Title / Subject *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. POAS Executive Committee Deliberation on Maa Samalei Mandir"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Meeting Date
              </label>
              <input
                type="date"
                name="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Location / Venue
              </label>
              <input
                name="location"
                placeholder="e.g. Circuit House / POAS Secretariat, Bhubaneswar"
                defaultValue="Bhubaneswar"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Participants / Attendees List
              </label>
              <input
                name="participants"
                placeholder="e.g. Sri Sanjeeb Kumar Mishra (President), Sri Dukhishyam Bhanja (Secretary General)..."
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Detailed Write-up &amp; Resolutions *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Describe the discussions, resolutions adopted, and future action items..."
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Cover Photo URL
              </label>
              <input
                name="coverImage"
                placeholder="e.g. /images/meetings/meeting-1-office-bearers.jpeg"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Multi-Photo Carousel URLs (comma-separated or JSON)
              </label>
              <input
                name="images"
                placeholder="/images/meetings/photo1.jpeg, /images/meetings/photo2.jpeg"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-xl bg-[#A31D1D] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#EF4444] transition-colors"
            >
              Save Meeting Entry
            </button>
          </div>
        </form>
      </div>

      {/* Existing Meetings List */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg font-bold text-white">
          Documented Meetings ({meetings.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((m) => (
            <MeetingCard
              key={m.id}
              meeting={{
                id: m.id,
                title: m.title,
                slug: m.slug,
                date: m.date ? m.date.toISOString() : null,
                location: m.location,
                participants: m.participants,
                description: m.description,
                coverImage: m.coverImage,
                images: m.images,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
