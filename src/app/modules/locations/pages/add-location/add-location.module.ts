import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLocationComponent } from './add-location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
const routes: Routes = [
  {
    path: '',
    component: AddLocationComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PrimeNgInputsModule,
  ],
  declarations: [AddLocationComponent],
})
export class AddMerchantModule {}
