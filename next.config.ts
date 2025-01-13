import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "saawree.binateit.local",
        port: "",
        pathname: "/Files/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
