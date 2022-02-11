import { JsonRpcSigner } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { getCoralAPIAxios } from 'libraries/utils/api';
import { getAuthenticationMessage } from 'libraries/authentication';

const axios = getCoralAPIAxios();

export const getNonce = async (address: string) => {
  const {
    data: { nonce },
  } = await axios.post<{ nonce: number }>('nonce', {
    address: address,
  });

  return nonce;
};

export const getFirebaseAuthToken = async (address: string, signedMessage: string) => {
  const {
    data: { token },
  } = await axios.post<{ token: string }>('auth', {
    address,
    signedMessage,
  });

  return token;
};

export const getSignedAuthenticationMessage = (signer: Wallet | JsonRpcSigner, nonce: number) =>
  signer.signMessage(getAuthenticationMessage(nonce));
