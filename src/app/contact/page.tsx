import { prisma } from "@/lib/prisma";
import { ContactForm } from "./ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { SambalpuriBand } from "@/components/ui/SambalpuriMotif";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Contact POAS | Paschim Odisha Agrani Sangathana, Bhubaneswar",
  description:
    "Direct secretariat contact, phone numbers, and official inquiry portal for Paschim Odisha Agrani Sangathana (POAS), Bhubaneswar.",
};

export default async function ContactPage() {
  const settings = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  const phone = map.contact_phone || "+91 94390 11880";
  const additionalPhones = map.contact_phones_additional || "+91 9004830541, 7077918477, 7609050398";
  const email = map.contact_email || "poasbhubaneswar@gmail.com";
  const city = map.venue_city || "Bhubaneswar, Odisha, India";
  const whatsapp = map.contact_whatsapp || "+919439011880";

  const phoneClean = phone.replace(/[^0-9+]/g, "");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
            Secretariat &amp; Communications
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mt-1">
            Get in Touch with POAS
          </h1>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
            Have inquiries regarding POAS membership, leadership councils, cultural participation, or the Maa Samalei Mandir Project? Our secretariat team in Bhubaneswar is here to assist.
          </p>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Contact Directory */}
        <div className="lg:col-span-5 space-y-6">
          <ScrollReveal delay={100}>
            <div className="rounded-3xl glass-panel p-8 shadow-xl border border-[#2D2D35]">
              <h2 className="font-serif text-2xl font-bold text-white mb-6">
                Secretariat Details
              </h2>

              <div className="space-y-6 text-sm">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#EF4444] block mb-3">
                    Key Office Bearers &amp; Helplines
                  </span>
                  <div className="space-y-3">
                    <div className="rounded-xl bg-[#0B0B0C] border border-[#2D2D35] p-3 hover:border-[#A31D1D]/60 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-white">Sri Sanjeev Mishra</span>
                        <span className="text-[10px] font-semibold text-[#EF4444] bg-[#241113] px-2 py-0.5 rounded-full border border-[#A31D1D]/30">President</span>
                      </div>
                      <a href="tel:+919439011880" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#D1D5DB] hover:text-[#EF4444] transition-colors">
                        <Phone className="h-3.5 w-3.5 text-[#EF4444]" />
                        <span>+91 94390 11880</span>
                      </a>
                    </div>

                    <div className="rounded-xl bg-[#0B0B0C] border border-[#2D2D35] p-3 hover:border-[#A31D1D]/60 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-white">Sri Dukhishyam Bhanja</span>
                        <span className="text-[10px] font-semibold text-[#EF4444] bg-[#241113] px-2 py-0.5 rounded-full border border-[#A31D1D]/30">Secretary General</span>
                      </div>
                      <a href="tel:+918917435721" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#D1D5DB] hover:text-[#EF4444] transition-colors">
                        <Phone className="h-3.5 w-3.5 text-[#EF4444]" />
                        <span>+91 891 743 5721</span>
                      </a>
                    </div>

                    <div className="rounded-xl bg-[#0B0B0C] border border-[#2D2D35] p-3 hover:border-[#A31D1D]/60 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-white">Sri Anil Kumar Mahapatra</span>
                        <span className="text-[10px] font-semibold text-[#EF4444] bg-[#241113] px-2 py-0.5 rounded-full border border-[#A31D1D]/30">Secretary</span>
                      </div>
                      <a href="tel:+919004830541" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#D1D5DB] hover:text-[#EF4444] transition-colors">
                        <Phone className="h-3.5 w-3.5 text-[#EF4444]" />
                        <span>+91 90048 30541</span>
                      </a>
                    </div>

                    <div className="rounded-xl bg-[#0B0B0C] border border-[#2D2D35] p-3 hover:border-[#A31D1D]/60 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-white">Sri Lokesh Jagat</span>
                        <span className="text-[10px] font-semibold text-[#EF4444] bg-[#241113] px-2 py-0.5 rounded-full border border-[#A31D1D]/30">Treasurer</span>
                      </div>
                      <a href="tel:+919439425322" className="mt-1.5 flex items-center gap-1.5 text-xs text-[#D1D5DB] hover:text-[#EF4444] transition-colors">
                        <Phone className="h-3.5 w-3.5 text-[#EF4444]" />
                        <span>+91 94394 25322</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#EF4444] block mb-1">
                    Official Inquiries Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-white font-medium hover:text-[#EF4444] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-[#EF4444]" />
                    <span>{email}</span>
                  </a>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#EF4444] block mb-1">
                    Headquarters
                  </span>
                  <div className="flex items-start gap-2 text-[#D1D5DB]">
                    <MapPin className="h-4 w-4 text-[#EF4444] flex-none mt-0.5" />
                    <span>{city}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#2D2D35]">
                <div className="rounded-xl bg-[#241113] p-4 border border-[#A31D1D]/40 text-xs text-[#D1D5DB]">
                  <span className="font-bold text-[#EF4444] block mb-1 font-odia">
                    ଜୁହାର 🙏 ସମସ୍ତ ପଶ୍ଚିମ ଓଡ଼ିଶା ବାସୀଙ୍କୁ ସ୍ୱାଗତ
                  </span>
                  Official representation covering all 10+ Western Odisha districts in Bhubaneswar.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <ScrollReveal delay={150}>
            <div className="rounded-3xl glass-panel-elevated p-8 sm:p-10 shadow-2xl border border-[#2D2D35]">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">
                Send a Formal Message
              </h2>
              <p className="text-xs text-[#9CA3AF] mb-6">
                Fill out the form below. Messages are routed directly to the POAS secretariat.
              </p>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
