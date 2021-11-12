import * as functions from 'firebase-functions';
import { nonceAPI, authenticationAPI, isSigningUpAPI } from './api';

export const nonce = functions.https.onRequest(nonceAPI);
export const auth = functions.https.onRequest(authenticationAPI);
export const isSigningUp = functions.https.onRequest(isSigningUpAPI);
