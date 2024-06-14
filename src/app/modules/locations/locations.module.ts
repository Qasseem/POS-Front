import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocationsComponent } from './locations.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LocationsListComponent } from './pages/locations-list/locations-list.component';
import { LocationFormComponent } from './pages/location-form/location-form.component';

@NgModule({
  imports: [CommonModule, LocationsRoutingModule, SharedModule],
  declarations: [LocationsComponent,LocationsListComponent,LocationFormComponent],
})
export class LocationsModule {}
