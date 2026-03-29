export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/uses", label: "Uses" },
  { href: "/contact", label: "Contact" },
];

export const projects: ProjectItem[] = [
  {
    slug: "portfolio",
    title: "Portfolio",
    description:
      "Personal portfolio with motion-driven sections, content publishing, and strong performance focus.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    image: "/projects-images/portfolio/thumbnail.webp",
  },
  {
    slug: "finote",
    title: "Finote App",
    description:
      "Mobile-first finance companion for organizing wallets, tracking activity, and understanding money flow.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    image: "/projects-images/finote/thumbnail.webp",
  },
  {
    slug: "flux-lura",
    title: "Flux Lura",
    description:
      "Product experience focused on clean UX and conversion-ready interactions.",
    stack: ["Next.js", "Tailwind", "GSAP"],
    image: "/projects-images/flux-lura/thumbnail.webp",
  },
  {
    slug: "next-venture",
    title: "Next Venture",
    description:
      "Platform concept where founders can submit and discover startup ideas in a curated feed.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    image: "/projects-images/next-venture/thumbnail.webp",
  },
  {
    slug: "snippix",
    title: "Snippix",
    description:
      "Snippet and utility workspace with practical tools for developers.",
    stack: ["React", "TypeScript", "Vercel"],
    image: "/projects-images/snippix/thumbnail.webp",
  },
  {
    slug: "star-forge",
    title: "Star Forge",
    description:
      "Experimental product branding and frontend execution with bold visual direction.",
    stack: ["Next.js", "Tailwind", "Motion"],
    image: "/projects-images/star-forge/thumbnail.webp",
  },
  {
    slug: "zenith-minds",
    title: "Zenith Minds",
    description:
      "Learning platform concept for students and instructors with structured discovery.",
    stack: ["React", "TypeScript", "Firebase"],
    image: "/projects-images/zenith-minds/thumbnail.webp",
  },
];

export const blogPosts = [
  {
    slug: "tech-stack-2025-as-a-frontend-dev",
    title: "My 2025 Stack as a Frontend Developer",
    excerpt: "A practical stack for shipping polished web apps quickly.",
  },
  {
    slug: "how-to-build-a-blog-with-nextjs-and-mdx",
    title: "How to Build a Blog with Next.js and MDX",
    excerpt: "A direct walkthrough from content model to rendering.",
  },
  {
    slug: "learning-programming",
    title: "Learning Programming: Easy to Start, Hard to Master",
    excerpt: "How to stay consistent beyond the honeymoon phase.",
  },
];
