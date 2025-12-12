import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com'], // allow both domains
  },
};

export default nextConfig;
