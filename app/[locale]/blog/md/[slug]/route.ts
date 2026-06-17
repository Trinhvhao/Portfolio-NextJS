import { notFound } from "next/navigation";

import { blogPosts } from "@/lib/blog-data";
import { buildHardcodedGuideMarkdown } from "@/lib/blog-article-data";
import { getPostBySlug, getPostExists } from "@/lib/content";

type RouteContext = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  const locales = ["en", "vi"];
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({ slug: post.slug, locale }))
  );
}

function buildHardcodedFrontmatter(post: (typeof blogPosts)[number]): string {
  const tags = post.tags.map((tag) => `"${tag}"`).join(", ");
  return [
    "---",
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `excerpt: "${post.excerpt.replace(/"/g, '\\"')}"`,
    `date: "${post.dateISO}"`,
    post.tags.length ? `tags: [${tags}]` : "",
    "---",
    "",
  ]
    .filter(Boolean)
    .join("\n");
}

function assembleHardcodedGuideMarkdown(post: (typeof blogPosts)[number]): string {
  const body = buildHardcodedGuideMarkdown(post);
  return `${buildHardcodedFrontmatter(post)}${body}`;
}

function assembleFilePostMarkdown(slug: string): string | null {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const tags = (post.frontmatter.tags ?? []).map((tag) => `"${tag}"`).join(", ");
  const frontmatter = [
    "---",
    `title: "${post.frontmatter.title.replace(/"/g, '\\"')}"`,
    `excerpt: "${post.frontmatter.excerpt.replace(/"/g, '\\"')}"`,
    `date: "${post.frontmatter.date}"`,
    tags ? `tags: [${tags}]` : "",
    "---",
    "",
  ]
    .filter(Boolean)
    .join("\n");

  return `${frontmatter}${post.content.trim()}\n`;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug, locale } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  let markdown: string | null = null;

  if (slug === "build-a-blog-with-nextjs-and-mdx") {
    markdown = assembleHardcodedGuideMarkdown(post);
  } else if (getPostExists(slug)) {
    markdown = assembleFilePostMarkdown(slug);
  }

  if (!markdown) {
    notFound();
  }

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Vary: "Accept",
    },
  });
}
