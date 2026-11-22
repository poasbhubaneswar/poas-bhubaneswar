import Link from "next/link";
import Image from "next/image";
import { getAdminSession } from "@/lib/session";
import { adminLogout } from "@/actions/admin";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Calendar,
  Users,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Briefcase,
  Layers,
} from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
  { href: "/admin/content", label: "Site Content CMS", icon: Settings },
  { href: "/admin/leadership", label: "Leadership & Council (24)", icon: Users },
  { href: "/admin/meetings", label: "Meetings & Activities", icon: Briefcase },
  { href: "/admin/events", label: "Events & Timeline", icon: Calendar },
  { href: "/admin/membership", label: "Member Enrolments", icon: Layers },
  { href: "/admin/gallery", label: "Gallery Management", icon: ImageIcon },
  { href: "/admin/articles", label: "Articles & Press", icon: FileText },
  { href: "/admin/donations", label: "Donation Pledges", icon: Heart },
  { href: "/admin/messages", label: "Messages & Inquiries", icon: MessageSquare },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex-none border-r border-[#2D2D35] bg-[#141416] p-5 flex flex-col justify-between">
        <div>
          {/* Logo Brand */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#2D2D35]">
            <div className="relative h-11 w-11 rounded-full bg-white border-2 border-[#A31D1D] overflow-hidden flex items-center justify-center flex-none p-1 shadow-sm">
              <Image
                src="/images/poas-logo.png"
                alt="POAS Logo"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-sm font-bold block leading-none text-white">POAS Admin</span>
              <span className="text-[10px] text-[#EF4444] font-medium block mt-1">Secretariat Control</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1" aria-label="Admin Sections">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#D1D5DB] hover:bg-[#241113] hover:text-white hover:border border-transparent hover:border-[#A31D1D]/50 transition-colors"
                >
                  <Icon className="h-4 w-4 text-[#EF4444] flex-none" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="pt-6 border-t border-[#2D2D35] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-[#9CA3AF] hover:text-white transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <form action={adminLogout}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-[#241113] py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
