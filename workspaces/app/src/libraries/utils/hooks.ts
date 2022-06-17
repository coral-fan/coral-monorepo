import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <T>(
  getObservable: () => Observable<T>,
  initialState: T,
  invariant?: () => boolean
) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (invariant ? invariant() : true) {
      const observable$ = getObservable();
      const subscription = observable$.subscribe(setState);
      return () => subscription.unsubscribe();
    }
  }, [getObservable, initialState, invariant]);

  return state;
};

export const useRefetchPageData = () => {
  const router = useRouter();

  const refetchPageData = useCallback(
    async (overridePath?: string) => {
      await router.replace(overridePath ?? router.asPath);
    },
    [router]
  );

  return refetchPageData;
};

export const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return { isModalOpen, openModal, closeModal };
};
