import { createReducer, on } from "@ngrx/store";
import { initialStaticDataState } from "../../models/interface/ngrx/static-data.state";
import { loadStaticDataSuccess, updateStaticData } from "./static-data.actions";

export const staticDataReducer = createReducer(
    initialStaticDataState,

    on(loadStaticDataSuccess, (state, { staticData }) => {
        return { ...state, staticData };
    }),

    on(updateStaticData, (state, { staticData }) => { 
        return { ...state, staticData };
    })
)