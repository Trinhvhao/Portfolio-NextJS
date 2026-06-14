"use client";

import type { CSSProperties } from "react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { TypedRouteText } from "@/components/ui/typed-route-text";

const AUTO_ADVANCE_MS = 4000; // ~vài giây, đổi ở đây nếu muốn nhanh/chậm hơn

type Testimonial = {
  title: string;
  content: string;
  author: string;
  role: string;
  gradientClass: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    title: "A Student Who Always Takes the Initiative",
    content:
      "Hao is a student I directly supervised for his graduation thesis at Dai Nam University. What I appreciate most about him is his highly proactive self-learning attitude — he doesn't wait for assignments but asks his own questions, finds his own solutions, and only then comes back for feedback. Throughout the thesis process, he demonstrated strong systematic thinking and knew how to turn ideas into working products. I believe he will go far in a real working environment.",
    author: "Nguyen Van Nhan, M.A.",
    role: "Thesis Supervisor • Dai Nam University",
    gradientClass: "bg-[radial-gradient(94.21%_78.4%_at_50%_29.91%,rgba(39,61,180,0.7),rgba(15,9,38,0.4))]",
  },
  {
    title: "He Codes Like an Engineer, Not a Student",
    content:
      "I worked with Hao on research projects at the AI-IoT Lab. What impresses me is that he doesn't just understand theory — he is willing to put models into real-world deployment, measure them, and optimize. The way he debugs, the way he writes structured code, and the way he asks the right questions — I see the mindset of an engineer, not a newcomer. He has the makings to grow in the AI-IoT field if he keeps pursuing it.",
    author: "Le Trung Hieu, Ph.D.",
    role: "Head of AI-IoT Lab",
    gradientClass: "bg-[radial-gradient(84.35%_70.19%_at_50%_38.11%,rgba(2,96,101,0.57),rgba(5,136,178,0.06))]",
  },
  {
    title: "Willing to Work, Learn, and Take Responsibility",
    content:
      "Hao has been with Zaka Edu since the early days. Back then, the workload was heavy and we often had to work overtime on weekends — he never once complained. He learns fast, from frontend development to collaborating with the team to receiving feedback from clients. What I value most about him is his sense of responsibility — whatever task is given, it always gets done from start to finish. Zaka Edu always welcomes him back.",
    author: "Bui Xuan Hieu",
    role: "Director • Zaka Edu Center",
    gradientClass: "bg-[radial-gradient(86.88%_75.47%_at_50%_24.53%,rgba(82,48,145,0.7),rgba(26,11,51,0.14))]",
  },
  {
    title: "A Young Partner Who Works Very Professionally",
    content:
      "ANDI collaborated with Hao on a promotional campaign for the vibecode.hosting domain with Tenten.vn. He grasps briefs quickly, comes up with his own video script ideas, and shoots and edits neatly. What surprised me is that he knows how to speak the language of end customers — not too 'tech-heavy', which fits a mainstream audience perfectly. A young partner who takes ownership of his output — definitely worth a long-term collaboration.",
    author: "Nguyen Lan Anh",
    role: "Director • ANDI CREATIF COMPANY",
    gradientClass: "bg-[radial-gradient(90.35%_49.25%_at_50%_59.06%,rgba(2,61,114,0.7),rgba(5,11,28,0.42))]",
  },
  {
    title: "He Understands Learners Because He Was One",
    content:
      "English With Us has had Hao involved since the product development phase. What I like about him is how he puts himself in the user's shoes — he tests thoroughly, often asks 'where will a newcomer get confused?' and fixes it himself. He doesn't try to make products that flaunt technical complexity but focuses on the real experience. Working with him is easy, trustworthy, and the output is always on time.",
    author: "Trang Tran",
    role: "Founder • English With Us",
    gradientClass: "bg-[radial-gradient(126.42%_76.6%_at_50%_32.26%,rgba(84,95,102,0.7),rgba(0,36,69,0.13))]",
  },
];

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex size-9 items-center justify-center rounded-full bg-white/15 text-[10px] font-semibold tracking-wide text-white/90 sm:text-xs">
      {initials}
    </div>
  );
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({ isDown: false, startX: 0, startScrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationRef = useRef<number | null>(null);
  const total = TESTIMONIALS.length;

  // Hủy animation cuộn đang chạy (nếu có)
  const cancelScrollAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Cuộn mượt tới toạ độ left bằng requestAnimationFrame + ease-in-out cubic
  const animateScrollTo = useCallback((targetLeft: number) => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }
    cancelScrollAnimation();

    const startLeft = container.scrollLeft;
    const distance = targetLeft - startLeft;
    if (Math.abs(distance) < 1) {
      return;
    }

    const duration = 700; // ms — đổi số này nếu muốn nhanh/chậm hơn
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // ease-in-out cubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      container.scrollLeft = startLeft + distance * eased;
      if (t < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(step);
  }, [cancelScrollAnimation]);

  // Scroll tới card theo index (dùng khi auto-advance hoặc click segment)
  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }
    const cards = container.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    const target = cards[index];
    if (!target) {
      return;
    }
    const innerTrack = container.firstElementChild as HTMLElement | null;
    const gap = innerTrack ? parseFloat(getComputedStyle(innerTrack).gap || "0") || 0 : 0;
    const left = target.offsetLeft - container.offsetLeft - gap;
    animateScrollTo(left);
  }, [animateScrollTo]);

  const stopAutoAdvance = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoAdvance = useCallback(() => {
    stopAutoAdvance();
    if (isPaused || isDragging) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % total;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);
  }, [isPaused, isDragging, scrollToIndex, total, stopAutoAdvance]);

  // Khởi động / dừng auto-advance theo trạng thái pause & drag
  useEffect(() => {
    if (isPaused || isDragging) {
      stopAutoAdvance();
    } else {
      startAutoAdvance();
    }
    return () => {
      stopAutoAdvance();
      cancelScrollAnimation();
    };
  }, [isPaused, isDragging, startAutoAdvance, stopAutoAdvance, cancelScrollAnimation]);

  return (
    <section
      className="py-pagebuilder dark:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-label={t("ariaLabel")}
    >
      <h2
        className="container relative z-2 mx-auto mb-8 text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:mb-10 sm:text-5xl md:mb-12 md:text-6xl"
        style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" } as CSSProperties}
      >
        <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{t("eyebrow")}</p>
        <span className="font-instrument-serif">
          <span>{t("title")} </span>
          <TypedRouteText text={t("titleAccent")} triggerOnView className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull" />
        </span>
      </h2>

      <div
        ref={scrollRef}
        className={`w-full overflow-x-auto select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={(event) => {
          const container = scrollRef.current;
          if (!container) {
            return;
          }

          // Dừng animation cuộn đang chạy (nếu có) để user điều khiển trực tiếp
          cancelScrollAnimation();

          dragStateRef.current = {
            isDown: true,
            startX: event.clientX,
            startScrollLeft: container.scrollLeft,
          };
          setIsDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragStateRef.current.isDown) {
            return;
          }

          const container = scrollRef.current;
          if (!container) {
            return;
          }

          const deltaX = event.clientX - dragStateRef.current.startX;
          container.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
        }}
        onPointerUp={() => {
          dragStateRef.current.isDown = false;
          setIsDragging(false);
          // Reset bộ đếm auto-advance sau khi user vừa tương tác
          stopAutoAdvance();
          startAutoAdvance();
        }}
        onPointerCancel={() => {
          dragStateRef.current.isDown = false;
          setIsDragging(false);
          stopAutoAdvance();
          startAutoAdvance();
        }}
        onPointerLeave={() => {
          dragStateRef.current.isDown = false;
          setIsDragging(false);
          stopAutoAdvance();
          startAutoAdvance();
        }}
      >
        <div className="mx-auto flex w-max gap-3 px-2 py-1">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, index) => (
            <div key={`${item.author}-${index}`} className="shrink-0" data-testimonial-card>
              <article
                className={`dark relative flex h-full w-[260px] select-none flex-col justify-between overflow-hidden rounded-xl bg-black p-3 antialiased shadow-border sm:w-[280px] sm:p-4 md:w-[320px] md:rounded-2xl md:p-4 lg:p-4 ${item.gradientClass}`}
              >
                <div>
                  <h4 className="mb-1.5 font-instrument-serif text-base font-bold leading-snug tracking-wide text-white/95 sm:text-lg md:text-xl">{item.title}</h4>
                  <p className="mb-2 line-clamp-8 text-sm font-extralight leading-relaxed tracking-tight text-white/85 md:line-clamp-9 md:text-base">{item.content}</p>
                </div>
                <div className="mt-1 flex items-center gap-2.5">
                  <InitialsAvatar name={item.author} />
                  <div>
                    <span className="text-sm font-medium tracking-wide text-white/95 sm:text-base">{item.author}</span>
                    <p className="text-[11px] text-white/80 sm:text-xs">{item.role}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto mt-6 flex items-center justify-center gap-1.5 px-4 sm:mt-8 sm:gap-2">
        <button
          type="button"
          aria-label={isPaused ? t("resumeAutoAdvance") : t("pauseAutoAdvance")}
          onClick={() => setIsPaused((paused) => !paused)}
          className="flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white sm:h-7 sm:w-7"
        >
          {isPaused ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden>
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          )}
        </button>
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const isFilling = isActive && !isPaused && !isDragging;
          return (
            <button
              key={`progress-${index}`}
              type="button"
              aria-label={t("goToTestimonial", { index: index + 1 })}
              onClick={() => {
                setActiveIndex(index);
                scrollToIndex(index);
                stopAutoAdvance();
                startAutoAdvance();
              }}
              className="group relative h-1 flex-1 max-w-12 cursor-pointer overflow-hidden rounded-full bg-white/15 sm:h-1.5"
            >
              <span
                className={`absolute inset-y-0 left-0 rounded-full ${isPast ? "w-full bg-white/80" : ""} ${
                  isFilling ? "bg-white/80" : ""
                }`}
                style={
                  isFilling
                    ? {
                        animation: `testimonial-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                        width: "0%",
                      }
                    : undefined
                }
              />
            </button>
          );
        })}
      </div>
      <style>{`
        @keyframes testimonial-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
