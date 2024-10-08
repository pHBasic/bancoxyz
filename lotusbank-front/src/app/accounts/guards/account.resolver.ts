import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Account } from '../model/account';
import { AccountsService } from '../services/accounts/accounts.service';

@Injectable({
  providedIn: 'root',
})
export class AccountResolver {
  constructor(private service: AccountsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Account> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ _id: '', name: '', accountType: '', balance: 0, transaction: null });
  }
}
