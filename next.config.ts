import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
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
        // /blog/my-post.md => /blog/md/my-post
        // Lets visitors (and AI agents) grab the Markdown source of any post
        // by appending `.md` to the canonical URL.
        source: "/blog/:slug.md",
        destination: "/blog/md/:slug",
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
