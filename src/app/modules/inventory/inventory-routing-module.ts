import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { InventoryComponent } from './inventory.component';
import { DevicesListComponent } from './pages/devices-list/devices-list.component';
import { DevicesFormComponent } from './pages/devices-form/devices-form.component';
import { ItemsWithoutSerialFormComponent } from './pages/items-without-serial-form/items-without-serial-form.component';
import { ItemsWithoutSerialListComponent } from './pages/items-without-serial-list/items-without-serial-list.component';
import { SimcardsListComponent } from './pages/simcards-list/simcards-list.component';
import { SimcardsFormComponent } from './pages/simcards-form/simcards-form.component';
import { WarehousesListComponent } from './pages/warehouses-list/warehouses-list.component';
import { WarehousesFormComponent } from './pages/warehouses-form/warehouses-form.component';
import { ModelTypesListComponent } from './pages/model-types-list/model-types-list.component';
import { ModelTypesFormComponent } from './pages/model-types-form/model-types-form.component';
import { TransferCustodyListComponent } from './pages/transfer-custody-list/transfer-custody-list.component';
import { TransferCustodyFormComponent } from './pages/transfer-custody-form/transfer-custody-form.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      {
        path: '',
        component: DevicesListComponent,
      },
      //Devices--------------------------------
      {
        path: 'devices/list',
        component: DevicesListComponent,
      },
      {
        path: 'devices/add',
        component: DevicesFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'devices/edit/:id',
        component: DevicesFormComponent,
        data: {
          type: 'edit',
        },
      },
      //Items Without Serial--------------------------------
      {
        path: 'itemswithoutserial/list',
        component: ItemsWithoutSerialListComponent,
      },
      {
        path: 'itemswithoutserial/add',
        component: ItemsWithoutSerialFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'itemswithoutserial/edit/:id',
        component: ItemsWithoutSerialFormComponent,
        data: {
          type: 'edit',
        },
      },
      //Sim Card--------------------------------
      {
        path: 'simcards/list',
        component: SimcardsListComponent,
      },
      {
        path: 'simcards/add',
        component: SimcardsFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'simcards/edit/:id',
        component: SimcardsFormComponent,
        data: {
          type: 'edit',
        },
      },
      //WareHouse--------------------------------
      {
        path: 'warehouses/list',
        component: WarehousesListComponent,
      },
      {
        path: 'warehouses/add',
        component: WarehousesFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'warehouses/edit/:id',
        component: WarehousesFormComponent,
        data: {
          type: 'edit',
        },
      },
      //Modeltype--------------------------------
      {
        path: 'modeltypes/list',
        component: ModelTypesListComponent,
      },
      {
        path: 'modeltypes/add',
        component: ModelTypesFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'modeltypes/edit/:id',
        component: ModelTypesFormComponent,
        data: {
          type: 'edit',
        },
      },
      //TransferCustody--------------------------------
      {
        path: 'transfercustody/list',
        component: TransferCustodyListComponent,
      },
      {
        path: 'transfercustody/add',
        component: TransferCustodyFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'transfercustody/edit/:id',
        component: TransferCustodyFormComponent,
        data: {
          type: 'edit',
        },
      },
      { path: '', redirectTo: 'devices/list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
