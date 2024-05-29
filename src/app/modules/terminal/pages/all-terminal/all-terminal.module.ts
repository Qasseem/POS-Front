import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTerminalComponent } from './all-terminal.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
import { AppTableModule } from 'src/app/core/shared/core/modules/table/table-module';
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
    AppTableModule,
  ],
  declarations: [AllTerminalComponent],
})
export class AllTerminalModule {}
