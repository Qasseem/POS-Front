import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleFormComponent } from './pages/role-form/role-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'user/list',
        component: UserListComponent,
      },
      {
        path: 'user/add',
        component: UserFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'user/edit/:id',
        component: UserFormComponent,
        data: {
          type: 'edit',
        },
      },
      {
        path: 'role/list',
        component: RoleListComponent,
      },
      {
        path: 'role/add',
        component: RoleFormComponent,
        data: {
          type: 'add',
        },
      },
      {
        path: 'role/edit/:id',
        component: RoleFormComponent,
        data: {
          type: 'edit',
        },
      },
    ],
  },
  { path: '', redirectTo: 'user/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
