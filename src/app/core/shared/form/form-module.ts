import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NumberDirective } from '../core/directives/only-numbers.directive';
import { StringLimitPipe } from '../core/pipe/string-limit.pipe';
import { IcInputComponent } from './ic-input/ic-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DateFixerPipe } from '../core/pipe/date-fixer.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
  ],
  providers: [],
  declarations: [
    NumberDirective,
    StringLimitPipe,
    DateFixerPipe,
    IcInputComponent,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NumberDirective,
    StringLimitPipe,
    IcInputComponent,
    DialogModule,
    DateFixerPipe,
  ],
})
export class FormModule {}
