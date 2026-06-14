import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Hide the locale prefix in URLs: /about instead of /en/about or /vi/about.
  // The active locale is stored in a cookie and selected by the middleware
  // based on the cookie, then exposed via the [locale] route segment params.
  localePrefix: "never",
  localeDetection: false,
});
