/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["brandu-bucket.s3.ap-northeast-2.amazonaws.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
