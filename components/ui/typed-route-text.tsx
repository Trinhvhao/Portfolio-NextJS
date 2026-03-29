"use client";

import { usePathname } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";

type TypedRouteTextProps = {
  text: string;
  className?: string;
  delay?: number;
  minDurationMs?: number;
  durationPerCharMs?: number;
  triggerOnView?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function TypedRouteText({
  text,
  className,
  delay = 0,
  minDurationMs = 520,
  durationPerCharMs = 46,
  triggerOnView = false,
  threshold = 0.2,
  rootMargin = "0px 0px -5% 0px",
}: TypedRouteTextProps) {
  const pathname = usePathname();
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isReady, setIsReady] = useState(!triggerOnView);
  const durationMs = Math.max(minDurationMs, text.length * durationPerCharMs);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!triggerOnView) {
      setIsReady(true);
      return;
    }

    setIsReady(false);
    const node = textRef.current;
    if (!node) {
      return;
    }

    const isNodeVisible = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const verticallyVisible = rect.bottom > 0 && rect.top < viewportHeight;
      const horizontallyVisible = rect.right > 0 && rect.left < viewportWidth;
      return verticallyVisible && horizontallyVisible;
    };

    if (isNodeVisible()) {
      setIsReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      { threshold: [0, threshold], root: null, rootMargin }
    );

    observer.observe(node);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        return;
      }

      if (isNodeVisible()) {
        setIsReady(true);
        observer.disconnect();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [triggerOnView, threshold, rootMargin, pathname, text]);

  const style = {
    ["--type-steps" as string]: String(Math.max(text.length, 1)),
    ["--type-delay" as string]: `${Math.max(delay, 0)}s`,
    ...(hasMounted ? { ["--type-duration" as string]: `${durationMs}ms` } : {}),
  } as CSSProperties;

  return (
    <span
      ref={textRef}
      key={`${pathname}-${text}`}
      className={`route-typewriter ${isReady ? "" : "route-typewriter--paused"}`.trim()}
      style={style}
    >
      <span className={className}>{text}</span>
    </span>
  );
}
