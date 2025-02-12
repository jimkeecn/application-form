import { createAction, props } from "@ngrx/store";
import { IStaticData, IStaticDataGroup } from "../../models/interface/staticData";
import { IProductState } from "../../models/states/product";


export const setProducts = createAction(
    '[Product] Set Products',
    props<{ products: IStaticData[] }>()
);
  
export const setSelectedProductName = createAction(
    '[Product] Set Selected Product Name',
    props<{ selectedProductName: IStaticData }>()
);