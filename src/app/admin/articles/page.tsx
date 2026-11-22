import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createArticle, deleteArticle } from "@/actions/admin";
import { Plus, Trash2, FileText, Image as ImageIcon } from "lucide-react";

export default async function AdminArticlesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
          Press &amp; Publications
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          Articles, Chronicles &amp; Press Releases
        </h1>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Publish announcements, cultural deep dives, and event reports
        </p>
      </div>

      {/* Add New Article Form */}
      <div className="rounded-2xl border border-[#A31D1D]/40 bg-[#141416] p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-[#EF4444]" />
          <span>Compose New Article</span>
        </h3>

        <form action={createArticle} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">Headline *</label>
              <input
                name="title"
                required
                placeholder="Title of news article..."
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">Category</label>
              <select
                name="category"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              >
                <option value="Cultural Heritage">Cultural Heritage</option>
                <option value="Sangathan Updates">Sangathan Updates</option>
                <option value="Maa Samalei Project">Maa Samalei Project</option>
                <option value="Press Coverage">Press Coverage</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">Short Excerpt *</label>
            <input
              name="excerpt"
              required
              placeholder="Brief 1-2 sentence preview..."
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">Cover Image URL</label>
            <input
              name="coverImage"
              placeholder="/images/hero/nuakhai-ceremony-hero.jpeg"
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">Article Content *</label>
            <textarea
              name="content"
              required
              rows={6}
              placeholder="Full article content (paragraphs separated by double newlines)..."
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-xl bg-[#A31D1D] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#EF4444] transition-colors"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg font-bold text-white">
          Published Articles ({articles.length})
        </h2>

        <div className="space-y-3">
          {articles.map((art) => (
            <div
              key={art.id}
              className="rounded-xl border border-[#2D2D35] bg-[#141416] p-4 flex items-center justify-between hover:border-[#A31D1D] transition-colors"
            >
              <div>
                <span className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider block">
                  {art.category}
                </span>
                <h3 className="font-serif text-base font-bold text-white mt-0.5">
                  {art.title}
                </h3>
                <p className="text-xs text-[#9CA3AF] line-clamp-1 mt-1">
                  {art.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <form action={deleteArticle.bind(null, art.id)}>
                  <button
                    type="submit"
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete Article"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
