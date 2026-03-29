import type { Metadata } from "next";

import { StaticPageLayout } from "@/components/sections/static-page-layout";
import { privacyPageContent } from "@/lib/static-page-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Trinh Van Hao",
  description: "How data is collected, used, and protected on this website.",
};

export default function PrivacyPage() {
  return <StaticPageLayout content={privacyPageContent} />;
}
