import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminActivitiesComponent } from './admin-activities.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminActivitiesComponent,
    children: [
      // {
      //   path: 'add',
      //   loadChildren: () =>
      //     import('./pages/add-merchant/admin-activities.module').then(
      //       (m) => m.AddMerchantModule
      //     ),
      // },
      {
        path: 'all',
        loadChildren: () =>
          import('./pages/all-merchant-category-codes/all-merchant-category-codes.module').then(
            (m) => m.AllMerchantCategoryCodesModule
          ),
      },
      {
        path: 'all/errands-channels',
        loadChildren: () =>
          import('./pages/all-errands-channels/all-errands-channels.module').then(
            (m) => m.AllErrandsChannelsModule
          ),
      },
      {
        path: 'all/pos-types',
        loadChildren: () =>
          import('./pages/all-pos-types/all-pos-types.module').then(
            (m) => m.AllPOSTypesModule
          ),
      },
      {
        path: 'all/categories-errands-types',
        loadChildren: () =>
          import('./pages/all-categories-errands-types/all-categories-errands-types.module').then(
            (m) => m.AllCategoriesErrandsTypesModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/all-merchant-category-codes/all-merchant-category-codes.module').then(
            (m) => m.AllMerchantCategoryCodesModule
          ),
      },
      // {
      //   path: 'edit/:id',
      //   loadChildren: () =>
      //     import('./pages/add-merchant/admin-activities.module').then(
      //       (m) => m.AddMerchantModule
      //     ),
      // },
      // {
      //   path: 'details/:id',
      //   loadChildren: () =>
      //     import('./pages/view-merchant/view-merchant.module').then(
      //       (m) => m.ViewMerchantModule
      //     ),
      // },
      { path: '', redirectTo: 'all', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [AdminActivitiesComponent],
})
export class AdminActivitiesModule {}
