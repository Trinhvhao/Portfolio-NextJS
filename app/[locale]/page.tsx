import { AboutSection } from "@/components/sections/about-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { FeatureGridSection } from "@/components/sections/feature-grid-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MySiteSection } from "@/components/sections/my-site-section";
import { QualityMarqueeSection } from "@/components/sections/quality-marquee-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WorkSection } from "@/components/sections/work-section";

export default function HomePage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 z-[60] hidden w-[12px] border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] opacity-75 lg:block lg:w-[32px] dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 right-0 z-[60] hidden w-[12px] border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] opacity-75 lg:block lg:w-[32px] dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
      />
      <HeroSection />
      <FeatureGridSection />
      <WorkSection limit={3} />
      <SkillsSection />
      <QualityMarqueeSection />
      <AboutSection />
      <TestimonialsSection />
      <MySiteSection />
      <ContactCtaSection />
    </>
  );
}
