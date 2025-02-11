import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteTopActionsComponent } from '../../shared/route-top-actions/route-top-actions.component';
import { BasicAngularModule } from '../../modules/angular.module';
import { FormService } from '../../services/form.service';
import { StaticDataService } from '../../states/static-data.service';
import { IStaticData } from '../../models/interface/staticData';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { consoleLog } from '../../shared/shared.function';
import { RelationshipService } from '../../states/relationship.service';
import { environment } from '../../environments/environment.development';
import { OutputService } from '../../services/output.service';
import { ProductService } from '../../states/product.service';
@Component({
  selector: 'app-product',
  imports: [RouteTopActionsComponent,BasicAngularModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  
  private destroy$ = new Subject<void>(); // Cleanup Subject
  products = signal<IStaticData[]>([]);

  constructor(private router: Router, public formService: FormService, private staticService: StaticDataService,
    private rsService: RelationshipService, private opService: OutputService, private productState:ProductService) { }

  ngOnInit() {
    this.productState.state$.pipe(distinctUntilChanged()).subscribe(state => { 
      this.products.set(state.products);
      console.log(this.products());
    });
  }

  next() {
    this,this.formService.product().form.markAllAsTouched();
    consoleLog('Next Clicked:Product Selection');
    if (this.formService.product().form.valid) { 
      consoleLog(this.formService.product().getRawValue());
      const productIdValue = this.formService.product().getRawValue().productId;
      this.opService.setIOutputProductId({
        productId: typeof productIdValue === 'number' ? productIdValue : null,
        productUid: typeof productIdValue === 'string' ? productIdValue : null
      });
      this.router.navigate(['/account-type'], {skipLocationChange: true});
    }
  }

  ngOnDestroy() { 
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
