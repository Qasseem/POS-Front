import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoleFormComponent } from './pages/role-form/role-form.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserListComponent,
    UserFormComponent,
    RoleListComponent,
    RoleFormComponent,
  ],
  imports: [CommonModule, UserManagementRoutingModule, SharedModule],
})
export class UserManagementModule {}
