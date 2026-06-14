"use client";

import { CopyButton } from "@/components/ui/copy-button";

export function MdxCodeBlock({ html, code, label }: { html: string; code: string; label: string }) {
  return (
    <div className="group relative my-4">
      <div className="flex items-center justify-between border border-neutral-800 border-b-0 rounded-t-xl bg-neutral-900/80 px-4 py-1.5">
        <span className="truncate font-mono text-xs text-neutral-400">{label}</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton code={code} />
        </div>
      </div>
      <div
        className="overflow-x-auto rounded-b-xl border border-neutral-800 bg-[linear-gradient(180deg,#0f1222_0%,#090b16_100%)] [&_.shiki]:!bg-transparent [&_.shiki]:m-0 [&_.shiki]:rounded-none [&_.shiki]:border-0 [&_.shiki]:px-4 [&_.shiki]:py-4 [&_.shiki]:text-[13px] [&_.shiki]:leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
