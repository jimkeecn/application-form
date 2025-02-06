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
}


export interface IEntityCardInfo{
    id: string;
    name: string;
    relationshipType: string;
    entityType: string;
}

export interface IEntityTreeView{
    id: string;
    parentId: string;
    cardInfo: IEntityCardInfo;
    children: IEntityTreeView[];
}
