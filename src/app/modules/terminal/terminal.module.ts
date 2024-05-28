import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TerminalComponent,
    children: [
      {
        path: 'add',
        loadChildren: () =>
          import('./pages/add-terminal/add-terminal.module').then(
            (m) => m.AddTerminalModule
          ),
      },
      {
        path: 'all',
        loadChildren: () =>
          import('./pages/all-terminal/all-terminal.module').then(
            (m) => m.AllTerminalModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/all-terminal/all-terminal.module').then(
            (m) => m.AllTerminalModule
          ),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./pages/add-terminal/add-terminal.module').then(
            (m) => m.AddTerminalModule
          ),
      },
      {
        path: 'details/:id',
        loadChildren: () =>
          import('./pages/view-terminal/view-terminal.module').then(
            (m) => m.ViewTerminalModule
          ),
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [TerminalComponent],
})
export class TerminalModule {}
