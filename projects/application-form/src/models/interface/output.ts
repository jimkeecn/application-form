export interface IOutputProductId { 
    productId: number | null;
    productUid: string | null;
}

export interface IOutputAccountType { 
    accountType: string;
}


export interface IOutputAccountRelationship{
    accountType: string;
    relationshipName: string;
}

export interface IOutputRelationshipEntity{
    id: string;
    accountType: string;
    relationshipName: string;
    entityType: string;
}

export interface IOutputEntityRelationship{
    id: string;
    accountType: string;
    relationshipName: string;
    entityType: string;
}