import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { PrimeNgPanelModule } from 'src/app/core/shared/primeng/primeng-panel-module';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    PrimeNgPanelModule,
    TranslateModule,
    PrimeNgButtonsModule,
  ],
  declarations: [MainComponent],
})
export class MainModule {}
