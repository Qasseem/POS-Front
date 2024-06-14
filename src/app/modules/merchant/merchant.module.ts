import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MerchanRoutingtModule } from './merchant-routing.module';
import { MerchantComponent } from './merchant.component';
import { MerchantFormComponent } from './pages/merchant-form/merchant-form.component';
import { MerchantListComponent } from './pages/merchant-list/merchant-list.component';
import { ViewMerchantComponent } from './pages/view-merchant/view-merchant.component';

@NgModule({
  declarations: [
    MerchantComponent,
    MerchantFormComponent,
    MerchantListComponent,
    ViewMerchantComponent,
  ],
  imports: [CommonModule, MerchanRoutingtModule, SharedModule],
  exports: [],
  providers: [],
})
export class MerchantModule {}
