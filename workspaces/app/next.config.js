/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');

module.exports = withImages({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  productionBrowserSourceMaps: true,
  images: {
    domains: ['upload.wikimedia.org'], // Placeholder Avatar Image
  },
  webpack: (config, { isServer }) => {
    // resolves issues with Firebase Admin
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        net: false,
        tls: false,
        request: false,
        worker_threads: false,
        ['fast-crc32c']: false,
        http2: false,
        dns: false,
      };
    }

    return config;
  },
});
