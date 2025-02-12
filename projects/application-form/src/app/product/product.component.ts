import { Component, computed, effect, Signal, signal  } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { IAppState } from '../../models/interface/ngrx/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectProducts } from '../../states/product-state/product.selectors';

@Component({
  selector: 'app-product',
  imports: [RouteTopActionsComponent,BasicAngularModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  
  private destroy$ = new Subject<void>(); // Cleanup Subject
  products: any;

  constructor(private router: Router, public formService: FormService, private staticService: StaticDataService,
    private rsService: RelationshipService, private opService: OutputService, private store: Store<IAppState>) { 
    //This is unnecessary but just a demonstration of how to use the toSignal function
    this.products = toSignal(this.store.select(selectProducts), { initialValue: [] });

    effect(() => { 
      console.log(this.products());
    });
  }

  ngOnInit() {
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
