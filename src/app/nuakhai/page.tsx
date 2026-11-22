import { SambalpuriBand } from "@/components/ui/SambalpuriMotif";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, Heart, Shield, BookOpen, Users } from "lucide-react";

export const metadata = {
  title: "Nuakhai Cultural Heritage & Traditions | Paschim Odisha",
  description: "Explore the deep spiritual and cultural roots of Nuakhai: the Nabanna ritual, Nuakhai Bhetghat, Sambalpuri folk traditions, and Western Odisha's harvest festival.",
};

export default function NuakhaiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
          Sacred Agrarian Tradition
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-1">
          Nuakhai: The Festival of First Fruits
        </h1>
        <p className="text-base text-[#D1D5DB] mt-3 leading-relaxed font-odia text-xl">
          "ଜୁହାର — ଧରିତ୍ରୀ ମାତା ଏବଂ ମାଁ ସମଲେଇଙ୍କୁ କୃତଜ୍ଞତା"
        </p>
      </div>

      <SambalpuriBand className="opacity-80" />

      {/* Deep Cultural Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <h2 className="font-serif text-3xl font-bold text-white">
            Significance &amp; Cosmic Philosophy
          </h2>
          <p className="text-base text-[#D1D5DB] leading-relaxed">
            The word <strong className="text-white">Nuakhai</strong> is a combination of two Sambalpuri words: <strong className="text-white">Nua</strong> (new) and <strong className="text-white">Khai</strong> (food/eating). Celebrated on the Panchami Tithi of the bright fortnight of Bhadraba (August–September), it symbolizes the welcome of newly harvested paddy crops.
          </p>
          <p className="text-base text-[#D1D5DB] leading-relaxed">
            Unlike standard harvest events, Nuakhai carries an agricultural ethic deeply intertwined with tribal and Kosali agrarian folklore. It represents human humility before nature, collective thanksgiving to <strong className="text-white">Maa Samaleswari</strong> and Mother Earth, and the social imperative that no harvest is consumed without first honoring the divine and sharing with one's kith and kin.
          </p>
          <div className="p-4 rounded-xl border border-[#A31D1D]/40 bg-[#241113]/60">
            <h4 className="font-serif text-base font-bold text-[#EF4444] mb-1">
              The Sacred Muhurat
            </h4>
            <p className="text-xs text-[#D1D5DB] leading-relaxed">
              Every year, priests and astrologers in Sambalpur calculate the exact auspicious lagna (time window) for the offering of Nabanna at the Maa Samaleswari temple. Across the entire Western Odisha region and diaspora, millions partake in the sacred rice at that precise moment in total spiritual synchronization.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] w-full rounded-3xl border border-[#A31D1D]/40 overflow-hidden shadow-2xl bg-black">
            <Image
              src="/images/posters/nuakhai-ceremonial-banner.jpeg"
              alt="Nuakhai Ceremonial Art"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* The 9 Sacred Rituals of Nuakhai */}
      <div className="rounded-3xl glass-panel-elevated p-8 sm:p-12 border border-[#2D2D35]">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          The Nine Sacred Stages of Nuakhai
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: "1. Beherana", odia: "ବେହେରଣ", desc: "Setting a date and consultative meeting by village heads and astrologers." },
            { step: "2. Lagna Dharana", odia: "ଲଗ୍ନ ଧାରଣ", desc: "Auspicious calculation of the exact moment for the first grain offering." },
            { step: "3. Daka Hanka", odia: "ଡାକ ହାଙ୍କ", desc: "Proclamation and public invitation across village hamlets." },
            { step: "4. Sapha Sutura", odia: "ସଫା ସୁତୁରା", desc: "Sacred cleaning and purification of homes, courtyards, and utensils." },
            { step: "5. Ghina Bika", odia: "ଘିନା ବିକା", desc: "Purchasing new Sambalpuri clothes, earthenware, and festive ingredients." },
            { step: "6. Nua Anha", odia: "ନୂଆଁ ଆନୟନ", desc: "Ritual harvesting and bringing home of the sacred new paddy ears." },
            { step: "7. Nabanna Bhog", odia: "ନବାନ୍ନ ଭୋଗ", desc: "Offering of new rice to Maa Samaleswari and household deities." },
            { step: "8. Nuakhai Juhar", odia: "ନୂଆଁଖାଇ ଜୁହାର", desc: "Touching elders' feet for blessings and fraternal embracing of peers." },
            { step: "9. Ranga Ranga", odia: "ରଙ୍ଗ ରଙ୍ଗ", desc: "Folk music, Sambalpuri dance, Dalkhai, Rasarkeli, and celebration." },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#A31D1D] transition-colors">
              <span className="text-xs font-bold text-[#EF4444] uppercase tracking-wider block">
                {item.step}
              </span>
              <span className="font-odia text-sm font-semibold text-white block mt-0.5">
                {item.odia}
              </span>
              <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
