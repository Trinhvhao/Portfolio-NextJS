"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { blogPosts, blogTags } from "@/lib/blog-data";

const ALL_POSTS = "All Posts";

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
      <path d="m21 21-4.34-4.34" />
      <circle cx="11" cy="11" r="8" />
    </svg>
  );
}

function RssIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}

export function BlogContent() {
  const t = useTranslations("blog");
  const [activeTag, setActiveTag] = useState<string>(t("allPosts"));
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isMacShortcut = event.metaKey && event.key.toLowerCase() === "k";
      const isWindowsShortcut = event.ctrlKey && event.key.toLowerCase() === "k";
      if (!isMacShortcut && !isWindowsShortcut) {
        return;
      }
      event.preventDefault();
      searchRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesTag = activeTag === t("allPosts") || post.tags.includes(activeTag);
      if (!matchesTag) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchable = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [activeTag, query, t]);

  return (
    <section className="flex flex-col">
      <div className="flex items-center gap-2 px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
                activeTag === t("allPosts")
                  ? "border border-neutral-300 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
              }`}
              type="button"
              onClick={() => setActiveTag(t("allPosts"))}
            >
              {t("allPosts")}
            </button>

            {blogTags.map((tag) => (
              <button
                key={tag}
                className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm capitalize transition-colors duration-200 ${
                  activeTag === tag
                    ? "border border-neutral-300 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
                }`}
                type="button"
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <label className="inline-flex h-9 items-center justify-start gap-2 rounded-lg border border-neutral-300 px-3 text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-700 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-300 lg:w-52">
            <SearchIcon />
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchAriaLabel")}
            />
            <span className="ms-auto hidden gap-0.5 text-[11px] lg:inline-flex">
              <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">⌘</kbd>
              <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">K</kbd>
            </span>
          </label>

          <a
            aria-label={t("rssFeed")}
            className="inline-flex size-9 items-center justify-center rounded-lg border bg-transparent text-neutral-400 transition-colors hover:border-neutral-400 hover:text-neutral-600 dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:text-neutral-300"
            href="/legacy-clone/assets/documents/blog/rss.xml"
            rel="noopener noreferrer"
            target="_blank"
          >
            <RssIcon />
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-3 w-full border-y bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
      />

      <div className="py-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              className="group flex h-full flex-col rounded-3xl p-2.5 ring-1 ring-neutral-300 transition-colors duration-300 hover:bg-neutral-50 dark:ring-neutral-800 dark:hover:bg-neutral-900/40"
              href={`/blog/${post.slug}`}
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                <Image
                  alt={post.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={post.image}
                />
              </div>

              <div className="flex flex-1 flex-col px-2 pb-3 pt-5">
                <h3 className="text-lg leading-snug font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-neutral-600 dark:text-white dark:group-hover:text-neutral-300">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{post.excerpt}</p>
                <div className="mt-auto pt-5 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                  <time dateTime={post.dateISO}>{post.dateLabel}</time>
                  <span className="mx-1.5">·</span>
                  <span>{post.readMinutes} {t("minRead")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-16 text-center text-sm text-neutral-500 dark:text-neutral-400">{t("noPostsFound")}</div>
        )}
      </div>
    </section>
  );
}
