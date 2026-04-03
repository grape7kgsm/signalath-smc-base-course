import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/freecontents",
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
