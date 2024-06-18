import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminActivitiesRoutingModule } from './admin-activities-routing.module';
import { AdminActivitiesComponent } from './admin-activities.component';
import { CategoriesErrandsTypesListComponent } from './pages/categories-errands-types-list/categories-errands-types-list.component';
import { ErrandsChannelsListComponent } from './pages/errands-channels-list/errands-channels-list.component';
import { MerchantCategoryCodesListComponent } from './pages/merchant-category-codes-list/merchant-category-codes-list.component';
import { POSTypesListComponent } from './pages/pos-types-list/pos-types-list.component';
import { MerchantCategoryCodesFormComponent } from './pages/merchant-category-codes-form/merchant-category-codes-form.component';
import { ErrandsChannelsFormComponent } from './pages/errands-channels-form/errands-channels-form.component';
import { POSTypeFormComponent } from './pages/pos-type-form/pos-type-form.component';
import { CategoriesErrandTypesFormComponent } from './pages/categories-errands-types-form/categories-errands-types-form.component';

@NgModule({
  imports: [CommonModule, AdminActivitiesRoutingModule, SharedModule],
  declarations: [
    AdminActivitiesComponent,
    CategoriesErrandsTypesListComponent,
    ErrandsChannelsListComponent,
    MerchantCategoryCodesListComponent,
    POSTypesListComponent,
    MerchantCategoryCodesFormComponent,
    ErrandsChannelsFormComponent,
    POSTypeFormComponent,
    CategoriesErrandTypesFormComponent,
  ],
})
export class AdminActivitiesModule {}
