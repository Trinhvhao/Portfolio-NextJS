import type { Metadata } from "next";

import { StaticPageLayout } from "@/components/sections/static-page-layout";
import { privacyPageContent } from "@/lib/static-page-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Trinh Van Hao",
  description: "How we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return <StaticPageLayout content={privacyPageContent} />;
}
