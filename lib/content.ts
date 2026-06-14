import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Frontmatter = {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  cover?: string;
};

export type BlogPostContent = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  readingTime: string;
};

// Resolved once at module load. The build-time NFT warning is suppressed
// via `turbopack.ignoreIssue` in next.config.ts because the project
// intentionally traces files under `content/blog` at runtime.
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  return fs.readdirSync(POSTS_DIR).filter((name) => name.endsWith(".mdx") || name.endsWith(".md"));
}

export function getAllPosts(): BlogPostContent[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.mdx?$/, "")))
    .filter((post): post is BlogPostContent => post !== null);

  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

export function getPostBySlug(slug: string): BlogPostContent | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);

  let filePath: string;
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const readingTimeText = readingTime(content).text;

  return {
    slug,
    frontmatter: {
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      date: data.date ? String(data.date) : "",
      tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [],
      cover: typeof data.cover === "string" ? data.cover : undefined,
    },
    content,
    readingTime: readingTimeText,
  };
}

export function getPostExists(slug: string): boolean {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  return fs.existsSync(mdxPath) || fs.existsSync(mdPath);
}
