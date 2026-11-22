"use client";

import { useTransition, useState } from "react";
import { createEvent } from "@/actions/admin";
import { Plus, Calendar, Loader2 } from "lucide-react";

export function CreateEventForm() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      await createEvent(formData);
      form.reset();
      setIsOpen(false);
    });
  };

  return (
    <div className="rounded-2xl border border-[#80613D]/60 bg-[#21171B] p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-[#F4EBDD] flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#C49A52]" />
          <span>Create New Cultural Gathering</span>
        </h3>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#591D2A] border border-[#80613D] px-3.5 py-1.5 text-xs font-bold text-[#F4EBDD] hover:bg-[#793A45] transition-colors"
        >
          <Plus className="h-3.5 w-3.5 text-[#C49A52]" />
          <span>{isOpen ? "Close Form" : "New Event"}</span>
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">
                Event Title *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. Nuakhai Vetaghat 2026 — Annual Cultural Conclave"
                className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD] focus:border-[#C49A52] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">
                Event Date *
              </label>
              <input
                type="date"
                name="eventDate"
                required
                className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD] focus:border-[#C49A52] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">
                Venue / Location *
              </label>
              <input
                name="venue"
                required
                placeholder="e.g. Utkal Mandap / Railway Auditorium, Bhubaneswar"
                className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD] focus:border-[#C49A52] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">
                Start Time
              </label>
              <input
                name="startTime"
                placeholder="10:00 AM"
                className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD] focus:border-[#C49A52] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">
                End Time
              </label>
              <input
                name="endTime"
                placeholder="08:30 PM"
                className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD] focus:border-[#C49A52] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">
                Event Description
              </label>
              <textarea
                name="description"
                rows={2}
                placeholder="Cultural gathering summary and significance..."
                className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD] focus:border-[#C49A52] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-[#49343A] px-4 py-2 text-xs font-semibold text-[#B9A99B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-[#C49A52] px-5 py-2 text-xs font-bold text-[#160F12] hover:bg-[#E0BF7C] disabled:opacity-50"
            >
              {isPending ? "Creating Event..." : "Publish Event"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
