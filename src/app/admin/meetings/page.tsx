import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createMeeting, deleteMeeting } from "@/actions/admin";
import { Calendar, Plus, Trash2, MapPin, Users, ExternalLink, Image as ImageIcon } from "lucide-react";

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
          {meetings.map((m, idx) => (
            <div
              key={m.id}
              className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-5 flex flex-col justify-between hover:border-[#A31D1D] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#EF4444]" />
                    <span>{m.date ? new Date(m.date).toLocaleDateString() : "Dated"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#EF4444]" />
                    <span>{m.location}</span>
                  </div>
                </div>

                <h3 className="font-serif text-base font-bold text-white mb-2">
                  {m.title}
                </h3>

                <p className="text-xs text-[#9CA3AF] line-clamp-3 leading-relaxed mb-3">
                  {m.description}
                </p>

                {m.coverImage && (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black mb-3">
                    <Image
                      src={m.coverImage}
                      alt={m.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#2D2D35] flex items-center justify-between text-xs">
                <Link
                  href={`/meetings/${m.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[#EF4444] hover:underline font-semibold"
                >
                  <span>View Public Post</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>

                <form action={deleteMeeting.bind(null, m.id)}>
                  <button
                    type="submit"
                    className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete Meeting"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
