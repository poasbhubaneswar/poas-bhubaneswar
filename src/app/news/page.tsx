import { prisma } from "@/lib/prisma";
import { SambalpuriBand } from "@/components/ui/SambalpuriMotif";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "News & Announcements | Paschim Odisha Agrani Sangathana",
  description: "Official press releases, cultural articles, Loka Samachar bulletins, and announcements from POAS Bhubaneswar.",
};

export default async function NewsPage() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444] block">
          Official Press &amp; Chronicles
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
          News &amp; Announcements
        </h1>
        <p className="text-base text-[#D1D5DB] mt-3 leading-relaxed font-odia text-lg">
          "ଖବର, ସୂଚନା ଏବଂ ସାଂସ୍କୃତିକ ଆଲୋଚନା"
        </p>
      </div>

      <SambalpuriBand className="opacity-80" />

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="flex flex-col rounded-3xl border border-[#2D2D35] bg-[#141416] overflow-hidden shadow-sm transition-all duration-300 hover:border-[#A31D1D] hover:-translate-y-1"
          >
            {art.coverImage && (
              <div className="relative aspect-[16/9] w-full bg-black">
                <Image
                  src={art.coverImage}
                  alt={art.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] mb-3">
                  <span className="rounded-md bg-[#241113] border border-[#A31D1D]/40 px-2 py-0.5 text-[10px] font-bold text-[#EF4444] uppercase">
                    {art.category}
                  </span>
                  <span>{art.publishedAt ? formatDate(art.publishedAt) : ""}</span>
                </div>

                <h2 className="font-serif text-lg font-bold text-white hover:text-[#EF4444] transition-colors leading-snug">
                  <Link href={`/news/${art.slug}`}>{art.title}</Link>
                </h2>

                <p className="text-xs text-[#9CA3AF] mt-3 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2D2D35] flex items-center justify-between text-xs">
                <span className="text-[#6B7280]">{art.author}</span>
                <Link
                  href={`/news/${art.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-[#EF4444] hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
