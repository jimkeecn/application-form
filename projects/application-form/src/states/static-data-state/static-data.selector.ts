import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CONST_APP_STATE } from "../../models/interface/ngrx/app.state";
import { StaticDataState } from "../../models/states/staticData";

export const selectStaticDataState = createFeatureSelector<StaticDataState>(CONST_APP_STATE.staticData);

export const selectStaticDataTitles = createSelector(
  selectStaticDataState,
  (state) => state.staticData.titles ?? []
);

export const selectStaticDataCountries = createSelector(
  selectStaticDataState,
  (state) => state.staticData.countries ?? []
);

export const selectStaticDataReferencesTypes = createSelector(
  selectStaticDataState,
  (state) => state.staticData.referencesTypes ?? []
);

export const selectStaticDataSecurityQuestions = createSelector(
  selectStaticDataState,
  (state) => state.staticData.securityQuestions ?? []
);

export const selectStaticDataCommunicationsPreferences = createSelector(
  selectStaticDataState,
  (state) => state.staticData.communicationsPreferences ?? []
);