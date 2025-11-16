import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  server: {
    port: 3001,
  },
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://crexy-media-dev.s3.ap-southeast-1.amazonaws.com/**"),
    ],
  },
};

export default nextConfig;
