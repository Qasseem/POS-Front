import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTerminalComponent } from './all-terminal.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
const routes: Routes = [
  {
    path: '',
    component: AllTerminalComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PrimeNgInputsModule,
  ],
  declarations: [AllTerminalComponent],
})
export class AllTerminalModule {}
