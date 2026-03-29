export type WorkItem = {
  id: string;
  index: string;
  type: string;
  title: string;
  period: string;
  href: string;
  description: string;
  detailDescription: string;
  highlights: string[];
  gradient: string;
  accentColor: string;
  image?: string;
  secondaryImage?: string;
  tags: string[];
};

export const workItems: WorkItem[] = [
  {
    id: "next-venture",
    index: "01",
    type: "Web App",
    title: "Next Ventures",
    period: "Q1 2025",
    href: "/projects/next-venture",
    description: "A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design",
    detailDescription:
      "A platform designed for early-stage entrepreneurs to pitch, browse, and engage with startup ideas. It's built to impress both users and investors with blazing speed, compelling visuals, and a modern tech stack.",
    highlights: [
      "Leveraged Partial Prerendering and After for faster loading.",
      "Simplified idea submission with a clean, intuitive design.",
      "Enhanced browsing with seamless performance optimization.",
    ],
    gradient: "linear-gradient(10deg, #DB2777 49.9%, #DB2777 81.7%, #F472B6 99.88%)",
    accentColor: "#EC4899",
    image: "/projects-images/next-venture/screen1.jpeg",
    tags: ["Next.js", "React", "Sanity CMS", "TypeScript", "Better Auth", "GROQ", "Sentry", "Markdown", "Tailwind CSS", "Motion.dev"],
  },
  {
    id: "finote",
    index: "02",
    type: "Mobile App",
    title: "Finote App",
    period: "Q4 2025",
    href: "/projects/finote",
    description: "An intuitive mobile companion for organizing your digital wallets and analyzing your financial health",
    detailDescription:
      "An intuitive mobile companion for organizing digital wallets, tracking spending behavior, and helping users make better financial decisions through clean and focused mobile UX.",
    highlights: [
      "Built a wallet-first experience with approachable mobile interactions.",
      "Presented spending insights in a clear format for everyday decisions.",
      "Focused on fast navigation with scalable state and data layers.",
    ],
    gradient: "linear-gradient(10deg, #7E22CE 49.9%, #7E22CE 81.7%, #C084FC 99.88%, #F9D793 113.5%)",
    accentColor: "#A855F7",
    tags: ["Expo", "TypeScript", "Firebase", "Zod", "Zustand", "Cloudinary", "Reanimated", "Gifted Charts"],
  },
  {
    id: "zenith-minds",
    index: "03",
    type: "Web App",
    title: "Zenith Minds",
    period: "2025",
    href: "/projects/zenith-minds",
    description: "A platform connecting students and instructors for enhanced learning experiences",
    detailDescription:
      "A modern learning platform that helps students and instructors collaborate effectively with course discovery, communication tools, and progress-aware workflows.",
    highlights: [
      "Improved course discovery and onboarding for new learners.",
      "Created instructor-friendly flows for content and engagement.",
      "Balanced performance and scalability for growing class activity.",
    ],
    gradient: "linear-gradient(10deg, #2932CB 49.9%, #2932CB 81.7%, #7980FF 99.88%, #F9D793 113.5%)",
    accentColor: "#3B82F6",
    image: "/projects-images/zenith-minds/screen1.jpg",
    tags: ["Next.js", "React", "Node.js", "Express.js", "Turborepo", "TypeScript", "MongoDB", "Razorpay", "Zustand", "Zod", "Tailwind CSS", "Motion.dev"],
  },
  {
    id: "snippix",
    index: "04",
    type: "Web App",
    title: "Snippix",
    period: "2025",
    href: "/projects/snippix",
    description: "A platform for creating and sharing code snippets with a clean and intuitive design",
    detailDescription:
      "A developer-focused snippet platform for creating, managing, and sharing reusable code snippets with fast search, clean editing ergonomics, and polished reading views.",
    highlights: [
      "Made snippet creation and sharing quick with minimal friction.",
      "Improved readability with keyboard-friendly interaction patterns.",
      "Shaped a scalable UI system for code-heavy surfaces.",
    ],
    gradient: "linear-gradient(10deg, #059669 49.9%, #059669 81.7%, #34D399 99.88%, #F9D793 113.5%)",
    accentColor: "#10B981",
    image: "/projects-images/snippix/screen1.png",
    tags: ["Next.js", "React", "Zustand", "TypeScript", "Shadcn UI", "Tailwind CSS", "Highlight.js", "React Hotkeys Hook"],
  },
  {
    id: "star-forge",
    index: "05",
    type: "Web App",
    title: "StarForge",
    period: "2025",
    href: "/projects/star-forge",
    description: "A sleek AI SaaS landing page with a user-friendly design that enhances engagement.",
    detailDescription:
      "A sleek AI SaaS marketing experience crafted for clarity, trust, and conversion with polished storytelling, premium visuals, and strong performance fundamentals.",
    highlights: [
      "Designed conversion-focused sections with clear narrative flow.",
      "Used motion and hierarchy to guide attention effectively.",
      "Kept interaction smooth while maintaining strong visual identity.",
    ],
    gradient: "linear-gradient(10deg, #DB2777 49.9%, #DB2777 81.7%, #F472B6 99.88%)",
    accentColor: "#EC4899",
    image: "/projects-images/star-forge/screen1.jpeg",
    tags: ["Next.js", "React", "Sanity CMS", "TypeScript", "Better Auth", "GROQ", "Sentry", "Markdown", "Tailwind CSS", "Motion.dev"],
  },
];
