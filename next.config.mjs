/** @type {import('next').NextConfig} */

const GITLAB_PROJECT_NAME = 'carlos'

const nextConfig = {
  
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true, 
  },
}

export default nextConfig
