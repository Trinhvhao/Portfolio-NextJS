import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { GuestbookAuthCta } from "@/components/sections/guestbook-auth-cta";
import { TypedRouteText } from "@/components/ui/typed-route-text";

type GuestbookEntry = {
  message: string;
  author: string;
  initials: string;
  date: string;
};

const entries: GuestbookEntry[] = [
  { message: "😍😍😍😍😍😍", author: "Merrick Hayes", initials: "M", date: "Mar 19, 2026" },
  { message: "very good", author: "najibhrd25", initials: "n", date: "Mar 10, 2026" },
  { message: "amazing\nloved it\nnice!", author: "zanjeel tariq", initials: "z", date: "Mar 07, 2026" },
  { message: "can you add some funny games here it will be cool", author: "ML Adilp", initials: "M", date: "Feb 08, 2026" },
  { message: "Awesome!!", author: "Gauri Katti", initials: "G", date: "Jan 31, 2026" },
  { message: "cool", author: "itzwarm", initials: "i", date: "Jan 31, 2026" },
  {
    message: "This is great man! I swear I need this source code bro😭",
    author: "John Kimeu",
    initials: "J",
    date: "Jan 29, 2026",
  },
  { message: "Super cool portfolio!", author: "Maverick Lally", initials: "M", date: "Jan 26, 2026" },
  { message: "awesome", author: "Shaishab Chandra Shil", initials: "S", date: "Jan 17, 2026" },
  { message: "very detailed and professional portfolio", author: "Vinay Patle", initials: "V", date: "Jan 13, 2026" },
  { message: "Cool Portfolio Man!", author: "SAHIL SHARMA", initials: "S", date: "Jan 13, 2026" },
  { message: "This portfolio is amazing", author: "Abdullah Abdul Samad", initials: "A", date: "Jan 13, 2026" },
];

const noteVariants = [
  {
    rotate: "rotate-1",
    bg: "radial-gradient(94% 78% at 50% 30%, rgba(39,61,180,0.9), rgba(15,9,38,0.9))",
  },
  {
    rotate: "-rotate-2",
    bg: "radial-gradient(90% 79% at 50% 59%, rgba(2,61,114,0.9), rgba(5,11,28,0.9))",
  },
  {
    rotate: "rotate-2",
    bg: "radial-gradient(126% 77% at 50% 32%, rgba(84,95,102,0.9), rgba(0,36,69,0.9))",
  },
  {
    rotate: "-rotate-1",
    bg: "radial-gradient(87% 75% at 50% 25%, rgba(82,48,145,0.9), rgba(26,11,51,0.9))",
  },
  {
    rotate: "rotate-0",
    bg: "linear-gradient(138deg, rgba(32,35,91,0.9) 22%, rgba(7,9,33,0.9) 82%)",
  },
  {
    rotate: "rotate-1",
    bg: "radial-gradient(100% 100% at 50% 0%, rgba(74,21,75,0.9), rgba(29,5,29,0.9))",
  },
  {
    rotate: "-rotate-1",
    bg: "radial-gradient(120% 90% at 40% 30%, rgba(59,35,82,0.9), rgba(20,12,40,0.9))",
  },
  {
    rotate: "rotate-2",
    bg: "radial-gradient(95% 85% at 60% 40%, rgba(24,75,95,0.9), rgba(8,25,35,0.9))",
  },
];

export const metadata: Metadata = {
  title: "Guestbook | Leave Your Mark - Trinh Van Hao",
  description:
    "Sign the guestbook and leave a message. See what visitors from around the world have shared on Trinh Van Hao's portfolio.",
};

function ShareIcon() {
  return (
    <svg aria-hidden className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function SparkleDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 42 42">
      <path
        d="M21 3.5l3.5 9.2L35 16l-10 3.1L21 30.5l-3.5-11.4L7 16l10.5-3.3L21 3.5z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
      />
      <path d="M21 10.6v20" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M11.2 21h19.6" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function LightningDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 36 56">
      <path
        d="M22 3L8.3 27.8h10.4L12.7 53l15-25.4H17.8L22 3z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function SketchCorner({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 48 48">
      <path d="M8 8L18 8L18 18L8 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 8L40 8L40 18L30 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 30L18 30L18 40L8 40Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 30L40 30L40 40L30 40Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 24 Q24 14 34 24 Q24 34 14 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SketchWaves({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 56 32">
      <path d="M2 16 Q8 10 14 16 T28 16 T42 16 T56 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M2 24 Q8 18 14 24 T28 24 T42 24 T56 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 8 Q8 2 14 8 T28 8 T42 8 T56 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CircleDots({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
      <circle cx="34" cy="24" r="2" fill="currentColor" />
      <circle cx="14" cy="24" r="2" fill="currentColor" />
      <circle cx="24" cy="34" r="2" fill="currentColor" />
      <circle cx="24" cy="14" r="2" fill="currentColor" />
      <circle cx="32" cy="32" r="1.5" fill="currentColor" />
      <circle cx="16" cy="32" r="1.5" fill="currentColor" />
      <circle cx="32" cy="16" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function StarBurst({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 32 32">
      <path d="M16 0L18.5 12L32 16L18.5 20L16 32L13.5 20L0 16L13.5 12L16 0Z" fill="currentColor" />
    </svg>
  );
}

function HeartDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function SpiralDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 32 32">
      <path d="M16 16 C16 12 20 8 24 8 C28 8 32 12 32 16 C32 20 28 24 24 24 C20 24 16 28 16 32 C16 32 12 32 8 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24">
      <path d="M12 4 L20 12 L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12 L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlusDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 20 20">
      <path d="M10 3 L10 17 M3 10 L17 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function MoonDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function WavyLine({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 64 20">
      <path d="M2 10 Q8 5 14 10 T28 10 T42 10 T56 10 L64 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M2 16 Q8 12 14 16 T28 16 T42 16 T56 16 L64 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const DOODLES = [
  // 0: Sparkle
  (className: string) => <SparkleDoodle className={className} />,
  // 1: Lightning
  (className: string) => <LightningDoodle className={className} />,
  // 2: SketchCorner
  (className: string) => <SketchCorner className={className} />,
  // 3: SketchWaves
  (className: string) => <SketchWaves className={className} />,
  // 4: CircleDots
  (className: string) => <CircleDots className={className} />,
  // 5: WavyLine
  (className: string) => <WavyLine className={className} />,
  // 6: StarBurst
  (className: string) => <StarBurst className={className} />,
  // 7: HeartDoodle
  (className: string) => <HeartDoodle className={className} />,
  // 8: SpiralDoodle
  (className: string) => <SpiralDoodle className={className} />,
  // 9: ArrowDoodle
  (className: string) => <ArrowDoodle className={className} />,
  // 10: PlusDoodle
  (className: string) => <PlusDoodle className={className} />,
  // 11: MoonDoodle
  (className: string) => <MoonDoodle className={className} />,
  // 12: EyeDoodle
  (className: string) => <EyeDoodle className={className} />,
];

const DOODLE_POSITIONS = [
  "absolute right-5 top-5 h-12 w-12 rotate-12 text-white/26",
  "absolute left-5 bottom-5 h-14 w-10 -rotate-12 text-white/22",
  "absolute right-4 bottom-4 h-14 w-14 -rotate-6 text-white/24",
  "absolute left-5 top-6 h-10 w-16 rotate-3 text-white/25",
  "absolute right-6 bottom-6 h-12 w-12 rotate-6 text-white/23",
  "absolute left-4 bottom-5 h-8 w-20 -rotate-12 text-white/27",
  "absolute right-4 top-6 h-10 w-10 -rotate-6 text-white/25",
  "absolute left-6 bottom-6 h-8 w-8 rotate-12 text-white/22",
  "absolute right-6 top-4 h-11 w-11 -rotate-12 text-white/24",
  "absolute left-4 top-4 h-9 w-9 rotate-6 text-white/26",
  "absolute right-5 bottom-5 h-7 w-7 -rotate-3 text-white/23",
  "absolute left-5 right-5 bottom-4 h-10 w-10 rotate-45 text-white/21",
  "absolute right-3 top-3 h-12 w-12 -rotate-45 text-white/25",
];

function TapeStrip({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="h-4 w-8 rotate-[-25deg] rounded-sm bg-amber-300/40 shadow-sm" />
    </div>
  );
}

function CardDoodles({ variant = 0, count = 1 }: { variant?: number; count?: number }) {
  const doodleIndices = [];
  for (let i = 0; i < count; i++) {
    doodleIndices.push((variant + i) % DOODLES.length);
  }

  const positions = [
    "absolute right-4 top-4",
    "absolute left-4 bottom-4",
    "absolute right-4 bottom-8",
    "absolute left-8 top-6",
    "absolute right-8 top-12",
    "absolute left-4 top-1/2 -translate-y-1/2",
  ];

  const rotations = [
    "rotate-12",
    "-rotate-12",
    "rotate-6",
    "-rotate-6",
    "rotate-45",
    "-rotate-45",
  ];

  const sizes = [
    "h-10 w-10",
    "h-8 w-8",
    "h-12 w-12",
    "h-6 w-6",
    "h-9 w-9",
    "h-7 w-7",
  ];

  const opacities = [
    "text-white/22",
    "text-white/18",
    "text-white/20",
    "text-white/16",
    "text-white/24",
    "text-white/15",
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {doodleIndices.map((doodleIdx, i) => {
        const doodle = DOODLES[doodleIdx];
        const pos = positions[i % positions.length];
        const rot = rotations[i % rotations.length];
        const size = sizes[i % sizes.length];
        const opacity = opacities[i % opacities.length];

        return (
          <div key={`doodle-${i}`} className={`${pos} ${rot}`}>
            <div className={`${size} ${opacity}`}>
              {doodle("")}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ExtraDecorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {/* Star bursts */}
      <div className="absolute -right-2 -top-2 h-6 w-6 rotate-12 text-yellow-300/40">
        <StarBurst className="h-full w-full" />
      </div>
      <div className="absolute -left-1 -bottom-1 h-5 w-5 -rotate-12 text-yellow-300/35">
        <StarBurst className="h-full w-full" />
      </div>

      {/* Tiny plus signs */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20">
        <PlusDoodle className="h-4 w-4" />
      </div>

      {/* Floating dots */}
      <div className="absolute bottom-10 left-6 h-1.5 w-1.5 rounded-full bg-white/25" />
      <div className="absolute right-10 top-16 h-1 w-1 rounded-full bg-white/20" />
      <div className="absolute left-10 top-20 h-0.5 w-0.5 rounded-full bg-white/30" />

      {/* Tape strips */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
        <TapeStrip className="h-5 w-10 rotate-3" />
      </div>
    </div>
  );
}

export default async function GuestbookPage() {
  const t = await getTranslations("guestbook");

  return (
    <>
      <div
        aria-hidden
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

      <main className="container relative flex flex-col max-sm:px-1">
        <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
          <div
            aria-hidden
            className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />

          <div className="relative col-span-1 min-w-0 pb-24 pt-38">
            <section className="container">
              <h1
                className="relative z-2 mx-auto mb-16 max-w-xl text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:text-5xl md:text-6xl"
                style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)" }}
              >
                <p className="mb-4 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{t("eyebrow")}</p>
                <span className="inline-block font-instrument-serif">
                  {t("title")}{" "}
                  <TypedRouteText
                    text={t("titleAccent")}
                    className="animate-gradient-x px-1 pb-1 font-instrument-serif italic text-colorfull"
                    delay={0.1}
                    triggerOnView
                  />
                </span>
              </h1>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
                {/* Card 1: Join the Wall - nhiều decorations */}
                <div className="relative z-20">
                  <div
                    className="group relative flex h-full rotate-1 flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl p-6 text-center text-white shadow-2xl"
                    style={{ background: "radial-gradient(120% 100% at 30% 20%, rgba(88,28,135,0.92), rgba(30,10,60,0.95))" }}
                  >
                    <CardDoodles variant={0} count={3} />
                    <ExtraDecorations />
                    <div className="absolute -top-3 left-1/2 h-8 w-4 -translate-x-1/2 rounded-sm bg-amber-300/30" />
                    <div className="relative z-10 space-y-1.5">
                      <h3 className="font-instrument-serif text-2xl italic text-white">{t("joinWall")}</h3>
                      <p className="mx-auto max-w-48 text-xs text-white/50">{t("signInPrompt")}</p>
                    </div>
                    <GuestbookAuthCta />
                  </div>
                </div>

                {/* Card 2: Merrick Hayes message - nhiều decorations */}
                <div className="relative z-20">
                  <article
                    className="group relative flex h-full rotate-2 scroll-mt-40 flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-2xl"
                    style={{ background: "radial-gradient(94% 78% at 50% 30%, rgba(39,61,180,0.9), rgba(15,9,38,0.9))" }}
                  >
                    <CardDoodles variant={1} count={4} />
                    <ExtraDecorations />
                    <div className="absolute -top-3 left-1/2 h-8 w-4 -translate-x-1/2 rounded-sm bg-cyan-300/30" />

                    <div className="relative z-10 flex h-full flex-col gap-8">
                      <div className="flex flex-1 items-center justify-center px-2 pt-2">
                        <p className="text-center text-lg leading-relaxed font-semibold whitespace-pre-line text-white/90">😍😍😍😍😍😍</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-[10px] text-white shadow-sm">
                            M
                          </span>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-wide text-white">Merrick Hayes</span>
                            <time className="font-mono text-[10px] text-white/60">Mar 19, 2026</time>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="inline-flex size-8 items-center justify-center rounded-md text-white/50 opacity-0 transition hover:bg-white/10 hover:text-white group-hover:opacity-100"
                          aria-label={t("shareEntry")}
                        >
                          <ShareIcon />
                        </button>
                      </div>
                    </div>
                  </article>
                </div>

                {entries.slice(2).map((entry, index) => {
                  const variant = noteVariants[(index + 2) % noteVariants.length];
                  return (
                    <article
                      key={`${entry.author}-${entry.date}-${index}`}
                      className={`group relative flex h-full ${variant.rotate} scroll-mt-40 flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-2xl`}
                      style={{ background: variant.bg }}
                    >
                      <CardDoodles variant={index + 2} count={2} />
                      <div className="absolute -top-3 left-1/2 h-8 w-4 -translate-x-1/2 rounded-sm bg-white/25" />

                      <div className="relative z-10 flex h-full flex-col gap-8">
                        <div className="flex flex-1 items-center justify-center px-2 pt-2">
                          <p className="text-center text-lg leading-relaxed font-semibold whitespace-pre-line text-white/90">{entry.message}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-[10px] text-white shadow-sm">
                              {entry.initials}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold tracking-wide text-white">{entry.author}</span>
                              <time className="font-mono text-[10px] text-white/60">{entry.date}</time>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="inline-flex size-8 items-center justify-center rounded-md text-white/50 opacity-0 transition hover:bg-white/10 hover:text-white group-hover:opacity-100"
                            aria-label={t("shareEntry")}
                          >
                            <ShareIcon />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          <div
            aria-hidden
            className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />
        </div>
      </main>
    </>
  );
}