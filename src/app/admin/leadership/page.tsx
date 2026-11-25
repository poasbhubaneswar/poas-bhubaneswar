import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createOfficeBearer } from "@/actions/admin";
import { LeaderRow } from "./LeaderRow";
import { Users, Plus, Shield } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLeadershipPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const bearers = await prisma.officeBearer.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-10 max-w-6xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
          Constitutional Governance
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          Governing Body &amp; Leadership Management
        </h1>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Manage the official Leadership, Board of Advisors, Governing Body, and Executive Council.
        </p>
      </div>

      {/* Create New Office Bearer Form */}
      <div className="rounded-2xl border border-[#A31D1D]/40 bg-[#141416] p-6 shadow-sm">
        <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Plus className="h-4 w-4 text-[#EF4444]" />
          <span>Add Official Office Bearer / Executive Member</span>
        </h2>

        <form action={createOfficeBearer} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Name (English) *
              </label>
              <input
                name="name"
                required
                placeholder="e.g. Sri Sanjeeb Kumar Mishra"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Name (Odia)
              </label>
              <input
                name="nameOdia"
                placeholder="e.g. ଶ୍ରୀ ସଞ୍ଜୀବ କୁମାର ମିଶ୍ର"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Designation *
              </label>
              <input
                name="designation"
                required
                placeholder="e.g. President / Secretary / Executive Member"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Category *
              </label>
              <select
                name="category"
                defaultValue="GOVERNING_BODY"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              >
                <option value="GOVERNING_BODY">Governing Body (ପରିଚାଳନା ପରିଷଦ)</option>
                <option value="ADVISORY_COUNCIL">Board of Advisors (ଉପଦେଷ୍ଟାମଣ୍ଡଳୀ)</option>
                <option value="EXECUTIVE_BODY">Executive Body (କାର୍ଯ୍ୟକାରିଣୀ କମିଟି)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Mobile Number
              </label>
              <input
                name="phone"
                placeholder="e.g. 94370 23456"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Image Path / URL
              </label>
              <input
                name="imageUrl"
                placeholder="e.g. /images/leadership/sanjeeb-kumar-mishra.jpeg"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">
                Display Order
              </label>
              <input
                type="number"
                name="displayOrder"
                defaultValue={bearers.length + 1}
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-xl bg-[#A31D1D] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#EF4444] transition-colors"
            >
              Add Office Bearer
            </button>
          </div>
        </form>
      </div>

      {/* Roster of 19 Office Bearers */}
      <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#2D2D35] flex items-center justify-between text-xs">
          <span className="font-serif font-bold text-base text-white">
            Current Office Bearers ({bearers.length})
          </span>
          <span className="text-green-400 font-semibold">{bearers.length} Members Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0B0C] text-[#EF4444] uppercase text-[10px] tracking-wider border-b border-[#2D2D35]">
              <tr>
                <th className="p-3.5">#</th>
                <th className="p-3.5">Photo</th>
                <th className="p-3.5">Name (English / Odia)</th>
                <th className="p-3.5">Designation</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D2D35]">
              {bearers.map((b, idx) => (
                <LeaderRow key={b.id} bearer={b} index={idx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
