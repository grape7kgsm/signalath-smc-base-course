import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/freecontents",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/freecontents",
        basePath: false,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/apply",
          destination: "https://signalath.com/freecontents/apply",
          basePath: false,
        },
        {
          source: "/api/apply",
          destination: "https://signalath.com/freecontents/api/apply",
          basePath: false,
        },
        {
          source: "/offer",
          destination: "https://signalath.com/freecontents/offer",
          basePath: false,
        },
        {
          source: "/offer/:path*",
          destination: "https://signalath.com/freecontents/offer/:path*",
          basePath: false,
        },
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.catbox.moe",
      },
    ],
  },
};

export default nextConfig;
