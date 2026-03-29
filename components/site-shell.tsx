import Link from "next/link";
import { ReactNode } from "react";

import { navItems } from "@/lib/site-data";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-semibold tracking-wide text-zinc-50">
            Trinh Van Hao
          </Link>
          <ul className="hidden gap-5 text-sm text-zinc-300 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  className="relative px-2 py-1 transition-colors duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 after:transition-all after:duration-300 hover:after:w-full group"
                  href={item.href}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute -inset-1.5 rounded-md bg-gradient-to-r from-cyan-400/0 to-blue-500/0 opacity-0 blur transition-all duration-300 group-hover:from-cyan-400/10 group-hover:to-blue-500/10 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-5 py-10">{children}</main>
      <footer className="mx-auto mt-16 w-full max-w-6xl border-t border-zinc-800 px-5 py-8 text-sm text-zinc-400">
        <p>From concept to creation. Let us make it happen.</p>
      </footer>
    </div>
  );
}
