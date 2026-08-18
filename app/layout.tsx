import type { Metadata } from "next";
import "./globals.css";
import { AuthSessionProvider } from "@/components/providers/auth-session-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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
  const messages = await getMessages();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/images/site-img/icon.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="stylesheet" href="/assets/css/_next/static/chunks/42bc346dfa57e75d.css" />
        <link rel="stylesheet" href="/assets/css/_next/static/chunks/fdd8e3b6d7ffc309.css" />
      </head>
      <body className="bg-black text-zinc-100 overflow-x-hidden">
        <AuthSessionProvider>
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
        </AuthSessionProvider>
      </body>
    </html>
  );
}
