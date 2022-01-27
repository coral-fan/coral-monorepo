import { useEffect, useState } from 'react';
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
