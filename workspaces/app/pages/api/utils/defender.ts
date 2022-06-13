import { Relayer } from 'defender-relay-client';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils';

if (!process.env.RELAYER_API_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('RELAYER_API_KEY'));
}

if (!process.env.RELAYER_SECRET_KEY) {
  throw Error(getEnvironmentVariableErrorMessage('RELAYER_SECRET_KEY'));
}

const RELAYER_CREDENTIALS = {
  apiKey: process.env.RELAYER_API_KEY,
  apiSecret: process.env.RELAYER_SECRET_KEY,
};

const MAX_PENDING_TRANSACTION = 10;

export const getRelaySigner = async () => {
  const relayer = new Relayer(RELAYER_CREDENTIALS);
  const transactions = await relayer.list({ status: 'pending' });

  if (transactions.length >= 10) {
    throw new Error(
      `Relayer has exceeded the limit of ${MAX_PENDING_TRANSACTION} pending transactions.`
    );
  }

  const provider = new DefenderRelayProvider(RELAYER_CREDENTIALS);
  const signer = new DefenderRelaySigner(RELAYER_CREDENTIALS, provider, {
    speed: 'fastest',
    validForSeconds: 45,
  });

  return signer;
};
