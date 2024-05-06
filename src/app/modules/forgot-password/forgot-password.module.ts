import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [{ path: '', component: ForgotPasswordComponent }];
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
  declarations: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}
