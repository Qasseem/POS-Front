import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { PNgDropdownComponent } from './form/p-ng-dropdown/p-ng-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    TranslateModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    FormsModule,
  ],
  providers: [],
  declarations: [PNgDropdownComponent],
  exports: [
    InputTextModule,
    PasswordModule,
    PNgDropdownComponent,
    DropdownModule,
    CheckboxModule,
    OverlayPanelModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PrimeNgInputsModule {}
