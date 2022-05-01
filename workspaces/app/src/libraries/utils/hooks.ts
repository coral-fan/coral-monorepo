import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <T>(
  getObservable: (initialState?: T) => Observable<T>,
  initialState: T,
  invariant?: () => boolean
) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (invariant ? invariant() : true) {
      const observable$ = getObservable(initialState);
      const subscription = observable$.subscribe(setState);
      return () => subscription.unsubscribe();
    }
  }, [getObservable, initialState, invariant]);

  return state;
};

export const useRefetchPageData = () => {
  const router = useRouter();

  const refetchPageData = useCallback(async () => {
    await router.replace(router.asPath);
  }, [router]);

  return refetchPageData;
};

export const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return { isModalOpen, openModal, closeModal };
};
