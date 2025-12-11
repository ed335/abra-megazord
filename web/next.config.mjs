/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Permite acesso ao dev server via IP público (evita warning do Next em dev)
  experimental: {
    allowedDevOrigins: [
      "http://localhost:3000",
      "http://23.251.148.183:3000",
      "http://23.251.148.183",
      "http://31.97.93.100:3000",
      "http://31.97.93.100",
      "https://abracann.org.br",
      "https://www.abracann.org.br",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
