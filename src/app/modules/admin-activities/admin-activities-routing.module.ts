import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminActivitiesComponent } from './admin-activities.component';
import { CategoriesErrandsTypesListComponent } from './pages/categories-errands-types-list/categories-errands-types-list.component';
import { ErrandsChannelsListComponent } from './pages/errands-channels-list/errands-channels-list.component';
import { MerchantCategoryCodesListComponent } from './pages/merchant-category-codes-list/merchant-category-codes-list.component';
import { POSTypesListComponent } from './pages/pos-types-list/pos-types-list.component';
import { MerchantCategoryCodesFormComponent } from './pages/merchant-category-codes-form/merchant-category-codes-form.component';
import { ErrandsChannelsFormComponent } from './pages/errands-channels-form/errands-channels-form.component';
import { POSTypeFormComponent } from './pages/pos-type-form/pos-type-form.component';
import { CategoriesErrandTypesFormComponent } from './pages/categories-errands-types-form/categories-errands-types-form.component';

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
        path: 'list/merchant-category-codes/add',
        component: MerchantCategoryCodesFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'merchant-category-codes/edit/:id',
        component: MerchantCategoryCodesFormComponent,
        data: {
          type: 'edit',
        },
      },
      {
        path: 'list/errands-channels',
        component: ErrandsChannelsListComponent,
      },
      {
        path: 'errands-channels/add',
        component: ErrandsChannelsFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'errands-channels/edit/:id',
        component: ErrandsChannelsFormComponent,
        data: {
          type: 'edit',
        },
      },
      {
        path: 'list/pos-types',
        component: POSTypesListComponent,
      },
      {
        path: 'pos-types/add',
        component: POSTypeFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'pos-types/edit/:id',
        component: POSTypeFormComponent,
        data: {
          type: 'edit',
        },
      },
      {
        path: 'list/categories-errands-types',
        component: CategoriesErrandsTypesListComponent,
      },
      {
        path: 'categories-errands-types/add',
        component: CategoriesErrandTypesFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'categories-errands-types/edit/:id',
        component: CategoriesErrandTypesFormComponent,
        data: {
          type: 'edit',
        },
      },
      {
        path: '',
        component: MerchantCategoryCodesListComponent,
      },
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
