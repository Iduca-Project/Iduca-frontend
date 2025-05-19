import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/login"
      },
      {
        source: "/home",
        destination: "/home"
      },
      {
        source: "/courses",
        destination: "/courses"
      },
      {
        source: "/calendar",
        destination: "/calendar"
      },
      {
        source: "/profile",
        destination: "/profile"
      },
      {
        source: "/forgotPass",
        destination: "/forgotPass"
      },
    ]
  }
};

export default nextConfig;
