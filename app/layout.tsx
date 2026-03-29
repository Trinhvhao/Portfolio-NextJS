import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/sections/site-header";
import { AuthSessionProvider } from "@/components/providers/auth-session-provider";
import { BookCallModalRoot } from "@/components/ui/book-call-modal";

export const metadata: Metadata = {
  title: "Trinh Van Hao",
  description: "Cloned page served through Next.js",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <link rel="stylesheet" href="/assets/css/_next/static/chunks/42bc346dfa57e75d.css" />
        <link rel="stylesheet" href="/assets/css/_next/static/chunks/fdd8e3b6d7ffc309.css" />
      </head>
      <body className="bg-black text-zinc-100">
        <AuthSessionProvider>
          <div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 z-40 w-full select-none bg-linear-to-t from-transparent to-[#f5f4f330] dark:to-[#0a0a0aa4]"
            style={{
              top: 0,
              height: "150px",
              maskImage: "linear-gradient(to bottom, black 50%, transparent)",
              backdropFilter: "blur(5px)",
            }}
          />
          <SiteHeader />
          <BookCallModalRoot />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
