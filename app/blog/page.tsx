import type { Metadata } from "next";

import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { TypedRouteText } from "@/components/ui/typed-route-text";
import { BlogContent } from "./blog-content";

export const metadata: Metadata = {
  title: "Blog | Tutorials & Insights - Aayush Bharti",
  description:
    "Explore tutorials, deep dives, and lessons on React, Next.js, TypeScript, and modern web development from a full-stack engineer.",
};

export default function BlogPage() {
  return (
    <>
      <div
        className="absolute inset-0 z-[-1] h-[450px] w-full overflow-hidden bg-neutral-100/70 dark:bg-neutral-950/93"
        style={{ maskImage: "linear-gradient(rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%)", opacity: 1 }}
      >
        <img
          alt="crumpled paper texture"
          className="pointer-events-none absolute inset-0 z-[-1] h-[450px] w-full select-none object-cover mix-blend-overlay"
          decoding="async"
          loading="lazy"
          sizes="100vw"
          src="/images/crumpled-paper.avif"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            color: "transparent",
          }}
        />
      </div>

      <div className="container relative flex flex-col max-sm:px-1">
        <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
          <div
            aria-hidden="true"
            className="w-full border-x bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />

          <div className="relative col-span-1 min-w-0">
            <main className="pb-24 pt-38">
              <h1
                className="relative z-2 mx-auto mb-16 max-w-xl text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:text-5xl md:text-6xl"
                style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)" }}
              >
                <p className="mb-4 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">The Pensieve</p>
                <span className="inline-block font-instrument-serif">
                  <span>Handpicked </span>
                  <TypedRouteText
                    text="Insights"
                    className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull"
                    delay={0.1}
                  />
                </span>
              </h1>

              <div aria-hidden="true" className="w-full border-t" />
              <BlogContent />
              <div aria-hidden="true" className="w-full border-t" />
            </main>
          </div>

          <div
            aria-hidden="true"
            className="w-full border-x bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />
        </div>
      </div>

      <ContactCtaSection />
    </>
  );
}
