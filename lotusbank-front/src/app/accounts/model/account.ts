import { Transaction } from "./transaction";

export interface Account {
  _id: string;
  name: string;
  cpf: string;
  accountType: string;
  balance: number;
  transaction?: Transaction[];
}
