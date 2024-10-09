import { Component } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { Transaction } from '../../model/transaction';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { AccountsService } from '../../services/accounts/accounts.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  transaction$: Observable<Transaction[]> | null = null;

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
    this.transaction$ = this.accountsService.listTransaction("1").pipe(
      catchError(() => {
        this.onError('Não foi possível carregar as contas abertas.');
        return of([]);
      })
    );
  }
}
