import { BehaviorSubject, Observable, timer } from 'rxjs';
import { IAccountRelationshipEntity, IEntityTreeView } from '../interface/entity';
import { FormControl, Validators } from '@angular/forms';
import { Loader } from '../shared/loader';
import { AccountEntity } from './accountEntity';
import { IAccountRelationshipEntityOnSelect } from '../interface/relationship';

export class AccountRelationship extends Loader{
    readonly index: number;
    readonly id: string;
    readonly relationshipName: string;
    readonly accountType: string;
    readonly isDisabled: boolean;
    readonly mandatory: boolean;
    readonly min: number;
    readonly max: number;
    private _entityTypes: IAccountRelationshipEntity[] = [];
    private _entities: AccountEntity[] = [];

    selectedEntity: FormControl;

    constructor({ index, relationshipName, accountType, isDisabled, mandatory, min, max }: any) {
        super();
        this.index = index;
        this.id = '';
        this.relationshipName = relationshipName;
        this.accountType = accountType;
        this.isDisabled = isDisabled;
        this.mandatory = mandatory;
        this.min = min;
        this.max = max;
        this.selectedEntity = new FormControl('',[Validators.required]);
    }

    isCanMoveForward(): boolean { 
        return !this.mandatory || (this.entities.length >= this.min && this.entities.length <= this.max);
    }

    setEntityTypes(entityTypes: any) { 
        this._entityTypes = entityTypes;
    }

    findEntityById(id: string): AccountEntity | null{
        return this._entities.find(entity => entity.id === id) || null;
    }

    addEntity(entity: AccountEntity | null) {
        if (entity) { 
            this._entities.push(entity);
        }
     }

    /** Returns entity types as read-only */
    get entityTypes(): ReadonlyArray<IAccountRelationshipEntity> {
        return this._entityTypes;
    }

    /** Returns entities as read-only */
    get entities(): ReadonlyArray<AccountEntity> {
        return this._entities;
    }

    selectedEntityReset() {
        this.selectedEntity.reset();
    }

    treeView(): IEntityTreeView[]{
        const entityMap = new Map<string, IEntityTreeView>();
        const roots: IEntityTreeView[] = [];

        //Assign entity into the Map in order later to use
        for (const entity of this._entities) {
            const treeNode: IEntityTreeView = {
                id: entity.id,
                parentId: entity.parentId ?? '',
                cardInfo: entity.retrieveEntityCardInfo(),
                children: []
            };
            entityMap.set(entity.id, treeNode);
        }

        for (const entity of this._entities) {
            const treeNode = entityMap.get(entity.id);
            if (!treeNode) continue; 
    
            if (entity.parentId && entityMap.has(entity.parentId)) {
                entityMap.get(entity.parentId)!.children.push(treeNode); //push the child node to the parent node
            } else {
                roots.push(treeNode); //no ParentId, so it's a root node
            }
        }

        return roots;
    }
}
