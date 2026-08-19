"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1756312148347-611b60723c7a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1757865579201-693dd2080c73?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1756786605218-28f7dd95a493?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzh8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757519740947-eef07a74c4ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDh8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757263005786-43d955f07fb1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzB8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757207445614-d1e12b8f753e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODZ8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757269746970-dc477517268f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMjN8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1755119902709-a53513bcbedc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNDF8fHxlbnwwfHx8fHw%3D",
];

const ActionButton = ({ children }: { children: React.ReactNode }) => (
  <div className="group mt-8">
    <button
      type="button"
      className="relative inline-flex cursor-pointer items-center justify-between overflow-hidden rounded-full border border-white/15 bg-white/10 py-[3px] pr-[3px] pl-2 font-medium text-base opacity-95 backdrop-blur-xs transition-all hover:bg-white/15 md:py-1 md:pr-1 md:pl-3"
    >
      <span className="z-10 px-3 text-white transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
      <span className="absolute inset-0 translate-x-[45%] scale-0 rounded-full bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100" />
      <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-white p-2 text-black transition-colors duration-300 group-hover:bg-transparent group-hover:text-white md:p-2.5">
        <svg
          aria-hidden
          className="transition-all duration-300 group-hover:translate-x-5 group-hover:opacity-0"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="18"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        <svg
          aria-hidden
          className="absolute -translate-x-5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="18"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </button>
  </div>
);

export function TiktokSection() {
  const t = useTranslations("tiktokSection");
  const duplicatedImages = [...DEMO_IMAGES, ...DEMO_IMAGES];
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const revealClass = `transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
    isInView ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"
  }`;

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={marqueeRef}
      id="tiktok"
      className="relative w-full min-h-screen overflow-hidden bg-[#02040a] flex flex-col items-center justify-center text-center px-4 py-pagebuilder"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-black via-black/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div
          className={`${revealClass} mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm`}
        >
          <svg aria-hidden className="size-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.73a8.16 8.16 0 0 0 4.77 1.52V6.8a4.85 4.85 0 0 1-1.84-.11Z" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-widest">
            {t("tagline")}
          </span>
        </div>

        <div
          className={`${revealClass} mb-8 flex flex-wrap items-center justify-center gap-3`}
          style={{ transitionDelay: "150ms" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 font-mono text-sm font-semibold text-white backdrop-blur-xs">
            <svg
              aria-hidden
              className="size-4 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.73a8.16 8.16 0 0 0 4.77 1.52V6.8a4.85 4.85 0 0 1-1.84-.11Z" />
            </svg>
            <span className="text-colorfull bg-clip-text font-mono">
              {t("handle")}
            </span>
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-sm font-semibold text-white backdrop-blur-xs">
            <span aria-hidden className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-white" />
            </span>
            <span className="tabular-nums text-white">{t("followersCount")}</span>
            <span className="font-medium text-white/70">
              {t("followersLabel")}
            </span>
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
        >
          {(t("title") as string).split(" ").map((word, i) => (
            <span
              key={i}
              className={`${revealClass} inline-block`}
              style={{ transitionDelay: `${250 + i * 100}ms` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>

        <p
          className={`${revealClass} mt-6 max-w-xl text-lg text-white/70`}
          style={{ transitionDelay: "500ms" }}
        >
          {t("description")}
        </p>

        <div
          className={revealClass}
          style={{ transitionDelay: "600ms" }}
        >
          <a
            href="https://www.tiktok.com/@itlamcontent.th"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-block"
          >
            <ActionButton>{t("ctaText")}</ActionButton>
          </a>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-1/3 md:h-2/5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      >
        <div
          className="flex gap-4 will-change-transform"
          style={{
            animation: isInView
              ? "tiktok-marquee 40s linear infinite"
              : "none",
            transform: "translate3d(-50%, 0, 0)",
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-48 md:h-64 shrink-0"
              style={{ rotate: `${index % 2 === 0 ? -2 : 5}deg` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Showcase image ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="size-full object-cover rounded-2xl shadow-md"
              />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes tiktok-marquee {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-50%, 0, 0); }
          }
        `}</style>
      </div>
    </section>
  );
}
