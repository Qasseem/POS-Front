import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { PreventKeyseDirective } from 'src/app/core/shared/core/directives/prevent-keys.directive';
import { PrimeTableModule } from 'src/app/core/shared/core/modules/table/table-module';
import { FormModule } from 'src/app/core/shared/form/form-module';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
import { PrimeNgChartsModule } from 'src/app/core/shared/primeng/primeng-charts-module';
import { PrimeNgContainersModule } from 'src/app/core/shared/primeng/primeng-container-module';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
import { PrimeNgPanelModule } from 'src/app/core/shared/primeng/primeng-panel-module';
import { IconModule } from './inline-svg-icon/icon.module';

const ANGULAR_MODULES = [
  CommonModule,
  FormModule,
  ReactiveFormsModule,
  RouterModule,
//   HttpClient
];
const PRIME_NG_MODULES = [
  InputTextModule,
  InputNumberModule,
  TabViewModule,
  MenuModule,
  ButtonModule,
  PasswordModule
];
const CUSTOM_MODULES = [
  PrimeNgButtonsModule,
  PrimeNgPanelModule,
  PrimeNgContainersModule,
  PrimeNgChartsModule,
  PrimeNgInputsModule,
  PrimeTableModule,
  IconModule
];

const CORE_MODULES = [TranslateModule,GoogleMapsModule];
const CUSTOM_DIRECTIVES = [PreventKeyseDirective]

@NgModule({
  declarations: [...CUSTOM_DIRECTIVES],
  imports: [
    ...ANGULAR_MODULES,
    ...PRIME_NG_MODULES,
    ...CUSTOM_MODULES,
    ...CORE_MODULES,
  ],
  exports: [
    ...ANGULAR_MODULES,
    ...PRIME_NG_MODULES,
    ...CUSTOM_MODULES,
    ...CORE_MODULES,
    ...CUSTOM_DIRECTIVES
  ],
  providers: [],
})
export class SharedModule {}
