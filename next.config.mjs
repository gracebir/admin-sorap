/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  transpilePackages: ["@mdxeditor/editor"],
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "miro.medium.com",
      },
    ],
  },
};

export default nextConfig;
