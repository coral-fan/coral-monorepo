import { getCurrencyPairPrice$ } from './observables';
import { useEffect, useState } from 'react';
import { delay, mergeMapTo, timer } from 'rxjs';

export const useAvaxUsdPrice = () => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subject = getCurrencyPairPrice$('avax_usd')
      .pipe(delay(1000))
      .subscribe((exchangeRate) => {
        setExchangeRate(exchangeRate);
        setIsLoading(false);
      });
    return () => subject.unsubscribe();
  }, []);

  return { exchangeRate, isLoading };
};
