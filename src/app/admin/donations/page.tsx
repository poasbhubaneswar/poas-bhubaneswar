import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { updateDonationStatus, deleteDonationPledge } from "@/actions/admin";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { formatDate } from "@/lib/utils";

export default async function AdminDonationsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const donations = await prisma.donationPledge.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
          Treasury &amp; Mandir Fund
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          Donation &amp; Support Pledges
        </h1>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Track and verify community contributions towards Maa Samalei Mandir and POAS cultural events
        </p>
      </div>

      <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#2D2D35] flex items-center justify-between text-xs">
          <span className="font-serif font-bold text-base text-white">
            Total Pledges ({donations.length})
          </span>
          <span className="text-[#EF4444] font-semibold">Treasury Log</span>
        </div>

        {donations.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#9CA3AF]">
            No donation pledges recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B0B0C] text-[#EF4444] uppercase text-[10px] tracking-wider border-b border-[#2D2D35]">
                <tr>
                  <th className="p-4">Donor Name</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Designated Purpose</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D2D35]">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-semibold text-white">{d.name}</td>
                    <td className="p-4 font-bold text-[#EF4444] font-mono">₹{d.amount.toLocaleString("en-IN")}</td>
                    <td className="p-4 text-[#D1D5DB]">{d.purpose}</td>
                    <td className="p-4 text-[#9CA3AF]">
                      <div>{d.email || "—"}</div>
                      {d.phone && <div className="text-[11px] text-[#6B7280]">{d.phone}</div>}
                    </td>
                    <td className="p-4">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        d.status === "VERIFIED" ? "bg-green-500/20 text-green-400" : "bg-[#241113] text-[#EF4444] border border-[#A31D1D]/40"
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#9CA3AF]">{formatDate(d.createdAt)}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <form action={updateDonationStatus.bind(null, d.id, d.status === "VERIFIED" ? "PLEDGED" : "VERIFIED")}>
                          <button
                            type="submit"
                            className="rounded-lg border border-[#A31D1D] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#A31D1D] transition-colors cursor-pointer"
                          >
                            {d.status === "VERIFIED" ? "Mark Pending" : "Verify Receipt"}
                          </button>
                        </form>
                        <AdminDeleteButton
                          id={d.id}
                          title={`${d.name} (₹${d.amount})`}
                          itemType="Donation Pledge"
                          action={deleteDonationPledge}
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
