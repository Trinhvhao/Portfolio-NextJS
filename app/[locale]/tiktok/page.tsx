import type { Metadata } from "next";

import { StaticPageLayout } from "@/components/sections/static-page-layout";
import { tiktokPageContent } from "@/lib/static-page-content";

export const metadata: Metadata = {
  title: "Follow Me on TikTok | Trinh Van Hao",
  description: "Vietnamese tech content, coding tips, and developer life on TikTok.",
};

export default function TiktokPage() {
  return <StaticPageLayout content={tiktokPageContent} />;
}
