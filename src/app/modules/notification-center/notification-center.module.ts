import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NotificationCenterRoutingModule } from './notification-center-routing.module';
import { NotificationCenterComponent } from './notification-center.component';
import { NotficationCenterFormComponent } from './pages/notfication-center-form/notfication-center-form.component';
import { NotificationCenterListComponent } from './pages/notification-center-list/notification-center-list.component';

@NgModule({
  declarations: [
    NotificationCenterComponent,
    NotificationCenterListComponent,
    NotficationCenterFormComponent,
  ],
  imports: [CommonModule, NotificationCenterRoutingModule, SharedModule],
})
export class NotificationCenterModule {}
