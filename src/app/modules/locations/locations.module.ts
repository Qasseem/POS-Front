import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocationsComponent } from './locations.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegionListComponent } from './pages/region-list/region-list.component';
import { RegionFormComponent } from './pages/region-form/region-form.component';
import { CityListComponent } from './pages/city-list/city-list.component';
import { CityFormComponent } from './pages/city-form/city-form.component';
import { ZoneListComponent } from './pages/zone-list/zone-list.component';
import { ZoneFormComponent } from './pages/zone-form/zone-form.component';

@NgModule({
  imports: [CommonModule, LocationsRoutingModule, SharedModule],
  declarations: [
    LocationsComponent,
    RegionListComponent,
    RegionFormComponent,
    CityListComponent,
    CityFormComponent,
    ZoneListComponent,
    ZoneFormComponent,
  ],
})
export class LocationsModule {}
