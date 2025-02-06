import { Component, signal } from '@angular/core';
import { RouteTopActionsComponent } from '../../shared/route-top-actions/route-top-actions.component';
import { BasicAngularModule } from '../../modules/angular.module';
import { consoleLog } from '../../shared/shared.function';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../services/form.service';
import { StaticDataService } from '../../services/static-data.service';
import { distinctUntilChanged } from 'rxjs';
import { IStaticData } from '../../models/interface/staticData';
import { OutputService } from '../../services/output.service';

@Component({
  selector: 'app-account-type',
  imports: [RouteTopActionsComponent,BasicAngularModule],
  templateUrl: './account-type.component.html',
  styleUrl: './account-type.component.scss'
})
export class AccountTypeComponent {

  types = signal<IStaticData[]>([]);

  constructor(private route: ActivatedRoute, public formService: FormService, private staticService: StaticDataService, private router:Router, private opService:OutputService) {}

   ngOnInit() {
      const currentRouteName = this.route.snapshot.routeConfig?.path;
      console.log('Current Route Name:', currentRouteName);
      this.staticService.accountTypes.pipe(distinctUntilChanged()).subscribe(types => { 
        this.types.set(types);
        console.log(this.types());
      });
  }
  
  next() {
    consoleLog('Next Clicked:Account Type');
    if (this.formService.account().form.valid) {
      let accountTypeId = this.formService.account().form.get('accountTypeId')?.value;
      this.opService.setOutputAccountType({accountType:accountTypeId});
      this.router.navigate(['/account-relationships'], {skipLocationChange: true});
    }
  }

  back() {
    consoleLog('Back Clicked:Product Selection');
    this.router.navigate(['/product'], {skipLocationChange: true});
  }
}
