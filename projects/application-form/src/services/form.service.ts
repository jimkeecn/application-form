import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductForm } from '../models/formgroup/product.form';
import { AccountTypeForm } from '../models/formgroup/accountType.form';
import { AccountRelationship } from '../models/class/accountRelationship';
import { EntityForm } from '../models/formgroup/entity.form';
import { AccountEntity } from '../models/class/accountEntity';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  product = signal<ProductForm>(new ProductForm());
  account = signal<AccountTypeForm>(new AccountTypeForm());
  accountRelationships = signal<AccountRelationship[]>([]);
  entity = signal<AccountEntity | null>(null);
}
