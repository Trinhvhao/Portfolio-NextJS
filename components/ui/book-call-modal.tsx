"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

const BOOK_CALL_OPEN_EVENT = "book-call-modal:open";

export function openBookCallModal() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(BOOK_CALL_OPEN_EVENT));
}

type BookCallTriggerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
};

export function BookCallTrigger({ children, className, style, ariaLabel }: BookCallTriggerProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      style={style}
      onClick={() => {
        openBookCallModal();
      }}
    >
      {children}
    </button>
  );
}

export function BookCallModalRoot() {
  const tBookCall = useTranslations("bookCall");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener(BOOK_CALL_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(BOOK_CALL_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[7000] transition-all duration-300 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label={tBookCall("closeModal")}
        className={`absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setIsOpen(false)}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tBookCall("ariaLabel")}
          className={`pointer-events-auto w-full max-w-xl rounded-3xl border border-white/12 bg-[#111214] p-6 text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition-all duration-300 sm:p-7 ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.22em] text-zinc-400 uppercase">{tBookCall("eyebrow")}</p>
              <h2 className="mt-2 font-instrument-serif text-3xl leading-tight text-white">{tBookCall("heading")}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {tBookCall("description")}
              </p>
            </div>
            <button
              type="button"
              aria-label={tBookCall("close")}
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/12 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <span aria-hidden>×</span>
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href="mailto:hello@trinhvhao.com?subject=Book%20a%20Call"
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              {tBookCall("emailToBook")}
            </a>
            <Link
              href="/links"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {tBookCall("viewContactDetails")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
