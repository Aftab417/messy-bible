import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix for multiple lockfiles warning
  outputFileTracingRoot: process.cwd(),
  
  // Fix for Vercel deployment issues
  experimental: {
    // Disable problematic features that cause deployment issues
    serverComponentsExternalPackages: [],
  },
  
  // Configure images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**"
      }
    ],
  },
  
  // Simplified webpack configuration for Vercel
  webpack: (config, { isServer }) => {
    // Fix for client reference manifest issues on Vercel
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    return config;
  },
  
  // Output configuration for Vercel deployment
  // Remove standalone output for Vercel compatibility
};

export default nextConfig;
