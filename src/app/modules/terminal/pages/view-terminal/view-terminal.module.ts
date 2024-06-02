import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTerminalComponent } from './view-terminal.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
import { AppTableModule } from 'src/app/core/shared/core/modules/table/table-module';
import { PrimeNgChartsModule } from 'src/app/core/shared/primeng/primeng-charts-module';
import { PrimeNgPanelModule } from 'src/app/core/shared/primeng/primeng-panel-module';
import { FormModule } from 'src/app/core/shared/form/form-module';
import { GoogleMap, MapMarker } from '@angular/google-maps';
const routes: Routes = [
  {
    path: '',
    component: ViewTerminalComponent,
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
    GoogleMap,
    MapMarker,
  ],
  declarations: [ViewTerminalComponent],
})
export class ViewTerminalModule {}
