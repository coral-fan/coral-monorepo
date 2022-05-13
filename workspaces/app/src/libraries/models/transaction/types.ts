import { User } from '../user';

type Status = 'pending' | 'completed' | 'rejected';

export interface TransactionData {
  transactionHash: string | null;
  userId: User['id'];
  status: Status;
}
