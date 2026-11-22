import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { SambalpuriBand } from "@/components/ui/SambalpuriMotif";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return { title: "Article Not Found | POAS" };
  return {
    title: `${article.title} | POAS News`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article || !article.isPublished) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
      
      {/* Back to news button */}
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#EF4444] hover:underline transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to News &amp; Announcements</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-white font-semibold">
          <span className="rounded-md bg-[#A31D1D] px-2.5 py-1 uppercase tracking-wider text-white">
            {article.category}
          </span>
          <span className="text-[#9CA3AF] flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-[#EF4444]" />
            {article.publishedAt ? formatDate(article.publishedAt) : ""}
          </span>
          <span className="text-[#9CA3AF] flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-[#EF4444]" />
            {article.author}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#D1D5DB] leading-relaxed italic border-l-2 border-[#A31D1D] pl-4">
          {article.excerpt}
        </p>
      </div>

      <SambalpuriBand className="opacity-80" />

      {/* Main Cover Image */}
      {article.coverImage && (
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-[#2D2D35] shadow-2xl bg-black">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Content Body */}
      <div className="prose prose-invert max-w-none text-[#D1D5DB] space-y-6 leading-relaxed text-base">
        {article.content.split("\n\n").map((para, i) => (
          <p key={i} className="text-[#D1D5DB] leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* Post Footer Call to Action */}
      <div className="mt-12 pt-8 border-t border-[#2D2D35] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-[#9CA3AF]">
          Paschim Odisha Agrani Sangathana (POAS) — Bhubaneswar
        </span>
        <Link
          href="/membership"
          className="rounded-xl bg-[#A31D1D] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#EF4444] transition-colors shadow-md"
        >
          Join POAS Today
        </Link>
      </div>

    </article>
  );
}
