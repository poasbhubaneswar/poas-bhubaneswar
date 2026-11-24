"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { updateEvent, deleteEvent } from "@/actions/admin";
import { Save, Check, Loader2, ExternalLink, Trash2, Image as ImageIcon } from "lucide-react";

interface EventEditorProps {
  event: {
    id: string;
    title: string;
    description: string;
    venue: string;
    eventDate: string; // ISO date string
    startTime: string | null;
    endTime: string | null;
    bannerImage?: string | null;
    images?: string | null;
    registrationOpen: boolean;
  };
}

export function EventEditorForm({ event }: EventEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("id", event.id);

    startTransition(async () => {
      await updateEvent(formData);
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    });
  };

  const handleDeleteEvent = () => {
    const confirmed = confirm(
      `Are you sure you want to completely delete the event "${event.title}"?\n\nThis will remove the event and all of its associated timeline schedule milestones.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    startTransition(async () => {
      try {
        const res = await deleteEvent(event.id);
        if (res && res.error) {
          alert(`Error: ${res.error}`);
          setIsDeleting(false);
          return;
        }
        setIsDeleted(true);
        router.refresh();
      } catch (err) {
        console.error("Delete event failed:", err);
        setIsDeleting(false);
        alert("Failed to delete event. Please try again.");
      }
    });
  };

  if (isDeleted) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-xs text-red-400 flex items-center justify-between">
        <span className="font-semibold">Event &quot;{event.title}&quot; has been completely deleted.</span>
        <span className="text-[10px] text-[#9CA3AF]">Removed from database</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between border-b border-[#2D2D35] pb-4">
          <h2 className="font-serif text-lg font-bold text-white">
            Grand Gathering Details
          </h2>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                <Check className="h-3.5 w-3.5" />
                <span>Event Saved &amp; Live!</span>
              </span>
            )}
            <button
              type="button"
              onClick={handleDeleteEvent}
              disabled={isPending || isDeleting}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-[#241113] px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Deleting Event...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete Event</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-white uppercase mb-1">
              Event Title *
            </label>
            <input
              name="title"
              defaultValue={event.title}
              required
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">
              Celebration Date *
            </label>
            <input
              type="date"
              name="eventDate"
              defaultValue={event.eventDate.split("T")[0]}
              required
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">
              Venue / Location *
            </label>
            <input
              name="venue"
              defaultValue={event.venue}
              required
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">
              Start Time
            </label>
            <input
              name="startTime"
              defaultValue={event.startTime || "10:00 AM"}
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">
              End Time
            </label>
            <input
              name="endTime"
              defaultValue={event.endTime || "08:30 PM"}
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-white uppercase mb-1">
              Event Description &amp; Theme
            </label>
            <textarea
              name="description"
              defaultValue={event.description}
              rows={3}
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">
              Banner / Cover Image URL
            </label>
            <input
              name="bannerImage"
              defaultValue={event.bannerImage || ""}
              placeholder="/images/hero/nuakhai-ceremony-hero.jpeg"
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">
              Multi-Photo Carousel URLs (JSON or comma-separated)
            </label>
            <input
              name="images"
              defaultValue={event.images || ""}
              placeholder="/images/photo1.jpeg, /images/photo2.jpeg"
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#2D2D35]">
          <a
            href="/events"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9CA3AF] hover:text-white transition-colors"
          >
            <span>Preview Public Schedule</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-[#A31D1D] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#EF4444] disabled:opacity-50 transition-all"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Updating Event...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Gathering Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
