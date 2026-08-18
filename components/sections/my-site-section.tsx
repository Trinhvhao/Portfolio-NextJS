"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { TypedRouteText } from "@/components/ui/typed-route-text";

const cardShell =
  "group relative flex size-full flex-col justify-between overflow-hidden rounded-xl [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]";

const useLogos = [
  { alt: "Raycast", src: "/images/uses/raycast_logo.png", size: 100, delay: "delay-200" },
  { alt: "Arc", src: "/images/uses/arc_logo.png", size: 100, delay: "delay-100" },
  { alt: "VSCode", src: "/images/uses/vscode_logo.png", size: 115, delay: "delay-0" },
  { alt: "Obsidian", src: "/images/uses/obsidian_logo.png", size: 100, delay: "delay-100" },
  { alt: "Notion", src: "/images/uses/notion_logo.png", size: 100, delay: "delay-200" },
];

function OutArrowIcon() {
  return (
    <svg className="h-6 w-6 text-neutral-700 dark:text-neutral-200" fill="none" height="24" viewBox="0 0 24 24" width="24" aria-hidden>
      <path d="M17.25 15.25V6.75H8.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M17 7L6.75 17.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function MySiteSection() {
  const t = useTranslations("mySite");
  return (
    <section className="container relative mx-auto min-w-0 px-4">
      <h2
        className="relative z-2 mx-auto mb-4 max-w-xl text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:text-5xl md:mb-4 md:text-6xl"
        style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" }}
      >
        <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{t("eyebrow")}</p>
        <span className="font-instrument-serif">
          <span>{t("explore")} </span>
          <TypedRouteText text={t("typed")} triggerOnView className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull" />
        </span>
      </h2>

      <div className="mt-20 grid min-w-0 grid-cols-1 gap-3 md:grid-cols-12">
        <Link href="/uses" className="group relative col-span-12 flex min-w-0 h-[300px] flex-col justify-between rounded-xl md:col-span-12 md:row-span-6 lg:col-span-4">
          <div className={cardShell}>
            <div className="absolute right-4 bottom-4 z-[999] flex h-9 w-9 rotate-6 items-center justify-center rounded-full bg-black/15 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-8px] group-hover:rotate-0 group-hover:opacity-100 dark:bg-white/15">
              <OutArrowIcon />
            </div>

            <div className="size-full">
              <div className="mt-10 grid min-w-0 grid-cols-5 items-center gap-1.5 px-3 transition-all duration-500 ease-in-out sm:gap-3 md:mt-12">
                {useLogos.map((logo) => (
                  <div key={logo.alt} className="group min-w-0 text-center">
                    <div
                      className={`mx-auto aspect-square w-full rounded-[20px] border-2 p-2 transition-all duration-500 group-hover:border-indigo-400 group-hover:-translate-y-3 ${logo.delay}`}
                      style={{ maxWidth: `${logo.size}px` }}
                    >
                      <div
                        className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0] dark:border-[#5A5F661F]/10 dark:bg-[#1A1B1E]"
                        style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
                      >
                        <Image alt={logo.alt} className="h-10 w-10" height={40} src={logo.src} width={40} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none z-10 flex flex-col gap-1 p-6">
              <h3 className="max-w-lg font-mono text-xs text-neutral-400 uppercase">{t("usesTitle")}</h3>
              <p className="text-xl tracking-wide text-neutral-700 dark:text-neutral-300">{t("usesSubtitle")}</p>
            </div>

            <div className="user-select-none pointer-events-none absolute inset-0 z-30 bg-linear-to-tl from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 dark:group-hover:bg-neutral-800/10" />
          </div>
        </Link>

        <Link href="/about#experience" className="group relative col-span-12 flex h-[300px] w-full flex-col justify-between rounded-xl md:col-span-6 md:row-span-6 lg:col-span-4">
          <div className={`${cardShell} items-center px-6 pt-4 pb-3 text-center`}>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#0b0d12] via-[#07090f] to-[#05060a]" />

            <div className="relative z-10">
              <p className="font-mono text-xs font-semibold tracking-widest text-white/55 uppercase">{t("behindTitle")}</p>
              <h3 className="mt-1 text-balance font-instrument-serif text-3xl tracking-tight text-white/90 sm:text-2xl">{t("behindSubtitle")}</h3>
            </div>

            <div className="relative z-10 mt-6 w-full flex-1">
              <div className="mx-auto aspect-[3/4] w-[190px] origin-bottom rotate-[4deg] overflow-hidden rounded-xl border-[6px] border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:rotate-2 sm:w-[220px]">
                <Image alt="Trinh Van Hao portrait" className="h-full w-full object-cover object-top" height={420} src="/images/trinhhao.webp" width={260} />
              </div>
            </div>

            <div className="absolute top-1/2 right-4 z-[999] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/6 opacity-70 transition-all duration-300 ease-in-out group-hover:bg-white/12 group-hover:opacity-100">
              <svg aria-hidden className="h-5 w-5 text-white/75" fill="none" viewBox="0 0 24 24">
                <path d="M5 12h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="m12 5 7 7-7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </Link>

        <div className="relative col-span-12 h-[300px] w-full md:col-span-6 md:row-span-6 lg:col-span-4">
          <Link href="/guestbook" className="group relative col-span-6 flex h-full w-full flex-col justify-between rounded-xl">
            <div className={cardShell}>
              <div className="absolute right-4 bottom-4 z-[999] flex h-9 w-9 rotate-6 items-center justify-center rounded-full bg-black/15 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-8px] group-hover:rotate-0 group-hover:opacity-100 dark:bg-white/15">
                <OutArrowIcon />
              </div>

              <div className="size-full">
                <div className="absolute top-3 left-6 h-36 w-28 rotate-[-12deg] rounded-lg border border-white/10 bg-gradient-to-br from-[#2a2b31] to-[#121216] shadow-[8px_8px_24px_rgba(0,0,0,0.35)]" />
                <div className="absolute top-8 right-4 h-40 w-32 rotate-[10deg] rounded-lg border border-white/10 bg-gradient-to-br from-[#f4d2ff] to-[#b68eff] shadow-[8px_8px_26px_rgba(0,0,0,0.28)]" />
              </div>

              <div className="pointer-events-none z-10 flex flex-col gap-1 p-6">
                <h3 className="max-w-lg font-mono text-xs text-neutral-400 uppercase">{t("guestbookTitle")}</h3>
                <p className="text-xl tracking-wide text-neutral-700 dark:text-neutral-300">{t("guestbookSubtitle")}</p>
              </div>

              <div className="user-select-none pointer-events-none absolute inset-0 z-30 bg-linear-to-tl from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 dark:group-hover:bg-neutral-800/10" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
