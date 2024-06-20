/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: "/dashboard",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
    {
      source: "/app/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
};

export default nextConfig;
