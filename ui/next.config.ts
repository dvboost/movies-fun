import { withNextVideo } from "next-video/process";
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}

export default withNextVideo(nextConfig);