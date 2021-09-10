/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      /*
       fallback field needed due to Webpack 5 no longer auto-polyfilling node core modules
      See https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
       */
      config.plugins = [...config.plugins, new NodePolyfillPlugin()];
    }

    return config;
  },
};
