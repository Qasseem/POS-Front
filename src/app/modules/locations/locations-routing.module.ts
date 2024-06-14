import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { RouterModule, Routes } from '@angular/router';
import { LocationFormComponent } from './pages/location-form/location-form.component';
import { LocationsListComponent } from './pages/locations-list/locations-list.component';

const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    children: [
      {
        path: 'add',
        component: LocationFormComponent,
        data: {
          type: 'add'
        }
      },
      {
        path: 'list',
        component: LocationsListComponent
      },
      {
        path: '',
        component: LocationsListComponent
      },
      {
        path: 'edit/:id',
        component: LocationFormComponent,
        data: {
          type: 'edit'
        }
      },
      { path: '', redirectTo: '/list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {}
