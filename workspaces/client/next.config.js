/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  /*
    neccessary to ensure Next can compile file outside of project directory.
    https://github.com/vercel/next.js/blob/canary/packages/next/build/webpack-config.ts (line 927, search config.experimental.externalDir)
    https://stackoverflow.com/questions/63450928/nextjs-import-external-components-from-parent-directory
    https://github.com/vercel/next.js/issues/9474#issuecomment-810212174
  */

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
      };
    }
    return config;
  },
};
