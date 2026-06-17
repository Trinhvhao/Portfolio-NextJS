"use client";

import createGlobe from "cobe";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { BookCallTrigger } from "@/components/ui/book-call-modal";

const cardShell =
  "group relative flex size-full flex-col justify-between overflow-hidden rounded-xl transform-gpu [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]";

const desktopConnections = [
  { className: "absolute top-[55%] left-[28%] z-10 h-12 w-12 p-1", image: "https://randomuser.me/api/portraits/men/32.jpg", delayMs: 60 },
  { className: "absolute top-[53%] left-[63%] z-10 h-16 w-16 p-1", image: "https://randomuser.me/api/portraits/men/7.jpg", delayMs: 150 },
  { className: "absolute top-[4%] left-[32%] z-10 h-14 w-14 p-1", image: "https://randomuser.me/api/portraits/women/24.jpg", delayMs: 240 },
  { className: "absolute top-[8%] left-[78%] z-10 h-10 w-10 p-1", image: "https://randomuser.me/api/portraits/women/35.jpg", delayMs: 330 },
  { className: "absolute top-[7%] left-[11%] z-10 h-9 w-9 p-1", image: "https://randomuser.me/api/portraits/women/45.jpg", delayMs: 420 },
];

const mobileConnections = [
  { className: "absolute top-6 left-4 h-10 w-10 p-1", image: "https://randomuser.me/api/portraits/men/32.jpg", delayMs: 60 },
  { className: "absolute bottom-24 left-[4.5rem] h-9 w-9 p-1", image: "https://randomuser.me/api/portraits/men/7.jpg", delayMs: 150 },
  { className: "absolute top-4 right-16 h-14 w-14 p-1", image: "https://randomuser.me/api/portraits/women/24.jpg", delayMs: 240 },
  { className: "absolute right-4 bottom-20 h-11 w-11 p-1", image: "https://randomuser.me/api/portraits/women/35.jpg", delayMs: 330 },
];

const coreStack = [
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
];

const infraStack = [
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
];

const toolingStack = [
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
];

const techIconClasses: Record<string, string> = {
  React: "devicon-react-original",
  "Next.js": "devicon-nextjs-original",
  TypeScript: "devicon-typescript-plain",
  "Tailwind CSS": "devicon-tailwindcss-original",
  CSS: "devicon-css3-plain",
  Figma: "devicon-figma-plain",
  Notion: "devicon-notion-plain",
  Markdown: "devicon-markdown-original",
  "Node.js": "devicon-nodejs-plain",
  "Express.js": "devicon-express-original",
  Redis: "devicon-redis-plain",
  PostgreSQL: "devicon-postgresql-plain",
  MongoDB: "devicon-mongodb-plain",
  "Prisma ORM": "devicon-prisma-original",
  Turborepo: "devicon-turborepo-original",
  Expo: "devicon-expo-original",
  pnpm: "devicon-pnpm-original",
  Bun: "devicon-bun-plain",
  Git: "devicon-git-plain",
  GitHub: "devicon-github-original",
  Docker: "devicon-docker-plain",
  AWS: "devicon-amazonwebservices-plain-wordmark",
  Cloudflare: "devicon-cloudflare-plain",
  Python: "devicon-python-plain",
  Linux: "devicon-linux-plain",
  Bash: "devicon-bash-plain",
};

const techFallbackLabel: Record<string, string> = {
  "Motion.dev": "M",
  "Sanity CMS": "S",
  "Drizzle ORM": "DR",
  "Better Auth": "BA",
  "TanStack Query": "TS",
  Zustand: "ZU",
  GROQ: "GQ",
  PostHog: "PH",
  "Biome.js": "BI",
  "GitHub Actions": "GA",
  Vercel: "V",
  Ghostty: "GH",
};

function fallbackLabel(name: string): string {
  if (techFallbackLabel[name]) {
    return techFallbackLabel[name];
  }
  return name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const scoopFigures: { title: string; quote: string }[] = [
  {
    title: "Responsive UI Dev",
    quote: "Building accessible, mobile-first interfaces using React, Next.js, Tailwind CSS platforms.",
  },
  {
    title: "REST API Services",
    quote: "Creating backend services using Node.js and Express.js, connected to PostgreSQL and MongoDB.",
  },
  {
    title: "AI Integration",
    quote: "Exploring NLP and Computer Vision, building practical applications like sentiment analysis.",
  },
  {
    title: "Clean Code Practice",
    quote: "Writing maintainable, typed code with TypeScript, following clean architecture principles.",
  },
  {
    title: "Version Control & Git",
    quote: "Managing code changes and collaborative workflows through Git and GitHub platforms.",
  },
];

function MarqueeRow({
  items,
  reverse,
  durationSec,
  delaySec,
}: {
  items: string[];
  reverse?: boolean;
  durationSec?: number;
  delaySec?: number;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstStripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const firstStrip = firstStripRef.current;

    if (!track || !firstStrip) {
      return;
    }

    const durationMs = Math.max((durationSec ?? 20) * 1000, 1);
    const delayMs = (delaySec ?? 0) * 1000;
    let stripWidth = Math.max(firstStrip.offsetWidth, 1);
    let animationFrame = 0;
    let lastTime = performance.now();
    let x = 0;

    const wrapOffset = (value: number, width: number) => {
      if (width <= 0) {
        return 0;
      }
      let wrapped = value % width;
      if (wrapped < 0) {
        wrapped += width;
      }
      return reverse ? wrapped - width : -wrapped;
    };

    x = wrapOffset((-delayMs / durationMs) * stripWidth, stripWidth);
    track.style.transform = `translate3d(${x}px, 0, 0)`;

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const pxPerMs = stripWidth / durationMs;
      x += (reverse ? 1 : -1) * pxPerMs * delta;

      if (!reverse && x <= -stripWidth) {
        x += stripWidth;
      }
      if (reverse && x >= 0) {
        x -= stripWidth;
      }

      track.style.transform = `translate3d(${x}px, 0, 0)`;
      animationFrame = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      // Prefer contentBoxSize (no layout flush) over offsetWidth.
      const entry = entries[0];
      const inlineSize = entry?.contentBoxSize?.[0]?.inlineSize;
      if (typeof inlineSize === "number" && inlineSize > 0) {
        stripWidth = inlineSize;
      } else {
        stripWidth = Math.max(firstStrip.offsetWidth, 1);
      }
      x = wrapOffset(x, stripWidth);
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    });

    resizeObserver.observe(firstStrip);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [delaySec, durationSec, reverse, items]);

  const renderBadgeIcon = (item: string) => {
    if (item === "Next.js") {
      return (
        <img
          aria-hidden
          alt=""
          className="mr-1.5 h-4 w-4"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
        />
      );
    }

    const iconClass = techIconClasses[item];

    if (iconClass) {
      return <i aria-hidden className={`${iconClass} colored mr-1.5 text-base leading-none`} />;
    }

    return (
      <span
        aria-hidden
        className="mr-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-[3px] bg-black/5 px-0.5 text-[10px] leading-none dark:bg-white/10"
      >
        {fallbackLabel(item)}
      </span>
    );
  };

  const strip = (
    <div ref={firstStripRef} className="flex shrink-0 flex-row gap-4">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="inline-flex shrink-0 items-center rounded-md border border-white/[0.14] bg-neutral-100 px-3 py-1 font-mono text-sm text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
          >
          {renderBadgeIcon(item)}
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden p-2">
      <div
        ref={trackRef}
        className="flex w-max flex-row will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {strip}
        <div aria-hidden className="flex shrink-0 flex-row gap-4">
          {items.map((item, index) => (
            <span
              key={`dup-${item}-${index}`}
              className="inline-flex shrink-0 items-center rounded-md border border-white/[0.14] bg-neutral-100 px-3 py-1 font-mono text-sm text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
            >
              {renderBadgeIcon(item)}
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoopFigure({ title, quote }: { title: string; quote: string }) {
  return (
    <figure className="scoop-card relative w-44 shrink-0 cursor-pointer rounded-xl border border-gray-950/10 bg-gray-950/1 p-4 transition-[background-color] duration-300 ease-out dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15 md:w-48">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <figcaption className="text-sm leading-5 font-medium dark:text-white">{title}</figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-xs leading-5 text-neutral-600 dark:text-neutral-200">{quote}</blockquote>
    </figure>
  );
}

function ScoopMarqueeLane() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const strip = stripRef.current;

    if (!wrapper || !track || !strip) {
      return;
    }

    let frameId = 0;
    let lastTime = performance.now();
    let x = 0;
    let paused = false;
    let inView = true;
    let stripWidth = Math.max(strip.offsetWidth, 1);
    const durationMs = 32000;

    const applyFocusZone = () => {
      const cards = track.querySelectorAll<HTMLElement>(".scoop-card");
      if (cards.length === 0) {
        return;
      }

      // Read wrapperRect + trackRect once per frame; reuse across cards.
      const wrapperRect = wrapper.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const focusCenterX = wrapperRect.left + wrapperRect.width / 2;
      const sharpRadius = wrapperRect.width * 0.18;
      const fadeRadius = wrapperRect.width * 0.42;
      const radiusDelta = Math.max(fadeRadius - sharpRadius, 1);
      const trackLeft = trackRect.left - x;

      for (const card of cards) {
        if (card.matches(":hover")) {
          card.style.opacity = "1";
          card.style.filter = "blur(0px)";
          card.style.transform = "scale(1)";
          card.style.zIndex = "30";
          continue;
        }

        // Compute card center from offsetLeft/offsetWidth (relative to track),
        // then translate to viewport using trackRect.left - x.
        // Avoids per-card getBoundingClientRect (forced reflow).
        const cardCenterX = trackLeft + card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenterX - focusCenterX);

        let focus = 0;
        if (distance <= sharpRadius) {
          focus = 1;
        } else if (distance < fadeRadius) {
          const t = (distance - sharpRadius) / radiusDelta;
          const smooth = t * t * (3 - 2 * t);
          focus = 1 - smooth;
        }

        const opacity = 0.5 + focus * 0.5;
        const blurPx = (1 - focus) * 1.8;
        const scale = 0.985 + focus * 0.015;

        card.style.opacity = opacity.toFixed(3);
        card.style.filter = `blur(${blurPx.toFixed(3)}px)`;
        card.style.transform = `scale(${scale.toFixed(4)})`;
        card.style.zIndex = `${Math.round(10 + focus * 10)}`;
      }
    };

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (inView) {
        if (!paused) {
          const pxPerMs = stripWidth / durationMs;
          x -= pxPerMs * delta;
          if (x <= -stripWidth) {
            x += stripWidth;
          }
          track.style.transform = `translate3d(${x}px, 0, 0)`;
        }

        applyFocusZone();
      }

      frameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const inlineSize = entry?.contentBoxSize?.[0]?.inlineSize;
      if (typeof inlineSize === "number" && inlineSize > 0) {
        stripWidth = inlineSize;
      } else {
        stripWidth = Math.max(strip.offsetWidth, 1);
      }
      if (x <= -stripWidth) {
        x = 0;
      }
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      applyFocusZone();
    });

    wrapper.addEventListener("pointerenter", onEnter);
    wrapper.addEventListener("pointerleave", onLeave);
    resizeObserver.observe(strip);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "50px" }
    );
    intersectionObserver.observe(wrapper);

    applyFocusZone();
    frameId = requestAnimationFrame(animate);

    return () => {
      wrapper.removeEventListener("pointerenter", onEnter);
      wrapper.removeEventListener("pointerleave", onLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(frameId);

      const cards = track.querySelectorAll<HTMLElement>(".scoop-card");
      for (const card of cards) {
        card.style.removeProperty("opacity");
        card.style.removeProperty("filter");
        card.style.removeProperty("transform");
        card.style.removeProperty("z-index");
      }
    };
  }, []);

  const figures = scoopFigures.map((f) => <ScoopFigure key={f.title} title={f.title} quote={f.quote} />);
  const dup = scoopFigures.map((f) => <ScoopFigure key={`d-${f.title}`} title={f.title} quote={f.quote} />);

  return (
    <div ref={wrapperRef} className="group/scoop overflow-hidden">
      <div ref={trackRef} className="flex w-max flex-row will-change-transform">
        <div ref={stripRef} className="flex shrink-0 flex-row gap-4 pr-4">
          {figures}
        </div>
        <div className="flex shrink-0 flex-row gap-4 pr-4" aria-hidden>
          {dup}
        </div>
      </div>
    </div>
  );
}

function VietnamGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let phi = 0;
    let theta = 0.2;
    let frameId = 0;
    const dpr = 2;
    const size = Math.max(Math.round(canvas.clientWidth), 260);
    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: 0,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.16, 0.22, 0.4],
      markerColor: [1, 1, 1],
      glowColor: [0.2, 0.35, 0.9],
      markers: [{ location: [16.0471, 108.2068], size: 0.028, id: "vn" }],
    } as any) as { update: (state: Record<string, unknown>) => void; destroy: () => void };

    let isDragging = false;
    let lastPoint: { x: number; y: number } | null = null;

    const clampTheta = (value: number) => Math.max(-0.45, Math.min(0.45, value));

    const onPointerDown = (event: PointerEvent) => {
      isDragging = true;
      lastPoint = { x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging || !lastPoint) {
        return;
      }

      const dx = event.clientX - lastPoint.x;
      const dy = event.clientY - lastPoint.y;

      phi += dx * 0.008;
      theta = clampTheta(theta + dy * 0.004);
      lastPoint = { x: event.clientX, y: event.clientY };
      globe.update({ phi, theta });
    };

    const onPointerUp = (event: PointerEvent) => {
      isDragging = false;
      lastPoint = null;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const animate = () => {
      if (!isDragging) {
        phi += 0.003;
      }
      globe.update({ phi, theta });
      frameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      const nextSize = Math.max(Math.round(canvas.clientWidth), 260);
      globe.update({ width: nextSize * dpr, height: nextSize * dpr });
    });

    resizeObserver.observe(canvas);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    frameId = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      cancelAnimationFrame(frameId);
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative size-full">
      <canvas ref={canvasRef} className="size-full cursor-grab touch-none active:cursor-grabbing" />
      <span
        aria-hidden
        className="pointer-events-none absolute z-10 inline-flex items-center gap-1 rounded-full border border-rose-400/45 bg-rose-500/90 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow-[0_0_18px_rgba(251,113,133,0.5)]"
        style={{
          positionAnchor: "--cobe-vn",
          opacity: "var(--cobe-visible-vn, 0)",
          bottom: "anchor(top)",
          left: "anchor(center)",
          translate: "-50% -6px",
        } as CSSProperties}
      >
        <svg viewBox="0 0 32 24" className="h-3 w-4 rounded-[2px]" aria-hidden="true">
          <rect width="32" height="24" fill="#DA251D" />
          <path
            fill="#FFDF00"
            d="M16 6.2l2.2 4.5 4.9.7-3.6 3.4.9 4.8-4.4-2.3-4.4 2.3.9-4.8-3.6-3.4 4.9-.7z"
          />
        </svg>
      </span>
    </div>
  );
}

export function FeatureGridSection() {
  const t = useTranslations("feature");
  const tCommon = useTranslations("common");
  const [emailCopied, setEmailCopied] = useState(false);
  const copyEmail = useCallback(() => {
    void navigator.clipboard?.writeText("haotrinh142@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }, []);

  return (
    <section className="container mx-auto grid w-full grid-cols-6 gap-4 py-pagebuilder md:auto-rows-[19rem]">
      {/* 1 — Collaboration: top-left wide (lg 4/6) */}
      <div className={`${cardShell} col-span-6 max-md:h-[21rem] md:col-span-3 lg:col-span-4`}>
        <div className="size-full">
          <svg
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 z-0 h-[250px] w-[704px] max-w-none -translate-x-1/2 opacity-80 [mask-image:linear-gradient(to_right,transparent,black_20%,black_90%,transparent)]"
            height="250"
            viewBox="0 0 637 250"
            width="704"
          >
            <g clipPath="url(#clip0_collab_bg)">
              <g filter="url(#filter0_i_collab_bg)">
                <path
                  fill="#2A2A2A"
                  fillOpacity="0.3"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M-24.5145 175.237C5.95935 205.744 55.3673 205.744 85.8412 175.237C116.315 144.731 116.315 95.2694 85.8412 64.7626C55.3673 34.2558 5.95935 34.2558 -24.5145 64.7626L-79.6924 120L-24.5145 175.237ZM-30.1683 59.1027L-85.3462 114.34L-91 120L-85.3462 125.66L-30.1683 180.897C3.42807 214.53 57.8986 214.53 91.495 180.897C102.486 169.894 109.882 156.654 113.681 142.641C117.481 156.654 124.876 169.894 135.868 180.897C169.464 214.53 223.935 214.53 257.531 180.897L312.709 125.66L318.363 120L312.709 114.34L257.531 59.1027C223.935 25.47 169.464 25.47 135.868 59.1027C124.876 70.106 117.481 83.3459 113.681 97.359C109.882 83.3459 102.486 70.106 91.495 59.1027C57.8986 25.47 3.42807 25.47 -30.1683 59.1027ZM251.877 175.237C221.403 205.744 171.995 205.744 141.522 175.237C111.048 144.731 111.048 95.2694 141.522 64.7626C171.995 34.2558 221.403 34.2558 251.877 64.7626L307.055 120L251.877 175.237ZM385.118 175.237C415.592 205.744 465 205.744 495.474 175.237C525.948 144.731 525.948 95.2694 495.474 64.7626C465 34.2558 415.592 34.2558 385.118 64.7626L329.94 120L385.118 175.237ZM379.464 59.1027L324.287 114.34L318.633 120L324.287 125.66L379.464 180.897C413.061 214.53 467.531 214.53 501.128 180.897C511.657 170.356 518.887 157.762 522.816 144.403C526.746 157.762 533.975 170.356 544.505 180.897C578.101 214.53 632.572 214.53 666.168 180.897L721.346 125.66L727 120L721.346 114.34L666.168 59.1027C632.572 25.47 578.101 25.47 544.505 59.1027C533.975 69.6438 526.746 82.2376 522.816 95.5975C518.887 82.2376 511.657 69.6438 501.128 59.1027C467.531 25.47 413.061 25.47 379.464 59.1027ZM550.159 175.237C580.633 205.744 630.041 205.744 660.514 175.237L715.692 120L660.514 64.7626C630.041 34.2558 580.633 34.2558 550.159 64.7626C519.685 95.2694 519.685 144.731 550.159 175.237Z"
                />
              </g>
              <mask fill="white" id="path-2-inside-1_collab_bg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M530.935 62.0924C527.084 67.0776 518.876 67.0706 515.032 62.0796C512.556 58.8646 509.846 55.772 506.902 52.8249C469.842 15.725 409.756 15.725 372.696 52.8249L362.342 63.1907C359.509 66.0262 355.041 66.2786 351.611 64.2065C341.932 58.3606 330.605 55 318.5 55C306.004 55 294.338 58.581 284.458 64.7802C281.014 66.9409 276.466 66.7264 273.593 63.8501L262.942 53.1878C226.082 16.2884 166.321 16.2884 129.462 53.1878C126.674 55.9787 124.097 58.9007 121.73 61.9341C117.882 66.8675 109.765 66.8619 105.928 61.9195C88.6146 39.6164 61.5624 25.266 31.1621 25.266C-21.1017 25.266 -63.4698 67.6799 -63.4698 120C-63.4698 172.32 -21.1017 214.734 31.1621 214.734C61.5623 214.734 88.6146 200.384 105.928 178.081C109.765 173.138 117.882 173.133 121.73 178.066C124.097 181.099 126.674 184.021 129.462 186.812C166.321 223.712 226.082 223.712 262.942 186.812L273.593 176.15C276.466 173.274 281.014 173.059 284.458 175.22C294.338 181.419 306.004 185 318.5 185C330.605 185 341.932 181.639 351.611 175.793C355.041 173.721 359.509 173.974 362.342 176.809L372.696 187.175C409.756 224.275 469.842 224.275 506.902 187.175C509.846 184.228 512.556 181.135 515.032 177.92C518.876 172.929 527.084 172.922 530.935 177.908C548.243 200.309 575.356 214.734 605.835 214.734C658.099 214.734 700.467 172.32 700.467 120C700.467 67.6799 658.099 25.266 605.835 25.266C575.356 25.266 548.243 39.6906 530.935 62.0924Z"
                />
              </mask>
              <path
                fill="#505050"
                fillOpacity="0.2"
                mask="url(#path-2-inside-1_collab_bg)"
                d="M506.902 52.8249L506.194 53.5316L506.194 53.5316L506.902 52.8249ZM372.696 52.8249L371.989 52.1181L371.989 52.1181L372.696 52.8249ZM262.942 53.1878L262.234 53.8945L262.234 53.8945L262.942 53.1878ZM129.462 53.1878L128.754 52.4811L128.754 52.4811L129.462 53.1878ZM129.462 186.812L128.754 187.519L128.754 187.519L129.462 186.812ZM262.942 186.812L262.234 186.106L262.234 186.106L262.942 186.812ZM372.696 187.175L371.989 187.882L371.989 187.882L372.696 187.175ZM506.902 187.175L507.609 187.882L507.609 187.882L506.902 187.175ZM515.032 177.92L515.824 178.531L515.032 177.92ZM530.935 177.908L531.726 177.296L530.935 177.908ZM351.611 175.793L352.128 176.649L351.611 175.793ZM362.342 176.809L363.049 176.103L362.342 176.809ZM273.593 176.15L272.885 175.443L273.593 176.15ZM284.458 175.22L283.926 176.067L284.458 175.22ZM515.032 62.0796L515.824 61.4694L515.032 62.0796ZM530.935 62.0924L531.726 62.7038L530.935 62.0924ZM105.928 178.081L105.138 177.467L105.928 178.081ZM121.73 178.066L122.519 177.451L121.73 178.066ZM284.458 64.7802L284.989 65.6273L284.458 64.7802ZM273.593 63.8501L274.3 63.1433L273.593 63.8501ZM105.928 61.9195L106.718 61.3063L105.928 61.9195ZM362.342 63.1907L363.049 63.8975L362.342 63.1907ZM351.611 64.2065L352.128 63.3506L351.611 64.2065ZM507.609 52.1181C510.583 55.0957 513.322 58.2206 515.824 61.4694L514.24 62.6898C511.79 59.5087 509.108 56.4483 506.194 53.5316L507.609 52.1181ZM371.989 52.1181C409.439 14.6273 470.159 14.6273 507.609 52.1181L506.194 53.5316C469.525 16.8228 410.073 16.8228 373.404 53.5316L371.989 52.1181ZM361.634 62.484L371.989 52.1181L373.404 53.5316L363.049 63.8975L361.634 62.484ZM318.5 54C330.793 54 342.297 57.4132 352.128 63.3506L351.094 65.0625C341.566 59.308 330.418 56 318.5 56V54ZM283.926 63.9331C293.961 57.6371 305.81 54 318.5 54V56C306.198 56 294.715 59.5249 284.989 65.6273L283.926 63.9331ZM263.649 52.4811L274.3 63.1433L272.885 64.5568L262.234 53.8945L263.649 52.4811ZM128.754 52.4811C166.004 15.1906 226.399 15.1906 263.649 52.4811L262.234 53.8945C225.766 17.3861 166.638 17.3861 130.169 53.8945L128.754 52.4811ZM120.942 61.3191C123.333 58.2536 125.937 55.3009 128.754 52.4811L130.169 53.8945C127.41 56.6565 124.86 59.5479 122.519 62.5492L120.942 61.3191ZM31.1621 24.266C61.8846 24.266 89.2234 38.7699 106.718 61.3063L105.138 62.5327C88.0058 40.4629 61.2402 26.266 31.1621 26.266V24.266ZM-64.4698 120C-64.4698 67.1286 -21.655 24.266 31.1621 24.266V26.266C-20.5484 26.266 -62.4698 68.2311 -62.4698 120H-64.4698ZM31.1621 215.734C-21.655 215.734 -64.4698 172.871 -64.4698 120H-62.4698C-62.4698 171.769 -20.5484 213.734 31.1621 213.734V215.734ZM106.718 178.694C89.2234 201.23 61.8846 215.734 31.1621 215.734V213.734C61.2401 213.734 88.0058 199.537 105.138 177.467L106.718 178.694ZM128.754 187.519C125.937 184.699 123.333 181.746 120.942 178.681L122.519 177.451C124.86 180.452 127.41 183.344 130.169 186.106L128.754 187.519ZM263.649 187.519C226.399 224.809 166.004 224.809 128.754 187.519L130.169 186.106C166.638 222.614 225.766 222.614 262.234 186.106L263.649 187.519ZM274.3 176.857L263.649 187.519L262.234 186.106L272.885 175.443L274.3 176.857ZM318.5 186C305.81 186 293.961 182.363 283.926 176.067L284.989 174.373C294.715 180.475 306.198 184 318.5 184V186ZM352.128 176.649C342.297 182.587 330.793 186 318.5 186V184C330.418 184 341.566 180.692 351.094 174.937L352.128 176.649ZM371.989 187.882L361.634 177.516L363.049 176.103L373.404 186.468L371.989 187.882ZM507.609 187.882C470.159 225.373 409.439 225.373 371.989 187.882L373.404 186.468C410.073 223.177 469.525 223.177 506.194 186.468L507.609 187.882ZM515.824 178.531C513.322 181.779 510.583 184.904 507.609 187.882L506.194 186.468C509.108 183.552 511.79 180.491 514.24 177.31L515.824 178.531ZM605.835 215.734C575.033 215.734 547.632 201.155 530.144 178.519L531.726 177.296C548.853 199.464 575.679 213.734 605.835 213.734V215.734ZM701.467 120C701.467 172.871 658.652 215.734 605.835 215.734V213.734C657.545 213.734 699.467 171.769 699.467 120H701.467ZM605.835 24.266C658.652 24.266 701.467 67.1286 701.467 120H699.467C699.467 68.2311 657.545 26.266 605.835 26.266V24.266ZM530.144 61.481C547.632 38.8448 575.033 24.266 605.835 24.266V26.266C575.679 26.266 548.853 40.5363 531.726 62.7038L530.144 61.481ZM514.24 177.31C518.484 171.8 527.474 171.792 531.726 177.296L530.144 178.519C526.693 174.053 519.269 174.059 515.824 178.531L514.24 177.31ZM351.094 174.937C354.862 172.662 359.847 172.897 363.049 176.103L361.634 177.516C359.171 175.051 355.221 174.781 352.128 176.649L351.094 174.937ZM272.885 175.443C276.134 172.191 281.207 172 284.989 174.373L283.926 176.067C280.82 174.118 276.798 174.356 274.3 176.857L272.885 175.443ZM515.824 61.4694C519.269 65.9413 526.693 65.9475 530.144 61.481L531.726 62.7038C527.474 68.2078 518.484 68.1999 514.24 62.6898L515.824 61.4694ZM105.138 177.467C109.375 172.009 118.27 172.004 122.519 177.451L120.942 178.681C117.494 174.261 110.154 174.267 106.718 178.694L105.138 177.467ZM284.989 65.6273C281.207 68.0001 276.134 67.8087 272.885 64.5568L274.3 63.1433C276.798 65.6441 280.82 65.8818 283.926 63.9331L284.989 65.6273ZM122.519 62.5492C118.27 67.996 109.375 67.9906 105.138 62.5327L106.718 61.3063C110.154 65.7332 117.494 65.739 120.942 61.3191L122.519 62.5492ZM363.049 63.8975C359.847 67.103 354.862 67.3383 351.094 65.0625L352.128 63.3506C355.221 65.2188 359.171 64.9494 361.634 62.484L363.049 63.8975Z"
              />
            </g>
            <defs>
              <filter
                id="filter0_i_collab_bg"
                x="-91"
                y="33.8782"
                width="818"
                height="173.744"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="0.75" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.647059 0 0 0 0 0.682353 0 0 0 0 0.721569 0 0 0 0.32 0"
                />
                <feBlend in2="shape" mode="normal" result="effect1_innerShadow_170_308" />
              </filter>
              <clipPath id="clip0_collab_bg">
                <rect width="704" height="250" transform="translate(-34 0)" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <button className="absolute z-[2] flex h-[300px] w-full flex-col" type="button">
            <div className="relative h-full [mask-image:linear-gradient(to_right,transparent,black_40%,black_60%,transparent)]">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2">
                <div className="relative mt-9">
                  <div
                    className="mx-auto flex h-[116px] w-[116px] items-center justify-center rounded-full bg-[#2A2A2A] p-0.5"
                    style={{ boxShadow: "0 0 60px 20px rgba(99, 102, 241, 0.35)" }}
                  >
                    <div className="h-[114px] w-[114px] overflow-hidden rounded-full border-[1.5px] border-[#494949]">
                      <img src="/images/trinhhao.png" alt="Trinh Van Hao" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
              </span>

              <span className="hidden lg:block">
                {desktopConnections.map((c) => (
                  <div
                    key={c.image}
                    className={`${c.className} translate-y-1 scale-90 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100`}
                    style={{ transitionDelay: `${c.delayMs}ms` }}
                  >
                    <div className="h-full w-full rounded-full border border-white/5 bg-[#2A2A2A] p-1">
                      <img alt="" className="h-full w-full rounded-full object-cover" src={c.image} />
                    </div>
                  </div>
                ))}
              </span>

              <span className="lg:hidden">
                {mobileConnections.map((c) => (
                  <div
                    key={c.image}
                    className={`rounded-full border border-white/5 bg-[#2A2A2A] translate-y-1 scale-90 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 ${c.className}`}
                    style={{ transitionDelay: `${c.delayMs}ms` }}
                  >
                    <img alt="" className="h-full w-full rounded-full object-cover" src={c.image} />
                  </div>
                ))}
              </span>
            </div>
          </button>
        </div>

        <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
          <svg
            aria-hidden
            className="size-12 origin-left text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" />
          </svg>
          <h3 className="max-w-lg font-mono text-xs text-neutral-400 uppercase">{t("collaboration")}</h3>
          <p className="text-xl tracking-wide text-neutral-700 dark:text-neutral-300">{t("collaborationDesc")}</p>
        </div>

        <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 items-center p-4 text-base tracking-wider opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <BookCallTrigger
            className="pointer-events-auto inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
          >
            {t("collaborationCta")}
            <svg aria-hidden className="ml-2 size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </BookCallTrigger>
        </div>

        <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/3 dark:group-hover:bg-neutral-800/10" />
      </div>

      {/* 2 — Tech stack: top-right tall (lg 2/6 × 2 rows) */}
      <div className={`${cardShell} col-span-6 max-md:min-h-[35rem] md:col-span-3 md:row-span-2 lg:col-span-2`}>
        <div className="absolute inset-0">
          <div className="relative size-full">
            <h3 className="absolute top-10 w-full select-none bg-linear-to-b from-[#fd81e298] to-[#da7bda] bg-clip-text px-4 pb-2 text-center font-instrument-serif text-3xl leading-[100%] font-bold tracking-wide text-transparent dark:from-[#edeffd]">
              {t("technologies")}
            </h3>

            <div className="relative flex h-full flex-col items-center justify-start">
              <div className="absolute -bottom-32 size-56 rounded-full bg-[#4f46e5] blur-3xl" />

              <div className="z-20 mt-32 flex w-full flex-col gap-y-6 md:mt-36 md:gap-y-10">
                <MarqueeRow items={coreStack} durationSec={32} delaySec={-2} />
                <MarqueeRow items={infraStack} reverse durationSec={36} delaySec={-7} />
                <MarqueeRow items={toolingStack} durationSec={34} delaySec={-4} />
              </div>

              <div aria-hidden className="absolute bottom-0 z-[5] flex items-center justify-center">
                {[0, 4, 8, 12, 16, 20, 24, 28, 32, 36].map((size) => (
                  <div
                    key={size}
                    className="absolute left-1/2 rounded-full border border-slate-200 dark:border-neutral-700"
                    style={{
                      width: `${size}rem`,
                      height: `${size}rem`,
                      transform: "translate(-50%, 0)",
                      opacity: size === 0 ? 1 : Math.max(0.1, 0.9 - size * 0.025),
                    }}
                  />
                ))}
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute bottom-8 left-1/2 z-[7] h-52 w-[22rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.52)_0%,rgba(129,140,248,0.28)_38%,rgba(0,0,0,0)_76%)] blur-2xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-2 left-1/2 z-[8] h-40 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(67,56,202,0.42)_0%,rgba(79,70,229,0.22)_44%,rgba(0,0,0,0)_78%)] blur-xl"
              />

              <div aria-hidden className="absolute -bottom-20 z-10 flex items-center justify-center p-10 [perspective:1000px]">
                <div className="group/mock relative h-60 w-[296px]">
                  <div className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl transition-all duration-500 ease-out group-hover/mock:-translate-y-4 group-hover/mock:shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 group-hover/mock:[transform:rotateX(6deg)]">
                    <div className="relative z-30 flex h-8 w-full items-center justify-between border-b border-neutral-200 bg-neutral-50 px-3 dark:border-neutral-800 dark:bg-neutral-900/50">
                      <div className="flex gap-x-1.5">
                        <div className="size-2.5 rounded-full bg-[#FF5C5F]" />
                        <div className="size-2.5 rounded-full bg-[#FAC800]" />
                        <div className="size-2.5 rounded-full bg-[#34C759]" />
                      </div>
                      <div className="flex h-5 w-2/5 items-center justify-center rounded-md bg-neutral-200/50 px-2 text-[8px] text-neutral-500 transition-all duration-300 group-hover/mock:w-3/5 group-hover/mock:bg-white group-hover/mock:shadow-sm dark:bg-neutral-800 dark:group-hover/mock:bg-neutral-800">
                        <svg aria-hidden className="mr-1 size-2 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect height="11" rx="2" width="18" x="3" y="11" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span className="opacity-0 transition-opacity delay-100 duration-500 group-hover/mock:opacity-100">trinhvhao</span>
                      </div>
                      <div className="w-8" />
                    </div>
                    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
                      <div
                        className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"
                        style={{ backgroundSize: "12px 12px" }}
                      />
                      <div className="relative z-10 flex -translate-y-4 flex-col items-center gap-3 transition-transform duration-500 group-hover/mock:-translate-y-6">
                        <div className="text-center">
                          <h3 className="bg-linear-to-b from-neutral-800 to-neutral-500 bg-clip-text text-lg font-bold text-transparent dark:from-neutral-100 dark:to-neutral-500">
                            Websites that
                            <br />
                            <span className="text-indigo-500">Impact.</span>
                          </h3>
                          <div className="mt-2 h-1 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                          <div className="mx-auto mt-1 h-1 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Link
                            href="/links"
                            className="flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-neutral-800 hover:shadow-indigo-500/40 dark:bg-white dark:text-black"
                          >
                            Start
                            <svg aria-hidden className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                          <Link
                            href="/links"
                            className="rounded-full border border-neutral-200 px-3 py-1 text-[10px] font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                      <div className="absolute -bottom-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-xl transition-all duration-500 group-hover/mock:bg-indigo-500/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/3 dark:group-hover:bg-neutral-800/10" />
      </div>

      {/* 3 — Remote / time zones: bottom-left tall */}
      <div className={`${cardShell} col-span-6 max-md:h-[32rem] md:col-span-3 md:row-span-2 lg:col-span-2`}>
        <div className="size-full">
            <h3 className="mt-6 w-full select-none bg-linear-to-b from-[#81a2fd98] to-[#7b9cda] bg-clip-text px-4 text-center font-instrument-serif text-3xl leading-[100%] font-bold tracking-wide text-balance text-transparent md:mt-12 dark:from-[#edeffd]">
              {t("remoteDetail")}
            </h3>

          <div className="absolute bottom-14 left-1/2 z-[6] w-[24rem] max-w-[90%] -translate-x-1/2 md:bottom-10 md:w-[26rem]">
            <div className="mx-auto flex flex-wrap justify-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-sky-400/25 bg-sky-500/12 px-3 py-1 font-mono text-[11px] text-sky-500 shadow-border dark:border-sky-400/30 dark:text-sky-400">
                <svg viewBox="0 0 32 24" className="h-3 w-4 rounded-[2px]" aria-hidden="true">
                  <rect width="32" height="24" fill="#DA251D" />
                  <path
                    fill="#FFDF00"
                    d="M16 6.2l2.2 4.5 4.9.7-3.6 3.4.9 4.8-4.4-2.3-4.4 2.3.9-4.8-3.6-3.4 4.9-.7z"
                  />
                </svg>
                VN
              </span>
            </div>

            <div className="relative mx-auto mt-3 aspect-square w-full max-w-xl">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.26)_0%,rgba(14,116,144,0.08)_40%,rgba(0,0,0,0)_72%)] blur-2xl" />
              <div className="relative size-full overflow-hidden rounded-full opacity-75 blur-[0.6px] transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:blur-0">
                <VietnamGlobe />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
          <svg
            aria-hidden
            className="size-12 origin-left text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h3 className="max-w-lg font-mono text-xs text-neutral-400 uppercase">{t("remote")}</h3>
          <p className="text-xl tracking-wide text-neutral-700 dark:text-neutral-300">{t("remoteDesc")}</p>
        </div>

        <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 items-center p-4 text-base tracking-wider opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href="/links"
            className="pointer-events-auto inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
          >
            {t("remoteCta")}
            <svg aria-hidden className="ml-2 size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/3 dark:group-hover:bg-neutral-800/10" />
      </div>

      {/* 4 — Contact CTA */}
      <div className={`${cardShell} col-span-6 max-md:h-[19rem] md:col-span-3 lg:col-span-2`}>
        <div className="size-full">
          <div className="flex size-full flex-col items-center justify-center bg-center bg-cover px-4">
            <span
              className="-translate-y-4 w-full max-w-80 py-2 text-center font-instrument-serif text-4xl font-bold text-balance text-[rgb(0,0,0,65%)] dark:text-[rgb(255,255,255,90%)]"
              style={
                {
                  maskImage:
                    "linear-gradient(-75deg,white calc(var(--x) + 20%),transparent calc(var(--x) + 30%),white calc(var(--x) + 100%))",
                  textShadow:
                    "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)",
                  ["--x" as string]: "100%",
                } as CSSProperties
              }
            >
              {t("contactCta")}
            </span>

            <span className="inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white-3 bg-white-1 px-8 py-1 font-sans text-sm text-neutral-600 shadow-border transition-[color,box-shadow] dark:border-white/[0.14] dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/60">
              <button
                type="button"
                onClick={copyEmail}
                className="flex cursor-pointer items-center gap-2 py-2 text-base font-light text-black transition-all duration-300 outline-hidden hover:text-black/60 dark:text-white/75 dark:hover:text-white/90"
              >
                {emailCopied ? (
                  <svg aria-hidden className="size-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <svg aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect height="14" rx="2" width="14" x="8" y="8" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
                haotrinh142@gmail.com
              </button>
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/3 dark:group-hover:bg-neutral-800/10" />
      </div>

      {/* 5 — The Inside Scoop */}
      <div className={`${cardShell} col-span-6 max-md:h-[17rem] md:col-span-6 lg:col-span-4`}>
        <div className="size-full">
          <div className="absolute top-8 flex w-full flex-col gap-1 overflow-hidden pb-14">
            <ScoopMarqueeLane />
          </div>
        </div>

        <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
          <svg
            aria-hidden
            className="size-12 origin-left text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect height="18" rx="2" width="18" x="3" y="3" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          <h3 className="max-w-lg font-mono text-xs text-neutral-400 uppercase">{t("scoop")}</h3>
          <p className="text-xl tracking-wide text-neutral-700 dark:text-neutral-300">{t("scoopDesc")}</p>
        </div>

        <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 items-center p-4 text-base tracking-wider opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href="/#work"
            className="pointer-events-auto inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
          >
            {t("scoopCta")}
            <svg aria-hidden className="ml-2 size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/3 dark:group-hover:bg-neutral-800/10" />
      </div>
    </section>
  );
}
