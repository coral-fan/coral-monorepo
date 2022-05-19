import { User } from '../user';

type Status = 'pending' | 'completed' | 'rejected';

export interface TransactionData {
  userId: User['id'];
  status: Status;
  hash: string | null;
}
