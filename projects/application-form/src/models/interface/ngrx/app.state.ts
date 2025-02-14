import { provideState, provideStore } from "@ngrx/store";
import { StaticDataState } from "./static-data.state";
import { ProductDataState } from "./product-data.state";

export interface IAppState{
    staticData: StaticDataState;
    productData: ProductDataState;
}

//Make sure type check every change on the state name
export const CONST_APP_STATE: { [K in keyof IAppState]: K } = {
    staticData: 'staticData',
    productData: 'productData'
} as const;


