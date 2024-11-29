/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enforce React best practices
    typescript: {
      ignoreBuildErrors: true, // Ignore TypeScript errors during build
    },
    // If you use a custom output directory (optional):
    // distDir: 'build',
    env: {
      // Define any required environment variables here
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
  };
  
  module.exports = nextConfig;
  