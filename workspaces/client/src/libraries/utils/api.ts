import axios from 'axios';
import { API_ENDPOINT } from 'consts';

const coralAPIAxios = axios.create({
  baseURL: API_ENDPOINT,
});

export const getCoralAPIAxios = () => coralAPIAxios;
