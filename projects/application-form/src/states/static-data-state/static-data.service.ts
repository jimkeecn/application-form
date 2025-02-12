import { Injectable } from '@angular/core';
import { IStaticDataGroup } from '../../models/interface/staticData';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { StaticDataState } from '../../models/interface/ngrx/static-data.state';
import { updateStaticData } from './static-data.actions';
import { CONST_APP_STATE, IAppState } from '../../models/interface/ngrx/app.state';
import { consoleLog } from '../../shared/shared.function';
@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  staticData$: Observable<IStaticDataGroup>;

  constructor(private store: Store<IAppState>) {
    this.staticData$ = this.store.select(state => state.staticData.staticData); 
  }

  updateStaticData(data: IStaticDataGroup) {
    this.store.dispatch(updateStaticData({ staticData: data }));
  }
}
