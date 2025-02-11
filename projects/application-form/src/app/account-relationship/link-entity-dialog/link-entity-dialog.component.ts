import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IAccountRelationshipEntity, IEntityCardInfo } from '../../../models/interface/entity';
import { OutputService } from '../../../services/output.service';
import { RelationshipService } from '../../../states/relationship.service';
import { IOutputEntityRelationship, IOutputEntityRelationshipWithParentId } from '../../../models/interface/output';
import { distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BasicAngularModule } from '../../../modules/angular.module';
import { v4 as uuidv4 } from 'uuid';
import { consoleLog } from '../../../shared/shared.function';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link-entity-dialog',
  imports: [MatFormFieldModule,MatDialogModule,MatButtonModule,MatSelectModule,BasicAngularModule],
  templateUrl: './link-entity-dialog.component.html',
  styleUrl: './link-entity-dialog.component.scss'
})
export class LinkEntityDialogComponent {

  destroy$ = new Subject<void>();
  relationshipTypes = signal<any[] | undefined>(undefined);
  entityTypes = signal<IAccountRelationshipEntity[] | undefined>(undefined);

  selectedRelationship = new FormControl('', [Validators.required]);
  selectedEntity = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) private data: IEntityCardInfo, private opService: OutputService, private rsService: RelationshipService,
    private router: Router, public dialogRef: MatDialogRef<LinkEntityDialogComponent>) {
    
  }

  ngOnInit() { 
    console.log(this.data);
    this.opService.setOutputEntityRelationship({ id: this.data.id, entityType: this.data.entityType, accountType: this.data.accountType, relationshipName: this.data.relationshipType } as IOutputEntityRelationship);

    this.selectedRelationship.valueChanges.pipe(takeUntil(this.destroy$),distinctUntilChanged()).pipe(tap(() => { 
      this.selectedEntity.reset();
      this.entityTypes.set(undefined);
    })).subscribe();
    this.rsService.entityDialogState.relationshipType$.pipe(takeUntil(this.destroy$),distinctUntilChanged()).subscribe((data) => { 
      if (data && data.id && data?.relationships && data.relationships.length > 0) { 
        this.relationshipTypes.set(data.relationships);
      }
    });
    this.rsService.entityDialogState.entityTypes$.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe((data) => { 
      if (data && data.length > 0 && data[0].relationshipName === this.selectedRelationship.value) {
        console.log('dialog', data);
        this.entityTypes.set(data);
      }
    });

  }

  fetchEntities() {
    console.log('fetchEntities');
    this.selectedRelationship.markAsTouched();
    if (this.selectedRelationship.value && this.selectedRelationship.valid) {
      this.opService.setOutputDialogRelationshipEntity({ id: this.data.id, entityType: this.data.entityType, accountType: this.data.accountType, relationshipName: this.selectedRelationship.value } as IOutputEntityRelationship);
    }
  }
  addEntity() {
    this.selectedEntity.markAsTouched();
    if (this.selectedEntity.valid && this.selectedRelationship.value && this.selectedEntity.value) {
      let param = {
        accountType: this.data.accountType, relationshipName: this.selectedRelationship.value,
        entityType: this.selectedEntity.value, id: uuidv4(), parentId: this.data.id
      } as IOutputEntityRelationshipWithParentId;
      consoleLog('Add Entity Clicked');
      this.opService.setOutputRelationshipEntityConfigWithParentId(param);
      this.router.navigate(['/entity-form'], { skipLocationChange: true }).then(() => {
        this.rsService.resetEntityDialogState();
        this.dialogRef.close();
      });
    }
  }

  close() {
    this.rsService.resetEntityDialogState();
    this.dialogRef.close();
  }

  ngOnDestroy() { 
    this.destroy$.next();
    this.destroy$.complete();
  }
}
