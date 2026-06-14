"use client";

import { Command } from "cmdk";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import {
  Search,
  Sun,
  Home,
  User,
  Briefcase,
  FileText,
  BookHeart,
  ListChecks,
  Laptop,
  Link as LinkIcon,
  CalendarDays,
  Medal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function CommandMenu({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const tLinks = useTranslations("links");
  const tCommandMenu = useTranslations("commandMenu");

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    startTransition(() => {
      const newPathname = pathname.replace(/^\/(en|vi)/, `/${newLocale}`);
      router.push(newPathname);
    });
    setOpen(false);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const dialog = document.querySelector("[role='dialog']");
      if (dialog && !dialog.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const quickLinks = [
    { label: tCommandMenu("quickLinks.bookACall"), icon: CalendarDays, href: "/book" },
    { label: tCommandMenu("quickLinks.resume"), icon: FileText, href: "/about" },
    { label: tCommandMenu("quickLinks.bucketList"), icon: ListChecks, href: "/bucket-list" },
    { label: tCommandMenu("quickLinks.skills"), icon: Briefcase, href: "/projects" },
    { label: tCommandMenu("quickLinks.attribution"), icon: Medal, href: "/attribution" }
  ];

  const pageLinks = [
    { label: tNav("home"), icon: Home, href: "/" },
    { label: tNav("about"), icon: User, href: "/about" },
    { label: tNav("projects"), icon: Briefcase, href: "/projects" },
    { label: tNav("blog"), icon: FileText, href: "/blog" },
    { label: tNav("guestbook"), icon: BookHeart, href: "/guestbook" },
    { label: tNav("bucketList"), icon: ListChecks, href: "/bucket-list" },
    { label: tNav("uses"), icon: Laptop, href: "/uses" },
    { label: tCommandMenu("quickLinks.attribution"), icon: Medal, href: "/attribution" },
    { label: tNav("contact"), icon: LinkIcon, href: "/links" },
  ];

  const connectLinks = [
    { 
      label: tLinks("githubTitle"), 
      href: "https://github.com/Trinhvhao",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.04c3.1-.3 6-1.5 6-6.96 0-1.5-.5-2.8-1.5-3.8.1-.5.7-2.7-.1-4.7 0 0-1-1.3-3.2 0-1.5-.3-3-.3-4.5 0-2.2-1.3-3.2 0-3.2 0-.9 2-.2 4.2-.1 4.7-1 1-1.5 2.3-1.5 3.8 0 5.4 2.9 6.6 6 7a4.9 4.9 0 0 0-1.1 2.9V22"></path><path d="M9 20c-4.5 1.5-5-2-7-2"></path></svg>
      )
    },
    { 
      label: tLinks("linkedinTitle"), 
      href: "https://linkedin.com/in/hayyie111",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      )
    },
    { 
      label: tLinks("twitterTitle"), 
      href: "https://twitter.com",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
      )
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog 
          open={open} 
          onOpenChange={setOpen}
          label={tCommon("commandMenu")}
          contentClassName="fixed inset-0 z-50 flex items-end sm:items-start justify-center pt-[15vh] pb-6 sm:pb-0"
          overlayClassName="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        >
          <VisuallyHidden>
            <DialogTitle>{tCommon("commandMenu")}</DialogTitle>
          </VisuallyHidden>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl flex flex-col mx-4 sm:mx-0 relative z-50"
            style={{ maxHeight: "calc(100vh - 15vh - 24px)" }}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-[#141414] px-4 py-3">
              <div className="flex items-center gap-3 flex-1">
                <Search className="size-5 text-zinc-500" />
                <Command.Input 
                  placeholder={tCommon("searchPlaceholder")} 
                  className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-zinc-500 text-zinc-100 placeholder:font-normal"
                  autoFocus
                />
              </div>
              <div className="flex items-center gap-2 border-l border-white/10 pl-3 ml-2 flex-shrink-0">
                <div className="flex items-center gap-1 rounded-full border border-white/10 p-0.5">
                  <button
                    onClick={() => switchLocale("en")}
                    disabled={isPending}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                      locale === "en"
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    aria-label={tCommon("switchToEnglish")}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => switchLocale("vi")}
                    disabled={isPending}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                      locale === "vi"
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    aria-label={tCommon("switchToVietnamese")}
                  >
                    VI
                  </button>
                </div>
                <Link href="/links" className="rounded-full px-3 py-1 text-sm font-medium text-white hover:bg-white/10 border border-white/10 transition-colors">
                  {tCommandMenu("connectLink")}
                </Link>
                <button className="rounded-full p-[6px] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center">
                  <Sun className="size-4" />
                </button>
              </div>
            </div>

            <Command.List className="overflow-y-auto overflow-x-hidden p-3 style-scroll">
              <Command.Empty className="py-6 text-center text-sm text-zinc-400">
                {tCommon("noResults")}
              </Command.Empty>

              <div className="mb-4">
                <div className="flex items-center justify-between px-2 mb-2">
                  <h3 className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">{tCommandMenu("recent")}</h3>
                  <button className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase hover:text-zinc-300">{tCommandMenu("clear")}</button>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-3 px-2 no-scrollbar">
                  {quickLinks.map((item, i) => (
                     <button key={i} onClick={() => runCommand(() => router.push(item.href))} className="flex flex-shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 cursor-pointer hover:bg-white/10 transition-colors">
                       <item.icon className="size-3.5 text-zinc-500" />
                       {item.label}
                     </button>
                  ))}
                </div>
              </div>

              <div className="px-2 mb-2">
                <h3 className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">{tCommandMenu("pages")}</h3>
              </div>
              
              <Command.Group className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 px-1">
                  {pageLinks.map((item) => (
                    <Command.Item
                      key={item.label}
                      onSelect={() => runCommand(() => router.push(item.href))}
                      className="group flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-zinc-400 transition-colors group-hover:bg-white/10 group-hover:border-white/10 group-hover:text-white group-data-[selected=true]:bg-white/10 group-data-[selected=true]:border-white/10 group-data-[selected=true]:text-white">
                          <item.icon className="size-4" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </Command.Item>
                  ))}
                </div>
              </Command.Group>

              <div className="px-2 mb-2 mt-4">
                <h3 className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">{tCommandMenu("connect")}</h3>
              </div>

              <Command.Group>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-1">
                   {connectLinks.map((item) => (
                      <Command.Item
                        key={item.label}
                        onSelect={() => runCommand(() => window.open(item.href, "_blank"))}
                      className="group flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                      >
                       <div className="flex size-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-zinc-400 transition-colors group-hover:bg-white/10 group-hover:text-white group-data-[selected=true]:bg-white/10 group-data-[selected=true]:text-white">
                            <item.icon className="size-4" />
                         </div>
                         <span className="font-medium">{item.label}</span>
                       <span className="ml-auto text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100 group-data-[selected=true]:opacity-100">↗</span>
                      </Command.Item>
                   ))}
                 </div>
              </Command.Group>
            </Command.List>

            <style jsx global>{`
              .style-scroll::-webkit-scrollbar {
                width: 12px;
                background-color: transparent;
              }
              .style-scroll::-webkit-scrollbar-thumb {
                border-radius: 6px;
                background-color: rgba(255, 255, 255, 0.1);
                border: 3px solid #0f0f0f;
              }
              .style-scroll::-webkit-scrollbar-thumb:hover {
                background-color: rgba(255, 255, 255, 0.2);
              }
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}
