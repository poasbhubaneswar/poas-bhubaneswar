import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { updateInquiryStatus, deleteMemberInquiry } from "@/actions/admin";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { formatDate } from "@/lib/utils";
import { Layers, CheckCircle2, Clock, Phone, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMembershipPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const members = await prisma.memberInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const lifetimeCount = members.filter((m) => m.membershipTier === "LIFETIME").length;
  const yearlyCount = members.filter((m) => m.membershipTier === "YEARLY").length;

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
          Two-Tier Membership Registry
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          POAS Member Enrolments
        </h1>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Review, approve, and track Lifetime (₹1,000) and Yearly (₹100) memberships registered through the website.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-4">
          <span className="text-[11px] text-[#9CA3AF] uppercase font-semibold block">Total Enrolments</span>
          <span className="font-serif text-3xl font-bold text-white block mt-1">{members.length}</span>
        </div>
        <div className="rounded-2xl border border-[#A31D1D]/50 bg-[#241113] p-4">
          <span className="text-[11px] text-[#EF4444] uppercase font-semibold block">Lifetime Members (₹1,000)</span>
          <span className="font-serif text-3xl font-bold text-white block mt-1">{lifetimeCount}</span>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/[0.04] p-4">
          <span className="text-[11px] text-[#D1D5DB] uppercase font-semibold block">Yearly Members (₹100)</span>
          <span className="font-serif text-3xl font-bold text-white block mt-1">{yearlyCount}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#2D2D35] flex items-center justify-between text-xs">
          <span className="font-serif font-bold text-base text-white">
            Membership Submissions ({members.length})
          </span>
          <span className="text-green-400 font-semibold">Active Database</span>
        </div>

        {members.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#9CA3AF]">
            No membership enrolments submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B0B0C] text-[#EF4444] uppercase text-[10px] tracking-wider border-b border-[#2D2D35]">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Mobile &amp; Email</th>
                  <th className="p-4">Native District</th>
                  <th className="p-4">Tier &amp; Fee</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D2D35]">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-semibold text-white">{m.name}</td>
                    <td className="p-4 text-[#D1D5DB]">
                      <div>{m.phone}</div>
                      {m.email && <div className="text-[11px] text-[#9CA3AF]">{m.email}</div>}
                    </td>
                    <td className="p-4 text-[#D1D5DB]">
                      <span className="font-medium">{m.nativeDistrict || "—"}</span>
                      <span className="text-[11px] text-[#9CA3AF] block">{m.city}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold ${
                        m.membershipTier === "LIFETIME"
                          ? "bg-[#A31D1D] text-white shadow-sm"
                          : "bg-white/10 text-white border border-white/20"
                      }`}>
                        {m.membershipTier === "LIFETIME" ? "Lifetime (₹1,000)" : "Yearly (₹100)"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        m.status === "APPROVED" ? "bg-green-500/20 text-green-400" : "bg-[#241113] text-[#EF4444] border border-[#A31D1D]/40"
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#9CA3AF]">{formatDate(m.createdAt)}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <form action={updateInquiryStatus.bind(null, m.id, m.status === "APPROVED" ? "PENDING" : "APPROVED", "PAID")}>
                          <button
                            type="submit"
                            className="rounded-lg border border-[#A31D1D] px-3 py-1 text-[11px] font-semibold text-white hover:bg-[#A31D1D] transition-colors cursor-pointer"
                          >
                            {m.status === "APPROVED" ? "Mark Pending" : "Approve Pass"}
                          </button>
                        </form>
                        <AdminDeleteButton
                          id={m.id}
                          title={`${m.name} (${m.membershipTier})`}
                          itemType="Membership Enrolment"
                          action={deleteMemberInquiry}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
