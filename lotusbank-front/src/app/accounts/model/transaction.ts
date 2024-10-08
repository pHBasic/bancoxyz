export interface Transaction{
  operation: 'deposit' | 'withdrawal' | 'transfer';
  obs: string;
  value: number;
  type: 'credit' | 'debit'
}
