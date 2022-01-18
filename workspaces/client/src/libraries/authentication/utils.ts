import { parseCookies } from 'nookies';

export const getToken = () => parseCookies().token;
