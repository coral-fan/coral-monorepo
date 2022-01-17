import { parseCookies } from 'nookies';

export const useIsTokenAuthenticated = () => parseCookies().hasOwnProperty('token');
