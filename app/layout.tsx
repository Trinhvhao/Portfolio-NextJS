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
        <link rel="preload" href="/images/site-img/icon.webp" as="image" type="image/webp" fetchPriority="high" />
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
            <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
