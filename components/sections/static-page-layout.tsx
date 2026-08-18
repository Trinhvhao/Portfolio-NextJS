import type { StaticPageContent } from "@/lib/static-page-content";

type StaticPageLayoutProps = {
  content: StaticPageContent;
  children?: React.ReactNode;
};

export function StaticPageLayout({ content, children }: StaticPageLayoutProps) {
  return (
    <article className="mx-auto w-full max-w-3xl space-y-10 pt-12">
      <header className="space-y-4">
        <p className="font-mono text-xs tracking-[0.22em] text-neutral-500 uppercase">{content.eyebrow}</p>
        <h1 className="font-instrument-serif text-5xl leading-tight text-neutral-100 sm:text-6xl">{content.title}</h1>
        <p className="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">{content.intro}</p>
        {content.updatedAt && <p className="font-mono text-xs text-neutral-500">Last updated: {content.updatedAt}</p>}
      </header>

      <div className="space-y-8">
        {content.sections.map((section) => (
          <section key={section.title} className="rounded-2xl border border-neutral-800 bg-neutral-900/35 p-6">
            <h2 className="text-xl font-medium text-neutral-100 sm:text-2xl">{section.title}</h2>
            <div className="mt-3 space-y-3 text-[15px] leading-7 text-neutral-300">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-neutral-300 marker:text-neutral-500">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {children}
    </article>
  );
}
