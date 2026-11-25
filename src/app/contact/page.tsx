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
                Contact Details
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

                {/* Official Social Media Channels */}
                <div className="pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#EF4444] block mb-2">
                    Official Social Channels
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://youtube.com/@paschimodishaagranisangathan?si=pTMx3VsSYCetqLVy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-[#0B0B0C] border border-[#2D2D35] px-3 py-2 text-xs font-medium text-white hover:border-[#EF4444] hover:text-[#EF4444] transition-all"
                    >
                      <svg className="h-4 w-4 fill-current text-red-500" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>YouTube</span>
                    </a>

                    <a
                      href="https://www.instagram.com/poasbhubaneswar?utm_source=ig_web_button_share_sheet&avpt=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-[#0B0B0C] border border-[#2D2D35] px-3 py-2 text-xs font-medium text-white hover:border-[#EF4444] hover:text-[#EF4444] transition-all"
                    >
                      <svg className="h-4 w-4 fill-current text-pink-500" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Instagram</span>
                    </a>

                    <a
                      href="https://www.facebook.com/share/1Hmnao1fAj/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-[#0B0B0C] border border-[#2D2D35] px-3 py-2 text-xs font-medium text-white hover:border-[#EF4444] hover:text-[#EF4444] transition-all"
                    >
                      <svg className="h-4 w-4 fill-current text-blue-500" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </a>
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
