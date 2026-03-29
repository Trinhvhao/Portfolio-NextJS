"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { TypedRouteText } from "@/components/ui/typed-route-text";

type Testimonial = {
  title: string;
  content: string;
  author: string;
  role: string;
  gradientClass: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    title: "An Artist with Code Who Delivers Real SEO Results",
    content:
      "Aayush is an artist with code. We went from 'I want something high-tech and fast' to a fully built, high-ranking website in just over a week. He is constantly advancing his craft, ensuring our Sanity CMS implementation adheres to the newest standards for speed and efficiency. The results speak for themselves.",
    author: "Michael Davis",
    role: "Founder/CTO • Apex Consulting",
    gradientClass: "bg-[radial-gradient(94.21%_78.4%_at_50%_29.91%,rgba(39,61,180,0.7),rgba(15,9,38,0.4))]",
  },
  {
    title: "Simply the best developer I've worked with.",
    content:
      "Aayush is the man! He is simply the best developer I've worked with. He took our design requirements and quite literally ran with them, translating everything into a robust, WCAG accessible platform. We are super happy with the final product. To anyone reading this-I can't recommend Aayush enough, your job will be done exceptionally well.",
    author: "Jennifer Wilson",
    role: "Founder • Blue Harbor Agency",
    gradientClass: "bg-[radial-gradient(84.35%_70.19%_at_50%_38.11%,rgba(2,96,101,0.57),rgba(5,136,178,0.06))]",
  },
  {
    title: "Professional, Quick, and a Seamless CMS Integration",
    content:
      "Aayush was quick to respond, very professional, and delivered our fully SEO-optimized site ahead of schedule. The integration with our headless CMS was seamless and exactly what we needed for easy content management. Very good job. Looking forward to collaborating again soon.",
    author: "Robert Johnson",
    role: "Startup Agency Owner",
    gradientClass: "bg-[radial-gradient(86.88%_75.47%_at_50%_24.53%,rgba(82,48,145,0.7),rgba(26,11,51,0.14))]",
  },
  {
    title: "Excellent Communication and a Huge Jump in Core Web Vitals",
    content:
      "Excellent communication and professionalism from the start and throughout. Aayush calmly entertained a few additional requests, always maintaining an open-minded approach to suggestions and feedback. Our Core Web Vitals jumped immediately after deployment. An excellent experience overall, we will certainly re-engage Aayush for future projects.",
    author: "Tony Parker",
    role: "Founder • Metro Solutions Group",
    gradientClass: "bg-[radial-gradient(90.35%_49.25%_at_50%_59.06%,rgba(2,61,114,0.7),rgba(5,11,28,0.42))]",
  },
  {
    title: "His JavaScript/React Skills are Through the Roof",
    content:
      "I've been working with Aayush for a couple of months now and I can't express enough how impressed I am with his talent. His JavaScript/React web UI programming skills are through the roof. We have a streamlined workflow, and he's extremely responsive, brief, and efficient. If Aayush says he can deliver a project, rest assured he can, he will, and it will be awesome.",
    author: "Chris Taylor",
    role: "Chairperson • Core Fitness Club",
    gradientClass: "bg-[radial-gradient(126.42%_76.6%_at_50%_32.26%,rgba(84,95,102,0.7),rgba(0,36,69,0.13))]",
  },
  {
    title: "He's Not Just a Developer, He's a True Partner",
    content:
      "Aayush is a genius. He is open-minded, curious, and deeply invested in the projects he chooses to work on. He takes your product vision-even the vague 'dark theme, high tech' ideas-and brings it to life. He's not just a developer; he's a true partner in the process. He's brilliant!",
    author: "Sarah Chen",
    role: "Product Owner • Digital Bridge Consulting",
    gradientClass: "bg-[radial-gradient(99.74%_100%_at_50%_0%,rgba(74,21,75,0.7),rgba(29,5,29,0.42))]",
  },
];

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex size-9 items-center justify-center rounded-full bg-white/15 text-[10px] font-semibold tracking-wide text-white/90 sm:text-xs">
      {initials}
    </div>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({ isDown: false, startX: 0, startScrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section className="py-pagebuilder dark:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" aria-label="Testimonials">
      <h2
        className="container relative z-2 mx-auto mb-8 text-balance text-center text-5xl font-medium tracking-tight max-sm:px-5 sm:mb-10 sm:text-5xl md:mb-12 md:text-6xl"
        style={{ textShadow: "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)" } as CSSProperties}
      >
        <p className="mb-3 font-mono text-xs font-normal tracking-widest text-black/80 uppercase dark:text-white/70">TESTIMONIALS</p>
        <span className="font-instrument-serif">
          <span>Word on the street </span>
          <TypedRouteText text="about me" triggerOnView className="animate-gradient-x pe-2 font-instrument-serif italic tracking-tight text-colorfull" />
        </span>
      </h2>

      <div
        ref={scrollRef}
        className={`w-full overflow-x-auto select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={(event) => {
          const container = scrollRef.current;
          if (!container) {
            return;
          }

          dragStateRef.current = {
            isDown: true,
            startX: event.clientX,
            startScrollLeft: container.scrollLeft,
          };
          setIsDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragStateRef.current.isDown) {
            return;
          }

          const container = scrollRef.current;
          if (!container) {
            return;
          }

          const deltaX = event.clientX - dragStateRef.current.startX;
          container.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
        }}
        onPointerUp={() => {
          dragStateRef.current.isDown = false;
          setIsDragging(false);
        }}
        onPointerCancel={() => {
          dragStateRef.current.isDown = false;
          setIsDragging(false);
        }}
        onPointerLeave={() => {
          dragStateRef.current.isDown = false;
          setIsDragging(false);
        }}
      >
        <div className="mx-auto flex w-max px-2 py-1">
          {TESTIMONIALS.map((item) => (
            <div key={item.author} className="shrink-0">
              <article
                className={`dark relative mx-1 flex h-full w-[260px] select-none flex-col justify-between overflow-hidden rounded-xl bg-black p-3 antialiased shadow-border sm:mx-1.5 sm:w-[280px] sm:p-4 md:w-[320px] md:rounded-2xl md:p-4 lg:p-4 ${item.gradientClass}`}
              >
                <div>
                  <h4 className="mb-1.5 font-instrument-serif text-base font-bold leading-snug tracking-wide text-white/95 sm:text-lg md:text-xl">{item.title}</h4>
                  <p className="mb-2 line-clamp-8 text-sm font-extralight leading-relaxed tracking-tight text-white/85 md:line-clamp-9 md:text-base">{item.content}</p>
                </div>
                <div className="mt-1 flex items-center gap-2.5">
                  <InitialsAvatar name={item.author} />
                  <div>
                    <span className="text-sm font-medium tracking-wide text-white/95 sm:text-base">{item.author}</span>
                    <p className="text-[11px] text-white/80 sm:text-xs">{item.role}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
