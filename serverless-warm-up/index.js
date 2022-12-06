const functions = require('firebase-functions');
const axios = require('axios');

const baseUrl = 'https://coral.fan';

const merchOrderApiUrls = ['create', 'update-status', 'update-transaction-hash'].map(
  (merchOrderApiUrl) => `merch-order/${merchOrderApiUrl}`
);

const nftApiUrls = ['mint-for-free', 'redeem'].map((nftApiUrl) => `nft/${nftApiUrl}`);

const paymentApiUrls = ['get-card', 'pay'].map((paymentApiUrl) => `payment/${paymentApiUrl}`);

const defenderWebhookUrls = ['index-transfer', 'capture-charge', 'complete-crypto-purchase'].map(
  (defenderWebhookUrl) => `webhook/defender/${defenderWebhookUrl}`
);

const apiUrls = [
  'auth',
  'nonce',
  'share-to-earn/verify/tweet',
  ...paymentApiUrls,
  ...defenderWebhookUrls,
  'webhook/stripe/mint-nft',
  'is-signing-up',
  'purchase',
  'shipping-info',
  ...nftApiUrls,
  ...merchOrderApiUrls,
].map((apiUrl) => `${baseUrl}/api/${apiUrl}`);

const warmUpApiEndpoints = async () => {
  const requests = apiUrls.map((url) => axios.post(url));
  await Promise.allSettled(requests);
  return null;
};

exports.keepServerlessApiEndpointsWarm = functions.pubsub
  .schedule('every 3 minutes')
  .onRun(warmUpApiEndpoints);

const pageUrls = ['', 'artist/pinder', 'stream', 'user'].map((pageUrl) => `${baseUrl}/${pageUrl}`);

const warmUpPageEndpoints = async () => {
  const requests = pageUrls.map((url) => axios.get(url));
  await Promise.allSettled(requests);
  return null;
};

exports.keepServerlessPageEndpointsWarm = functions.pubsub
  .schedule('every 3 minutes')
  .onRun(warmUpPageEndpoints);
