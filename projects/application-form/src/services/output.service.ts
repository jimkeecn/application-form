import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IOutputAccountRelationship, IOutputProductId, IOutputRelationshipEntity, IOutputAccountType, IOutputEntityRelationship } from '../models/interface/output';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  constructor() { }

  private _outputProductId$ = new BehaviorSubject<IOutputProductId | null>(null);
  private _outputAccountType$ = new BehaviorSubject<IOutputAccountType | null>(null);
  private _outputAccountRelationship$ = new BehaviorSubject<IOutputAccountRelationship | null>(null);
  private _outputRelationshipEntity$ = new BehaviorSubject<IOutputRelationshipEntity | null>(null);
  private _outputEntityRelationship$ = new BehaviorSubject<IOutputEntityRelationship | null>(null);

  getIOutputProductId() {
    return this._outputProductId$.asObservable().pipe(map(d => { return {...d} }));
  }

  setIOutputProductId(data: IOutputProductId) {
    this._outputProductId$.next(data);
  }

  getOutputAccountType() {
    return this._outputAccountType$.asObservable().pipe(map(d => { return {...d} }));
  }

  setOutputAccountType(data: IOutputAccountType) {
    this._outputAccountType$.next(data);
  }


  getOutputAccountRelationship() {
    return this._outputAccountRelationship$.asObservable().pipe(map(d => { return {...d} }));
  }

  setOutputAccountRelationship(data: IOutputAccountRelationship) {
    this._outputAccountRelationship$.next(data);
  }

  getOutputRelationshipEntity() {
    return this._outputRelationshipEntity$.asObservable().pipe(map(d => { return {...d} }));
  }

  setOutputRelationshipEntity(data: IOutputRelationshipEntity) {
    this._outputRelationshipEntity$.next(data);
  }

  getOutputEntityRelationship() {
    return this._outputEntityRelationship$.asObservable().pipe(map(d => { return {...d} }));
  }

  setOutputEntityRelationship(data: IOutputEntityRelationship) {
    
    this._outputEntityRelationship$.next(data);
  }
}
