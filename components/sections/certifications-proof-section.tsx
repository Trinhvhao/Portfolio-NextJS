import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { TypedRouteText } from "@/components/ui/typed-route-text";
import { certificationItems, certificationsHeader } from "@/lib/about-data";

const CATEGORY_KEY_MAP: Record<string, string> = {
  Certification: "certification",
  Publication: "publication",
  Talk: "talk",
  Hackathon: "hackathon",
};

function CategoryPill({ category, label }: { category: "Certification" | "Publication" | "Talk" | "Hackathon"; label: string }) {
  const colorClass =
    category === "Certification"
      ? "text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/30"
      : category === "Publication"
        ? "text-[#22d3ee] bg-[#22d3ee]/10 border-[#22d3ee]/30"
        : category === "Talk"
          ? "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30"
          : "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/30";

  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase ${colorClass}`}>{label}</span>;
}

export async function CertificationsProofSection() {
  const t = await getTranslations("certifications");

  return (
    <section className="mx-auto w-full px-5" aria-labelledby="certifications-heading">
      <div className="text-center">
        <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">{certificationsHeader.eyebrow}</p>
        <h2
          id="certifications-heading"
          className="relative z-2 mx-auto max-w-lg text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:text-5xl md:text-6xl"
          style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" }}
        >
          <span className="font-instrument-serif text-neutral-100">{certificationsHeader.titleStart} </span>
          <TypedRouteText text={certificationsHeader.titleAccent} triggerOnView className="animate-gradient-x font-instrument-serif italic tracking-tight text-colorfull" />
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
        {certificationItems.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-[22px] border border-white/8 bg-[#0b0b0c] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#111113]"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <CategoryPill category={item.category} label={t(`categories.${CATEGORY_KEY_MAP[item.category]}`)} />
              <span className="font-mono text-[11px] tracking-wide text-white/55">{t("issued")} {item.issuedAt}</span>
            </div>

            <h3 className="text-xl leading-tight tracking-wide text-white/90">{item.title}</h3>
            <p className="mt-2 text-sm text-white/60">{item.issuer}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/70">
              {item.credentialId ? <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono">ID: {item.credentialId}</span> : null}
              {item.credentialUrl ? (
                <Link
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/15 px-2 py-1 transition-colors hover:bg-white/10"
                >
                  {t("viewProof")}
                </Link>
              ) : (
                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">{t("internalProof")}</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
