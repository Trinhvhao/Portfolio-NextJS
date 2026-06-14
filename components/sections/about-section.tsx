"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { TypedRouteText } from "@/components/ui/typed-route-text";

const WAND_HOTSPOT_X = 23;
const WAND_HOTSPOT_Y = 2;
const LERP_FACTOR = 0.12;
const RETURN_LERP = 0.06;
const LEAVE_DEBOUNCE_MS = 150;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function AboutSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement | null>(null);
  const wandRef = useRef<HTMLDivElement | null>(null);

  // target = where the mouse is (updated every pointermove)
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  // current = where the wand actually is (lerps toward target)
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // returnTarget = where the wand should lerp back to when pointer leaves
  const returnRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const rafRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pointerActive, setPointerActive] = useState(false);

  const applyWand = useCallback((x: number, y: number, progress: number) => {
    const section = sectionRef.current;
    const wand = wandRef.current;
    if (!section || !wand) return;
    wand.style.setProperty("--about-wand-x", `${x}px`);
    wand.style.setProperty("--about-wand-y", `${y}px`);
    section.style.setProperty("--about-progress", progress.toFixed(4));
  }, []);

  const clamp = useCallback(
    (x: number, y: number, rect: DOMRect) => {
      const minX = rect.width * 0.06;
      const maxX = rect.width * 0.94;
      const minY = rect.height * 0.05;
      const maxY = rect.height * 0.82;
      return {
        x: Math.max(minX, Math.min(x, maxX)),
        y: Math.max(minY, Math.min(y, maxY)),
        minX,
        maxX,
        minY,
        maxY,
      };
    },
    []
  );

  const animate = useCallback(() => {
    const wand = wandRef.current;
    if (!wand) return;

    const target = targetRef.current;
    const current = currentRef.current;
    const returnTo = returnRef.current;
    const section = sectionRef.current;
    if (!section) return;

    // Determine whether we're returning or tracking
    const isReturning = target === null;

    // Lerp current toward target or return position
    const factor = isReturning ? RETURN_LERP : LERP_FACTOR;
    const goalX = isReturning ? returnTo.x : target!.x;
    const goalY = isReturning ? returnTo.y : target!.y;

    const newX = lerp(current.x, goalX, factor);
    const newY = lerp(current.y, goalY, factor);
    current.x = newX;
    current.y = newY;

    // Progress from where the wand is, NOT from where the mouse is
    const rect = section.getBoundingClientRect();
    const clamped = clamp(newX, newY, rect);
    const ratio = (clamped.x - clamped.minX) / Math.max(clamped.maxX - clamped.minX, 1);
    const progress = Math.max(0, Math.min(ratio / 0.82, 1));

    applyWand(newX, newY, progress);

    // Stop when close enough during return
    if (
      isReturning &&
      Math.abs(current.x - returnTo.x) < 0.5 &&
      Math.abs(current.y - returnTo.y) < 0.5
    ) {
      current.x = returnTo.x;
      current.y = returnTo.y;
      applyWand(current.x, current.y, 0);
      cancelAnimationFrame(rafRef.current!);
      rafRef.current = null;
      return;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [applyWand, clamp]);

  const startAnimate = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  // Init default position from first layout — only runs once on mount
  useEffect(() => {
    const section = sectionRef.current;
    const wand = wandRef.current;
    if (!section || !wand) return;

    const rect = section.getBoundingClientRect();
    const minX = rect.width * 0.06;
    const minY = rect.height * 0.05;
    const defaultX = minX;
    const defaultY = minY + (rect.height * 0.82 - minY) * 0.14;

    currentRef.current = { x: defaultX, y: defaultY };
    returnRef.current = { x: defaultX, y: defaultY };
    wand.style.setProperty("--about-wand-x", `${defaultX}px`);
    wand.style.setProperty("--about-wand-y", `${defaultY}px`);
    section.style.setProperty("--about-progress", "0");

    const ro = new ResizeObserver(() => {
      const r = section.getBoundingClientRect();
      const mx = r.width * 0.06;
      const my = r.height * 0.05;
      const dx = mx;
      const dy = my + (r.height * 0.82 - my) * 0.14;
      returnRef.current = { x: dx, y: dy };
      // Don't reset current mid-interaction
      if (!targetRef.current) {
        currentRef.current = { x: dx, y: dy };
        wand.style.setProperty("--about-wand-x", `${dx}px`);
        wand.style.setProperty("--about-wand-y", `${dy}px`);
        section.style.setProperty("--about-progress", "0");
      }
    });
    ro.observe(section);
    return () => {
      ro.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (leaveTimerRef.current !== null) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
    };
  }, []);

  const handlePointerEnter = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (leaveTimerRef.current !== null) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left - WAND_HOTSPOT_X;
      const y = event.clientY - rect.top - WAND_HOTSPOT_Y;

      targetRef.current = { x, y };
      if (!currentRef.current) {
        currentRef.current = { x, y };
      }

      setPointerActive(true);
      startAnimate();
    },
    [startAnimate]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      targetRef.current = {
        x: event.clientX - rect.left - WAND_HOTSPOT_X,
        y: event.clientY - rect.top - WAND_HOTSPOT_Y,
      };
    },
    []
  );

  const handlePointerLeave = useCallback(() => {
    // Debounce leave: if we re-enter within 150ms, cancel the leave
    if (leaveTimerRef.current !== null) return;
    leaveTimerRef.current = setTimeout(() => {
      leaveTimerRef.current = null;
      targetRef.current = null;
      setPointerActive(false);
      startAnimate();
    }, LEAVE_DEBOUNCE_MS);
  }, [startAnimate]);

  return (
    <section
      ref={sectionRef}
      className="about-section container relative overflow-hidden py-pagebuilder lg:max-w-full"
      id="about"
      data-pointer={pointerActive ? "true" : "false"}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={wandRef}
        aria-hidden
        className="about-wand pointer-events-none absolute top-0 left-0 z-20 aspect-[1/9] w-[46px] overflow-hidden rounded-[22px] shadow-[0_14px_48px_rgba(0,0,0,0.6)]"
        style={{
          background: "linear-gradient(90deg,#1a181c 10%,#2a282c 45% 55%,#1a181c 90%)",
        }}
        suppressHydrationWarning
      >
        <span className="block h-[20%] w-full" style={{ background: "linear-gradient(90deg,#d4ddec 10%,#ffffff 45% 55%,#d4ddec 90%)" }} />
      </div>

      <div className="relative py-10">
        <section className="relative mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row lg:justify-between">
          <div className="w-full lg:max-w-[60%]">
            <h2
              className="relative z-2 mb-8 text-balance px-5 text-center text-5xl font-medium tracking-tight sm:text-5xl md:mt-28 md:mb-10 md:text-6xl lg:px-0 lg:text-left"
              style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" }}
            >
              <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{t("eyebrow")}</p>
              <span className="font-instrument-serif">
                <span>{t("heading")} </span>
                <TypedRouteText text={t("headingAccent")} triggerOnView className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull" />
              </span>
            </h2>

            <div className="relative z-5 mx-auto flex max-w-xl flex-col gap-y-8 text-center text-base font-light tracking-wider text-black/80 dark:text-neutral-300 lg:mx-0 lg:max-w-[550px] lg:text-left lg:text-lg">
              <p>{t("intro1")}</p>
              <p>{t("intro2")}</p>
              <p>{t("intro3")}</p>
            </div>

            <Link href="/about#experience" className="group mt-10 flex w-fit items-center justify-center gap-2 font-mono text-neutral-800 transition-colors hover:text-black dark:text-white-1 lg:justify-start">
              {t("workExperienceCta")}
              <span className="inline-flex h-[25px] w-[25px] items-center justify-center overflow-hidden rounded-full border border-neutral-300 bg-white-1/50 transition-colors duration-300 group-hover:bg-neutral-200 dark:border-white/10 dark:bg-white/5 dark:group-hover:bg-white/10">
                <span className="text-sm">→</span>
              </span>
            </Link>
          </div>

          <div aria-hidden className="relative grid aspect-square w-64 place-content-center lg:me-10 lg:mt-20 lg:w-[520px]">
            <div className="absolute -inset-2 rotate-3 rounded-[64px] border border-white/12 bg-white/3 shadow-[0_24px_80px_rgba(16,24,56,0.55)]" />
            <div className="absolute inset-0 rotate-3 rounded-[56px] bg-linear-to-br from-[#1f4fff] via-[#5fa8ff] to-[#dff5ff] p-[12px] shadow-[0_16px_48px_rgba(31,79,255,0.5)]" />
            <div className="absolute inset-[12px] rotate-3 rounded-[44px] bg-linear-to-b from-[#1e3566] via-[#0b1a3d] to-[#060d1f]" />

            <div
              className="absolute inset-[12px] z-[6] rotate-3 rounded-[44px] opacity-55"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(120,168,255,0.26) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,168,255,0.22) 1px, transparent 1px)",
                backgroundSize: "54px 54px",
              }}
            />
            <div className="absolute inset-[72px] z-[6] rotate-3 rounded-full border-2 border-[#7fa8ff]/35" />

            <Image
              alt="Trinh Hao portrait"
              className="about-portrait absolute inset-[12px] z-[8] rotate-3 rounded-[44px] object-cover"
              fill
              priority={false}
              sizes="(max-width: 1024px) 256px, 520px"
              src="/images/trinhhao.webp"
              suppressHydrationWarning
            />

            <div
              className="about-overlay-text relative z-10 rotate-3 text-center font-instrument-serif text-6xl text-white/85 lg:text-8xl"
              suppressHydrationWarning
            >
              TH
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
