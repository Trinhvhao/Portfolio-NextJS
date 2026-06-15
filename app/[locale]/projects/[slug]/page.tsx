import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { getProjectBySlug, getProjectSlugs } from "@/lib/project-content";

type DetailParams = { params: Promise<{ slug: string }> };

function SectionDivider() {
  return (
    <div aria-hidden className="flex w-full flex-col gap-4">
      <div className="border-t" />
      <div className="border-t" />
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ProjectSectionBlock({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="px-4 pt-8 md:px-6 lg:col-span-3 lg:py-16">
        <div className="sticky top-32 space-y-2">
          <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-600">{number}</span>
          <h2 className="font-bluu text-2xl tracking-wider text-neutral-900 dark:text-white">{title}</h2>
        </div>
      </div>

      <div aria-hidden className="hidden border-x border-dashed lg:col-span-1 lg:block" />

      <div className="px-4 py-8 md:px-6 lg:col-span-8 lg:py-16">
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-h3:scroll-mt-24 prose-img:rounded-2xl prose-img:ring-1 prose-img:ring-neutral-300/60 dark:prose-img:ring-neutral-700/60">
          {children}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DetailParams): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.frontmatter.title} | Projects`,
    description: project.frontmatter.description,
  };
}

export default async function ProjectDetailPage({ params }: DetailParams) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const t = await getTranslations("project");
  const tNav = await getTranslations("nav");

  if (!project) {
    notFound();
  }

  const { frontmatter, content, sections } = project;

  return (
    <main className="container relative flex flex-col max-sm:px-1">
      <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
        <div
          aria-hidden
          className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
        />

        <div className="relative col-span-1 min-w-0">
          <div
            className="absolute inset-0 z-[-1] h-80 w-full overflow-hidden bg-transparent dark:bg-neutral-950/55"
            style={{ maskImage: "linear-gradient(rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%)", opacity: 1 }}
          >
            <Image
              alt={frontmatter.title}
              className="pointer-events-none absolute inset-0 z-[-1] select-none object-cover"
              fill
              sizes="100vw"
              src={frontmatter.heroImage}
              priority
            />
          </div>

          <header className="mr-auto flex flex-col gap-y-5 px-4 pt-56 md:px-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                <li className="contents">
                  <Link className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-300" href="/">
                    {tNav("home")}
                  </Link>
                </li>
                <li className="contents">
                  <svg aria-hidden className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <Link className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-300" href="/projects">
                    {tNav("projects")}
                  </Link>
                </li>
                <li className="contents">
                  <svg aria-hidden className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="truncate text-neutral-600 dark:text-neutral-300">{frontmatter.title}</span>
                </li>
              </ol>
            </nav>

            <h1 className="font-bluu text-4xl">{frontmatter.title}</h1>
            <p className="max-w-2xl self-start text-base text-neutral-600 md:text-lg dark:text-neutral-400">{frontmatter.description}</p>
          </header>

          <div className="mt-8 border-y">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-4 py-8 md:px-6">
                <div>
                  <p className="mb-1.5 font-mono text-[10px] text-neutral-500 uppercase tracking-wider dark:text-neutral-500">{t("type")}</p>
                  <p className="font-medium text-sm text-neutral-800 dark:text-neutral-200">{frontmatter.type}</p>
                </div>
                <div>
                  <p className="mb-1.5 font-mono text-[10px] text-neutral-500 uppercase tracking-wider dark:text-neutral-500">{t("role")}</p>
                  <p className="font-medium text-sm text-neutral-800 dark:text-neutral-200">{frontmatter.role}</p>
                </div>
                <div>
                  <p className="mb-1.5 font-mono text-[10px] text-neutral-500 uppercase tracking-wider dark:text-neutral-500">{t("built")}</p>
                  <p className="font-medium text-sm text-neutral-800 dark:text-neutral-200">{frontmatter.built}</p>
                </div>
                <div>
                  <p className="mb-1.5 font-mono text-[10px] text-neutral-500 uppercase tracking-wider dark:text-neutral-500">{t("updated")}</p>
                  <p className="font-medium text-sm text-neutral-800 dark:text-neutral-200">{frontmatter.updated}</p>
                </div>

                {frontmatter.visitHref && frontmatter.visitLabel && (
                  <div>
                    <p className="mb-1.5 font-mono text-[10px] text-neutral-500 uppercase tracking-wider dark:text-neutral-500">{t("visit")}</p>
                    <a
                      className="inline-flex items-center gap-1 font-medium text-sm text-neutral-800 decoration-neutral-300 underline-offset-4 transition-colors hover:underline dark:text-neutral-200 dark:decoration-neutral-600"
                      href={frontmatter.visitHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {frontmatter.visitLabel}
                      <ExternalLinkIcon />
                    </a>
                  </div>
                )}

                {frontmatter.downloadHref && frontmatter.downloadLabel && (
                  <div>
                    <p className="mb-1.5 font-mono text-[10px] text-neutral-500 uppercase tracking-wider dark:text-neutral-500">{t("download")}</p>
                    <a
                      className="inline-flex items-center gap-1 font-medium text-sm text-neutral-800 decoration-neutral-300 underline-offset-4 transition-colors hover:underline dark:text-neutral-200 dark:decoration-neutral-600"
                      href={frontmatter.downloadHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {frontmatter.downloadLabel}
                      <ExternalLinkIcon />
                    </a>
                  </div>
                )}

                {frontmatter.sourceHref && frontmatter.sourceLabel && (
                  <div>
                    <p className="mb-1.5 font-mono text-[10px] text-neutral-500 uppercase tracking-wider dark:text-neutral-500">{t("source")}</p>
                    <a
                      className="inline-flex items-center gap-1 font-medium text-sm text-neutral-800 decoration-neutral-300 underline-offset-4 transition-colors hover:underline dark:text-neutral-200 dark:decoration-neutral-600"
                      href={frontmatter.sourceHref}
                      target={frontmatter.sourceHref.startsWith("/") ? "_self" : "_blank"}
                      rel={frontmatter.sourceHref.startsWith("/") ? undefined : "noopener noreferrer"}
                    >
                      <GithubIcon />
                      {frontmatter.sourceLabel}
                    </a>
                  </div>
                )}
              </div>

              <div className="border-t px-4 py-8 md:px-6 lg:border-t-0 lg:border-l">
                <p className="mb-3 font-mono text-[10px] text-neutral-500 uppercase tracking-wider dark:text-neutral-500">{t("techStack")}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {frontmatter.stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-md border border-white/[0.14] bg-neutral-900 px-2 py-1 font-mono text-[11px] text-neutral-300 shadow-border sm:px-2.5 sm:py-1.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <article>
            {sections.length > 0 ? (
              <>
                {sections.map((section, index) => {
                  const sectionNumber = String(index + 1).padStart(2, "0");

                  return (
                    <div key={`${section.title}-${sectionNumber}`}>
                      {index > 0 ? <SectionDivider /> : null}
                      <ProjectSectionBlock number={sectionNumber} title={section.title}>
                        {section.content}
                      </ProjectSectionBlock>

                      {section.breakoutBlocks.map((block, breakoutIndex) => (
                        <div key={`${section.title}-${sectionNumber}-breakout-${breakoutIndex}`}>
                          <SectionDivider />
                          <div className="px-4 py-8 md:px-6 lg:py-12">
                            <div className="max-w-none [&_p]:m-0 [&_img]:w-full [&_img]:rounded-2xl [&_img]:ring-1 [&_img]:ring-neutral-300/60 dark:[&_img]:ring-neutral-700/60">
                              {block}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="px-4 py-10 md:px-6 md:py-14">
                <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bluu prose-h2:text-3xl prose-h2:tracking-wide prose-h2:scroll-mt-24 prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-img:rounded-2xl prose-img:ring-1 prose-img:ring-neutral-300/60 dark:prose-img:ring-neutral-700/60">
                  {content}
                </div>
              </div>
            )}
          </article>

          <SectionDivider />
        </div>

        <div
          aria-hidden
          className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
        />
      </div>
    </main>
  );
}
