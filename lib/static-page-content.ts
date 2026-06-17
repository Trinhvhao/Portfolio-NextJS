export type StaticPageSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type StaticPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt?: string;
  sections: StaticPageSection[];
};

export const usesPageContent: StaticPageContent = {
  eyebrow: "Workflow",
  title: "Uses",
  intro:
    "A practical breakdown of the hardware, software, and rituals behind my day-to-day engineering work.",
  sections: [
    {
      title: "The core workstation",
      paragraphs: [
        "I prioritize reliability over novelty. Fast boot, stable thermals, and predictable battery behavior matter more than benchmark peaks.",
      ],
      bullets: [
        "Laptop: 14-inch class machine with 32GB RAM",
        "External display: single 4K monitor for focused layout",
        "Audio: closed-back headphones for deep work",
      ],
    },
    {
      title: "Editor and terminal",
      paragraphs: [
        "Most product work happens in VS Code with a minimal extension set. The terminal is split between quick command execution and long-running service panes.",
      ],
      bullets: [
        "Editor: VS Code + strict linting + format on save",
        "Terminal: WezTerm with project-specific panes",
        "Shell: Zsh with aliases for repetitive tasks",
      ],
    },
    {
      title: "Design and writing stack",
      paragraphs: [
        "I use lightweight design notes before writing UI code. For writing, I favor short sections and concrete language so documents can convert into implementation quickly.",
      ],
      bullets: [
        "Wireframes: low-fidelity notes first",
        "Writing: markdown with section-first structure",
        "Knowledge capture: reusable snippets and checklists",
      ],
    },
    {
      title: "Default engineering principles",
      paragraphs: [
        "Tools change, but these defaults stay stable across projects and teams.",
      ],
      bullets: [
        "Ship thin slices with production-level quality",
        "Automate checks early: lint, typecheck, and smoke tests",
        "Keep dependencies small and documented",
        "Prefer readability over clever abstraction",
      ],
    },
  ],
};

export const privacyPageContent: StaticPageContent = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  intro:
    "This page explains what data is collected on this website, why it is collected, and how it is handled.",
  updatedAt: "March 29, 2026",
  sections: [
    {
      title: "Data collected",
      paragraphs: [
        "This site keeps data collection minimal. Basic technical logs may be captured by hosting providers for security and uptime diagnostics.",
      ],
      bullets: [
        "Browser and device metadata",
        "Page request logs and timestamps",
        "Optional information submitted through direct contact",
      ],
    },
    {
      title: "How data is used",
      paragraphs: [
        "Collected information is used to maintain service quality, investigate abuse, and respond to messages sent through contact channels.",
        "Data is not sold to third parties.",
      ],
    },
    {
      title: "Cookies and analytics",
      paragraphs: [
        "If analytics is enabled, it is used for aggregate traffic insights such as page popularity and session trends. No sensitive personal profiling is performed.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        "You may request access, correction, or deletion of personal information shared directly through communication channels.",
        "For privacy requests, use the contact page and include enough detail to identify the message thread.",
      ],
    },
  ],
};

export const termsPageContent: StaticPageContent = {
  eyebrow: "Legal",
  title: "Terms of Use",
  intro:
    "By using this website, you agree to the terms below regarding acceptable usage, ownership, and limitations.",
  updatedAt: "March 29, 2026",
  sections: [
    {
      title: "Acceptable use",
      paragraphs: [
        "Use this site for lawful purposes only. Attempting to disrupt services, scrape protected resources, or abuse contact channels is prohibited.",
      ],
    },
    {
      title: "Intellectual property",
      paragraphs: [
        "Unless otherwise stated, site content including text, code samples, and visual assets belongs to the site owner.",
        "You may reference public content with attribution. Reproduction for commercial use requires permission.",
      ],
    },
    {
      title: "No warranty",
      paragraphs: [
        "Information is provided as-is. While content is kept accurate and practical, there is no guarantee of completeness or fitness for a specific use case.",
      ],
    },
    {
      title: "External links",
      paragraphs: [
        "This site may link to third-party resources. Those resources are governed by their own terms and privacy policies.",
      ],
    },
  ],
};

export const socialPageContent: StaticPageContent = {
  eyebrow: "Social",
  title: "Connect with Me",
  intro:
    "Behind the content — Vietnamese tech content, coding tips, and day-in-the-life snippets from a developer who codes for a living.",
  sections: [
    {
      title: "@itlamcontent.th",
      paragraphs: [
        "I post in Vietnamese about web development, tools, productivity, and the reality of working as a software engineer.",
        "Content is casual and practical — no fluff, just things I find useful or interesting.",
      ],
      bullets: [
        "Coding tips and shortcuts",
        "Tech tool reviews from a developer's perspective",
        "Workday glimpses and routine breakdowns",
        " Vietnamese tech talk",
      ],
    },
  ],
};
