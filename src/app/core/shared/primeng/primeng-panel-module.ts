import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [PanelMenuModule, ScrollPanelModule, TableModule, MultiSelectModule],
  providers: [],
  declarations: [],
  exports: [PanelMenuModule, ScrollPanelModule, TableModule, MultiSelectModule],
})
export class PrimeNgPanelModule {}
