import { prisma } from "@/lib/prisma";
import { SambalpuriBand, ShimmerBorder } from "@/components/ui/SambalpuriMotif";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Photo Gallery | Paschim Odisha Agrani Sangathana Archives",
  description: "Browse authentic photographic archives of POAS gatherings, Maa Samalei consultations, Sambalpuri cultural presentations, and community events.",
};

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
            Photographic Archives
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
            Moments, Heritage &amp; Memories
          </h1>
          <p className="text-base text-[#D1D5DB] mt-3 leading-relaxed font-odia text-lg">
            "ଆମ ସଂସ୍କୃତି, ଆମ ଉତ୍ସବ, ଆମ ଏକତା"
          </p>
        </div>
      </ScrollReveal>

      <SambalpuriBand className="opacity-80" />

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <ScrollReveal key={item.id} delay={idx * 70}>
            <div className="group relative flex flex-col rounded-3xl glass-card-interactive overflow-hidden h-full border border-white/10 hover:border-[#A31D1D]">
              <ShimmerBorder />
              <div className="relative aspect-[4/3] w-full bg-black overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-bold text-[#EF4444] border border-white/10 backdrop-blur-md">
                  {item.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-[#EF4444] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
}
