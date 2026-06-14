import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|favicon.ico|robots.txt|sitemap.xml|assets|_next/static|_next/image|images|svg|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.webp).*)",
  ],
};
