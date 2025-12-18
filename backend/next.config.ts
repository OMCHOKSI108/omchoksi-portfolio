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
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
    // Add other known external hosts you expect to use (optional)
    // `domains` is deprecated; using `remotePatterns` instead to restrict remote images
  },
  // Redirect some legacy or convenience routes to the admin area
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/admin/projects',
        permanent: true,
      },
      {
        source: '/projects/:path*',
        destination: '/admin/projects/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
