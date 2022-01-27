import { JsonRpcSigner } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { apiAxios } from 'libraries/api';
import { getAuthenticationMessage } from 'libraries/authentication';

export const fetchNonce = async (address: string) => {
  const {
    data: { nonce },
  } = await apiAxios.post<{ nonce: number }>('nonce', {
    address: address,
  });

  return nonce;
};

export const fetchFirebaseAuthToken = async (address: string, signedMessage: string) => {
  const {
    data: { token },
  } = await apiAxios.post<{ token: string }>('auth', {
    address,
    signedMessage,
  });

  return token;
};

export const signAuthenticatedMessage = (signer: Wallet | JsonRpcSigner, nonce: number) =>
  signer.signMessage(getAuthenticationMessage(nonce));
