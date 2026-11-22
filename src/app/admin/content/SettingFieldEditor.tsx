"use client";

import { useTransition, useState } from "react";
import { updateSiteSetting } from "@/actions/admin";
import { Save, Check, Loader2, ExternalLink } from "lucide-react";

interface SettingFieldProps {
  settingKey: string;
  label: string;
  desc: string;
  initialValue: string;
  isTextarea?: boolean;
}

export function SettingFieldEditor({
  settingKey,
  label,
  desc,
  initialValue,
  isTextarea = false,
}: SettingFieldProps) {
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append("key", settingKey);
      formData.append("value", value);
      await updateSiteSetting(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  return (
    <div className="rounded-2xl border border-[#2D2D35] bg-[#141416] p-6 shadow-sm transition-all duration-200 hover:border-[#A31D1D]/60">
      <form onSubmit={handleSave} className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#EF4444] uppercase tracking-wider">
            {label}
          </label>
          {saved && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-green-400">
              <Check className="h-3 w-3" />
              <span>Saved &amp; Live!</span>
            </span>
          )}
        </div>

        <p className="text-xs text-[#9CA3AF]">{desc}</p>

        {isTextarea ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none transition-colors"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-xl border border-[#2D2D35] bg-[#0B0B0C] p-3 text-sm text-white focus:border-[#A31D1D] focus:outline-none transition-colors"
          />
        )}

        <div className="flex items-center justify-between pt-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[#9CA3AF] hover:text-white transition-colors"
          >
            <span>View on Public Site</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#A31D1D] px-4 py-2 text-xs font-bold text-white hover:bg-[#EF4444] disabled:opacity-50 transition-colors shadow-sm"
          >
            {isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5 text-white" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
