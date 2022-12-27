/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

rewrites: async () => [
  {
    source: "/public/myfile.html",
    destination: "/pages/api/myfile.js",
  },
],

module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};
