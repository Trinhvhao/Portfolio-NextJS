import { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <section className="relative">{children}</section>;
}
