"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { MySiteSection } from "@/components/sections/my-site-section";
import { TypedRouteText } from "@/components/ui/typed-route-text";

type LinksTab = "links" | "send-message";

type LinkItem = {
  title: string;
  subtitle: string;
  href: string;
  icon: "github" | "guestbook" | "linkedin" | "telegram" | "facebook" | "tiktok" | "zalo";
};

const codeAndCraftLinks: LinkItem[] = [
  {
    title: "GitHub",
    subtitle: "@trinhvanhao",
    href: "https://github.com/trinhvanhao",
    icon: "github",
  },
  {
    title: "Guestbook",
    subtitle: "Leave a mark",
    href: "/guestbook",
    icon: "guestbook",
  },
];

const connectLinks: LinkItem[] = [
  {
    title: "LinkedIn",
    subtitle: "in/trinhvanhao",
    href: "https://linkedin.com/in/trinhvanhao",
    icon: "linkedin",
  },
  {
    title: "Facebook",
    subtitle: "Trinh Van Hao",
    href: "https://facebook.com/trinhvanhao",
    icon: "facebook",
  },
  {
    title: "TikTok",
    subtitle: "@trinhvanhao",
    href: "https://tiktok.com/@trinhvanhao",
    icon: "tiktok",
  },
  {
    title: "Telegram",
    subtitle: "@trinhvanhao",
    href: "https://t.me/trinhvanhao",
    icon: "telegram",
  },
  {
    title: "Zalo",
    subtitle: "Message on Zalo",
    href: "https://zalo.me/trinhvanhao",
    icon: "zalo",
  },
];

function LinkIcon({ icon }: { icon: LinkItem["icon"] }) {
  if (icon === "github") {
    return (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    );
  }

  if (icon === "guestbook") {
    return (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
        <path d="M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h3z" />
      </svg>
    );
  }

  if (icon === "tiktok") {
    return (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    );
  }

  if (icon === "zalo") {
    return (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    );
  }

  if (icon === "telegram") {
    return (
      <svg className="size-5" fill="none" viewBox="0 0 192 192" stroke="currentColor" strokeWidth="7" aria-hidden>
        <path d="M23.073 88.132s65.458-26.782 88.16-36.212c8.702-3.772 38.215-15.843 38.215-15.843s13.621-5.28 12.486 7.544c-.379 5.281-3.406 23.764-6.433 43.756-4.54 28.291-9.459 59.221-9.459 59.221s-.756 8.676-7.188 10.185c-6.433 1.509-17.027-5.281-18.919-6.79-1.513-1.132-28.377-18.106-38.214-26.404-2.649-2.263-5.676-6.79.378-12.071 13.621-12.447 29.891-27.913 39.728-37.72 4.54-4.527 9.081-15.089-9.837-2.264-26.864 18.483-53.35 35.835-53.35 35.835s-6.053 3.772-17.404.377c-11.351-3.395-24.594-7.921-24.594-7.921s-9.08-5.659 6.433-11.693Z" />
      </svg>
    );
  }

  return (
    <svg className="size-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="0.8" aria-hidden>
      <path d="M4.90172 3.06907C6.96538 4.62164 9.18496 7.76969 10 9.45892C10.815 7.76969 13.0346 4.62164 15.0983 3.06907C16.5873 1.94881 19 1.08201 19 3.84022C19 4.39105 18.6848 8.46765 18.5 9.12954C17.8575 11.4304 15.5162 12.0173 13.4335 11.6621C17.0739 12.283 18 14.3396 16 16.3962C12.2016 20.3021 10.5407 15.4162 10.1151 14.1643C10.037 13.9348 10.0005 13.8274 10 13.9187C9.99946 13.8274 9.96295 13.9348 9.88493 14.1643C9.45934 15.4162 7.79839 20.3021 4 16.3962C2 14.3396 2.92606 12.283 6.56647 11.6621C4.48379 12.0173 2.14254 11.4304 1.5 9.12954C1.31517 8.46765 1 4.39105 1 3.84022C1 1.08201 3.41271 1.94881 4.90172 3.06907Z" />
    </svg>
  );
}

function LinkCard({ item }: { item: LinkItem }) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/30 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
    >
      <div className="flex size-11 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-600 transition-colors group-hover:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:bg-neutral-800">
        <LinkIcon icon={item.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{item.title}</h4>
          <svg
            aria-hidden
            className="size-3 -translate-x-1 text-neutral-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </div>
        <p className="line-clamp-1 font-mono text-[10px] text-neutral-500 dark:text-neutral-400">{item.subtitle}</p>
      </div>
    </a>
  );
}

function MobileLinkRow({ item }: { item: LinkItem }) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all active:scale-[0.98] dark:bg-neutral-900/50"
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-neutral-50 dark:bg-neutral-800">
        <LinkIcon icon={item.icon} />
      </div>
      <span className="text-sm font-medium text-neutral-900 dark:text-white">{item.title}</span>
      <svg aria-hidden className="ml-auto size-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
    </a>
  );
}

export function LinksMainSection() {
  const [activeTab, setActiveTab] = useState<LinksTab>("links");

  return (
    <section className="min-h-screen pb-24 pt-28 md:pt-38">
      <h1 className="sr-only">Links - Connect With Trinh Van Hao</h1>

      <div className="mx-auto block max-w-md px-4 md:hidden">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="relative size-28 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-neutral-900">
              <Image
                alt="Trinh Van Hao"
                className="object-cover"
                fill
                sizes="(max-width: 112px) 100vw, 112px"
                src="/images/trinhhao.webp"
              />
            </div>
            <div className="absolute bottom-1 right-1 flex size-7 items-center justify-center rounded-full bg-white shadow-sm dark:bg-neutral-900">
              <span className="relative flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-green-500" />
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="font-bluu text-3xl font-bold text-neutral-900 dark:text-white">Trinh Van Hao</h2>
            <p className="max-w-[280px] text-balance text-sm text-neutral-500 dark:text-neutral-400">
              Full-Stack Developer crafting high-performance digital experiences.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <span className="inline-flex h-5 items-center rounded-md bg-neutral-50 px-2 font-mono text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">Developer</span>
              <span className="inline-flex h-5 items-center rounded-md bg-neutral-50 px-2 font-mono text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">Freelancer</span>
              <span className="inline-flex h-5 items-center rounded-md bg-neutral-50 px-2 font-mono text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">Problem Solver</span>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3">
            <a
              className="flex items-center justify-center gap-2 rounded-lg border bg-neutral-50 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-white hover:shadow-sm dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              href="mailto:hello@trinhvanhao.dev"
            >
              <svg aria-hidden className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="8" y="8" width="14" height="14" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Email
            </a>
            <Link
              className="flex items-center justify-center gap-2 rounded-lg border bg-neutral-50 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-white hover:shadow-sm dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              href="/"
            >
              <svg aria-hidden className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              Full Website
            </Link>
          </div>
        </div>

        <div className="mt-5 space-y-6">
          <div className="relative z-20 grid w-full grid-cols-2 rounded-lg bg-neutral-200/50 p-[3px] dark:bg-neutral-800/50">
            <button
              type="button"
              onClick={() => setActiveTab("links")}
              className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors ${
                activeTab === "links"
                  ? "bg-background text-foreground shadow-sm dark:border-input dark:bg-input/30"
                  : "text-muted-foreground"
              }`}
            >
              Links
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("send-message")}
              className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors ${
                activeTab === "send-message"
                  ? "bg-background text-foreground shadow-sm dark:border-input dark:bg-input/30"
                  : "text-muted-foreground"
              }`}
            >
              Send Message
            </button>
          </div>

          {activeTab === "links" ? (
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-center font-mono text-xs font-bold tracking-wider text-neutral-400 uppercase">Code &amp; Craft</p>
                <div className="flex flex-col gap-3">
                  {codeAndCraftLinks.map((item) => (
                    <MobileLinkRow key={`mobile-code-${item.title}`} item={item} />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-center font-mono text-xs font-bold tracking-wider text-neutral-400 uppercase">Connect</p>
                <div className="flex flex-col gap-3">
                  {connectLinks.map((item) => (
                    <MobileLinkRow key={`mobile-connect-${item.title}`} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <form className="grid gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/45 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-neutral-300">
                  Name
                  <input className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500" placeholder="Your name" />
                </label>
                <label className="grid gap-2 text-sm text-neutral-300">
                  Email
                  <input className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500" placeholder="you@example.com" type="email" />
                </label>
              </div>
              <label className="grid gap-2 text-sm text-neutral-300">
                Project details
                <textarea className="min-h-32 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500" placeholder="Tell me what you're building, timeline and goals" />
              </label>
              <button type="button" className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <h2
          className="relative z-2 mx-auto mb-20 max-w-xl text-balance text-center text-5xl font-medium tracking-tight sm:text-5xl md:text-6xl"
          style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)" }}
        >
          <p className="mb-4 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">Contact</p>
          <span className="inline-block font-instrument-serif">
            Let&apos;s Get{" "}
            <TypedRouteText
              text="In Touch"
              className="animate-gradient-x px-1 pb-1 italic text-colorfull [text-shadow:none]"
              delay={0.08}
            />
          </span>
        </h2>

        <div className="flex flex-col border-t border-dashed border-neutral-300 dark:border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="p-4 lg:col-span-3 lg:p-6">
              <div className="sticky top-32">
                <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="mb-6 flex justify-center">
                    <div className="relative size-24">
                      <Image
                        alt="Trinh Van Hao"
                        className="rounded-full object-cover ring-4 ring-neutral-100 dark:ring-neutral-800"
                        fill
                        sizes="(max-width: 96px) 100vw, 96px"
                        src="/images/trinhhao.webp"
                      />
                      <div className="absolute bottom-1 right-1 flex size-6 items-center justify-center rounded-full bg-white shadow-sm ring-2 ring-neutral-100 dark:bg-neutral-900 dark:ring-neutral-800">
                        <span className="relative flex size-2.5">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h2 className="font-bluu text-2xl text-neutral-900 dark:text-white">Trinh Van Hao</h2>
                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                      <span className="inline-flex h-5 items-center rounded-md bg-neutral-50 px-2 font-mono text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">Developer</span>
                      <span className="inline-flex h-5 items-center rounded-md bg-neutral-50 px-2 font-mono text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">Freelancer</span>
                    </div>
                  </div>

                  <address className="mt-6 space-y-3 border-t border-dashed border-neutral-200 pt-6 text-sm not-italic dark:border-neutral-800">
                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                      <svg aria-hidden className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>India</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                      <svg aria-hidden className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                      </svg>
                      <span>hello@trinhvanhao.dev</span>
                    </div>
                  </address>

                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <Link
                      className="flex items-center justify-center gap-2 rounded-lg border bg-neutral-50 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-white hover:shadow-sm dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                      href="/"
                    >
                      <svg aria-hidden className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>
                      Website
                    </Link>
                    <a
                      className="flex items-center justify-center gap-2 rounded-lg border bg-neutral-50 py-2.5 text-xs font-medium text-neutral-900 transition-colors hover:bg-white hover:shadow-sm dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                      href="mailto:hello@trinhvanhao.dev"
                    >
                      <svg aria-hidden className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <rect x="8" y="8" width="14" height="14" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div aria-hidden className="hidden border-x border-dashed border-neutral-300 lg:col-span-1 lg:block dark:border-neutral-800" />

            <div className="p-4 lg:col-span-8 lg:p-6">
              <div className="mb-6 grid w-full grid-cols-2 rounded-lg bg-neutral-200/50 p-[3px] dark:bg-neutral-800/50">
                <button
                  type="button"
                  onClick={() => setActiveTab("links")}
                  className={`inline-flex h-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors ${
                    activeTab === "links"
                      ? "bg-background text-foreground shadow-sm dark:border-input dark:bg-input/30"
                      : "text-muted-foreground"
                  }`}
                >
                  Links
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("send-message")}
                  className={`inline-flex h-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors ${
                    activeTab === "send-message"
                      ? "bg-background text-foreground shadow-sm dark:border-input dark:bg-input/30"
                      : "text-muted-foreground"
                  }`}
                >
                  Send Message
                </button>
              </div>

              {activeTab === "links" ? (
                <nav aria-label="Social links" className="space-y-12">
                  <div>
                    <div className="mb-6 flex items-center gap-4">
                      <h3 className="font-mono text-xs font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-600">
                        Code &amp; Craft
                      </h3>
                      <div className="h-px flex-1 border-t border-dashed border-neutral-300 dark:border-neutral-800" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {codeAndCraftLinks.map((item) => (
                        <LinkCard key={`desktop-code-${item.title}`} item={item} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-6 flex items-center gap-4">
                      <h3 className="font-mono text-xs font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-600">
                        Connect
                      </h3>
                      <div className="h-px flex-1 border-t border-dashed border-neutral-300 dark:border-neutral-800" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {connectLinks.map((item) => (
                        <LinkCard key={`desktop-connect-${item.title}`} item={item} />
                      ))}
                    </div>
                  </div>
                </nav>
              ) : (
                <form className="grid gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/45 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm text-neutral-300">
                      Name
                      <input className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500" placeholder="Your name" />
                    </label>
                    <label className="grid gap-2 text-sm text-neutral-300">
                      Email
                      <input className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500" placeholder="you@example.com" type="email" />
                    </label>
                  </div>
                  <label className="grid gap-2 text-sm text-neutral-300">
                    Project details
                    <textarea className="min-h-32 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500" placeholder="Tell me what you're building, timeline and goals" />
                  </label>
                  <button type="button" className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="h-px w-full border-t border-dashed border-neutral-300 dark:border-neutral-800" />
        </div>
      </div>

      <section className="relative pt-18 pb-2 md:pt-24">
        <MySiteSection />
      </section>
    </section>
  );
}
