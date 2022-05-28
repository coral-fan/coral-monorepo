import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { PurchaseData } from 'libraries/models';

export const getPurchaseDocumentReference = (id: string) =>
  getDocumentReferenceServerSide<PurchaseData>('purchases', id);
