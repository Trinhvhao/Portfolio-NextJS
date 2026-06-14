"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type PostShareMenuProps = {
  postUrl: string;
  postTitle: string;
  markdownUrl: string;
};

type Toast = { id: number; message: string } | null;

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
      <path d="M7.5 7.5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 12.5h-.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.5a2 2 0 0 1 2 2v.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MarkdownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 13V8.5l1.75 2L9 8.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 13V8.5h2.5M11.5 10.75h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-3.5">
      <path d="M7 5h-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 3h6v6M9 11l8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatGptIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
      <path
        d="M10.5 2.25a3 3 0 0 1 2.6 1.5l.3.5.55-.1a3 3 0 0 1 3.45 3.45l-.1.55.5.3a3 3 0 0 1 0 5.2l-.5.3.1.55a3 3 0 0 1-3.45 3.45l-.55-.1-.3.5a3 3 0 0 1-5.2 0l-.3-.5-.55.1a3 3 0 0 1-3.45-3.45l.1-.55-.5-.3a3 3 0 0 1 0-5.2l.5-.3-.1-.55a3 3 0 0 1 3.45-3.45l.55.1.3-.5a3 3 0 0 1 2.6-1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="10" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
      <path
        d="M5 2.5C5 4 6 5 7 5c-.5 1-1.5 1.5-2.5 1.5C2.5 6.5 1 8 1 10s1.5 3.5 3.5 3.5C5 13.5 6 12 6 10.5c1 .5 1.5 1.5 1.5 2.5 0 1.5 1.5 3 3.5 3s3.5-1.5 3.5-3.5C14.5 11 13.5 10 12.5 10c.5-1 1.5-1.5 2.5-1.5 1.5 0 3-1.5 3-3.5S16.5 1.5 15 1.5C13 1.5 12 3 12 4.5 11 4 10.5 3 10.5 2 10.5 1 9 0 7.5 0 5 0 5 1 5 2.5Z"
        transform="translate(2 2) scale(0.7)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="size-3">
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4 text-green-400">
      <path d="M4 10l4.5 4.5 7.5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PostShareMenu({ postUrl, postTitle, markdownUrl }: PostShareMenuProps) {
  const t = useTranslations("blog.share");
  const tCommon = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    const id = Date.now();
    setToast({ id, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 1800);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      showToast(t("copyUrlSuccess"));
      setOpen(false);
    } catch {
      // Fallback for browsers without clipboard permission
      const input = document.createElement("input");
      input.value = postUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      showToast(t("copyUrlSuccess"));
      setOpen(false);
    }
  };

  const handleCopyMarkdown = async () => {
    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) throw new Error("failed");
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      showToast(t("copyMarkdownSuccess"));
    } catch {
      showToast(t("copyMarkdownError"));
    } finally {
      setOpen(false);
    }
  };

  const openChatGpt = () => {
    const prompt = encodeURIComponent(`Please read this article and give me a thorough summary: ${postTitle}\n\n${postUrl}`);
    const url = `https://chatgpt.com/?q=${prompt}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const openClaude = () => {
    const prompt = encodeURIComponent(`Please read this article and give me a thorough summary: ${postTitle}\n\n${postUrl}`);
    const url = `https://claude.ai/new?q=${prompt}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-flex">
      <div
        aria-label={t("ariaLabel")}
        className="inline-flex shrink-0 items-center overflow-hidden rounded-lg border border-neutral-700 bg-neutral-950/40 shadow-border transition-colors hover:border-neutral-600"
        role="group"
      >
        <button
          type="button"
          onClick={handleCopyUrl}
          className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1.5 text-xs tracking-wide text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200"
        >
          {tCommon("copyPage")}
        </button>
        <span aria-hidden="true" className="w-px self-stretch bg-neutral-800" />
        <button
          type="button"
          aria-label={t("openMenu")}
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((value) => !value)}
          className="px-2 py-2 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200"
        >
          <ChevronDownIcon />
        </button>
      </div>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/95 p-1 shadow-2xl shadow-black/40 backdrop-blur"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleCopyUrl}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            <CopyIcon />
            <span className="flex-1">{t("copyUrl")}</span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleCopyMarkdown}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            <MarkdownIcon />
            <span className="flex-1">{t("copyMarkdown")}</span>
          </button>
          <a
            role="menuitem"
            href={markdownUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            <ExternalIcon />
            <span className="flex-1">{t("viewMarkdown")}</span>
          </a>
          <div aria-hidden="true" className="my-1 h-px bg-neutral-800" />
          <button
            type="button"
            role="menuitem"
            onClick={openChatGpt}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            <ChatGptIcon />
            <span className="flex-1">{t("openChatgpt")}</span>
            <ExternalIcon />
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={openClaude}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            <ClaudeIcon />
            <span className="flex-1">{t("openClaude")}</span>
            <ExternalIcon />
          </button>
        </div>
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute -top-10 right-0 z-50 inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950/95 px-3 py-1.5 text-xs text-neutral-200 shadow-lg"
        >
          <CheckIcon />
          {toast.message}
        </div>
      )}
    </div>
  );
}
