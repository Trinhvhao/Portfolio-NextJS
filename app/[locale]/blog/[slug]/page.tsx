import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Root, RootContent, Code } from "mdast";

import { blogPosts } from "@/lib/blog-data";
import { getPostBySlug, getPostExists } from "@/lib/content";
import { extractHeadings, buildTocGroups, slugify } from "@/lib/toc";
import { mdxArticleIntro, mdxArticleSections } from "@/lib/blog-article-data";
import { MdxCodeBlock } from "@/components/ui/mdx-code-block";
import { PostShareMenu } from "@/components/ui/post-share-menu";
import { getTranslations } from "next-intl/server";

type BlogPostPageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

const SHIKI_THEME = "github-dark";

type CodeBlockData = { html: string; code: string; lang: string };

type MdxJsxAttribute = { type: "mdxJsxAttribute"; name: string; value: unknown };
type MdxJsxFlowElement = {
  type: "mdxJsxFlowElement";
  name: string | null;
  attributes: MdxJsxAttribute[];
  children: RootContent[];
};

function remarkCodeToJsx(getCodeData: (code: string, lang: string) => CodeBlockData) {
  return () => {
    return (tree: Root) => {
      const codeNodes: Array<{ index: number; node: Code }> = [];

      tree.children.forEach((node: RootContent, i: number) => {
        if (node.type === "code") {
          codeNodes.push({ index: i, node: node as Code });
        }
      });

      for (const { index, node } of codeNodes) {
        const lang: string = node.lang ?? "text";
        const rawCode: string = node.value ?? "";
        const data = getCodeData(rawCode, lang);

        const jsxNode: MdxJsxFlowElement = {
          type: "mdxJsxFlowElement",
          name: "MdxCodeBlock",
          attributes: [
            { type: "mdxJsxAttribute", name: "html", value: data.html },
            { type: "mdxJsxAttribute", name: "code", value: data.code },
            { type: "mdxJsxAttribute", name: "label", value: data.lang },
          ],
          children: [],
        };

        tree.children.splice(index, 1, jsxNode as unknown as RootContent);
      }
    };
  };
}

function MdxHeading({ level, children }: { level: 2 | 3; children: React.ReactNode }) {
  const text = String(children);
  const id = slugify(text);
  const Tag = `h${level}` as "h2" | "h3";
  return (
    <Tag id={id} className="group scroll-mt-24">
      <a href={`#${id}`} className="no-underline">
        {children}
      </a>
    </Tag>
  );
}

const VALID_LANGS = new Set(["bash", "ts", "tsx", "text", "py", "js", "jsx", "css", "html", "json", "yaml", "md", "sql"]);

async function highlightCode(code: string, lang: string): Promise<string> {
  const normalizedLang = VALID_LANGS.has(lang) ? lang : "text";
  return codeToHtml(code, { lang: normalizedLang, theme: SHIKI_THEME });
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
      <path d="M7.5 7.5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 12.5h-.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.5a2 2 0 0 1 2 2v.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function TocIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4 text-neutral-500">
      <path d="M3.5 5.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 10h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 14.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export async function generateStaticParams() {
  const locales = ["en", "vi"];
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      slug: post.slug,
      locale,
    }))
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    alternates: {
      types: {
        "text/markdown": `/${locale}/blog/${slug}.md`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  if (!post) {
    notFound();
  }

  const hasMdxContent = getPostExists(slug);
  const isHardcodedMdxGuide = post.slug === "build-a-blog-with-nextjs-and-mdx";
  const isMdxGuide = isHardcodedMdxGuide;

  const postContent = hasMdxContent ? await getPostBySlug(slug) : null;

  const tocItems = isMdxGuide
    ? mdxArticleSections.map((section) => ({
        id: section.id,
        title: section.title,
        depth: (section.depth ?? 2) as 2 | 3,
      }))
    : hasMdxContent && postContent
      ? extractHeadings(postContent.content)
      : [{ id: "overview", title: "Overview", depth: 2 as const }];

  const tocGroups = buildTocGroups(tocItems);
  const highlightedCodeBySection = new Map<string, string>();

  // Build absolute URLs for share links from the incoming request.
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? "localhost:3000";
  const protocol = headerStore.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const postUrl = `${protocol}://${host}/${locale}/blog/${slug}`;
  const markdownUrl = `/${locale}/blog/${slug}.md`;

  if (isMdxGuide) {
    const highlightedSections = await Promise.all(
      mdxArticleSections
        .filter((section) => section.code)
        .map(async (section) => [section.id, await highlightCode(section.code ?? "", section.codeLang ?? "text")] as const),
    );

    highlightedSections.forEach(([sectionId, html]) => {
      highlightedCodeBySection.set(sectionId, html);
    });
  }

  let compiledMdx: React.ReactElement | null = null;

  if (hasMdxContent && postContent) {
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    const rawCodeBlocks: { lang: string; code: string }[] = [];
    postContent.content.replace(codeBlockRegex, (_full, lang, rawCode) => {
      rawCodeBlocks.push({ lang: lang || "text", code: rawCode.trimEnd() });
      return "";
    });

    const highlightedBlocks = await Promise.all(
      rawCodeBlocks.map(({ lang, code }) =>
        codeToHtml(code, { lang: VALID_LANGS.has(lang) ? lang : "text", theme: SHIKI_THEME }).then((html) => ({
          html,
          code,
          lang,
        })),
      ),
    );

    const getCodeData = (code: string, lang: string): CodeBlockData => {
      const found = highlightedBlocks.find((b) => b.code === code && b.lang === lang);
      if (found) return found;
      return { html: "", code, lang };
    };

    const { content } = await compileMDX({
      source: postContent.content,
      components: {
        MdxCodeBlock,
        h2: ({ children }: { children: React.ReactNode }) => <MdxHeading level={2}>{children}</MdxHeading>,
        h3: ({ children }: { children: React.ReactNode }) => <MdxHeading level={3}>{children}</MdxHeading>,
      },
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkCodeToJsx(getCodeData)],
        },
      },
    });

    compiledMdx = content;
  }

  return (
    <main className="relative pb-24">
      <div
        className="absolute inset-0 z-[-1] h-80 w-full overflow-hidden bg-transparent dark:bg-neutral-950/60"
        style={{
          maskImage: "linear-gradient(rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%)",
          opacity: 1,
        }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="100vw"
          className="pointer-events-none absolute inset-0 z-[-1] h-[450px] w-full select-none object-cover mix-blend-overlay halftone"
          priority
        />
      </div>

      <div aria-hidden="true" className="relative pt-64" />

      <div className="container relative flex flex-col max-sm:px-1">
        <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
          <div
            aria-hidden="true"
            className="w-full border-x bg-size-[5px_5px] [mask-image:linear-gradient(to_bottom,transparent,black_10rem)] bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />

          <div className="relative col-span-1 min-w-0 pb-20">
            <nav aria-label="Breadcrumb" className="mx-4 mb-6 md:mx-6">
              <ol className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                <li className="contents">
                  <Link href="/" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-300">
                    {tNav("home")}
                  </Link>
                </li>
                <li className="contents">
                  <span className="size-3">›</span>
                  <Link href="/blog" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-300">
                    {tNav("blog")}
                  </Link>
                </li>
                <li className="contents">
                  <span className="size-3">›</span>
                  <span className="truncate text-neutral-600 dark:text-neutral-300">{post.title}</span>
                </li>
              </ol>
            </nav>

            <header>
              <h1 className="px-4 font-instrument-serif text-4xl tracking-wide text-white md:px-6 md:text-6xl">{post.title}</h1>
              <div className="mt-5 flex flex-col items-end gap-4 px-4 sm:flex-row sm:items-end sm:justify-between md:px-6">
                <p className="max-w-2xl self-start text-lg leading-relaxed text-neutral-400">{post.excerpt}</p>
                <div className="inline-flex shrink-0 items-center overflow-hidden rounded-lg border border-neutral-700 bg-neutral-950/40 shadow-border transition-colors hover:border-neutral-600">
                  <PostShareMenu postUrl={postUrl} postTitle={post.title} markdownUrl={markdownUrl} />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-dashed px-4 py-4 md:px-6">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/z6715827947073_b0cf72fee8964b9ea4fd8eddd2b10e6c.jpg"
                    alt="Trinh Van Hao"
                    width={32}
                    height={32}
                    className="size-8 rounded-full ring-1 ring-neutral-700"
                  />
                  <span className="text-sm font-medium text-neutral-200">Trinh Van Hao</span>
                </div>
                <span className="text-neutral-700">/</span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-500">
                  <span suppressHydrationWarning>
                    {postContent?.frontmatter.date
                      ? new Date(postContent.frontmatter.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : post.dateLabel}
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-1.5 font-mono text-xs text-neutral-500">
                  <span>{postContent?.readingTime ?? `${post.readMinutes} min read`}</span>
                </div>
              </div>
            </header>

            <div className="relative mt-8 flex gap-14 px-4 md:px-6">
              <article className="min-w-0 flex-1 overflow-x-hidden text-[15px] leading-7 text-neutral-300">
                <nav aria-label="Table of contents" className="mb-10 rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 xl:hidden">
                  <p className="mb-3 flex items-center gap-2 text-xl text-neutral-200">
                    <TocIcon />
                    <span>On this page</span>
                  </p>
                  <ul className="relative space-y-1 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-neutral-800/90">
                    {tocGroups.map((group) => (
                      <li key={group.id} className="relative pl-4">
                        <span aria-hidden="true" className="absolute left-0 top-4 h-px w-3 bg-neutral-800/90" />
                        <a
                          href={`#${group.id}`}
                          className="block rounded-md px-2 py-1 text-[17px] leading-8 text-neutral-400 transition-colors hover:bg-neutral-800/60 hover:text-neutral-100"
                        >
                          {group.title}
                        </a>

                        {group.children.length > 0 && (
                          <ul className="relative ml-4 mt-1 space-y-1 border-l border-neutral-800/90 pl-4">
                            {group.children.map((child) => (
                              <li key={child.id} className="relative pl-4">
                                <span aria-hidden="true" className="absolute left-0 top-4 h-px w-3 bg-neutral-800/90" />
                                <a
                                  href={`#${child.id}`}
                                  className="block rounded-md px-2 py-1 text-[17px] leading-8 text-neutral-400 transition-colors hover:bg-neutral-800/60 hover:text-neutral-100"
                                >
                                  {child.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                {!isMdxGuide && !hasMdxContent ? (
                  <section id="overview" className="space-y-4">
                    <p>
                      This article page is connected to the cloned blog index structure and keeps navigation functional while richer content sections are migrated.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 font-mono text-xs text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                ) : isMdxGuide ? (
                  <div className="space-y-6">
                    {mdxArticleIntro.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}

                    {mdxArticleSections.map((section) => (
                      <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
                        {section.depth === 3 ? (
                          <h3 className="group text-2xl text-white md:text-3xl">
                            <a className="no-underline" href={`#${section.id}`}>
                              {section.title}
                            </a>
                          </h3>
                        ) : (
                          <h2 className="group text-3xl text-white md:text-4xl">
                            <a className="no-underline" href={`#${section.id}`}>
                              {section.title}
                            </a>
                          </h2>
                        )}

                        {section.paragraphs.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}

                        {section.code && (
                          <figure className="group relative my-6 w-full min-w-0 overflow-hidden rounded-xl border border-neutral-800">
                            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/80 px-4 py-1.5">
                              <span className="truncate font-mono text-xs text-neutral-400">
                                {section.codeTitle} {section.codeLang ? `(${section.codeLang})` : ""}
                              </span>
                              <button
                                type="button"
                                aria-label={tCommon("copyCode")}
                                className="rounded-lg p-1.5 text-neutral-500 transition-opacity hover:bg-neutral-800 hover:text-neutral-200 xl:opacity-0 xl:group-hover:opacity-100"
                              >
                                <CopyIcon />
                              </button>
                            </div>
                            <div
                              className="overflow-x-auto bg-[linear-gradient(180deg,#0f1222_0%,#090b16_100%)] [&_.shiki]:!bg-transparent [&_.shiki]:m-0 [&_.shiki]:px-4 [&_.shiki]:py-4 [&_.shiki]:text-[13px] [&_.shiki]:leading-6"
                              dangerouslySetInnerHTML={{ __html: highlightedCodeBySection.get(section.id) ?? "" }}
                            />
                          </figure>
                        )}
                      </section>
                    ))}
                  </div>
                ) : compiledMdx ? (
                  <div className="space-y-4 [&_h2]:scroll-mt-24 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:md:text-4xl [&_h2]:mt-10 [&_h2:first-child]:mt-0 [&_h3]:scroll-mt-24 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:md:text-3xl [&_h3]:mt-8 [&_p]:leading-7 [&_a]:text-neutral-300 [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-white [&_h2_a]:!no-underline [&_h3_a]:!no-underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_ul]:space-y-1 [&_li]:leading-7 [&_strong]:text-white [&_blockquote]:border-l-4 [&_blockquote]:border-neutral-700 [&_blockquote]:pl-4 [&_blockquote]:text-neutral-400 [&_blockquote]:italic [&_hr]:my-10 [&_hr]:border-neutral-800 [&_table]:w-full [&_table]:border-collapse">
                    {compiledMdx}
                  </div>
                ) : null}
              </article>

              <aside className="hidden w-64 shrink-0 xl:block">
                <nav aria-label="Table of contents" className="sticky top-28 flex flex-col">
                  <div className="p-1">
                    <p className="mb-3 flex items-center gap-2 text-lg text-neutral-200">
                      <TocIcon />
                      <span>On this page</span>
                    </p>
                    <ul className="relative space-y-1 before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-neutral-800/90">
                      {tocGroups.map((group) => (
                        <li key={group.id} className="relative pl-4">
                          <span aria-hidden="true" className="absolute left-0 top-4 h-px w-3 bg-neutral-800/90" />
                          <a
                            href={`#${group.id}`}
                            className="block rounded-md px-2 py-1 text-[17px] leading-8 text-neutral-400 transition-colors hover:bg-neutral-800/70 hover:text-neutral-100"
                          >
                            {group.title}
                          </a>

                          {group.children.length > 0 && (
                            <ul className="relative ml-4 mt-1 space-y-1 border-l border-neutral-800/90 pl-4">
                              {group.children.map((child) => (
                                <li key={child.id} className="relative pl-4">
                                  <span aria-hidden="true" className="absolute left-0 top-4 h-px w-3 bg-neutral-800/90" />
                                  <a
                                    href={`#${child.id}`}
                                    className="block rounded-md px-2 py-1 text-[17px] leading-8 text-neutral-500 transition-colors hover:bg-neutral-800/70 hover:text-neutral-100"
                                  >
                                    {child.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </aside>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="w-full border-x bg-size-[5px_5px] [mask-image:linear-gradient(to_bottom,transparent,black_10rem)] bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />
        </div>
      </div>
    </main>
  );
}
