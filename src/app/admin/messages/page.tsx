import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { markMessageRead, deleteContactMessage } from "@/actions/admin";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { formatDate } from "@/lib/utils";
import { Mail, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMessagesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
          Secretariat Correspondence
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          Messages &amp; Direct Inquiries
        </h1>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Public contact submissions and correspondence addressed to POAS Secretariat
        </p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-8 text-center text-xs text-[#9CA3AF]">
            No contact inquiries received yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl border p-5 shadow-sm transition-all ${
                msg.isRead
                  ? "border-[#2D2D35] bg-[#141416]/70 opacity-80"
                  : "border-[#A31D1D]/50 bg-[#141416] shadow-md"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#2D2D35] text-xs">
                <div>
                  <span className="font-bold text-sm text-white">{msg.name}</span>
                  <span className="text-[#9CA3AF] ml-2">({msg.email}{msg.phone ? ` · ${msg.phone}` : ""})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#9CA3AF] text-[11px]">{formatDate(msg.createdAt)}</span>
                  {!msg.isRead && (
                    <span className="rounded-md bg-[#241113] border border-[#A31D1D]/50 px-2 py-0.5 text-[10px] font-bold text-[#EF4444]">
                      New Message
                    </span>
                  )}
                </div>
              </div>

              <div className="py-3">
                <span className="text-xs font-bold text-[#EF4444] uppercase tracking-wider block mb-1">
                  {msg.subject || "General Inquiry"}
                </span>
                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed whitespace-pre-line">
                  {msg.message}
                </p>
              </div>

              <div className="pt-2 border-t border-[#2D2D35] flex items-center justify-between text-xs">
                <div>
                  {!msg.isRead && (
                    <form action={markMessageRead.bind(null, msg.id)}>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#A31D1D] px-3 py-1 text-xs font-semibold text-white hover:bg-[#A31D1D] transition-colors cursor-pointer"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Mark as Read</span>
                      </button>
                    </form>
                  )}
                </div>

                <AdminDeleteButton
                  id={msg.id}
                  title={`Message from ${msg.name} (${msg.subject || "General"})`}
                  itemType="Contact Message"
                  action={deleteContactMessage}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
