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

            {/* Official Social Media Channels */}
            <div className="pt-3">
              <span className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider block mb-2">
                Connect With POAS
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://youtube.com/@paschimodishaagranisangathan?si=pTMx3VsSYCetqLVy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="POAS Official YouTube Channel"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-white/80 hover:text-[#EF4444] hover:border-[#EF4444] hover:bg-[#A31D1D]/20 transition-all shadow-sm"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/poasbhubaneswar?utm_source=ig_web_button_share_sheet&avpt=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="POAS Official Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-white/80 hover:text-[#EF4444] hover:border-[#EF4444] hover:bg-[#A31D1D]/20 transition-all shadow-sm"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/share/1Hmnao1fAj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="POAS Official Facebook Page"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-white/80 hover:text-[#EF4444] hover:border-[#EF4444] hover:bg-[#A31D1D]/20 transition-all shadow-sm"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
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
                  Leadership
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
                  Membership (Coming Soon)
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
                href="tel:+919439011880"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-[#EF4444] flex-none" />
                <span>+91 94390 11880 (President)</span>
              </a>
              <a
                href="tel:+918917435721"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-[#EF4444] flex-none" />
                <span>+91 891 743 5721 (Sec. General)</span>
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
              Membership
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contacts
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
