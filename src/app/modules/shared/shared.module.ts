import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { PreventKeyseDirective } from 'src/app/core/shared/core/directives/prevent-keys.directive';
import { PrimeTableModule } from 'src/app/core/shared/core/modules/table/table-module';
import { FormModule } from 'src/app/core/shared/form/form-module';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
import { PrimeNgChartsModule } from 'src/app/core/shared/primeng/primeng-charts-module';
import { PrimeNgContainersModule } from 'src/app/core/shared/primeng/primeng-container-module';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
import { PrimeNgPanelModule } from 'src/app/core/shared/primeng/primeng-panel-module';
import { IconModule } from './inline-svg-icon/icon.module';
import { LeafletMapComponent } from './map/map.component';
import { ViewCardComponent } from './view-card/view-card.component';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
const ANGULAR_MODULES = [
  CommonModule,
  FormModule,
  ReactiveFormsModule,
  RouterModule,
  MatExpansionModule,
  //   HttpClient
];
const PRIME_NG_MODULES = [
  InputTextModule,
  InputNumberModule,
  TabViewModule,
  MenuModule,
  ButtonModule,
  PasswordModule,
  RadioButtonModule,
  InputTextareaModule,
  TooltipModule,
  AccordionModule,
  CheckboxModule,
  ConfirmDialogModule,
];
const CUSTOM_MODULES = [
  PrimeNgButtonsModule,
  PrimeNgPanelModule,
  PrimeNgContainersModule,
  PrimeNgChartsModule,
  PrimeNgInputsModule,
  PrimeTableModule,
  IconModule,
];

const CORE_MODULES = [TranslateModule];
const CUSTOM_DIRECTIVES = [PreventKeyseDirective];

@NgModule({
  declarations: [...CUSTOM_DIRECTIVES, LeafletMapComponent, ViewCardComponent],
  imports: [
    ...ANGULAR_MODULES,
    ...PRIME_NG_MODULES,
    ...CUSTOM_MODULES,
    ...CORE_MODULES,
    LeafletModule,
  ],
  exports: [
    ...ANGULAR_MODULES,
    ...PRIME_NG_MODULES,
    ...CUSTOM_MODULES,
    ...CORE_MODULES,
    ...CUSTOM_DIRECTIVES,
    LeafletMapComponent,
    ViewCardComponent,
  ],
  providers: [],
})
export class SharedModule {}
