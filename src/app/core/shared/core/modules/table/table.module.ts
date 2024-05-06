import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { PrimeNgPanelModule } from '../../../primeng/primeng-panel-module';
import { FormsModule } from '@angular/forms';
import { PrimeNgButtonsModule } from '../../../primeng/primeng-button-module';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgPanelModule,
    FormsModule,
    PrimeNgButtonsModule,
  ],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class AppTableModule {}
