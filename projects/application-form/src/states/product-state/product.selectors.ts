import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IProductState } from "../../models/states/product";
import { CONST_APP_STATE } from "../../models/interface/ngrx/app.state";

export const selectedProductState = createFeatureSelector<IProductState>(CONST_APP_STATE.productData);

export const selectProducts = createSelector(
    selectedProductState,
    (state) => state.products ?? []
);

export const selectSelectedProductName = createSelector(
    selectedProductState,
    (state) => state.selectedProductName
);