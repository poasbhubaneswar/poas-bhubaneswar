"use client";

import { useTransition, useState } from "react";
import { createScheduleItem, deleteScheduleItem } from "@/actions/admin";
import { Plus, Trash2, Clock, Check, Loader2 } from "lucide-react";

interface ScheduleItem {
  id: string;
  timeSlot: string;
  title: string;
  description: string | null;
  orderIndex: number;
}

interface ScheduleManagerProps {
  eventId: string;
  items: ScheduleItem[];
}

export function ScheduleItemManager({ eventId, items }: ScheduleManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" from the timeline?`)) {
      return;
    }

    setDeletingId(id);
    startTransition(async () => {
      await deleteScheduleItem(id);
      setDeletingId(null);
      setSavedMessage("Milestone removed from timeline.");
      setTimeout(() => setSavedMessage(null), 3000);
    });
  };

  const handleAddMilestone = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("eventId", eventId);

    startTransition(async () => {
      await createScheduleItem(formData);
      form.reset();
      setShowAddForm(false);
      setSavedMessage("Milestone added to timeline!");
      setTimeout(() => setSavedMessage(null), 3000);
    });
  };

  return (
    <div className="rounded-2xl border border-[#49343A] bg-[#21171B] p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#49343A] pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#F4EBDD] flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#C49A52]" />
            <span>Timeline Programme Schedule ({items.length})</span>
          </h3>
          <p className="text-xs text-[#968579] mt-0.5">
            Add or remove ceremony milestones shown on the public schedule page
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#80613D] bg-[#351E26] px-3.5 py-2 text-xs font-semibold text-[#F4EBDD] hover:bg-[#591D2A] transition-colors self-start"
        >
          <Plus className="h-3.5 w-3.5 text-[#C49A52]" />
          <span>{showAddForm ? "Close Form" : "Add Milestone"}</span>
        </button>
      </div>

      {savedMessage && (
        <div className="rounded-xl border border-[#829B78]/40 bg-[#829B78]/15 p-3 text-xs font-semibold text-[#829B78] flex items-center gap-2">
          <Check className="h-4 w-4 flex-none" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Add Milestone Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddMilestone}
          className="rounded-xl border border-[#80613D]/60 bg-[#160F12] p-5 space-y-4"
        >
          <h4 className="font-serif text-sm font-bold text-[#C49A52]">
            New Timeline Milestone
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#F4EBDD] uppercase mb-1">
                Time Slot *
              </label>
              <input
                name="timeSlot"
                required
                placeholder="e.g. 04:30 PM - 06:00 PM"
                className="w-full rounded-xl border border-[#49343A] bg-[#21171B] p-2.5 text-xs text-[#F4EBDD] focus:border-[#C49A52] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-[#F4EBDD] uppercase mb-1">
                Milestone Title *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. Sambalpuri Folk Dance & Panchabadya"
                className="w-full rounded-xl border border-[#49343A] bg-[#21171B] p-2.5 text-xs text-[#F4EBDD] focus:border-[#C49A52] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-[#F4EBDD] uppercase mb-1">
                Description / Details
              </label>
              <input
                name="description"
                placeholder="e.g. Traditional Dalkhai and Rasarkeli performance by folk troupe"
                className="w-full rounded-xl border border-[#49343A] bg-[#21171B] p-2.5 text-xs text-[#F4EBDD] focus:border-[#C49A52] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#F4EBDD] uppercase mb-1">
                Order Index
              </label>
              <input
                type="number"
                name="orderIndex"
                defaultValue={items.length + 1}
                className="w-full rounded-xl border border-[#49343A] bg-[#21171B] p-2.5 text-xs text-[#F4EBDD] focus:border-[#C49A52] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-lg border border-[#49343A] px-3.5 py-1.5 text-xs font-semibold text-[#B9A99B] hover:text-[#F4EBDD]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-[#591D2A] border border-[#80613D] px-4 py-1.5 text-xs font-bold text-[#F4EBDD] hover:bg-[#793A45] disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add to Timeline"}
            </button>
          </div>
        </form>
      )}

      {/* Schedule Items List with Delete Actions */}
      {items.length === 0 ? (
        <p className="text-xs text-[#968579] italic py-4 text-center">
          No schedule milestones currently configured. Click "Add Milestone" to create one.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-[#49343A] bg-[#160F12] p-4 transition-colors hover:border-[#80613D]/60"
            >
              <div className="flex items-start gap-3 flex-1">
                <span className="rounded-md bg-[#591D2A] px-2.5 py-1 text-xs font-bold text-[#C49A52] flex-none">
                  {item.timeSlot}
                </span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#F4EBDD]">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-[#B9A99B] mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(item.id, item.title)}
                disabled={isPending && deletingId === item.id}
                title="Delete timeline milestone"
                className="flex-none p-2 rounded-lg border border-[#49343A] bg-[#21171B] text-[#D4776C] hover:bg-[#591D2A] hover:border-[#D4776C] disabled:opacity-50 transition-colors"
              >
                {isPending && deletingId === item.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
