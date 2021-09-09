/*
Logic that ended up not being used. Leaving here in-case need to revisit anything
*/
export {};
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import type { UrlObject } from 'url';
// import { useLogout } from 'utils/hooks/authentication';

// const getLoginUrl = (route: string): string | UrlObject => {
//   const LOGIN_ROUTE = '/login';
//   if (route !== '/') {
//     return {
//       pathname: LOGIN_ROUTE,
//       query: {
//         redirect: route,
//       },
//     };
//   }
//   return LOGIN_ROUTE;
// };
// export const useConditionalRedirect = (condition: boolean, route: string) => {
//   const router = useRouter();
//   useEffect(() => {
//     if (condition && router.route !== '/login') {
//       router.push(getLoginUrl(router.asPath));
//     }
//   }, []);
// };

// // sets up event listeners for metamask events to log the user out when the account or network changes
// export const useInitializeMetaMaskListeners = () => {
//   const handleLogoutEvent = useLogout();
//   useEffect(() => {
//     const { ethereum } = window;
//     if (ethereum?.on) {
//       ethereum.on('accountsChanged', handleLogoutEvent);
//       ethereum.on('chainChanged', handleLogoutEvent);

//       if (ethereum.removeEventListener) {
//         return () => {
//           ethereum.removeEventListener('accountsChanged', handleLogoutEvent);
//           ethereum.removeEventListener('chainChanged', handleLogoutEvent);
//         };
//       }
//     }
//   }, []);
// };
