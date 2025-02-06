import { Component, effect, Input, signal } from '@angular/core';
import { RouteTopActionsComponent } from '../../shared/route-top-actions/route-top-actions.component';
import { BasicAngularModule } from '../../modules/angular.module';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { consoleLog } from '../../shared/shared.function';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormFieldComponent } from '../../shared/form-field/form-field.component';
import { IEntityFields } from '../../models/interface/field_config';
import { OutputService } from '../../services/output.service';
import { RelationshipService } from '../../services/relationship.service';
import { Subject, takeUntil } from 'rxjs';
import { AccountEntity } from '../../models/class/accountEntity';
import { StaticDataService } from '../../services/static-data.service';

@Component({
  selector: 'app-entity-form',
  imports: [BasicAngularModule,MatButtonModule,CommonModule,FormFieldComponent],
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.scss'
})
export class EntityFormComponent {
  destroy$ = new Subject<void>();
  currentRelationship!: string;
  constructor(private router: Router, public formService: FormService, private opService:OutputService,private rsService:RelationshipService, public sdService:StaticDataService) { 
    effect(() => { 
      //consoleLog(this.formService.accountRelationships());
    })
  }

  ngOnInit() {
    this.rsService.accountRelationshipEntityConfigUpdate$.pipe(takeUntil(this.destroy$)).subscribe((c) => { 
      if (c.id && c.entityType && c.relationshipType && c.accountType && c.config) {
        this.currentRelationship = c.relationshipType;
        this.formService.entity.set(new AccountEntity(c.id,c.entityType,c.relationshipType,c.accountType,c.config));
      } 
    });
  }
  ngOnDestroy() { 
    this.destroy$.next();
    this.destroy$.complete();
  }

  save() {
    this.formService.entity()?.form.getForm().markAllAsTouched();
    if (this.currentRelationship && this.formService.entity()?.form.getForm().valid) {
      this.formService.accountRelationships.update(rel => { 
        const relationship = rel.find(r => r.relationshipName === this.currentRelationship);
        rel.forEach(r => { 
          r.selectedEntityReset();
          r.destroyLoader(); //prevent memory leak..
        })
        if (relationship) { 
          consoleLog(this.formService.entity());
          relationship.addEntity(this.formService.entity());
        }
        return [...rel];
      })
      this.router.navigate(['/account-relationships'], { skipLocationChange: true });
    }
  }

  cancel() {
    this.formService.accountRelationships.update(rel => { 
      const relationship = rel.find(r => r.relationshipName === this.currentRelationship);
      rel.forEach(r => { 
        r.selectedEntityReset();
        r.destroyLoader(); //prevent memory leak..
      })
      return [...rel];
    })
    this.router.navigate(['/account-relationships'], { skipLocationChange: true });
  }

  getFormControlName(name: string): FormControl {
    let ctrl = this.formService.entity()?.form.form.get(name) as FormControl;
    return ctrl
  }
}
