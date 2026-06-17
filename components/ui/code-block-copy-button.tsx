"use client";

import { useState } from "react";

export function CodeBlockCopyButton({ code }: { code: string }) {
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
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy code"}
      className="rounded-lg p-1.5 text-neutral-500 transition-opacity hover:bg-neutral-800 hover:text-neutral-200 xl:opacity-0 xl:group-hover:opacity-100"
    >
      {copied ? (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4 text-green-400">
          <path d="M4 10l4.5 4.5 7.5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
          <path d="M7.5 7.5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5.5 12.5h-.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.5a2 2 0 0 1 2 2v.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </button>
  );
}
