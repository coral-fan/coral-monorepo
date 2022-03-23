import axios from 'axios';
import { CORAL_API_ENDPOINT } from 'consts';

const coralAPIAxios = axios.create({
  baseURL: CORAL_API_ENDPOINT,
});

export const getCoralAPIAxios = () => coralAPIAxios;
