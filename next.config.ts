import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig
