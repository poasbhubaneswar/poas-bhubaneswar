"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface AdminDeleteButtonProps {
  id: string;
  title: string;
  itemType?: string;
  action: (id: string) => Promise<any>;
  className?: string;
  iconOnly?: boolean;
  onDeleted?: () => void;
}

export function AdminDeleteButton({
  id,
  title,
  itemType = "record",
  action,
  className,
  iconOnly = true,
  onDeleted,
}: AdminDeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete this ${itemType.toLowerCase()}?\n\n"${title}"\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        const res = await action(id);
        if (res && res.error) {
          alert(`Error: ${res.error}`);
          return;
        }
        onDeleted?.();
        router.refresh();
      } catch (err: any) {
        console.error("Delete error:", err);
        alert("Failed to delete. Please try again.");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      title={`Delete ${itemType}`}
      className={
        className ||
        "rounded-lg p-1.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
      }
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin text-red-400 flex-none" />
      ) : (
        <Trash2 className="h-4 w-4 flex-none" />
      )}
      {!iconOnly && <span>{isPending ? "Deleting..." : "Delete"}</span>}
    </button>
  );
}
