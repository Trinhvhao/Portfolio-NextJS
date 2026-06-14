// Hardcoded source-of-truth for the "Build a Blog with Next.js and MDX" guide.
// This mirrors the data defined inline inside `app/[locale]/blog/[slug]/page.tsx`
// so we can render the same article as both a styled page and a plain Markdown
// response from the `/[locale]/blog/[slug].md` route.

type ArticleSection = {
  id: string;
  title: string;
  depth?: 2 | 3;
  paragraphs: string[];
  codeTitle?: string;
  code?: string;
  codeLang?: string;
};

export const mdxArticleIntro: string[] = [
  "Every blog platform wants to be your landlord. You get a locked database, a fixed editor, and very little control over rendering.",
  "MDX with Next.js App Router flips that model: content lives in git, renders through your own React components, and deploys as static HTML wherever you want.",
  "This is the exact architecture behind this blog and why it stays portable.",
];

export const mdxArticleSections: ArticleSection[] = [
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
    code: `pnpm create next-app@latest mdx-blog --typescript --tailwind --app --src-dir=false
cd mdx-blog
pnpm add next-mdx-remote gray-matter reading-time`,
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
    code: `app/
  blog/
    page.tsx
    [slug]/page.tsx
content/
  blog/
    my-first-post.mdx
lib/
  blog.ts
  mdx.ts`,
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
    code: `export type Frontmatter = {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  cover?: string;
};

export function assertFrontmatter(data: Record<string, unknown>): Frontmatter {
  if (typeof data.title !== "string" || typeof data.excerpt !== "string" || typeof data.date !== "string") {
    throw new Error("Invalid frontmatter");
  }

  return {
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [],
    cover: typeof data.cover === "string" ? data.cover : undefined,
  };
}`,
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
    code: `import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export function getPostSlugs() {
  return fs.readdirSync(POSTS_DIR).filter((name) => name.endsWith(".mdx"));
}

export function getPostBySlug(slug: string) {
  const file = fs.readFileSync(path.join(POSTS_DIR, \`\${slug}.mdx\`), "utf8");
  const { data, content } = matter(file);

  return {
    slug,
    frontmatter: assertFrontmatter(data),
    content,
    readingTime: readingTime(content).text,
  };
}`,
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
    code: `import { MDXRemote } from "next-mdx-remote/rsc";
`,
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
    code: `import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/callout";

export const mdxComponents: MDXComponents = {
  Callout,
  Image: (props) => <Image className="rounded-lg" sizes="(max-width: 768px) 100vw, 672px" {...props} />,
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
};`,
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

export function buildHardcodedGuideMarkdown(post: { title: string; excerpt: string; dateLabel: string }): string {
  const lines: string[] = [];
  lines.push(`# ${post.title}`, "");
  lines.push(`> ${post.excerpt}`, "");
  lines.push(`_Published: ${post.dateLabel}_`, "");

  for (const paragraph of mdxArticleIntro) {
    lines.push(paragraph, "");
  }

  for (const section of mdxArticleSections) {
    const heading = "#".repeat(section.depth ?? 2);
    lines.push(`${heading} ${section.title}`, "");

    for (const paragraph of section.paragraphs) {
      lines.push(paragraph, "");
    }

    if (section.code) {
      const title = section.codeTitle ? ` **${section.codeTitle}**` : "";
      const lang = section.codeLang ?? "";
      lines.push(`${title}`, "");
      lines.push("```" + lang, section.code, "```", "");
    }
  }

  return lines.join("\n");
}
