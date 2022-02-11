import { getCoralAPIAxios } from 'libraries/utils/api';
import { IncomingUserData } from '.';

const axios = getCoralAPIAxios();

export const upsertUser = async (uid: string, incomingUserData: IncomingUserData) => {
  await axios.post('user', {
    uid,
    incomingUserData,
  });
};
