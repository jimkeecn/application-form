import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductState } from '../models/states/product';
import { IStaticData } from '../models/interface/staticData';
import { IAccountTypesState } from '../models/states/account-types';

@Injectable({
  providedIn: 'root'
})
export class AccountTypesService {

  private _state$ = new BehaviorSubject<IAccountTypesState>({
    accountTypes: [],
    selectedAccountType: null
  });

  get state$() {
    return this._state$.asObservable();
  }

  get accountTypes() {
    return this._state$.value.accountTypes;
  }

  get selectedAccountType() {
    return this._state$.value.selectedAccountType;
  }

  setAccountTypes(accountTypes: IStaticData[]) {
    this._state$.next({
      ...this._state$.value,
      accountTypes: [...accountTypes],
    });
  }

  setSelectedAccountType(accountType:IStaticData) { 
    this._state$.next({
      ...this._state$.value,
      selectedAccountType: accountType,
    });
  }

  constructor() { }
}
