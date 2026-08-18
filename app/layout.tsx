import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { SiteHeader } from "@/components/sections/site-header";
import { BookCallModalRoot } from "@/components/ui/book-call-modal";

export const metadata: Metadata = {
  title: "Trinh Van Hao",
  description: "Cloned page served through Next.js",
  icons: {
    icon: "/afordin-64px.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap" />
        <link rel="preload" href="/images/site-img/icon.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="stylesheet" href="/assets/css/_next/static/chunks/fdd8e3b6d7ffc309.css" />
      </head>
      <body className="bg-black text-zinc-100 overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
            <SiteHeader />
            <BookCallModalRoot />
            {/* Black gradient header bar */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed left-0 z-[4000] w-full select-none hidden sm:block"
              style={{
                top: 0,
                height: "150px",
                background: "linear-gradient(to bottom, #0a0a0aa4 0%, #0a0a0aa4 50%, transparent 100%)",
              }}
            />
            {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
