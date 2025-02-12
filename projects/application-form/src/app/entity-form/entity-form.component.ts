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
import { RelationshipService } from '../../states/relationship.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccountEntity } from '../../models/class/accountEntity';
import { StaticDataService } from '../../states/static-data.service';
import { IAppState } from '../../models/interface/ngrx/app.state';
import { Store } from '@ngrx/store';
import { selectStaticDataCommunicationsPreferences, selectStaticDataCountries, selectStaticDataReferencesTypes, selectStaticDataSecurityQuestions, selectStaticDataTitles } from '../../states/static-data-state/static-data.selector';
import { IStaticData } from '../../models/interface/staticData';

@Component({
  selector: 'app-entity-form',
  imports: [BasicAngularModule,MatButtonModule,CommonModule,FormFieldComponent],
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.scss'
})
export class EntityFormComponent {
  titles$: Observable<IStaticData[]>;
  countries$: Observable<IStaticData[]>;
  referencesTypes$: Observable<IStaticData[]>;
  securityQuestions$: Observable<IStaticData[]>;
  communicationsPreferences$: Observable<IStaticData[]>;

  destroy$ = new Subject<void>();
  currentParentRelationship!: string;
  constructor(private router: Router, public formService: FormService,
    private opService: OutputService, private rsService: RelationshipService, private store: Store<IAppState>) { 
    
    effect(() => { 
      //consoleLog(this.formService.accountRelationships());
    })

    this.titles$ = this.store.select(selectStaticDataTitles);
    this.countries$ = this.store.select(selectStaticDataCountries);
    this.referencesTypes$ = this.store.select(selectStaticDataReferencesTypes);
    this.securityQuestions$ = this.store.select(selectStaticDataSecurityQuestions);
    this.communicationsPreferences$ = this.store.select(selectStaticDataCommunicationsPreferences);

  }

  ngOnInit() {
    this.rsService.accountRelationshipEntityConfigUpdate$.pipe(takeUntil(this.destroy$)).subscribe((c) => { 
      
      if (c.id && c.entityType && c.relationshipType && c.accountType && c.config) {
        if (c.parentId) {
          this.formService.accountRelationships().forEach(r => { 
            consoleLog(r.entities.find(e => e.id === c.parentId));
            this.currentParentRelationship = r.entities.find(e => e.id === c.parentId) ? r.relationshipName : this.currentParentRelationship;
          })
        } else {
          this.currentParentRelationship = c.relationshipType;
        }
        this.formService.entity.set(new AccountEntity(c.id,c.entityType,c.relationshipType,c.accountType,c.config, c.parentId));
      } 
      console.log('currentParentRelationship', this.currentParentRelationship);
    });
  }
  ngOnDestroy() { 
    this.destroy$.next();
    this.destroy$.complete();
  }

  save() {
    
    this.formService.entity()?.form.getForm().markAllAsTouched();
    if (this.currentParentRelationship && this.formService.entity()?.form.getForm().valid) {
      this.formService.accountRelationships.update(rel => { 
        const relationship = rel.find(r => r.relationshipName === this.currentParentRelationship);
        rel.forEach(r => { 
          r.selectedEntityReset();
          r.destroyLoader(); //prevent memory leak..
        })
        if (relationship) { 
          consoleLog(this.formService.entity());
          relationship.addEntity(this.formService.entity());
          relationship.updateTreeView();
        }
        return [...rel];
      })
      this.router.navigate(['/account-relationships'], { skipLocationChange: true }).then(() => { 
        this.rsService.resetAccountRelationshipEntityConfigUpdate();
        this.formService.entity.set(null);
        console.log('after entity save', this.formService.entity());
      });
    }
  }

  cancel() {
    this.formService.accountRelationships.update(rel => { 
      const relationship = rel.find(r => r.relationshipName === this.currentParentRelationship);
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
