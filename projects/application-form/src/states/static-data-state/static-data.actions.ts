import { createAction, props } from "@ngrx/store";
import { IStaticData, IStaticDataGroup } from "../../models/interface/staticData";

export const loadStaticData = createAction('[StaticData] Load');

export const loadStaticDataSuccess = createAction(
    '[StaticData] Load Success',
    props<{staticData:IStaticDataGroup}>()
)

export const updateStaticData = createAction(
    '[StaticData] Update',
    props<{staticData:IStaticDataGroup}>()
)


