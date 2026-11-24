"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { updateMeeting, deleteMeeting } from "@/actions/admin";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { Calendar, MapPin, ExternalLink, Edit3, X, Check, Loader2 } from "lucide-react";

interface MeetingCardProps {
  meeting: {
    id: string;
    title: string;
    slug: string;
    date: Date | string | null;
    location: string | null;
    participants: string | null;
    description: string;
    coverImage: string | null;
    images?: string | null;
  };
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const formattedDate = meeting.date
    ? new Date(meeting.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Dated";

  const dateValueForInput = meeting.date
    ? new Date(meeting.date).toISOString().split("T")[0]
    : "";

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    formData.append("id", meeting.id);

    try {
      await updateMeeting(formData);
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setIsEditing(false);
      }, 1200);
    } catch (err) {
      console.error("Update meeting failed:", err);
      setIsSaving(false);
      alert("Failed to update meeting. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-5 flex flex-col justify-between hover:border-[#A31D1D] transition-colors relative shadow-sm">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#2D2D35]">
            <span className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
              <Edit3 className="h-4 w-4 text-[#EF4444]" />
              <span>Edit Meeting Details</span>
            </span>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg p-1 text-[#9CA3AF] hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white uppercase mb-1">
              Title *
            </label>
            <input
              name="title"
              defaultValue={meeting.title}
              required
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-white uppercase mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                defaultValue={dateValueForInput}
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-white uppercase mb-1">
                Location
              </label>
              <input
                name="location"
                defaultValue={meeting.location || "Bhubaneswar"}
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white uppercase mb-1">
              Participants
            </label>
            <input
              name="participants"
              defaultValue={meeting.participants || ""}
              placeholder="e.g. Committee members present..."
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white uppercase mb-1">
              Write-up &amp; Resolutions *
            </label>
            <textarea
              name="description"
              defaultValue={meeting.description}
              required
              rows={4}
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white uppercase mb-1">
              Cover Image URL
            </label>
            <input
              name="coverImage"
              defaultValue={meeting.coverImage || ""}
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#2D2D35]">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg border border-[#2D2D35] px-3 py-1.5 text-xs text-[#9CA3AF] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-[#A31D1D] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#EF4444] disabled:opacity-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : savedSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div>
            <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#EF4444]" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#EF4444]" />
                <span className="truncate max-w-[140px]">{meeting.location || "Bhubaneswar"}</span>
              </div>
            </div>

            <h3 className="font-serif text-base font-bold text-white mb-2 leading-snug">
              {meeting.title}
            </h3>

            <p className="text-xs text-[#9CA3AF] line-clamp-3 leading-relaxed mb-3">
              {meeting.description}
            </p>

            {meeting.coverImage && (
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black mb-3 border border-[#2D2D35]">
                <Image
                  src={meeting.coverImage}
                  alt={meeting.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#2D2D35] flex items-center justify-between text-xs">
            <Link
              href={`/meetings/${meeting.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1 text-[#EF4444] hover:underline font-semibold"
            >
              <span>View Public Post</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                title="Edit Meeting"
                className="rounded-lg p-1.5 text-[#9CA3AF] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <Edit3 className="h-4 w-4" />
              </button>

              <AdminDeleteButton
                id={meeting.id}
                title={meeting.title}
                itemType="Meeting Record"
                action={deleteMeeting}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
