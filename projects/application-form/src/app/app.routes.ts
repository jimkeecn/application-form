import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { InitComponent } from './init/init.component';

export const routes: Routes = [
    { path: 'product', loadComponent: () => import('./product/product.component').then(m => m.ProductComponent) },
    { path: 'account-type', loadComponent: () => import('./account-type/account-type.component').then(m => m.AccountTypeComponent) },
    { path: 'account-relationships', loadComponent: () => import('./account-relationship/account-relationship.component').then(m => m.IAccountRelationshipComponent) },
    { path: 'entity-form', loadComponent: () => import('./entity-form/entity-form.component').then(m => m.EntityFormComponent) },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', component: InitComponent }
];
