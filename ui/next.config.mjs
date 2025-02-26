const nextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
};

export default nextConfig
