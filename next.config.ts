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
