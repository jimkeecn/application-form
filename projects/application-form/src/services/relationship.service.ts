import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IAccountRelationshipEntity, IAccountRelationshipEntityConfigUpdate, IProductEntityRestriction } from '../models/interface/entity';
import { IAccountRelationship, IEntityAccountRelationship } from '../models/interface/relationship';
import { IEntityFields } from '../models/interface/field_config';
import { IInputEntityFields } from '../models/interface/input';
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

  private _accountRelationshipEntityRelationshipUpdate$ = new BehaviorSubject<IEntityAccountRelationship | null>(null);
  
  get accountRelationshipEntityRelationshipUpdate$() {
    return this._accountRelationshipEntityRelationshipUpdate$.asObservable().pipe(
      map(data => ({...data})) 
    );
  }

  setAccountRelationshipEntityRelationshipUpdate(accountRelationshipEntityRelationshipUpdate: IEntityAccountRelationship) { 
    this._accountRelationshipEntityRelationshipUpdate$.next(accountRelationshipEntityRelationshipUpdate);
  }

}
