import { Component, effect, inject, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { RelationshipService } from '../../states/relationship.service';
import { consoleLog } from '../../shared/shared.function';
import { RouteTopActionsComponent } from '../../shared/route-top-actions/route-top-actions.component';
import { BasicAngularModule } from '../../modules/angular.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '../../services/form.service';
import { Router } from '@angular/router';
import { distinctUntilChanged, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OutputService } from '../../services/output.service';
import { environment } from '../../environments/environment.development';
import { AccountRelationship } from '../../models/class/accountRelationship';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EntityTreeViewComponent } from './entity-tree-view/entity-tree-view.component';

@Component({
  selector: 'app-account-relationship',
  imports: [RouteTopActionsComponent,BasicAngularModule,MatExpansionModule,MatButtonModule,CommonModule,MatDialogModule,EntityTreeViewComponent],
  templateUrl: './account-relationship.component.html',
  styleUrl: './account-relationship.component.scss'
})
export class IAccountRelationshipComponent {

  private destroy$ = new Subject<void>(); // Cleanup Subject
  currentIndex = signal(1);
  constructor(private rsService: RelationshipService, private router: Router, private opService: OutputService, public formService: FormService, public dialog: MatDialog) { 
    if (this.formService.entity() !== null) {
      this.formService.entity.set(null);
    }
    
    effect(() => { 
      //console.log('effect',this.formService.accountRelationships());
    })
  }

  ngOnInit() {
    this.rsService.accountRelationship.pipe(map(accountRelationship => { 
      console.log('accountRelationship map called');
      const extendedRelationships = accountRelationship.map((item, index) => 
        new AccountRelationship({
          index:index+1, // Use array index as the index
          relationshipName: item.relationshipName,
          accountType: item.accountType,
          isDisabled: item.isDisabled,
          mandatory: item.mandatory,
          min: item.min,
          max: item.max,
        })
      );
      return extendedRelationships;
    }), tap(data => { 
      console.log('accountRelationship tap called');
      if (this.formService.accountRelationships() && this.formService.accountRelationships().length === 0) { 
        if (data.length > 0 && data[0].relationshipName && data[0].accountType) { 
          this.opService.setOutputAccountRelationship({ accountType: data[0].accountType, relationshipName: data[0].relationshipName });
        }
      }
    }), takeUntil(this.destroy$)).subscribe((extendedRelationships) => {
      console.log('accountRelationship set called');
      if (this.formService.accountRelationships() && this.formService.accountRelationships().length === 0) {
        this.formService.accountRelationships.set(extendedRelationships);
      } 
    });

    this.rsService.accountRelationshipEntities.pipe(takeUntil(this.destroy$),distinctUntilChanged()).subscribe((entities) => { 
      if (entities.length > 0) {
        const relationshipType = entities[0].relationshipName;
        const accountType = entities[0].accountType;
        this.formService.accountRelationships.update((data) => {
          return data.map((item, index) => {
            if (item.relationshipName === relationshipType && item.accountType === accountType) { 
              item.setEntityTypes(entities.filter(entity => entity.relationshipName === item.relationshipName));
              item.offLoader();
            }
            return item;
          });
        });
      }
    }); 
  }


  ngOnDestroy() { 
    this.destroy$.next();
    this.destroy$.complete();
  }

  nextRelationship(type: AccountRelationship) {

    const nextType = this.formService.accountRelationships()[this.currentIndex()];

    if (!type.entityTypes || type.entityTypes.length === 0) {
      this.canMoveOn(nextType);
      return;
    }

    if (!environment.production) {
      this.canMoveOn(nextType);
      return;
    }
    
    if (type.isCanMoveForward()) {
      this.canMoveOn(nextType);
      return;
    } else {
      consoleLog('Please select at least ' + type.min + ' and at most ' + type.max + ' entities');
      return;
    }
  }

  private canMoveOn(nextType:AccountRelationship) {
    this.opService.setOutputAccountRelationship({ accountType: nextType.accountType, relationshipName: nextType.relationshipName });
    this.currentIndex.update(i => i + 1);
    nextType.onLoader();
  }

  next() {
    consoleLog('Next Clicked:Account Type');
  }

  back() {
    consoleLog('Back Clicked:Product Selection');
    this.router.navigate(['/product'], {skipLocationChange: true});
  }

  addEntity(type: AccountRelationship) {
    type.selectedEntity.markAsTouched();
    if (type.selectedEntity.valid) {
      consoleLog('Add Entity Clicked');
      this.opService.setOutputRelationshipEntity({ accountType: type.accountType, relationshipName: type.relationshipName, entityType: type.selectedEntity.value, id: uuidv4() });
      this.router.navigate(['/entity-form'], { skipLocationChange: true });
    }
  }
}
