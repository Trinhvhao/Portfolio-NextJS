"use client";

import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      aria-label={copied ? "Copied!" : "Copy code"}
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium tracking-wide text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-3.5 text-green-400">
            <path d="M4 10l4.5 4.5 7.5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-3.5">
            <path d="M7.5 7.5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 12.5h-.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.5a2 2 0 0 1 2 2v.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}
