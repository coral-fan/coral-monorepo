// @ts-check

/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');

module.exports = withImages({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  productionBrowserSourceMaps: true,
  images: {
    // TODO: clean up allowed domains
    domains: [
      'upload.wikimedia.org',
      'firebasestorage.googleapis.com',
      'www.stereofox.com',
      'www.coral.fan',
    ], // Placeholder Avatar Image
  },
  experimental: {
    externalDir: true,
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
