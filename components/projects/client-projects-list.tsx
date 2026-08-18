"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

import { workItems } from "@/lib/work-data";
import { StaggerItem } from "@/components/ui/stagger";

interface TranslatedItem {
  type: string;
  description: string;
}

function useProjectTranslations(): Record<string, TranslatedItem> | null {
  const locale = useLocale();
  const t = useTranslations("projects");

  if (locale !== "vi") return null;

  return {
    "next-venture": {
      type: t("nextVenture.type"),
      description: t("nextVenture.description"),
    },
    "finote": {
      type: t("finote.type"),
      description: t("finote.description"),
    },
    "zenith-minds": {
      type: t("zenithMinds.type"),
      description: t("zenithMinds.description"),
    },
    "snippix": {
      type: t("snippix.type"),
      description: t("snippix.description"),
    },
    "star-forge": {
      type: t("starForge.type"),
      description: t("starForge.description"),
    },
    "cloudpulse": {
      type: t("cloudPulse.type"),
      description: t("cloudPulse.description"),
    },
    "artflow": {
      type: t("artFlow.type"),
      description: t("artFlow.description"),
    },
    "taskbeat": {
      type: t("taskBeat.type"),
      description: t("taskBeat.description"),
    },
    "nexacart": {
      type: t("nexaCart.type"),
      description: t("nexaCart.description"),
    },
    "healthsync": {
      type: t("healthSync.type"),
      description: t("healthSync.description"),
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

export function TechBadge({ tag }: { tag: string }) {
  const iconClass = TECH_ICON_MAP[tag];

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden whitespace-nowrap font-mono text-[9px] sm:text-[11px] text-neutral-600 uppercase tracking-wide shadow-border transition-[color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.1)] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 border-white/[0.14] bg-neutral-900 gap-1.5 rounded-md px-2 py-1 sm:px-2.5 sm:py-1.5 min-h-[28px]"
    >
      {iconClass ? (
        <i className={`${iconClass} text-[13px] sm:text-[15px]`} aria-hidden="true" />
      ) : (
        <span className="inline-block size-1.5 rounded-full bg-pink-500" aria-hidden="true" />
      )}
      <span className="dark:text-neutral-300">{tag}</span>
    </span>
  );
}

interface ViewDetailsSpinnerProps {
  curveId: string;
  isVisible: boolean;
}

export function ViewDetailsSpinner({ curveId, isVisible }: ViewDetailsSpinnerProps) {
  return (
    <motion.div
      initial={false}
      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        scale: { type: "spring", stiffness: 400, damping: 25 },
        opacity: { duration: 0.15 },
      }}
      className="relative rounded-full"
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
    </motion.div>
  );
}

interface ProjectCardProps {
  item: (typeof workItems)[0];
  index: number;
  isEven: boolean;
  translations?: TranslatedItem | null;
}

function ProjectCard({ item, index, isEven, translations }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const displayType = translations?.type ?? item.type;
  const displayDescription = translations?.description ?? item.description;

  // Motion values riêng cho mỗi card
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring config cho smooth movement
  const springConfig = { stiffness: 200, damping: 25, mass: 0.8 };
  const cursorX = useSpring(rawX, springConfig);
  const cursorY = useSpring(rawY, springConfig);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set ngay lập tức khi enter - không animate từ vị trí cũ
    rawX.set(x);
    rawY.set(y);
    setIsHovered(true);
  }, [rawX, rawY]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    rawX.set(x);
    rawY.set(y);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const staggerClass = index === 0 ? "lg:mt-0" : (isEven ? "lg:-mt-12" : "lg:mt-48");
  const cardId = `project-${item.id}`;

  return (
    <StaggerItem key={item.id} className={`relative flex flex-col ${staggerClass}`}>
      {/* Connector line to center timeline */}
      <div
        className={`absolute top-[64px] hidden w-[calc(100%+2.35rem)] items-center lg:flex ${
          isEven ? "right-[-1.1rem] flex-row xl:right-[-1.85rem]" : "left-[-1.1rem] flex-row-reverse xl:left-[-1.85rem]"
        }`}
      >
        <div aria-hidden="true" className="h-px flex-1 border-t border-dashed border-neutral-300 transition-colors duration-500 group-hover:border-neutral-400 dark:border-neutral-800 dark:group-hover:border-neutral-700" />
        <div aria-hidden="true" className="relative flex size-3 items-center justify-center rounded-full bg-neutral-50 ring-1 ring-neutral-300 transition-all duration-500 hover:scale-125 dark:bg-neutral-950 dark:ring-neutral-700 hover:ring-neutral-400 dark:hover:ring-neutral-600">
          <div className="size-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 lg:gap-8 group">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white">
                  {item.index}
                </span>
                <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-white">
                  {displayType}
                </span>
              </div>
              <Link href={item.href} className="group/title flex items-center gap-2">
                <h2 className="font-instrument-serif text-3xl font-bold leading-tight text-neutral-900 transition-colors duration-300 group-hover/title:text-neutral-600 dark:text-white dark:group-hover/title:text-neutral-300 truncate">
                  {item.title}
                </h2>
              </Link>
            </div>
            <span className="inline-flex shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-white/[0.14] bg-neutral-900 px-3 py-1 font-mono text-[10px] text-neutral-400 shadow-border">
              {item.period}
            </span>
          </div>
        </div>

        <Link
          ref={cardRef}
          href={item.href}
          aria-label={`View Details of ${item.title}`}
          className="group/card relative block aspect-[16/12] min-h-[320px] w-full cursor-pointer overflow-hidden rounded-2xl bg-[#f2f2f20c] p-1 shadow-border transition-transform duration-300 ease-in-out hover:-translate-y-2 sm:min-h-[360px] md:aspect-[16/11] md:min-h-[390px] lg:aspect-[16/12] lg:min-h-[430px] lg:rounded-3xl lg:p-2"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-[linear-gradient(90deg,rgba(0,0,0,0)_5%,rgba(255,255,255,0.8)_35%,rgb(255,255,255)_50%,rgba(255,255,255,0.8)_65%,rgba(0,0,0,0)_95%)] dark:block" />

          <div className="relative flex size-full flex-col items-center justify-between overflow-hidden rounded-xl bg-black transition-colors duration-300 max-lg:pt-2 lg:rounded-2xl dark:bg-gradient-to-b dark:from-black/20 dark:to-black/45 dark:hover:from-black/20 dark:lg:from-black/35">

            {/* Hover internal gradient */}
            <div aria-hidden="true" className="absolute inset-0 z-[1] transition-transform duration-500 ease-in-out group-hover/card:scale-105" style={{ background: item.gradient }} />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 hidden h-[0.8px] bg-[linear-gradient(90deg,rgba(0,0,0,0)_20%,rgb(255,255,255)_50%,rgba(0,0,0,0)_80%)] opacity-70 dark:block" />

            <div className="z-10 flex w-full flex-row items-center justify-between gap-8 px-4 py-2 text-white/70 md:px-6 md:py-4 lg:px-5 lg:py-5">
              <h3 className="text-sm sm:text-base md:text-lg">{displayDescription}</h3>
              <svg aria-hidden="true" className="hidden size-5 shrink-0 transition-transform duration-300 ease-in-out group-hover/card:translate-x-1 sm:block" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>

            <div className="absolute left-0 right-0 top-14 z-10 flex w-full flex-col items-center justify-center md:top-20 lg:top-28">
              <div className="group/image relative flex w-full items-center justify-center pt-4" style={{ perspective: "2000px" }}>
                {item.image ? (
                  <>
                    <Image
                      src={item.image}
                      alt={`${item.title} image`}
                      width={800} height={800}
                      className="w-[85%] rounded-xl shadow-[0px_40px_50px_10px_rgba(0,0,0,0.22)] will-change-transform max-lg:z-10 max-lg:border-4 max-lg:border-white/5 lg:block transition-all duration-500 ease-in-out -rotate-6 -translate-x-10 scale-90 brightness-90 lg:translate-x-0 lg:rotate-0 lg:scale-100 lg:brightness-100 group-hover/card:-rotate-6 group-hover/card:-translate-x-10 group-hover/card:scale-[0.90] group-hover/card:brightness-90 object-cover"
                    />
                    {item.secondaryImage && item.secondaryImage !== item.image && (
                      <Image
                        src={item.secondaryImage}
                        alt={`${item.title} secondary`}
                        width={800} height={800}
                        className="absolute bottom-0 right-[5%] w-[65%] rounded-xl border-4 border-white/5 shadow-2xl will-change-transform lg:block transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] -translate-y-5 translate-x-4 rotate-3 scale-90 opacity-100 lg:translate-x-0 lg:translate-y-12 lg:rotate-12 lg:scale-75 lg:opacity-0 group-hover/card:-translate-y-5 group-hover/card:translate-x-4 group-hover/card:rotate-3 group-hover/card:scale-100 group-hover/card:opacity-100 object-cover"
                      />
                    )}
                  </>
                ) : (
                  <div className="flex h-48 w-[85%] items-center justify-center rounded-xl border border-white/25 bg-black/20 font-mono text-xs tracking-widest text-white/80 uppercase">
                    No Preview Available
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Cursor-following circle - motion component */}
          <motion.div
            className="pointer-events-none absolute z-20"
            style={{
              left: 0,
              top: 0,
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <ViewDetailsSpinner curveId={`work-list-curve-${item.id}`} isVisible={isHovered} />
          </motion.div>
        </Link>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {item.tags?.map((tag) => (
            <TechBadge key={tag} tag={tag} />
          ))}
        </div>

      </div>
    </StaggerItem>
  );
}

export function ClientProjectsList() {
  const projectTranslations = useProjectTranslations();

  return (
    <div className="relative px-3 mt-16 md:mt-24">
      {/* Center Dashed Timeline Line for Desktop */}
      <div aria-hidden="true" className="-translate-x-1/2 absolute top-0 bottom-0 left-1/2 hidden lg:block">
        <div className="h-full w-px border-l border-dashed border-neutral-300 dark:border-neutral-800" />
        <div className="-left-px absolute top-0 h-18 w-[3px] bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-950" />
        <div className="-left-px absolute bottom-0 h-18 w-[3px] bg-gradient-to-t from-neutral-50 to-transparent dark:from-neutral-950" />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-24 lg:grid-cols-2 lg:gap-y-0 xl:gap-x-12">
        {workItems.map((item, index) => (
          <ProjectCard
            key={item.id}
            item={item}
            index={index}
            isEven={index % 2 === 0}
            translations={projectTranslations?.[item.id]}
          />
        ))}
      </div>
    </div>
  );
}
