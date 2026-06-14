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
    type: "SaaS Landing",
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
    gradient: "linear-gradient(10deg, #EA580C 49.9%, #EA580C 81.7%, #FB923C 99.88%)",
    accentColor: "#F97316",
    image: "/projects-images/star-forge/screen1.jpeg",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion.dev", "Framer Motion"],
  },
  {
    id: "cloudpulse",
    index: "06",
    type: "Dashboard",
    title: "CloudPulse",
    period: "Q1 2026",
    href: "/projects/cloudpulse",
    description: "Real-time infrastructure monitoring dashboard with beautiful data visualization",
    detailDescription:
      "A comprehensive monitoring solution for DevOps teams to track server health, API latency, and system metrics in real-time with intuitive dashboards and smart alerting.",
    highlights: [
      "Built real-time WebSocket-powered metric updates.",
      "Designed intuitive data visualization with custom charts.",
      "Implemented smart alerting with configurable thresholds.",
    ],
    gradient: "linear-gradient(10deg, #0D9488 49.9%, #0D9488 81.7%, #2DD4BF 99.88%)",
    accentColor: "#14B8A6",
    tags: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "artflow",
    index: "07",
    type: "Creative Tool",
    title: "ArtFlow",
    period: "Q2 2026",
    href: "/projects/artflow",
    description: "A collaborative digital art platform for artists to create, share, and monetize their work",
    detailDescription:
      "A feature-rich digital art workspace with layer management, brushes, filters, and a marketplace for artists to showcase and sell their creations directly to collectors.",
    highlights: [
      "Developed a powerful canvas engine with layer support.",
      "Built an integrated marketplace with Stripe payments.",
      "Created real-time collaboration features for teams.",
    ],
    gradient: "linear-gradient(10deg, #DC2626 49.9%, #DC2626 81.7%, #F87171 99.88%)",
    accentColor: "#EF4444",
    tags: ["React", "TypeScript", "Canvas API", "Stripe", "WebSocket", "AWS S3", "Tailwind CSS"],
  },
  {
    id: "taskbeat",
    index: "08",
    type: "Productivity",
    title: "TaskBeat",
    period: "2026",
    href: "/projects/taskbeat",
    description: "A gamified task manager that makes productivity fun with rewards and achievements",
    detailDescription:
      "An innovative productivity app that transforms daily tasks into quests with XP points, streaks, achievements, and leaderboards to keep users motivated and engaged.",
    highlights: [
      "Gamified task completion with XP and level-up system.",
      "Implemented streak tracking with smart reminders.",
      "Designed achievement system with unlockable rewards.",
    ],
    gradient: "linear-gradient(10deg, #CA8A04 49.9%, #CA8A04 81.7%, #FACC15 99.88%)",
    accentColor: "#EAB308",
    tags: ["React Native", "Expo", "TypeScript", "Firebase", "Gamification", "Zustand"],
  },
  {
    id: "nexacart",
    index: "09",
    type: "E-Commerce",
    title: "NexaCart",
    period: "2026",
    href: "/projects/nexacart",
    description: "A modern headless e-commerce platform with blazing fast performance and beautiful checkout",
    detailDescription:
      "A headless commerce solution built for speed and conversion with server-side rendering, optimized product pages, and a seamless checkout experience that reduces cart abandonment.",
    highlights: [
      "Achieved 95+ Lighthouse score across all metrics.",
      "Built headless architecture with flexible API integration.",
      "Designed conversion-optimized checkout flow with upsells.",
    ],
    gradient: "linear-gradient(10deg, #4F46E5 49.9%, #4F46E5 81.7%, #818CF8 99.88%)",
    accentColor: "#6366F1",
    tags: ["Next.js", "TypeScript", "Shopify API", "GraphQL", "Tailwind CSS", "Vercel"],
  },
  {
    id: "healthsync",
    index: "10",
    type: "Health Tech",
    title: "HealthSync",
    period: "2026",
    href: "/projects/healthsync",
    description: "A personal health tracking app that syncs data from wearables and provides AI insights",
    detailDescription:
      "A comprehensive health companion that aggregates data from Apple Health, Google Fit, and wearables to provide personalized health insights, trend analysis, and actionable recommendations.",
    highlights: [
      "Integrated with major health platforms via HealthKit and Google Fit APIs.",
      "Built AI-powered insights engine for trend detection.",
      "Designed privacy-first architecture with on-device processing.",
    ],
    gradient: "linear-gradient(10deg, #0891B2 49.9%, #0891B2 81.7%, #22D3EE 99.88%)",
    accentColor: "#06B6D4",
    tags: ["Flutter", "Dart", "HealthKit API", "TensorFlow Lite", "Firebase", "Node.js"],
  },
];
