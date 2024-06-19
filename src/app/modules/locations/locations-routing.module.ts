import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { RouterModule, Routes } from '@angular/router';
import { RegionFormComponent } from './pages/region-form/region-form.component';
import { RegionListComponent } from './pages/region-list/region-list.component';
import { CityFormComponent } from './pages/city-form/city-form.component';
import { CityListComponent } from './pages/city-list/city-list.component';
import { ZoneFormComponent } from './pages/zone-form/zone-form.component';
import { ZoneListComponent } from './pages/zone-list/zone-list.component';

const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    children: [
      {
        path: '',
        component: RegionListComponent,
      },
      {
        path: 'region/add',
        component: RegionFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'region/list',
        component: RegionListComponent,
      },
      {
        path: 'region/edit/:id',
        component: RegionFormComponent,
        data: {
          type: 'edit',
        },
      },
      {
        path: 'city/add',
        component: CityFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'city/list',
        component: CityListComponent,
      },
      {
        path: 'city/edit/:id',
        component: CityFormComponent,
        data: {
          type: 'edit',
        },
      },
      {
        path: 'zone/add',
        component: ZoneFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'zone/list',
        component: ZoneListComponent,
      },
      {
        path: 'zone/edit/:id',
        component: ZoneFormComponent,
        data: {
          type: 'edit',
        },
      },
      { path: '', redirectTo: 'region/list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule {}
