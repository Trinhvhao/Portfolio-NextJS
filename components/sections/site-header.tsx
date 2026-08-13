"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CommandMenu } from "@/components/ui/command-menu";

export function SiteHeader() {
  const t = useTranslations("nav");
  const tFeature = useTranslations("feature");
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
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  const navItems = useMemo(() => [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/projects", label: t("work") },
    { href: "/blog", label: t("blog") },
    { href: "/uses", label: t("more"), hasChevron: true, isMoreMenu: true },
    { href: "/links", label: t("contact"), isContact: true },
  ], [t]);

  const moreFeatureCards = useMemo(() => [
    {
      href: "/guestbook",
      title: t("guestbook"),
      description: tFeature("remoteDetail"),
      background: "linear-gradient(155deg, #70472d 0%, #3f2a20 45%, #1e1718 100%)",
      bgImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='%23ffffff08'/%3E%3Ccircle cx='100' cy='100' r='50' fill='%23ffffff06'/%3E%3C/svg%3E\")",
      bgPosition: "right top",
      emoji: "✍️",
    },
    {
      href: "/bucket-list",
      title: t("bucketList"),
      description: tFeature("scoopDesc"),
      background: "linear-gradient(155deg, #5f9bef 0%, #2c5ea7 48%, #111f32 100%)",
      bgImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='%23ffffff08'/%3E%3Ccircle cx='100' cy='100' r='50' fill='%23ffffff06'/%3E%3C/svg%3E\")",
      bgPosition: "right top",
      emoji: "🎯",
    },
  ], [t, tFeature]);

  const moreQuickLinks = useMemo(() => [
    { href: "/resume", label: t("resume"), subtitle: tFeature("resumeSubtitle") },
    { href: "/uses", label: t("uses"), subtitle: tFeature("technologies") },
    { href: "/social", label: tFeature("followMeOnTiktok"), subtitle: "Behind the content" },
  ], [t, tFeature]);

  const normalizedPathname = useMemo(() => {
    if (!pathname) return "/";
    const stripped = pathname.replace(/^\/(en|vi)/, "");
    const base = stripped === "" ? "/" : stripped;
    if (base !== "/" && base.endsWith("/")) {
      return base.slice(0, -1);
    }
    return base;
  }, [pathname]);

  const activeHref = useMemo(() => {
    if (
      normalizedPathname === "/uses" ||
      normalizedPathname === "/guestbook" ||
      normalizedPathname === "/resume" ||
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
  }, [normalizedPathname, navItems]);

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
    [clearCloseMenuTimer, isMoreMenuPinned]
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

    const onResize = () => {
      updateActiveIndicator();
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setIsMobileMoreOpen(false);
      }
    };
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
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          setIsMobileMoreOpen(false);
          return;
        }
        closeMoreMenu(true);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeMoreMenu, isMoreMenuOpen, isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) setIsMobileMoreOpen(false);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    setIsMobileMoreOpen(activeHref === "/uses");
  }, [activeHref, isMobileMenuOpen]);

  const navigateAndCloseMobile = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    setIsMobileMoreOpen(false);
    router.push(href);
  }, [router]);

  return (
    <header
      className="fixed z-[5000] w-full"
      style={{ top: "14px", pointerEvents: "none" }}
    >
      <nav className="container relative flex items-center py-1.5" style={{ pointerEvents: "auto" }}>
        <Link aria-label="Homepage" className="size-9 md:size-9" href="/">
          <img
            src="/images/site-img/icon.webp"
            alt="AB"
            width={35}
            height={35}
            decoding="async"
            fetchPriority="high"
            className="size-[35px] rounded-md"
          />
        </Link>

        <div
          ref={moreMenuRef}
          className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 justify-center md:flex"
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
                            setHoveredHref(item.href);
                          }
                    }
                    onMouseLeave={() => setHoveredHref(null)}
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
                      color: isContactItem ? "#fff" : isActive ? "#fff" : hoveredHref === item.href ? "#fff" : "#d4d4d8",
                      background: isContactItem ? "rgba(255,255,255,0.08)" : hoveredHref === item.href ? "rgba(255,255,255,0.08)" : "transparent",
                      border: isContactItem ? "1px solid rgba(255,255,255,0.22)" : "1px solid transparent",
                      boxShadow: isContactItem ? "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 14px rgba(255,255,255,0.12)" : "none",
                      transition: "color 150ms ease, background 150ms ease",
                      lineHeight: 1.25,
                      position: "relative",
                      zIndex: 2,
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span suppressHydrationWarning>{item.label}</span>
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
                    suppressHydrationWarning
                    className="relative flex min-h-[184px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-4"
                    style={{
                      background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.35)), ${card.background}`,
                      backgroundImage: card.bgImage ? `${card.bgImage}, ${card.background}` : card.background,
                      backgroundPosition: card.bgPosition || "center",
                      backgroundSize: "auto, cover",
                    }}
                  >
                    {card.emoji && (
                      <span
                        suppressHydrationWarning
                        className="absolute text-6xl opacity-40"
                        style={{ top: "16px", right: "16px" }}
                      >
                        {card.emoji}
                      </span>
                    )}
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

        <div className="hidden md:ml-auto md:flex md:items-center md:gap-2">
          <button
            aria-label="Open command"
            onClick={() => setIsCommandOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 text-white active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white/20 shadow-sm"
          >
            <span className="font-mono text-lg leading-none">⌘</span>
          </button>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="ml-auto inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white/20 shadow-sm md:hidden"
        >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {isMobileMenuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
      </nav>

      <MobileNavDrawer
        open={isMobileMenuOpen}
        navItems={navItems.filter((i) => !i.isMoreMenu && !i.isContact)}
        moreItem={navItems.find((i) => i.isMoreMenu)}
        moreFeatureCards={moreFeatureCards}
        moreQuickLinks={moreQuickLinks}
        activeHref={activeHref}
        isMoreOpen={isMobileMoreOpen}
        onToggleMore={() => setIsMobileMoreOpen((v) => !v)}
        onNavigate={navigateAndCloseMobile}
        onClose={() => {
          setIsMobileMenuOpen(false);
          setIsMobileMoreOpen(false);
        }}
        onOpenCommand={() => {
          setIsMobileMenuOpen(false);
          setIsCommandOpen(true);
        }}
      />

      <CommandMenu open={isCommandOpen} setOpen={setIsCommandOpen} />
    </header>
  );
}

type MobileNavDrawerProps = {
  open: boolean;
  navItems: Array<{ href: string; label: string }>;
  moreItem: { href: string; label: string } | undefined;
  moreFeatureCards: Array<{
    href: string;
    title: string;
    description: string;
    background: string;
    bgImage?: string;
    bgPosition?: string;
    emoji?: string;
  }>;
  moreQuickLinks: Array<{ href: string; label: string; subtitle: string }>;
  activeHref: string;
  isMoreOpen: boolean;
  onToggleMore: () => void;
  onNavigate: (href: string) => void;
  onClose: () => void;
  onOpenCommand: () => void;
};

function MobileNavDrawer({
  open,
  navItems,
  moreItem,
  moreFeatureCards,
  moreQuickLinks,
  activeHref,
  isMoreOpen,
  onToggleMore,
  onNavigate,
  onClose,
  onOpenCommand,
}: MobileNavDrawerProps) {
  const visible = open;

  return (
    <div
      id="mobile-nav-drawer"
      aria-hidden={!visible}
      className="md:hidden"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[4998] bg-black/55 backdrop-blur-sm"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 220ms ease",
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed right-0 top-0 z-[4999] flex h-[100dvh] w-[min(86vw,360px)] flex-col border-l border-white/10 bg-[#0c0c10]/95 shadow-2xl"
        style={{
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="text-xs font-medium tracking-widest text-white/50 uppercase">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.href === activeHref;
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-base font-medium transition-colors"
                    style={{
                      color: isActive ? "#fff" : "#d4d4d8",
                      background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                    }}
                  >
                    <span
                      className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
                        background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                        color: isActive ? "#fff" : "#a1a1aa",
                      }}
                      aria-hidden
                    >
                      <NavItemIcon href={item.href} />
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}

            {moreItem && (
              <li>
                <button
                  type="button"
                  onClick={onToggleMore}
                  aria-expanded={isMoreOpen}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-medium text-zinc-300 transition-colors"
                >
                  <span>{moreItem.label}</span>
                  <svg
                    viewBox="0 0 20 20"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden
                    style={{
                      transform: isMoreOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 200ms ease",
                      opacity: 0.5,
                    }}
                  >
                    <path d="M5 7l5 5 5-5" />
                  </svg>
                </button>

                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isMoreOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 250ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div style={{ overflow: "hidden", minHeight: 0 }}>
                    <div className="flex flex-col gap-3 px-2 pb-3 pt-1">
                      {moreFeatureCards.map((card) => (
                        <Link
                          key={card.href}
                          href={card.href}
                          onClick={() => onNavigate(card.href)}
                          className="flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 p-3"
                          style={{
                            background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), ${card.background}`,
                          }}
                        >
                          {card.emoji && <span className="text-2xl">{card.emoji}</span>}
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-semibold text-white">{card.title}</span>
                            <span className="block truncate text-[12px] text-zinc-200/80">{card.description}</span>
                          </span>
                        </Link>
                      ))}

                      <div className="grid grid-cols-1 gap-1.5">
                        {moreQuickLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => onNavigate(link.href)}
                            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
                          >
                            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-300">
                              <svg viewBox="0 0 20 20" aria-hidden className="size-4">
                                <rect x="4" y="5" width="12" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
                                <path d="M6.5 9.5h7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                              </svg>
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-[14px] leading-tight text-zinc-100">{link.label}</span>
                              <span className="block truncate text-[12px] text-zinc-400">{link.subtitle}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => onNavigate("/links")}
            className="flex w-full items-center justify-center rounded-xl bg-white px-4 py-3.5 text-base font-semibold text-black transition-transform active:scale-[0.98]"
            style={{ boxShadow: "0 0 14px rgba(255,255,255,0.18)" }}
          >
            Contact
          </button>

          <button
            type="button"
            onClick={onOpenCommand}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80"
          >
            <span className="font-mono text-base">⌘</span>
            <span>Quick search</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function NavItemIcon({ href }: { href: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (href === "/") {
    return (
      <svg {...common}>
        <path d="M3 9.5L10 4l7 5.5" />
        <path d="M5 9v6h10V9" />
        <path d="M9 15v-3h2v3" />
      </svg>
    );
  }
  if (href === "/about") {
    return (
      <svg {...common}>
        <circle cx="10" cy="7.5" r="3" />
        <path d="M3.5 16.5c.8-3 3.4-4.5 6.5-4.5s5.7 1.5 6.5 4.5" />
      </svg>
    );
  }
  if (href === "/projects") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="14" height="12" rx="2" />
        <path d="M3 8h14" />
        <path d="M7 12h3" />
      </svg>
    );
  }
  if (href === "/blog") {
    return (
      <svg {...common}>
        <path d="M5 3h7l3 3v11H5z" />
        <path d="M7 9h6" />
        <path d="M7 12h6" />
        <path d="M7 15h4" />
      </svg>
    );
  }
  if (href === "/links") {
    return (
      <svg {...common}>
        <path d="M5 9a3 3 0 0 1 3-3h2" />
        <path d="M15 11a3 3 0 0 1-3 3h-2" />
        <path d="M8 12h7" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="10" cy="10" r="6" />
    </svg>
  );
}
