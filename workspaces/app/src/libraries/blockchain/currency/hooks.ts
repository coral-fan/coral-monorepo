import { getCurrencyPairPrice$ } from './observables';
import { useEffect, useState } from 'react';
import { delay, tap } from 'rxjs';

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
