import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IEntityCardInfo } from '../../../models/interface/entity';
import { OutputService } from '../../../services/output.service';
import { RelationshipService } from '../../../services/relationship.service';
import { IOutputEntityRelationship } from '../../../models/interface/output';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BasicAngularModule } from '../../../modules/angular.module';

@Component({
  selector: 'app-link-entity-dialog',
  imports: [MatFormFieldModule,MatDialogModule,MatButtonModule,MatSelectModule,BasicAngularModule],
  templateUrl: './link-entity-dialog.component.html',
  styleUrl: './link-entity-dialog.component.scss'
})
export class LinkEntityDialogComponent {

  destroy$ = new Subject<void>();
  relationshipTypes!: any[];
  entityTypes!: any[];

  selectedRelationship = new FormControl('', [Validators.required]);
  selectedEntity = new FormControl('', [Validators.required]);

  isLoading = false;
  constructor(@Inject(MAT_DIALOG_DATA) private data: IEntityCardInfo, private opService:OutputService, private rsService: RelationshipService) {
    
  }

  ngOnInit() { 
    console.log(this.data);
    this.opService.setOutputEntityRelationship({ id: this.data.id, entityType: this.data.entityType, accountType: '', relationshipName: this.data.relationshipType } as IOutputEntityRelationship);

    this.rsService.accountRelationshipEntityRelationshipUpdate$.pipe(takeUntil(this.destroy$),distinctUntilChanged()).subscribe((data) => { 
      if (data && data.id && data?.relationships && data.relationships.length > 0) { 
        this.relationshipTypes = data.relationships;
      }
    });

  }

  fetchEntities() {
    console.log('fetchEntities');
  }
  addEntity() {
    
  }

  ngOnDestroy() { 
    this.destroy$.next();
    this.destroy$.complete();
  }
}
