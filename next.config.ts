import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home"
      },
      {
        source: "/login",
        destination: "/login"
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
    ]
  }
};

export default nextConfig;
