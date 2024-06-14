import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMerchantComponent } from './add-merchant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';

const routes: Routes = [
  {
    path: '',
    component: AddMerchantComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PrimeNgInputsModule,
    GoogleMap,
    PrimeNgButtonsModule,
    MapMarker,
  ],
  declarations: [AddMerchantComponent],
})
export class AddMerchantModule {}
