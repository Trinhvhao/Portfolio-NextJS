import type { ReactNode } from "react";

import { AuthSessionProvider } from "@/components/providers/auth-session-provider";

export default function GuestbookLayout({ children }: { children: ReactNode }) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
