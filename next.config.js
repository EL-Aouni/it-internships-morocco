/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/it-internships-morocco',
  assetPrefix: '/it-internships-morocco/',
}

module.exports = nextConfig