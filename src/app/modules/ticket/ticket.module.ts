import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TicketComponent } from './ticket.component';
import { TicketRoutingModule } from './ticket-routiing.module';
import { TicketFormComponent } from './pages/ticket-form/ticket-form.component';
import { TicketsListComponent } from './pages/tickets-list/tickets-list.component';
import { ViewTicketComponent } from './pages/view-ticket/view-ticket.component';
import { ScheduledTicketsListComponent } from './pages/scheduled-tickets-list/scheduled-tickets-list.component';
import { ViewScheduledTicketComponent } from './pages/view-scheduled-ticket/view-scheduled-ticket.component';

@NgModule({
  imports: [CommonModule, TicketRoutingModule, SharedModule],
  declarations: [
    TicketComponent,
    TicketFormComponent,
    TicketsListComponent,
    ViewTicketComponent,
    ScheduledTicketsListComponent,
    ViewScheduledTicketComponent,
  ],
})
export class TicketModule {}
