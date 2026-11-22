"use client";

import { useActionState } from "react";
import Image from "next/image";
import { adminLogin, type LoginState } from "@/actions/admin";
import { Shield, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const initialState: LoginState = { success: false };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLogin, initialState);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-[#A31D1D]/50 bg-[#141416] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Emblem */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-black border-2 border-[#A31D1D] mb-3 shadow-[0_0_20px_rgba(163,29,29,0.5)] overflow-hidden">
            <Image
              src="/images/poas-logo.png"
              alt="POAS Official Logo"
              fill
              sizes="56px"
              className="object-contain p-1"
            />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">
            POAS Administrator Portal
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Authorized personnel login for content, meetings &amp; leadership
          </p>
        </div>

        {state?.error && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-red-400 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 flex-none" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#9CA3AF]" />
              <input
                name="email"
                type="email"
                required
                defaultValue="admin@nuakhaivetaghat.org"
                placeholder="admin@nuakhaivetaghat.org"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] pl-10 pr-4 py-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Security Key / Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#9CA3AF]" />
              <input
                name="password"
                type="password"
                required
                defaultValue="Nuakhai@2026!POAS"
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] pl-10 pr-4 py-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A31D1D] to-[#EF4444] py-3 text-xs font-bold text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            <span>{isPending ? "Authenticating..." : "Sign in to Control Console"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 text-center pt-4 border-t border-[#2D2D35]">
          <Link href="/" className="text-xs text-[#9CA3AF] hover:text-white transition-colors">
            ← Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}
