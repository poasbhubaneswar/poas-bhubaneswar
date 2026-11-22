"use client";

import { useActionState, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { submitMembership, type ActionState } from "@/actions/submissions";
import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Check, Crown, Clock } from "lucide-react";

const initialState: ActionState = { success: false };

const DISTRICTS = [
  "Sambalpur",
  "Balangir",
  "Bargarh",
  "Kalahandi",
  "Nuapada",
  "Subarnapur (Sonepur)",
  "Deogarh",
  "Jharsuguda",
  "Sundargarh",
  "Boudh",
  "Other / Diaspora",
];

function MembershipContent() {
  const searchParams = useSearchParams();
  const initialTier = searchParams.get("tier") === "YEARLY" ? "YEARLY" : "LIFETIME";
  const [selectedTier, setSelectedTier] = useState<"LIFETIME" | "YEARLY">(initialTier);
  const [state, formAction, isPending] = useActionState(submitMembership, initialState);

  useEffect(() => {
    const tierParam = searchParams.get("tier");
    if (tierParam === "YEARLY" || tierParam === "LIFETIME") {
      setSelectedTier(tierParam);
    }
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
            Paschim Odisha Agrani Sangathana
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
            Official POAS Membership
          </h1>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
            Choose your membership tier to formally join Paschim Odisha Agrani Sangathana. Connect with our 10+ district diaspora, participate in democratic governance, and support the Maa Samalei Mandir Project.
          </p>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      {/* Two Attractive Membership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Tier 1: Lifetime Membership (₹1,000) */}
        <ScrollReveal delay={50}>
          <div
            onClick={() => setSelectedTier("LIFETIME")}
            className={`group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 cursor-pointer transition-all duration-300 h-full ${
              selectedTier === "LIFETIME"
                ? "bg-gradient-to-b from-[#241113] to-[#141416] border-2 border-[#A31D1D] shadow-[0_0_35px_rgba(163,29,29,0.4)] scale-[1.01]"
                : "glass-card-interactive border border-white/10 hover:border-white/30"
            }`}
          >
            <ShimmerBorder />
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-[#A31D1D]/20 border border-[#A31D1D] flex items-center justify-center text-[#EF4444]">
                <Crown className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-[#A31D1D] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                Lifetime Tier
              </span>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Lifetime Membership
              </h2>
              <span className="text-xs font-odia text-[#EF4444] font-medium block mt-1">
                ଆଜୀବନ ସଦସ୍ୟତା
              </span>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                  ₹1,000
                </span>
                <span className="text-xs text-[#9CA3AF]">one-time registration</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs sm:text-sm text-[#D1D5DB]">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#EF4444] flex-none" />
                  <span>Permanent official POAS digital membership certificate</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#EF4444] flex-none" />
                  <span>Full voting rights in General Body Meetings and elections</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#EF4444] flex-none" />
                  <span>Reserved VIP pass at annual Nuakhai Bhetghat</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#EF4444] flex-none" />
                  <span>Representation in Maa Samalei Mandir construction council</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2D2D35]">
              <button
                type="button"
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                  selectedTier === "LIFETIME"
                    ? "bg-[#A31D1D] text-white shadow-lg shadow-[#A31D1D]/40"
                    : "border border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.1]"
                }`}
              >
                {selectedTier === "LIFETIME" ? "✓ Selected (₹1,000)" : "Choose Lifetime Tier"}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Tier 2: Yearly Membership (₹100) */}
        <ScrollReveal delay={100}>
          <div
            onClick={() => setSelectedTier("YEARLY")}
            className={`group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 cursor-pointer transition-all duration-300 h-full ${
              selectedTier === "YEARLY"
                ? "bg-gradient-to-b from-[#1C1C22] to-[#141416] border-2 border-white/60 shadow-[0_0_35px_rgba(255,255,255,0.2)] scale-[1.01]"
                : "glass-card-interactive border border-white/10 hover:border-white/30"
            }`}
          >
            <ShimmerBorder />
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Clock className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-white/15 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                Yearly Tier
              </span>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Yearly Membership
              </h2>
              <span className="text-xs font-odia text-[#9CA3AF] font-medium block mt-1">
                ବାର୍ଷିକ ସଦସ୍ୟତା
              </span>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                  ₹100
                </span>
                <span className="text-xs text-[#9CA3AF]">per calendar year</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs sm:text-sm text-[#D1D5DB]">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-white/80 flex-none" />
                  <span>Annual membership ID and community directory listing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-white/80 flex-none" />
                  <span>Active participation in cultural assemblies &amp; youth events</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-white/80 flex-none" />
                  <span>Direct invitations to POAS seminars &amp; community aid</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-white/80 flex-none" />
                  <span>Option to transition to Lifetime membership at any point</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2D2D35]">
              <button
                type="button"
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                  selectedTier === "YEARLY"
                    ? "bg-white text-black font-extrabold shadow-lg"
                    : "border border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.1]"
                }`}
              >
                {selectedTier === "YEARLY" ? "✓ Selected (₹100)" : "Choose Yearly Tier"}
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Membership Form Card */}
      <ScrollReveal delay={150}>
        <div className="rounded-3xl glass-panel-elevated p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-[#A31D1D]/40">
          <ShimmerBorder />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#2D2D35]">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Registration Form
              </h2>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Selected: <strong className="text-white">{selectedTier === "LIFETIME" ? "Lifetime Membership (₹1,000)" : "Yearly Membership (₹100)"}</strong>
              </p>
            </div>

            {/* Quick Switcher */}
            <div className="inline-flex rounded-xl bg-black/60 p-1 border border-white/15">
              <button
                type="button"
                onClick={() => setSelectedTier("LIFETIME")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedTier === "LIFETIME" ? "bg-[#A31D1D] text-white" : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                Lifetime (₹1,000)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTier("YEARLY")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedTier === "YEARLY" ? "bg-white text-black font-extrabold" : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                Yearly (₹100)
              </button>
            </div>
          </div>

          {state.success && (
            <div className="mb-6 rounded-2xl border border-green-500/40 bg-green-500/10 p-5 text-green-400 flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 flex-none mt-0.5" />
              <div className="text-sm font-medium leading-relaxed">{state.message}</div>
            </div>
          )}

          {state.error && (
            <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-5 text-red-400 flex items-start gap-3">
              <AlertCircle className="h-6 w-6 flex-none mt-0.5" />
              <div className="text-sm font-medium leading-relaxed">{state.error}</div>
            </div>
          )}

          <form action={formAction} className="space-y-6">
            <input type="hidden" name="membershipTier" value={selectedTier} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Shri / Smt..."
                  className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white placeholder:text-[#6B7280] focus:border-[#A31D1D] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Mobile Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white placeholder:text-[#6B7280] focus:border-[#A31D1D] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white placeholder:text-[#6B7280] focus:border-[#A31D1D] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="nativeDistrict" className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Native District (Western Odisha) *
                </label>
                <select
                  id="nativeDistrict"
                  name="nativeDistrict"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
                >
                  <option value="" disabled>Select your native district...</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Current Residential City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                defaultValue="Bhubaneswar"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white placeholder:text-[#6B7280] focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-[#2D2D35] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#9CA3AF]">
                Enrolment Fee: <strong className="text-white">{selectedTier === "LIFETIME" ? "₹1,000 (Lifetime)" : "₹100 (Yearly)"}</strong>
              </span>

              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#A31D1D] to-[#EF4444] px-8 py-3.5 text-sm font-bold text-white shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {isPending ? "Submitting Registration..." : `Submit Registration (${selectedTier === "LIFETIME" ? "₹1,000" : "₹100"})`}
              </button>
            </div>
          </form>

        </div>
      </ScrollReveal>

    </div>
  );
}

export default function MembershipPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-24 text-center">
          <div className="h-8 w-8 mx-auto rounded-full border-2 border-[#A31D1D] border-t-transparent animate-spin mb-4" />
          <span className="text-xs text-[#9CA3AF]">Loading official POAS membership options...</span>
        </div>
      }
    >
      <MembershipContent />
    </Suspense>
  );
}

