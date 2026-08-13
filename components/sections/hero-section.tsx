"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { TypedRouteText } from "@/components/ui/typed-route-text";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero-section"
      className="relative flex h-screen max-h-[820px] min-h-[640px] w-full flex-col items-center justify-center overflow-hidden pt-[calc(96px+env(safe-area-inset-top))] pb-pagebuilder"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 z-0 h-[500px] w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-700/20 blur-[150px] dark:bg-[#0b0218]"
      />

      <div className="container relative z-30 mx-auto mb-14 flex w-full flex-col items-center justify-center gap-y-6">
        <Link
          href="/projects"
          className="group relative inline-flex max-w-[92vw] cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white/40 px-1.5 py-1 text-sm shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_8px_30px_rgba(79,70,229,0.14)] backdrop-blur-md transition-all duration-300 ease-in hover:border-white/55 hover:bg-white/55 dark:border-white/15 dark:bg-white/5 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_8px_30px_rgba(79,70,229,0.2)] dark:hover:border-white/30 dark:hover:bg-white/10 lg:text-base"
        >
          <span className="mx-0.5 inline-flex items-center gap-1 rounded-full bg-blue-700 px-2 py-0.5 text-xs leading-relaxed text-white shadow-[0_0_16px_rgba(37,99,235,0.65)]">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            {t("badge")}
            <span className="hero-twinkle ml-0.5 text-[9px]">✦</span>
          </span>
          <span className="relative mr-3 min-w-0 overflow-hidden py-1 text-[rgb(0,0,0,72%)] dark:text-[rgb(255,255,255,90%)]">
            <span className="hero-upcoming-rotator inline-flex flex-col">
              <span>{t("badgeText1")}</span>
              <span>{t("badgeText2")}</span>
            </span>
          </span>
        </Link>

        <h2 className="w-full text-balance text-center font-instrument-serif text-5xl leading-tight text-zinc-700 opacity-90 dark:text-zinc-100 md:text-5xl lg:text-6xl relative z-30">
          <span className="md:text-nowrap">{t("subtitle")}</span>
          <br className="hidden md:block" />
          <span className="bg-linear-to-b from-zinc-500 via-zinc-600 to-zinc-900 bg-clip-text font-instrument-serif italic tracking-tight text-transparent dark:from-zinc-700 dark:via-zinc-200 dark:to-zinc-50">
            {t("highlightedText")}
          </span>
        </h2>

        <h1 className="grad-white relative z-30 flex flex-col items-center justify-center text-center text-xl tracking-tight sm:flex-row md:text-xl lg:text-2xl">
          <span className="flex items-center justify-center">
            {t("greeting")} {t("name")}
            <div className="group relative z-[300]">
              <div className="mx-2 w-16 cursor-pointer overflow-hidden rounded-3xl md:w-20 lg:mx-3">
                <Image
                  src="/images/trinhhao.webp"
                  alt="Trinh Van Hao"
                  width={854}
                  height={425}
                  sizes="(min-width: 768px) 80px, 64px"
                  quality={100}
                  className="pointer-events-none h-10 w-full object-cover object-[center_12%] transition-transform duration-300 group-hover:rotate-6 hover:scale-110 md:h-full"
                  priority
                />
              </div>
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 hidden size-6 animate-none delay-200 group-hover:block group-hover:animate-wave"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m4.861 9.147c.94-.657 2.357-.531 3.201.166l-.968-1.407c-.779-1.111-.5-2.313.612-3.093 1.112-.777 4.263 1.312 4.263 1.312-.786-1.122-.639-2.544.483-3.331 1.122-.784 2.67-.513 3.456.611l10.42 14.72-1.328 12.875-11.083-4.042-9.667-14.333c-.793-1.129-.519-2.686.611-3.478z"
                  fill="#ef9645"
                />
                <path
                  d="m2.695 17.336s-1.132-1.65.519-2.781c1.649-1.131 2.78.518 2.78.518l5.251 7.658c.181-.302.379-.6.6-.894l-7.288-10.627s-1.131-1.649.519-2.78c1.649-1.131 2.78.518 2.78.518l6.855 9.997c.255-.208.516-.417.785-.622l-7.947-11.591s-1.131-1.649.519-2.78c1.649-1.131 2.78.518 2.78.518l7.947 11.589c.292-.179.581-.334.871-.498l-7.428-10.832s-1.131-1.649.518-2.78 2.78.518 2.78.518l7.854 11.454 1.194 1.742c-4.948 3.394-5.419 9.779-2.592 13.902.565.825 1.39.26 1.39.26-3.393-4.949-2.357-10.51 2.592-13.903l-1.459-7.302s-.545-1.924 1.378-2.47c1.924-.545 2.47 1.379 2.47 1.379l1.685 5.004c.668 1.984 1.379 3.961 2.32 5.831 2.657 5.28 1.07 11.842-3.94 15.279-5.465 3.747-12.936 2.354-16.684-3.11z"
                  fill="#ffdc5d"
                />
                <g fill="#5dadec">
                  <path d="m12 32.042c-4 0-8.042-4.042-8.042-8.042 0-.553-.405-1-.958-1s-1.042.447-1.042 1c0 6 4.042 10.042 10.042 10.042.553 0 1-.489 1-1.042s-.447-.958-1-.958z" />
                  <path d="m7 34c-3 0-5-2-5-5 0-.553-.447-1-1-1s-1 .447-1 1c0 4 3 7 7 7 .553 0 1-.447 1-1s-.447-1-1-1zm17-32c-.552 0-1 .448-1 1s.448 1 1 1c4 0 8 3.589 8 8 0 .552.448 1 1 1s1-.448 1-1c0-5.514-4-10-10-10z" />
                  <path d="m29 .042c-.552 0-1 .406-1 .958s.448 1.042 1 1.042c3 0 4.958 2.225 4.958 4.958 0 .552.489 1 1.042 1s.958-.448.958-1c0-3.837-2.958-6.958-6.958-6.958z" />
                </g>
              </svg>
            </div>
          </span>
          <span className="leading-relaxed">
            <span> {t("role")} </span>
            <TypedRouteText text={t("roleSuffix")} className="animate-gradient-x text-colorfull" delay={0.08} />
          </span>
        </h1>

        <div className="z-[100] mt-4 flex flex-col items-center justify-center gap-6 sm:flex-row md:gap-10">
          <Link
            href="/links"
            className="group relative inline-flex items-center justify-between overflow-hidden rounded-full border border-black/25 bg-black/10 py-[3px] pr-[3px] pl-2 text-base font-medium opacity-90 backdrop-blur-xs transition-all dark:border-white/10 dark:bg-white/10 md:py-1 md:pr-1 md:pl-3"
          >
            <span
              aria-hidden
              className="absolute inset-y-[3px] right-[3px] z-10 w-9 rounded-full bg-white transition-all duration-500 ease-out group-hover:left-[3px] group-hover:w-[calc(100%-6px)] md:inset-y-1 md:right-1 md:w-10 md:group-hover:left-1 md:group-hover:w-[calc(100%-8px)]"
            />
            <span className="z-20 px-3 text-white transition-colors duration-300 group-hover:text-black dark:text-white dark:group-hover:text-black">
              {t("cta")}
            </span>
            <span className="z-20 mr-0.5 inline-flex size-9 items-center justify-center rounded-full text-black md:size-10">→</span>
          </Link>

          <a
            href="mailto:haotrinh142@gmail.com"
            className="flex cursor-pointer items-center gap-2 py-2 text-base font-light text-black transition-all duration-300 hover:text-black/60 dark:text-white/75 dark:hover:text-white/90"
          >
            <svg
              aria-hidden="true"
              className="lucide lucide-copy"
              fill="none"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="8" y="8" width="14" height="14" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
            {t("email")}
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-56">
        <div aria-hidden="true" className="relative z-19 mt-4 h-60 w-full">
          <div className="absolute bottom-0 left-1/2 h-[500px] w-[1200px] -translate-x-1/2 transform mask-[linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]">
            <div className="absolute bottom-[167px] left-1/2 h-[111px] w-[800px] -translate-x-1/2 transform bg-[linear-gradient(90deg,#06b6d4,#7c3aed,#4f46e5,#38bdf8,#06b6d4)] bg-size-[300%_100%] blur-[80px]" />
            <div className="absolute -right-[432px] -bottom-[753px] -left-[454px] h-[955px] rounded-[100%] bg-linear-to-b from-indigo-500/40 to-transparent dark:from-white" />
            <div className="absolute -right-[510px] -bottom-[759px] -left-[532px] aspect-[2.346/1] h-[956px] rounded-[100%] bg-white-1 shadow-[inset_0_2px_20px_#4f46e510,0_-10px_50px_1px_#4f46e520] dark:bg-black dark:shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d] [--s1:inset_0_2px_20px_#4f46e510,0_-10px_50px_1px_#4f46e520] [--s2:inset_0_2px_30px_#4f46e530,0_-10px_60px_1px_#4f46e540] dark:[--s1:inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d] dark:[--s2:inset_0_2px_30px_#fff,0_-10px_60px_1px_#ffffffa2]" />
          </div>
        </div>
      </div>

      <style>{`
        .hero-upcoming-rotator {
          height: 1.4rem;
          animation: heroUpcomingRotate 6.5s ease-in-out infinite;
        }

        .hero-upcoming-rotator > span {
          height: 1.4rem;
          line-height: 1.4rem;
          white-space: nowrap;
        }

        .hero-twinkle {
          animation: heroTwinkle 2.8s ease-in-out infinite;
        }

        .animate-wave {
          transform-origin: 72% 72%;
          animation: heroWave 0.75s ease-in-out infinite;
        }

        @keyframes heroUpcomingRotate {
          0% {
            transform: translateX(0%);
          }
          40% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1.4rem);
          }
          90% {
            transform: translateY(-1.4rem);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes heroTwinkle {
          0%,
          70%,
          100% {
            opacity: 0.35;
            transform: scale(0.85);
          }
          78% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes heroWave {
          0%,
          100% {
            transform: rotate(0deg) translateY(0);
          }
          25% {
            transform: rotate(14deg) translateY(-1px);
          }
          50% {
            transform: rotate(-10deg) translateY(0);
          }
          75% {
            transform: rotate(12deg) translateY(-1px);
          }
        }
      `}</style>
    </section>
  );
}
