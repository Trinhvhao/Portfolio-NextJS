"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

const DynamicTestimonialsSection = dynamic(
  () => import("./testimonials-section").then((module) => module.TestimonialsSection),
  { loading: () => null, ssr: false },
);

const DynamicSkillsSection = dynamic(
  () => import("./skills-section").then((module) => module.SkillsSection),
  { loading: () => null, ssr: false },
);

const DynamicTiktokSection = dynamic(
  () => import("./tiktok-section").then((module) => module.TiktokSection),
  { loading: () => null, ssr: false },
);

function DeferredMount({ children, className, id }: { children: ReactNode; className: string; id?: string }) {
  const slotRef = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot || shouldMount) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldMount(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(slot);
    return () => observer.disconnect();
  }, [shouldMount]);

  return (
    <div ref={slotRef} className={className} id={id}>
      {shouldMount ? children : null}
    </div>
  );
}

export function DeferredTestimonialsSection() {
  return (
    <DeferredMount className="home-content-auto min-h-[700px] md:min-h-[850px]" id="testimonials">
      <DynamicTestimonialsSection />
    </DeferredMount>
  );
}

export function DeferredSkillsSection() {
  return (
    <DeferredMount className="home-content-auto min-h-[700px] md:min-h-[800px]">
      <DynamicSkillsSection />
    </DeferredMount>
  );
}

export function DeferredTiktokSection() {
  return (
    <DeferredMount className="home-content-auto min-h-screen">
      <DynamicTiktokSection />
    </DeferredMount>
  );
}
