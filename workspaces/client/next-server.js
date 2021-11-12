// TODO: figure out how to ignore js files for typescript linting
/* eslint-disable @typescript-eslint/no-var-requires -- this prevents the require statement from causing linting error */
const { https } = require('firebase-functions');
const next = require('next');

const isDevelopment = process.env.NODE_ENV === 'development';

const server = next({
  dev: isDevelopment,
  conf: { distDir: '.next' },
});

exports.nextServer = https.onRequest((req, res) =>
  server.prepare().then(() => server.getRequestHandler()(req, res))
);
