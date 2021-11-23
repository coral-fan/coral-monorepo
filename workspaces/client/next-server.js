// implementation inspired by https://dev.to/rowaxl/what-i-struggled-with-next-js-using-firebase-hosting-and-enable-ssr-4e67
// TODO: figure out how to ignore js files for typescript linting
/* eslint-disable @typescript-eslint/no-var-requires -- this prevents the require statement from causing linting error */
const { https } = require('firebase-functions');
const next = require('next');

const server = next({
  conf: { distDir: '.next' },
});

exports.nextServer = https.onRequest((req, res) =>
  server.prepare().then(() => server.getRequestHandler()(req, res))
);
