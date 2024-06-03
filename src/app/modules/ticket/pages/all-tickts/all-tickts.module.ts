import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTicktsComponent } from './all-tickts.component';
import { RouterModule, Routes } from '@angular/router';
import { AppTableModule } from 'src/app/core/shared/core/modules/table/table-module';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
const routes: Routes = [
  {
    path: '',
    component: AllTicktsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppTableModule,
    PrimeNgButtonsModule,
  ],
  declarations: [AllTicktsComponent],
})
export class AllTicktsModule {}
