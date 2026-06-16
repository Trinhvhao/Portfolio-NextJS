import type { Metadata } from "next";
import "./globals.css";
import { AuthSessionProvider } from "@/components/providers/auth-session-provider";

export const metadata: Metadata = {
  title: "Trinh Van Hao",
  description: "Cloned page served through Next.js",
  icons: {
    icon: "/afordin-64px.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/assets/css/_next/static/chunks/42bc346dfa57e75d.css" />
        <link rel="stylesheet" href="/assets/css/_next/static/chunks/fdd8e3b6d7ffc309.css" />
      </head>
      <body className="bg-black text-zinc-100">
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
