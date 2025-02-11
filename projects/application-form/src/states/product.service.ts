import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductState } from '../models/states/product';
import { IStaticData } from '../models/interface/staticData';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _state$ = new BehaviorSubject<IProductState>({
    products: [],
    selectedProductName: null
  });

  get state$() {
    return this._state$.asObservable();
  }

  get products$() {
    return this._state$.value.products;
  }

  get selectedProductName() {
    return this._state$.value.selectedProductName;
  }

  setProducts(products: IStaticData[]) {
    this._state$.next({
      ...this._state$.value,
      products: [...products],
    });
  }

  setSelectedProductName(product:IStaticData) { 
    this._state$.next({
      ...this._state$.value,
      selectedProductName: product,
    });
  }

  constructor() { }
}
