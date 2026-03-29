export type FeatureCard = {
  id: string;
  title: string;
  label: string;
  quarter: string;
  description: string;
  href: string;
  gradient: string;
  image: string;
};

export const featureCards: FeatureCard[] = [
  {
    id: "next-venture",
    title: "Next Ventures",
    label: "Web App",
    quarter: "Q1 2025",
    description:
      "A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design.",
    href: "/projects/next-venture",
    gradient: "linear-gradient(10deg, #DB2777 49.9%, #DB2777 81.7%, #F472B6 99.88%)",
    image: "/images/projects/next-venture/screen1.jpeg",
  },
  {
    id: "star-forge",
    title: "Star Forge",
    label: "Brand + Product",
    quarter: "Q2 2025",
    description:
      "A bold product identity and interface system focused on motion, storytelling, and conversion.",
    href: "/projects/star-forge",
    gradient: "linear-gradient(20deg, #1D4ED8 30%, #7C3AED 80%, #9333EA 100%)",
    image: "/images/projects/star-forge/screen1.jpeg",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    label: "Personal Site",
    quarter: "Q4 2024",
    description:
      "A high-performance personal brand website with CMS driven content and rich visual experience.",
    href: "/projects/portfolio",
    gradient: "linear-gradient(20deg, #14532d 20%, #166534 55%, #22c55e 100%)",
    image: "/images/trinhhao.webp",
  },
];
