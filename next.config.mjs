/** @type {import('next').NextConfig} */

const GITLAB_PROJECT_NAME = 'carlos'
const nextConfig = {
  // reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // assetPrefix: process.env.NODE_ENV === 'production' ? `/${GITLAB_PROJECT_NAME}` : '',
  output: 'export',
  basePath: '/carlos',
}

export default nextConfig
