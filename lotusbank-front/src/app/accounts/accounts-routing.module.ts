import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './containers/accounts/accounts.component';
import { AccountFormComponent } from './containers/account-form/account-form.component';
import { AccountResolver } from './guards/account.resolver';
import { DepositFormComponent } from './deposit-form/deposit-form.component';

const routes: Routes = [
  { path: '', component: AccountsComponent },
  {
    path: 'new',
    component: AccountFormComponent,
    resolve: { account: AccountResolver },
  },
  {
    path: 'edit/:id',
    component: AccountFormComponent,
    resolve: { account: AccountResolver },
  },
  {
    path: 'deposit/:id',
    component: DepositFormComponent,
    resolve: { account: AccountResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
