export const locales = ["en", "vi"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];
