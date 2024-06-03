import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTicketComponent } from './add-ticket.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
const routes: Routes = [
  {
    path: '',
    component: AddTicketComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PrimeNgInputsModule,
  ],
  declarations: [AddTicketComponent],
})
export class AddTicketModule {}
