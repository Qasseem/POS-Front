import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
import { TranslateModule } from '@ngx-translate/core';
import { PreventKeyseDirective } from 'src/app/core/shared/core/directives/prevent-keys.directive';
const routes: Routes = [{ path: '', component: RegistrationComponent }];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    PrimeNgButtonsModule,
    PrimeNgInputsModule,
    TranslateModule,
  ],
  declarations: [RegistrationComponent, PreventKeyseDirective],
})
export class RegistrationModule {}
