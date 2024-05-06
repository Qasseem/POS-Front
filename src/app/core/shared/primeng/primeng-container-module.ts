import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
@NgModule({
  imports: [CardModule, TabViewModule],
  providers: [],
  declarations: [],
  exports: [CardModule, TabViewModule],
})
export class PrimeNgContainersModule {}
