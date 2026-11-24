import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createGalleryItem, deleteGalleryItem } from "@/actions/admin";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import Image from "next/image";
import { Plus, Image as ImageIcon } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminGalleryPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const items = await prisma.galleryItem.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
          Visual Heritage
        </span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">
          Gallery &amp; Visual Assets Management
        </h1>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Add new authentic photographs, edit captions, or remove assets from the public gallery
        </p>
      </div>

      {/* Add New Gallery Item Form */}
      <div className="rounded-2xl border border-[#A31D1D]/40 bg-[#141416] p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-[#EF4444]" />
          <span>Add New Gallery Photograph</span>
        </h3>

        <form action={createGalleryItem} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">Title *</label>
              <input
                name="title"
                required
                placeholder="e.g. Sambalpuri Dance Troupe at Nuakhai..."
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white uppercase mb-1">Category</label>
              <select
                name="category"
                className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
              >
                <option value="Celebrations">Celebrations</option>
                <option value="Rituals">Sacred Rituals</option>
                <option value="Cultural Stage">Cultural Stage</option>
                <option value="Meetings">Consultative Meetings</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">Image URL / Path *</label>
            <input
              name="imageUrl"
              required
              placeholder="/images/hero/nuakhai-ceremony-hero.jpeg"
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white uppercase mb-1">Caption</label>
            <textarea
              name="caption"
              rows={2}
              placeholder="Short descriptive caption..."
              className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-2.5 text-xs text-white focus:border-[#A31D1D] focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-xl bg-[#A31D1D] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#EF4444] transition-colors"
            >
              Add to Gallery
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Items Grid */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg font-bold text-white">
          Active Visual Assets ({items.length})
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((it) => (
            <div
              key={it.id}
              className="group relative rounded-2xl border border-[#2D2D35] bg-[#141416] overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full bg-black">
                <Image
                  src={it.imageUrl}
                  alt={it.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <span className="text-[10px] font-bold text-[#EF4444] uppercase block">
                  {it.category}
                </span>
                <span className="font-semibold text-xs text-white block truncate mt-0.5">
                  {it.title}
                </span>

                <div className="mt-3 pt-2 border-t border-[#2D2D35] flex justify-end">
                  <AdminDeleteButton
                    id={it.id}
                    title={it.title}
                    itemType="Gallery Image"
                    action={deleteGalleryItem}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
