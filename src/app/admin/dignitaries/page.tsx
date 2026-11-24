import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createDignitary, deleteDignitary } from "@/actions/admin";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import Image from "next/image";
import { Plus, Users } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDignitariesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const dignitaries = await prisma.dignitary.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#F4EBDD]">
          Dignitaries &amp; Committee Governance
        </h1>
        <p className="text-xs text-[#B9A99B] mt-1">
          Manage profiles of public representatives, MLAs, and committee leadership
        </p>
      </div>

      {/* Add New Dignitary Form */}
      <div className="rounded-2xl border border-[#80613D]/60 bg-[#21171B] p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-[#F4EBDD] mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-[#C49A52]" />
          <span>Add Representative Profile</span>
        </h3>

        <form action={createDignitary} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">Full Name *</label>
              <input
                name="name"
                required
                placeholder="Shri / Smt..."
                className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">Designation *</label>
              <input
                name="designation"
                required
                placeholder="Hon'ble MLA, Patron..."
                className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">Constituency / Region</label>
              <input
                name="constituency"
                placeholder="e.g. Sambalpur, Balangir..."
                className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">Photo Image Path</label>
            <input
              name="imageUrl"
              placeholder="/images/dignitaries/mla-kalikesh-singh-deo-meeting.jpeg"
              className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F4EBDD] uppercase mb-1">Biographical Background</label>
            <textarea
              name="bio"
              rows={2}
              placeholder="Contribution to community welfare and cultural programs..."
              className="w-full rounded-xl border border-[#49343A] bg-[#160F12] p-2.5 text-xs text-[#F4EBDD]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-[#C49A52] px-6 py-2.5 text-xs font-bold text-[#160F12] hover:bg-[#E0BF7C]"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Dignitaries List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {dignitaries.map((dig) => (
          <div
            key={dig.id}
            className="rounded-2xl border border-[#49343A] bg-[#21171B] p-4 flex gap-4 items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-[#0B0B0C] border border-[#2D2D35] flex-none">
                {dig.imageUrl && <Image src={dig.imageUrl} alt={dig.name} fill className="object-cover" />}
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-white">{dig.name}</h4>
                <p className="text-[11px] text-[#EF4444] font-medium">{dig.designation}</p>
                <p className="text-[10px] text-[#9CA3AF]">{dig.constituency}</p>
              </div>
            </div>

            <AdminDeleteButton
              id={dig.id}
              title={dig.name}
              itemType="Dignitary"
              action={deleteDignitary}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
