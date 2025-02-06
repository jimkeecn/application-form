import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, output, Output, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged, map, Observable, of, takeUntil, tap } from 'rxjs';
import { IStaticDataCheck, IStaticDataGroup, StaticDataCheck, StaticDataGroup } from '../models/interface/staticData';
import { StaticDataService } from '../services/static-data.service';
import { environment } from '../environments/environment.development';
import { FormService } from '../services/form.service';
import { RelationshipService } from '../services/relationship.service';
import { OutputService } from '../services/output.service';
import { IOutputAccountRelationship, IOutputAccountType, IOutputProductId } from '../models/interface/output';
import { IAccountRelationshipEntity, IProductEntityRestriction } from '../models/interface/entity';
import { IAccountRelationship, IEntityAccountRelationship } from '../models/interface/relationship';
import { IEntityFields } from '../models/interface/field_config';
import { convertToFullFormObject } from '../shared/shared.function';
import { IInputAccountRelationship, IInputAccountRelationshipEntity, IInputEntityFields, IInputProductEntityRestriction, IInputStaticDataGroup } from '../models/interface/input';
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'application-form';

  @Input() 
  set products(value: any) { 
    this.staticService.setProducts(value);
  }

  @Input()
  set accountTypes(value: any) { 
    this.staticService.setAccountTypes(value);
  }

  @Input()
  set staticData(value: IInputStaticDataGroup) { 
    this.staticService.setStaticData(value);
  }

  @Input()
  set productEntityRestrictions(value: IInputProductEntityRestriction[]) {
    if (value.length > 0) {
      this.rsService.setProductEntitiesRestrictions(value);
    }
  }

  @Input()
  set accountRelationshipTypes(value: IInputAccountRelationship[]) {
    if (value.length > 0) {
      this.rsService.setAccountRelationship(value);
    }
  }

  @Input()
  set accountRelationshipEntities(value: IInputAccountRelationshipEntity[]) {
    if(value && value.length > 0) {
      this.rsService.setAccountRelationshipEntities(value);
    }
  }

  @Input()
  set entityFormFields(value: IInputEntityFields) {
    if (value) {
      this.rsService.setAccountRelationshipEntityConfigUpdate(value);
    }
  }

  @Input()
  set entityFormRelationship(value: IEntityAccountRelationship) { 
    console.log('entityFormRelationship',value)
    if (value && value.id) {
      this.rsService.setAccountRelationshipEntityRelationshipUpdate(value);
    } else {
      throw new Error('Entity Account Relationship is not set');
    }
  }


  @Output() submitForm = new EventEmitter<any>();
  @Output() saveForm = new EventEmitter<any>();
  @Output() addressSearch = new EventEmitter<any>();
  @Output() outputProductId$ = new EventEmitter<Partial<IOutputProductId>>();
  @Output() outputAccountType$ = new EventEmitter<Partial<IOutputAccountType>>();
  @Output() outputAccountRelationship = new EventEmitter<Partial<IOutputAccountRelationship>>();
  @Output() accountTypeChange = new EventEmitter<any>();
  constructor(private router: Router, private staticService:StaticDataService, private formService:FormService, private rsService:RelationshipService, private opService:OutputService) {  }

  ngOnInit() { 
    if (!environment.production) {
      console.log('-------------Development mode--------------');
      setTimeout(() => { 
        let staticData = new StaticDataGroup();
        staticData.titles = environment.titles;
        staticData.countries = environment.countries;
        staticData.referencesTypes = environment.referencesTypes;
        staticData.securityQuestions = environment.securityQuestions;
        staticData.communicationsPreferences = environment.communicationsPreferences;
        this.staticService.setStaticData(staticData);
        this.staticService.setProducts(environment.products);
        this.staticService.setAccountTypes(environment.accountTypes);
      });
    }


    //Initiate Static Data, if all data is available, navigate to product page
    this.staticService.staticData.pipe(
      map(staticData => {
        let allCompleted = new StaticDataCheck();
        // Ensure TypeScript knows the keys belong to IStaticDataGroup
        (Object.keys(staticData) as (keyof IStaticDataGroup)[]).forEach(key => {
          // Check if the corresponding property in `staticData` has a value
          if (Array.isArray(staticData[key]) && staticData[key].length > 0) {
            // Mark as true if the array has data
            allCompleted[key as keyof IStaticDataCheck] = true;
          }
        });
        return allCompleted;
      }),
    ).subscribe({
      next: (allCompleted) => {
        if (allCompleted.titles && allCompleted.countries && allCompleted.referencesTypes && allCompleted.securityQuestions && allCompleted.communicationsPreferences) {
          this.router.navigate(['product'], { skipLocationChange: true });
        } else {
          this.router.navigate(['init'], { skipLocationChange: true });
        }
      },
      error: (error) => { 
        console.error(error);
      },
      complete: () => {
        
      }
    });

    //Output
    this.opService.getIOutputProductId().subscribe(x => { 
      if (x.productId || x.productUid) {
        if (!environment.production) {
          setTimeout(() => { this.productEntityRestrictions = environment.productEntityRestrictions; },1000);
          
        }
        this.outputProductId$.emit(x);
      }
    })

    this.opService.getOutputAccountType().subscribe(x => { 
      if (x.accountType) {
        if (!environment.production) {
          setTimeout(() => { this.accountRelationshipTypes = environment.relationshipTypes; },1000);
        }
        this.outputAccountType$.emit(x);
      }
    });

    this.opService.getOutputAccountRelationship().subscribe(x => { 
      if (x.accountType && x.relationshipName) {
        if (!environment.production) {
          setTimeout(() => { 
            environment.entityList.forEach((entity) => {
              if(entity[0].accountType === x.accountType && entity[0].relationshipName === x.relationshipName) {
                this.accountRelationshipEntities = entity;
              } 
            });
          },1000)
        }
        this.outputAccountRelationship.emit(x);
      }
    });

    this.opService.getOutputRelationshipEntity().subscribe(x => { 
      if (x.accountType && x.relationshipName && x.entityType && x.id) {
        if(!environment.production) {
          setTimeout(() => {
            this.entityFormFields = {
              id: x.id,
              accountType: x.accountType,
              relationshipType: x.relationshipName,
              entityType: x.entityType,
              config: convertToFullFormObject(environment.formFieldsConfig)
            } as IInputEntityFields;
          },1000);
        }
      }
    });

    this.opService.getOutputEntityRelationship().subscribe(x => { 
      if (x.relationshipName && x.entityType && x.id) {
        if (!environment.production) {
          console.log('getoutputEntityRelationship',x)
          setTimeout(() => {
            this.entityFormRelationship = {
              id: x.id,
              relationships:environment.subRelationshipTypes
            } as IEntityAccountRelationship;
          },1000);
        }
      }
    });
    //Check Account Type Form Change
  }
}
