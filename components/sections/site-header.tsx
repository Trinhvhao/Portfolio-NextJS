"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CommandMenu } from "@/components/ui/command-menu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/uses", label: "More", hasChevron: true, isMoreMenu: true },
  { href: "/links", label: "Contact", isContact: true },
];

const moreFeatureCards = [
  {
    href: "/guestbook",
    title: "Guestbook",
    description: "Let me know you were here",
    background: "linear-gradient(155deg, #70472d 0%, #3f2a20 45%, #1e1718 100%)",
  },
  {
    href: "/bucket-list",
    title: "Bucket List",
    description: "Things to do at least once in my life",
    background: "linear-gradient(155deg, #5f9bef 0%, #2c5ea7 48%, #111f32 100%)",
  },
];

const moreQuickLinks = [
  { href: "/about", label: "Resume / CV", subtitle: "Quick profile summary" },
  { href: "/uses", label: "Uses", subtitle: "A peek into my digital setup" },
  { href: "/legal/terms", label: "Attribution", subtitle: "Journey to create this site" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const navTrackRef = useRef<HTMLDivElement | null>(null);
  const moreMenuRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeMenuTimerRef = useRef<number | null>(null);
  const [activeIndicator, setActiveIndicator] = useState({ x: 0, width: 0, ready: false });
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isMoreMenuPinned, setIsMoreMenuPinned] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const normalizedPathname = useMemo(() => {
    if (!pathname) return "/";
    if (pathname !== "/" && pathname.endsWith("/")) {
      return pathname.slice(0, -1);
    }
    return pathname;
  }, [pathname]);

  const activeHref = useMemo(() => {
    if (
      normalizedPathname === "/uses" ||
      normalizedPathname === "/guestbook" ||
      normalizedPathname.startsWith("/legal")
    ) {
      return "/uses";
    }

    const match = navItems.find((item) =>
      item.href === "/"
        ? normalizedPathname === "/"
        : normalizedPathname === item.href || normalizedPathname.startsWith(`${item.href}/`)
    );
    return match?.href ?? "/";
  }, [normalizedPathname]);

  const clearCloseMenuTimer = useCallback(() => {
    if (closeMenuTimerRef.current) {
      window.clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }
  }, []);

  const openMoreMenu = useCallback(() => {
    clearCloseMenuTimer();
    setIsMoreMenuOpen(true);
  }, [clearCloseMenuTimer]);

  const closeMoreMenu = useCallback(
    (force?: boolean) => {
      clearCloseMenuTimer();
      if (force || !isMoreMenuPinned) {
        setIsMoreMenuOpen(false);
        setIsMoreMenuPinned(false);
      }
    },
    [clearCloseMenuTimer, isMoreMenuPinned],
  );

  const scheduleCloseMoreMenu = useCallback(() => {
    if (isMoreMenuPinned) return;
    clearCloseMenuTimer();
    closeMenuTimerRef.current = window.setTimeout(() => {
      setIsMoreMenuOpen(false);
    }, 140);
  }, [clearCloseMenuTimer, isMoreMenuPinned]);

  const updateActiveIndicator = useCallback(() => {
    const track = navTrackRef.current;
    const activeTab = tabRefs.current[activeHref];

    if (!track || !activeTab) return;

    const trackRect = track.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    const x = tabRect.left - trackRect.left;
    const width = tabRect.width;

    setActiveIndicator((prev) => {
      if (prev.ready && prev.x === x && prev.width === width) {
        return prev;
      }

      return { x, width, ready: true };
    });
  }, [activeHref]);

  useLayoutEffect(() => {
    updateActiveIndicator();
  }, [updateActiveIndicator]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateActiveIndicator);

    const onResize = () => updateActiveIndicator();
    window.addEventListener("resize", onResize);

    const observer = typeof ResizeObserver !== "undefined" && navTrackRef.current
      ? new ResizeObserver(() => updateActiveIndicator())
      : null;

    if (observer && navTrackRef.current) {
      observer.observe(navTrackRef.current);
      const activeTab = tabRefs.current[activeHref];
      if (activeTab) observer.observe(activeTab);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [activeHref, updateActiveIndicator]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (isMoreMenuOpen && moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        closeMoreMenu(true);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMoreMenu(true);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeMoreMenu, isMoreMenuOpen]);

  return (
    <header
      className="fixed z-[5000] w-full"
      style={{ top: "14px", pointerEvents: "none" }}
    >
      <nav className="container flex py-1.5" style={{ pointerEvents: "auto" }}>
        <Link aria-label="Homepage" className="hidden size-8 md:block md:size-9" href="/">
          <img
            src="/images/site-img/icon.png"
            alt="AB"
            className="size-[35px] rounded-md"
          />
        </Link>

        <div
          ref={moreMenuRef}
          className="relative mx-auto flex justify-center"
          onMouseLeave={scheduleCloseMoreMenu}
        >
          <div
            ref={navTrackRef}
            className="relative flex items-center"
            style={{
              minHeight: "48px",
              gap: "4px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(22,22,22,0.9)",
              padding: "6px",
              boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
              backdropFilter: "blur(14px)",
            }}
          >
            {activeIndicator.ready && (
              <>
                <span
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    left: 0,
                    top: "6px",
                    height: "36px",
                    width: `${activeIndicator.width}px`,
                    borderRadius: "9999px",
                    background: "rgba(255,255,255,0.12)",
                    transform: `translateX(${activeIndicator.x}px)`,
                    transition: "transform 430ms cubic-bezier(0.22, 1, 0.36, 1), width 430ms cubic-bezier(0.22, 1, 0.36, 1)",
                    zIndex: 1,
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    left: 0,
                    top: "-7px",
                    height: "3px",
                    width: "34px",
                    borderRadius: "9999px",
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 0 14px 4px rgba(255,255,255,0.7)",
                    transform: `translateX(${activeIndicator.x + activeIndicator.width / 2 - 17}px)`,
                    transition: "transform 430ms cubic-bezier(0.22, 1, 0.36, 1)",
                    zIndex: 1,
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    left: 0,
                    top: "-7px",
                    height: "2px",
                    width: "26px",
                    borderRadius: "9999px",
                    background: "#fff",
                    transform: `translateX(${activeIndicator.x + activeIndicator.width / 2 - 13}px)`,
                    transition: "transform 430ms cubic-bezier(0.22, 1, 0.36, 1)",
                    zIndex: 1,
                  }}
                />
              </>
            )}

            {navItems.map((item) => {
              const isActive = item.href === activeHref;
              const isMoreMenuItem = Boolean(item.isMoreMenu);
              const isContactItem = Boolean(item.isContact);
              const isMoreOpen = isMoreMenuItem && isMoreMenuOpen;

              return (
                <div key={item.href} className="relative flex items-center">
                  <button
                    type="button"
                    ref={(element) => {
                      tabRefs.current[item.href] = element;
                    }}
                    onMouseEnter={
                      isMoreMenuItem
                        ? openMoreMenu
                        : () => {
                            closeMoreMenu(true);
                          }
                    }
                    onClick={() => {
                      if (isMoreMenuItem) {
                        setIsMoreMenuOpen((prev) => !prev);
                        setIsMoreMenuPinned((prev) => !prev);
                        return;
                      }

                      closeMoreMenu(true);
                      router.push(item.href);
                    }}
                    className="inline-flex shrink-0 items-center gap-1"
                    style={{
                      borderRadius: "9999px",
                      padding: isContactItem ? "6px 18px" : "6px 16px",
                      fontSize: "15px",
                      fontWeight: isContactItem ? 600 : 500,
                      color: isContactItem ? "#fff" : isActive ? "#fff" : "#d4d4d8",
                      background: isContactItem ? "rgba(255,255,255,0.08)" : "transparent",
                      border: isContactItem ? "1px solid rgba(255,255,255,0.22)" : "1px solid transparent",
                      boxShadow: isContactItem ? "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 14px rgba(255,255,255,0.12)" : "none",
                      transition: "color 180ms ease",
                      lineHeight: 1.25,
                      position: "relative",
                      zIndex: 2,
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    {item.hasChevron && (
                      <svg
                        aria-hidden
                        viewBox="0 0 20 20"
                        className="size-4"
                        style={{ opacity: 0.7, transform: isMoreOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease" }}
                      >
                        <path d="M5.5 7.5l4.5 5 4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}

            <div
              className="absolute top-[calc(100%+10px)]"
              onMouseEnter={openMoreMenu}
              style={{
                left: "50%",
                width: "min(92vw, 860px)",
                opacity: isMoreMenuOpen ? 1 : 0,
                transform: `translateX(-50%) translateY(${isMoreMenuOpen ? "0px" : "-6px"}) scale(${isMoreMenuOpen ? 1 : 0.98})`,
                transformOrigin: "top center",
                pointerEvents: isMoreMenuOpen ? "auto" : "none",
                transition: "opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                zIndex: 12,
              }}
            >
              <div
                className="grid gap-2"
                style={{
                  borderRadius: "22px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(20,20,23,0.98)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 16px 44px rgba(0,0,0,0.5)",
                  padding: "10px",
                  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(250px, 1fr)",
                }}
              >
                {moreFeatureCards.map((card) => (
                  <Link
                    key={card.href}
                    href={card.href}
                    onClick={() => closeMoreMenu(true)}
                    className="relative flex min-h-[184px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-4"
                    style={{
                      background: card.background,
                    }}
                  >
                    <span className="mb-2 inline-block size-2 rounded-full bg-white/90" />
                    <h3 className="mt-1 text-[14px] font-semibold leading-[1.25] text-white">{card.title}</h3>
                    <p className="mt-1.5 max-w-[22ch] text-[13px] leading-[1.35] text-zinc-200/90">{card.description}</p>
                  </Link>
                ))}

                <div className="grid gap-2">
                  {moreQuickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => closeMoreMenu(true)}
                      className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-zinc-300">
                        <svg viewBox="0 0 20 20" aria-hidden className="size-4">
                          <rect x="4" y="5" width="12" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
                          <path d="M6.5 9.5h7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] leading-tight text-zinc-100">{link.label}</span>
                        <span className="block truncate text-[13px] text-zinc-400">{link.subtitle}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-2 delay-200 md:flex">
          <button
            aria-label="Open command"
            onClick={() => setIsCommandOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white/20 shadow-sm"
          >
            <span className="font-mono text-lg leading-none">⌘</span>
          </button>
        </div>
      </nav>

      <CommandMenu open={isCommandOpen} setOpen={setIsCommandOpen} />
    </header>
  );
}
