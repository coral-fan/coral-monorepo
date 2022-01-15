// TODO: need to think about whether we need meta data stored off chain
export interface Asset {
  id: number;
  collectionId: string;
}
/* not tracking the following because writes can happen frequently and outside of our platform
   - user id
   - transaction history
*/
