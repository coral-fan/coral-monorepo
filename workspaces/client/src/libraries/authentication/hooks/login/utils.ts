import { JsonRpcSigner } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { getAuthenticationMessage } from '@common/utils';
import { SignUp } from '@common/models';
import { apiAxios } from 'libraries/api';

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
  apiAxios.post<SignUp>('is-signing-up', {
    idToken,
  });
