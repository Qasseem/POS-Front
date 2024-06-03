import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TicketComponent,
    children: [
      {
        path: 'add',
        loadChildren: () =>
          import('./pages/add-ticket/add-ticket.module').then(
            (m) => m.AddTicketModule
          ),
      },
      {
        path: 'all',
        loadChildren: () =>
          import('./pages/all-tickts/all-tickts.module').then(
            (m) => m.AllTicktsModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/all-tickts/all-tickts.module').then(
            (m) => m.AllTicktsModule
          ),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./pages/add-ticket/add-ticket.module').then(
            (m) => m.AddTicketModule
          ),
      },
      {
        path: 'details/:id',
        loadChildren: () =>
          import('./pages/view-ticket/view-ticket.module').then(
            (m) => m.ViewTicketModule
          ),
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [TicketComponent],
})
export class TicketModule {}
