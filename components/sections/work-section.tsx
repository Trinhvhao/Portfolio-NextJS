"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

import { TypedRouteText } from "@/components/ui/typed-route-text";
import { workItems } from "@/lib/work-data";
import { useLocale } from "next-intl";

interface TranslatedItem {
  type: string;
  description: string;
  detailDescription: string;
  highlights: string[];
}

function useProjectTranslations(): Record<string, TranslatedItem> | null {
  const locale = useLocale();
  const t = useTranslations("projects");

  if (locale !== "vi") return null;

  return {
    "next-venture": {
      type: t("nextVenture.type"),
      description: t("nextVenture.description"),
      detailDescription: t("nextVenture.detailDescription"),
      highlights: [
        t("nextVenture.highlights.0"),
        t("nextVenture.highlights.1"),
        t("nextVenture.highlights.2"),
      ],
    },
    "finote": {
      type: t("finote.type"),
      description: t("finote.description"),
      detailDescription: t("finote.detailDescription"),
      highlights: [
        t("finote.highlights.0"),
        t("finote.highlights.1"),
        t("finote.highlights.2"),
      ],
    },
    "zenith-minds": {
      type: t("zenithMinds.type"),
      description: t("zenithMinds.description"),
      detailDescription: t("zenithMinds.detailDescription"),
      highlights: [
        t("zenithMinds.highlights.0"),
        t("zenithMinds.highlights.1"),
        t("zenithMinds.highlights.2"),
      ],
    },
    "snippix": {
      type: t("snippix.type"),
      description: t("snippix.description"),
      detailDescription: t("snippix.detailDescription"),
      highlights: [
        t("snippix.highlights.0"),
        t("snippix.highlights.1"),
        t("snippix.highlights.2"),
      ],
    },
    "star-forge": {
      type: t("starForge.type"),
      description: t("starForge.description"),
      detailDescription: t("starForge.detailDescription"),
      highlights: [
        t("starForge.highlights.0"),
        t("starForge.highlights.1"),
        t("starForge.highlights.2"),
      ],
    },
    "cloudpulse": {
      type: t("cloudPulse.type"),
      description: t("cloudPulse.description"),
      detailDescription: t("cloudPulse.detailDescription"),
      highlights: [
        t("cloudPulse.highlights.0"),
        t("cloudPulse.highlights.1"),
        t("cloudPulse.highlights.2"),
      ],
    },
    "artflow": {
      type: t("artFlow.type"),
      description: t("artFlow.description"),
      detailDescription: t("artFlow.detailDescription"),
      highlights: [
        t("artFlow.highlights.0"),
        t("artFlow.highlights.1"),
        t("artFlow.highlights.2"),
      ],
    },
    "taskbeat": {
      type: t("taskBeat.type"),
      description: t("taskBeat.description"),
      detailDescription: t("taskBeat.detailDescription"),
      highlights: [
        t("taskBeat.highlights.0"),
        t("taskBeat.highlights.1"),
        t("taskBeat.highlights.2"),
      ],
    },
    "nexacart": {
      type: t("nexaCart.type"),
      description: t("nexaCart.description"),
      detailDescription: t("nexaCart.detailDescription"),
      highlights: [
        t("nexaCart.highlights.0"),
        t("nexaCart.highlights.1"),
        t("nexaCart.highlights.2"),
      ],
    },
    "healthsync": {
      type: t("healthSync.type"),
      description: t("healthSync.description"),
      detailDescription: t("healthSync.detailDescription"),
      highlights: [
        t("healthSync.highlights.0"),
        t("healthSync.highlights.1"),
        t("healthSync.highlights.2"),
      ],
    },
  };
}

const TECH_ICON_MAP: Record<string, string> = {
  "Next.js": "devicon-nextjs-original",
  React: "devicon-react-original colored",
  "Sanity CMS": "devicon-sanity-plain colored",
  TypeScript: "devicon-typescript-plain colored",
  Sentry: "devicon-sentry-original colored",
  Markdown: "devicon-markdown-original",
  "Tailwind CSS": "devicon-tailwindcss-original colored",
  "Motion.dev": "devicon-framermotion-original",
  Expo: "devicon-expo-original",
  Firebase: "devicon-firebase-plain colored",
  Cloudinary: "devicon-cloudinary-plain colored",
  "Node.js": "devicon-nodejs-plain colored",
  "Express.js": "devicon-express-original",
  Turborepo: "devicon-turborepo-plain",
  MongoDB: "devicon-mongodb-plain colored",
  "Shadcn UI": "devicon-tailwindcss-original colored",
  "Highlight.js": "devicon-highlightjs-plain colored",
};

function TechBadge({ tag, keyId }: { tag: string; keyId: string }) {
  const iconClass = TECH_ICON_MAP[tag];

  return (
    <span
      key={keyId}
      className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.14] bg-white-1 px-2.5 py-1 font-mono text-[11px] tracking-wide text-neutral-600 uppercase transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.1)] dark:bg-neutral-900 dark:text-neutral-300"
    >
      {iconClass ? (
        <i className={`${iconClass} text-[13px]`} aria-hidden="true" />
      ) : (
        <span className="inline-block size-1.5 rounded-full bg-pink-500" aria-hidden="true" />
      )}
      {tag}
    </span>
  );
}

interface ViewDetailsSpinnerProps {
  curveId: string;
}

function ViewDetailsSpinner({ curveId }: ViewDetailsSpinnerProps) {
  return (
    <div
      className="vd-spinner relative rounded-full"
      style={{ width: 90, height: 90 }}
    >
      <div
        className="relative size-full rounded-full border border-white/22 backdrop-blur-[2px]"
        style={{
          background:
            "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.2) 0%, rgba(168,168,168,0.2) 34%, rgba(46,46,46,0.74) 74%, rgba(20,20,20,0.86) 100%)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.42), inset 0 0 12px rgba(255, 255, 255, 0.12)",
        }}
      >
        <div className="pointer-events-none absolute inset-[3px] rounded-full border border-white/10" />
        <div className="absolute top-1/2 left-1/2 size-[72px] -translate-x-1/2 -translate-y-1/2 rounded-full">
          <svg
            className="size-full animate-[spin_8s_linear_infinite] [transform-origin:center_center]"
            fill="transparent"
            overflow="visible"
            style={{ position: "absolute", inset: 0, transformOrigin: "center center" }}
            viewBox="0 0 100 100"
          >
            <path
              d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
              fill="transparent"
              id={curveId}
              strokeWidth="none"
            />
            <text>
              <textPath
                dominantBaseline="hanging"
                href={`#${curveId}`}
                startOffset="0"
                style={{
                  fontSize: "10.2px",
                  fontWeight: 600,
                  wordSpacing: "3px",
                  letterSpacing: "1.05px",
                  fill: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                VIEW DETAILS • VIEW DETAILS • VIEW DETAILS •
              </textPath>
            </text>
          </svg>
        </div>

        <div className="absolute top-1/2 left-1/2 flex size-[32px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/12 shadow-[inset_0_0_8px_rgba(255,255,255,0.09)] backdrop-blur-[1px]">
          <svg className="size-[16px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M2 12C3.8 8.2 7.5 6 12 6C16.5 6 20.2 8.2 22 12C20.2 15.8 16.5 18 12 18C7.5 18 3.8 15.8 2 12Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="2.5" fill="white" />
          </svg>
        </div>
      </div>
      <span className="sr-only">VIEW DETAILS · VIEW DETAILS ·</span>
    </div>
  );
}

interface ProjectCardProps {
  item: (typeof workItems)[0];
  prefix: string;
  translations?: TranslatedItem | null;
}

function ProjectCard({ item, prefix, translations }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFrameRef = useRef<number | null>(null);
  const spinnerMountedRef = useRef(false);
  const [spinnerMounted, setSpinnerMounted] = useState(false);

  const displayType = translations?.type ?? item.type;
  const displayDescription = translations?.description ?? item.description;

  const updateCursor = useCallback((x: number, y: number) => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }, []);

  const setCursorVisible = useCallback((visible: boolean) => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (visible) {
      if (!spinnerMountedRef.current) {
        spinnerMountedRef.current = true;
        setSpinnerMounted(true);
      }
      cursor.dataset.visible = "true";
    } else {
      cursor.dataset.visible = "false";
    }
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    updateCursor(e.clientX - rect.left, e.clientY - rect.top);
    setCursorVisible(true);
  }, [updateCursor, setCursorVisible]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = e.currentTarget;
    if (cursorFrameRef.current !== null) return;
    cursorFrameRef.current = requestAnimationFrame(() => {
      cursorFrameRef.current = null;
      const rect = element.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      updateCursor(x, y);
    });
  }, [updateCursor]);

  const handleMouseLeave = useCallback(() => {
    if (cursorFrameRef.current !== null) {
      cancelAnimationFrame(cursorFrameRef.current);
      cursorFrameRef.current = null;
    }
    setCursorVisible(false);
  }, [setCursorVisible]);

  useEffect(() => {
    return () => {
      if (cursorFrameRef.current !== null) {
        cancelAnimationFrame(cursorFrameRef.current);
      }
    };
  }, []);

  return (
      <article className="group flex w-full flex-col gap-6">
        <div className="flex items-start justify-between gap-4 lg:hidden">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase dark:text-neutral-600">{item.index}</span>
              <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800" />
              <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase dark:text-neutral-600">{displayType}</span>
            </div>
            <Link href={item.href} className="flex items-center gap-2">
              <h3 className="font-instrument-serif text-3xl leading-tight font-bold text-neutral-900 dark:text-white">{item.title}</h3>
            </Link>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full border border-white/[0.14] bg-neutral-900 px-3 py-1 font-mono text-[10px] text-neutral-400">
            {item.period}
          </span>
        </div>

        <Link
          ref={cardRef}
          href={item.href}
          aria-label={`View details of ${item.title}`}
          className="group relative block aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#f2f2f20c] p-1 shadow-border transition-[transform,box-shadow] duration-500 ease-in-out hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(0,0,0,0.4)] lg:rounded-3xl lg:p-2"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative flex size-full min-h-0 flex-col overflow-hidden rounded-xl bg-black/70 ring-1 ring-white/12 lg:rounded-2xl">
            <div aria-hidden="true" className="absolute inset-0 z-1 transition-transform duration-500 ease-in-out group-hover:scale-105" style={{ background: item.gradient }} />
            <div className="relative z-10 flex items-start justify-between gap-8 px-4 py-4 text-white/80 lg:px-10 lg:pt-10 lg:pb-8 lg:text-white/90">
              <p className="text-sm transition-transform duration-500 ease-out group-hover:-translate-y-0.5 md:text-base lg:text-2xl lg:font-medium lg:leading-snug lg:group-hover:-translate-y-1">{displayDescription}</p>
              <span className="hidden shrink-0 text-lg transition-transform duration-500 ease-out group-hover:translate-x-1 sm:block lg:pt-1 lg:text-2xl lg:group-hover:translate-x-1.5">→</span>
            </div>
            <div className="relative z-10 mt-auto min-h-0 flex-1 px-4 pb-4 lg:px-10 lg:pb-0">
              {item.image ? (
                <div className="relative h-full w-full overflow-hidden rounded-xl shadow-2xl lg:rounded-t-xl lg:rounded-b-none">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {item.secondaryImage && item.secondaryImage !== item.image ? (
                    <Image
                      src={item.secondaryImage}
                      alt={`${item.title} preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="pointer-events-none object-cover opacity-0 transition-[transform,opacity] duration-700 ease-out translate-x-6 translate-y-10 scale-75 rotate-6 group-hover:translate-x-3 group-hover:translate-y-0 group-hover:scale-[0.92] group-hover:rotate-2 group-hover:opacity-100"
                    />
                  ) : null}
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-xl border border-white/25 bg-black/20 font-mono text-xs tracking-widest text-white/80 uppercase">
                  Finote App
                </div>
              )}
            </div>
          </div>

          <div
            ref={cursorRef}
            data-visible="false"
            className="vd-spinner pointer-events-none absolute top-0 left-0 z-20"
            style={{
              transform: "translate3d(-9999px, -9999px, 0) translate(-50%, -50%)",
            }}
          >
            {spinnerMounted ? <ViewDetailsSpinner curveId={`work-${prefix}-curve-${item.id}`} /> : null}
          </div>
        </Link>

        <ul className="mt-1 flex flex-col gap-y-2 text-sm text-primary/90 lg:hidden">
          {(item.highlights ?? []).map((point) => (
            <li key={`${item.id}-${point}`} className="flex items-start">
              <svg className="me-1.5 mt-[2px] size-5 shrink-0" style={{ fill: item.accentColor, color: item.accentColor }} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" />
              </svg>
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 lg:hidden">
          {(item.tags ?? []).map((tag) => (
            <TechBadge key={`${item.id}-${tag}`} keyId={`${item.id}-${tag}`} tag={tag} />
          ))}
        </div>
      </article>
  );
}

interface WorkSectionProps {
  limit?: number;
}

export function WorkSection({ limit }: WorkSectionProps) {
  const t = useTranslations("work");
  const projectTranslations = useProjectTranslations();
  const [activeId, setActiveId] = useState(workItems[0]?.id ?? "");
  const activeIdRef = useRef(activeId);
  const frameRef = useRef<number | null>(null);
  const scheduledFrameRef = useRef<number | null>(null);

  // Limit items for home page
  const displayItems = limit ? workItems.slice(0, limit) : workItems;

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const container = document.getElementById("work");
    if (!container) return;

    const desktopColumn = container.querySelector<HTMLElement>("[data-work-column='desktop']");
    if (!desktopColumn) return;

    const cards = Array.from(
      desktopColumn.querySelectorAll<HTMLElement>("[data-work-id]")
    );
    if (cards.length === 0) return;

    const update = () => {
      if (scheduledFrameRef.current !== null) return;
      scheduledFrameRef.current = requestAnimationFrame(() => {
        scheduledFrameRef.current = null;
        runUpdate();
      });
    };

    const runUpdate = () => {
      const viewportHeight = window.innerHeight;
      const focalY = viewportHeight * 0.4;
      let bestId: string | null = null;
      let bestDistance = Infinity;

      // Batch-read card rects in a single rAF to coalesce layout reads.
      const rects = cards.map((card) => card.getBoundingClientRect());
      for (let i = 0; i < cards.length; i++) {
        const rect = rects[i];
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - focalY);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = cards[i].dataset.workId ?? null;
        }
      }

      if (!bestId || activeIdRef.current === bestId) return;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        if (activeIdRef.current === bestId) return;
        activeIdRef.current = bestId;
        setActiveId(bestId);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (scheduledFrameRef.current !== null) {
        cancelAnimationFrame(scheduledFrameRef.current);
        scheduledFrameRef.current = null;
      }
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  const activeItem = displayItems.find((item) => item.id === activeId) ?? displayItems[0];
  const translatedActive = projectTranslations?.[activeItem.id];

  return (
    <section id="work" className="container relative mx-auto w-full py-pagebuilder">
      <h2
        className="relative z-2 mb-20 text-center text-5xl font-medium tracking-tight sm:text-5xl md:mb-24 md:text-6xl"
        style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" }}
      >
        <p className="vietnamese-text mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{t("caseStudies")}</p>
        <span className="font-instrument-serif">
          <span>{t("title")} </span>
          <TypedRouteText text="work" triggerOnView className="animate-gradient-x text-reveal-left pe-2 font-instrument-serif italic tracking-tight text-colorfull" />
        </span>
      </h2>

      <div aria-label="Projects List" className="relative flex w-full" role="region">
        <div
          data-work-column="desktop"
          suppressHydrationWarning
          className="mx-auto flex w-full flex-col gap-y-20 pb-20 lg:max-w-[60%] lg:gap-y-32"
        >
          {displayItems.map((item) => (
            <div
              key={`desktop-${item.id}`}
              data-work-id={item.id}
              suppressHydrationWarning
              onMouseEnter={() => setActiveId(item.id)}
              className={`relative flex w-full flex-col gap-6 lg:will-change-transform lg:transition-[transform,opacity] lg:duration-500 lg:ease-out ${
                activeId === item.id ? "lg:translate-y-0 lg:scale-100 lg:opacity-100" : "lg:translate-y-2 lg:scale-[0.97] lg:opacity-60"
              }`}
            >
              <ProjectCard item={item} prefix="project" translations={projectTranslations?.[item.id]} />
            </div>
          ))}
        </div>

        <div className="hidden py-4 lg:sticky lg:block lg:w-[40%] lg:pl-12">
          <div className="sticky top-32">
            <div className="animate-work-panel-in flex">
              <div aria-hidden="true" className="my-4 me-4 h-[2px] min-w-6" style={{ backgroundColor: activeItem.accentColor }} />
              <div key={activeItem.id} className="animate-work-panel-in motion-reduce:animate-none">
                <h3 className="font-instrument-serif text-3xl font-bold text-foreground">{activeItem.title}</h3>
                <p className="my-2 text-sm font-light text-primary/90 xl:text-base">{translatedActive?.detailDescription ?? activeItem.detailDescription}</p>
                <ul className="mt-4 flex flex-col gap-y-2 text-sm text-primary/90 xl:text-base">
                  {(translatedActive?.highlights ?? activeItem.highlights ?? []).map((point, idx) => (
                    <li key={`${activeItem.id}-desktop-${point}-${idx}`} className="flex items-start">
                      <svg className="me-1.5 mt-[2px] size-5 shrink-0" style={{ fill: activeItem.accentColor, color: activeItem.accentColor }} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {(activeItem.tags ?? []).map((tag) => (
                    <TechBadge key={`${activeItem.id}-desktop-tag-${tag}`} keyId={`${activeItem.id}-desktop-tag-${tag}`} tag={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/projects"
        className="vietnamese-text group mx-auto flex w-fit items-center justify-center gap-3 font-mono text-[13px] tracking-[0.02em] text-white transition-colors hover:text-white/80 sm:text-base sm:tracking-wide"
        style={{
          textShadow: "0 0 20px rgba(255,255,255,0.15)",
        }}
      >
        <span
          className="relative"
          style={{
            textShadow:
              "0 0 20px rgba(255,255,255,0.15), 1px 0 0 rgba(255,0,0,0.4), -1px 0 0 rgba(0,255,255,0.4), 0 1px 0 rgba(255,0,0,0.3), 0 -1px 0 rgba(0,255,255,0.3)",
          }}
        >
          {t("seeMore")}
        </span>
        <span className="inline-flex h-[34px] w-[34px] items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1),inset_0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:h-[38px] group-hover:w-[38px] group-hover:border-white/40 group-hover:bg-white/15 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15),inset_0_0_20px_rgba(255,255,255,0.08)] sm:h-[38px] sm:w-[38px]">
          <span className="text-sm transition-transform duration-300 group-hover:translate-x-[2px] sm:text-base">→</span>
        </span>
      </Link>
    </section>
  );
}
