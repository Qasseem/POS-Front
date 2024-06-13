import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    children: [
      {
        path: 'add',
        loadChildren: () =>
          import('./pages/add-location/add-location.module').then(
            (m) => m.AddMerchantModule
          ),
      },
      {
        path: 'all',
        loadChildren: () =>
          import('./pages/all-locations/all-locations.module').then(
            (m) => m.AllLocationsModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/all-locations/all-locations.module').then(
            (m) => m.AllLocationsModule
          ),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./pages/add-location/add-location.module').then(
            (m) => m.AddMerchantModule
          ),
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [LocationsComponent],
})
export class LocationsModule {}
