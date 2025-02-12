import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IStaticData, IStaticDataGroup, StaticDataGroup } from '../models/interface/staticData';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor() { }

  private staticData$ = new BehaviorSubject<IStaticDataGroup>(new StaticDataGroup());

  // Expose Observables (read-only)
  get staticData() {
    return this.staticData$.asObservable().pipe(
      map(data => ({ ...data })) 
    );
  }

  // Methods to update state (controlled access)
  setStaticData(value: IStaticDataGroup) {
    this.staticData$.next({ ...value }); 
  }

  getStaticDataTitle() {
    return [...this.staticData$.value.titles];
  }

  getStaticDataCountries() {
    return [...this.staticData$.value.countries];
  }

  getStaticDataReferencesTypes() {
    return [...this.staticData$.value.referencesTypes];
  }

  getStaticDataSecurityQuestions() {
    return [...this.staticData$.value.securityQuestions];
  }

  getStaticDataCommunicationsPreferences() {
    return [...this.staticData$.value.communicationsPreferences];
  }


}
