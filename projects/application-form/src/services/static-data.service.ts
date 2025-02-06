import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IStaticData, IStaticDataCheck, IStaticDataGroup, StaticDataGroup } from '../models/interface/staticData';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor() { }

  // Private BehaviorSubjects to hold the state
  private staticData$ = new BehaviorSubject<IStaticDataGroup>(new StaticDataGroup());
  private products$ = new BehaviorSubject<IStaticData[]>([]);
  private accountTypes$ = new BehaviorSubject<IStaticData[]>([]);

  // Expose Observables (read-only)
  get staticData() {
    return this.staticData$.asObservable().pipe(
      map(data => ({ ...data })) 
    );
  }

  get products() {
    return this.products$.asObservable().pipe(
      map(data => [...data]) 
    );
  }

  get accountTypes() {
    return this.accountTypes$.asObservable().pipe(
      map(data => [...data]) 
    );
  }

  // Methods to update state (controlled access)
  setStaticData(value: IStaticDataGroup) {
    this.staticData$.next({ ...value }); 
  }

  setProducts(value: IStaticData[]) {
    this.products$.next([...value]); 
  }

  setAccountTypes(value: IStaticData[]) {
    this.accountTypes$.next([...value]); 
  }

  getStaticDataTitle() {
    return this.staticData$.value.titles;
  }

  getStaticDataCountries(){
    return this.staticData$.value.countries;
  }

  getStaticDataReferencesTypes(){
    return this.staticData$.value.referencesTypes;
  }

  getStaticDataSecurityQuestions(){
    return this.staticData$.value.securityQuestions;
  }

  getStaticDataCommunicationsPreferences(){
    return this.staticData$.value.communicationsPreferences;
  }
}
