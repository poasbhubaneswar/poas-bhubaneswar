"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Shield, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About POAS" },
  { href: "/leadership", label: "Leadership" },
  { href: "/meetings", label: "Meetings" },
  { href: "/maasamalei", label: "Maa Samalei Project" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none">
      <div
        className={`mx-auto max-w-[1440px] w-full rounded-full transition-all duration-300 pointer-events-auto px-4 py-2 sm:px-5 sm:py-2 flex items-center justify-between gap-2 lg:gap-4 ${
          isScrolled ? "apple-glass-nav-scrolled" : "apple-glass-nav"
        }`}
      >
        {/* POAS Brand Logo & Bilingual Title */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
          <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 flex-none items-center justify-center rounded-xl bg-white border-2 border-[#A31D1D] shadow-[0_2px_12px_rgba(0,0,0,0.35)] overflow-hidden transition-transform duration-200 group-hover:scale-105 p-1">
            <Image
              src="/images/poas-logo.png"
              alt="Official POAS Logo"
              fill
              sizes="48px"
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base font-bold tracking-tight text-white block leading-none whitespace-nowrap group-hover:text-[#EF4444] transition-colors">
              POAS
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wide text-[#EF4444] block font-odia mt-0.5 whitespace-nowrap">
              ପଶ୍ଚିମ ଓଡ଼ିଶା ଅଗ୍ରଣୀ ସଂଗଠନ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links — Strictly Single Line & Spacious */}
        <nav
          className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1.5 flex-1 min-w-0"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-medium rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "text-white font-semibold bg-[#A31D1D] shadow-[0_2px_12px_rgba(163,29,29,0.4)]"
                    : "text-[#D1D5DB] hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          <Link
            href="/membership"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#A31D1D] to-[#EF4444] px-4 py-1.5 text-xs font-bold text-white shadow-[0_2px_12px_rgba(163,29,29,0.35)] hover:shadow-[0_4px_18px_rgba(163,29,29,0.55)] hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap"
          >
            <Sparkles className="h-3 w-3" />
            <span>Join POAS</span>
          </Link>

          <Link
            href="/admin"
            title="Admin Portal"
            className="hidden md:inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] p-2 text-[#9CA3AF] hover:bg-white/[0.1] hover:border-[#A31D1D]/40 hover:text-white transition-all"
          >
            <Shield className="h-4 w-4" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] p-2 text-white hover:text-[#EF4444] hover:bg-white/[0.1] focus:outline-none transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-lg rounded-3xl apple-glass-dropdown p-4 shadow-2xl pointer-events-auto">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#A31D1D] text-white font-semibold"
                      : "text-[#D1D5DB] hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/membership"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-full bg-gradient-to-r from-[#A31D1D] to-[#EF4444] py-2.5 text-xs font-bold text-white shadow-md"
              >
                Join POAS (Lifetime &amp; Yearly)
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-full border border-white/15 bg-white/[0.05] py-2 text-xs font-medium text-[#9CA3AF] hover:text-white"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
