export type AboutSocialLink = {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "twitter";
};

export type AboutImageCard = {
  alt: string;
  src: string;
  srcSet?: string;
  caption: string;
};

export type ExperienceItem = {
  id: string;
  period: string;
  company: string;
  location?: string;
  workMode: string;
  role: string;
  achievements: string[];
  technologies: string[];
};

export type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string;
  credentialId?: string;
  credentialUrl?: string;
  category: "Certification" | "Publication" | "Talk" | "Hackathon";
};

export const aboutOpenSource = {
  githubUsername: "Trinhvhao",
};

export const aboutIntro = {
  eyebrow: "More About Me",
  titleStart: "I'm Trinh Van Hao,",
  titleAccent: "Fullstack and AI",
  paragraphs: [
    "I'm Trinh Van Hao, a proactive Fullstack and AI developer focused on building high-impact digital products with practical intelligence.",
    "From frontend experience to backend architecture and AI integration, I enjoy solving complex problems with clean, maintainable code.",
    "I love learning, shipping, and improving things every day.",
  ],
  imageCards: [
    {
      alt: "Coding portrait",
      src: "/images/z6715827947073_b0cf72fee8964b9ea4fd8eddd2b10e6c.jpg",
      caption: "I Build",
    },
    {
      alt: "Personal portrait",
      src: "/images/z4288346765554_4263c7ddb9b56c07b405c35b6b228ddb.jpg",
      caption: "I Create",
    },
    {
      alt: "Brand portrait",
      src: "/images/z5926087417580_f280e06f6521397aded6e144dc56a409.jpg",
      caption: "I Explore",
    },
  ] satisfies AboutImageCard[],
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/iaayushbharti", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/aayushbharti", icon: "github" },
    { label: "Twitter", href: "https://x.com/iaayushbharti", icon: "twitter" },
  ] satisfies AboutSocialLink[],
};

export const experienceHeader = {
  eyebrow: "The Experience",
  titleStart: "Experience That Brings",
  titleAccent: "Ideas to Life",
};

export const experienceItems: ExperienceItem[] = [
  {
    id: "roboto-studio",
    period: "JAN 2025 - Present",
    company: "Roboto Studio",
    location: "London Area, United Kingdom",
    workMode: "Remote work",
    role: "Frontend Engineer",
    achievements: [
      "Architected enterprise-scale CMS-driven reusable pagebuilder blocks using Sanity and Contentful for 6+ production websites.",
      "Delivered high-performance web applications using Next.js, React, and Tailwind CSS with strong Core Web Vitals outcomes.",
      "Implemented TypeScript across full-stack codebases and improved maintainability with type-safe development standards.",
      "Improved team delivery through monorepo architecture (Turborepo), code reviews, and close product-design collaboration.",
      "Shipped accessible interfaces aligned with WCAG 2.1 AA while maintaining sprint velocity in Agile workflows.",
      "Built reusable design-system primitives and internal UI kits to speed up consistent feature delivery across multiple product squads.",
      "Led performance audits and production diagnostics, reducing render bottlenecks in heavy pages and improving interaction responsiveness.",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "Sanity CMS",
      "Contentful CMS",
      "Tailwind CSS",
      "Figma",
      "Turborepo",
      "Agile",
    ],
  },
  {
    id: "github-oss",
    period: "JUN 2024 - Present",
    company: "Github",
    workMode: "Remote work",
    role: "Open Source Contributor",
    achievements: [
      "Contributed to open-source projects with 15,000+ GitHub stars, improving code quality and feature depth.",
      "Collaborated with developer communities to propose practical patterns and maintain clear documentation.",
      "Reviewed pull requests, suggested architectural improvements, and helped maintainers triage issues with reproducible bug reports.",
      "Built feature demos and examples to improve onboarding for new contributors and accelerate adoption of core modules.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Turborepo"],
  },
  {
    id: "freelance-ai",
    period: "JAN 2023 - Present",
    company: "Freelance",
    location: "Vietnam",
    workMode: "Hybrid work",
    role: "Fullstack & AI Engineer",
    achievements: [
      "Designed and shipped AI-enabled web applications that combine retrieval pipelines, FastAPI services, and responsive Next.js interfaces.",
      "Built end-to-end data workflows for crawling, preprocessing, and indexing domain documents to support accurate assistant responses.",
      "Integrated model inference services with caching and queue-based processing to improve stability under peak request loads.",
      "Implemented secure authentication flows, role-based dashboards, and observability hooks for production monitoring.",
      "Partnered with clients to translate business goals into MVP roadmaps, then iterated rapidly based on usage feedback.",
    ],
    technologies: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Docker", "RAG", "PyTorch", "Redis"],
  },
];

export const certificationsHeader = {
  eyebrow: "Certifications & Public Proof",
  titleStart: "Proof of",
  titleAccent: "Execution",
};

export const certificationItems: CertificationItem[] = [
  {
    id: "meta-frontend-professional",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    issuedAt: "2024",
    credentialId: "COURSERA-META-FE-2024",
    credentialUrl: "https://www.coursera.org/",
    category: "Certification",
  },
  {
    id: "google-ux-design",
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    issuedAt: "2024",
    credentialId: "COURSERA-UX-2024",
    credentialUrl: "https://www.coursera.org/",
    category: "Certification",
  },
  {
    id: "nextjs-performance-talk",
    title: "Talk: Practical Next.js Performance for Production",
    issuer: "Frontend Community VN",
    issuedAt: "2025",
    category: "Talk",
  },
  {
    id: "ai-hackathon-top",
    title: "Top Project - AI Product Hackathon",
    issuer: "Local Tech Community",
    issuedAt: "2025",
    category: "Hackathon",
  },
  {
    id: "engineering-publication",
    title: "Publication: Building Reliable RAG Systems for SMEs",
    issuer: "Medium",
    issuedAt: "2025",
    category: "Publication",
    credentialUrl: "https://medium.com/",
  },
];