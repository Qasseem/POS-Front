import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantComponent } from './merchant.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MerchantComponent,
    children: [
      {
        path: 'add',
        loadChildren: () =>
          import('./pages/add-merchant/add-merchant.module').then(
            (m) => m.AddMerchantModule
          ),
      },
      {
        path: 'all',
        loadChildren: () =>
          import('./pages/all-merchant/all-merchant.module').then(
            (m) => m.AllMerchantModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/all-merchant/all-merchant.module').then(
            (m) => m.AllMerchantModule
          ),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./pages/add-merchant/add-merchant.module').then(
            (m) => m.AddMerchantModule
          ),
      },
      {
        path: 'details/:id',
        loadChildren: () =>
          import('./pages/view-merchant/view-merchant.module').then(
            (m) => m.ViewMerchantModule
          ),
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [MerchantComponent],
})
export class MerchantModule {}
