import { promises as fs } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectFrontmatter = {
  title: string;
  description: string;
  type: string;
  role: string;
  built: string;
  updated: string;
  heroImage: string;
  stack: string[];
  visitLabel?: string;
  visitHref?: string;
  downloadLabel?: string;
  downloadHref?: string;
  sourceLabel?: string;
  sourceHref?: string;
};

export type ProjectSection = {
  title: string;
  content: ReactNode;
  breakoutBlocks: ReactNode[];
};

function stripFrontmatter(source: string): string {
  return source.replace(/^---[\s\S]*?---\s*/, "");
}

async function compileSectionBody(body: string) {
  const { content } = await compileMDX({
    source: body.trim(),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}

function extractBreakoutSources(body: string): { cleanedBody: string; breakoutSources: string[] } {
  const lines = body.split("\n");
  const breakoutSources: string[] = [];
  const keptLines: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^!\[[^\]]*\]\([^\)]+\)$/.test(trimmed)) {
      breakoutSources.push(trimmed);
      continue;
    }

    if (trimmed.startsWith('<div className="not-prose')) {
      const blockLines: string[] = [line];
      let depth = (trimmed.match(/<div\b/g) ?? []).length - (trimmed.match(/<\/div>/g) ?? []).length;

      while (depth > 0 && i + 1 < lines.length) {
        i += 1;
        const nextLine = lines[i];
        blockLines.push(nextLine);

        const openCount = (nextLine.match(/<div\b/g) ?? []).length;
        const closeCount = (nextLine.match(/<\/div>/g) ?? []).length;
        depth += openCount - closeCount;
      }

      breakoutSources.push(blockLines.join("\n").trim());
      continue;
    }

    keptLines.push(line);
  }

  const cleanedBody = keptLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  return { cleanedBody, breakoutSources };
}

async function parseSectionsFromMarkdown(markdown: string): Promise<ProjectSection[]> {
  const headingRegex = /^##\s+(.+)$/gm;
  const matches = Array.from(markdown.matchAll(headingRegex));

  if (matches.length === 0) {
    return [];
  }

  const sections: ProjectSection[] = [];

  for (let index = 0; index < matches.length; index += 1) {
    const current = matches[index];
    const next = matches[index + 1];
    const title = current[1].trim();
    const bodyStart = (current.index ?? 0) + current[0].length;
    const bodyEnd = next?.index ?? markdown.length;
    const body = markdown.slice(bodyStart, bodyEnd).trim();
    const { cleanedBody, breakoutSources } = extractBreakoutSources(body);
    const breakoutBlocks: ReactNode[] = [];

    if (!cleanedBody && breakoutSources.length === 0) {
      continue;
    }

    for (const source of breakoutSources) {
      breakoutBlocks.push(await compileSectionBody(source));
    }

    const content = cleanedBody ? await compileSectionBody(cleanedBody) : null;

    if (!content) {
      continue;
    }

    sections.push({
      title,
      content,
      breakoutBlocks,
    });
  }

  return sections;
}

export async function getProjectSlugs(): Promise<string[]> {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

export async function getProjectBySlug(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const markdownBody = stripFrontmatter(source);
    const sections = await parseSectionsFromMarkdown(markdownBody);

    const { content, frontmatter } = await compileMDX<ProjectFrontmatter>({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });

    return {
      slug,
      frontmatter,
      content,
      sections,
    };
  } catch {
    return null;
  }
}
