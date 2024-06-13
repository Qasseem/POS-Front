import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllErrandsChannelsComponent } from './all-errands-channels.component';
import { RouterModule, Routes } from '@angular/router';
import { AppTableModule } from 'src/app/core/shared/core/modules/table/table-module';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
const routes: Routes = [
  {
    path: '',
    component: AllErrandsChannelsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppTableModule,
    PrimeNgButtonsModule,
  ],
  declarations: [AllErrandsChannelsComponent],
})
export class AllErrandsChannelsModule {}
