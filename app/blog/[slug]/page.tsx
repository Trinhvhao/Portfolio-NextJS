import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createHighlighter, type BuiltinLanguage, type BuiltinTheme } from "shiki";

import { blogPosts } from "@/lib/blog-data";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

type ArticleSection = {
  id: string;
  title: string;
  depth?: 2 | 3;
  paragraphs: string[];
  codeTitle?: string;
  code?: string;
  codeLang?: string;
};

type TocItem = {
  id: string;
  title: string;
  depth: 2 | 3;
};

type TocGroup = {
  id: string;
  title: string;
  children: Array<{ id: string; title: string }>;
};

const SHIKI_THEME: BuiltinTheme = "github-dark";
const SHIKI_LANGS = ["bash", "ts", "tsx", "text"] as const;
const SHIKI_LANG_SET = new Set<string>(SHIKI_LANGS);

const highlighterPromise = createHighlighter({
  themes: [SHIKI_THEME],
  langs: SHIKI_LANGS as unknown as BuiltinLanguage[],
});

async function highlightCode(code: string, lang: string): Promise<string> {
  const highlighter = await highlighterPromise;
  const normalizedLang = SHIKI_LANG_SET.has(lang) ? (lang as BuiltinLanguage) : ("text" as BuiltinLanguage);

  return highlighter.codeToHtml(code, {
    lang: normalizedLang,
    theme: SHIKI_THEME,
  });
}

const mdxArticleSections: ArticleSection[] = [
  {
    id: "the-stack-three-packages-thats-it",
    title: "The stack (three packages, that's it)",
    depth: 2,
    paragraphs: [
      "Before we scaffold anything, install only what you actually need: next-mdx-remote for server-side MDX rendering, gray-matter for frontmatter parsing, and reading-time for metadata.",
      "That is enough to ship a clean content system without a CMS SDK, GraphQL layer, or database.",
    ],
    codeTitle: "Terminal",
    codeLang: "bash",
    code: `pnpm create next-app@latest mdx-blog --typescript --tailwind --app --src-dir=false\ncd mdx-blog\npnpm add next-mdx-remote gray-matter reading-time`,
  },
  {
    id: "project-structure",
    title: "Project structure",
    depth: 2,
    paragraphs: [
      "Keep your routes and content maps obvious: posts stay in content/blog and route handlers in app/blog.",
      "The cleaner your folder mapping, the easier it is to generate lists, static params, and SEO metadata from files.",
    ],
    codeTitle: "Folder Layout",
    codeLang: "text",
    code: `app/\n  blog/\n    page.tsx\n    [slug]/page.tsx\ncontent/\n  blog/\n    my-first-post.mdx\nlib/\n  blog.ts\n  mdx.ts`,
  },
  {
    id: "frontmatter-contract",
    title: "Frontmatter contract",
    depth: 2,
    paragraphs: [
      "Define a strict frontmatter shape once, then validate each post against it so your list and detail pages never drift.",
      "This makes dates, titles, descriptions, and cover images predictable for both rendering and metadata generation.",
    ],
    codeTitle: "lib/blog.ts",
    codeLang: "ts",
    code: `export type Frontmatter = {\n  title: string;\n  excerpt: string;\n  date: string;\n  tags?: string[];\n  cover?: string;\n};\n\nexport function assertFrontmatter(data: Record<string, unknown>): Frontmatter {\n  if (typeof data.title !== "string" || typeof data.excerpt !== "string" || typeof data.date !== "string") {\n    throw new Error("Invalid frontmatter");\n  }\n\n  return {\n    title: data.title,\n    excerpt: data.excerpt,\n    date: data.date,\n    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [],\n    cover: typeof data.cover === "string" ? data.cover : undefined,\n  };\n}`,
  },
  {
    id: "content-layer",
    title: "Content layer",
    depth: 2,
    paragraphs: [
      "The content layer reads files from content/blog, parses frontmatter, computes reading time, and returns typed objects for routes.",
      "This keeps routing and rendering clean while making content processing reusable across list pages, feeds, and metadata.",
    ],
    codeTitle: "lib/content.ts",
    codeLang: "ts",
    code: `import fs from "node:fs";\nimport path from "node:path";\nimport matter from "gray-matter";\nimport readingTime from "reading-time";\n\nconst POSTS_DIR = path.join(process.cwd(), "content", "blog");\n\nexport function getPostSlugs() {\n  return fs.readdirSync(POSTS_DIR).filter((name) => name.endsWith(".mdx"));\n}\n\nexport function getPostBySlug(slug: string) {\n  const file = fs.readFileSync(path.join(POSTS_DIR, \`\${slug}.mdx\`), "utf8");\n  const { data, content } = matter(file);\n\n  return {\n    slug,\n    frontmatter: assertFrontmatter(data),\n    content,\n    readingTime: readingTime(content).text,\n  };\n}`,
  },
  {
    id: "blog-listing-page",
    title: "Blog listing page",
    depth: 2,
    paragraphs: [
      "The listing route can be a tiny server component: load all posts, sort by date descending, and render cards with title, summary, and metadata.",
      "This is where file-based content feels best: no API calls and no stale cache synchronization logic.",
    ],
  },
  {
    id: "rendering-mdx-in-app-router",
    title: "Article page",
    depth: 2,
    paragraphs: [
      "In App Router, compile post source in the server route and pass custom MDX components for headings, code blocks, links, and callouts.",
      "This keeps authored content in MDX while preserving your site design language in React components.",
    ],
    codeTitle: "app/blog/[slug]/page.tsx",
    codeLang: "tsx",
    code: `import { MDXRemote } from "next-mdx-remote/rsc";\n\nexport default async function PostPage({ params }: { params: { slug: string } }) {\n  const post = await getPostBySlug(params.slug);\n\n  return (\n    <article className="prose prose-neutral">\n      <MDXRemote source={post.content} components={mdxComponents} />\n    </article>\n  );\n}`,
  },
  {
    id: "custom-components",
    title: "Custom components",
    depth: 2,
    paragraphs: [
      "This is where MDX beats plain markdown: pass React components into the renderer and use them directly inside writing.",
      "Callouts, responsive images, tabbed examples, and embedded demos all become first-class content blocks.",
    ],
  },
  {
    id: "the-components-map",
    title: "The components map",
    depth: 3,
    paragraphs: [
      "Define a single components map and keep it strongly typed so JSX tags in MDX resolve consistently.",
    ],
    codeTitle: "lib/mdx-components.tsx",
    codeLang: "tsx",
    code: `import Image from "next/image";\nimport type { MDXComponents } from "mdx/types";\nimport { Callout } from "@/components/callout";\n\nexport const mdxComponents: MDXComponents = {\n  Callout,\n  Image: (props) => <Image className="rounded-lg" sizes="(max-width: 768px) 100vw, 672px" {...props} />,\n  a: ({ href, children, ...props }) => (\n    <a\n      href={href}\n      target={href?.startsWith("http") ? "_blank" : undefined}\n      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}\n      {...props}\n    >\n      {children}\n    </a>\n  ),\n};`,
  },
  {
    id: "a-callout-component",
    title: "A Callout component",
    depth: 3,
    paragraphs: [
      "A minimal callout component handles info, warning, and success messages while keeping prose visually consistent.",
    ],
  },
  {
    id: "wiring-it-up",
    title: "Wiring it up",
    depth: 3,
    paragraphs: [
      "Render with MDXRemote in the article route and pass your components map. If a slug is missing, call notFound() for a clean 404.",
    ],
  },
  {
    id: "styling-the-prose",
    title: "Styling the prose",
    depth: 2,
    paragraphs: [
      "Use a focused typography layer for paragraphs, heading rhythm, and code block spacing instead of ad-hoc classes per post.",
      "Once the base is stable, your content authorship flow becomes predictable and fast.",
    ],
  },
];

const mdxArticleIntro = [
  "Every blog platform wants to be your landlord. You get a locked database, a fixed editor, and very little control over rendering.",
  "MDX with Next.js App Router flips that model: content lives in git, renders through your own React components, and deploys as static HTML wherever you want.",
  "This is the exact architecture behind this blog and why it stays portable.",
];

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

function buildTocGroups(items: TocItem[]): TocGroup[] {
  const groups: TocGroup[] = [];
  let currentGroup: TocGroup | null = null;

  items.forEach((item) => {
    if (item.depth === 2) {
      currentGroup = {
        id: item.id,
        title: item.title,
        children: [],
      };
      groups.push(currentGroup);
      return;
    }

    if (currentGroup) {
      currentGroup.children.push({ id: item.id, title: item.title });
    }
  });

  return groups;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  const isMdxGuide = post.slug === "build-a-blog-with-nextjs-and-mdx";

  const tocItems: TocItem[] = isMdxGuide
    ? mdxArticleSections.map((section) => ({
        id: section.id,
        title: section.title,
        depth: (section.depth ?? 2) as 2 | 3,
      }))
    : [{ id: "overview", title: "Overview", depth: 2 as const }];

  const tocGroups = buildTocGroups(tocItems);
  const highlightedCodeBySection = new Map<string, string>();

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
                    Home
                  </Link>
                </li>
                <li className="contents">
                  <span className="size-3">›</span>
                  <Link href="/blog" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-300">
                    Blog
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
                  <button type="button" className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1.5 text-xs tracking-wide text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200">
                    Copy Page
                  </button>
                  <span className="w-px self-stretch bg-neutral-800" />
                  <button type="button" className="px-2 py-2 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200">
                    ▼
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-dashed px-4 py-4 md:px-6">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/aayush.webp"
                    alt="Aayush Bharti"
                    width={32}
                    height={32}
                    className="size-8 rounded-full ring-1 ring-neutral-700"
                  />
                  <span className="text-sm font-medium text-neutral-200">Aayush Bharti</span>
                </div>
                <span className="text-neutral-700">/</span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-500">
                  <span>{post.dateLabel}</span>
                </div>
                <div className="ml-auto flex items-center gap-1.5 font-mono text-xs text-neutral-500">
                  <span>{post.readMinutes} min read</span>
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

                {!isMdxGuide ? (
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
                ) : (
                  <div className="space-y-6">
                    {mdxArticleIntro.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
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

                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}

                        {section.code && (
                          <figure className="group relative my-6 w-full min-w-0 overflow-hidden rounded-xl border border-neutral-800">
                            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/80 px-4 py-1.5">
                              <span className="truncate font-mono text-xs text-neutral-400">{section.codeTitle} {section.codeLang ? `(${section.codeLang})` : ""}</span>
                              <button type="button" aria-label="Copy code" className="rounded-lg p-1.5 text-neutral-500 transition-opacity hover:bg-neutral-800 hover:text-neutral-200 xl:opacity-0 xl:group-hover:opacity-100">
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
                )}
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
