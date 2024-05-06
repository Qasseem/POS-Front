import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAuthComponent } from './not-auth.component';
import { Routes, RouterModule } from '@angular/router';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';

const routes: Routes = [
  {
    path: '',
    component: NotAuthComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PrimeNgButtonsModule],
  declarations: [NotAuthComponent],
})
export class NotAuthModule {}
