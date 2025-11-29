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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    return config;
  },
};

export default nextConfig;
