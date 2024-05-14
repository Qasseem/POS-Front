import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMerchantComponent } from './all-merchant.component';
import { RouterModule, Routes } from '@angular/router';
import { AppTableModule } from 'src/app/core/shared/core/modules/table/table-module';
const routes: Routes = [
  {
    path: '',
    component: AllMerchantComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), AppTableModule],
  declarations: [AllMerchantComponent],
})
export class AllMerchantModule {}
