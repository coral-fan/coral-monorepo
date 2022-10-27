import { useRouter } from 'next/router';
import { useCallback } from 'react';

// this hook returns a function that'll remove all hashes and url parameters from the url
export const useCleanUrl = () => {
  const router = useRouter();
  const cleanUrl = useCallback(() => {
    router.replace({ pathname: router.pathname, query: router.query }, undefined, {
      shallow: true,
    });
  }, [router]);

  return cleanUrl;
};
