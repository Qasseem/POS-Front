import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [PanelMenuModule, ScrollPanelModule],
  providers: [],
  declarations: [],
  exports: [PanelMenuModule, ScrollPanelModule],
})
export class PrimeNgPanelModule {}
