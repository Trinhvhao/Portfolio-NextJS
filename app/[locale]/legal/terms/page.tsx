import type { Metadata } from "next";

import { StaticPageLayout } from "@/components/sections/static-page-layout";
import { termsPageContent } from "@/lib/static-page-content";

export const metadata: Metadata = {
  title: "Terms of Use | Trinh Van Hao",
  description: "Rules and conditions for using this website and its content.",
};

export default function TermsPage() {
  return <StaticPageLayout content={termsPageContent} />;
}
