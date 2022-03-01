export interface AssetData {
  id: number;
  userId: number;
}

export type Asset = AssetData & {
  collectionId: string;
};
/* not tracking the following because writes can happen frequently and outside of our platform
   - user id
   - transaction history
*/
