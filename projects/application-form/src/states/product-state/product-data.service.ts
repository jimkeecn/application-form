import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../models/interface/ngrx/app.state';
import { Observable } from 'rxjs';
import { IProductState } from '../../models/states/product';
import { IStaticData } from '../../models/interface/staticData';
import { setProducts, setSelectedProductName } from './product.action';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  productData$: Observable<IProductState>;
  constructor(private store: Store<IAppState>) {
    this.productData$ = this.store.select(state => state.productData.productData);
  }

  setProductData(data: IStaticData[]) { 
    this.store.dispatch(setProducts({ products: data }));
  }

  setSelectedProductName(product: IStaticData) { 
    this.store.dispatch(setSelectedProductName({ selectedProductName: product }));
  }
}
