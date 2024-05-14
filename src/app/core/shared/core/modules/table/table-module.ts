import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgPanelModule } from 'src/app/core/shared/primeng/primeng-panel-module';
import { TranslateModule } from '@ngx-translate/core';
import { ListComponent } from './components/list/list.component';
import { PrimeNgInputsModule } from '../../../primeng/primeng-input-module';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgPanelModule,
    TranslateModule,
    PrimeNgInputsModule,
  ],
  declarations: [ListComponent, TableComponent],
  exports: [ListComponent, TableComponent],
})
export class AppTableModule {}
