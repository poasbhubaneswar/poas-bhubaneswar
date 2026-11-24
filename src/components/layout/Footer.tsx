import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { SambalpuriBand } from "../ui/SambalpuriMotif";
import { Phone, Mail, MapPin, Shield, Users } from "lucide-react";

export async function Footer() {
  const settings = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  const phone = map.contact_phone || "+91 94390 11880";
  const email = map.contact_email || "poasbhubaneswar@gmail.com";
  const city = map.venue_city || "Bhubaneswar, Odisha, India";
  const address = map.venue_address || "POAS Office, Bhubaneswar, Odisha";

  const phoneClean = phone.replace(/[^0-9+]/g, "");

  return (
    <footer className="relative mt-auto border-t border-[#2D2D35] bg-[#0E0E10] text-white">
      {/* Sambalpuri Ikat Border Accent */}
      <SambalpuriBand className="opacity-80" />

      <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Column 1 & 2: Brand & Heritage Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-13 w-13 flex-none items-center justify-center rounded-xl bg-white border-2 border-[#A31D1D] shadow-md overflow-hidden p-1.5">
                <Image
                  src="/images/poas-logo.png"
                  alt="POAS Official Logo"
                  fill
                  sizes="52px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">
                  POAS – Paschim Odisha Agrani Sangathana
                </h3>
                <p className="text-xs text-[#EF4444] font-odia mt-0.5">
                  ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନ, ଭୁବନେଶ୍ୱର
                </p>
              </div>
            </div>

            <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-sm">
              30+ years of cultural preservation, community solidarity, and socio-cultural leadership. Uniting the diaspora of 10+ Western Odisha districts residing in Bhubaneswar to preserve our sacred heritage and forge a progressive future.
            </p>

            <div className="pt-2">
              <span className="inline-block rounded-full border border-[#A31D1D]/60 bg-[#1A1A1E] px-3.5 py-1 text-xs font-semibold text-[#EF4444] font-odia">
                ଜୁହାର 🙏 · ଜୟ ମାଁ ସମଲେଇ 🙏
              </span>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#A31D1D] pl-2">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li>
                <Link href="/about" className="hover:text-[#EF4444] transition-colors">
                  About POAS
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-[#EF4444] transition-colors">
                  Governing Body &amp; Leadership
                </Link>
              </li>
              <li>
                <Link href="/meetings" className="hover:text-[#EF4444] transition-colors">
                  Meetings &amp; Activities
                </Link>
              </li>
              <li>
                <Link href="/maasamalei" className="hover:text-[#EF4444] transition-colors">
                  Maa Samalei Mandir Project
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#EF4444] transition-colors">
                  Events &amp; Celebrations
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#EF4444] transition-colors">
                  Photo Archives
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#EF4444] transition-colors">
                  News &amp; Announcements
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Participate & Membership */}
          <div>
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#A31D1D] pl-2">
              Membership &amp; Action
            </h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li>
                <Link href="/membership" className="text-white font-medium hover:text-[#EF4444] transition-colors">
                  Lifetime Membership · ₹1,000
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-white font-medium hover:text-[#EF4444] transition-colors">
                  Yearly Membership · ₹100
                </Link>
              </li>
              <li>
                <Link href="/donations" className="hover:text-[#EF4444] transition-colors">
                  Support Mandir Project
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#EF4444] transition-colors">
                  Volunteer &amp; Collaborate
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#6B7280] hover:text-white flex items-center gap-1.5 transition-colors pt-2">
                  <Shield className="h-3.5 w-3.5 text-[#A31D1D]" /> Administrator Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Official Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#A31D1D] pl-2">
              Contact POAS
            </h4>
            <div className="space-y-2.5 text-xs text-[#9CA3AF]">
              <a
                href={`tel:${phoneClean}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-[#EF4444] flex-none" />
                <span>{phone}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-[#EF4444] flex-none" />
                <span>{email}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#EF4444] flex-none mt-0.5" />
                <span>{city}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2D2D35]">
              <span className="text-[11px] text-[#6B7280] block">
                Serving 10+ Western Odisha Districts:
              </span>
              <p className="text-[10px] text-[#9CA3AF] mt-1 leading-relaxed">
                Sambalpur, Balangir, Bargarh, Kalahandi, Nuapada, Subarnapur, Deogarh, Jharsuguda, Sundargarh, Boudh &amp; beyond.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#2D2D35] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
          <div>
            © {new Date().getFullYear()} Paschim Odisha Agrani Sangathana (POAS). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white transition-colors">
              Constitution &amp; By-Laws
            </Link>
            <span>·</span>
            <Link href="/membership" className="hover:text-white transition-colors">
              Membership Tiers
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Secretariat
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
