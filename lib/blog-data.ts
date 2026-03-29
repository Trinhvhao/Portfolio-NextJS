export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  dateISO: string;
  dateLabel: string;
  readMinutes: number;
  image: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "terminal-first-dev-setup",
    title: "Every Tool in My Terminal-First Dev Setup",
    excerpt:
      "Neovim, Wezterm, Tmux, and the rest - what survived two years of daily use and why I picked each one over the obvious alternatives.",
    dateISO: "2025-10-19T00:00:00.000Z",
    dateLabel: "Oct 19, 2025",
    readMinutes: 11,
    image: "/images/blog/my-2025-stack/thumbnail.jpg",
    tags: ["developer-tools", "terminal", "neovim", "workflow"],
  },
  {
    slug: "build-a-blog-with-nextjs-and-mdx",
    title: "Build a Blog with Next.js and MDX from Scratch",
    excerpt:
      "File-based content, zero database, full control. A complete walkthrough of building a statically-generated blog with Next.js, MDX, and gray-matter.",
    dateISO: "2025-03-12T00:00:00.000Z",
    dateLabel: "Mar 12, 2025",
    readMinutes: 11,
    image: "/images/blog/how-to-build-a-blog-with-nextjs-and-mdx/cover.webp",
    tags: ["nextjs", "mdx", "react", "tutorial"],
  },
  {
    slug: "what-i-wish-i-knew-before-learning-to-code",
    title: "What I'd Tell Myself Before Learning to Code",
    excerpt:
      "The myths, mistakes, and mindset shifts that separate people who learn to code from people who quit. Hard-won lessons from my first two years.",
    dateISO: "2024-12-05T00:00:00.000Z",
    dateLabel: "Dec 05, 2024",
    readMinutes: 11,
    image: "/images/blog/learning-programming/cover.webp",
    tags: ["career", "learning", "developer-mindset"],
  },
];

export const blogTags: string[] = [
  "developer-tools",
  "terminal",
  "nextjs",
  "mdx",
  "react",
  "career",
];
