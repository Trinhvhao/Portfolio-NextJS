import type { Metadata } from "next";

import { ResumeCV } from "@/components/sections/resume-cv";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { MySiteSection } from "@/components/sections/my-site-section";

export const metadata: Metadata = {
  title: "Resume | Trinh Van Hao",
  description: "Professional resume of Trinh Van Hao - Fullstack Developer & AI Enthusiast.",
};

const NOTO_SERIF_FALLBACK =
  '"Iowan Old Style", "Apple Garamond", "Palatino Linotype", "Times New Roman", "Droid Serif", Times, serif';

export default function ResumePage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[-1] h-[450px] w-full overflow-hidden bg-neutral-100/70 dark:bg-neutral-950/93"
        style={{ maskImage: "linear-gradient(rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%)" }}
      >
        <img
          alt=""
          className="pointer-events-none absolute inset-0 z-[-1] h-[450px] w-full select-none object-cover mix-blend-overlay"
          decoding="async"
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

      <main
        className="container relative flex min-h-screen flex-col max-sm:px-1"
        style={{ fontFamily: NOTO_SERIF_FALLBACK }}
      >
        <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
          <div
            aria-hidden="true"
            className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] opacity-75 dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />

          <div className="relative col-span-1 min-h-screen pt-36 pb-24">
            <ResumeCV />
          </div>

          <div
            aria-hidden="true"
            className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] opacity-75 dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />
        </div>
      </main>

      <ContactCtaSection />
      <MySiteSection />
    </>
  );
}
