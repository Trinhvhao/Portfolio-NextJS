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
      <HeroSection />
      <FeatureGridSection />
      <WorkSection />
      <SkillsSection />
      <QualityMarqueeSection />
      <AboutSection />
      <TestimonialsSection />
      <MySiteSection />
      <ContactCtaSection />
    </>
  );
}
