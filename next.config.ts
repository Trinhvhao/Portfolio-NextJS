import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
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
    ];
  },
};

export default nextConfig;
