export const getAuthenticationMessage = (nonce: number) =>
  `Hi from Crypto Music (Tentative)!\n
   Sign this message to prove you own this wallet to login. This won't cost any AVAX.\n
   As a security measure, here's a nonce: ${nonce}`;
