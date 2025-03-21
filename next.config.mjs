/** @type {import('next').NextConfig} */

const GITLAB_PROJECT_NAME = 'carlos'
const nextConfig = {
  // reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // assetPrefix: process.env.NODE_ENV === 'production' ? `/${GITLAB_PROJECT_NAME}` : '',
  output: 'export',
  // basePath: '',
  basePath: '/last-autumn-leaf.github.io',  // The name of your repository
  assetPrefix: '/last-autumn-leaf.github.io',  // Ensure static assets are prefixed correctly

}

export default nextConfig
