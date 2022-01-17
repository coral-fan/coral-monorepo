import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <T>(
  getObservable: (initialState?: T) => Observable<T>,
  initialState: T,
  invariant: () => boolean = () => true
) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (invariant()) {
      const observable$ = getObservable(initialState);
      const subscription = observable$.subscribe(setState);
      return () => subscription.unsubscribe();
    }
  }, [invariant, getObservable, setState, initialState]);

  return state;
};
