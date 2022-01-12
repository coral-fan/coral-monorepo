import axios from 'axios';
import { API_ENDPOINT } from 'consts';

export const apiAxios = axios.create({
  baseURL: API_ENDPOINT,
});
