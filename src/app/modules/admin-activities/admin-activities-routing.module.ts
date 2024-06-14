import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminActivitiesComponent } from './admin-activities.component';
import { CategoriesErrandsTypesListComponent } from './pages/categories-errands-types-list/categories-errands-types-list.component';
import { ErrandsChannelsListComponent } from './pages/errands-channels-list/errands-channels-list.component';
import { MerchantCategoryCodesListComponent } from './pages/merchant-category-codes-list/merchant-category-codes-list.component';
import { POSTypesListComponent } from './pages/pos-types-list/pos-types-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminActivitiesComponent,
    children: [
      {
        path: 'list/merchant-category-codes',
        component: MerchantCategoryCodesListComponent,
      },
      {
        path: 'list/errands-channels',
        component: ErrandsChannelsListComponent,
      },
      {
        path: 'list/pos-types',
        component: POSTypesListComponent,
      },
      {
        path: 'list/categories-errands-types',
        component: CategoriesErrandsTypesListComponent,
      },
      {
        path: '',
        component: MerchantCategoryCodesListComponent,
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
      {
        path: '',
        redirectTo: 'list/merchant-category-codes',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminActivitiesRoutingModule {}
