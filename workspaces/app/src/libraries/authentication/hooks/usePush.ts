import { useRef, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

/*
Todo: Make a useRouting hook that returns an object of functinos from Next Router;
See useWeb3;
*/
export const usePush = (): NextRouter['push'] => {
  const router = useRouter();
  const routerRef = useRef(router);

  routerRef.current = router;

  const [{ push }] = useState<Pick<NextRouter, 'push'>>({
    push: (path) => routerRef.current.push(path),
  });
  return push;
};
