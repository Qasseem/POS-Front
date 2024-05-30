import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  imports: [
    PanelMenuModule,
    ScrollPanelModule,
    TableModule,
    MultiSelectModule,
    TooltipModule,
    MenubarModule,
    MenuModule,
    AvatarModule,
    DialogModule,
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
    AvatarModule,
    DialogModule,
  ],
})
export class PrimeNgPanelModule {}
