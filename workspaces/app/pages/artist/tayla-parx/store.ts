import { getDoesOwnToken } from 'libraries/blockchain/utils';
import { getArtist } from 'libraries/models';
import { createStore } from 'libraries/store';
import { TaylaParxData, TaylaParxMetadata } from './types';

export const {
  Provider: TaylaParxProvider,
  useStore: useTaylaParxStore,
  initializeStore: initializeTaylaParxStore,
  useCreateStore: useCreateTaylaParxStore,
} = createStore<TaylaParxData>();

export const getInitialTaylaParxStoreState = async (
  address: string | undefined
): Promise<TaylaParxData> => {
  const taylaParxData = await getArtist<TaylaParxMetadata>('tayla-parx');

  if (!taylaParxData) {
    throw new Error('Tayla Parx data is undefined.');
  }

  const initialDoesUserHaveTaylaParxAllAccessPass =
    address === undefined
      ? false
      : await getDoesOwnToken(taylaParxData.metadata.id.allAccessPass, address);

  const taylaParxStore = initializeTaylaParxStore({
    ...taylaParxData,
    initialDoesUserHaveAccessPass: initialDoesUserHaveTaylaParxAllAccessPass,
  });

  return JSON.parse(JSON.stringify(taylaParxStore.getState()));
};
