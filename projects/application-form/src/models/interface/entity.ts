import { IEntityConfigBase } from "./base";
import { FullFormObject, IEntityFields } from "./field_config";

export interface IProductEntityRestriction { 
    entityName: string;
}

export interface IAccountRelationshipEntity{
    accountType: string;
    relationshipName: string;
    entityName: string;
    mandatory: boolean;
    chooseFrom: string;
    min: number;
    max: number;
}

export interface IAccountRelationshipEntityConfigUpdate extends IEntityConfigBase{
    parentId?: string;
}


export interface IEntityCardInfo{
    id: string;
    name: string;
    relationshipType: string;
    entityType: string;
    accountType: string;
}

export interface IEntityTreeView{
    id: string;
    parentId: string;
    cardInfo: IEntityCardInfo;
    children: IEntityTreeView[];
}

export enum EntityType{
    Individual = 'Individual',
    Company = 'Company'
}
