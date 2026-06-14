"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "vi" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[6000]">
      <button
        onClick={toggleLocale}
        disabled={isPending}
        className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-50"
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
        aria-label="Toggle language"
      >
        {locale === "en" ? "VI" : "EN"}
      </button>
    </div>
  );
}
