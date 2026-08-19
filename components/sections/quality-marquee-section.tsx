import { getTranslations } from "next-intl/server";

function StarIcon() {
  return (
    <svg fill="#fffff5" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" fill="#fffff5" />
    </svg>
  );
}

function MarqueeSegment({ tags, keyPrefix }: { tags: string[]; keyPrefix: string }) {
  return (
    <div className="flex shrink-0 justify-around [gap:var(--gap)] flex-row">
      {tags.map((item) => (
        <div key={`${keyPrefix}-${item}`} className="inline-flex items-center gap-2.5">
          <span className="text-nowrap font-instrument-serif text-sm leading-6 font-semibold tracking-wider text-gray-50 uppercase md:text-lg lg:text-xl">{item}</span>
          <StarIcon />
        </div>
      ))}
    </div>
  );
}

export async function QualityMarqueeSection() {
  const t = await getTranslations("qualityMarquee");
  const QUALITY_TAGS = [
    t("responsive"),
    t("clean"),
    t("rest"),
    t("learning"),
    t("teamPlayer"),
  ];

  return (
    <section className="home-content-auto-compact overflow-visible py-16 md:py-20" aria-label={t("ariaLabel")}>
      <div className="relative scale-[1.1]">
        <div aria-hidden className="z-0 translate-y-10 rotate-6 bg-linear-to-r from-[#6799fe] to-[#0a255b] py-4 opacity-60 md:rotate-3 lg:translate-y-16 lg:py-8" />
        <div className="-rotate-3 z-2 flex items-center justify-center overflow-visible bg-linear-to-r from-[#6799fe] to-[#0255fb] py-1.5 will-change-transform lg:py-2">
          <div className="group flex flex-row overflow-visible p-2 [--duration:50s] [--gap:1rem] [gap:var(--gap)] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row motion-reduce:animate-none">
              <MarqueeSegment tags={QUALITY_TAGS} keyPrefix="first" />
              <MarqueeSegment tags={QUALITY_TAGS} keyPrefix="second" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
