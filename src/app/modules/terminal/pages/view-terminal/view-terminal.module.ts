import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTerminalComponent } from './view-terminal.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
import { FileUploadModule } from 'src/app/core/shared/core/modules/table/components/file-upload/file-upload.module';
const routes: Routes = [
  {
    path: '',
    component: ViewTerminalComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PrimeNgInputsModule,
    FileUploadModule,
  ],
  declarations: [ViewTerminalComponent],
})
export class ViewTerminalModule {}
