import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DividerModule } from 'primeng/divider';
@NgModule({
  imports: [ButtonModule, SplitButtonModule, DividerModule],
  providers: [],
  declarations: [],
  exports: [ButtonModule, SplitButtonModule, DividerModule],
})
export class PrimeNgButtonsModule {}
