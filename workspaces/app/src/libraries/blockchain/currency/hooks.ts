import { getAvaxTokenPrice$, getCurrencyPairPrice$ } from './observables';
import { useEffect, useState } from 'react';
import { delay, tap } from 'rxjs';

// TODO: Refactor hook
export const useAvaxUsdPrice = () => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = getCurrencyPairPrice$('avax_usd')
      .pipe(
        tap(() => setIsLoading(true)),
        delay(1000)
      )
      .subscribe((exchangeRate) => {
        setExchangeRate(exchangeRate);
        setIsLoading(false);
      });
    return () => subscription.unsubscribe();
  }, []);

  return { exchangeRate, isLoading };
};

// TODO: Refactor hook
export const useAvaxTokenPrice = (collectionId: string) => {
  const [avaxTokenPrice, setAvaxTokenPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = getAvaxTokenPrice$(collectionId)
      .pipe(
        tap(() => setIsLoading(true)),
        delay(1000)
      )
      .subscribe((avaxTokenPrice) => {
        setAvaxTokenPrice(avaxTokenPrice);
        setIsLoading(false);
      });
    return () => subscription.unsubscribe();
  }, [collectionId]);

  return { avaxTokenPrice, isLoading };
};
