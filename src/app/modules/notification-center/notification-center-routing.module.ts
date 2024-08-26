import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationCenterComponent } from './notification-center.component';
import { NotficationCenterFormComponent } from './pages/notfication-center-form/notfication-center-form.component';
import { NotificationCenterListComponent } from './pages/notification-center-list/notification-center-list.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationCenterComponent,
    children: [
      {
        path: 'list',
        component: NotificationCenterListComponent,
      },
      {
        path: 'add',
        component: NotficationCenterFormComponent,
        data: {
          type: 'add',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationCenterRoutingModule {}
