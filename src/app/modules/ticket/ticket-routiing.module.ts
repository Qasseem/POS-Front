import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { RouterModule, Routes } from '@angular/router';
import { TicketFormComponent } from './pages/ticket-form/ticket-form.component';
import { ViewTicketComponent } from './pages/view-ticket/view-ticket.component';
import { TicketsListComponent } from './pages/tickets-list/tickets-list.component';
import { TicketFavoriteListComponent } from './pages/ticket-favorite-list/ticket-favorite-list.component';

const routes: Routes = [
  {
    path: '',
    component: TicketComponent,
    children: [
      {
        path: 'add',
        component: TicketFormComponent,
        data: {
          type: 'add'
        }
      },
      {
        path: 'list',
        component: TicketsListComponent

      },
      {
        path: 'favorites',
        component: TicketFavoriteListComponent

      },
      {
        path: '',
        component: TicketsListComponent

      },
      {
        path: 'edit/:id',
        component: TicketFormComponent,
        data: {
          type: 'edit'
        }
      },
      {
        path: 'details/:id',
        component: ViewTicketComponent

      },
      { path: '', redirectTo: '/list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
