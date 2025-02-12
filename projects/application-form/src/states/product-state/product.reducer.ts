import { createReducer, on } from "@ngrx/store";
import { initialProductState } from "../../models/states/product";
import { setProducts, setSelectedProductName } from "./product.action";

export const productReducer = createReducer(
    initialProductState,
    
    on(setProducts, (state, { products }) => ({
        ...state,
        products: [...products]
    })),

    on(setSelectedProductName, (state, { selectedProductName }) => ({
        ...state,
        setSelectedProductName
    })),
)
