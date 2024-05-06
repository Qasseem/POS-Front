import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/core/Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'merchant',
        loadChildren: () =>
          import('../merchant/merchant.module').then((m) => m.MerchantModule),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
