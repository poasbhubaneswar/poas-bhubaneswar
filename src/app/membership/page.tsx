import Link from "next/link";
import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Sparkles, ArrowRight, Phone, Home, Shield, Bell } from "lucide-react";

export const metadata = {
  title: "Membership Coming Soon | Paschim Odisha Agrani Sangathana",
  description: "Official membership enrolment for Paschim Odisha Agrani Sangathana (POAS) is launching soon.",
};

export default function MembershipPage() {
  return (
    <div className="relative min-h-[82vh] flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#A31D1D]/35 via-[#EF4444]/20 to-transparent blur-[110px] -z-10" />

      <div className="w-full max-w-3xl mx-auto space-y-10 text-center">
        
        <ScrollReveal>
          {/* Main Flash Card */}
          <div className="relative rounded-3xl glass-panel-elevated p-8 sm:p-14 border border-[#A31D1D]/50 shadow-[0_0_50px_rgba(163,29,29,0.35)] overflow-hidden">
            <ShimmerBorder />

            {/* Glowing Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EF4444]/40 bg-[#241113] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#EF4444] mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#EF4444] animate-ping" />
              <span>Official Announcement</span>
            </div>

            {/* Grand Coming Soon Title */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              Membership <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] via-rose-300 to-white">
                Coming Soon
              </span>
            </h1>

            {/* Sacred Odia Title */}
            <div className="mt-4">
              <span className="font-odia text-2xl sm:text-3xl text-[#EF4444] font-medium block">
                ସଦସ୍ୟତା ନାମାଙ୍କନ ଶୀଘ୍ର ଆରମ୍ଭ ହେଉଛି
              </span>
              <p className="text-xs sm:text-sm text-[#9CA3AF] font-odia mt-1">
                ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନ (POAS), ଭୁବନେଶ୍ୱର
              </p>
            </div>

            <div className="my-8 max-w-md mx-auto">
              <SambalpuriBand className="opacity-90" />
            </div>

            {/* Refined Descriptive Message */}
            <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed max-w-xl mx-auto">
              The centralized digital membership portal and verified registration system of Paschim Odisha Agrani Sangathana is launching shortly.
            </p>

            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2 max-w-lg mx-auto">
              Formal enrolment details and guidelines will be officially inaugurated by the POAS Governing Body &amp; Executive Council.
            </p>

            {/* Direct Action Links */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A31D1D] to-[#EF4444] px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>Contact Secretariat</span>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-6 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-white/[0.1] hover:border-[#A31D1D] transition-colors"
              >
                <Home className="h-4 w-4 text-[#EF4444]" />
                <span>Back to Home</span>
              </Link>
            </div>

          </div>
        </ScrollReveal>

      </div>

    </div>
  );
}
