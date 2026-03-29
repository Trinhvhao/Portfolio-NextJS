import type { Metadata } from "next";

import { TypedRouteText } from "@/components/ui/typed-route-text";

type BucketItem = {
  title: string;
  description: string;
  date?: string;
  completed: boolean;
  href?: string;
  gallery?: Array<{ src: string; alt: string }>;
};

type BucketGroup = {
  id: string;
  index: string;
  title: string;
  description?: string;
  items: BucketItem[];
};

const bucketGroups: BucketGroup[] = [
  {
    id: "milestones",
    index: "01",
    title: "Milestones",
    items: [
      {
        title: "Remote working with client from abroad",
        description: "Secured my first international contract via cold outreach on LinkedIn. Delivered a full-stack SaaS MVP.",
        date: "Sep 2024",
        completed: true,
      },
      {
        title: "Get a Remote Job",
        description: "Transitioned to a full-time remote role at a forward-thinking tech company, enabling a location-independent lifestyle.",
        date: "Jan 2025",
        completed: true,
      },
      {
        title: "Get 250+ followers on Github",
        description: "Reached this milestone by consistently contributing to open source and sharing useful repositories.",
        date: "Dec 2025",
        completed: true,
      },
      {
        title: "Get 5,000+ organic LinkedIn followers",
        description: "Built a community around React, Next.js, and system design by sharing daily technical insights.",
        date: "Apr 2025",
        completed: true,
      },
      {
        title: "First OpenSource contribution",
        description: "Merged a PR into a popular UI library, fixing a critical accessibility bug.",
        date: "Dec 2024",
        completed: true,
      },
      {
        title: "Create portfolio website",
        description: "Launched v2.0 of this digital garden. Focused on performance, micro-interactions, and a clean bento-grid aesthetic.",
        date: "Aug 2024",
        completed: true,
        href: "https://www.aayushbharti.in",
        gallery: [
          { src: "/images/site-img/home-page.jpg", alt: "Create portfolio website - home page" },
          { src: "/images/site-img/blog-page.jpg", alt: "Create portfolio website - blog page" },
          { src: "/images/site-img/project-page.jpg", alt: "Create portfolio website - projects page" },
        ],
      },
      {
        title: "Simple offline notes app",
        description: "My 'Hello World' to React. Built a local-first notes app to understand state management and hooks.",
        date: "Nov 2023",
        completed: true,
      },
    ],
  },
  {
    id: "the-list",
    index: "02",
    title: "The List",
    description: "Goals, dreams, and technical ambitions I'm actively working towards.",
    items: [
      { title: "Skydiving", description: "To experience freefall and conquer the fear of heights from 13,000 feet.", completed: false },
      { title: "Do 10K marathon", description: "Training to build endurance and mental toughness. Target time: Sub 60 mins.", completed: false },
      { title: "Solo travel to another country", description: "To immerse myself in a completely different culture without a safety net.", completed: false },
      { title: "Write a book about programming", description: "Compile my learnings into a practical handbook for junior developers entering the industry.", completed: false },
      { title: "Write 10 technical articles", description: "Publish deep-dives on advanced frontend patterns on a personal blog or Medium.", completed: false },
      { title: "Get a muscular body", description: "Commit to a consistent strength training routine. Health is wealth.", completed: false },
      { title: "Featured once in media", description: "Share my journey or a project on a recognized tech podcast or publication.", completed: false },
      { title: "3 months Eurotrip!", description: "Backpack across Europe for a summer, working from cafes in Prague, Berlin, and Lisbon.", completed: false },
      { title: "Speak at an international conference", description: "Give a technical talk on stage at a React or Next.js conference.", completed: false },
    ],
  },
];

export const metadata: Metadata = {
  title: "Bucket List | Aayush Bharti",
  description: "A personal roadmap of completed milestones and upcoming life goals.",
};

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" className="size-4 text-neutral-400" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 7h10v10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M7 17 17 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ImagesIcon() {
  return (
    <svg aria-hidden="true" className="size-3" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <circle cx="13" cy="7" r="1" fill="currentColor" />
      <rect x="8" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function BucketItemRow({ item, isLast }: { item: BucketItem; isLast: boolean }) {
  return (
    <div
      className={`group relative flex flex-col gap-1 px-4 py-6 transition-colors hover:bg-neutral-50/50 md:px-6 dark:hover:bg-neutral-900/20 ${
        isLast ? "" : "border-b border-dashed border-neutral-200 dark:border-neutral-800"
      }`}
    >
      <div className="flex items-start gap-5">
        <div className="mt-1 shrink-0">
          <div className="flex size-6 items-center justify-center rounded-[6px] border-2 border-dashed border-neutral-300 bg-transparent transition-all group-hover:border-neutral-400 group-hover:bg-neutral-200/50 dark:border-neutral-700 dark:group-hover:border-neutral-600 dark:group-hover:bg-neutral-800">
            {item.completed ? <CheckIcon /> : null}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col justify-between gap-1 md:flex-row md:items-center">
            {item.href ? (
              <a className="inline-flex items-center gap-1 font-medium text-lg leading-tight text-neutral-900 transition-colors hover:underline hover:decoration-neutral-300 hover:underline-offset-4 dark:text-white dark:hover:decoration-neutral-600" href={item.href} rel="noreferrer" target="_blank">
                {item.title}
                <ArrowUpRightIcon />
              </a>
            ) : (
              <span
                className={`font-medium text-lg leading-tight transition-colors ${
                  item.completed
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white"
                }`}
              >
                {item.title}
              </span>
            )}

            {item.date ? (
              <span className="inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border px-3 py-1 font-mono text-xs text-neutral-600 shadow-border transition-[color,box-shadow] max-sm:mt-2 dark:border-white/[0.14] dark:bg-neutral-900 dark:text-neutral-300">
                {item.date}
              </span>
            ) : null}
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{item.description}</p>

          {item.gallery && item.gallery.length > 0 ? (
            <div className="mt-4 flex items-center gap-4">
              <div className="-space-x-3 group-hover:-space-x-2 flex transition-all duration-300">
                {item.gallery.map((image, index) => (
                  <div
                    key={image.src}
                    className="relative size-10 overflow-hidden rounded-lg border-2 border-white shadow-sm transition-all duration-300 first:ml-0 group-hover:z-10 group-hover:scale-110 dark:border-neutral-950"
                    style={{ zIndex: item.gallery ? item.gallery.length - index : 1 }}
                  >
                    <img alt={image.alt} className="size-full object-cover" src={image.src} />
                  </div>
                ))}
              </div>

              <span className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-500 transition-colors dark:bg-neutral-800 dark:text-neutral-400">
                <ImagesIcon />
                <span>Gallery</span>
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function BucketListPage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[-1] h-[450px] w-full overflow-hidden bg-neutral-100/70 dark:bg-neutral-950/93"
        style={{ maskImage: "linear-gradient(rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%)", opacity: 1 }}
      >
        <img
          alt="crumpled paper texture"
          className="pointer-events-none absolute inset-0 z-[-1] h-[450px] w-full select-none object-cover mix-blend-overlay"
          decoding="async"
          sizes="100vw"
          src="/images/crumpled-paper.avif"
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

      <main className="container relative flex min-h-screen flex-col mask-[linear-gradient(to_bottom,transparent,black_10rem,black_calc(100%-10rem),transparent)] max-sm:px-1">
        <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
          <div
            aria-hidden="true"
            className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] opacity-75 dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />

          <div className="relative col-span-1">
            <section className="pb-24 pt-38">
              <h2
                className="relative z-2 mx-auto mb-24 max-w-xl text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:text-5xl md:mb-36 md:text-6xl"
                style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" }}
              >
                <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">Lifetime</p>
                <span className="font-instrument-serif">
                  <span>The Bucket </span>
                  <TypedRouteText
                    text="Roadmap"
                    className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull"
                    delay={0.1}
                    triggerOnView
                  />
                </span>
              </h2>

              <div>
                <div className="flex flex-col border-t border-dashed border-neutral-200 dark:border-neutral-800">
                  {bucketGroups.map((group) => (
                    <div key={group.id}>
                      <div className="grid grid-cols-1 lg:grid-cols-12">
                        <div className="p-4 lg:col-span-3 lg:p-6">
                          <div className="sticky top-32">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-600">{group.index}</span>
                                <h2 className="font-instrument-serif text-3xl font-bold text-neutral-900 dark:text-white">{group.title}</h2>
                              </div>
                              {group.description ? <p className="max-w-[200px] text-sm text-neutral-500 dark:text-neutral-400">{group.description}</p> : null}
                            </div>
                          </div>
                        </div>

                        <div
                          aria-hidden="true"
                          className="hidden border-x border-dashed border-neutral-200 lg:col-span-1 lg:block dark:border-neutral-800"
                        />

                        <div className="p-0 lg:col-span-8 lg:p-6">
                          <div className="flex flex-col">
                            {group.items.map((item, index) => (
                              <BucketItemRow key={`${group.id}-${item.title}`} item={item} isLast={index === group.items.length - 1} />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div aria-hidden="true" className="h-px w-full border-t border-dashed border-neutral-200 dark:border-neutral-800" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div
            aria-hidden="true"
            className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] opacity-75 dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />
        </div>
      </main>
    </>
  );
}
