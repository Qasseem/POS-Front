import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewTerminalComponent } from './pages/view-terminal/view-terminal.component';
import { TerminalListComponent } from './pages/terminal-list/terminal-list.component';

const routes: Routes = [
  {
    path: '',
    component: TerminalComponent,
    children: [
      {
        path: 'add',
        component: TerminalComponent,
        data: {
          type: 'add'
        }
      },
      {
        path: 'list',
        component: TerminalListComponent

      },
      {
        path: '',
        component: TerminalListComponent

      },
      {
        path: 'edit/:id',
        component: TerminalComponent,
        data: {
          type: 'edit'
        }

      },
      {
        path: 'details/:id',
        component: ViewTerminalComponent

      },
      { path: '', redirectTo: '/list', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminalRoutingModule { }
