import { getCurrencyPairPrice$ } from './observables';
import { useEffect, useState } from 'react';

export const useAvaxUsdPrice = () => {
  const [data, setData] = useState({
    exchangeRate: 0,
    loading: true,
  });

  useEffect(() => {
    const subject = getCurrencyPairPrice$('avax_usd').subscribe(setData);
    return () => subject.unsubscribe();
  }, []);

  return data;
};
