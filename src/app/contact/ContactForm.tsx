"use client";

import { useActionState } from "react";
import { submitContactMessage, type ActionState } from "@/actions/submissions";
import { CheckCircle2, AlertCircle } from "lucide-react";

const initialState: ActionState = { success: false };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState);

  return (
    <div>
      {state.success && (
        <div className="mb-6 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 text-green-400 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 flex-none mt-0.5" />
          <div className="text-sm font-medium">{state.message}</div>
        </div>
      )}

      {state.error && (
        <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-red-400 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-none mt-0.5" />
          <div className="text-sm font-medium">{state.error}</div>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Priyaranjan Meher"
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white placeholder-[#6B7280] focus:border-[#A31D1D] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white placeholder-[#6B7280] focus:border-[#A31D1D] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@domain.com"
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white placeholder-[#6B7280] focus:border-[#A31D1D] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Subject of Inquiry
            </label>
            <select
              id="subject"
              name="subject"
              defaultValue="General Inquiry"
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none transition-colors"
            >
              <option value="General Inquiry">General POAS Inquiry</option>
              <option value="Maa Samalei Mandir">Maa Samalei Mandir Project</option>
              <option value="Nuakhai Celebrations">Nuakhai Bhetghat Celebrations</option>
              <option value="Membership Question">Membership Enrolment Details</option>
              <option value="Volunteering">Volunteering &amp; Cultural Participation</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Detailed Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Please write your questions, propositions, or thoughts..."
            className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] px-4 py-3 text-sm text-white placeholder-[#6B7280] focus:border-[#A31D1D] focus:outline-none transition-colors"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#A31D1D] to-[#EF4444] px-8 py-3 text-xs font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isPending ? "Transmitting..." : "Send Secretariat Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
