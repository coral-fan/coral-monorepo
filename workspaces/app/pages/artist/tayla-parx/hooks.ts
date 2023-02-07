import { useTaylaParxStore } from './store';

export const useTaylaParxAllAccessPassId = () => {
  const {
    metadata: {
      id: { allAccessPass: taylaParxAllAccessPassId },
    },
  } = useTaylaParxStore();

  return taylaParxAllAccessPassId;
};
