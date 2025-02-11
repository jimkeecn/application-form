import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAccountRelationshipComponent } from './account-relationship.component';
import { RelationshipService } from '../../states/relationship.service';
import { environment } from '../../environments/environment.development';
import { AccountRelationship } from '../../models/class/accountRelationship';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormService } from '../../services/form.service';

describe('IAccountRelationshipComponent', () => {
  let component: IAccountRelationshipComponent;
  let fixture: ComponentFixture<IAccountRelationshipComponent>;
  let rsService: RelationshipService;
  let formService: FormService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IAccountRelationshipComponent,NoopAnimationsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IAccountRelationshipComponent);
    rsService = TestBed.inject(RelationshipService);
    formService = TestBed.inject(FormService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Account Relationships should be Init', () => { 
    expect(formService.accountRelationships()).toEqual([]);
  })

  // it('Account Relationship should updated while relationship Service is updated', (done) => { 
  //   rsService.setAccountRelationship(environment.relationshipTypes);
  //   rsService.accountRelationship.subscribe((accountRelationship) => {
    
  //     let relationshipClass: AccountRelationship[] = [];
  //     relationshipClass = environment.relationshipTypes.map((item, index) => { 
  //       return new AccountRelationship({
  //         index:index+1, // Use array index as the index
  //         relationshipName: item.relationshipName,
  //         accountType: item.accountType,
  //         isDisabled: item.isDisabled,
  //         mandatory: item.mandatory,
  //         min: item.min,
  //         max: item.max,
  //       })
  //     });
  //     expect(component.accountRelationships()).toEqual(relationshipClass);
  //     done();
  //   });
  // })

  // it('panel index should increase by 1 after click nextPanel()', () => { 
  //   component.accountRelationships.set(environment.relationshipTypes);
  //   let mockStepMock: AccountRelationship = new AccountRelationship({
  //     ...component.accountRelationships()[0]
  //   });
  //   component.nextRelationship(mockStepMock);
  //   expect(component.currentIndex()).toEqual(2);
  // })

  it('should create mat-accordion with at least one mat-expansion-panel when account relationships are set', () => {
    rsService.setAccountRelationship(environment.relationshipTypes);
    // Trigger Angular's change detection
    fixture.detectChanges();
    // Query for mat-accordion in the DOM
    const accordion = fixture.nativeElement.querySelector('mat-accordion');
    expect(accordion).toBeTruthy(); // Ensure mat-accordion exists
    // Query for mat-expansion-panel in the DOM
    const panels = accordion.querySelectorAll('mat-expansion-panel');
    expect(panels.length).toBeGreaterThan(0); // Ensure at least one mat-expansion-panel exists
  });


  it('should create warming message when account relationship type is not updated', () => {
    // Trigger Angular's change detection
    fixture.detectChanges();
    // Query for mat-accordion in the DOM
    const message = fixture.nativeElement.querySelector('p[aria-label="warming"]');
    expect(message).toBeTruthy(); // Ensure mat-accordion exists
    expect(message.textContent).toContain('Please wait patiently. No account relationships found.'); // Ensure at least one mat-expansion-panel exists
  });

  it('should not pass if the account relationship step not meet requirement.', () => { 

    formService.accountRelationships.set(environment.relationshipTypes);
    let mockStepMock: AccountRelationship = new AccountRelationship({
      ...formService.accountRelationships()[0]
    });
    component.nextRelationship(mockStepMock);
    expect(component.currentIndex()).not.toEqual(2);
  })

});
