import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing-module';
import { SharedModule } from '../shared/shared.module';
import { DevicesListComponent } from './pages/devices-list/devices-list.component';
import { DevicesFormComponent } from './pages/devices-form/devices-form.component';
import { ItemsWithoutSerialFormComponent } from './pages/items-without-serial-form/items-without-serial-form.component';
import { ItemsWithoutSerialListComponent } from './pages/items-without-serial-list/items-without-serial-list.component';
import { SimcardsFormComponent } from './pages/simcards-form/simcards-form.component';
import { SimcardsListComponent } from './pages/simcards-list/simcards-list.component';
import { TransferCustodyFormComponent } from './pages/transfer-custody-form/transfer-custody-form.component';
import { TransferCustodyListComponent } from './pages/transfer-custody-list/transfer-custody-list.component';
import { ModelTypesFormComponent } from './pages/model-types-form/model-types-form.component';
import { ModelTypesListComponent } from './pages/model-types-list/model-types-list.component';
import { WarehousesFormComponent } from './pages/warehouses-form/warehouses-form.component';
import { WarehousesListComponent } from './pages/warehouses-list/warehouses-list.component';

@NgModule({
  imports: [CommonModule, InventoryRoutingModule, SharedModule],
  declarations: [
    InventoryComponent,
    DevicesListComponent,
    DevicesFormComponent,
    ItemsWithoutSerialFormComponent,
    ItemsWithoutSerialListComponent,
    SimcardsFormComponent,
    SimcardsListComponent,
    TransferCustodyFormComponent,
    TransferCustodyListComponent,
    ModelTypesFormComponent,
    ModelTypesListComponent,
    WarehousesFormComponent,
    WarehousesListComponent,
  ],
})
export class InventoryModule {}
