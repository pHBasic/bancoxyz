import { Account } from './../../model/account';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.scss',
})
export class AccountsListComponent implements OnInit {
  @Input() accounts: Account[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  @Output() deposit = new EventEmitter(false);

  readonly displayedColumns = [
    'id',
    'name',
    'accountType',
    'balance',
    'transactions',
    'actions'
  ];

  constructor() {}

  ngOnInit(): void {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(account: Account){
    this.edit.emit(account);
  }

  onDeposit(account: Account){
    this.deposit.emit(account);
  }

  onDelete(account: Account){
    this.delete.emit(account);
  }
}
