import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  server: {
    port: 3001,
  },
   images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/**')],
  },
};

export default nextConfig;
