"use client";

import Image from "next/image";
import type { CSSProperties, JSX } from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

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
  "Drizzle ORM": "",
  n8n: "",
  Turborepo: "devicon-turbo-original",
  Zustand: "devicon-react-original colored",
  Expo: "devicon-expo-original",
  GROQ: "",
  PostHog: "",
  pnpm: "devicon-pnpm-plain",
  Bun: "devicon-bun-plain",
  "Biome.js": "devicon-biome-plain",
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
  FastAPI: "",
  Ghostty: "devicon-plain",
};

const CUSTOM_SVG_ICONS: Record<string, JSX.Element> = {
  "Drizzle ORM": (
    <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
      <rect x="24" y="48" width="12" height="52" rx="4" fill="#C5F74F" transform="rotate(-30 24 48)" />
      <rect x="56" y="24" width="12" height="52" rx="4" fill="#C5F74F" transform="rotate(-30 56 24)" />
      <rect x="88" y="24" width="12" height="52" rx="4" fill="#C5F74F" transform="rotate(-30 88 24)" />
    </svg>
  ),
  GROQ: (
    <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
      <circle cx="64" cy="64" r="56" stroke="#FF6B35" strokeWidth="8" fill="none" />
      <circle cx="64" cy="64" r="20" fill="#FF6B35" />
    </svg>
  ),
  PostHog: (
    <svg viewBox="0 0 128 128" fill="none" className="h-full w-full">
      <circle cx="64" cy="64" r="56" fill="#FF7123" />
      <path d="M64 20 L64 64 L96 64" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  n8n: (
    <svg viewBox="0 0 228 120" fill="none" className="h-full w-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M204 48C192.817 48 183.42 40.3514 180.756 30H153.248C147.382 30 142.376 34.241 141.412 40.0272L140.425 45.9456C139.489 51.5648 136.646 56.4554 132.626 60C136.646 63.5446 139.489 68.4352 140.425 74.0544L141.412 79.9728C142.376 85.759 147.382 90 153.248 90H156.756C159.42 79.6486 168.817 72 180 72C193.255 72 204 82.7452 204 96C204 109.255 193.255 120 180 120C168.817 120 159.42 112.351 156.756 102H153.248C141.516 102 131.504 93.5181 129.575 81.9456L128.588 76.0272C127.624 70.241 122.618 66 116.752 66H107.244C104.58 76.3514 95.183 84 84 84C72.817 84 63.4204 76.3514 60.7561 66H47.2439C44.5796 76.3514 35.183 84 24 84C10.7452 84 0 73.2548 0 60C0 46.7452 10.7452 36 24 36C35.183 36 44.5796 43.6486 47.2439 54H60.7561C63.4204 43.6486 72.817 36 84 36C95.183 36 104.58 43.6486 107.244 54H116.752C122.618 54 127.624 49.759 128.588 43.9728L129.575 38.0544C131.504 26.4819 141.516 18 153.248 18L180.756 18C183.42 7.64864 192.817 0 204 0C217.255 0 228 10.7452 228 24C228 37.2548 217.255 48 204 48ZM204 36C210.627 36 216 30.6274 216 24C216 17.3726 210.627 12 204 12C197.373 12 192 17.3726 192 24C192 30.6274 197.373 36 204 36ZM24 72C30.6274 72 36 66.6274 36 60C36 53.3726 30.6274 48 24 48C17.3726 48 12 53.3726 12 60C12 66.6274 17.3726 72 24 72ZM96 60C96 66.6274 90.6274 72 84 72C77.3726 72 72 66.6274 72 60C72 53.3726 77.3726 48 84 48C90.6274 48 96 53.3726 96 60ZM192 96C192 102.627 186.627 108 180 108C173.373 108 168 102.627 168 96C168 89.3726 173.373 84 180 84C186.627 84 192 89.3726 192 96Z" fill="#ea4b71"/>
    </svg>
  ),
  FastAPI: (
    <svg viewBox="0 0 256 256" fill="none" className="h-full w-full" preserveAspectRatio="xMidYMid">
      <path d="M128 0C57.33 0 0 57.33 0 128s57.33 128 128 128 128-57.33 128-128S198.67 0 128 0Zm-6.67 230.605v-80.288H76.699l64.128-124.922v80.288h42.966L121.33 230.605Z" fill="#009688"/>
    </svg>
  ),
  "TanStack": (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <path fill="#1C3C3C" d="M6.099 5.88H17.9C21.264 5.88 24 8.625 24 12s-2.736 6.12-6.099 6.12H6.1C2.736 18.12 0 15.375 0 12s2.736-6.12 6.099-6.12Zm5.419 9.487c.148.156.367.148.561.108h.002c.09-.073-.038-.166-.16-.254-.074-.054-.145-.105-.166-.15.068-.083-.132-.27-.289-.417a1.539 1.539 0 0 1-.15-.151c-.11-.12-.155-.273-.2-.427a1.575 1.575 0 0 0-.11-.297c-.304-.708-.653-1.41-1.143-2.01-.315-.398-.674-.755-1.033-1.112-.232-.23-.463-.46-.683-.701-.226-.234-.362-.521-.499-.81-.114-.24-.228-.482-.396-.693-.507-.75-2.107-.955-2.342.105 0 .033-.01.054-.039.075-.13.095-.245.203-.342.334-.238.332-.274.895.022 1.193l.001-.02c.01-.15.02-.29.139-.399.228.198.576.268.841.12.32.46.422 1.015.525 1.572.085.464.17.93.382 1.341l.014.022c.124.208.25.419.41.6.059.09.178.187.297.284.157.128.314.256.329.366v.146c-.001.29-.002.59.184.83.103.208-.15.418-.352.392a.989.989 0 0 1-.354-.043c-.165-.04-.329-.08-.462-.003-.038.04-.091.042-.145.043-.064.002-.129.004-.167.07a.29.29 0 0 1-.045.066c-.042.051-.087.107-.033.149l.015-.011c.082-.063.16-.123.27-.085-.014.082.039.103.092.125l.027.012a.357.357 0 0 1-.008.057c-.009.046-.017.09.018.13a.605.605 0 0 0 .046-.056c.037-.046.073-.094.139-.11.144.192.289.112.471.012.206-.114.459-.253.81-.056-.135-.007-.255.01-.345.121-.023.025-.042.054-.002.087.207-.135.294-.086.375-.04.06.032.115.063.212.024l.07-.037c.155-.084.314-.17.499-.14-.139.04-.188.127-.242.223-.026.047-.054.097-.094.143-.021.021-.03.046-.007.082.29-.024.4-.098.548-.197.07-.047.15-.1.261-.157.124-.076.248-.028.368.02.13.05.255.1.371-.013.037-.035.083-.035.129-.036.016 0 .033 0 .05-.002-.037-.194-.24-.191-.448-.189-.24.003-.483.005-.475-.295.222-.152.224-.415.226-.665 0-.06 0-.119.005-.176.163.092.336.163.508.234.162.066.323.133.474.215.157.254.404.59.732.568.008-.026.016-.048.026-.074.019.003.039.008.059.014.086.021.178.045.223-.057zm6.429-2.886a1.014 1.014 0 0 0 1.729-.715 1.01 1.01 0 0 0-1.013-1.01c-.126 0-.25.023-.364.068l-.58-.848-.405.278.583.851a1.009 1.009 0 0 0 .05 1.376zm-1.818-2.744a1.014 1.014 0 0 0 1.42-.615 1.008 1.008 0 0 0-.845-1.293 1.015 1.015 0 0 0-1.095.712 1.008 1.008 0 0 0 .52 1.196zm0 5.867a1.015 1.015 0 0 0 1.42-.615 1.008 1.008 0 0 0-.845-1.293 1.015 1.015 0 0 0-1.095.712 1.008 1.008 0 0 0 .52 1.196zm.932-3.586v-.503h-1.55a1.003 1.003 0 0 0-.218-.412l.583-.864-.424-.28-.583.863a1.014 1.014 0 0 0-.333-.06c-.268 0-.525.106-.714.294a1.002 1.002 0 0 0 1.047 1.655l.583.864.42-.281-.579-.864c.104-.119.178-.26.217-.412z"/>
    </svg>
  ),
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
    "n8n",
    "Turborepo",
    "TanStack",
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
    "FastAPI",
    "Linux",
    "Bash",
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
  const customSvg = CUSTOM_SVG_ICONS[name];
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
      {customSvg ? (
        <span className={`relative z-10 inline-flex ${iconWrapSize} items-center justify-center`}>
          {customSvg}
        </span>
      ) : iconClass && iconClass !== "devicon-plain" ? (
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
  const t = useTranslations("skills");
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
          <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{t("eyebrow")}</p>
          <span className="font-instrument-serif">
            <span>{t("title")} </span>
            <TypedRouteText text={t("titleAccent")} triggerOnView className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull" />
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