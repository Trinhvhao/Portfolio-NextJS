import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/legacy-clone/assets/documents/blog/rss.xml",
        destination: "/assets/other/rss",
      },
      {
        source: "/legacy-clone/assets/images/:path*",
        destination: "/images/:path*",
      },
      {
        source: "/legacy-clone/assets/:path*",
        destination: "/assets/:path*",
      },
      {
        // /en/blog/my-post.md and /vi/blog/my-post.md => /en/blog/md/my-post
        // Lets visitors (and AI agents) grab the Markdown source of any post
        // by appending `.md` to the canonical URL.
        source: "/:locale(en|vi)/blog/:slug.md",
        destination: "/:locale/blog/md/:slug",
      },
    ];
  },
  turbopack: {
    ignoreIssue: [
      {
        path: "**/next.config.ts",
        title: "Encountered unexpected file in NFT list",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
