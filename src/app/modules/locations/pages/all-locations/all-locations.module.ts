import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllLocationsComponent } from './all-locations.component';
import { RouterModule, Routes } from '@angular/router';
import { AppTableModule } from 'src/app/core/shared/core/modules/table/table-module';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
const routes: Routes = [
  {
    path: '',
    component: AllLocationsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppTableModule,
    PrimeNgButtonsModule,
  ],
  declarations: [AllLocationsComponent],
})
export class AllLocationsModule {}
