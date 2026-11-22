import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { EventEditorForm } from "./EventEditorForm";
import { ScheduleItemManager } from "./ScheduleItemManager";
import { CreateEventForm } from "./CreateEventForm";
import { Calendar, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const events = await prisma.event.findMany({
    include: { schedules: { orderBy: { orderIndex: "asc" } } },
    orderBy: { eventDate: "desc" },
  });

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
          Programme Planning
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          Event &amp; Timeline Management
        </h1>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Create, edit, or delete events, multi-photo albums, and programme timeline milestones
        </p>
      </div>

      {/* Create New Event Section */}
      <CreateEventForm />

      {/* Events List */}
      {events.length === 0 ? (
        <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-8 text-center space-y-3">
          <AlertCircle className="h-8 w-8 text-[#EF4444] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-white">
            No Events Found
          </h3>
          <p className="text-xs text-[#9CA3AF] max-w-md mx-auto">
            There are currently no active events in the database. Use the "New Event" button above to publish an event.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {events.map((ev) => {
            const serializedEvent = {
              id: ev.id,
              title: ev.title,
              description: ev.description,
              venue: ev.venue,
              eventDate: ev.eventDate.toISOString(),
              startTime: ev.startTime,
              endTime: ev.endTime,
              bannerImage: ev.bannerImage,
              images: ev.images,
              registrationOpen: ev.registrationOpen,
            };

            return (
              <div
                key={ev.id}
                className="rounded-3xl border border-[#A31D1D]/30 bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#EF4444]">
                      Event ID: {ev.slug}
                    </span>
                  </div>
                  <span className="text-xs text-[#9CA3AF]">
                    {ev.schedules.length} Timeline Milestones
                  </span>
                </div>

                {/* Event Details Form with Delete Event Option & Multi-Photo Support */}
                <EventEditorForm event={serializedEvent} />

                {/* Timeline Milestones with Delete Milestone Option */}
                <ScheduleItemManager eventId={ev.id} items={ev.schedules} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
