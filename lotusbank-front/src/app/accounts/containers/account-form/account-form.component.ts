import { Component, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { AccountsService } from '../../services/accounts/accounts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Account } from '../../model/account';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    cpf: [''],
    accountType: [''],
    balance: [0],
  });

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly service: AccountsService,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const account: Account = this.route.snapshot.data['account'];
    this.form.setValue({
      _id: account._id,
      name: account.name,
      cpf: account.cpf,
      accountType: account.accountType,
      balance: account.balance,
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      () => this.onSuccess(),
      () => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  onSuccess() {
    this.snackBar.open('Conta adicionada com sucesso.', '', { duration: 5000 });
    this.onCancel();
  }

  onError() {
    this.snackBar.open('Erro ao tentar adicionar conta.', '', {
      duration: 5000,
    });
  }
}
