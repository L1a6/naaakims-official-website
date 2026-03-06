import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Use webpack for dev to avoid Turbopack panics */
  devIndicators: false,
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
