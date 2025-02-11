import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaticDataService } from '../../states/static-data.service';
import { environment } from '../../environments/environment.development';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [ProductComponent,BrowserAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Route', () => { 
      let routerSpy: jasmine.SpyObj<Router>;
      
      beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        component['router'] = routerSpy; // Inject the router spy into the component
      });
  
      it('should navigate to the correct route when next button is clicked and form is valid', () => {
        // Mock the form to be valid
        component.formService.product.set({
          form: { valid: true },
          getRawValue: () => ({ productId: '1', productPds:true}),
        }  as any);
        // Call the next method
        component.next();
        // Verify navigation
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/account-type'], { skipLocationChange: true });
      });
  
      it('should not navigate to the correct route when next button is clicked and form is invalid', () => {
        // Mock the form to be valid
        component.formService.product.set({
          form: { valid: false },
          getRawValue: () => ({  }),
        } as any);
        // Call the next method
        component.next();
        // Verify navigation
        expect(routerSpy.navigate).not.toHaveBeenCalled();
      });
  })

  describe('products', () => { 
      it('Should init products list', (done) => { 
        expect(component.products()).toEqual([]);
        done();
      })
  
      it('Products list should match to staticService accountTypes when it updates', (done) => { 
        const staticService = TestBed.inject(StaticDataService);
        const mockData = environment.products;
        staticService.setProducts(mockData);
        staticService.products.subscribe(types => { 
          console.log('types:', types);
          expect(component.products()).toEqual(types);
          done();
        });
        
      });
    })
  
});
