import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN device access during `next dev` (e.g. phone on same Wi‑Fi)
  allowedDevOrigins: ["192.168.29.96"],
};

export default nextConfig;
