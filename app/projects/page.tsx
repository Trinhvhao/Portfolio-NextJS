import type { Metadata } from "next";

import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ClientProjectsList } from "./client-projects-list";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { TypedRouteText } from "@/components/ui/typed-route-text";

export const metadata: Metadata = {
  title: "Projects | Trinh Van Hao",
  description: "A curated collection of case studies and experiments.",
};

export default function ProjectsPage() {
  return (
    <>
      <StaggerContainer as="main" className="container relative flex flex-col max-sm:px-1">
        <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
          <div
            aria-hidden="true"
            className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />

          <div className="relative col-span-1 min-w-0">
            <div
              className="absolute inset-0 z-[-1] h-[450px] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950"
              style={{ maskImage: "linear-gradient(rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%)", opacity: 1 }}
            >
              <StaggerItem>
                <img
                  aria-hidden="true"
                  alt=""
                  className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-auto w-full opacity-40"
                  decoding="async"
                  src="/images/projects-hero-wire.svg"
                />
              </StaggerItem>
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

            <section className="pb-32 pt-38">
              <StaggerItem>
                <h2
                  className="relative z-2 mx-auto mb-20 max-w-md text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:text-5xl md:mb-36 md:text-6xl !mb-32"
                  style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05), 0px 8px 30px rgba(255,255,255,.25)" }}
                >
                  <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">
                    Case Studies
                  </p>
                  <span className="font-instrument-serif text-neutral-100">
                    <span>Curated </span>
                    <TypedRouteText
                      text="Work"
                      className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull"
                      delay={0.1}
                    />
                  </span>
                </h2>
              </StaggerItem>

              <StaggerItem>
                <ClientProjectsList />
              </StaggerItem>
            </section>
          </div>

          <div
            aria-hidden="true"
            className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />
        </div>
      </StaggerContainer>

      <StaggerContainer>
        <StaggerItem>
          <ContactCtaSection />
        </StaggerItem>
      </StaggerContainer>
    </>
  );
}
