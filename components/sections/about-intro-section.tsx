"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { aboutIntro, type AboutSocialLink } from "@/lib/about-data";
import { TypedRouteText } from "@/components/ui/typed-route-text";

function SocialIcon({ icon }: { icon: AboutSocialLink["icon"] }) {
  if (icon === "linkedin") {
    return (
      <svg className="stroke-1" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect height="12" width="4" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  if (icon === "github") {
    return (
      <svg className="stroke-1" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20" aria-hidden>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    );
  }

  return (
    <svg className="stroke-1" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20" aria-hidden>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export function AboutIntroSection() {
  const [centerIndex, setCenterIndex] = useState(1);
  const [captionVisible, setCaptionVisible] = useState(true);

  useEffect(() => {
    if (aboutIntro.imageCards.length <= 1) {
      return;
    }

    const rotationTimer = window.setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % aboutIntro.imageCards.length);
    }, 2400);

    return () => window.clearInterval(rotationTimer);
  }, []);

  const activeCaption = aboutIntro.imageCards[centerIndex]?.caption ?? "I Create";

  useEffect(() => {
    setCaptionVisible(false);

    const frame = window.requestAnimationFrame(() => {
      setCaptionVisible(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [centerIndex]);

  const getSlotStyle = (slot: "left" | "center" | "right") => {
    if (slot === "left") {
      return {
        left: "6%",
        zIndex: 1,
        filter: "brightness(0.7)",
        transform: "translateX(-50%) perspective(1000px) rotateY(45deg) scale(0.85)",
      } as const;
    }

    if (slot === "right") {
      return {
        left: "94%",
        zIndex: 1,
        filter: "brightness(0.7)",
        transform: "translateX(-50%) perspective(1000px) rotateY(-45deg) scale(0.85)",
      } as const;
    }

    return {
      left: "50%",
      zIndex: 3,
      filter: "brightness(1)",
      transform: "translateX(-50%) perspective(1000px) scale(1)",
    } as const;
  };

  return (
    <section className="min-w-0 px-5" aria-labelledby="about-intro-heading">
      <div className="flex min-w-0 flex-col items-center justify-between lg:flex-row">
        <div className="relative z-5 mx-auto flex w-full min-w-0 max-w-xl flex-col gap-y-8 text-center text-base font-light tracking-wider text-black/80 lg:mx-0 lg:max-w-[550px] lg:text-left lg:text-lg dark:text-neutral-300">
          <h2
            id="about-intro-heading"
            className="relative z-2 mb-8 max-w-lg text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:text-5xl md:mb-16 md:text-6xl lg:mb-0 lg:text-left"
            style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" }}
          >
            <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{aboutIntro.eyebrow}</p>
            <span className="font-instrument-serif">
              <span>{aboutIntro.titleStart} </span>
              <TypedRouteText
                text={aboutIntro.titleAccent}
                triggerOnView
                className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull"
                delay={0.12}
              />
            </span>
          </h2>
          {aboutIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="mx-auto -mt-4 flex w-fit gap-3 lg:mx-0">
            {aboutIntro.socials.map((social) => (
              <Link
                key={social.label}
                className="text-neutral-900 transition-colors hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-100"
                href={social.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="sr-only">{social.label}</span>
                <SocialIcon icon={social.icon} />
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mt-12 flex h-[350px] w-full max-w-[200px] flex-col items-center justify-center lg:mt-6 lg:h-[450px] lg:max-w-[270px] lg:me-30">
          <div className="relative h-full w-full">
            {aboutIntro.imageCards.map((card, index) => {
              const relativeIndex = (index - centerIndex + aboutIntro.imageCards.length) % aboutIntro.imageCards.length;
              const slot: "left" | "center" | "right" = relativeIndex === 0 ? "center" : relativeIndex === 1 ? "right" : "left";
              const slotStyle = getSlotStyle(slot);

              return (
                <div
                  key={card.alt}
                  className="absolute"
                  style={{
                    position: "absolute",
                    transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                    borderRadius: "30px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    ...slotStyle,
                  }}
                >
                  <div className="relative aspect-4/5 w-[220px] overflow-hidden rounded-3xl lg:w-[300px]">
                    <img
                      alt={card.alt}
                      className="select-none object-cover"
                      decoding="async"
                      draggable={false}
                      loading="lazy"
                      sizes="(max-width: 768px) 220px, 300px"
                      src={card.src}
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
                </div>
              );
            })}
          </div>
          <h3
            key={activeCaption}
            className={`mt-4 w-full text-center text-2xl font-light tracking-wide transition-all duration-500 ${
              captionVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ textShadow: "0 0 20px rgba(255,255,255,0.18)" }}
          >
            <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent animate-pulse">{activeCaption}</span>
          </h3>
        </div>
      </div>
    </section>
  );
}
