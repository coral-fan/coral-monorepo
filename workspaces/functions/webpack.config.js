const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    entry: path.resolve('src', 'index.ts'),
    output: {
      path: path.resolve('dist'),
      filename: 'index.js',
      /*
        need to specify to make bundle compatible with cloud functions
        https://stackoverflow.com/questions/59118080/firebase-webpackbabel-functions-not-deploying
      */
      libraryTarget: 'commonjs',
    },
    /*
      need to specify because Webpack 5 doesn't polyfill Node core modules
      https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
    */
    target: 'node',
    /*
      needed to suppress WARNING in ../../node_modules/express/lib/view.js 81:13-25 Critical dependency: the request of a dependency is an expression
      https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning
    */
    externals: [{ express: { commonjs: 'express' } }],
    // this is neccessary to allow compiling file outside of directory. https://github.com/dividab/tsconfig-paths-webpack-plugin
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()],
      fallback: {
        request: false,
        ['fast-crc32c']: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          exclude: /node_modules/,
          use: ['source-map-loader'],
        },
      ],
    },
    devtool: isProduction ? 'none' : 'eval-source-map',
  };
};
