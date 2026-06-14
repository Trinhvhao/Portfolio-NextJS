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
  titleAccent: "Junior Full-Stack Developer",
  paragraphs: [
    "I'm Trinh Van Hao — driven by curiosity and the relentless pursuit of building things that matter. From crafting pixel-perfect frontends to designing robust backends, I enjoy every layer of the stack.",
    "Every line of code is an opportunity to learn something new. I explore, experiment, and iterate — always pushing toward cleaner solutions and more meaningful applications.",
    "The journey never stops, and neither do I.",
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
    { label: "LinkedIn", href: "https://linkedin.com/in/trinh-van-hao", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/Trinhvhao", icon: "github" },
    { label: "Facebook", href: "https://facebook.com/trinhvhao", icon: "twitter" },
  ] satisfies AboutSocialLink[],
};

export const experienceHeader = {
  eyebrow: "The Experience",
  titleStart: "Experience That Brings",
  titleAccent: "Ideas to Life",
};

export const experienceItems: ExperienceItem[] = [
  {
    id: "zaka-edu",
    period: "2023 - Present",
    company: "Zaka Edu",
    workMode: "Remote work",
    role: "Web Developer",
    achievements: [
      "Developed and maintained the education center website, ensuring optimal performance and user experience.",
      "Managed content updates and improved SEO to increase visibility and organic reach.",
      "Designed and deployed media assets for campaigns to strengthen brand recognition.",
      "Integrated AI features into the educational platform for enhanced learning experience.",
    ],
    technologies: ["Website Operations", "Feature Optimization", "Media Production", "Brand Growth"],
  },
  {
    id: "aiot-lab",
    period: "07/2025 - Present",
    company: "AIoT Lab - Dai Nam University",
    workMode: "On-site",
    role: "AI Intern",
    achievements: [
      "Worked on applied AI projects, learning from data preparation to model development in real-world contexts.",
      "Built a text emotion recognition model for Ngoc Dung Aesthetic Clinic.",
      "Contributed to a tea-harvest recognition model for Van Thang Cooperative.",
      "Collected, cleaned, and labeled datasets to support model training and evaluation.",
    ],
    technologies: ["NLP", "Computer Vision", "Data Labeling", "Model Development"],
  },
  {
    id: "freelance-dev",
    period: "Project-based",
    company: "Independent",
    location: "Vietnam",
    workMode: "Flexible",
    role: "Freelance Developer",
    achievements: [
      "Delivered custom software solutions for clients, from concept validation to production-ready releases.",
      "Developed AI-assisted features for HR management systems tailored to client needs.",
      "Built event management platforms with streamlined registration and coordination features.",
      "Implemented a mini social network project in Java, including core social interaction modules.",
    ],
    technologies: ["AI-enabled HRM", "Event Platforms", "Java Systems", "Client Delivery"],
  },
];

export const certificationsHeader = {
  eyebrow: "Certifications & Public Proof",
  titleStart: "Proof of",
  titleAccent: "Execution",
};

export const certificationItems: CertificationItem[] = [
  {
    id: "google-ai-professional",
    title: "Google AI Professional Certificate",
    issuer: "Google",
    issuedAt: "2025",
    credentialId: "HGPEKF4L3H24",
    credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/HGPEKF4L3H24",
    category: "Certification",
  },
  {
    id: "python-data-science-ibm",
    title: "Python for Data Science",
    issuer: "IBM",
    issuedAt: "2025",
    category: "Certification",
  },
  {
    id: "blockchain-python-vbi",
    title: "Build Blockchain Applications with Python",
    issuer: "Vietnam Blockchain Innovation (VBI) & Algorand Foundation",
    issuedAt: "2024",
    category: "Certification",
  },
  {
    id: "icpr-2026-license-plate",
    title: "Top #26 - ICPR 2026 License Plate Recognition",
    issuer: "ICPR 2026",
    issuedAt: "2026",
    category: "Hackathon",
  },
  {
    id: "db-talent-competition-2025",
    title: "2nd Prize - Database Talent Competition",
    issuer: "University",
    issuedAt: "2025",
    category: "Hackathon",
  },
  {
    id: "frontend-programming-1st",
    title: "1st Prize - Front End Programming Design",
    issuer: "University",
    issuedAt: "2025",
    category: "Hackathon",
  },
  {
    id: "ai-iot-product-award-2025",
    title: "2nd Prize - Outstanding Product Voting Competition for AI and IoT Application Projects",
    issuer: "University",
    issuedAt: "2025",
    category: "Hackathon",
  },
  {
    id: "icai-ip-2025-paper",
    title: "First Author - International Conference Paper",
    issuer: "ICAI IP 2025",
    issuedAt: "2025",
    category: "Publication",
  },
];