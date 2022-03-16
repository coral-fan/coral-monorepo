import { IncomingUserData } from 'libraries/models';
import { ERROR_RESPONSE } from '../consts';
import { Handler } from '../types';
import { getHandler } from '../utils';
import { PRIVATE_USER_DATA_PROPERTIES, USER_PROPERTIES } from './consts';
import { PrivateUserDataProperties, UserProperties } from './types';
import { upsertUser } from './utils';

const isIncomingUserDataValid = (
  incomingUserData: Record<string, unknown>
): incomingUserData is IncomingUserData =>
  Object.keys(incomingUserData).every(
    (key) =>
      USER_PROPERTIES.has(key as UserProperties) ||
      PRIVATE_USER_DATA_PROPERTIES.has(key as PrivateUserDataProperties)
  );

const post: Handler = async (req, res) => {
  const { uid, incomingUserData } = req.body;

  if (typeof uid !== 'string' || !isIncomingUserDataValid(incomingUserData)) {
    console.log(uid);
    console.log(incomingUserData);
    return res.status(400).json({ error: 'Invalid data was provided.' });
  }

  try {
    await upsertUser(uid, incomingUserData);
  } catch (error) {
    console.error(error);
    return res.status(500).json(ERROR_RESPONSE);
  }
  return res.status(200).send('');
};

export default getHandler({ post });
