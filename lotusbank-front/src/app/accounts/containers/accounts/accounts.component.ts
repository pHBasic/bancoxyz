import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/account';
import { CommonModule } from '@angular/common';

import { AccountsService } from '../../services/accounts/accounts.service';
import { catchError, delay, first, Observable, tap, of } from 'rxjs';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsListComponent } from '../../components/accounts-list/accounts-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, AppMaterialModule, AccountsListComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit {
  accounts$: Observable<Account[]> | null = null;

  constructor(
    private readonly accountsService: AccountsService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar
  ) {
    this.refresh();
  }


  ngOnInit(): void {}

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  refresh(){
    this.accounts$ = this.accountsService.list().pipe(
      catchError(() => {
        this.onError('Não foi possível carregar as contas abertas.');
        return of([]);
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(account: Account) {
    this.router.navigate(['edit', account._id], { relativeTo: this.route });
  }

  onDelete(account: Account) {
    this.accountsService.delete(account._id).subscribe(() => {
      this.refresh();
      this.snackBar.open('Conta removido com sucesso.', 'X', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    },
    () => this.onError('Error ao tentar remover conta.')
    );
  }

  onDeposit(account: Account){
    this.router.navigate(['deposit', account._id], { relativeTo: this.route });
  }
}
