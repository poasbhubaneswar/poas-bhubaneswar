"use client";

import { useActionState, useState } from "react";
import { submitDonationPledge, type ActionState } from "@/actions/submissions";
import { SambalpuriBand } from "@/components/ui/SambalpuriMotif";
import { CheckCircle2, AlertCircle, Heart, Building2, Users } from "lucide-react";

const initialState: ActionState = { success: false };

export default function DonationsPage() {
  const [state, formAction, isPending] = useActionState(submitDonationPledge, initialState);
  const [selectedAmount, setSelectedAmount] = useState<number | string>(1101);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
          Community Contribution
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mt-1">
          Support Cultural Preservation
        </h1>
        <p className="text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
          Contributions help fund the proposed Maa Samalei Mandir &amp; Cultural Complex in Bhubaneswar, annual Nuakhai Bhetghat celebrations, and community welfare aid.
        </p>
      </div>

      <SambalpuriBand className="opacity-80" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-5">
          <Building2 className="h-6 w-6 text-[#EF4444] mb-3" />
          <h3 className="font-serif text-base font-bold text-white">Maa Samalei Mandir</h3>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Dedicated capital fund for temple architecture, land development, and cultural complex.
          </p>
        </div>

        <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-5">
          <Users className="h-6 w-6 text-[#EF4444] mb-3" />
          <h3 className="font-serif text-base font-bold text-white">Nuakhai Bhetghat</h3>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Festive prasad, Sambalpuri folk troupe honorariums, stage arrangements, and community hospitality.
          </p>
        </div>

        <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-5">
          <Heart className="h-6 w-6 text-[#EF4444] mb-3" />
          <h3 className="font-serif text-base font-bold text-white">Community Welfare</h3>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Student scholarships, health aid, and emergency support for Western Odisha families in need.
          </p>
        </div>
      </div>

      {/* Donation Form Card */}
      <div className="rounded-3xl glass-panel-elevated p-8 sm:p-10 border border-[#A31D1D]/40">
        <h2 className="font-serif text-2xl font-bold text-white mb-6">
          Donation Pledge Form
        </h2>

        {state.success && (
          <div className="mb-6 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 text-green-400 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 flex-none mt-0.5" />
            <div className="text-sm font-medium leading-relaxed">{state.message}</div>
          </div>
        )}

        {state.error && (
          <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-red-400 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-none mt-0.5" />
            <div className="text-sm font-medium leading-relaxed">{state.error}</div>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-2">
                Full Name *
              </label>
              <input
                name="name"
                required
                placeholder="Shri / Smt..."
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-2">
                Pledge Purpose *
              </label>
              <select
                name="purpose"
                defaultValue="Maa Samalei Mandir Project"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
              >
                <option value="Maa Samalei Mandir Project">Maa Samalei Mandir Capital Fund</option>
                <option value="Nuakhai Celebrations">Nuakhai Bhetghat Celebrations</option>
                <option value="General Community Fund">General Community Welfare</option>
              </select>
            </div>
          </div>

          {/* Amount presets */}
          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-2">
              Select Amount (₹) *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {[501, 1101, 2501, 5001].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedAmount === amt
                      ? "bg-[#A31D1D] border-[#A31D1D] text-white shadow-md"
                      : "border-[#2D2D35] bg-[#0B0B0C] text-[#D1D5DB] hover:border-white/40"
                  }`}
                >
                  ₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <input
              type="number"
              name="amount"
              required
              min={10}
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(e.target.value)}
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-[#2D2D35]">
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#A31D1D] to-[#EF4444] px-8 py-3.5 text-sm font-bold text-white shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isPending ? "Recording Pledge..." : "Record Pledge Contribution"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
