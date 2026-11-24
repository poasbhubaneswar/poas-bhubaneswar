"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(items);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    setScheduleItems(items);
  }, [items]);

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" from the timeline?`)) {
      return;
    }

    const prevItems = scheduleItems;
    setScheduleItems((prev) => prev.filter((m) => m.id !== id));
    setDeletingId(id);
    startTransition(async () => {
      try {
        const res = await deleteScheduleItem(id);
        if (res && res.error) {
          alert(`Error: ${res.error}`);
          setScheduleItems(prevItems);
          setDeletingId(null);
          return;
        }
        setDeletingId(null);
        setSavedMessage("Milestone removed from timeline.");
        router.refresh();
        setTimeout(() => setSavedMessage(null), 3000);
      } catch (err) {
        console.error("Delete schedule item failed:", err);
        setScheduleItems(prevItems);
        setDeletingId(null);
        alert("Failed to delete milestone. Please try again.");
      }
    });
  };

  const handleAddMilestone = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("eventId", eventId);

    startTransition(async () => {
      try {
        await createScheduleItem(formData);
        form.reset();
        setShowAddForm(false);
        setSavedMessage("Milestone added to timeline!");
        router.refresh();
        setTimeout(() => setSavedMessage(null), 3000);
      } catch (err) {
        console.error("Create schedule item failed:", err);
        alert("Failed to add milestone. Please try again.");
      }
    });
  };

  return (
    <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2D2D35] pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#EF4444]" />
            <span>Timeline Programme Schedule ({scheduleItems.length})</span>
          </h3>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Add or remove ceremony milestones shown on the public schedule page
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#A31D1D] bg-[#241113] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#A31D1D] transition-colors self-start cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 text-[#EF4444]" />
          <span>{showAddForm ? "Close Form" : "Add Milestone"}</span>
        </button>
      </div>

      {savedMessage && (
        <div className="rounded-xl border border-green-500/40 bg-green-500/15 p-3 text-xs font-semibold text-green-400 flex items-center gap-2">
          <Check className="h-4 w-4 flex-none" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Add Milestone Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddMilestone}
          className="rounded-xl border border-[#A31D1D]/50 bg-[#0B0B0C] p-5 space-y-4"
        >
          <h4 className="font-serif text-sm font-bold text-[#EF4444]">
            New Timeline Milestone
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-white uppercase mb-1">
                Time Slot *
              </label>
              <input
                name="timeSlot"
                required
                placeholder="e.g. 04:30 PM - 06:00 PM"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#141416] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-white uppercase mb-1">
                Milestone Title *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. Sambalpuri Folk Dance & Panchabadya"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#141416] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-white uppercase mb-1">
                Description / Details
              </label>
              <input
                name="description"
                placeholder="e.g. Traditional Dalkhai and Rasarkeli performance by folk troupe"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#141416] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-white uppercase mb-1">
                Order Index
              </label>
              <input
                type="number"
                name="orderIndex"
                defaultValue={scheduleItems.length + 1}
                className="w-full rounded-xl border border-[#2D2D35] bg-[#141416] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-lg border border-[#2D2D35] px-3.5 py-1.5 text-xs font-semibold text-[#9CA3AF] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-[#A31D1D] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#EF4444] disabled:opacity-50 cursor-pointer"
            >
              {isPending ? "Adding..." : "Add to Timeline"}
            </button>
          </div>
        </form>
      )}

      {/* Schedule Items List with Delete Actions */}
      {scheduleItems.length === 0 ? (
        <p className="text-xs text-[#9CA3AF] italic py-4 text-center">
          No schedule milestones currently configured. Click &quot;Add Milestone&quot; to create one.
        </p>
      ) : (
        <div className="space-y-3">
          {scheduleItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-4 transition-colors hover:border-[#A31D1D]/50"
            >
              <div className="flex items-start gap-3 flex-1">
                <span className="rounded-md bg-[#241113] border border-[#A31D1D]/40 px-2.5 py-1 text-xs font-bold text-[#EF4444] flex-none">
                  {item.timeSlot}
                </span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-[#9CA3AF] mt-0.5 leading-relaxed">
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
                className="flex-none p-2 rounded-lg border border-red-500/20 bg-[#241113] text-red-400 hover:bg-red-500/20 disabled:opacity-50 transition-colors cursor-pointer"
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
