"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALE_COOKIE = "NEXT_LOCALE";

function setLocaleCookie(locale: string) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "vi" : "en";
    const currentPath = window.location.pathname.replace(/^\/(en|vi)/, "") || "/";
    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.href = `/${newLocale}${currentPath}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[6000]">
      <button
        onClick={toggleLocale}
        className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}
        aria-label={locale === "en" ? "Switch to Vietnamese" : "Switch to English"}
      >
        {locale === "en" ? "VI" : "EN"}
      </button>
    </div>
  );
}
