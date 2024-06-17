import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
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
        path: 'terminal',
        loadChildren: () =>
          import('../terminal/terminal.module').then((m) => m.TerminalModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'ticket',
        loadChildren: () =>
          import('../ticket/ticket.module').then((m) => m.TicketModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'locations',
        loadChildren: () =>
          import('../locations/locations.module').then((m) => m.LocationsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-activities',
        loadChildren: () =>
          import('../admin-activities/admin-activities.module').then((m) => m.AdminActivitiesModule),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'merchant',
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
