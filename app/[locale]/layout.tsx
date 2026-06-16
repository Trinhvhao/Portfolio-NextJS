import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/sections/site-header";
import { BookCallModalRoot } from "@/components/ui/book-call-modal";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!["en", "vi"].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SiteHeader />
      <BookCallModalRoot />
      {/* Black gradient header bar - placed after interactive elements to avoid creating a containing block (filter) that traps fixed positioning */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 z-[4000] w-full select-none"
        style={{
          top: 0,
          height: "150px",
          background: "linear-gradient(to bottom, #0a0a0aa4 0%, #0a0a0aa4 50%, transparent 100%)",
        }}
      />
      {children}
      <LanguageSwitcher />
    </NextIntlClientProvider>
  );
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}
