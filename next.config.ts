import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix for multiple lockfiles warning
  outputFileTracingRoot: process.cwd(),
  
  // Fix for Vercel deployment issues
  experimental: {
    // Fix for client reference manifest issues
    optimizePackageImports: ['lucide-react', 'react-icons'],
    // Disable problematic features for Vercel
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  
  // External packages for server components
  serverExternalPackages: [],
  
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
  
  // Webpack configuration for Vercel
  webpack: (config, { isServer, dev, webpack }) => {
    // Fix for client reference manifest issues on Vercel
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        assert: false,
        http: false,
        https: false,
        os: false,
        buffer: false,
      };
    }
    
    // Fix for Vercel client reference manifest error
    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/server\/.*\.js$/,
        })
      );
    }
    
    // Fix for Vercel build issues
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // Output configuration for Vercel deployment
  // output: 'standalone', // Commented out for Vercel compatibility
  
  // Additional Vercel-specific fixes
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
