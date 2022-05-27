import axios from 'axios';
import axiosRetry from 'axios-retry';
import { CORAL_API_ENDPOINT } from 'consts';

const coralAPIAxios = axios.create({
  baseURL: CORAL_API_ENDPOINT,
});

axiosRetry(coralAPIAxios, { retryDelay: axiosRetry.exponentialDelay });

export const getCoralAPIAxios = () => coralAPIAxios;
