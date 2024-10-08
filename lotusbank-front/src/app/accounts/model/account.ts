import { Transaction } from "./transaction";

export interface Account {
  _id: string;
  name: string;
  accountType: string;
  balance: number;
  transaction: Transaction | null;
}
