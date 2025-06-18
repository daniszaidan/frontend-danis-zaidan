import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://202.157.176.100:3001/:path*',
      },
    ];
  },
};

export default nextConfig;
