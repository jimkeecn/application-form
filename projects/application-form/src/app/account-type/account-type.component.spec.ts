import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTypeComponent } from './account-type.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountTypeForm } from '../../models/formgroup/accountType.form';
import { environment } from '../../environments/environment.development';
import { StaticDataService } from '../../services/static-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

class ActivatedRouteMock {
  snapshot = {
    routeConfig: {
      path: 'account-type'
    }
  }
}

describe('AccountTypeComponent', () => {
  let component: AccountTypeComponent;
  let fixture: ComponentFixture<AccountTypeComponent>;
  let route: ActivatedRoute;
 

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountTypeComponent,BrowserAnimationsModule ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AccountTypeComponent);
    route = TestBed.inject(ActivatedRoute);
    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Route', () => { 
    let routerSpy: jasmine.SpyObj<Router>;
    
    beforeEach(() => {
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);
      component['router'] = routerSpy; // Inject the router spy into the component
    });

    it('get correct current route name', (done) => { 
      const currentRouteName = route.snapshot.routeConfig?.path;
      expect(currentRouteName).toEqual('account-type');
      done();
    });

    it('should navigate to the correct route when next button is clicked and form is valid', () => {
      // Mock the form to be valid
      component.formService.account.set({
        form: new FormGroup({
          accountTypeId: new FormControl('test', [Validators.required]),
        }),
        getRawValue: () => ({ accountTypeId: 'test' }),
      } as any);
      // Call the next method
      component.next();
      // Verify navigation
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/account-relationships'], { skipLocationChange: true });
    });

    it('should not navigate to the correct route when next button is clicked and form is invalid', () => {
      // Mock the form to be valid
      component.formService.account.set({
        form: new FormGroup({
          accountTypeId: new FormControl('', [Validators.required]),
        }),
        getRawValue: () => ({ accountTypeId: '' }),
      } as any);
      // Call the next method
      component.next();
      // Verify navigation
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to product if click back', () => {
      // Call the next method
      component.back();
      // Verify navigation
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/product'], { skipLocationChange: true });
    });
  })

  describe('types', () => { 
    it('should init account types', (done) => { 
      expect(component.types()).toEqual([]);
      done();
    })

    it('Account Types List should match to staticService accountTypes when it updates', (done) => { 
      const staticService = TestBed.inject(StaticDataService);
      const mockData = environment.accountTypes;
      staticService.setAccountTypes(mockData);
      staticService.accountTypes.subscribe(types => { 
        console.log('types:', types);
        expect(component.types()).toEqual(types);
        done();
      });
      
    });
  })
});
