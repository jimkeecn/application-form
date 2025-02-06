import { IEntityFields } from "./field_config";

export interface IAccountRelationshipBase{
    accountType: string;
    relationshipType: string;
}

export interface IEntityConfigBase extends IAccountRelationshipBase{
    id: string;
    entityType: string;
    config: Partial<IEntityFields>;
}