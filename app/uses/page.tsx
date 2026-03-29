import type { Metadata } from "next";

import { StaticPageLayout } from "@/components/sections/static-page-layout";
import { usesPageContent } from "@/lib/static-page-content";

export const metadata: Metadata = {
  title: "Uses | Trinh Van Hao",
  description: "Hardware, software, and workflow defaults used for day-to-day engineering work.",
};

export default function UsesPage() {
  return <StaticPageLayout content={usesPageContent} />;
}
