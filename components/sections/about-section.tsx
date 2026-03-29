"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { TypedRouteText } from "@/components/ui/typed-route-text";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [wandX, setWandX] = useState(0);
  const [wandY, setWandY] = useState(0);
  const [revealProgress, setRevealProgress] = useState(0);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [isWandSettling, setIsWandSettling] = useState(false);
  const settleTimeoutRef = useRef<number | null>(null);
  const wandHotspotX = 23;
  const wandHotspotY = 2;

  const syncWandPosition = useCallback((nextX: number, nextY: number) => {
    setWandX(nextX);
    setWandY(nextY);
  }, []);

  const clamp = useCallback((value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
  }, []);

  const getBounds = useCallback(() => {
    if (!sectionRef.current) {
      return null;
    }

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const minX = sectionRect.width * 0.06;
    const maxX = sectionRect.width * 0.94;

    return {
      minX,
      maxX,
      sectionLeft: sectionRect.left,
      sectionTop: sectionRect.top,
      sectionHeight: sectionRect.height,
    };
  }, []);

  useEffect(() => {
    const updateDefaultPosition = () => {
      const bounds = getBounds();
      if (!bounds) {
        return;
      }

      if (!isPointerInside) {
        setWandX(bounds.minX);
        setWandY(bounds.sectionHeight * 0.14);
      }
    };

    updateDefaultPosition();
    window.addEventListener("resize", updateDefaultPosition);

    return () => {
      window.removeEventListener("resize", updateDefaultPosition);
    };
  }, [getBounds, isPointerInside]);

  const updateReveal = useCallback(
    (clientX: number) => {
      const bounds = getBounds();
      if (!bounds) {
        return;
      }

      const nextX = clamp(clientX - bounds.sectionLeft, bounds.minX, bounds.maxX);
      const ratio = (nextX - bounds.minX) / Math.max(bounds.maxX - bounds.minX, 1);
      const easedRatio = clamp(ratio / 0.82, 0, 1);
      setRevealProgress(easedRatio);
    },
    [clamp, getBounds]
  );

  const wandStyle = useMemo(() => {
    return {
      transform: `translate(${wandX}px, ${wandY}px) rotate(${-7 + revealProgress * 10}deg)`,
      transformOrigin: "50% 8px",
      transition:
        isPointerInside && !isWandSettling
          ? "none"
          : "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
    };
  }, [isPointerInside, isWandSettling, revealProgress, wandX, wandY]);

  useEffect(() => {
    return () => {
      if (settleTimeoutRef.current) {
        window.clearTimeout(settleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="container relative overflow-hidden py-pagebuilder lg:max-w-full"
      id="about"
      onPointerEnter={(event) => {
        if (settleTimeoutRef.current) {
          window.clearTimeout(settleTimeoutRef.current);
        }

        setIsPointerInside(true);
        setIsWandSettling(true);
        const bounds = getBounds();
        if (!bounds) {
          return;
        }

        syncWandPosition(
          clamp(event.clientX - bounds.sectionLeft - wandHotspotX, bounds.minX, bounds.maxX),
          clamp(event.clientY - bounds.sectionTop - wandHotspotY, bounds.sectionHeight * 0.05, bounds.sectionHeight * 0.82)
        );
        updateReveal(event.clientX);

        settleTimeoutRef.current = window.setTimeout(() => {
          setIsWandSettling(false);
          settleTimeoutRef.current = null;
        }, 220);
      }}
      onPointerLeave={() => {
        if (settleTimeoutRef.current) {
          window.clearTimeout(settleTimeoutRef.current);
          settleTimeoutRef.current = null;
        }

        setIsPointerInside(false);
        setIsWandSettling(false);
        const bounds = getBounds();
        if (!bounds) {
          return;
        }

        setWandX(bounds.minX);
        setWandY(bounds.sectionHeight * 0.14);
        setRevealProgress(0);
      }}
      onPointerMove={(event) => {
        const bounds = getBounds();
        if (!bounds) {
          return;
        }

        syncWandPosition(
          clamp(event.clientX - bounds.sectionLeft - wandHotspotX, bounds.minX, bounds.maxX),
          clamp(event.clientY - bounds.sectionTop - wandHotspotY, bounds.sectionHeight * 0.05, bounds.sectionHeight * 0.82)
        );
        updateReveal(event.clientX);
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-20 aspect-[1/9] w-[46px] overflow-hidden rounded-[22px] shadow-[0_14px_48px_rgba(0,0,0,0.6)]"
        style={{
          ...wandStyle,
          background: "linear-gradient(90deg,#1a181c 10%,#2a282c 45% 55%,#1a181c 90%)",
        }}
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
              <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">KNOW ABOUT ME</p>
              <span className="font-instrument-serif">
                <span>Full-Stack Developer and a little bit of </span>
                <TypedRouteText text="everything" triggerOnView className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull" />
              </span>
            </h2>

            <div className="relative z-5 mx-auto flex max-w-xl flex-col gap-y-8 text-center text-base font-light tracking-wider text-black/80 dark:text-neutral-300 lg:mx-0 lg:max-w-[550px] lg:text-left lg:text-lg">
              <p>
                I&apos;m Trinh Van Hao, a proactive full-stack developer passionate about creating dynamic web experiences. From frontend to backend, I thrive on solving complex problems with clean, efficient code. My expertise spans React, Next.js, and Node.js, and I&apos;m always eager to learn more.
              </p>
              <p>When I&apos;m not immersed in work, I&apos;m exploring new ideas and staying curious. Life&apos;s about balance, and I love embracing every part of it.</p>
              <p>I believe in waking up each day eager to make a difference!</p>
            </div>

            <Link href="/about#experience" className="group mt-10 flex w-fit items-center justify-center gap-2 font-mono text-neutral-800 transition-colors hover:text-black dark:text-white-1 lg:justify-start">
              Work Experience
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
              className="absolute inset-[12px] z-[8] rotate-3 rounded-[44px] object-cover"
              fill
              priority={false}
              sizes="(max-width: 1024px) 256px, 520px"
              src="/images/trinhhao.webp"
              style={{
                opacity: 0.06 + revealProgress * 0.94,
                filter: `blur(${(1 - revealProgress) * 12}px) saturate(${0.8 + revealProgress * 0.35})`,
                transition: isPointerInside ? "opacity 140ms ease-out, filter 160ms ease-out" : "opacity 280ms ease, filter 280ms ease",
              }}
            />

            <div
              className="relative z-10 rotate-3 text-center font-instrument-serif text-6xl text-white/85 lg:text-8xl"
              style={{
                opacity: 1 - revealProgress * 0.85,
                transform: `rotate(3deg) scale(${1 - revealProgress * 0.04})`,
                transition: isPointerInside ? "opacity 140ms ease-out, transform 160ms ease-out" : "opacity 260ms ease, transform 260ms ease",
              }}
            >
              TH
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
