import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
@NgModule({
  imports: [
    PanelMenuModule,
    ScrollPanelModule,
    TableModule,
    MultiSelectModule,
    TooltipModule,
    MenubarModule,
    MenuModule,
  ],
  providers: [],
  declarations: [],
  exports: [
    PanelMenuModule,
    ScrollPanelModule,
    TableModule,
    MultiSelectModule,
    TooltipModule,
    MenubarModule,
    MenuModule,
  ],
})
export class PrimeNgPanelModule {}
