import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppTableModule } from 'src/app/core/shared/core/modules/table/table-module';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
import { AllMerchantCategoryCodesComponent } from './all-merchant-category-codes.component';
const routes: Routes = [
  {
    path: '',
    component: AllMerchantCategoryCodesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppTableModule,
    PrimeNgButtonsModule,
  ],
  declarations: [AllMerchantCategoryCodesComponent],
})
export class AllMerchantCategoryCodesModule {}
