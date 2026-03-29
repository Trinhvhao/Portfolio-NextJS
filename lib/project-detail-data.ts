export type ProjectDetailSection = {
  id: string;
  title: string;
  paragraphs: string[];
  media?: {
    type: "single" | "grid";
    items: { src: string; alt: string; aspect?: string }[];
  };
};

export type ProjectDetail = {
  slug: string;
  title: string;
  description: string;
  type: string;
  role: string;
  built: string;
  updated: string;
  visit?: { label: string; href: string };
  download?: { label: string; href: string };
  source?: { label: string; href: string };
  stack: string[];
  heroImage: string;
  sections: ProjectDetailSection[];
};

const defaultSections: ProjectDetailSection[] = [
  {
    id: "why-i-built-this",
    title: "Why I Built This",
    paragraphs: [
      "I wanted to solve a real workflow problem with a product that feels practical, fast, and visually polished.",
      "This project gave me a space to combine product thinking, strong frontend architecture, and performance-first implementation.",
    ],
  },
  {
    id: "how-it-works",
    title: "How It Works",
    paragraphs: [
      "The experience is designed around clarity: simple actions, predictable flows, and immediate feedback.",
      "Data and UI are structured so users can move quickly without losing context.",
    ],
  },
  {
    id: "key-decisions",
    title: "Key Decisions",
    paragraphs: [
      "I prioritized maintainable architecture, predictable state updates, and responsive UI behavior.",
      "Each technical choice focused on long-term scalability without compromising delivery speed.",
    ],
  },
  {
    id: "what-i-learned",
    title: "What I Learned",
    paragraphs: [
      "Great product quality comes from balancing performance, UX detail, and reliable implementation patterns.",
      "Iterating quickly with strong foundations made the project easier to evolve.",
    ],
  },
];

export const projectDetailsBySlug: Record<string, ProjectDetail> = {
  "next-venture": {
    slug: "next-venture",
    title: "Next Venture",
    description:
      "A full-stack startup pitch platform built using cutting-edge Next.js features, Sanity CMS, and a sleek UI/UX experience.",
    type: "Web App",
    role: "Full-stack Developer",
    built: "Q1 2025",
    updated: "Q1 2025",
    visit: { label: "ab-next-venture.vercel.app", href: "https://ab-next-venture.vercel.app" },
    source: { label: "GitHub", href: "https://github.com/aayushbharti/next-venture" },
    stack: ["Next.js", "React", "Sanity CMS", "TypeScript", "Better Auth", "GROQ", "Sentry", "Markdown", "Tailwind CSS", "Motion.dev"],
    heroImage: "/projects-images/next-venture/screen1.jpeg",
    sections: [
      {
        id: "why-i-built-this",
        title: "Why I Built This",
        paragraphs: [
          "I wanted a project that pushed me into modern Next.js architecture with real data flows, not just docs-level understanding.",
          "A startup pitch platform was the perfect scope: authentication, user-generated content, discovery, and high-traffic feed pages.",
        ],
        media: {
          type: "single",
          items: [{ src: "/projects-images/next-venture/screen1.jpeg", alt: "Next Venture feed page", aspect: "aspect-video" }],
        },
      },
      {
        id: "how-it-works",
        title: "How It Works",
        paragraphs: [
          "Founders sign in, publish ideas, and browse a curated feed with content managed through Sanity CMS.",
          "The feed is optimized for fast loading while preserving dynamic behavior for logged-in users.",
        ],
      },
      {
        id: "key-decisions",
        title: "Key Decisions",
        paragraphs: [
          "Sanity CMS was selected for structured content workflows and editor-friendly publishing.",
          "Server-first data flow and optimized rendering patterns were chosen to keep UX fast at scale.",
        ],
      },
      {
        id: "what-i-learned",
        title: "What I Learned",
        paragraphs: [
          "Modern full-stack UX comes from tight integration between content modeling, rendering strategy, and auth boundaries.",
          "Performance and product quality both improve when architecture decisions are made early.",
        ],
      },
    ],
  },
  finote: {
    slug: "finote",
    title: "Finote - Master Your Finances",
    description:
      "A personal finance manager with multi-wallet support, real-time spending analytics, and receipt capture.",
    type: "Mobile App",
    role: "Mobile Developer",
    built: "Q4 2025",
    updated: "Q4 2025",
    download: { label: "Get Latest Release", href: "https://github.com/AayushBharti/finote-app/releases/" },
    source: { label: "GitHub", href: "https://github.com/aayushbharti/finote-app" },
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "Zod", "Zustand", "Cloudinary", "Reanimated", "Gifted Charts"],
    heroImage: "https://raw.githubusercontent.com/AayushBharti/finote-app/main/.github/images/img1.jpeg",
    sections: [
      {
        id: "why-i-built-this",
        title: "Why I Built This",
        paragraphs: [
          "Most finance apps felt either too complex or too limited. I wanted a tool that handled multi-wallet tracking with clear spending insight.",
          "Finote was also my deep mobile engineering exercise to master performance and interaction quality in React Native.",
        ],
      },
      {
        id: "how-it-works",
        title: "How It Works",
        paragraphs: [
          "Users create wallets, track categorized transactions, and attach receipts. A dashboard summarizes balances and trends in real time.",
          "Firebase powers auth and data sync, while Cloudinary handles optimized media upload and delivery.",
        ],
        media: {
          type: "grid",
          items: [
            { src: "https://raw.githubusercontent.com/AayushBharti/finote-app/main/.github/images/img1.jpeg", alt: "Finote home screen", aspect: "aspect-[3/4]" },
            { src: "https://raw.githubusercontent.com/AayushBharti/finote-app/main/.github/images/img2.jpeg", alt: "Finote analytics", aspect: "aspect-[3/4]" },
          ],
        },
      },
      {
        id: "key-decisions",
        title: "Key Decisions",
        paragraphs: [
          "Zustand was chosen for granular updates in wallet and chart state.",
          "Optimistic transaction flows and Blob uploads improved responsiveness and reduced perceived latency.",
        ],
      },
      {
        id: "what-i-learned",
        title: "What I Learned",
        paragraphs: [
          "Mobile UX quality depends heavily on animation smoothness and network-aware data flow.",
          "Choosing the right state model early keeps feature growth maintainable.",
        ],
      },
    ],
  },
  snippix: {
    slug: "snippix",
    title: "Snippix",
    description:
      "A powerful tool for sharing beautiful, customizable code snippets with flexible styling and export formats.",
    type: "Web App",
    role: "Full-stack Developer",
    built: "Q2 2025",
    updated: "Q2 2025",
    visit: { label: "snippix.vercel.app", href: "https://snippix.vercel.app" },
    source: { label: "GitHub", href: "https://github.com/aayushbharti/snippix" },
    stack: ["Next.js", "React", "Zustand", "TypeScript", "Shadcn UI", "Tailwind CSS", "Highlight.js", "React Hotkeys Hook"],
    heroImage: "/projects-images/snippix/screen1.png",
    sections: [
      {
        id: "why-i-built-this",
        title: "Why I Built This",
        paragraphs: [
          "I wanted a snippet tool that was actually fast for daily sharing workflows and not overloaded with friction.",
          "The goal was keyboard-friendly controls, sharp output quality, and fast customization.",
        ],
      },
      {
        id: "how-it-works",
        title: "How It Works",
        paragraphs: [
          "Users paste code, tune theme and layout, and export ready-to-share visuals.",
          "Syntax highlighting and export features are optimized for high fidelity between preview and final output.",
        ],
        media: {
          type: "single",
          items: [{ src: "/projects-images/snippix/screen1.png", alt: "Snippix editor interface", aspect: "aspect-video" }],
        },
      },
      {
        id: "key-decisions",
        title: "Key Decisions",
        paragraphs: [
          "Zustand provides isolated state updates for controls and preview components.",
          "DOM-to-image export was selected to keep visual parity between editor and generated asset.",
        ],
      },
      {
        id: "what-i-learned",
        title: "What I Learned",
        paragraphs: [
          "Good defaults reduce cognitive load far more than adding many options up front.",
          "Export reliability is a core product quality metric for creator tools.",
        ],
      },
    ],
  },
  "flux-lura": {
    slug: "flux-lura",
    title: "Flux Lura",
    description:
      "A free online tool for seamless multimedia conversion across image, audio, and video workflows.",
    type: "Web App",
    role: "Full-stack Developer",
    built: "2025",
    updated: "2025",
    visit: { label: "fluxlura.vercel.app", href: "https://fluxlura.vercel.app" },
    source: { label: "GitHub", href: "https://github.com/AayushBharti/Flux-Lura" },
    stack: ["Next.js", "React", "FFmpeg", "TypeScript", "Shadcn UI", "Tailwind CSS", "Motion.dev"],
    heroImage: "/projects-images/flux-lura/screen1.jpg",
    sections: defaultSections,
  },
  "star-forge": {
    slug: "star-forge",
    title: "StarForge - AI SaaS Template",
    description:
      "A sleek AI SaaS landing page built for strong visual storytelling and conversion-focused sections.",
    type: "Web App",
    role: "Frontend Developer",
    built: "2025",
    updated: "2025",
    visit: { label: "ai-saas-landing-starter.vercel.app", href: "https://ai-saas-landing-starter.vercel.app" },
    source: { label: "GitHub", href: "https://github.com/AayushBharti/ai-saas-landing-starter" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Parallax", "Vercel"],
    heroImage: "/projects-images/star-forge/screen1.jpeg",
    sections: defaultSections,
  },
  "zenith-minds": {
    slug: "zenith-minds",
    title: "Zenith Minds",
    description: "A learning platform concept connecting students and instructors through modern course experiences.",
    type: "Web App",
    role: "Full-stack Developer",
    built: "2025",
    updated: "2025",
    source: { label: "Project Overview", href: "/projects" },
    stack: ["Next.js", "React", "Node.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS"],
    heroImage: "/projects-images/zenith-minds/screen1.jpg",
    sections: defaultSections,
  },
  portfolio: {
    slug: "portfolio",
    title: "aayushbharti.in",
    description:
      "A full-stack portfolio platform with high-performance pages, publishing workflows, and polished interaction design.",
    type: "Web App",
    role: "Full-stack Developer",
    built: "2025",
    updated: "2025",
    visit: { label: "aayushbharti.in", href: "https://aayushbharti.in" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "MDX", "Zod", "Zustand"],
    heroImage: "/projects-images/portfolio/screen1.webp",
    sections: [
      {
        id: "why-i-built-this",
        title: "Why I Built This",
        paragraphs: [
          "I wanted a portfolio that works as both a product showcase and a scalable content platform.",
          "The goal was to combine visual quality, SEO performance, and maintainable architecture in one system.",
        ],
      },
      {
        id: "architecture-overview",
        title: "Architecture Overview",
        paragraphs: [
          "The site uses a modern React architecture with reusable UI primitives and content-first routing.",
          "Pages are optimized for loading speed, readability, and clean navigation across all sections.",
        ],
      },
      {
        id: "key-decisions",
        title: "Key Decisions",
        paragraphs: [
          "Server rendering and route-level optimization were prioritized for fast content delivery.",
          "Design tokens and utility-first styling kept the UI system consistent and scalable.",
        ],
      },
      {
        id: "what-i-learned",
        title: "What I Learned",
        paragraphs: [
          "Building a personal site like a product improves long-term quality and maintainability.",
          "Strong information architecture is as important as visuals in portfolio UX.",
        ],
      },
    ],
  },
  nextdemy: {
    slug: "nextdemy",
    title: "Nextdemy",
    description:
      "Full-stack EdTech platform with course marketplace, payments, video streaming, and role-based dashboards.",
    type: "Web App",
    role: "Full-stack Developer",
    built: "2025",
    updated: "2025",
    visit: { label: "academy.aayushbharti.in", href: "https://academy.aayushbharti.in" },
    source: { label: "GitHub", href: "https://github.com/AayushBharti/Zenith-Academy" },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Zustand", "Shadcn UI", "Motion.dev", "Express.js", "MongoDB"],
    heroImage: "/images/projects/zenith-minds/screen1.jpg",
    sections: defaultSections,
  },
  aayushbharti: {
    slug: "aayushbharti",
    title: "aayushbharti.in - Platform Case Study",
    description:
      "A full-stack developer portfolio with multi-format content pipeline and modern performance-focused architecture.",
    type: "Web App",
    role: "Full-stack Developer",
    built: "2025",
    updated: "2025",
    visit: { label: "aayushbharti.in", href: "https://aayushbharti.in" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Better Auth", "MDX", "Zod"],
    heroImage: "/projects-images/portfolio/screen1.webp",
    sections: defaultSections,
  },
};