import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalComponent } from './terminal.component';
import { TerminalRoutingModule } from './terminal-routing.module';
import { TerminalListComponent } from './pages/terminal-list/terminal-list.component';
import { ViewTerminalComponent } from './pages/view-terminal/view-terminal.component';
import { SharedModule } from '../shared/shared.module';
import { TerminalFavoriteListComponent } from './pages/terminal-favorite-list/terminal-favorite-list.component';
import { TerminalFormComponent } from './pages/terminal-form/terminal-form.component';

@NgModule({
  imports: [CommonModule, TerminalRoutingModule, SharedModule],
  declarations: [
    TerminalComponent,
    TerminalListComponent,
    ViewTerminalComponent,
    TerminalFavoriteListComponent,
    TerminalFormComponent,
  ],
})
export class TerminalModule {}
