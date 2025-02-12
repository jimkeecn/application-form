import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore, provideState } from '@ngrx/store';
import { staticDataReducer } from '../states/static-data-state/static-data.reducer';
import { CONST_APP_STATE } from '../models/interface/ngrx/app.state';
import { productReducer } from '../states/product-state/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: CONST_APP_STATE.staticData, reducer: staticDataReducer }),
    provideState({ name: CONST_APP_STATE.productData, reducer: productReducer })]
};
