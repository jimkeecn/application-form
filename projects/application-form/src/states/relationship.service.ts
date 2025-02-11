import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IAccountRelationshipEntity, IAccountRelationshipEntityConfigUpdate, IProductEntityRestriction } from '../models/interface/entity';
import { IAccountRelationship, IEntityAccountRelationship } from '../models/interface/relationship';
/** In this service it will contains all property that were used to determine how each workflow works in every step in the entity collection page. */
@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  constructor() { }
  
  private _accountRelationship$ = new BehaviorSubject<IAccountRelationship[]>([]);

  get accountRelationship() {
    return this._accountRelationship$.asObservable().pipe(
          map(data => [...data]) 
    );
  }

  setAccountRelationship(accountRelationship: IAccountRelationship[]) {
    this._accountRelationship$.next(accountRelationship);
  }

  
  private _productEntitiesRestrictions$ = new BehaviorSubject<IProductEntityRestriction[]>([]);
  get productEntitiesRestrictions() {
    return this._productEntitiesRestrictions$.asObservable().pipe(
      map(data => [...data]) 
    );
  }

  
  setProductEntitiesRestrictions(productEntitiesRestrictions: IProductEntityRestriction[]) {
    this._productEntitiesRestrictions$.next(productEntitiesRestrictions);
  }

  private _accountRelationshipEntities$ = new BehaviorSubject<IAccountRelationshipEntity[]>([]);

  get accountRelationshipEntities() {
    return this._accountRelationshipEntities$.asObservable().pipe(
      map(data => [...data]) 
    );
  }

  setAccountRelationshipEntities(accountRelationshipEntities: IAccountRelationshipEntity[]) {
    this._accountRelationshipEntities$.next(accountRelationshipEntities);
  }

  private _accountRelationshipEntityConfigUpdate$ = new BehaviorSubject<IAccountRelationshipEntityConfigUpdate | null>(null);

  get accountRelationshipEntityConfigUpdate$() {
    return this._accountRelationshipEntityConfigUpdate$.asObservable().pipe(
      map(data => ({...data})) 
    );
  }

  setAccountRelationshipEntityConfigUpdate(accountRelationshipEntityConfigUpdate: IAccountRelationshipEntityConfigUpdate) { 
    this._accountRelationshipEntityConfigUpdate$.next(accountRelationshipEntityConfigUpdate);
  }

  resetAccountRelationshipEntityConfigUpdate() {
    this._accountRelationshipEntityConfigUpdate$.next(null);
  }

  private _accountRelationshipEntityRelationshipUpdate$ = new BehaviorSubject<IEntityAccountRelationship | null>(null);
  
  get accountRelationshipEntityRelationshipUpdate$() {
    return this._accountRelationshipEntityRelationshipUpdate$.asObservable().pipe(
      map(data => ({...data})) 
    );
  }

  setAccountRelationshipEntityRelationshipUpdate(accountRelationshipEntityRelationshipUpdate: IEntityAccountRelationship) { 
    this._accountRelationshipEntityRelationshipUpdate$.next(accountRelationshipEntityRelationshipUpdate);
  }

  resetAccountRelationshipEntityRelationshipUpdate() {
    this._accountRelationshipEntityRelationshipUpdate$.next(null);
  }


  private _accountRelationshipEntityRelationshipEntityUpdate$ = new BehaviorSubject<IAccountRelationshipEntity[]>([]);

  get accountRelationshipEntityRelationshipEntityUpdate$() {
    return this._accountRelationshipEntityRelationshipEntityUpdate$.asObservable().pipe(
      map(data => ([...data])) 
    );
  }

  setAccountRelationshipEntityRelationshipEntityUpdate(accountRelationshipEntityRelationshipEntityUpdate: IAccountRelationshipEntity[]) { 
    this._accountRelationshipEntityRelationshipEntityUpdate$.next(accountRelationshipEntityRelationshipEntityUpdate);
  }

  resetAccountRelationshipEntityRelationshipEntityUpdate() {
    this._accountRelationshipEntityRelationshipEntityUpdate$.next([]);
  }

  private _entityDialogState = {
    relationshipType$: this.accountRelationshipEntityRelationshipUpdate$,
    entityTypes$: this.accountRelationshipEntityRelationshipEntityUpdate$
  }

  get entityDialogState() { 
    return { ...this._entityDialogState };
  }

  resetEntityDialogState() { 
    this.resetAccountRelationshipEntityRelationshipEntityUpdate();
    this.resetAccountRelationshipEntityRelationshipUpdate();
  }

}
