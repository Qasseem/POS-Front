import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    PanelMenuModule,
    ScrollPanelModule,
    TableModule,
    MultiSelectModule,
    TooltipModule,
  ],
  providers: [],
  declarations: [],
  exports: [
    PanelMenuModule,
    ScrollPanelModule,
    TableModule,
    MultiSelectModule,
    TooltipModule,
  ],
})
export class PrimeNgPanelModule {}
