import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTerminalComponent } from './add-terminal.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
import { GoogleMap, MapMarker } from '@angular/google-maps';

const routes: Routes = [
  {
    path: '',
    component: AddTerminalComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PrimeNgInputsModule,
    PrimeNgButtonsModule,
    GoogleMap,
    MapMarker,
  ],
  declarations: [AddTerminalComponent],
})
export class AddTerminalModule {}
