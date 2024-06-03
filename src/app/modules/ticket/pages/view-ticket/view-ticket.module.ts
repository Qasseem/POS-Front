import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTicketComponent } from './view-ticket.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
import { AppTableModule } from 'src/app/core/shared/core/modules/table/table-module';
import { PrimeNgChartsModule } from 'src/app/core/shared/primeng/primeng-charts-module';
import { PrimeNgPanelModule } from 'src/app/core/shared/primeng/primeng-panel-module';
import { FormModule } from 'src/app/core/shared/form/form-module';

const routes: Routes = [
  {
    path: '',
    component: ViewTicketComponent,
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
    FormModule,
  ],
  declarations: [ViewTicketComponent],
})
export class ViewTicketModule {}
