import { useLogout } from 'library/hooks/authentication';
import axios from 'axios';
import { useEffect } from 'react';

const wyreAxios = axios.create({
  baseURL: 'https://api.testwyre.com/v3/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_WYRE_SECRET_KEY}`,
  },
});

const wyreTest = async () => {
  const createWalletOrderReservationResponse = await wyreAxios.post<{
    url: string;
    reservation: string;
  }>('orders/reserve', { referrerAccountId: process.env.NEXT_WYRE_PUBLIC_REFERRER_ACCOUNT_ID });

  console.info(createWalletOrderReservationResponse);

  const {
    data: { reservation },
  } = createWalletOrderReservationResponse;

  const transactionResponse = await wyreAxios.post('/debitcard/process/partner', {
    debitCard: {
      number: '4111111111111111',
      year: '2023',
      month: '01',
      cvv: '123',
    },
    address: {
      street1: '1234 Test Ave',
      city: 'Los Angeles',
      postalCode: '91423',
      state: 'CA',
      country: 'US',
    },
    reservationId: reservation,
    amount: '1',
    sourceCurrency: 'USD',
    destCurrency: 'AVAX',
    dest: 'avalanche:0x565001B4123F612Bb33ED3572603a328d31e5bDe',
    referrerAccountId: process.env.NEXT_PUBLIC_WYRE_REFERRER_ACCOUNT_ID,
    givenName: 'Crash',
    familyName: 'Bandicoot',
    email: 'test@sendwyre.com',
    phone: 18588255555,
    referenceId: process.env.NEXT_PUBLIC_WYRE_REFERRER_ACCOUNT_I,
    ipAddress: '108.28.187.213',
  });

  console.log(transactionResponse);
};
export default function Home() {
  useEffect(() => {
    wyreTest();
  }, []);

  return (
    <>
      <div>You authenticated.</div>
      <button onClick={useLogout()}>Logout</button>
    </>
  );
}
