import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IOutputAccountRelationship, IOutputProductId, IOutputRelationshipEntity, IOutputAccountType, IOutputEntityRelationship, IOutputEntityRelationshipWithParentId } from '../models/interface/output';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  constructor() { }

  private _outputProductId$ = new BehaviorSubject<IOutputProductId | null>(null);

  getIOutputProductId() {
    return this._outputProductId$.asObservable().pipe(map(d => { return {...d} }));
  }

  setIOutputProductId(data: IOutputProductId) {
    this._outputProductId$.next(data);
  }

  private _outputAccountType$ = new BehaviorSubject<IOutputAccountType | null>(null);

  getOutputAccountType() {
    return this._outputAccountType$.asObservable().pipe(map(d => { return {...d} }));
  }

  setOutputAccountType(data: IOutputAccountType) {
    this._outputAccountType$.next(data);
  }

  private _outputAccountRelationship$ = new BehaviorSubject<IOutputAccountRelationship | null>(null);

  getOutputAccountRelationship() {
    return this._outputAccountRelationship$.asObservable().pipe(map(d => { return {...d} }));
  }

  setOutputAccountRelationship(data: IOutputAccountRelationship) {
    this._outputAccountRelationship$.next(data);
  }

  private _outputRelationshipEntity$ = new BehaviorSubject<IOutputRelationshipEntity | null>(null);

  getOutputRelationshipEntity() {
    return this._outputRelationshipEntity$.asObservable().pipe(map(d => { return {...d} }));
  }

  setOutputRelationshipEntity(data: IOutputRelationshipEntity) {
    this._outputRelationshipEntity$.next(data);
  }

  private _outputEntityRelationship$ = new BehaviorSubject<IOutputEntityRelationship | null>(null);

  getOutputEntityRelationship() {
    return this._outputEntityRelationship$.asObservable().pipe(map(d => { return {...d} }));
  }

  setOutputEntityRelationship(data: IOutputEntityRelationship) {
    
    this._outputEntityRelationship$.next(data);
  }

  private _outputDialogRelationshipEntity$ = new BehaviorSubject<IOutputRelationshipEntity | null>(null);

  getOutputDialogRelationshipEntity() {
    return this._outputDialogRelationshipEntity$.asObservable().pipe(map(d => { return {...d} }));
  }

  setOutputDialogRelationshipEntity(data: IOutputRelationshipEntity) {
    this._outputDialogRelationshipEntity$.next(data);
  }

  private _outputRelatinshipEntityConfigWithParentId$ = new BehaviorSubject<IOutputEntityRelationshipWithParentId | null>(null);

  getOutputRelatinshipEntityConfigWithParentId() {
    return this._outputRelatinshipEntityConfigWithParentId$.asObservable().pipe(map(d => { return {...d} }));
  }

  setOutputRelationshipEntityConfigWithParentId(data: IOutputEntityRelationshipWithParentId) {
    this._outputRelatinshipEntityConfigWithParentId$.next(data);
  }
}
