import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { SettingFieldEditor } from "./SettingFieldEditor";
import { ExternalLink, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const settings = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  const fields = [
    {
      key: "hero_odia_title",
      label: "Hero Odia Headline",
      desc: "Main calligraphic heading on homepage hero banner (e.g. ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନ)",
      isTextarea: false,
    },
    {
      key: "hero_english_title",
      label: "Hero English Subtitle",
      desc: "English title displayed under the Odia headline (e.g. POAS – Paschim Odisha Agrani Sangathana)",
      isTextarea: false,
    },
    {
      key: "hero_description",
      label: "Hero Description Subhead",
      desc: "Introductory narrative on the homepage hero banner",
      isTextarea: true,
    },
    {
      key: "contact_phone",
      label: "Primary Phone Number",
      desc: "Main secretariat helpline displayed on footer and contact page",
      isTextarea: false,
    },
    {
      key: "contact_phones_additional",
      label: "Additional Helpline Numbers",
      desc: "Secondary phone numbers separated by commas",
      isTextarea: false,
    },
    {
      key: "contact_email",
      label: "Official Email Address",
      desc: "Inquiries destination email displayed on footer and contact directory",
      isTextarea: false,
    },
    {
      key: "contact_whatsapp",
      label: "WhatsApp Helpline Number",
      desc: "Full number with country code for WhatsApp link (e.g. +919439011880)",
      isTextarea: false,
    },
    {
      key: "venue_city",
      label: "Secretariat Headquarters / City",
      desc: "Physical location displayed on footer, contact directory, and metadata",
      isTextarea: false,
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
            Live CMS Controls
          </span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">
            Website Content Management (CMS)
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Edit live headings, taglines, contact info, and district details. Changes save directly and update in real time.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#A31D1D] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#EF4444] transition-colors shadow-sm self-start"
        >
          <span>Open Live Main Page</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="rounded-xl border border-[#A31D1D]/40 bg-[#241113]/60 p-4 text-xs text-white flex items-center gap-3">
        <Sparkles className="h-4 w-4 flex-none text-[#EF4444]" />
        <span>
          Every field below saves directly to the database and revalidates caches immediately. Click <strong>"Save Changes"</strong> on any card to update the public site live.
        </span>
      </div>

      <div className="space-y-6">
        {fields.map((f) => (
          <SettingFieldEditor
            key={f.key}
            settingKey={f.key}
            label={f.label}
            desc={f.desc}
            initialValue={map[f.key] || ""}
            isTextarea={f.isTextarea}
          />
        ))}
      </div>
    </div>
  );
}
