import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.samplefaces.com" },
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "ucarecdn.com" },
    ],
  },
}

export default nextConfig
