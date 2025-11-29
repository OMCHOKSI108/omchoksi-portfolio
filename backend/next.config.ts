import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongoose'],
  compress: true,
  images: {
    // Allow images from Unsplash used by your projects
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
    // Add other known external hosts you expect to use (optional)
    domains: ['source.unsplash.com', 'res.cloudinary.com', 'images.pexels.com'],
  },
};

export default nextConfig;
