"use client";

import { useState } from "react";
import Image from "next/image";
import { updateOfficeBearer, deleteOfficeBearer } from "@/actions/admin";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { Edit3, X, Check, Loader2, Phone, AlertCircle } from "lucide-react";

interface LeaderRowProps {
  bearer: {
    id: string;
    name: string;
    nameOdia: string | null;
    designation: string;
    category: string;
    phone: string | null;
    email: string | null;
    imageUrl: string | null;
    bio: string | null;
    displayOrder: number;
  };
  index: number;
}

export function LeaderRow({ bearer, index }: LeaderRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    formData.append("id", bearer.id);

    try {
      await updateOfficeBearer(formData);
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setIsEditing(false);
      }, 1000);
    } catch (err) {
      console.error("Update leader failed:", err);
      setIsSaving(false);
      alert("Failed to update office bearer. Please try again.");
    }
  };

  return (
    <>
      <tr className="hover:bg-white/[0.02] transition-colors border-b border-[#2D2D35]">
        <td className="p-3.5 text-[#9CA3AF] font-mono">{bearer.displayOrder || index + 1}</td>
        <td className="p-3.5">
          {bearer.imageUrl ? (
            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-[#A31D1D]/50 bg-black">
              <Image
                src={bearer.imageUrl}
                alt={bearer.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400" title="Photo verification pending">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}
        </td>
        <td className="p-3.5">
          <span className="font-semibold text-white block">{bearer.name}</span>
          {bearer.nameOdia && (
            <span className="text-[11px] font-odia text-[#EF4444] block">
              {bearer.nameOdia}
            </span>
          )}
        </td>
        <td className="p-3.5 text-[#D1D5DB] font-medium">{bearer.designation}</td>
        <td className="p-3.5">
          <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
            bearer.category === "GOVERNING_BODY"
              ? "bg-[#A31D1D]/30 text-[#EF4444] border border-[#A31D1D]/50"
              : bearer.category === "ADVISORY_COUNCIL"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              : "bg-white/10 text-white border border-white/20"
          }`}>
            {bearer.category.replace("_", " ")}
          </span>
        </td>
        <td className="p-3.5 text-[#9CA3AF]">
          {bearer.phone ? (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-[#EF4444]" />
              <span>{bearer.phone}</span>
            </div>
          ) : (
            "—"
          )}
        </td>
        <td className="p-3.5 text-right">
          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold text-white hover:border-[#EF4444] hover:bg-[#A31D1D]/20 transition-all"
            >
              <Edit3 className="h-3.5 w-3.5 text-[#EF4444]" />
              <span>{isEditing ? "Close" : "Edit"}</span>
            </button>
            <AdminDeleteButton
              id={bearer.id}
              title={bearer.name}
              itemType="Office Bearer"
              action={deleteOfficeBearer}
            />
          </div>
        </td>
      </tr>

      {/* Inline Edit Drawer */}
      {isEditing && (
        <tr className="bg-[#18181B] border-b border-[#A31D1D]/40">
          <td colSpan={7} className="p-5">
            <form onSubmit={handleUpdate} className="space-y-4 max-w-4xl">
              <div className="flex items-center justify-between pb-2 border-b border-[#2D2D35]">
                <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
                  <Edit3 className="h-4 w-4 text-[#EF4444]" />
                  <span>Edit Profile: {bearer.name}</span>
                </h4>
                {savedSuccess && (
                  <span className="inline-flex items-center gap-1 text-xs text-green-400 font-bold bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/30">
                    <Check className="h-3.5 w-3.5" /> Saved Successfully!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-white uppercase mb-1">
                    Name (English) *
                  </label>
                  <input
                    name="name"
                    required
                    defaultValue={bearer.name}
                    className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-white uppercase mb-1">
                    Name (Odia)
                  </label>
                  <input
                    name="nameOdia"
                    defaultValue={bearer.nameOdia || ""}
                    className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-white uppercase mb-1">
                    Designation *
                  </label>
                  <input
                    name="designation"
                    required
                    defaultValue={bearer.designation}
                    className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-white uppercase mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    defaultValue={bearer.category}
                    className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
                  >
                    <option value="GOVERNING_BODY">Governing Body</option>
                    <option value="ADVISORY_COUNCIL">Board of Advisors</option>
                    <option value="EXECUTIVE_BODY">Executive Body</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-white uppercase mb-1">
                    Mobile Number
                  </label>
                  <input
                    name="phone"
                    defaultValue={bearer.phone || ""}
                    className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-white uppercase mb-1">
                    Photo URL / Path
                  </label>
                  <input
                    name="imageUrl"
                    defaultValue={bearer.imageUrl || ""}
                    className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-white uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    defaultValue={bearer.displayOrder}
                    className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white uppercase mb-1">
                  Bio / Responsibilities
                </label>
                <textarea
                  name="bio"
                  rows={2}
                  defaultValue={bearer.bio || ""}
                  className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold text-[#D1D5DB] hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#A31D1D] px-5 py-2 text-xs font-bold text-white shadow hover:bg-[#EF4444] disabled:opacity-50 transition-colors"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </td>
        </tr>
      )}
    </>
  );
}
