"use client";

import { useState } from "react";

import { MySiteSection } from "@/components/sections/my-site-section";
import { TypedRouteText } from "@/components/ui/typed-route-text";

type ContactTab = "links" | "send-message";

type LinkItem = {
  title: string;
  subtitle: string;
  href: string;
  icon: "github" | "guestbook" | "linkedin" | "twitter" | "telegram" | "bluesky";
};

const codeAndCraftLinks: LinkItem[] = [
  {
    title: "GitHub",
    subtitle: "@aayushbharti",
    href: "https://github.com/aayushbharti",
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
    subtitle: "in/iaayushbharti",
    href: "https://linkedin.com/in/iaayushbharti",
    icon: "linkedin",
  },
  {
    title: "Twitter / X",
    subtitle: "@iaayushbharti",
    href: "https://x.com/iaayushbharti",
    icon: "twitter",
  },
  {
    title: "Telegram",
    subtitle: "@iaayushbharti",
    href: "https://t.me/aayush_notes",
    icon: "telegram",
  },
  {
    title: "BlueSky",
    subtitle: "@aayush.bsky.social",
    href: "https://bsky.app/profile/aayushbharti.bsky.social",
    icon: "bluesky",
  },
];

function SocialIcon({ type }: { type: "mail" | "linkedin" | "github" | "twitter" }) {
  if (type === "mail") {
    return (
      <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg className="size-4 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  if (type === "github") {
    return (
      <svg className="size-4 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    );
  }

  return (
    <svg className="size-4 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

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

  if (icon === "twitter") {
    return (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
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
      className="group relative flex items-center gap-4 rounded-xl border border-neutral-700 bg-neutral-950/50 p-4 transition-all hover:border-neutral-500"
    >
      <div className="flex size-11 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-400">
        <LinkIcon icon={item.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <h4 className="text-sm font-semibold text-neutral-100">{item.title}</h4>
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
        <p className="line-clamp-1 font-mono text-[10px] text-neutral-400">{item.subtitle}</p>
      </div>
    </a>
  );
}

export function ContactMainSection() {
  const [activeTab, setActiveTab] = useState<ContactTab>("links");

  return (
    <>
      <main className="pt-38 pb-20">
        <h1
          className="relative z-2 mx-auto mb-16 max-w-xl text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:text-5xl md:text-6xl"
          style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)" }}
        >
          <p className="mb-4 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">Contact</p>
          <span className="font-instrument-serif">
            Let&apos;s Get <TypedRouteText text="In Touch" triggerOnView delay={0.08} className="px-1 pb-1 italic animate-gradient-x text-colorfull" />
          </span>
        </h1>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4">
          <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row">
            <div className="flex shrink-0 items-center gap-1">
              <a className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-neutral-200/50 hover:text-foreground dark:hover:bg-neutral-800/50" href="mailto:hello@trinhvhao.com" target="_blank" rel="noopener noreferrer" title="Email">
                <span className="sr-only">Email</span>
                <SocialIcon type="mail" />
              </a>
              <a className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-neutral-200/50 hover:text-foreground dark:hover:bg-neutral-800/50" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <span className="sr-only">LinkedIn</span>
                <SocialIcon type="linkedin" />
              </a>
              <a className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-neutral-200/50 hover:text-foreground dark:hover:bg-neutral-800/50" href="https://github.com/Trinhvhao" target="_blank" rel="noopener noreferrer" title="GitHub">
                <span className="sr-only">GitHub</span>
                <SocialIcon type="github" />
              </a>
              <a className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-neutral-200/50 hover:text-foreground dark:hover:bg-neutral-800/50" href="https://x.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                <span className="sr-only">Twitter</span>
                <SocialIcon type="twitter" />
              </a>
            </div>

            <div className="relative z-20 grid w-full grid-cols-2 rounded-lg bg-neutral-200/50 p-[3px] dark:bg-neutral-800/50">
              <button
                type="button"
                onClick={() => setActiveTab("links")}
                className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors ${
                  activeTab === "links"
                    ? "bg-background text-foreground shadow-sm dark:border-input dark:bg-input/30"
                    : "text-muted-foreground"
                }`}
              >
                <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
                  <path d="M19 9l-5 5" />
                  <path d="M19 9h5v5" />
                </svg>
                Links
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("send-message")}
                className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors ${
                  activeTab === "send-message"
                    ? "bg-background text-foreground shadow-sm dark:border-input dark:bg-input/30"
                    : "text-muted-foreground"
                }`}
              >
                <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
                  <path d="M7 11h10" />
                  <path d="M7 15h6" />
                  <path d="M7 7h8" />
                </svg>
                Send Message
              </button>
            </div>
          </div>

          {activeTab === "links" ? (
            <div className="mx-auto w-full max-w-4xl space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900/45 p-6">
              <div>
                <h3 className="mb-4 font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">Code &amp; Craft</h3>
                <div className="space-y-2">
                  {codeAndCraftLinks.map((item) => (
                    <LinkCard key={`contact-code-${item.title}`} item={item} />
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-700" />

              <div>
                <h3 className="mb-4 font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">Connect</h3>
                <div className="space-y-2">
                  {connectLinks.map((item) => (
                    <LinkCard key={`contact-connect-${item.title}`} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <form className="mx-auto grid w-full max-w-4xl gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/45 p-6">
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
      </main>

      <section className="relative py-pagebuilder">
        <MySiteSection />
      </section>
    </>
  );
}
