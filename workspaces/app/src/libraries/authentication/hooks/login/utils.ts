import { Signer } from 'ethers';
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

export const getFirebaseCustomToken = async (address: string, signedMessage: string) => {
  const {
    data: { idToken },
  } = await axios.post<{ idToken: string }>('auth', {
    address,
    signedMessage,
  });

  return idToken;
};

export const getSignedAuthenticationMessage = (signer: Signer, nonce: number) => {
  const authenticationMessage = getAuthenticationMessage(nonce);
  const signedMessage = signer.signMessage(authenticationMessage);

  return signedMessage;
};
