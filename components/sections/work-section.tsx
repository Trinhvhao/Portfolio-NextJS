"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";

import { TypedRouteText } from "@/components/ui/typed-route-text";
import { workItems } from "@/lib/work-data";

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

function ViewDetailsSpinner({ curveId }: { curveId: string }) {
  return (
    <div className="relative rounded-full">
      <div
        className="relative size-[90px] rounded-full border border-white/22 backdrop-blur-[2px]"
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

export function WorkSection() {
  const [activeId, setActiveId] = useState(workItems[0]?.id ?? "");
  const [hoveredOverlayId, setHoveredOverlayId] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const activeIdRef = useRef(activeId);
  const frameRef = useRef<number | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const pendingPointerRef = useRef<{ element: HTMLElement; clientX: number; clientY: number } | null>(null);
  const hoveredCardRef = useRef<HTMLElement | null>(null);
  const lastPointerRef = useRef<{ clientX: number; clientY: number } | null>(null);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const scheduleActiveIdUpdate = (nextId: string) => {
      if (!nextId || activeIdRef.current === nextId) {
        return;
      }

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        activeIdRef.current = nextId;
        setActiveId(nextId);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const maxVisibleEntry = entries.reduce<IntersectionObserverEntry | null>((bestEntry, entry) => {
          if (!entry.isIntersecting) {
            return bestEntry;
          }

          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            return entry;
          }

          return bestEntry;
        }, null);

        if (maxVisibleEntry) {
          const nextId = (maxVisibleEntry.target as HTMLElement).dataset.workId;
          if (nextId) {
            scheduleActiveIdUpdate(nextId);
          }
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -42% 0px",
        threshold: [0.32, 0.5, 0.7],
      }
    );

    Object.values(itemRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const activeItem = workItems.find((item) => item.id === activeId) ?? workItems[0];

  const setCardCursorPosition = (element: HTMLElement, clientX: number, clientY: number) => {
    const rect = element.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

    element.style.setProperty("--cursor-x", `${x}px`);
    element.style.setProperty("--cursor-y", `${y}px`);
  };

  const scheduleCardCursorPosition = (element: HTMLElement, clientX: number, clientY: number) => {
    pendingPointerRef.current = { element, clientX, clientY };

    if (pointerFrameRef.current) {
      return;
    }

    pointerFrameRef.current = requestAnimationFrame(() => {
      const pending = pendingPointerRef.current;
      pointerFrameRef.current = null;

      if (!pending) {
        return;
      }

      setCardCursorPosition(pending.element, pending.clientX, pending.clientY);
    });
  };

  const resetCardCursorPosition = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--cursor-x", `${Math.round(rect.width / 2)}px`);
    element.style.setProperty("--cursor-y", `${Math.round(rect.height / 2)}px`);
  };

  const primeCardCursorPosition = (element: HTMLElement, clientX: number, clientY: number) => {
    hoveredCardRef.current = element;
    lastPointerRef.current = { clientX, clientY };
    setCardCursorPosition(element, clientX, clientY);
  };

  const clearCardCursorPosition = (element: HTMLElement) => {
    hoveredCardRef.current = null;
    lastPointerRef.current = null;
    // Preserve last tracked position so the overlay does not jump before unmount.
  };

  useEffect(() => {
    const resyncOnViewportChange = () => {
      const hoveredCard = hoveredCardRef.current;
      const lastPointer = lastPointerRef.current;

      if (!hoveredCard || !lastPointer) {
        return;
      }

      scheduleCardCursorPosition(hoveredCard, lastPointer.clientX, lastPointer.clientY);
    };

    window.addEventListener("scroll", resyncOnViewportChange, { passive: true, capture: true });
    window.addEventListener("resize", resyncOnViewportChange, { passive: true });

    return () => {
      window.removeEventListener("scroll", resyncOnViewportChange, { capture: true });
      window.removeEventListener("resize", resyncOnViewportChange);

      if (pointerFrameRef.current) {
        cancelAnimationFrame(pointerFrameRef.current);
      }
    };
  }, []);

  return (
    <section id="work" className="container relative mx-auto w-full py-pagebuilder">
      <h2
        className="relative z-2 mb-20 text-center text-5xl font-medium tracking-tight sm:text-5xl md:mb-24 md:text-6xl"
        style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" }}
      >
        <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">CASE STUDIES</p>
        <span className="font-instrument-serif">
          <span>Curated </span>
          <TypedRouteText text="work" triggerOnView className="animate-gradient-x text-reveal-left pe-2 font-instrument-serif italic tracking-tight text-colorfull" />
        </span>
      </h2>

      <div className="flex flex-col gap-20 pb-20 lg:hidden">
        {workItems.map((item, index) => (
            <article key={item.id} className="group flex flex-col gap-6">
            {(() => {
              const overlayId = `mobile-${item.id}`;
              return (
                <>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase dark:text-neutral-600">{item.index}</span>
                  <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800" />
                  <span className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase dark:text-neutral-600">{item.type}</span>
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
              href={item.href}
              aria-label={`View details of ${item.title}`}
              className="group relative block aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#f2f2f20c] p-1 shadow-border transition-transform duration-300 ease-in-out hover:-translate-y-2 lg:rounded-3xl lg:p-2"
              style={{ "--cursor-x": "0px", "--cursor-y": "0px" } as CSSProperties}
              onMouseEnter={(event) => {
                primeCardCursorPosition(event.currentTarget, event.clientX, event.clientY);
                setHoveredOverlayId(overlayId);
              }}
              onMouseMove={(event) => {
                lastPointerRef.current = { clientX: event.clientX, clientY: event.clientY };
                scheduleCardCursorPosition(event.currentTarget, event.clientX, event.clientY);
              }}
              onMouseLeave={(event) => {
                setHoveredOverlayId((current) => (current === overlayId ? null : current));
                clearCardCursorPosition(event.currentTarget);
              }}
            >
              <div className="relative flex size-full flex-col justify-between overflow-hidden rounded-xl bg-black/70 ring-1 ring-white/12 lg:rounded-2xl">
                <div aria-hidden="true" className="absolute inset-0 z-1 transition-transform duration-500 ease-in-out group-hover:scale-105" style={{ background: item.gradient }} />
                <div className="relative z-10 flex items-start justify-between gap-8 px-4 py-4 text-white/80 lg:px-5 lg:py-5">
                  <p className="text-sm transition-transform duration-500 ease-out group-hover:-translate-y-0.5 md:text-base">{item.description}</p>
                  <span className="hidden shrink-0 text-lg transition-transform duration-500 ease-out group-hover:translate-x-1 sm:block">→</span>
                </div>
                <div className="relative z-10 px-4 pb-4 lg:px-5 lg:pb-5">
                  {item.image ? (
                    <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-2xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      {item.secondaryImage && item.secondaryImage !== item.image ? (
                        <Image
                          src={item.secondaryImage}
                          alt={`${item.title} preview`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="pointer-events-none object-cover opacity-0 transition-[transform,opacity] duration-700 ease-out translate-x-6 translate-y-10 scale-75 rotate-6 group-hover:translate-x-3 group-hover:translate-y-0 group-hover:scale-[0.92] group-hover:rotate-2 group-hover:opacity-100"
                        />
                      ) : null}
                    </div>
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center rounded-xl border border-white/25 bg-black/20 font-mono text-xs tracking-widest text-white/80 uppercase">
                      Finote App
                    </div>
                  )}
                </div>
              </div>

              {hoveredOverlayId === overlayId ? (
                <div className="pointer-events-none absolute left-0 top-0 z-20 [transform:translate3d(var(--cursor-x),var(--cursor-y),0)_translate3d(-50%,-50%,0)] will-change-transform">
                  <ViewDetailsSpinner curveId={`work-mobile-curve-${item.id}`} />
                </div>
              ) : null}
            </Link>

            <ul className="mt-1 flex flex-col gap-y-2 text-sm text-primary/90">
              {(item.highlights ?? []).map((point) => (
                <li key={`${item.id}-${point}`} className="flex items-start">
                  <svg className="me-1.5 mt-[2px] size-5 shrink-0" style={{ fill: item.accentColor, color: item.accentColor }} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {(item.tags ?? []).map((tag) => (
                <TechBadge key={`${item.id}-${tag}`} keyId={`${item.id}-${tag}`} tag={tag} />
              ))}
            </div>
                </>
              );
            })()}
          </article>
        ))}
      </div>

      <div aria-label="Projects List" className="relative hidden w-full lg:flex" role="main">
        <div className="mx-auto flex w-full flex-col gap-y-20 lg:max-w-[60%] lg:gap-y-32">
          {workItems.map((item, index) => (
            <article
              key={`desktop-${item.id}`}
              aria-label={`Project ${item.title}`}
              data-work-id={item.id}
              ref={(node) => {
                itemRefs.current[item.id] = node;
              }}
              onMouseEnter={() => setActiveId(item.id)}
              className={`group relative flex w-full flex-col gap-6 will-change-transform transition-[transform,opacity] duration-500 ease-out ${
                activeId === item.id ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.97] opacity-60"
              }`}
              role="article"
            >
              {(() => {
                const overlayId = `desktop-${item.id}`;
                return (
                  <>
              <div className="relative w-full transition-transform duration-500 group-hover:-translate-y-2">
                <Link
                  href={item.href}
                  aria-label={`View details of ${item.title}`}
                  className="group relative block aspect-[16/11] w-full overflow-hidden rounded-3xl bg-[#f2f2f20c] p-2 shadow-border transition-[transform,box-shadow] duration-500 hover:shadow-[0_24px_70px_rgba(0,0,0,0.4)]"
                  style={{ "--cursor-x": "0px", "--cursor-y": "0px" } as CSSProperties}
                  onMouseEnter={(event) => {
                    primeCardCursorPosition(event.currentTarget, event.clientX, event.clientY);
                    setHoveredOverlayId(overlayId);
                  }}
                  onMouseMove={(event) => {
                    lastPointerRef.current = { clientX: event.clientX, clientY: event.clientY };
                    scheduleCardCursorPosition(event.currentTarget, event.clientX, event.clientY);
                  }}
                  onMouseLeave={(event) => {
                    setHoveredOverlayId((current) => (current === overlayId ? null : current));
                    clearCardCursorPosition(event.currentTarget);
                  }}
                >
                  <div className="relative flex size-full flex-col overflow-hidden rounded-2xl bg-black/70 ring-1 ring-white/12">
                    <div aria-hidden="true" className="absolute inset-0 z-1 transition-transform duration-500 ease-in-out group-hover:scale-105" style={{ background: item.gradient }} />
                    <div className="relative z-10 flex items-start justify-between gap-8 px-8 pt-8 pb-6 lg:px-10 lg:pt-10 lg:pb-8 text-white/90">
                      <p className="text-2xl font-medium leading-snug transition-transform duration-500 ease-out group-hover:-translate-y-1">{item.description}</p>
                      <span className="shrink-0 pt-1 text-2xl transition-transform duration-500 ease-out group-hover:translate-x-1.5">→</span>
                    </div>
                    <div className="relative z-10 mt-auto flex-1 w-full px-8 min-h-0 lg:px-10">
                      {item.image ? (
                        <div className="relative size-full overflow-hidden rounded-t-xl rounded-b-none shadow-2xl">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            priority={index === 0}
                            sizes="60vw"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                          {item.secondaryImage && item.secondaryImage !== item.image ? (
                            <Image
                              src={item.secondaryImage}
                              alt={`${item.title} secondary preview`}
                              fill
                              sizes="60vw"
                              className="pointer-events-none object-cover object-top opacity-0 transition-[transform,opacity] duration-700 ease-out translate-x-8 translate-y-10 scale-75 rotate-6 group-hover:translate-x-4 group-hover:translate-y-0 group-hover:scale-[0.94] group-hover:rotate-3 group-hover:opacity-100"
                            />
                          ) : null}
                        </div>
                      ) : (
                        <div className="flex size-full w-full items-center justify-center rounded-xl border border-white/25 bg-black/20 font-mono text-xs tracking-widest text-white/80 uppercase">
                          Finote App
                        </div>
                      )}
                    </div>
                  </div>

                  {hoveredOverlayId === overlayId ? (
                    <div className="pointer-events-none absolute left-0 top-0 z-20 [transform:translate3d(var(--cursor-x),var(--cursor-y),0)_translate3d(-50%,-50%,0)] will-change-transform">
                      <ViewDetailsSpinner curveId={`work-desktop-curve-${item.id}`} />
                    </div>
                  ) : null}
                </Link>
              </div>
                  </>
                );
              })()}
            </article>
          ))}
        </div>

        <div className="hidden py-4 lg:sticky lg:block lg:w-[40%] lg:pl-12">
          <div className="sticky top-32">
            <div className="animate-work-panel-in flex">
              <div aria-hidden="true" className="my-4 me-4 h-[2px] min-w-6" style={{ backgroundColor: activeItem.accentColor }} />
              <div key={activeItem.id} className="animate-work-panel-in motion-reduce:animate-none">
                <h3 className="font-instrument-serif text-3xl font-bold text-foreground">{activeItem.title}</h3>
                <p className="my-2 text-sm font-light text-primary/90 xl:text-base">{activeItem.detailDescription}</p>
                <ul className="mt-4 flex flex-col gap-y-2 text-sm text-primary/90 xl:text-base">
                  {(activeItem.highlights ?? []).map((point) => (
                    <li key={`${activeItem.id}-desktop-${point}`} className="flex items-start">
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
        className="group mx-auto flex w-fit items-center justify-center gap-2 font-mono text-neutral-800 transition-colors hover:text-black dark:text-white-1"
      >
        See more projects
        <span className="inline-flex h-[25px] w-[25px] items-center justify-center overflow-hidden rounded-full border border-neutral-300 bg-white-1/50 transition-colors duration-300 group-hover:bg-neutral-200 dark:border-white/10 dark:bg-white/5 dark:group-hover:bg-white/10">
          <span className="text-sm">→</span>
        </span>
      </Link>
    </section>
  );
}
