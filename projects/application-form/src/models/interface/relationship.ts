export interface IAccountRelationship {
    isDisabled: boolean;
    relationshipName: string;
    accountType: string;
    mandatory: boolean;
    min: number;
    max: number;
}

export interface IAccountRelationshipEntityOnSelect{
    id: string;
    entityType: string;
    accountType: string;
    relationshipName: string;
}

export interface IEntityAccountRelationship  {
    id: string;
    relationships: IAccountRelationship[];
}


