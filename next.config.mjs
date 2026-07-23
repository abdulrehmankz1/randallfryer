/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
  // /privacy-policy and /terms-of-service are the canonical policy URLs
  // (per the A2P Website Compliance SOP). Keep the older short paths working
  // by redirecting them to the canonical ones.
  async redirects() {
    return [
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-of-service", permanent: true },
    ];
  },
};

export default nextConfig;
