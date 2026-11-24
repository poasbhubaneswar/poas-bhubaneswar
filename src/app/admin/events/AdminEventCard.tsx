"use client";

import { useState } from "react";
import { EventEditorForm } from "./EventEditorForm";
import { ScheduleItemManager } from "./ScheduleItemManager";

interface AdminEventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    venue: string;
    eventDate: string;
    startTime: string | null;
    endTime: string | null;
    bannerImage?: string | null;
    images?: string | null;
    registrationOpen: boolean;
  };
  slug: string;
  schedules: any[];
}

export function AdminEventCard({ event, slug, schedules }: AdminEventCardProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  if (isDeleted) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-[#A31D1D]/30 bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xl transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#EF4444]">
            Event ID: {slug}
          </span>
        </div>
        <span className="text-xs text-[#9CA3AF]">
          {schedules.length} Timeline Milestones
        </span>
      </div>

      {/* Event Details Form with Delete Event Option & Multi-Photo Support */}
      <EventEditorForm event={event} onDeleted={() => setIsDeleted(true)} />

      {/* Timeline Milestones with Delete Milestone Option */}
      <ScheduleItemManager eventId={event.id} items={schedules} />
    </div>
  );
}
