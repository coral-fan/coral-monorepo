import { JsonRpcSigner } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { apiAxios } from 'libraries/api';
import { getAuthenticationMessage } from 'libraries/authentication';

export const fetchNonce = (address: string) =>
  apiAxios.post<{ nonce: number }>('nonce', {
    address: address,
  });
export const signAuthenticatedMessage = (signer: Wallet | JsonRpcSigner, nonce: number) =>
  signer.signMessage(getAuthenticationMessage(nonce));

export const fetchFirebaseAuthToken = (address: string, signedMessage: string) =>
  apiAxios.post<{ token: string }>('auth', {
    address,
    signedMessage,
  });

export const fetchIsSigningUp = (idToken: string) =>
  apiAxios.post<{ isSigningUp: boolean }>('is-signing-up', {
    idToken,
  });
