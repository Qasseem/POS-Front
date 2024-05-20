import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMerchantComponent } from './view-merchant.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
import { AppTableModule } from 'src/app/core/shared/core/modules/table/table-module';
import { PrimeNgChartsModule } from 'src/app/core/shared/primeng/primeng-charts-module';
import { PrimeNgPanelModule } from 'src/app/core/shared/primeng/primeng-panel-module';

const routes: Routes = [
  {
    path: '',
    component: ViewMerchantComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppTableModule,
    PrimeNgButtonsModule,
    PrimeNgChartsModule,
    PrimeNgPanelModule,
  ],
  declarations: [ViewMerchantComponent],
})
export class ViewMerchantModule {}
