"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { TypedRouteText } from "@/components/ui/typed-route-text";

type ScatterTransform = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

const SCATTER_PRECISION = 4;

const TECH_ICON_MAP: Record<string, string> = {
  React: "devicon-react-original colored",
  "Next.js": "devicon-nextjs-plain",
  TypeScript: "devicon-typescript-plain colored",
  "Tailwind CSS": "devicon-tailwindcss-original colored",
  CSS: "devicon-css3-plain colored",
  "Motion.dev": "devicon-framermotion-original",
  "Sanity CMS": "devicon-sanity-plain colored",
  Figma: "devicon-figma-plain colored",
  Notion: "devicon-notion-plain",
  Markdown: "devicon-markdown-original",
  "Node.js": "devicon-nodejs-plain colored",
  "Express.js": "devicon-express-original",
  Redis: "devicon-redis-plain colored",
  PostgreSQL: "devicon-postgresql-plain colored",
  MongoDB: "devicon-mongodb-plain colored",
  "Prisma ORM": "devicon-prisma-original",
  "Drizzle ORM": "devicon-plain",
  "Better Auth": "devicon-plain",
  Turborepo: "devicon-turbo-original",
  "TanStack Query": "devicon-react-original colored",
  Zustand: "devicon-react-original colored",
  Expo: "devicon-expo-original",
  GROQ: "devicon-plain",
  PostHog: "devicon-plain",
  pnpm: "devicon-pnpm-plain",
  Bun: "devicon-bun-plain",
  "Biome.js": "devicon-plain",
  Git: "devicon-git-plain colored",
  GitHub: "devicon-github-original",
  "GitHub Actions": "devicon-githubactions-plain colored",
  Vercel: "devicon-vercel-original",
  Docker: "devicon-docker-plain colored",
  AWS: "devicon-amazonwebservices-plain-wordmark",
  Cloudflare: "devicon-cloudflare-plain colored",
  Python: "devicon-python-plain colored",
  Linux: "devicon-linux-plain",
  Bash: "devicon-bash-plain",
  Ghostty: "devicon-plain",
};

const skillRows: string[][] = [
  [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "CSS",
    "Motion.dev",
    "Sanity CMS",
    "Figma",
    "Notion",
    "Markdown",
    "Node.js",
    "Express.js",
    "Redis",
  ],
  [
    "PostgreSQL",
    "MongoDB",
    "Prisma ORM",
    "Drizzle ORM",
    "Better Auth",
    "Turborepo",
    "TanStack Query",
    "Zustand",
    "Expo",
    "GROQ",
    "PostHog",
    "pnpm",
    "Bun",
  ],
  [
    "Biome.js",
    "Git",
    "GitHub",
    "GitHub Actions",
    "Vercel",
    "Docker",
    "AWS",
    "Cloudflare",
    "Python",
    "Linux",
    "Bash",
    "Ghostty",
  ],
];

function fallbackLabel(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function hashLabel(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function seededUnit(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function roundScatter(value: number): number {
  return Number(value.toFixed(SCATTER_PRECISION));
}

function createScatterTransform(name: string, rowIndex: number, index: number, rowLength: number, compact = false): ScatterTransform {
  const baseSeed = hashLabel(`${name}-${rowIndex}-${compact ? "m" : "d"}`);
  const center = (rowLength - 1) / 2;
  const slotFromCenter = index - center;

  const gapX = compact ? 54 : 78;
  const rowBand = compact ? 36 : 74;
  const wave = compact ? 6 : 12;
  const jitterX = compact ? 3 : 5;
  const jitterY = compact ? 3 : 5;

  // Keep a clear spacing baseline, then add only small jitter for organic feel.
  const baseX = slotFromCenter * gapX;
  const baseY = (rowIndex - 1) * rowBand + Math.sin((index + 1) * 0.95 + rowIndex) * wave;

  const x = roundScatter(baseX + (seededUnit(baseSeed + 1) * 2 - 1) * jitterX);
  const y = roundScatter(baseY + (seededUnit(baseSeed + 2) * 2 - 1) * jitterY);
  const rotate = roundScatter((seededUnit(baseSeed + 3) * 2 - 1) * (compact ? 8 : 12));
  const scale = roundScatter(0.94 + seededUnit(baseSeed + 4) * 0.1);

  return { x, y, rotate, scale };
}

function SkillBadge({ name, isAligned, scatter, style, compact }: { name: string; isAligned: boolean; scatter: ScatterTransform; style?: CSSProperties; compact?: boolean }) {
  const iconClass = TECH_ICON_MAP[name];
  const shellSize = compact ? "size-12" : "h-14 w-14";
  const iconWrapSize = compact ? "h-8 w-8" : "h-10 w-10";
  const iconSize = compact ? "text-[1.9rem]" : "text-[2.35rem]";

  return (
    <span
      title={name}
      style={{
        ...style,
        transform: isAligned
          ? "translate3d(0px, 0px, 0px) rotate(0deg) scale(1)"
          : `translate3d(${scatter.x}px, ${scatter.y}px, 0px) rotate(${scatter.rotate}deg) scale(${scatter.scale})`,
        opacity: isAligned ? "1" : "0.82",
        filter: isAligned ? "blur(0px)" : "blur(0.45px)",
      }}
      className={`group relative flex ${shellSize} items-center justify-center rounded-xl border border-black/5 bg-white-2 p-0 shadow-border transition-[transform,opacity,filter] duration-[600ms] ease-[cubic-bezier(0.18,0.88,0.2,1)] dark:border-white/10 dark:bg-white/10`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-1 rounded-lg bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.65),rgba(99,102,241,.24)_45%,rgba(0,0,0,0)_72%)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
      />
      {iconClass && iconClass !== "devicon-plain" ? (
        <span className={`relative z-10 inline-flex ${iconWrapSize} items-center justify-center`}>
          <i
            aria-label={name.toLowerCase().replace(/\s+/g, "-")}
            className={`${iconClass} ${iconSize} block leading-none will-change-transform transition-transform duration-500 group-hover:scale-105`}
          />
        </span>
      ) : (
        <span className={`relative z-10 inline-flex ${iconWrapSize} items-center justify-center rounded-sm bg-black/8 font-mono text-xs tracking-wide text-neutral-700 dark:bg-white/12 dark:text-neutral-200`}>
          {fallbackLabel(name)}
        </span>
      )}
    </span>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isAligned, setIsAligned] = useState(false);
  const alignTimerRef = useRef<number | null>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const clearAlignTimer = () => {
      if (alignTimerRef.current !== null) {
        window.clearTimeout(alignTimerRef.current);
        alignTimerRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const shouldEnter = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.22);

        if (shouldEnter && !inViewRef.current) {
          inViewRef.current = true;
          setIsAligned(false);
          clearAlignTimer();
          alignTimerRef.current = window.setTimeout(() => {
            setIsAligned(true);
            alignTimerRef.current = null;
          }, 250);
          return;
        }

        if (!shouldEnter && inViewRef.current) {
          inViewRef.current = false;
          clearAlignTimer();
          setIsAligned(false);
        }
      },
      { root: null, threshold: [0, 0.12, 0.22, 0.35], rootMargin: "-6% 0px -10% 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearAlignTimer();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative mx-auto flex h-full w-full flex-col overflow-hidden py-pagebuilder" id="skills">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.22)_0%,rgba(79,70,229,0.12)_44%,rgba(0,0,0,0)_78%)] blur-3xl" />

      <div>
        <div className="container relative mx-auto">
          <div className="h-[260px] [mask-image:linear-gradient(to_top,transparent,black_50%,black_90%,transparent)]">
            <div className="relative mx-auto w-[400px] will-change-scroll md:w-[380px]">
              <Image
                src="/images/steel-flower.webp"
                alt="skills cover rotating"
                width={400}
                height={400}
                draggable={false}
                className="z-10 w-full select-none rounded-full opacity-85 animate-spin-slow"
              />
            </div>
          </div>
        </div>

        <h2
          className="relative container z-30 mb-0 size-full -translate-y-10 text-balance px-5 text-center text-5xl font-medium tracking-tight sm:text-5xl md:mb-0 md:px-0 md:text-6xl"
          style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" }}
        >
          <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">My Skills</p>
          <span className="font-instrument-serif">
            <span>The Secret </span>
            <TypedRouteText text="Sauce" triggerOnView className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull" />
          </span>
        </h2>

        <div className="container relative flex flex-col items-center justify-center gap-4">
          <div className="hidden w-full max-w-5xl text-center font-geist lg:block" style={{ perspective: "500px" }}>
            {skillRows.map((row, rowIndex) => (
              <div key={`desktop-row-${rowIndex}`} className="mb-3 flex flex-wrap justify-center gap-3">
                {row.map((name, index) => (
                  (() => {
                    const badgeIndex = rowIndex * 16 + index;
                    const delayMs = 30 + badgeIndex * 10;
                    const scatter = createScatterTransform(name, rowIndex, index, row.length);
                    return (
                  <SkillBadge
                    key={`${rowIndex}-${name}`}
                    name={name}
                    isAligned={isAligned}
                    scatter={scatter}
                    style={{ transitionDelay: `${delayMs}ms` }}
                  />
                    );
                  })()
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container relative flex flex-col items-center justify-center gap-4">
        <div className="w-full max-w-5xl text-center font-geist lg:hidden">
          {skillRows.map((row, rowIndex) => (
            <div key={`mobile-row-${rowIndex}`} className="mb-2 flex flex-wrap justify-center gap-2">
              {row.map((name, index) => (
                (() => {
                  const badgeIndex = rowIndex * 16 + index;
                  const delayMs = 25 + badgeIndex * 8;
                  const scatter = createScatterTransform(name, rowIndex, index, row.length, true);
                  return (
                    <SkillBadge
                      key={`${rowIndex}-${name}`}
                      name={name}
                      compact
                      isAligned={isAligned}
                      scatter={scatter}
                      style={{ transitionDelay: `${delayMs}ms` }}
                    />
                  );
                })()
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}