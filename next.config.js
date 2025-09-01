/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig