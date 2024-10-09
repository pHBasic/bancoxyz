import { Account } from './../model/account';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from '../services/accounts/accounts.service';
import { Location } from '@angular/common';
// import { Account } from '../model/account';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deposit-form',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './deposit-form.component.html',
  styleUrl: './deposit-form.component.scss',
})
export class DepositFormComponent implements OnInit {
  transactionType: string = 'deposit';

  form = this.formBuilder.group({
    transactionValue: [0],
  });

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly service: AccountsService,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

  }

  // onSubmit() {
  //   const account: Account = this.route.snapshot.data['account'];
  //   this.service.deposit(this.form.value, account._id).subscribe(
  //     () => this.onSuccess(),
  //     () => this.onError()
  //   );
  // }

  onSubmit() {
    const account: Account = this.route.snapshot.data['account'];
    this.service.deposit(100.0, account._id).subscribe(
      () => this.onSuccess(),
      () => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  onSuccess() {
    if(this.transactionType === 'transfer'){
      this.snackBar.open(`${this.transactionType} realizada com sucesso.`, '', {
      duration: 5000,
    });
  }
    else{
      this.snackBar.open(`${this.transactionType} realizado com sucesso.`, '', {
        duration: 5000,
      });
    this.onCancel();
    }
  }

  onError() {
    this.snackBar.open('Erro ao tentar realizar o depósito.', '', {
      duration: 5000,
    });
  }
}
