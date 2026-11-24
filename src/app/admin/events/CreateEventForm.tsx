"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/actions/admin";
import { Plus, Calendar, Loader2 } from "lucide-react";

export function CreateEventForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        await createEvent(formData);
        form.reset();
        setIsOpen(false);
        router.refresh();
      } catch (err) {
        console.error("Create event failed:", err);
        alert("Failed to create event. Please try again.");
      }
    });
  };

  return (
    <div className="rounded-2xl border border-[#A31D1D]/40 bg-[#141416] p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#EF4444]" />
          <span>Create New Cultural Gathering</span>
        </h3>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#241113] border border-[#A31D1D] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#A31D1D] transition-colors cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 text-[#EF4444]" />
          <span>{isOpen ? "Close Form" : "New Event"}</span>
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Event Title *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. Nuakhai Bhetghat 2026 — Annual Cultural Conclave"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Event Date *
              </label>
              <input
                type="date"
                name="eventDate"
                required
                defaultValue={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Venue / Location *
              </label>
              <input
                name="venue"
                required
                placeholder="e.g. Utkal Mandap / Railway Auditorium, Bhubaneswar"
                defaultValue="Bhubaneswar"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Start Time
              </label>
              <input
                name="startTime"
                placeholder="10:00 AM"
                defaultValue="10:00 AM"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                End Time
              </label>
              <input
                name="endTime"
                placeholder="08:30 PM"
                defaultValue="08:30 PM"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Event Description
              </label>
              <textarea
                name="description"
                rows={2}
                placeholder="Cultural gathering summary and significance..."
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-[#2D2D35] px-4 py-2 text-xs font-semibold text-[#9CA3AF] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-[#A31D1D] px-5 py-2 text-xs font-bold text-white hover:bg-[#EF4444] disabled:opacity-50 inline-flex items-center gap-1.5 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Publishing Event...</span>
                </>
              ) : (
                <span>Publish Event</span>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
