"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { experienceHeader, experienceItems } from "@/lib/about-data";
import { TypedRouteText } from "@/components/ui/typed-route-text";

const TECH_ICON_MAP: Record<string, string> = {
  TypeScript: "devicon-typescript-plain colored",
  "Next.js": "devicon-nextjs-original",
  "Sanity CMS": "devicon-sanity-plain colored",
  "Contentful CMS": "devicon-contentful-plain colored",
  "Tailwind CSS": "devicon-tailwindcss-original colored",
  Figma: "devicon-figma-plain colored",
  Turborepo: "devicon-turborepo-plain",
  Agile: "devicon-jira-plain colored",
  React: "devicon-react-original colored",
  Python: "devicon-python-plain colored",
  FastAPI: "devicon-fastapi-plain colored",
  PostgreSQL: "devicon-postgresql-plain colored",
  Docker: "devicon-docker-plain colored",
  RAG: "devicon-opensearch-plain",
  PyTorch: "devicon-pytorch-original colored",
  Redis: "devicon-redis-plain colored",
};

function AchievementText({ text }: { text: string }) {
  const separatorIndex = text.indexOf(":");

  if (separatorIndex <= 0) {
    return <>{text}</>;
  }

  const lead = text.slice(0, separatorIndex);
  const body = text.slice(separatorIndex + 1).trim();

  return (
    <>
      <strong className="font-semibold text-neutral-100">{lead}:</strong> {body}
    </>
  );
}

function MapPinIcon() {
  return (
    <svg aria-hidden className="h-3.5 w-3.5 shrink-0" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg aria-hidden className="h-3.5 w-3.5 shrink-0" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect height="14" rx="2" width="20" x="2" y="6" />
    </svg>
  );
}

export function AboutExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const progressTextRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    const shellNode = shellRef.current;
    const fillNode = fillRef.current;
    const iconNode = iconRef.current;
    const progressNode = progressTextRef.current;

    if (!sectionNode || !shellNode || !fillNode || !iconNode || !progressNode) {
      return;
    }

    const updateVisual = (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      const accentRed = Math.round(59 + (236 - 59) * clamped);
      const accentGreen = Math.round(130 + (72 - 130) * clamped);
      const accentBlue = Math.round(246 + (153 - 246) * clamped);

      shellNode.style.setProperty("--accent-r", String(accentRed));
      shellNode.style.setProperty("--accent-g", String(accentGreen));
      shellNode.style.setProperty("--accent-b", String(accentBlue));

      fillNode.style.transform = `translateX(-50%) scaleY(${clamped})`;
      iconNode.style.top = `${Math.max(2, Math.min(98, clamped * 100))}%`;
      progressNode.textContent = `${Math.round(clamped * 100)}% explored`;
    };

    const updateScrollProgress = () => {
      const rect = sectionNode.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      // Start only after a meaningful part of the section has entered viewport,
      // and finish when the section is fully scrolled past the top edge.
      const startLine = viewportHeight * 0.68;
      const travel = rect.height + startLine;

      if (travel <= 0) {
        targetProgressRef.current = 0;
        return;
      }

      const raw = (startLine - rect.top) / travel;
      targetProgressRef.current = Math.min(1, Math.max(0, raw));
    };

    const animate = () => {
      const current = currentProgressRef.current;
      const target = targetProgressRef.current;
      const next = current + (target - current) * 0.34;
      currentProgressRef.current = Math.abs(next - target) < 0.0006 ? target : next;
      updateVisual(currentProgressRef.current);
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    updateScrollProgress();
    updateVisual(0);
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="experience-heading" className="relative" id="experience">
      <div className="mx-auto w-full">
        <h2
          id="experience-heading"
          className="relative z-2 mx-auto mb-4 max-w-lg text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:text-5xl md:mb-0 md:text-6xl"
          style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" }}
        >
          <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{experienceHeader.eyebrow}</p>
          <span className="font-instrument-serif">
            <span>{experienceHeader.titleStart} </span>
            <TypedRouteText
              text={experienceHeader.titleAccent}
              triggerOnView
              className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull"
              delay={0.12}
            />
          </span>
        </h2>

        <div
          ref={shellRef}
          className="relative mx-auto my-16 border-y border-dashed border-neutral-200 px-5 py-5 dark:border-neutral-800 max-md:pl-2!"
          style={{
            borderColor: "rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.35)",
            background:
              "radial-gradient(120% 120% at 0% 0%, rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.12), transparent 45%)," +
              "radial-gradient(120% 120% at 100% 100%, rgba(255,255,255,0.04), transparent 55%)",
            // CSS vars are updated in rAF to avoid heavy React re-render on scroll.
            ["--accent-r" as string]: "59",
            ["--accent-g" as string]: "130",
            ["--accent-b" as string]: "246",
          }}
        >
          <div className="pr-2 md:pr-3">
            <div className="flex w-full flex-col max-md:ps-16">
            {experienceItems.map((item) => (
              <article key={item.id} className="grid grid-cols-1 gap-6 border-b border-white/6 py-12 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[2fr_1fr_5fr]">
                <div className="w-full lg:max-w-sm">
                  <div className="flex flex-col items-start gap-y-3">
                    <time className="font-medium text-muted-foreground text-xs tracking-wide uppercase" dateTime={item.period}>
                      {item.period}
                    </time>
                    <div className="flex items-center gap-2">
                      <h3 className="font-instrument-serif text-2xl font-bold tracking-wide text-neutral-900 md:text-3xl dark:text-neutral-100">{item.company}</h3>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      {item.location ? (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPinIcon />
                          <span>{item.location}</span>
                        </div>
                      ) : null}
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <BriefcaseIcon />
                        <span className="font-medium">{item.workMode}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block" />

                <div className="relative w-full">
                  <div className="flex flex-col gap-y-6 text-base leading-relaxed lg:text-lg">
                    <header>
                      <h4 className="font-instrument-serif text-2xl font-bold tracking-wide text-neutral-900 md:text-3xl dark:text-neutral-100">{item.role}</h4>
                    </header>

                    <section aria-label="Key achievements">
                      <ul className="ml-5 flex list-disc flex-col gap-y-4 text-neutral-700 marker:text-neutral-500 dark:text-neutral-300/90 dark:marker:text-neutral-500/80">
                        {item.achievements.map((achievement) => (
                          <li key={achievement} className="leading-relaxed">
                            <AchievementText text={achievement} />
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section aria-label="Technologies used">
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md border px-3 py-1 font-mono text-xs whitespace-nowrap text-neutral-600 shadow-border md:text-sm dark:text-neutral-300"
                            style={{
                              borderColor: "rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.35)",
                              backgroundColor: "rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.08)",
                              boxShadow: "0 0 0 1px rgba(var(--accent-r), var(--accent-g), var(--accent-b), 0.05) inset",
                            }}
                          >
                            {TECH_ICON_MAP[technology] ? <i className={`${TECH_ICON_MAP[technology]} text-[14px]`} aria-hidden /> : <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-400" aria-hidden />}
                            {technology}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </article>
            ))}
            </div>
          </div>

          <div className="pointer-events-none absolute top-5 bottom-5 hidden w-8 overflow-hidden px-6 md:left-[calc(30%_-_1rem)] md:block">
            <div className="relative h-full w-full">
              <div className="absolute top-0 bottom-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-neutral-200 shadow-[inset_0_2px_1.5px_rgba(165,174,184,0.62)] dark:bg-neutral-800" />
              <div
                ref={fillRef}
                className="absolute top-0 bottom-0 left-1/2 w-1.5 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-blue-500 via-fuchsia-500 to-pink-500"
                style={{ transform: "translateX(-50%) scaleY(0)", willChange: "transform" }}
              />

              <div
                ref={iconRef}
                className="absolute left-1/2 z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/15 bg-black/30 p-0.5 shadow-[0_0_24px_rgba(59,130,246,0.4)]"
                style={{ top: "2%", willChange: "top" }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image alt="Profile" className="object-cover" fill sizes="40px" src="/images/trinhhao.webp" />
                </div>
              </div>
            </div>
          </div>

          <div ref={progressTextRef} className="pointer-events-none absolute right-5 bottom-4 text-xs tracking-wide text-neutral-500" style={{ color: "rgb(var(--accent-r), var(--accent-g), var(--accent-b))" }}>
            0% explored
          </div>
        </div>
      </div>
    </section>
  );
}