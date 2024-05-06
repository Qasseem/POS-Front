import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNgContainersModule } from 'src/app/core/shared/primeng/primeng-container-module';
import { PrimeNgButtonsModule } from 'src/app/core/shared/primeng/primeng-button-module';
import { PrimeNgInputsModule } from 'src/app/core/shared/primeng/primeng-input-module';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [],
  },
];

@NgModule({
  imports: [
    CommonModule,
    PrimeNgContainersModule,
    PrimeNgButtonsModule,
    PrimeNgInputsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
