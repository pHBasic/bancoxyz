import { Injectable } from '@angular/core';
import { Account } from '../../model/account';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';
import { url } from 'inspector';
import { Transaction } from '../../model/transaction';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private readonly API = 'api/accounts';

  constructor(private readonly httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Account[]>(this.API).pipe(
      first(),
    );
  }

  listTransaction(id: string) {
    return this.httpClient.get<Transaction[]>(`${this.API}/${id}`).pipe(
      first(),
    );
  }

  loadById(id: string){
    return this.httpClient.get<Account>(`${this.API}/${id}`);
  }

  // deposit(record: Partial<Transaction>, id: string){
  //   return this.httpClient.put<Transaction>(`${this.API}/deposit/${id}`, record).pipe(first());
  // }

  deposit(value: number, id: string){
    return this.httpClient.put(`${this.API}/deposit/${id}`, value).pipe(first())
  }

  save(record: Partial<Account>) {
    if(record._id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Account>){
    return this.httpClient.post<Account>(this.API, record).pipe(first());
  }

  private update(record: Partial<Account>){
    return this.httpClient.put<Account>(`${this.API}/${record._id}`, record).pipe(first());
  }

  delete(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}
