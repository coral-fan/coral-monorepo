import * as functions from 'firebase-functions';
import { nonceAPI, authenticationAPI } from './api';

export const nonce = functions.https.onRequest(nonceAPI);
export const auth = functions.https.onRequest(authenticationAPI);
