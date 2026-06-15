import type { Metadata } from "next";
import Image from "next/image";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { LinksMainSection } from "../../components/sections/links-main-section";

export const metadata: Metadata = {
  title: "Contact | Trinh Van Hao",
  description: "Get in touch, explore links, and send a message.",
};

export default async function LinksPage() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] h-[450px] w-full overflow-hidden bg-neutral-100/70 dark:bg-neutral-950/93"
        style={{ maskImage: "linear-gradient(rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%)" }}
      >
        <Image
          alt="crumpled paper texture"
          className="pointer-events-none absolute inset-0 z-[-1] h-[450px] w-full select-none object-cover mix-blend-overlay"
          fill
          sizes="100vw"
          src="/images/crumpled-paper.avif"
          priority
        />
      </div>

      <main className="container relative flex flex-col max-sm:px-1">
        <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
          <div
            aria-hidden
            className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />

          <div className="relative col-span-1 min-w-0">
            <LinksMainSection />
          </div>

          <div
            aria-hidden
            className="w-full border-x border-neutral-300 bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] dark:border-neutral-800 dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
          />
        </div>
      </main>
    </NextIntlClientProvider>
  );
}