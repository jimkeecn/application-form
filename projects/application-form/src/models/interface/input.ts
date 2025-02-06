import { IEntityConfigBase } from "./base";
import { IAccountRelationshipEntity, IProductEntityRestriction } from "./entity";
import { IEntityFields } from "./field_config";
import { IAccountRelationship } from "./relationship";
import { IStaticData, IStaticDataGroup } from "./staticData";

export interface IInputStaticDataGroup extends IStaticDataGroup {
}

export interface IInputProductEntityRestriction extends IProductEntityRestriction { 
}

export interface IInputAccountRelationship extends IAccountRelationship {
}

export interface IInputAccountRelationshipEntity extends IAccountRelationshipEntity {

}

export interface IInputEntityFields extends IEntityConfigBase{
}

export interface IInputAccountEntityRelationship{

}